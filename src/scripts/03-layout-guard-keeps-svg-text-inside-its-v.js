
/* Layout guard: keeps SVG text inside its viewBox, thins colliding tick rows, hides bar labels that do not fit, flags sideways-scrolling blocks */
(function(){const main=document.querySelector('main')||document.body;
 const rotated=(t,svg)=>{for(let e=t;e&&e!==svg;e=e.parentNode){if(e.getAttribute&&e.getAttribute('transform'))return true;if(e.tagName==='defs'||e.tagName==='pattern'||e.tagName==='clipPath')return true}return false};
 const shift=(t,att,d)=>{const nodes=[t,...t.querySelectorAll('tspan')];nodes.forEach(n=>{const v=n.getAttribute(att);if(v!=null&&v!==''&&!/\s/.test(v.trim()))n.setAttribute(att,(parseFloat(v)||0)+d);else if(n===t&&v==null)n.setAttribute(att,d)})};
 function fixSvg(svg){const vb=svg.viewBox&&svg.viewBox.baseVal;if(!vb||vb.width<60||vb.height<20)return;if(!svg.getBoundingClientRect().width)return;
  const ts=[...svg.querySelectorAll('text')].filter(t=>!rotated(t,svg)&&t.textContent.trim());const L=vb.x,R=vb.x+vb.width,T=vb.y,B=vb.y+vb.height;
  ts.forEach(t=>{let bb;try{bb=t.getBBox()}catch(e){return}if(!bb.width)return;
   if(bb.width<vb.width-2){let dx=0;if(bb.x<L+1)dx=L+1-bb.x;else if(bb.x+bb.width>R-1)dx=R-1-(bb.x+bb.width);if(dx)shift(t,'x',dx)}
   if(bb.height<vb.height-2){let dy=0;if(bb.y<T)dy=T-bb.y;else if(bb.y+bb.height>B)dy=B-(bb.y+bb.height);if(dy)shift(t,'y',dy)}});
  // thin colliding rows of short labels (axis ticks)
  const rows={};ts.forEach(t=>{if(t.querySelector('tspan')||t.textContent.trim().length>12||t.closest('.tb'))return;const y=t.getAttribute('y');if(y==null)return;const k=Math.round(parseFloat(y));(rows[k]=rows[k]||[]).push(t)});
  Object.values(rows).forEach(r=>{if(r.length<3)return;const b=r.map(t=>{t.style.visibility='';return {t,bb:t.getBBox()}}).sort((a,c)=>a.bb.x-c.bb.x);let last=null;b.forEach(o=>{if(last&&o.bb.x<last.bb.x+last.bb.width+3){o.t.style.visibility='hidden'}else last=o})})}
 function fixHtml(root){root.querySelectorAll('.wb-bar div').forEach(d=>{if(d.dataset.full==null&&d.textContent)d.dataset.full=d.textContent;if(d.dataset.full){d.textContent=d.dataset.full;if(d.scrollWidth>d.clientWidth+1){d.title=d.dataset.full;d.textContent=''}}})}
 function cues(){main.querySelectorAll('.diagram,.schem-svg,.tbl,.sk,.rc-hub,.ka-mix,.hm-wrap,[data-xs]').forEach(e=>{const cs=getComputedStyle(e);if(!/(auto|scroll)/.test(cs.overflowX))return;const need=e.scrollWidth>e.clientWidth+8&&e.clientWidth>120&&e.offsetParent!==null;let c=e.previousElementSibling;if(!(c&&c.classList.contains('xcue'))){if(!need)return;c=document.createElement('div');c.className='xcue';c.setAttribute('aria-hidden','true');c.textContent='Swipe or scroll sideways to see all →';e.parentNode.insertBefore(c,e)}c.hidden=!need})}
 let dirty=new Set(),tm=0;const run=()=>{tm=0;const list=dirty;dirty=new Set();list.forEach(x=>{if(x.tagName==='svg'||x.tagName==='SVG')fixSvg(x);else{x.querySelectorAll&&x.querySelectorAll('svg').forEach(fixSvg);x.querySelectorAll&&fixHtml(x)}})};
 const queue=x=>{dirty.add(x);if(!tm)tm=setTimeout(()=>requestAnimationFrame(run),60)};
 new MutationObserver(ms=>{ms.forEach(m=>{const t=m.target;if(!(t instanceof Element))return;const sv=t.closest('svg');queue(sv||t)})}).observe(main,{childList:true,subtree:true});
 document.addEventListener('toggle',e=>{if(e.target.open)queue(e.target)},true);
 const all=()=>{queue(main);cues()};window.addEventListener('load',()=>setTimeout(all,300));let rz=0;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(all,350)});setTimeout(all,1200);setInterval(cues,4000);
 window.__layoutFix=all})();
