
/* ---------- READING MODES ---------- */
V2.mode=m=>{document.body.classList.toggle('brief',m==='brief');document.querySelectorAll('[data-m]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m));try{localStorage.setItem('atlas-mode',m)}catch(e){}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(b&&b.closest('.scbar-modes,.modebar'))V2.mode(b.dataset.m);const pr=e.target.closest('#print-brief');if(pr){V2.mode('brief');setTimeout(()=>window.print(),300)}});
document.querySelectorAll('section.chw').forEach(sec=>{const p=sec.querySelector('.v2core')||sec.querySelector('.subch .panel');if(p)p.classList.add('core')});
try{if(localStorage.getItem('atlas-mode')==='brief')V2.mode('brief')}catch(e){}
