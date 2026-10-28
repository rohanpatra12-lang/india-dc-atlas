
/* ---------- CHAPTER TI: training vs inference, per prompt, Bengaluru build-out ---------- */
(()=>{if(!document.getElementById('cti'))return;const A=window.__AIF;if(!A)return;const COOL=A.COOL;
const at=(c,f,rd)=>{const C=COOL[c],v=f>0?C.l:(rd?C.r:C.a);/* atlas cooling reference (Chapter 6), Bengaluru: PUE = 1.06 + cooling */return {wue:v[1],pue:1.06+v[0],n:f>0?C.n:(rd?C.nr:C.na)}};
/* 11.2 load shape */
let ls='d';
function load(){const W=640,H=246,L=40,Rr=12,T=30,B=34,pw=W-L-Rr,ph=H-T-B;const day=ls==='d';const N=day?289:401;const X=day?24:20;
 const tr=[],inf=[];let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
 for(let k=0;k<N;k++){const x=k/(N-1)*X;let a,b;
  if(day){a=.95;const m=(x*60)%120;if(m<4)a=.62;if(x>=14&&x<14.4)a=.12;if(x>=14.4&&x<14.6)a=.12+(x-14.4)/.2*.83;
   b=.665+.12*Math.cos(2*Math.PI*(x-21)/24)+.035*Math.cos(4*Math.PI*(x-13)/24)+(rnd()-.5)*.03}
  else{const ph2=(x%1.6)/1.6;a=ph2<.68?.97:.55;if(ph2>.66&&ph2<.7)a=.75;b=.72+(rnd()-.5)*.07}
  tr.push([x,a]);inf.push([x,b])}
 const px=x=>L+x/X*pw,py=y=>T+(1-y)*ph;const path=a=>a.map((p,j)=>(j?'L':'M')+px(p[0]).toFixed(1)+' '+py(p[1]).toFixed(1)).join('');
 const tick=day?[0,3,6,9,12,15,18,21,24]:[0,4,8,12,16,20];
 let g='';[0,.25,.5,.75,1].forEach(v=>{g+=`<line x1="${L}" x2="${W-Rr}" y1="${py(v)}" y2="${py(v)}" style="stroke:var(--line);stroke-width:1"/><text x="${L-6}" y="${py(v)+4}" text-anchor="end">${v*100}%</text>`});
 tick.forEach(t=>{g+=`<text x="${px(t)}" y="${H-B+16}" text-anchor="middle">${day?(String(t).padStart(2,'0')+':00'):t+' s'}</text>`});
 const lab=day?'Hour of the day (IST)':'Seconds';
 document.getElementById('cti-load').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Training and inference load over ${day?'a day':'twenty seconds'}">${g}<text x="${L+pw/2}" y="${H-4}" text-anchor="middle">${lab}</text><path d="${path(inf)}" style="fill:none;stroke:var(--cold);stroke-width:2"/><path d="${path(tr)}" style="fill:none;stroke:var(--hot);stroke-width:2"/><g transform="translate(${L},4)"><rect width="10" height="3" y="4" style="fill:var(--hot)"/><text x="15" y="9">Training</text><rect x="80" width="10" height="3" y="4" style="fill:var(--cold)"/><text x="95" y="9">Inference</text></g></svg>`;
 document.getElementById('cti-load-n').textContent=day?'Over a day, training sits near 95% of the hall\'s power, with brief dips every two hours as the job saves a checkpoint and a deep dip at 14:00 when a GPU fails and the job restarts. Inference falls to about 55% before dawn and peaks near 80% in the evening, so its average is about 70%.':'Zoomed to seconds, training is not flat at all: thousands of GPUs compute together, then pause together to share results, so the whole hall swings by about 40% every second or two. Inference requests arrive at random, so their small swings cancel out.'}
seg('cti-ls',d=>{ls=d.v;load()});load();
hbars(document.getElementById('cti-mck'),[['2025 · training',23.1,'hot','23.1 GW'],['2025 · inference',20.9,'','20.9 GW'],['2025 · non-AI',38.3,'','38.3 GW'],['2030 · training',62.2,'hot','62.2 GW'],['2030 · inference',93.3,'','93.3 GW'],['2030 · non-AI',63.5,'','63.5 GW']],{max:100});
hbars(document.getElementById('cti-capex'),[['Servers (GPUs)',21.2,'hot','$21.2 bn'],['Building and cooling',11.4,'','$11.4 bn'],['Networking',4.9,'','$4.9 bn'],['Land',.17,'','$0.17 bn'],['Utility works',.16,'','$0.16 bn']],{max:22});

/* 11.5 per prompt */
const GP=[{n:'H100',w:700,f:0,th:600},{n:'B200',w:1000,f:.7,th:1500},{n:'GB300',w:1400,f:.85,th:2500},{n:'Vera Rubin',w:2300,f:.9,th:5000}];
const PT=[{n:'short chat',tk:500,m:1},{n:'long answer',tk:1500,m:1},{n:'reasoning',tk:10000,m:.35},{n:'long document',tk:800,m:.08}];
let gp=2,pt=0,hr5='d',g5=1.8;
const setT=()=>{const th=Math.max(50,Math.round(GP[gp].th*PT[pt].m/50)*50);document.getElementById('cti-tk').value=PT[pt].tk;document.getElementById('cti-th').value=th};
function c5(){const G=GP[gp],tk=val('cti-tk'),th=val('cti-th'),oh=val('cti-oh'),h=at(hr5,G.f,true);
 const sec=tk/th,eIT=G.w*oh*sec/3600;/* Wh */const trOn=document.getElementById('cti-trc').checked,trG=val('cti-tr'),lp=val('cti-lp');const eTr=trOn?trG/lp:0;/* GWh/bn = Wh */
 const e=eIT+eTr,meter=e*h.pue,on=e*h.wue,ps=e*h.pue*g5,s3=e*.13,onI=eIT*h.wue,psI=eIT*h.pue*g5,trW=eTr*(h.wue+h.pue*g5),tot=on+ps+s3;const N=val('cti-n');
 return {G,tk,th,oh,sec,eIT,eTr,e,meter,on,ps,s3,onI,psI,trW,tot,h,N,trOn,trG,lp,g:g5,mw:meter*N*1e9/24/1e6,mld:tot*N*1e9/1e9,mlyr:tot*N*1e9*365/1e9,mldOn:on*N}}
function r5(){const r=c5();out('cti-tk',fmt(r.tk));out('cti-th',fmt(r.th));out('cti-oh',r.oh.toFixed(2)+'×');out('cti-tr',fmt(r.trG,1)+' GWh');out('cti-lp',fmt(r.lp)+' bn');out('cti-n',r.N.toFixed(1)+' bn');
 const d2=v=>v<0.1?3:v<10?2:1;
 document.getElementById('cti-r').innerHTML=`<div><span class="v">${fmt(r.eIT,d2(r.eIT))} Wh</span><span class="k">energy at the servers · ${fmt(r.sec,1)} s of GPU time</span></div>${r.trOn?`<div><span class="v">+${fmt(r.eTr,3)} Wh</span><span class="k">share of training</span></div>`:''}<div><span class="v">${fmt(r.meter,d2(r.meter))} Wh</span><span class="k">at the meter (× PUE ${r.h.pue.toFixed(2)})</span></div><div><span class="v cold">${fmt(r.on,d2(r.on))} mL</span><span class="k">on site (WUE ${r.h.wue.toFixed(2)} L/kWh)</span></div><div><span class="v hot">${fmt(r.ps,d2(r.ps))} mL</span><span class="k">at power stations (${r.g} L/kWh)</span></div><div><span class="v">${fmt(r.s3,3)} mL</span><span class="k">supply chain: chips, servers, building, coal mining (~0.13 mL per Wh; Scope 3)</span></div><div><span class="v">${fmt(r.tot,d2(r.tot))} mL</span><span class="k">total, Scope 1 + 2 + 3 · ${fmt(1000/r.tot)} prompts per litre. Same basis as the data centre model's per-prompt tile</span></div><div><span class="v">${fmt(r.mld,r.mld<10?2:1)} MLD</span><span class="k">at ${r.N.toFixed(1)} bn prompts a day, all of this kind: ${fmt(r.mw,0)} MW average power, ${fmt(r.mlyr/1000,2)} bn L a year</span></div>`;
 const T=r.tot||1;document.getElementById('cti-stk').innerHTML=`<i class="a" style="width:${r.onI/T*100}%"></i><i class="b" style="width:${r.psI/T*100}%"></i><i class="c" style="width:${r.trW/T*100}%"></i><i style="width:${r.s3/T*100}%;background:var(--line)"></i>`;
 let lg=document.getElementById('cti-leg');if(!lg){document.getElementById('cti-stk').insertAdjacentHTML('afterend','<div class="cti-leg" id="cti-leg"></div>');lg=document.getElementById('cti-leg')}
 lg.innerHTML=`<span style="--c:var(--cold)">Cooling on site ${Math.round(r.onI/T*100)}%</span><span style="--c:color-mix(in srgb,var(--hot) 55%,var(--sunk))">Power stations ${Math.round(r.psI/T*100)}%</span>${r.trOn?`<span style="--c:var(--muted)">Training share ${Math.round(r.trW/T*100)}%</span>`:''}`;
 const rows=[{n:'Your prompt, total',v:r.tot,me:1},{n:'Your prompt, cooling on site only',v:r.on,me:1},{n:'Google Gemini median (on site only)',v:.26},{n:'OpenAI ChatGPT average (scope unclear)',v:.32},{n:'GPT-4-class, incl. power stations (Ren group 2026)',v:15},{n:'GPT-3 served in India (Li et al.)',v:19.7},{n:'Mistral Large 2, full lifecycle',v:45}];
 const mx=Math.max(...rows.map(x=>x.v))*1.02;
 document.getElementById('cti-cmp').innerHTML=rows.map(x=>`<div class="aif-row${x.me?' me':''}"><span class="aif-n">${x.n}</span><div class="aif-tr"><i class="${x.me?'d':'f'}" style="width:${Math.max(.6,x.v/mx*100)}%"></i></div><span class="aif-v">${fmt(x.v,x.v<10?2:1)} mL</span></div>`).join('')+'<p class="xs muted" style="margin:6px 0 0">mL per prompt. Published figures count different things; see 11.3.</p>';
 const kws=r.on/r.tot;document.getElementById('cti-n5').textContent=`One ${PT[pt].n} prompt on ${r.G.n} keeps a GPU busy for about ${fmt(r.sec,2)} seconds of its time. ${kws<.5?`The power station accounts for ${Math.round((1-kws)*100)}% of the water, so cleaner electricity cuts more water than better cooling.`:`Cooling on site is ${Math.round(kws*100)}% of the water here, so the cooling design matters most.`} ${pt===2?'Reasoning replies generate thousands of hidden tokens, so one costs as much as dozens of short chats.':'Try "Reasoning" to see how hidden thinking tokens multiply the cost.'}`;
 window.__CTI5=r}
seg('cti-pt',d=>{pt=+d.v;setT();r5()});seg('cti-gp',d=>{gp=+d.v;setT();r5()});seg('cti-hr',d=>{hr5=d.v;r5()});seg('cti-pw',d=>{g5=+d.v;r5()});
if(document.getElementById('cti-tk')){['cti-tk','cti-th','cti-oh','cti-tr','cti-lp','cti-n'].forEach(i=>document.getElementById(i).addEventListener('input',r5));document.getElementById('cti-trc').addEventListener('change',r5);r5();}

/* 11.6 Bengaluru build-out */
const RKS=[{kw:50,f:0,n:'50 kW air + rear door'},{kw:132,f:.85,n:'132 kW NVL72'},{kw:190,f:.9,n:'190 kW Vera Rubin'},{kw:600,f:1,n:'600 kW Kyber'}];
const PWS=[{n:'India grid',g:STD.gw.India,t:8.0},{n:'60% RTC + grid',g:1.19,t:7.5},{n:'90% clean',g:0.34,t:7.8},{n:'Karnataka mix',g:STD.gwMix.Karnataka,t:8.0}];
const WS=[{n:'BWSSB piped water',p:99},{n:'treated sewage',p:40},{n:'borewells',p:20}];
const BWS=1935,LIVE=162,CRF=(r,n)=>r/(1-Math.pow(1+r,-n)),CB=CRF(.11,15),CG=CRF(.11,5),C20=CRF(.11,20);
const TMAP={cv:{t:['crahc','wcc'],h:['iec','none'],d:['crahc','acc']},ai:{t:['dlc','twr'],h:['dlc','adi'],d:['dlc','dry']},rd:{t:['rdh','wcc'],h:['rdh','wcch'],d:['rdh','fcc']}};
let ty='ai',cr=8,cc='t',ar=1,ac='h',pw6=0,ws=0,ex=0;
function hall(t,mw,o){o=o||{};const isA=t==='ai';const f=isA?RKS[o.ar??ar].f:0;const c=at(isA?(o.ac??ac):(o.cc??cc),f,isA);const ts=val('bx-ts')/100;const u=isA?(.9*ts+.7*(1-ts)):val('bx-cu')/100;const P=PWS[pw6],W=WS[ws];
 const it=mw*u*8760;/* MWh/yr */const fac=it*c.pue,on=it*c.wue/1000,ps=it*c.pue*P.g/1000;/* ML/yr */
 const cm=TMAP[isA?(f>0?'ai':'rd'):'cv'][isA?(o.ac??ac):(o.cc??cc)],CP=CCOST.pair(cm[0],cm[1]);
 const eC=fac*1000*P.t/1e7,wC=on*1000*W.p/1e7,bC=mw*(isA?55.5:46)*C20,kX=mw*CP.cap,kC=mw*(CP.room*CRF(.11,CP.Lr)+CP.rej*CRF(.11,CP.Lj)+CP.om),gC=isA?mw*266*CG:0;
 const kw=isA?RKS[o.ar??ar].kw:(o.cr??cr);return {t,mw,u,f,c,it,fac,on,ps,onD:on/365,psD:ps/365,eC,wC,bC,kC,kX,CP,gC,cost:eC+wC+bC+kC+gC,racks:mw*1000/kw,kw,P,W}}
function c6(){const mw=val('bx-mw');const H=hall(ty,mw);const O=hall(ty==='ai'?'cv':'ai',mw);const E=ex?hall('cv',LIVE,{cc:'t'}):null;return {mw,H,O,E}}
function r6(){const {mw,H,O,E}=c6();out('bx-mw',fmt(mw)+' MW');out('bx-cu',val('bx-cu')+'%');out('bx-ts',val('bx-ts')+'%');
 document.getElementById('bx-cv').hidden=ty!=='cv';document.getElementById('bx-ai').hidden=ty!=='ai';
 const sh=H.onD/BWS*100,ppl=H.onD*1e6/135,homes=H.fac*1000/1800;
 document.getElementById('bx-r').innerHTML=`<div><span class="v">${fmt(H.fac/1000,0)} GWh</span><span class="k">electricity a year · ${fmt(H.fac/8760,0)} MW average draw · ${fmt(homes/1e5,1)} lakh homes' use</span></div><div><span class="v cold">${fmt(H.on,0)} ML</span><span class="k">on-site water a year (${fmt(H.onD,2)} MLD) · WUE ${H.c.wue.toFixed(2)}</span></div><div><span class="v hot">${fmt(H.ps,0)} ML</span><span class="k">at power stations a year (${fmt(H.psD,2)} MLD) · ${H.P.g} L/kWh</span></div><div><span class="v">₹${fmt(H.cost,0)} cr</span><span class="k">cost a year: power ₹${fmt(H.eC,0)} · water ₹${fmt(H.wC,1)} · building ₹${fmt(H.bC,0)} · cooling ₹${fmt(H.kC,0)}${H.gC?` · GPUs ₹${fmt(H.gC,0)}`:''}</span></div><div><span class="v">${sh<0.1?sh.toFixed(3):sh.toFixed(2)}%</span><span class="k">of BWSSB's piped supply (on-site water) · daily water of ${ppl<1e5?fmt(Math.round(ppl/100)*100):fmt(ppl/1e5,1)+' lakh'} people</span></div><div><span class="v">${fmt(H.racks)}</span><span class="k">racks at ${H.kw} kW · load ${Math.round(H.u*100)}% · PUE ${H.c.pue.toFixed(2)}</span></div>`;
 const all=(H.onD+H.psD)/BWS*100,wE=E?E.onD:0,cityS=(H.onD+wE)/BWS*100,mx=Math.max(1,Math.ceil(all*1.15*10)/10);
 document.getElementById('bx-m').innerHTML=`<div class="bar" role="img" aria-label="Share of BWSSB supply"><i style="width:${Math.min(100,all/mx*100)}%"></i><b style="width:${Math.min(100,sh/mx*100)}%"></b></div><p>Scale 0–${mx}% of BWSSB's ${fmt(BWS)} MLD. Teal: water drawn in the city (${sh.toFixed(2)}%). Orange: adding the power stations' water (${all.toFixed(2)}%), which is evaporated at plants elsewhere, not taken from BWSSB.${E?` With today's 162 MW added, city draw is ${fmt(H.onD+wE,2)} MLD (${cityS.toFixed(2)}%).`:''}</p>`;
 const cv=ty==='cv'?H:O,ai=ty==='ai'?H:O,sel=c=>ty===c?' class="sel"':'';
 const row=(n,a,b)=>`<tr><td>${n}</td><td${sel('cv')}>${a}</td><td${sel('ai')}>${b}</td></tr>`;
 document.getElementById('bx-vs').innerHTML=`<thead><tr><th>Same ${fmt(mw)} MW, same electricity and water source</th><th${sel('cv')}>All conventional<br><span class="xs muted">${cv.c.n}, ${Math.round(cv.u*100)}% load</span></th><th${sel('ai')}>All AI<br><span class="xs muted">${RKS[ar].n}, ${ai.c.n}</span></th></tr></thead><tbody>`+
  row('Electricity a year',fmt(cv.fac/1000,0)+' GWh',fmt(ai.fac/1000,0)+' GWh')+row('On-site water a year',fmt(cv.on,0)+' ML',fmt(ai.on,0)+' ML')+row('Power-station water a year',fmt(cv.ps,0)+' ML',fmt(ai.ps,0)+' ML')+row('Share of BWSSB supply (on site)',(cv.onD/BWS*100).toFixed(2)+'%',(ai.onD/BWS*100).toFixed(2)+'%')+row('Cost a year (power, water, capital)','₹'+fmt(cv.cost,0)+' cr','₹'+fmt(ai.cost,0)+' cr')+row('…of which electricity','₹'+fmt(cv.eC,0)+' cr','₹'+fmt(ai.eC,0)+' cr')+row('Racks',fmt(cv.racks),fmt(ai.racks))+'</tbody>';
 const rW=ai.on/cv.on,rE=ai.fac/cv.fac;
 document.getElementById('bx-n').textContent=`The other column uses the same megawatts, electricity and water source, and the settings last chosen for that type. All AI (${RKS[ar].n}, ${ai.c.n}) uses ${rE.toFixed(2)}× the electricity of all conventional (${cv.c.n}) because it runs fuller, and ${rW.toFixed(2)}× the on-site water${rW<1?': liquid-cooled racks avoid chillers and evaporate less per kWh':rW>1.05?': with the same evaporative cooling, more energy means more water':''}. ${H.gC?`GPUs are ${Math.round(H.gC/H.cost*100)}% of the AI halls' yearly cost, so water is a rounding error in their budget even when it is not in the city's.`:`Electricity is ${Math.round(H.eC/H.cost*100)}% of the conventional halls' yearly cost; water is ${(H.wC/H.cost*100).toFixed(1)}%.`} ${ws===0?`Taken from BWSSB, the on-site water equals the daily needs of ${ppl<1e5?fmt(Math.round(ppl/100)*100):fmt(ppl/1e5,1)+' lakh'} people.`:ws===1?'On treated sewage, the halls would not draw on drinking water at all, though the comparison shows what they would otherwise take.':'Borewells are cheap to the operator but draw on groundwater already used at ~305% of recharge in Bangalore East.'}`;
 window.__BX={mw,H,O,E,ty,BWS,CB,CG,C20,CRF}}
seg('bx-ty',d=>{ty=d.v;r6()});seg('bx-cr',d=>{cr=+d.v;r6()});seg('bx-cc',d=>{cc=d.v;r6()});seg('bx-ar',d=>{ar=+d.v;r6()});seg('bx-ac',d=>{ac=d.v;r6()});seg('bx-pw',d=>{pw6=+d.v;r6()});seg('bx-ws',d=>{ws=+d.v;r6()});seg('bx-ex',d=>{ex=+d.v;r6()});
seg('bx-pre',d=>{document.getElementById('bx-mw').value=d.v;r6()});
['bx-mw','bx-cu','bx-ts'].forEach(i=>document.getElementById(i).addEventListener('input',()=>{if(i==='bx-mw')document.querySelectorAll('#bx-pre button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===String(val('bx-mw'))?'true':'false'));r6()}));
r6();window.__CTIX={GP,PT,RKS,PWS,WS,c5,c6,at};
})();
