#!/usr/bin/env python3
# usage: qa_write.py <topic dir> "<notes>"   -> appends RENDERED READY lines + notes under "## CRIME-SHOW BUILD STATUS"
import sys,subprocess,re,os
t=sys.argv[1]; notes=sys.argv[2] if len(sys.argv)>2 else ''
def stats(p):
    d,s=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration,size','-of','csv=p=0',p],capture_output=True,text=True).stdout.strip().split(',')
    o=subprocess.run(['ffmpeg','-nostats','-i',p,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    I=re.findall(r'I:\s+(-?[\d.]+) LUFS',o)[-1]
    return float(d),int(s)/1e6,I
out=['','RENDERED READY (night builder 2026-11-26, engine v2 + videos/_lib/cs.js screen-stage; beds exactly as assigned; mix v2 (quiet bed); TikTok mixed with BM2_BED_DB=-12):']
for name,p in [('youtube','video.mp4'),('tiktok','tiktok/video.mp4'),('ig','ig/video.mp4')]:
    d,s,I=stats(os.path.join(t,p)); out.append('RENDERED READY: %s (%s/%s) %.2fs %.1fMB, %s LUFS'%(name,os.path.basename(t.rstrip('/')),p,d,s,I))
if notes: out.append(notes)
q=os.path.join(t,'qa.md'); s=open(q).read()
if 'RENDERED READY:' in s: s=s[:s.index('\nRENDERED READY (night builder')] if '\nRENDERED READY (night builder' in s else s
open(q,'w').write(s.rstrip('\n')+'\n'+'\n'.join(out)+'\n')
print('\n'.join(out))
