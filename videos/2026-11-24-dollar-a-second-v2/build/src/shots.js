// Bad Math — What If: "$1 every second" (3D version). Built on the zach-d-films engine.
import * as THREE from 'three';
import { makeHuman } from './human.js';
import { glowSprite, sparks } from './props.js';
import { materials } from './materials.js';
import { kf, lerp, smooth, easeOut, easeInOut, range, clamp, V, cam, place, shake } from './anim.js';

export const DURATION = 28.8;
export const CAPTIONS = [];      // captions are drawn by the HTML overlay (see window.overlay)
// silence before the reveal: dip toward black
export const FADES = [[19.72, 19.98, 20.5, 20.74]];

// ---------------- the money math (all shots read the same global clock) ----------------
const lgl = (a, b, x) => Math.exp(lerp(Math.log(a), Math.log(b), x));
export function amount(t) {
  if (t < 5.45) return Math.floor(Math.max(0, t)) + 1;
  const seg = [[5.45, 7.0, 6, 60], [7.8, 9.6, 60, 3600], [10.3, 12.9, 3600, 86400], [13.8, 15.6, 86400, 1e6],
    [16.45, 18.5, 1e6, 31536000], [19.3, 19.6, 31536000, 63072000], [20.74, 21.2, 63072000, 1e9]];
  let v = 6;
  for (const [a, b, f, to] of seg) { if (t < a) return v; v = lgl(f, to, easeInOut(range(t, a, b))); }
  return v;
}
// one US $1 bill ≈ 2.61 × 6.14 × 0.0043 in ≈ 1.13e-6 m³ → a pile of N bills is a cube of side (N·1.13e-6)^(1/3)
const BILL_M3 = 1.13e-6;
const cubeSide = n => Math.cbrt(n * BILL_M3);
// the tank holds exactly $1B: r = 5.5 m, h = 1.13e-6·1e9 / (π·5.5²) ≈ 11.9 m
const TANK = { x: 6.2, z: -12.5, r: 5.5, h: (BILL_M3 * 1e9) / (Math.PI * 5.5 * 5.5) };
const age = t => smooth(range(t, 20.8, 21.9));

// ---------------- textures ----------------
let TX = null;
function textures() {
  if (TX) return TX;
  const bill = document.createElement('canvas'); bill.width = 512; bill.height = 218;
  let g = bill.getContext('2d');
  g.fillStyle = '#cfe0c4'; g.fillRect(0, 0, 512, 218);
  g.strokeStyle = '#2f6a3a'; g.lineWidth = 10; g.strokeRect(12, 12, 488, 194);
  g.lineWidth = 3; g.strokeRect(26, 26, 460, 166);
  g.fillStyle = '#3d7a46'; g.beginPath(); g.ellipse(256, 109, 62, 76, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#cfe0c4'; g.beginPath(); g.ellipse(256, 109, 48, 62, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#2f6a3a'; g.font = '400 70px Anton'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('$1', 256, 112); g.font = '400 54px Anton'; g.fillText('1', 64, 64); g.fillText('1', 448, 156);
  g.fillText('1', 448, 64); g.fillText('1', 64, 156);
  const edge = document.createElement('canvas'); edge.width = 64; edge.height = 256;
  g = edge.getContext('2d');
  for (let y = 0; y < 256; y += 2) { g.fillStyle = (y / 2) % 3 ? '#9fc29a' : '#e6efe0'; g.fillRect(0, y, 64, 2); }
  const band = document.createElement('canvas'); band.width = 256; band.height = 64;
  g = band.getContext('2d'); g.fillStyle = '#c9b27a'; g.fillRect(0, 0, 256, 64);
  const sign = document.createElement('canvas'); sign.width = 1024; sign.height = 300;
  g = sign.getContext('2d'); g.fillStyle = '#0B0F14'; g.beginPath(); g.roundRect(0, 0, 1024, 300, 40); g.fill();
  g.strokeStyle = '#FFD60A'; g.lineWidth = 16; g.beginPath(); g.roundRect(14, 14, 996, 272, 30); g.stroke();
  g.fillStyle = '#FFD60A'; g.font = '400 190px Anton'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$1 BILLION', 512, 158);
  const mk = (c, rep) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); } return t; };
  TX = {
    bill: new THREE.MeshStandardMaterial({ map: mk(bill), roughness: 0.8, side: THREE.DoubleSide }),
    edge: new THREE.MeshStandardMaterial({ map: mk(edge, [6, 1]), roughness: 0.85 }),
    top: new THREE.MeshStandardMaterial({ map: mk(bill, [3, 6]), roughness: 0.8 }),
    fillTop: new THREE.MeshStandardMaterial({ map: mk(bill, [14, 30]), roughness: 0.8 }),
    fillSide: new THREE.MeshStandardMaterial({ map: mk(edge, [40, 30]), roughness: 0.85 }),
    sign: new THREE.MeshBasicMaterial({ map: mk(sign), toneMapped: false }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xdff3ff, transparent: true, opacity: 0.16, roughness: 0.05, metalness: 0, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }),
    rimM: new THREE.MeshStandardMaterial({ color: 0x2a2f36, metalness: 0.8, roughness: 0.35 }),
    hoodie: new THREE.MeshStandardMaterial({ color: 0x2c3e66, roughness: 0.9 }),
    shoe: new THREE.MeshStandardMaterial({ color: 0xf2f0ea, roughness: 0.6 }),
  };
  return TX;
}

// ---------------- props ----------------
function billMesh() { return new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.002, 0.107), textures().bill); } // ~1.6× real size so it reads on a phone
function cashCube() {
  const T = textures();
  const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), [T.edge, T.edge, T.top, T.top, T.edge, T.edge]);
  m.castShadow = m.receiveShadow = true;
  return m;
}
function tank() {
  const T = textures(), g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(TANK.r, TANK.r, TANK.h, 96, 1, true), T.glass);
  glass.position.y = TANK.h / 2; glass.renderOrder = 2; g.add(glass);
  for (const y of [0.05, TANK.h]) { const r = new THREE.Mesh(new THREE.TorusGeometry(TANK.r, 0.09, 12, 128), T.rimM); r.rotation.x = Math.PI / 2; r.position.y = y; g.add(r); }
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, TANK.h, 8), T.rimM); p.position.set(Math.cos(a) * TANK.r, TANK.h / 2, Math.sin(a) * TANK.r); g.add(p); }
  // ruler ticks (10% steps) facing the camera side
  for (let i = 1; i < 10; i++) { const tk = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.05), T.rimM); tk.position.set(-TANK.r * 0.7, TANK.h * i / 10, TANK.r * 0.71); tk.rotation.y = -0.78; g.add(tk); }
  const fill = new THREE.Mesh(new THREE.CylinderGeometry(TANK.r - 0.06, TANK.r - 0.06, 1, 96), [T.fillSide, T.fillTop, T.fillTop]);
  fill.receiveShadow = true; g.add(fill);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(6.8, 2.0), T.sign);
  sign.position.set(-1.2, TANK.h + 1.4, TANK.r * 0.55); sign.rotation.y = -0.35; g.add(sign);
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), T.rimM); post.position.set(-1.2, TANK.h + 0.3, TANK.r * 0.55 - 0.05); g.add(post);
  const low = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.24), T.sign);
  low.position.set(-0.403 * (TANK.r + 0.12), 3.0, 0.915 * (TANK.r + 0.12)); low.rotation.y = -0.415; g.add(low);
  g.position.set(TANK.x, 0, TANK.z);
  g.setFill = (frac) => { const h = Math.max(0.0005, TANK.h * clamp(frac)); fill.scale.y = h; fill.position.y = h / 2; fill.visible = frac > 1e-6; };
  return g;
}

// ---------------- the character (ages at the reveal) ----------------
const STAND = { lSh: [0.05, 0, 0.16], rSh: [0.05, 0, -0.16], lEl: [-0.25, 0, 0], rEl: [-0.25, 0, 0], lHip: [0, 0, 0.07], rHip: [0, 0, -0.07], lAn: [0, 0, -0.07], rAn: [0, 0, 0.07] };
const C0 = { hair: new THREE.Color(0x3a2618), beard: new THREE.Color(0x5c4434), skin: new THREE.Color(0xd99b7a) };
const C1 = { hair: new THREE.Color(0xdedede), beard: new THREE.Color(0xeeeeee), skin: new THREE.Color(0xd6a58e) };
function makeGuy() {
  const T = textures(), M = materials();
  const h = makeHuman('casual');
  h.root.traverse(o => { if (o.isMesh && o.material === M.cloth) o.material = T.hoodie; });
  // sneakers over the bare feet
  for (const k of ['lAn', 'rAn']) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.26), T.shoe); s.position.set(0, -0.045, 0.06); s.castShadow = true; h.j[k].add(s); }
  // a fuller beard that grows in with age
  const beard = new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 16), M.beard.clone());
  beard.scale.set(1.1, 0.9, 1.0); beard.position.set(0, -0.035, 0.035); beard.material.transparent = true;
  h.j.head.children[0] && h.j.head.add(beard);
  h.beardGrow = beard;
  return h;
}
function poseGuy(h, gt, lt, extra = {}) {
  const a = age(gt), M = materials();
  M.hair.color.copy(C0.hair).lerp(C1.hair, a);
  M.beard.color.copy(C0.beard).lerp(C1.beard, a);
  M.skin.color.copy(C0.skin).lerp(C1.skin, a);
  h.beardGrow.material.color.copy(M.beard.color); h.beardGrow.material.opacity = a * 0.95; h.beardGrow.visible = a > 0.01;
  const idle = Math.sin(lt * 1.6) * 0.012;
  const stoop = a * 0.32;
  const p = { ...STAND, ...extra };
  p.chest = [idle + stoop + (extra.chest?.[0] || 0), extra.chest?.[1] || 0, extra.chest?.[2] || 0];
  p.neck = [(extra.neck?.[0] || 0) - stoop * 0.6, extra.neck?.[1] || 0, 0];
  p.lKn = [a * 0.18, 0, 0]; p.rKn = [a * 0.18, 0, 0]; p.lHip = [-a * 0.12, 0, 0.07]; p.rHip = [-a * 0.12, 0, -0.07];
  p.drop = -a * 0.03 + (extra.drop || 0);
  h.setPose(p);
}
const LOOKUP = { neck: [-0.35, 0, 0], head: [-0.35, 0, 0] };
const SHRUG = { lSh: [-0.2, 0, 0.55], rSh: [-0.2, 0, -0.55], lEl: [-1.5, 0.6, 0], rEl: [-1.5, -0.6, 0], head: [0, 0, 0.12] };
const CHEER = { lSh: [0, 0, 2.7], rSh: [0, 0, -2.7], lEl: [-0.35, 0, 0], rEl: [-0.35, 0, 0], head: [-0.15, 0, 0] };

// ---------------- shared world ----------------
const PILE = V(0.62, 0, 0.32);
function world({ makeStage }, opts = {}) {
  const scene = makeStage({ shadowSize: opts.shadowSize || 3, sunDir: [-3, 6, 4] });
  const man = makeGuy(); man.root.rotation.y = 0.18; scene.add(man.root);
  const tk = tank(); scene.add(tk);
  const pile = cashCube(); scene.add(pile);
  const bills = []; for (let i = 0; i < 70; i++) { const b = billMesh(); b.castShadow = true; scene.add(b); bills.push(b); }
  const sky = scene.userData.sky.material.uniforms, key = scene.userData.key;
  const base = { top: sky.top.value.clone(), mid: sky.mid.value.clone(), horizon: sky.horizon.value.clone(), floorC: sky.floorC.value.clone() };
  const NIGHT = { top: new THREE.Color(0x0b1430), mid: new THREE.Color(0x1a2850), horizon: new THREE.Color(0x34406a), floorC: new THREE.Color(0x2a3554) };
  const DUSK = { top: new THREE.Color(0x2a4f9a), mid: new THREE.Color(0xd9865a), horizon: new THREE.Color(0xffc27a), floorC: new THREE.Color(0xe0a070) };
  const keyBase = key.intensity;
  return {
    scene, man, tk, pile, bills,
    // money state for global time gt
    money(gt, pileOn = true) {
      const a = amount(gt);
      tk.setFill(a / 1e9);
      const s = cubeSide(Math.min(a, 1e6));
      pile.visible = pileOn && a >= 50;
      pile.scale.set(s * 1.35, s, s);
      pile.position.set(PILE.x, s / 2, PILE.z);
      return a;
    },
    // sky: 0 day, 1 night, d = dusk mix
    sky(night = 0, dusk = 0, sunAngle = null) {
      for (const k of ['top', 'mid', 'horizon', 'floorC']) sky[k].value.copy(base[k]).lerp(DUSK[k], dusk).lerp(NIGHT[k], night);
      key.intensity = keyBase * (1 - 0.8 * night);
      key.color.setRGB(1, 1 - 0.25 * dusk, 1 - 0.45 * dusk);
      if (sunAngle != null) { key.position.set(Math.cos(sunAngle) * 6, Math.max(0.6, Math.sin(sunAngle) * 7), 3); }
    },
    // bills: single drops at given times, or a rain stream with rate (bills/s)
    drops(lt, times, land = PILE) {
      let i = 0;
      for (const s of times) {
        const age = lt - s; const b = bills[i++];
        if (age < -0.0) { b.visible = false; continue; }
        b.visible = true;
        const fall = 0.95, h0 = 2.5;
        const k = clamp(age / fall);
        const r = (Math.sin(s * 91.7) * 0.5);
        if (k < 1) { b.position.set(land.x + r * 0.2, lerp(h0, 0.01 + i * 0.002, k * k), land.z + 0.05 * i); b.rotation.set(Math.sin(age * 9 + s) * 0.9, age * 2 + s, Math.cos(age * 7 + s) * 0.6); }
        else { b.position.set(land.x + r * 0.2, 0.004 + i * 0.002, land.z + 0.05 * i); b.rotation.set(0, s * 1.3, 0); }
      }
      for (; i < bills.length; i++) bills[i].visible = false;
    },
    rain(lt, rate, land = PILE, top = 2.6, spread = 0.35, landY = 0) {
      const fall = 0.8; let used = 0;
      const k0 = Math.floor((lt - fall) * rate), k1 = Math.floor(lt * rate);
      for (let k = Math.max(0, k0); k <= k1 && used < bills.length; k++) {
        const s = k / rate, age = lt - s; if (age < 0 || age > fall) continue;
        const b = bills[used++]; b.visible = true;
        const hx = Math.sin(k * 12.9898) * 43758.5453 % 1, hz = Math.sin(k * 78.233) * 12345.678 % 1;
        const q = age / fall;
        b.position.set(land.x + hx * spread, lerp(top, landY + 0.02, q * q), land.z + hz * spread);
        b.rotation.set(Math.sin(age * 9 + k) * 1.1, age * 3 + k, Math.cos(age * 7 + k) * 0.7);
      }
      for (; used < bills.length; used++) bills[used].visible = false;
    },
  };
}

// ============ SHOT 1 (0–3.79): one dollar, every second ============
function shot1(ctx) {
  const W = world(ctx, { shadowSize: 2.5 });
  const c = cam(36);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = t;
      W.money(gt); W.sky(0, 0);
      poseGuy(W.man, gt, t, { neck: [0.1, 0.25, 0], head: [0.15, 0.2, 0] });
      W.man.setMouth(0.05);
      W.drops(t, [-0.42, 0.58, 1.58, 2.58, 3.58].map(x => x));   // the first bill is already mid-air on frame 0
      const k = easeInOut(range(t, 0, 3.8));
      const s = shake(t, 0.5);
      place(c, [lerp(-1.7, -1.4, k) + s[0], lerp(1.25, 1.2, k) + s[1], lerp(5.4, 4.7, k)], [lerp(1.3, 1.2, k), lerp(1.75, 1.65, k), -3]);
      return { dof: { focus: c.position.distanceTo(V(0.3, 1.0, 0.2)), aperture: 0.0008, maxblur: 0.004 }, bloom: 0.4 };
    },
  };
}

// ============ SHOT 2 (3.79–5.45): when are you a billionaire? crane up the tank ============
function shot2(ctx) {
  const W = world(ctx, { shadowSize: 6 });
  const c = cam(40);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 3.79 + t;
      W.money(gt); W.sky(0, 0);
      poseGuy(W.man, gt, t, LOOKUP); W.man.setMouth(0.15);
      W.drops(t, [0.79 - 0.0, 1.79 - 1.0].map(x => x));
      const k = easeInOut(range(t, 0, 1.66));
      place(c, [lerp(-1.6, -4.5, k), lerp(0.6, 1.2, k), lerp(2.6, 9.5, k)], [lerp(0.2, 4.2, k), lerp(1.5, 10.5, k), lerp(-1, -9, k)]);
      return { dof: { focus: 8, aperture: 0, maxblur: 0 }, bloom: 0.35 };
    },
  };
}

// ============ SHOT 3 (5.45–10.3): a minute, an hour — the pile starts ============
function shot3(ctx) {
  const W = world(ctx, { shadowSize: 2.5 });
  const c = cam(36);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 5.45 + t;
      W.money(gt); W.sky(0, 0);
      poseGuy(W.man, gt, t, { neck: [0.25, 0.35, 0], head: [0.2, 0.25, 0] }); W.man.setMouth(0.1 + 0.15 * range(t, 2.3, 3));
      W.rain(t, lerp(3, 14, range(t, 0, 4.5)), PILE, 2.8, 0.3);
      const k = easeInOut(range(t, 0, 4.85));
      const s = shake(t, 0.5, 2);
      place(c, [lerp(-2.3, -1.9, k) + s[0], lerp(1.1, 1.0, k) + s[1], lerp(6.0, 5.3, k)], [0.5, lerp(1.25, 1.15, k), -1]);
      return { dof: { focus: c.position.distanceTo(V(0.55, 0.4, 0.3)), aperture: 0.0025, maxblur: 0.008 }, bloom: 0.35 };
    },
  };
}

// ============ SHOT 4 (10.3–13.8): one day — the sun crosses the sky ============
function shot4(ctx) {
  const W = world(ctx, { shadowSize: 4 });
  const c = cam(38);
  const sun = glowSprite(0xfff0b0, 3.2); W.scene.add(sun);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 10.3 + t;
      W.money(gt);
      const sp = range(t, 0, 3.0), ang = lerp(2.9, 0.25, sp);
      const dusk = Math.max(0, 1 - Math.abs(sp - 0.5) * 2.4) > 0 ? Math.pow(Math.abs(sp - 0.5) * 2, 3) : 0;
      W.sky(0, dusk * 0.8, ang);
      sun.position.set(Math.cos(ang) * 40 + 3, Math.sin(ang) * 28 + 2, -45); sun.material.opacity = 0.9;
      poseGuy(W.man, gt, t, { neck: [-0.1, 0.1, 0], head: [-0.1, 0.1, 0] }); W.man.setMouth(0.05);
      W.rain(t, 16, PILE, 3.0, 0.35);
      const k = easeInOut(range(t, 0, 3.5));
      place(c, [lerp(-2.6, -2.2, k), lerp(1.7, 1.9, k), lerp(5.8, 5.2, k)], [lerp(1.4, 1.6, k), 1.9, -3]);
      return { dof: { focus: 5.5, aperture: 0, maxblur: 0 }, bloom: 0.45 };
    },
  };
}

// ============ SHOT 5 (13.8–16.45): millionaire in under 12 days ============
function shot5(ctx) {
  const W = world(ctx, { shadowSize: 3 });
  const c = cam(38);
  const sp = sparks(160, { speed: 2.2, spread: 0.9, gravity: -3.2, life: 1.3, size: 0.06, dir: V(0, 1, 0), seed: 11, color: [1, 0.84, 0.04] });
  W.scene.add(sp);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 13.8 + t;
      W.money(gt); W.sky(0, 0);
      const T = 15.6 - 13.8;                    // the $1M moment
      const jump = t > T ? Math.max(0, Math.sin(clamp((t - T) / 0.55) * Math.PI)) * 0.22 : 0;
      const cheer = smooth(range(t, T - 0.15, T + 0.1));
      poseGuy(W.man, gt, t, cheer > 0 ? { ...CHEER, drop: jump } : { neck: [0.2, 0.35, 0], head: [0.2, 0.25, 0] });
      if (cheer > 0) { W.man.root.position.y = jump; } else W.man.root.position.y = 0;
      W.man.setMouth(cheer > 0 ? 0.7 : 0.1);
      W.rain(t, 20, PILE, 3.0, 0.45, 1.0);
      sp.position.set(PILE.x, 1.1, PILE.z); sp.update(t - T);
      const k = easeInOut(range(t, 0, 2.65));
      const s = shake(t, t > T && t < T + 0.4 ? 3 : 0.5, 4);
      place(c, [lerp(-2.8, -2.4, k) + s[0], lerp(0.9, 1.0, k) + s[1], lerp(5.6, 5.0, k)], [0.45, lerp(1.45, 1.4, k), -1]);
      return { dof: { focus: c.position.distanceTo(V(0.3, 1, 0.2)), aperture: 0.0015, maxblur: 0.006 }, bloom: t > T ? 0.8 : 0.4 };
    },
  };
}

// ============ SHOT 6 (16.45–19.72): so a billion's what — a year? two? ============
function shot6(ctx) {
  const W = world(ctx, { shadowSize: 6 });
  const c = cam(40);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 16.45 + t;
      W.money(gt);
      const n = 0.5 - 0.5 * Math.cos(t * Math.PI * 2 * 0.9);      // days passing
      W.sky(n * 0.75 * range(t, 0, 0.4), 0, 1.3);
      const sh = smooth(range(t, 1.9, 2.3)) * (1 - smooth(range(t, 3.0, 3.3)));
      poseGuy(W.man, gt, t, sh > 0 ? { ...SHRUG } : { neck: [0, 0.6, 0], head: [-0.1, 0.4, 0] });
      W.man.setMouth(0.2 * sh);
      for (const b of W.bills) b.visible = false;
      const k = easeInOut(range(t, 0, 3.27));
      place(c, [lerp(-2.4, -1.9, k), lerp(1.4, 1.6, k), lerp(4.2, 3.6, k)], [lerp(2.0, 2.6, k), lerp(1.3, 1.1, k), -6]);
      return { dof: { focus: 4.0, aperture: 0.001, maxblur: 0.004 }, bloom: 0.35 };
    },
  };
}

// ============ SHOT 7 (19.72–23.6): thirty-one years — the tank fills, he gets old ============
function shot7(ctx) {
  const W = world(ctx, { shadowSize: 6 });
  const c = cam(40);
  const sp = sparks(220, { speed: 4, spread: 1.2, gravity: -5, life: 1.4, size: 0.18, dir: V(0, 1, 0), seed: 5, color: [1, 0.84, 0.04] });
  W.scene.add(sp);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 19.72 + t;
      W.money(gt);
      const spin = range(gt, 20.74, 21.25);
      const strobe = spin > 0 && spin < 1 ? 0.5 - 0.5 * Math.cos(gt * Math.PI * 2 * 7) : 0;
      W.sky(strobe * 0.8, smooth(range(gt, 21.2, 22.0)) * 0.55, lerp(1.3, 0.45, smooth(range(gt, 21.2, 22.2))));
      const shock = smooth(range(gt, 21.15, 21.4));
      poseGuy(W.man, gt, t, { neck: [-0.2 * shock, 0.55 - 0.45 * shock, 0], head: [-0.1, 0.35 - 0.3 * shock, 0] });
      W.man.setMouth(shock * 0.9);
      for (const b of W.bills) b.visible = false;
      sp.position.set(TANK.x, TANK.h, TANK.z + 2); sp.update(gt - 21.2);
      const s = shake(gt, gt > 21.2 && gt < 21.7 ? 6 : 0.4, 7);
      if (gt < 21.45) {
        W.man.root.rotation.y = 0.18;
        const k = easeInOut(range(gt, 19.72, 21.45));
        c.fov = 58; place(c, [lerp(-4.6, -4.0, k) + s[0], lerp(1.6, 1.8, k) + s[1], lerp(10.5, 9.6, k)], [2.6, lerp(5.6, 6.2, k), -6]);
        return { dof: { focus: 9, aperture: 0, maxblur: 0 }, bloom: gt > 21.2 ? 1.1 : 0.45 };
      }
      W.man.root.rotation.y = -0.25;
      c.fov = 40;
      const k = easeInOut(range(gt, 21.45, 23.6));
      place(c, [lerp(-0.75, -0.6, k) + s[0], lerp(1.62, 1.6, k) + s[1], lerp(1.75, 1.45, k)], [0.1, lerp(1.5, 1.52, k), 0]);
      return { dof: { focus: c.position.distanceTo(V(0, 1.55, 0.05)), aperture: 0.004, maxblur: 0.01 }, bloom: gt < 21.9 ? 0.9 : 0.45 };
    },
  };
}

// ============ SHOT 8 (23.6–28.8): a million is a vacation. a billion is your whole life ============
function shot8(ctx) {
  const W = world(ctx, { shadowSize: 8 });
  const c = cam(42);
  const mil = cashCube(); W.scene.add(mil);
  const s1 = cubeSide(1e6); mil.scale.set(s1 * 1.35, s1, s1); mil.position.set(-1.4, s1 / 2, 0.3);
  return {
    scene: W.scene, camera: c,
    update(t) {
      const gt = 23.6 + t;
      W.money(gt, false); W.sky(0, 0.6, 0.45);
      poseGuy(W.man, gt, t, { neck: [0, 0.1, 0], head: [0.05, 0.1, 0] }); W.man.setMouth(0.0);
      for (const b of W.bills) b.visible = false;
      mil.visible = gt >= 23.65;
      const k = easeInOut(range(t, 0, 5.2));
      place(c, [lerp(-1.0, -4.5, k), lerp(1.4, 4.0, k), lerp(4.2, 15.5, k)], [lerp(-0.3, 2.6, k), lerp(1.0, 4.6, k), lerp(0, -6, k)]);
      return { dof: { focus: 8, aperture: 0, maxblur: 0 }, bloom: 0.4 };
    },
  };
}

export const SHOTS = [
  { start: 0, end: 3.79, build: shot1 },
  { start: 3.79, end: 5.45, build: shot2 },
  { start: 5.45, end: 10.3, build: shot3 },
  { start: 10.3, end: 13.8, build: shot4 },
  { start: 13.8, end: 16.45, build: shot5 },
  { start: 16.45, end: 19.72, build: shot6 },
  { start: 19.72, end: 23.6, build: shot7 },
  { start: 23.6, end: 28.8, build: shot8 },
];
