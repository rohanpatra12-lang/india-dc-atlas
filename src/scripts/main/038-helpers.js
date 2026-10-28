
/* ---------- helpers ---------- */
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const human=mld=>{const p=mld*1e6/135;return p>=1e5?`≈ ${fmt(p/1e5,1)} lakh people's daily water`:`≈ ${fmt(p)} people's daily water`};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
