
const MAP={};Object.keys(EX).forEach(k=>{const b=boxFor(k);if(!b)return;MAP[k]=b;b.dataset.k=k;const hd=b.querySelector('.fxh');const AS=(window.__ASM||{})[k]||[];(hd||b).insertAdjacentHTML(hd?'afterend':'beforeend',`<div class="fxx"><div class="fxx-h">Why these equations</div><ul class="fxx-why">${EX[k].why.map(x=>`<li>${x}</li>`).join('')}</ul>${AS.length?`<div class="fxx-h">Why these values</div><div class="fxx-vals"><table class="fxw fxv"><thead><tr><th>Value</th><th>Used</th><th>Why this value</th><th>Basis</th></tr></thead><tbody>${AS.map(r=>`<tr><th>${r[0]}</th><td class="mono">${r[1]}</td><td>${r[2]} <span class="xs muted">(${r[3]})</span></td><td><span class="chip">${r[4]}</span></td></tr>`).join('')}</tbody></table></div>`:''}${EX[k].calc?`<div class="fxx-h">With the numbers on screen now</div><div class="fxx-live"></div><p class="xs muted" style="margin:0">Updates as you change the inputs.</p>`:'<p class="xs muted" style="margin:0">No arithmetic here: the result comes from the rules above applied to your inputs.</p>'}</div>`)});
/* the tap-to-show button, on every panel that calculates */
document.querySelectorAll('.fxbox').forEach(bx=>{if(bx.dataset.pill)return;bx.dataset.pill=1;const sim=bx.classList.contains('simfx');const host=sim?null:bx.closest('.panel,.schem');if(!sim&&!host)return;
  const btn=document.createElement('button');btn.type='button';btn.className='d1-btn fx-pill';btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls',bx.id);btn.innerHTML='<b>ƒ</b> Show the calculation';
  if(sim)bx.insertAdjacentElement('beforebegin',btn);else{host.appendChild(btn)}});
document.addEventListener('click',e=>{const b=e.target.closest('.fx-pill');if(!b)return;const bx=document.getElementById(b.getAttribute('aria-controls'));if(!bx)return;const op=bx.hidden;if(op&&!bx.classList.contains('simfx')&&b.nextElementSibling!==bx)b.insertAdjacentElement('afterend',bx);bx.hidden=!op;
  document.querySelectorAll(`[aria-controls="${bx.id}"]`).forEach(x=>x.setAttribute('aria-expanded',op));b.innerHTML=`<b>ƒ</b> ${op?'Hide':'Show'} the calculation`;setTimeout(upd,0)});
document.addEventListener('click',e=>{const b=e.target.closest('.fx');if(!b)return;const id=b.getAttribute('aria-controls');setTimeout(()=>{const bx=document.getElementById(id);document.querySelectorAll(`.fx-pill[aria-controls="${id}"]`).forEach(p=>{p.setAttribute('aria-expanded',!bx.hidden);p.innerHTML=`<b>ƒ</b> ${bx.hidden?'Show':'Hide'} the calculation`})},0)});
function upd(){Object.entries(MAP).forEach(([k,b])=>{if(b.hidden||!EX[k].calc)return;const L=b.querySelector('.fxx-live');try{const r=EX[k].calc();L.innerHTML=r&&r.length?CSS_ROWS(r,k):'<span class="xs muted">Not available.</span>'}catch(e){L.innerHTML='<span class="xs muted">Not available.</span>'}})}
let ut=null;const q=()=>{clearTimeout(ut);ut=setTimeout(upd,60)};
['input','change','click'].forEach(ev=>document.addEventListener(ev,q,true));
upd();
}

kn();