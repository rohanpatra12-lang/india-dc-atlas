
/* ---------- SIGNATURE 7: SIZE-TO-SCALE CIRCLES ---------- */
V2.circ=()=>{const el=document.getElementById('v2-circ');if(!el||!window.__AIF)return;const r=window.__AIF.cmpCalc();const rows=[[`AI campus ${fmt(r.mw)} MW`,r.tot,'--cold']].concat(window.__AIF.FAC.map(f=>[f.n,(f.lo+f.hi)/2,'--muted']));const mx=Math.max(...rows.map(x=>x[1]));
 el.innerHTML=rows.sort((a,b)=>b[1]-a[1]).map(([n,v,c])=>{const d=Math.max(8,Math.sqrt(v/mx)*120);return `<figure class="circ"><div style="width:${d}px;height:${d}px;background:var(${c})" class="circ-d"></div><figcaption><b class="mono">${fmt(v,v<10?1:0)} MLD</b><span>${n}</span></figcaption></figure>`}).join('')};
(()=>{const t=document.getElementById('ai-cmp');if(t)new MutationObserver(()=>V2.circ()).observe(t,{childList:true})})();
