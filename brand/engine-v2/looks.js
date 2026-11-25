// Bad Math engine v2 — LOOKS: the cast from SHOW-BIBLE §2.2-2.3 as data. Change a look here (or override it per scene: cast:{ rex:{ base:'CON', outfit:'apron' } }) and every video follows.
// A look = { head: round|square|oval|pear|bean, hair, outfit, build, palette:{top, top2, bottom, shoes, hair, accent, skin, brow}, accessories:['bowtie', 'glasses:round', 'flatcap:#...'], scale, size:{...} }
// Heads are Paper White for every human (bible 2.1); identity = head shape + hair/hat + costume + ONE tell visible in silhouette. Day/Night colours: swap palettes with palette overrides.
(function () {
  const C = window.BM2.Cast, D = C.define;
  D('HOST', { head: 'round', coin: true, cheeks: true, hair: 'bald', outfit: 'suit', palette: { skin: '#F2B705', top: '#2c3e66', top2: '#F5F3EE', bottom: '#2c3e66', shoes: '#6b4a2b', brow: '#6b4226', accent: '#FF3B30' }, accessories: ['bowtie'] });
  D('CON', { head: 'oval', hair: 'swoop', outfit: 'suit', palette: { top: '#59606B', top2: '#F5F3EE', bottom: '#2A3647', hair: '#0B0F14' }, accessories: ['pocketsquare'] });           // the only red on any person
  D('MARK', { head: 'round', hair: 'bun', outfit: 'plain', palette: { top: '#C9A66B', bottom: '#2A3647', hair: '#59606B' }, accessories: ['flatcap'] });
  D('RICH', { head: 'pear', hair: 'tuft', outfit: 'dinner', palette: { top: '#2A3647', top2: '#F5F3EE', bottom: '#1B2433', hair: '#59606B' }, accessories: [{ name: 'bowtie', color: '#F2B705' }] });
  D('JUDGE', { head: 'square', hair: 'bald', outfit: 'robe', build: 'wide', size: { hh: 62, hw: 64 }, palette: { top: '#0B0F14', top2: '#F5F3EE', bottom: '#0B0F14' } });                // huge robe, tiny head
  D('AGENT', { head: 'square', hair: 'bald', outfit: 'windbreaker', eyesHidden: true, chestText: 'FBI', palette: { top: '#1B2433', top2: '#F5F3EE', bottom: '#0B0F14' }, accessories: ['sunbar'] });
  D('YOU', { head: 'bean', hair: 'tuft', outfit: 'hoodie', palette: { top: '#7FCDEB', bottom: '#2A3647', hair: '#59606B' } });
  D('PAL', { head: 'round', hair: 'curly', outfit: 'jumper', palette: { top: '#9BE3C0', top2: '#F5F3EE', bottom: '#2A3647', hair: '#5A3FA0', accent: '#F58A2E' }, accessories: ['scarf'] });
  D('EXPERT', { head: 'oval', hair: 'parted', outfit: 'waistcoat', palette: { top: '#C9A66B', top2: '#F5F3EE', bottom: '#2A3647', hair: '#59606B' }, accessories: ['glasses:round'] });
  D('TELLER', { head: 'square', hair: 'parted', outfit: 'waistcoat', palette: { top: '#2A3647', top2: '#F5F3EE', bottom: '#1B2433', hair: '#0B0F14' }, accessories: ['visor'] });
  D('KID', { head: 'round', hair: 'tuft', outfit: 'plain', build: 'kid', palette: { top: '#F58A2E', bottom: '#2A3647', hair: '#59606B' } });
  D('CROWD', { head: 'round', hair: 'bald', outfit: 'plain', build: 'crowd', palette: { top: '#59606B', bottom: '#2A3647' } });
})();
