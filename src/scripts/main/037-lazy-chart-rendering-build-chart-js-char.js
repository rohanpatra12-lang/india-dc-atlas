
/* ---------- lazy chart rendering: build Chart.js charts only when they scroll into view ---------- */
(()=>{const seen=new Set();const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const id=e.target.id;seen.add(id);io2.unobserve(e.target);if(!charts[id])build(id)}}),{rootMargin:'300px'});
 Object.keys(builders).forEach(id=>{const el=document.getElementById(id);if(el)io2.observe(el)});V2.lazy=io2})();
