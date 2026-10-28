
/* ---------- GUIDED WALK-THROUGH (drives the data centre model) ---------- */
(()=>{const box=document.getElementById('tour');if(!box||!window.__DTX)return;const X=window.__DTX,D=X.D;
const f0=v=>Math.round(v).toLocaleString('en-IN'),f2=v=>(+v).toFixed(2);
const STEPS=[
 {k:'city',t:'Where?',q:'Pick the city. Climate sets how hard cooling works; the state grid sets the water and carbon behind every kWh.',
  o:[['blr','Bengaluru','Mild plateau'],['hyd','Hyderabad','Hot-dry summers'],['mum','Mumbai','Humid coast'],['che','Chennai','Hot humid coast'],['noi','Delhi NCR','Hot summers, cool winters'],['viz','Visakhapatnam','Humid coast']],apply:(S,v)=>{S.city=v}},
 {k:'hw',t:'What will it run?',q:'The hardware decides rack power, and rack power decides which cooling is possible.',
  o:[['cpu','Colocation, CPU servers','~8 kW racks; tenants bring their own servers'],['h100','AI inference fleet (H100)','~41 kW racks, mostly serving users'],['gb300','AI training cluster (GB300)','~142 kW racks, 72 GPUs each']],
  apply:(S,v)=>{S.hw=v;if(v==='cpu'){S.train=0;S.inf=0;S.u=65;if(!D.HW.cpu.ok.includes(S.cool))S.cool='crahc'}else if(v==='h100'){S.train=20;S.inf=75;S.u=75;if(!D.HW.h100.ok.includes(S.cool))S.cool='dlc'}else{S.train=70;S.inf=25;S.u=85;S.cool='dlc'}}},
 {k:'cool',t:'How is heat taken off the chips?',q:'Air works up to about 30 kW a rack; above that the heat has to leave in liquid.',
  o:()=>[['crahc','Air with aisle containment','Chilled-water air handlers'],['rdhx','Rear-door coils','Water coil on the back of each rack'],['dlc','Direct-to-chip liquid','Cold plates on GPUs and CPUs'],['im1','Single-phase immersion','Servers sit in oil tanks']].filter(o=>D.HW[X.S.hw].ok.includes(o[0])),apply:(S,v)=>{S.cool=v;if(D.COOL[v].liq&&['wcc','acc','accfc','wcch','integ'].includes(S.rej))S.rej='dry';if(!D.COOL[v].liq&&['dry','adi','twr'].includes(S.rej))S.rej='accfc'}},
 {k:'rej',t:'Where does the heat go?',q:'This is the water decision. Towers evaporate water to save electricity; dry coolers use none but need warmer water or a hot-day assist.',
  o:()=>D.COOL[X.S.cool].liq?[['dry','Dry coolers','No water; trim chiller on hot hours'],['adi','Adiabatic coolers','Spray only on hot hours'],['twr','Cooling towers','Evaporate ~1.5–2 L per kWh']]:[['accfc','Air-cooled chillers with free cooling','No water on site'],['wcc','Water-cooled chillers + towers','Lowest electricity, most water'],['wcch','Chillers + hybrid coolers','Water on hot hours only']],apply:(S,v)=>{S.rej=v}},
 {k:'pwr',t:'Where does the power come from?',q:'Power-station water and carbon usually outweigh everything on site in India. Clean power bought round the clock cuts both.',
  o:[['grid','State grid only','All coal-heavy grid'],['rtc','60% round-the-clock clean','Open-access solar, wind and storage'],['cl90','90% clean','Adds storage; small premium']],apply:(S,v)=>{S.pwr=v}},
 {k:'ws',t:'Where does site water come from?',q:'In Bengaluru and Chennai the aquifers are over-drawn. Treated sewage costs less than drinking water and takes nothing from the city.',
  o:[['muni','Municipal supply','₹80–99 per kL'],['treat','Treated sewage','~₹40 per kL after polishing'],['bore','Borewell','Cheap, but depletes the aquifer']],apply:(S,v)=>{S.ws=v}}];
let step=0,prev=null;
function read(){const R=X.R;if(!R||!R.ok)return null;return {pue:R.pue,wue:R.wue,site:R.siteKL/1000,grid:R.gridKL/1000,co2:R.co2,cost:R.cost.total,capex:R.capex}}
function delta(a,b,k,f,unit,good){if(!b)return '';const d=a[k]-b[k];if(Math.abs(d)<1e-9)return '';const up=d>0;return ` <span class="tour-d ${(up===!good)?'ok':'bad'}">${up?'+':'−'}${f(Math.abs(d))}${unit}</span>`}
function draw(){const st=STEPS[step],S=X.S,opts=st?(typeof st.o==='function'?st.o():st.o):[];const cur=st?S[st.k]:null;const r=read();
 box.innerHTML=`<ol class="tour-steps">${STEPS.map((s,i)=>`<li class="${i===step?'on':i<step?'done':''}"><button type="button" data-go="${i}">${i+1}. ${s.t}</button></li>`).join('')}<li class="${step===STEPS.length?'on':''}"><button type="button" data-go="${STEPS.length}">${STEPS.length+1}. Result</button></li></ol>`+
 (step<STEPS.length?`<div class="tour-q"><h4>${st.t}</h4><p>${st.q}</p><div class="tour-o">${opts.map(([v,n,d])=>`<button type="button" class="tour-b" data-v="${v}" aria-pressed="${String(cur)===v}"><b>${n}</b><span>${d}</span></button>`).join('')}</div></div>`:
  `<div class="tour-q"><h4>Your design</h4><p>${D.CITY[S.city].n} · ${f0(S.mw)} MW · ${D.HW[S.hw].n.split(' (')[0]} · ${D.COOL[S.cool].n} · ${D.REJ[S.rej].n} · ${D.PWR[S.pwr].n} · ${D.WS[S.ws].n}. Every step changed the full model in 14.2 below.</p><p><a href="#ctwin1">Open the full model</a> · <a href="#ctwinv">See its lifetime value</a> · <a href="#ctwin5">Check it against the limits</a></p></div>`)+
 (r?`<div class="read tour-r"><div><span class="v">${f2(r.pue)}</span><span class="k">PUE${delta(r,prev,'pue',f2,'',false)}</span></div><div><span class="v">${f0(r.site)} ML</span><span class="k">site water a year${delta(r,prev,'site',f0,' ML',false)}</span></div><div><span class="v">${f0(r.grid)} ML</span><span class="k">power-station water${delta(r,prev,'grid',f0,' ML',false)}</span></div><div><span class="v">${f0(r.co2)} t</span><span class="k">CO₂ a year${delta(r,prev,'co2',f0,' t',false)}</span></div><div><span class="v">₹${f0(r.cost)} cr</span><span class="k">cost a year incl. capital${delta(r,prev,'cost',f0,' cr',false)}</span></div></div>`:'<p class="small">This combination does not work physically; pick another option.</p>')+
 `<div class="tour-nav"><button type="button" data-go="${Math.max(0,step-1)}"${step===0?' disabled':''}>Back</button><button type="button" class="pri" data-go="${Math.min(STEPS.length,step+1)}"${step===STEPS.length?' disabled':''}>Next</button></div>`}
box.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.go!=null){step=+b.dataset.go;prev=read();draw();return}
 if(b.dataset.v!=null){prev=read();STEPS[step].apply(X.S,b.dataset.v);X.syncAll();X.run();draw()}});
document.addEventListener('dt:run',()=>{if(!box.contains(document.activeElement))draw()});
draw();window.__TOUR={draw,get step(){return step},set step(v){step=v}};
})();


/* design check: see 14.6 below */
