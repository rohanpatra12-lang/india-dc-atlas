
(function(){
const __DUM=()=>document.createElement('div');const $=s=>document.querySelector(s)||__DUM(), $$=s=>Array.from(document.querySelectorAll(s));
const T=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const A=(hex,a)=>{const h=hex.replace('#','');const n=parseInt(h.length===3?h.split('').map(c=>c+c).join(''):h,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`};
const fmt=(n,d=0)=>Number(n).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d});
const crf=(r,n)=>r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
const val=id=>{const e=document.getElementById(id);return e?parseFloat(e.value):NaN};
const setv=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v};
const out=(id,t)=>{const o=document.getElementById(id+'-o');if(o)o.textContent=t};
function press(g,btn){g.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b===btn?'true':'false'))}
function seg(id,fn){const g=document.getElementById(id);if(!g)return;g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!g.contains(b))return;press(g,b);fn(b.dataset,b)})}
function readout(el,items){if(!el)return;el.innerHTML=items.map(([v,k,c])=>`<div><span class="v ${c||''}">${v}</span><span class="k">${k}</span></div>`).join('')}
function hbars(el,rows,opt={}){if(!el)return;const mx=opt.max||Math.max(...rows.map(r=>r[1]));el.innerHTML=(opt.head||'')+rows.map(([n,v,c,lab])=>{const w=opt.log?Math.max(2,(Math.log10(v)-opt.lo)/(Math.log10(mx)-opt.lo)*100):Math.max(1.5,v/mx*100);return `<div class="hbar"><span>${n}</span><div class="track"><div class="fill ${c||''}" style="width:${Math.min(100,w)}%"></div></div><span class="val">${lab!==undefined?lab:fmt(v,opt.d||0)}</span></div>`}).join('')}
