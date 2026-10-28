
/* ---------- READING GUIDES: "How to read this" on every visual ---------- */
(()=>{if(typeof document==='undefined')return;
const TILES={s:'Ten headline numbers, each on a card. Most cards have a small bar under the number: the shaded band is the published range and the marks show where today and the atlas central case sit within it.',r:'Read the big number first, then the sentence under it, then the tag (reported, model or estimate) that says how solid it is. Tap a card to jump to the chapter that explains it.',m:'Together they are the atlas in one screen: how big India\'s data centres are and will be, how much power and water they need, where that water really goes, and what rules exist.',w:'Ranges matter more than the single number; each chapter shows how the range was built.'};
const norm=t=>(t||'').replace(/\s+/g,' ').trim();
const box=g=>`<details class="rdx"><summary><span class="rdx-i" aria-hidden="true">?</span>How to read this</summary><div class="rdx-b"><p><b>What you see.</b> ${g.s}</p><p><b>How to read it.</b> ${g.r}</p><p><b>What it tells you.</b> ${g.m}</p>${g.w?`<p><b>Careful.</b> ${g.w}</p>`:''}</div></details>`;
const allOpen=()=>{const c=document.getElementById('rdx-all');return !!(c&&c.checked)};
function guideFor(p){const h=p.querySelector(':scope > h3')||(!p.querySelector('.panel')&&p.querySelector('h3'));const key=h?norm(h.childNodes[0]&&h.childNodes[0].textContent):'';
 if(RG[key])return [RG[key],h];for(const id of ['c-radar','c-states','s-pre','st-body'])if(p.querySelector('#'+id)&&RG['#'+id])return [RG['#'+id],null];return [null,null]}
let n=0;
function apply(){document.querySelectorAll('main .panel').forEach(p=>{if(p.classList.contains('moved')||p.querySelector(':scope > details.rdx'))return;const [g,h]=guideFor(p);if(!g)return;
  const t=document.createElement('div');t.innerHTML=box(g);const d=t.firstElementChild;if(allOpen())d.open=true;if(h&&h.parentElement===p)h.after(d);else p.prepend(d);n++});
 const tk=document.querySelector('.tks');if(tk&&!(tk.previousElementSibling&&tk.previousElementSibling.classList.contains('rdx'))){const t=document.createElement('div');t.innerHTML=box(TILES);tk.before(t.firstElementChild)}
 window.__RDX={count:()=>document.querySelectorAll('details.rdx').length,keys:Object.keys(RG).length}}
let tm=0;const sched=()=>{clearTimeout(tm);tm=setTimeout(apply,250)};
const start=()=>{apply();setTimeout(apply,1500);const m=document.querySelector('main');if(m&&window.MutationObserver)new MutationObserver(sched).observe(m,{childList:true,subtree:true})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else setTimeout(start,0);
document.addEventListener('change',e=>{if(e.target&&e.target.id==='rdx-all'){const o=e.target.checked;document.querySelectorAll('details.rdx').forEach(d=>d.open=o);try{localStorage.setItem('atlas-rdx',o?'1':'0')}catch(_){}}});
try{if(localStorage.getItem('atlas-rdx')==='1'){const c=document.getElementById('rdx-all');if(c)c.checked=true}}catch(_){}
})();

