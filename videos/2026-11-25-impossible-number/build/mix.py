"""Sound mix for "The Impossible Number That Exposed Madoff".

Pipeline (same shape as videos/2026-11-24-two-buttons/build/mix.py):
  1. peak-measure every sfx file used by a one-shot cue (cached)
  2. render each music bed as one region-length stem (looped with crossfades
     if the clip is shorter than its chapter), loudnorm -24 LUFS, faded
  3. render the one-shot cues in batches of 30 into float WAVs (build/audio_tmp)
  4. final graph: voice -16 LUFS; beds sidechain-ducked under the voice
     (threshold 0.04, ratio 5); one-shots summed; master chain
     highpass 60 -> acompressor -> loudnorm -14 / -1.5 dBTP -> 192 kHz alimiter 0.8 -> 48 kHz
Output: build/mix.wav (duration = narration + 15 s end card).
QA stems (for the level check): build/audio_tmp/qa_voice.wav,
qa_bed_unducked.wav, qa_bed_ducked.wav.
"""
import json
import math
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import cues as C  # noqa: E402

ROOT = C.ROOT
TMP = os.path.join(HERE, "audio_tmp")
os.makedirs(TMP, exist_ok=True)
TOTAL = C.TOTAL
NS_OUT = round(TOTAL * 48000)  # exact output length in samples
SLACK = 48000                  # 1 s of internal slack: ffmpeg's end-of-stream flush
                               # can drop a few tens of ms, so the graph is padded past
                               # the end and trimmed to NS_OUT at the master output
NS = NS_OUT + SLACK
SR = 48000
BASE_PEAK_DB = -12.0   # every one-shot file is peak-normalized to this before its cue gain
LOOP_XFADE = 1.0       # seconds, crossfade between loop copies
BATCH = 30
OUT = os.path.join(HERE, "mix.wav")


def run(args):
    subprocess.run(args, cwd=ROOT, check=True)


def ffprobe_duration(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", path], cwd=ROOT, capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def peak_db(path):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af", "volumedetect",
                        "-f", "null", "-"], cwd=ROOT, capture_output=True, text=True, check=True)
    m = re.search(r"max_volume: (-?[\d.]+) dB", r.stderr)
    if not m:
        raise RuntimeError(f"no peak for {path}")
    return float(m.group(1))


def measure_peaks(files):
    cache_path = os.path.join(TMP, "sfx_peaks.json")
    cache = json.load(open(cache_path)) if os.path.exists(cache_path) else {}
    for f in files:
        if f not in cache:
            cache[f] = peak_db(os.path.join(ROOT, f))
    json.dump(cache, open(cache_path, "w"), indent=1)
    return cache


def loop_filter(src_label, clip_len, need_len, tag):
    """Filter chain turning [src_label] into exactly need_len seconds.

    If the clip is shorter than needed, it is repeated with XF-second crossfades
    (acrossfade chain); otherwise it is simply trimmed.
    """
    if clip_len >= need_len:
        return f"[{src_label}]atrim=0:{need_len:.3f},asetpts=PTS-STARTPTS[{tag}]"
    # Overlapped copies: copy k starts at k*(L-X); each copy fades in and out over X,
    # so neighbours cross-fade (linear fades sum to constant level) and the loop seams are smooth.
    # (acrossfade chains were tried first but return a much shorter stream than expected.)
    x = LOOP_XFADE
    step = clip_len - x
    n = max(2, math.ceil((need_len - clip_len) / step) + 2)
    parts = [f"[{src_label}]asplit={n}" + "".join(f"[{tag}s{k}]" for k in range(n))]
    for k in range(n):
        ms = int(round(k * step * 1000))
        parts.append(f"[{tag}s{k}]afade=in:st=0:d={x},afade=out:st={clip_len - x:.3f}:d={x},"
                     f"adelay={ms}|{ms}[{tag}c{k}]")
    parts.append("".join(f"[{tag}c{k}]" for k in range(n)) +
                 f"amix=inputs={n}:normalize=0:duration=longest,atrim=0:{need_len:.3f},"
                 f"asetpts=PTS-STARTPTS[{tag}]")
    return ";".join(parts)


def render_bed(bed, idx):
    need = bed["end"] - bed["start"]
    out = os.path.join(TMP, f"bed_{idx}_{bed['name']}.wav")
    ins, fc, labels = [], [], []
    for j, (f, gain, loop) in enumerate(bed["layers"]):
        ins += ["-i", f]
        length = ffprobe_duration(os.path.join(ROOT, f))
        src = f"{idx}{j}"
        fc.append(f"[{len(labels)}:a]aresample={SR},aformat=channel_layouts=stereo[{src}in]")
        if loop:
            fc.append(loop_filter(f"{src}in", length, need, f"{src}L"))
        else:
            fc.append(f"[{src}in]atrim=0:{need:.3f},asetpts=PTS-STARTPTS[{src}L]")
        fc.append(f"[{src}L]volume={gain}dB[{src}G]")
        labels.append(f"[{src}G]")
    if len(labels) > 1:
        fc.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0:duration=longest[bmix{idx}]")
    else:
        fc.append(f"{labels[0]}anull[bmix{idx}]")
    fi, fo = bed["fade_in"], bed["fade_out"]
    fc.append(f"[bmix{idx}]loudnorm=I=-24:TP=-6:LRA=15,aresample={SR},"
              f"apad=whole_len={round(need * SR)},atrim=end_sample={round(need * SR)},"
              f"afade=in:st=0:d={fi},afade=out:st={need - fo:.3f}:d={fo}[bout]")
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *ins,
         "-filter_complex", ";".join(fc), "-map", "[bout]", "-t", f"{need:.3f}",
         "-c:a", "pcm_f32le", out])
    return out


def cue_filter(k, cue, peaks):
    g = BASE_PEAK_DB - peaks[cue["file"]] + cue["gain"]
    ms = int(round(cue["at"] * 1000))
    d = cue["dur"]
    return (f"[{k}:a]aresample={SR},aformat=channel_layouts=stereo,"
            f"silenceremove=start_periods=1:start_threshold=-45dB,"
            f"atrim=0:{d:.3f},asetpts=PTS-STARTPTS,afade=in:d=0.005,"
            f"afade=out:st={max(0.0, d - 0.15):.3f}:d=0.15,"
            f"volume={g:.2f}dB,adelay={ms}|{ms}[c{k}]")


def render_batch(batch, b_idx, peaks):
    out = os.path.join(TMP, f"fx_batch_{b_idx:02d}.wav")
    ins, fc = [], []
    for k, cue in enumerate(batch):
        ins += ["-i", os.path.join(ROOT, cue["file"])]
        fc.append(cue_filter(k, cue, peaks))
    labels = "".join(f"[c{k}]" for k in range(len(batch)))
    if len(batch) > 1:
        fc.append(f"{labels}amix=inputs={len(batch)}:normalize=0:duration=longest,"
                  f"apad=whole_len={NS},atrim=end_sample={NS}[fxout]")
    else:
        fc.append(f"{labels}apad=whole_len={NS},atrim=end_sample={NS}[fxout]")
    run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *ins,
         "-filter_complex", ";".join(fc), "-map", "[fxout]", "-t", f"{TOTAL:.3f}",
         "-c:a", "pcm_f32le", out])
    return out


def final_mix(bed_stems, fx_batches):
    ins = ["-i", os.path.join(ROOT, "voice", "narration.wav")]
    for s in bed_stems:
        ins += ["-i", s]
    for s in fx_batches:
        ins += ["-i", s]
    nb, nf = len(bed_stems), len(fx_batches)
    fc = [
        f"[0:a]aresample={SR},pan=stereo|c0=c0|c1=c0,apad=whole_len={NS},atrim=end_sample={NS},"
        f"loudnorm=I=-16:TP=-2:LRA=11,aresample={SR},apad=whole_len={NS},atrim=end_sample={NS},asplit=3[vm][vk][vq]"
    ]
    bl = []
    for k, bed in enumerate(C.BEDS):
        ms = int(round(bed["start"] * 1000))
        fc.append(f"[{1 + k}:a]aresample={SR},aformat=channel_layouts=stereo,"
                  f"adelay={ms}|{ms}[bed{k}]")
        bl.append(f"[bed{k}]")
    fc.append("".join(bl) + f"amix=inputs={nb}:normalize=0:duration=longest,"
              f"apad=whole_len={NS},atrim=end_sample={NS},asplit=2[bsA][bsB]")
    fc.append("[bsA][vk]sidechaincompress=threshold=0.04:ratio=5:attack=15:release=350[bd]")
    fc.append("[bd]asplit=2[bdm][bdq]")
    fc.append(";".join(f"[{1 + nb + k}:a]aresample={SR},aformat=channel_layouts=stereo[f{k}]"
                       for k in range(nf)))
    fc.append("".join(f"[f{k}]" for k in range(nf)) +
              f"amix=inputs={nf}:normalize=0:duration=longest,apad=whole_len={NS},"
              f"atrim=end_sample={NS}[fx]")
    fc.append("[vm][fx][bdm]amix=inputs=3:normalize=0:duration=first,highpass=f=60,"
              "acompressor=threshold=-16dB:ratio=2.5:attack=10:release=200,"
              "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=192000,"
              "alimiter=limit=0.8:level=false:attack=1:release=60,aresample=48000,"
              f"atrim=end_sample={NS_OUT}[out]")
    qa = lambda p: os.path.join(TMP, p)  # noqa: E731
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *ins,
           "-filter_complex", ";".join(fc),
           "-map", "[out]", "-t", f"{TOTAL:.3f}", "-c:a", "pcm_s16le", OUT,
           "-map", "[vq]", "-t", f"{TOTAL:.3f}", "-c:a", "pcm_f32le", qa("qa_voice.wav"),
           "-map", "[bsB]", "-t", f"{TOTAL:.3f}", "-c:a", "pcm_f32le", qa("qa_bed_unducked.wav"),
           "-map", "[bdq]", "-t", f"{TOTAL:.3f}", "-c:a", "pcm_f32le", qa("qa_bed_ducked.wav")]
    # the QA voice stem is the third split output of the voice chain
    run(cmd)


def main():
    cues = sorted(C.CUES, key=lambda c: c["at"])
    peaks = measure_peaks(sorted({c["file"] for c in cues}))
    print(f"{len(cues)} one-shot cues, {len(peaks)} distinct sfx files")

    bed_stems = []
    for idx, bed in enumerate(C.BEDS):
        bed_stems.append(render_bed(bed, idx))
        print("bed", bed["name"], f"{bed['start']:.2f}-{bed['end']:.2f}")

    batches = [cues[i:i + BATCH] for i in range(0, len(cues), BATCH)]
    fx = []
    for b, batch in enumerate(batches):
        fx.append(render_batch(batch, b, peaks))
        print(f"fx batch {b}: {len(batch)} cues")

    final_mix(bed_stems, fx)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
