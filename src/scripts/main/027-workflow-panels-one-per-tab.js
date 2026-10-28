
/* ---------- WORKFLOW PANELS (one per tab) ---------- */
{
const ST=['Sources','Your inputs','Calculation','Outputs','How to use it'];
const BL={r:'reported',e:'estimate',m:'model',i:'illustrative'};
Object.entries(WF).forEach(([id,w])=>{
  const sec=document.getElementById(id);if(!sec||sec.querySelector(':scope > .wf'))return;
  const chips=w.basis.map(([c,t])=>`<span class="ev ${c} show" title="${t}">${BL[c]}</span><span class="wf-bt">${t}</span>`).join(' ');
  const pipe=w.pipe.map(([s,t],i)=>`<li><span class="wf-n">${i+1}</span><b>${ST[i]}</b><span>${t}</span></li>`).join('');
  const steps=w.steps.map(s=>`<li>${s}</li>`).join('');
  const rows=w.vis.map(([a,b,c,d])=>`<tr><th>${a}</th><td>${b}</td><td>${c}</td><td>${d}</td></tr>`).join('');
  const html=`<div class="wf" role="region" aria-label="How this tab works">
   <div class="wf-h"><span class="wf-t">How this tab works</span><span class="wf-b">${chips}</span></div>
   <ol class="wf-pipe">${pipe}</ol>
   <details class="wf-d"><summary>Step-by-step workflow and what each visual does</summary>
     <div class="wf-body"><div><h4>What happens, in order</h4><ol class="wf-steps">${steps}</ol></div>
     <div><h4>Visual by visual</h4><div class="tbl"><table class="wf-tab"><thead><tr><th>Visual</th><th>Data in</th><th>What the page computes</th><th>What you see</th></tr></thead><tbody>${rows}</tbody></table></div></div></div>
   </details></div>`;
  const head=sec.querySelector(':scope > .ch-head');
  if(head)head.insertAdjacentHTML('afterend',html);
  else{const l=sec.querySelector(':scope > .lede');(l||sec.firstElementChild).insertAdjacentHTML('afterend',html)}
});
}

