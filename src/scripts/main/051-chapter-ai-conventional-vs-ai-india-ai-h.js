
/* ---------- CHAPTER AI: conventional vs AI, India, AI-heavy scenarios ---------- */
(()=>{if(!document.getElementById('cai'))return;const A=window.__AIF;if(!A)return;const COOL=A.COOL;
const RKS=[{kw:50,f:0,n:'50 kW air + rear door'},{kw:132,f:.85,n:'132 kW NVL72'},{kw:190,f:.9,n:'190 kW Vera Rubin'},{kw:600,f:1,n:'600 kW Kyber'}];
const at=(c,f,rd)=>{const C=COOL[c],v=f>0?C.l:(rd?C.r:C.a);/* atlas cooling reference (Chapter 6), Bengaluru: PUE = 1.06 + cooling */return {wue:v[1],pue:1.06+v[0],n:f>0?C.n:(rd?C.nr:C.na)}};
/* 10.1 two halls */
let hr='t',rk=1,pw=STD.gw.India;
function two(){const mw=100,cv=at(hr,0),ai=at(hr,RKS[rk].f,true),uC=STD.ref.uConv,uA=STD.ref.uAI;
 const row=(u,c,kw)=>{const it=mw*u*24;return {it,on:it*c.wue/1000,ps:it*c.pue*pw/1000,racks:mw*1000/kw,ws:mw*1000/kw*2.6,c}};
 const C=row(uC,cv,8),I=row(uA,ai,RKS[rk].kw);
 const card=(t,cls,r,u,kw)=>`<div class="cai-card ${cls}"><h4>${t}</h4><dl><dt>Racks for 100 MW</dt><dd>${fmt(r.racks)}</dd><dt>Floor (white space)</dt><dd>${fmt(r.ws)} m²</dd><dt>Servers busy</dt><dd>${Math.round(u*100)}%</dd><dt>Cooling</dt><dd style="font-family:inherit;font-weight:500">${r.c.n}</dd><dt>PUE · WUE</dt><dd>${r.c.pue.toFixed(2)} · ${r.c.wue.toFixed(2)}</dd><dt>On-site water</dt><dd>${fmt(r.on,2)} MLD</dd><dt>Power-station water</dt><dd>${fmt(r.ps,2)} MLD</dd><dt>Total</dt><dd>${fmt(r.on+r.ps,2)} MLD</dd><dt>On-site water per rack</dt><dd>${fmt(r.on*1e6/r.racks)} L/day</dd></dl></div>`;
 document.getElementById('cai-two').innerHTML=card('Conventional halls · 8 kW racks','cv',C,uC)+card('AI halls · '+RKS[rk].n,'ai',I,uA);
 const rT=(I.on+I.ps)/(C.on+C.ps),rR=(I.on/I.racks)/(C.on/C.racks);
 document.getElementById('cai-two-n').textContent=`For the same 100 MW the AI halls use ${rT.toFixed(2)}× the total water of the conventional halls: they run fuller (78% vs 65%), ${I.c.pue<C.c.pue?'but at a lower PUE':'and at a similar PUE'}. Per rack the gap is ${fmt(rR,0)}×, because one AI rack carries the heat of ${fmt(RKS[rk].kw/8,0)} conventional racks. ${hr==='t'?'With towers both evaporate about the same per kWh; switch to adiabatic or dry to see liquid cooling\'s advantage.':'Liquid-cooled AI halls avoid chillers, so with adiabatic or dry rejection they use less water per kWh than air-cooled halls.'}`;
 window.__CAI1={C,I,mw,hr,rk,pw}}
seg('cai-hr',d=>{hr=d.v;two()});seg('cai-rk',d=>{rk=+d.v;two()});seg('cai-pw',d=>{pw=+d.v;two()});two();
/* 10.2 disclosed water */
const DISC=[['Sify, 2024-25 (~200 MW)',306.9],['NTT India, 2023 withdrawal (15 sites)',413.8],['STT GDC India, 2023 withdrawal (30 sites)',419.2],['CtrlS, 2023-24',409.0],['Nxtra, 2025 (15 hyperscale sites)',216.4]];
hbars(document.getElementById('cai-disc'),DISC.map(([n,v])=>[n,v,'',fmt(v,1)+' ML']),{max:450});
(document.getElementById('cai-disc-n')||{}).textContent=`Sify's figure works out to about ${fmt(306.9e3/(200*.6*8760)*1000/1000,2)} L per kWh of IT if its ~200 MW ran at 60% load: consistent with mostly air-cooled sites, or with capacity not yet fully loaded. Each of these totals is under 1.2 MLD for a whole portfolio, far below what a single tower-cooled 100 MW AI campus would use (~3.5 MLD).`;
/* 10.3 scenarios */
const LIVE=1.79;let r3=1,aiC='h',cvC='t',pw3=STD.gw.India;
const PRE={bau:{gw:2.9,ai:30,rk:0,aiC:'t',cvC:'t',pw:'2.9'},ai:{gw:5.5,ai:75,rk:1,aiC:'t',cvC:'t',pw:'2.9'},best:{gw:5.5,ai:75,rk:2,aiC:'d',cvC:'d',pw:'0.34'}};
const FACT=[['JSW Steel Vijayanagar (~12 Mtpa, estimate)',81,101],['Coal power plant, 1,000 MW',54,63],['Integrated steel plant, 10 Mtpa (Tata benchmark)',41,96],['West Coast Paper Mills, Dandeli',43.9,43.9],['Pulp & paper mill, 1,000 t/day',26,29],['Chip fab, Tata–PSMC Dholera',17.5,17.5],['Yelahanka gas power plant, Bengaluru',14.4,14.4],['Town of 1 lakh people',13.5,13.5]];
function calc3(){const gw=val('cai-gw'),sh=val('cai-ai')/100,f=RKS[r3].f;
 const cv=at(cvC,0),ai=at(aiC,f,true);const part=(GW,u,c)=>{const it=GW*1000*u*24;/* MWh/day */return {GW,it,on:it*c.wue/1000,ps:it*c.pue*pw3/1000,twh:it*c.pue*365/1e6,c}};
 const L=part(LIVE,STD.ref.uConv,cv),NC=part(gw*(1-sh),STD.ref.uConv,cv),NA=part(gw*sh,STD.ref.uAI,ai);const T={on:L.on+NC.on+NA.on,ps:L.ps+NC.ps+NA.ps,twh:L.twh+NC.twh+NA.twh};T.tot=T.on+T.ps;
 const racks=gw*sh*1e6/RKS[r3].kw;return {gw,sh,f,L,NC,NA,T,racks,ai,cv}}
function render3(){const r=calc3();out('cai-gw',r.gw.toFixed(2)+' GW');out('cai-ai',Math.round(r.sh*100)+'%');
 const steel=r.T.tot/((41+96)/2),town=r.T.tot*1e6/135/1e5;
 document.getElementById('cai3-r').innerHTML=`<div><span class="v">${fmt(LIVE+r.gw,2)} GW</span><span class="k">total IT capacity · ${fmt(r.gw*r.sh,2)} GW of it AI (${Math.round(r.gw*r.sh/(LIVE+r.gw)*100)}% of the fleet)</span></div><div><span class="v">${fmt(r.T.twh,0)} TWh</span><span class="k">electricity a year</span></div><div><span class="v cold">${fmt(r.T.on,0)} MLD</span><span class="k">on site · AI halls ${fmt(r.NA.on,0)} (WUE ${r.ai.wue.toFixed(2)})</span></div><div><span class="v hot">${fmt(r.T.ps,0)} MLD</span><span class="k">at power stations (${pw3} L/kWh)</span></div><div><span class="v">${fmt(r.T.tot,0)} MLD</span><span class="k">total · ${fmt(town,1)} lakh people's daily water · ≈${steel.toFixed(1)} integrated steel plants</span></div><div><span class="v">${fmt(r.racks)}</span><span class="k">AI racks at ${RKS[r3].kw} kW (${fmt(r.racks*2.6/1e4,1)} ha of white space)</span></div>`;
 const rows=[{n:`India's data centres, ${fmt(LIVE+r.gw,1)} GW (your scenario)`,a:r.T.on,b:r.T.ps,dc:1,me:1},{n:'…of which the new AI halls',a:r.NA.on,b:r.NA.ps,dc:1}].concat(FACT.map(([n,lo,hi])=>({n,lo,hi})));
 rows.sort((x,y)=>((y.hi??(y.a+y.b))-(x.hi??(x.a+x.b))));const mx=Math.max(...rows.map(x=>x.hi??(x.a+x.b)))*1.02;const d=v=>v<10?1:0;
 document.getElementById('cai3-cmp').innerHTML=rows.map(x=>x.dc?`<div class="aif-row${x.me?' me':''}"><span class="aif-n">${x.n}</span><div class="aif-tr"><i class="d" style="width:${x.a/mx*100}%"></i><i class="i" style="width:${x.b/mx*100}%"></i></div><span class="aif-v">${fmt(x.a,d(x.a))} + ${fmt(x.b,d(x.b))}</span></div>`:`<div class="aif-row"><span class="aif-n">${x.n}</span><div class="aif-tr"><i class="f" style="width:${x.lo/mx*100}%"></i>${x.hi>x.lo?`<i class="r" style="width:${(x.hi-x.lo)/mx*100}%"></i>`:''}</div><span class="aif-v">${x.hi>x.lo?fmt(x.lo,0)+'–'+fmt(x.hi,0):fmt(x.lo,d(x.lo))}</span></div>`).join('')+`<p class="xs muted" style="margin:6px 0 0">MLD. Data-centre bars: on site (dark) + power stations (light). Factory bars: direct water; faded part = published range.</p>`;
 const save=(()=>{const keep=aiC;aiC='t';const t=calc3();aiC=keep;return t.NA.on-r.NA.on})();
 document.getElementById('cai3-n').textContent=`Power stations account for ${Math.round(r.T.ps/r.T.tot*100)}% of the fleet's water. `+(aiC==='t'?`Moving the AI halls from towers to dry coolers would cut on-site water by about ${fmt(r.NA.on-calc3Alt('d').NA.on,0)} MLD.`:`Compared with towers, this AI cooling saves about ${fmt(save,0)} MLD on site.`)+` The fleet's total is a national figure spread over several cities; the factories are single sites.`;
 window.__CAI3=r}
function calc3Alt(c){const keep=aiC;aiC=c;const t=calc3();aiC=keep;return t}
seg('cai3-rk',d=>{r3=+d.v;render3()});seg('cai3-ai',d=>{aiC=d.v;render3()});seg('cai3-cv',d=>{cvC=d.v;render3()});seg('cai3-pw',d=>{pw3=+d.v;render3()});
['cai-gw','cai-ai'].forEach(i=>document.getElementById(i).addEventListener('input',render3));
const press=(id,attr,v)=>{const b=document.querySelector(`#${id} button[data-${attr}="${v}"]`);if(b&&b.getAttribute('aria-pressed')!=='true')b.click()};
seg('cai3-pre',d=>{const P=PRE[d.p];const g=document.getElementById('cai-gw'),a=document.getElementById('cai-ai');g.value=P.gw;a.value=P.ai;press('cai3-rk','v',P.rk);press('cai3-ai','v',P.aiC);press('cai3-cv','v',P.cvC);press('cai3-pw','v',String(P.pw));render3()});
render3();window.__CAIX={RKS,at,calc3,get pw3(){return pw3},get r3(){return r3},LIVE};
})();
