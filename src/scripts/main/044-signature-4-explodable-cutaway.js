
/* ---------- SIGNATURE 4: EXPLODABLE CUTAWAY ---------- */
const CUT=[
 {id:'sub',n:'Substation',x:0,y:0,w:2.8,d:2.4,h:1.6,c:'--muted',e:'All the campus\'s power arrives here at 132–400 kV (11–33 kV for colocation).',k:'Part of electrical: ₹28 cr/MW of a ₹74 cr/MW AI building',w2:'—'},
 {id:'tx',n:'Transformers',x:3.3,y:0,w:2.6,d:2.4,h:1.3,c:'--warn',e:'Switchgear and transformers step down to 415 V AC, or to 800 V DC from 2027. They lose ~1–2% of energy.',k:'Electrical',w2:'—'},
 {id:'ups',n:'UPS + diesel',x:6.4,y:0,w:3,d:2.4,h:1.1,c:'--hot',e:'Batteries ride through grid faults; diesel covers long outages. Power-chain losses total ~8% of IT energy.',k:'Backup ₹6 cr/MW',w2:'Diesel only in tests'},
 {id:'hall',n:'GPU hall',x:0,y:3.2,w:7,d:4.6,h:2.6,c:'--cold',e:'120–600 kW racks; about 85–90% of the facility\'s electricity ends here at PUE 1.10–1.20.',k:'GPUs ≈ ₹266 cr/MW: most of the total',w2:'None at the rack'},
 {id:'cdu',n:'CDUs',x:7.5,y:3.2,w:1.9,d:4.6,h:2.1,c:'--cold-2',e:'Coolant distribution units pump 32–45 °C water through cold plates; 85–90% of rack heat goes to liquid.',k:'Cooling ₹17 cr/MW',w2:'Closed loop: near zero'},
 {id:'rej',n:'Dry coolers / towers',x:0,y:8.4,w:9.4,d:2.2,h:1.5,c:'--good',e:'Rejects all the heat outdoors. Dry coolers use no water; cooling towers evaporate ~1.8 L per kWh of IT.',k:'In cooling',w2:'Towers: 3.5 MLD for 100 MW'}];
V2.cut=()=>{const el=document.getElementById('v2-cut');if(!el)return;const ex=el.dataset.ex==='1';const s=27,ox=300,oy=60;const P=(x,y,z)=>[ox+(x-y)*s*.866,oy+(x+y)*s*.5-z*s];
 const order=CUT.slice().sort((a,b)=>(a.x+a.w/2+a.y+a.d/2)-(b.x+b.w/2+b.y+b.d/2));let h='';
 order.forEach(o=>{const dz=ex?({sub:0,tx:.6,ups:1.2,hall:1.8,cdu:2.6,rej:3.4}[o.id]):0,dx=ex?({sub:-1.5,tx:-.8,ups:0,hall:0,cdu:1.4,rej:0}[o.id]):0,dy=ex?({rej:1.6}[o.id]||0):0;const x=o.x+dx,y=o.y+dy,z=dz;
  const pt=(a,b,c)=>P(a,b,c).map(v=>v.toFixed(1)).join(',');
  const top=[pt(x,y,z+o.h),pt(x+o.w,y,z+o.h),pt(x+o.w,y+o.d,z+o.h),pt(x,y+o.d,z+o.h)].join(' ');
  const left=[pt(x,y+o.d,z),pt(x+o.w,y+o.d,z),pt(x+o.w,y+o.d,z+o.h),pt(x,y+o.d,z+o.h)].join(' ');
  const right=[pt(x+o.w,y,z),pt(x+o.w,y+o.d,z),pt(x+o.w,y+o.d,z+o.h),pt(x+o.w,y,z+o.h)].join(' ');
  const c=P(x+o.w/2,y+o.d/2,z+o.h);
  h+=`<g class="cut-o${V2.cs===o.id?' on':''}" data-c="${o.id}" tabindex="0" role="button" aria-label="${o.n}"><polygon points="${left}" style="fill:var(${o.c});opacity:.55"/><polygon points="${right}" style="fill:var(${o.c});opacity:.75"/><polygon points="${top}" style="fill:var(${o.c})"/><text x="${c[0].toFixed(1)}" y="${(c[1]+4).toFixed(1)}" text-anchor="middle" class="cut-t">${o.n}</text></g>`});
 el.innerHTML=`<svg viewBox="20 ${ex?-20:20} 560 ${ex?440:360}" role="img" aria-label="Cutaway of an AI data centre">${h}</svg>`;
 const o=CUT.find(q=>q.id===V2.cs)||CUT[3];document.getElementById('v2-cut-i').innerHTML=`<b>${o.n}</b><p class="small" style="margin:4px 0">${o.e}</p><div class="read"><div><span class="k">Cost</span><span class="v small">${o.k}</span></div><div><span class="k">Water</span><span class="v small">${o.w2}</span></div></div>`};
document.addEventListener('click',e=>{const o=e.target.closest('.cut-o');if(o){V2.cs=o.dataset.c;V2.cut()}if(e.target.id==='v2-cut-x'){const el=document.getElementById('v2-cut');el.dataset.ex=el.dataset.ex==='1'?'0':'1';e.target.textContent=el.dataset.ex==='1'?'Put it back together':'Explode the building';V2.cut()}});
document.addEventListener('keydown',e=>{const o=e.target.closest&&e.target.closest('.cut-o');if(o&&(e.key==='Enter'||e.key===' ')){e.preventDefault();V2.cs=o.dataset.c;V2.cut()}});
