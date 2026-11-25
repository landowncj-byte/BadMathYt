function coin(c, x, y, r, rot = 0, sq = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(1, sq); c.fillStyle = '#F2B705'; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill(); c.strokeStyle = '#a87a00'; c.lineWidth = r * .14; c.stroke();
  c.strokeStyle = '#ffe27a'; c.lineWidth = r * .1; c.beginPath(); c.arc(0, 0, r * .68, 0, 7); c.stroke(); txt(c, '$', 0, r * .05, `800 ${r * 1.0}px JBM`, '#a87a00'); c.restore(); }
function bill(c, x, y, rot, s, sq = 1) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s * sq); c.fillStyle = '#2fbf71'; rr(c, -52, -26, 104, 52, 6); c.fill(); c.strokeStyle = '#0a7a40'; c.lineWidth = 4; c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2.5; rr(c, -44, -19, 88, 38, 4); c.stroke(); c.fillStyle = '#d9ffe8'; c.beginPath(); c.arc(0, 0, 14, 0, 7); c.fill(); txt(c, '$', 0, 1, '800 20px JBM', '#0a7a40'); c.restore(); }
// glass jar: origin = bottom center. level 0..1
