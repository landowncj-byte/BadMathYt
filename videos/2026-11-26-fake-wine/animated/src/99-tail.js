  ],
};
// prop lifetimes: a prop lives for its own shot unless `keep: true` (set dressing) or it has explicit in / out
SPEC.shots.forEach((sh, i) => { const nx = SPEC.shots[i + 1]; for (const p of sh.props || []) { if (p.keep) continue; if (p.in === undefined) p.in = sh.at; if (p.out === undefined && nx) p.out = nx.at; } });
BM2.IMG = {}; const photosReady = Promise.all(Object.entries(window.PHOTOS || {}).map(([k, u]) => new Promise(r => { const i = new Image(); i.onload = () => { BM2.IMG[k] = i; r(); }; i.onerror = r; i.src = u; })));
window.ready = photosReady.then(() => { BM2.story(SPEC); return window.ready; });
})();
