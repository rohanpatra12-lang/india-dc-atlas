
/* ---------- NAV ---------- */
const links=$$('#rail a');
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));const on=links.find(a=>a.classList.contains('on'));const ol=$('#rail');if(on&&ol.scrollWidth>ol.clientWidth)ol.scrollTo({left:on.parentElement.offsetLeft-20,behavior:'smooth'})}})},{rootMargin:'-40% 0px -55% 0px'});
['overview', 'cwhy', 'c1', 'c2', 'c3', 'ccx', 'cce', 'c4', 'c5', 'cscope', 'cai', 'cti', 'cbw', 'c7', 'ctwin', 'c8', 'c9', 'c10', 'c11', 'c12', 'numbers', 'caveats'].forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});
const prog=$('#prog');window.addEventListener('scroll',()=>{const h=document.documentElement;const p=h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight);prog.style.width=(p*100).toFixed(1)+'%'},{passive:true});
})();
