
/* ---------- NEW VISUALS (phase 4) ---------- */
(()=>{if(typeof document==='undefined')return;
const $=id=>document.getElementById(id);
const fm=(v,d=0)=>(+v).toLocaleString('en-IN',{maximumFractionDigits:d,minimumFractionDigits:d});
const cr=v=>{const a=Math.abs(v);return (v<0?'−':'')+'₹'+(a>=1e5?fm(a/1e5,2)+' lakh cr':fm(a,0)+' cr')};
const segOn=(id,cb)=>{const el=$(id);if(!el)return;el.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));cb(b.dataset.v)})};
const segSet=(id,v)=>{const el=$(id);if(el)el.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.v===v))};
const mix=(a,b,p)=>`color-mix(in oklab,var(${b}) ${Math.round(Math.max(0,Math.min(1,p))*100)}%,var(${a}))`;
const VZ=window.__VZ={};

/* ============ 1. PSYCHROMETRIC CHART (6.3) ============ */
const ALT={blr:920,pun:560,hyd:540,noi:200,mum:10,che:10,viz:10};
const pws=T=>.61094*Math.exp(17.625*T/(T+243.04));
const Pat=a=>101.325*Math.pow(1-2.25577e-5*a,5.2559);
const Wrh=(T,rh,P)=>{const e=rh*pws(T);return 622*e/(P-e)};
const Wwb=(DB,WB,P)=>{const Ws=.622*pws(WB)/(P-pws(WB));return 1000*((2501-2.326*WB)*Ws-1.006*(DB-WB))/(2501+1.86*DB-4.186*WB)};
const PS={city:'blr',mode:'dry',ts:40,dT:0};
const DAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
function hoursOf(city,dT){dT=dT||0;const C=DTE.CITY[city],cl=DTE.CLIM[C.cl],out=[];for(let m=0;m<12;m++)for(let hh=0;hh<24;hh++){const cs=Math.cos(2*Math.PI*(hh-15)/24),DB=cl.db[m]+C.dr/2*cs+dT,WB=Math.min(DB,cl.wb[m]+C.wr/2*cs+.8*dT);out.push({m,hh,DB,WB,d:DAYS[m]})}return out}
/* class: 0 free & dry, 1 free with water, 2 partial compressor, 3 compressor */
function cls(p,mode,ts){if(mode==='dry'){const Tf=p.DB+6;return Tf<=ts?0:Tf<ts+10?2:3}
 if(mode==='twr'){const Tf=p.WB+5.5;return Tf<=ts?1:Tf<ts+10?2:3}
 /* indirect evaporative, 24 °C supply air, 36 °C return */
 const dry=36-.7*(36-p.DB);if(dry<=24)return 0;const Tw=p.DB-.85*(p.DB-p.WB),Ta=36-.7*(36-Tw);return Ta<=24?1:Ta<34?2:3}
const CLS=[['--good','No compressor, no water'],['--cold','No compressor, uses water'],['--warn','Compressor part of the time'],['--hot','Compressor carries the load']];
VZ.psy=function(){const sv=$('vz-psy');if(!sv)return;const P=Pat(ALT[PS.city]||0),W=640,H=390,pl=46,pr=58,pt=30,pb=38;
 const x=T=>pl+(T-5)/40*(W-pl-pr),y=w=>pt+(30-w)/30*(H-pt-pb);let g='';
 for(let t=5;t<=45;t+=5)g+=`<line x1="${x(t)}" x2="${x(t)}" y1="${pt}" y2="${H-pb}" class="vz-grid"/><text x="${x(t)}" y="${H-pb+15}" text-anchor="middle" class="vz-t">${t}</text>`;
 for(let w=0;w<=30;w+=5)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(w)}" y2="${y(w)}" class="vz-grid"/><text x="${W-pr+6}" y="${y(w)+4}" class="vz-t">${w}</text>`;
 g+=`<text x="${(pl+W-pr)/2}" y="${H-6}" text-anchor="middle" class="vz-t">Dry-bulb temperature (°C)</text><text x="${W-pr+6}" y="${pt-16}" class="vz-t">g/kg</text>`;
 /* clip region under saturation */
 const sat=[];for(let t=5;t<=45;t+=.5){const w=Wrh(t,1,P);if(w>30){sat.push([x(t-.5+(30-Wrh(t-.5,1,P))/(w-Wrh(t-.5,1,P))*.5),y(30)]);break}sat.push([x(t),y(w)])}
 /* ASHRAE A1 recommended envelope: 18–27 °C, dew point −9 to 15 °C, RH ≤ 60% */
 const wdp=dp=>622*pws(dp)/(P-pws(dp));const env=[];for(let t=18;t<=27.01;t+=.5)env.push([x(t),y(Math.min(wdp(15),Wrh(t,.6,P)))]);env.push([x(27),y(wdp(-9))],[x(18),y(wdp(-9))]);
 g+=`<polygon points="${env.map(p=>p.join(',')).join(' ')}" class="vz-env"/><text x="${x(22.5)}" y="${y(wdp(-9))-18}" text-anchor="middle" class="vz-t vz-envt">ASHRAE recommended</text><text x="${x(22.5)}" y="${y(wdp(-9))-6}" text-anchor="middle" class="vz-t vz-envt">server inlet air</text>`;
 [.2,.4,.6,.8].forEach(rh=>{const pts=[];let lt=null;for(let t=5;t<=45;t+=.5){const w=Wrh(t,rh,P);if(w>30)break;pts.push(x(t)+','+y(w));lt=t}g+=`<polyline points="${pts.join(' ')}" class="vz-rh"/>`;const tl=Math.min(lt,44),wl=Wrh(tl,rh,P);g+=`<text x="${x(tl)-3}" y="${y(wl)-4}" text-anchor="end" class="vz-t vz-rht">${rh*100}%</text>`});
 [10,15,20,25,30].forEach(wb=>{const pts=[];for(let t=wb;t<=45;t+=.5){const w=Wwb(t,wb,P);if(w<0)break;pts.push(x(t)+','+y(w))}g+=`<polyline points="${pts.join(' ')}" class="vz-wb"/><text x="${x(wb)-4}" y="${y(Wrh(wb,1,P))-3}" text-anchor="end" class="vz-t vz-wbt">${wb}°</text>`});
 g+=`<polyline points="${sat.map(p=>p.join(',')).join(' ')}" class="vz-sat"/>`;
 /* boundary of the chosen mode */
 const ts=PS.ts;let bd='',bl='';
 if(PS.mode==='dry'){const t=ts-6;bd=`M${x(t)} ${y(0)} L${x(t)} ${y(Math.min(30,Wrh(t,1,P)))}`;bl=`dry coolers alone up to ${t} °C`}
 else if(PS.mode==='twr'){const wb=ts-5.5,pts=[];for(let t=wb;t<=45;t+=.5){const w=Wwb(t,wb,P);if(w<0)break;pts.push(x(t)+' '+y(w))}bd='M'+pts.join(' L');bl=`towers alone below ${wb.toFixed(1)} °C wet-bulb`}
 else{const pts=[];for(let t=18.9;t<=45;t+=.5){const wb=(18.86-.15*t)/.85;if(wb>t)continue;const w=Wwb(t,wb,P);if(w<0)break;pts.push(x(t)+' '+y(w))}bd='M'+pts.join(' L');bl='evaporation alone keeps air at 24 °C'}
 g+=`<path d="${bd}" class="vz-bd"/>`;
 const hs=hoursOf(PS.city,PS.dT),cnt=[0,0,0,0];let tot=0;
 hs.forEach(p=>{const c=cls(p,PS.mode,ts);cnt[c]+=p.d;tot+=p.d;const w=Wwb(p.DB,p.WB,P);g+=`<circle cx="${x(p.DB).toFixed(1)}" cy="${y(w).toFixed(1)}" r="3" class="vz-pt" style="fill:var(${CLS[c][0]})"><title>${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][p.m]} ${String(p.hh).padStart(2,'0')}:00 · ${p.DB.toFixed(1)} °C dry-bulb, ${p.WB.toFixed(1)} °C wet-bulb</title></circle>`});
 const hot=hs.reduce((a,p)=>p.DB>a.DB?p:a,hs[0]);
 g+=`<text x="${pl+8}" y="${pt+14}" class="vz-h">${DTE.CITY[PS.city].n}</text><text x="${pl+8}" y="${pt+29}" class="vz-t">288 typical hours${PS.dT?` warmed by ${PS.dT} °C`:''} · ${bl}</text>`;
 sv.innerHTML=g;
 $('vz-psy-r').innerHTML=CLS.map((c,i)=>cnt[i]?`<div><span class="v" style="color:var(${c[0]})">${Math.round(cnt[i]/tot*100)}%</span><span class="k">${c[1]}</span></div>`:'').join('')+`<div><span class="v">${hot.DB.toFixed(1)} °C</span><span class="k">hottest typical hour (${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][hot.m]}, wet-bulb ${hot.WB.toFixed(1)} °C)</span></div>`;
 $('vz-ts').style.display=PS.mode==='iec'?'none':''};
segOn('vz-psy-c',v=>{PS.city=v;VZ.psy()});segOn('vz-psy-m',v=>{PS.mode=v;VZ.psy()});segOn('vz-psy-t',v=>{PS.ts=+v;VZ.psy()});segOn('vz-psy-w',v=>{PS.dT=+v;VZ.psy();VZ.warm&&VZ.warm()});VZ.hoursOf=hoursOf;VZ.cls=cls;
VZ.PS=PS;

/* ============ 2. CLIMATE FINGERPRINTS (6.3) ============ */
const FPD={coloT:{n:'Colocation · chilled-water air + towers',S:{hw:'cpu',cool:'crahc',rej:'wcc'}},coloA:{n:'Colocation · chilled-water air + air-cooled chillers',S:{hw:'cpu',cool:'crahc',rej:'acc'}},
 iec:{n:'Colocation · indirect evaporative units',S:{hw:'cpu',cool:'iec',rej:'integ'}},aiD:{n:'AI · direct-to-chip + dry coolers',S:{hw:'gb300',cool:'dlc',rej:'dry'}},aiT:{n:'AI · direct-to-chip + towers',S:{hw:'gb300',cool:'dlc',rej:'twr'}}};
const FP={d:'coloT',k:'pue'};const FPC=['blr','pun','hyd','noi','mum','che','viz'];
VZ.fpData=function(d,k){const S=Object.assign({},DTE.DEF,{mw:10,u:80},FPD[d].S);const res={};
 FPC.forEach(c=>{S.city=c;const cells=[];let se=0,si=0,sw=0;hoursOf(c).forEach(p=>{const o=DTE.hour(S,p.DB,p.WB,S.mw*1000*S.u/100);const pue=o.fac/o.it,wue=o.w/o.it;cells.push({m:p.m,hh:p.hh,pue,wue});se+=o.fac*p.d;si+=o.it*p.d;sw+=o.w*p.d});res[c]={cells,pue:se/si,wue:sw/si}});return res};
VZ.fp=function(){const box=$('vz-fp');if(!box)return;const R=VZ.fpData(FP.d,FP.k),k=FP.k;
 const all=FPC.flatMap(c=>R[c].cells.map(x=>x[k]));let lo=Math.min(...all),hi=Math.max(...all);if(hi-lo<(k==='pue'?.05:.2))hi=lo+(k==='pue'?.05:.2);
 const cw=7,ch=6,Wd=24*cw,Hd=12*ch;
 box.innerHTML=FPC.map(c=>{let g='';R[c].cells.forEach(x=>{g+=`<rect x="${x.hh*cw}" y="${x.m*ch}" width="${cw+.4}" height="${ch+.4}" shape-rendering="crispEdges" style="fill:${mix('--cold','--heat',(x[k]-lo)/(hi-lo))}"><title>${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][x.m]} ${String(x.hh).padStart(2,'0')}:00 · ${k==='pue'?'PUE '+x.pue.toFixed(2):'WUE '+x.wue.toFixed(2)+' L/kWh'}</title></rect>`});
  return `<figure class="vz-fpc"><figcaption><b>${DTE.CITY[c].n}</b><span class="mono">${k==='pue'?R[c].pue.toFixed(2):R[c].wue.toFixed(2)}</span></figcaption><svg viewBox="-14 -2 ${Wd+16} ${Hd+14}" role="img" aria-label="${DTE.CITY[c].n} hourly ${k==='pue'?'PUE':'WUE'} by month and hour"><g>${g}</g><text x="-3" y="${ch*.9}" text-anchor="end" class="vz-ax">J</text><text x="-3" y="${ch*6.9}" text-anchor="end" class="vz-ax">J</text><text x="-3" y="${ch*11.9}" text-anchor="end" class="vz-ax">D</text><text x="0" y="${Hd+10}" class="vz-ax">0h</text><text x="${12*cw}" y="${Hd+10}" text-anchor="middle" class="vz-ax">12h</text><text x="${Wd}" y="${Hd+10}" text-anchor="end" class="vz-ax">23h</text></svg></figure>`}).join('');
 $('vz-fp-lg').innerHTML=`<span class="xs muted">${k==='pue'?'PUE':'WUE, L per kWh of IT'}</span><span class="vz-ramp"></span><span class="xs mono">${lo.toFixed(2)} → ${hi.toFixed(2)}</span>`;
 const best=FPC.slice().sort((a,b)=>R[a][k]-R[b][k]);
 $('vz-fp-n').textContent=`${FPD[FP.d].n}: the annual ${k==='pue'?'PUE':'WUE'} runs from ${R[best[0]][k].toFixed(2)} in ${DTE.CITY[best[0]].n} to ${R[best[6]][k].toFixed(2)} in ${DTE.CITY[best[6]].n}. `+(k==='pue'?'Warm stripes are the hours the compressors work hardest: afternoons before the monsoon in the hot-dry cities, nearly all year on the humid coast.':'Evaporative designs drink most in the hot afternoons, exactly when the city\'s own demand peaks.')};
segOn('vz-fp-d',v=>{FP.d=v;VZ.fp()});segOn('vz-fp-k',v=>{FP.k=v;VZ.fp()});VZ.FP=FP;

/* ============ 3. LCOC TORNADO (6.1) ============ */
const LT={sys:null};
VZ.ltor=function(){const sv=$('vz-ltor');if(!sv||!window.__CE||!window.__CEX)return;const R0=window.__CE,O=Object.assign({},window.__CEX.O);
 const sel=$('vz-ltor-s');const okIds=R0.ok.map(r=>r.s.id);if(!LT.sys||!okIds.includes(LT.sys))LT.sys=R0.best.s.id;
 sel.innerHTML=R0.ok.map(r=>`<option value="${r.s.id}"${r.s.id===LT.sys?' selected':''}>${r.s.n}</option>`).join('');
 const row=R=>R.rows.find(r=>r.s.id===LT.sys),base=row(R0),EIT=R0.EIT,L=t=>t*1e7/EIT;
 const re=o=>{const R=CEM.compute(Object.assign({},O,o));return {v:row(R).lcoc,best:R.best.s}};
 const man=f=>({v:L(f(base)),best:null});const t0=O.t==null?R0.c.t:O.t,w0=O.wp==null?R0.c.wp:O.wp;
 const pf=d=>(Math.max(.01,base.pue+d-1.06))/Math.max(.01,base.pue-1.06);
 const V=[
  ['Electricity tariff ±20%',re({t:t0*.8}),re({t:t0*1.2}),`₹${(t0*.8).toFixed(1)} / ₹${(t0*1.2).toFixed(1)} per kWh`],
  ['Water price ±50%',re({wp:w0*.5}),re({wp:w0*1.5}),`₹${fm(w0*.5)} / ₹${fm(w0*1.5)} per kL`],
  ['Cooling capex ±20%',man(b=>b.tot-.2*b.capA),man(b=>b.tot+.2*b.capA),'equipment and installation'],
  ['Maintenance ±20%',man(b=>b.tot-.2*b.om),man(b=>b.tot+.2*b.om),'service, chemicals, fluid top-up'],
  ['PUE ±0.03',man(b=>b.tot-b.elec*(1-pf(-.03))),man(b=>b.tot+b.elec*(pf(.03)-1)),`${(base.pue-.03).toFixed(2)} / ${(base.pue+.03).toFixed(2)}`],
  ['On-site WUE ±30%',man(b=>b.tot-.3*b.water),man(b=>b.tot+.3*b.water),`${(base.wue*.7).toFixed(2)} / ${(base.wue*1.3).toFixed(2)} L/kWh`],
  ['Cost of capital ±2 points',re({disc:O.disc-2}),re({disc:O.disc+2}),`${O.disc-2}% / ${O.disc+2}%`],
  ['Utilisation ±10 points',re({u:Math.min(100,O.u+10)}),re({u:Math.max(10,O.u-10)}),`${Math.min(100,O.u+10)}% / ${Math.max(10,O.u-10)}% (higher use spreads capex)`]];
 const b0=base.lcoc,rows=V.map(([n,a,b,d])=>({n,a:a.v,b:b.v,d,ba:a.best,bb:b.best,sw:Math.abs(b.v-a.v)})).sort((p,q)=>q.sw-p.sw);
 const W=640,pl=210,pr=110,rh=30,pt=30,H=pt+rows.length*rh+30;let lo=Math.min(b0,...rows.flatMap(r=>[r.a,r.b])),hi=Math.max(b0,...rows.flatMap(r=>[r.a,r.b]));const pad=(hi-lo)*.08||1;lo-=pad;hi+=pad;
 const x=v=>pl+(v-lo)/(hi-lo)*(W-pl-pr);let g=`<line x1="${x(b0)}" x2="${x(b0)}" y1="${pt-8}" y2="${H-26}" class="vz-base"/><text x="${x(b0)}" y="${pt-12}" text-anchor="middle" class="vz-n">₹${fm(b0)} /MWh</text>`;
 rows.forEach((r,i)=>{const y=pt+i*rh;const lw=Math.min(r.a,r.b),hw=Math.max(r.a,r.b);
  g+=`<text x="${pl-8}" y="${y+13}" text-anchor="end" class="vz-t vz-tl">${r.n}</text><text x="${pl-8}" y="${y+25}" text-anchor="end" class="vz-ax">${r.d}</text>`;
  g+=`<rect x="${x(Math.min(r.a,b0))}" y="${y+4}" width="${Math.abs(x(r.a)-x(b0))}" height="18" class="vz-lo"/><rect x="${x(Math.min(r.b,b0))}" y="${y+4}" width="${Math.abs(x(r.b)-x(b0))}" height="18" class="vz-hi"/>`;
  const flip=[r.ba,r.bb].find(s=>s&&s.id!==LT.sys&&LT.sys===R0.best.s.id);
  g+=`<text x="${x(hw)+6}" y="${y+17}" class="vz-n">${r.sw<.5?'±0':'±'+fm(r.sw/2)}${flip?' ⇄':''}</text>`;
  if(flip)g+=`<title>At one end ${flip.n} becomes the cheapest system</title>`});
 g+=`<rect x="${pl}" y="${H-18}" width="10" height="10" class="vz-lo"/><text x="${pl+14}" y="${H-9}" class="vz-t">low end of the range</text><rect x="${pl+140}" y="${H-18}" width="10" height="10" class="vz-hi"/><text x="${pl+154}" y="${H-9}" class="vz-t">high end</text>`;
 sv.setAttribute('viewBox',`0 0 ${W} ${H}`);sv.innerHTML=g;
 const top=rows[0],fl=rows.filter(r=>[r.ba,r.bb].some(s=>s&&s.id!==R0.best.s.id));
 $('vz-ltor-n').textContent=`${base.s.n} in ${R0.c.n}: levelised cooling cost ₹${fm(b0)} per MWh of IT (₹${(b0/1000).toFixed(2)} per kWh). The biggest lever is ${top.n.split(' ±')[0].toLowerCase()}, worth ±₹${fm(top.sw/2)}. `+(LT.sys===R0.best.s.id?(fl.length?`The ranking is fragile: ${fl.map(r=>r.n.split(' ±')[0].toLowerCase()).join(' and ')} at the ends of the range make ${[...new Set(fl.flatMap(r=>[r.ba,r.bb]).filter(s=>s&&s.id!==R0.best.s.id).map(s=>s.n))].join(' or ')} cheaper (⇄).`:'It stays the cheapest system across every range shown.'):'')};
document.addEventListener('change',e=>{if(e.target.id==='vz-ltor-s'){LT.sys=e.target.value;VZ.ltor()}});
['input','click','change'].forEach(ev=>document.addEventListener(ev,e=>{const c=e.target.closest&&e.target.closest('#cce1');if(c&&!e.target.closest('#vz-ltor-p'))setTimeout(VZ.ltor,0)}));VZ.LT=LT;

/* ============ 4. INDIA SCOPE 2 MAP (Scope chapter) ============ */
const GWS={over:['Punjab','Rajasthan','Haryana','Delhi'],semi:['Uttar Pradesh','Tamil Nadu','Chandigarh']};
const DCC=[{id:'mum',n:'Mumbai',lat:19.07,lon:72.88,g:STD.gwMix["Maharashtra"],st:'Maharashtra',src:[['Chandrapur',19.95,79.3,.5],['Koradi',21.25,79.1,.5]],dx:-1,dy:-4},{id:'pun',n:'Pune',lat:18.52,lon:73.86,g:STD.gwMix["Maharashtra"],st:'Maharashtra',src:[['Chandrapur',19.95,79.3,.5],['Koradi',21.25,79.1,.5]],dx:-1,dy:8},
 {id:'blr',n:'Bengaluru',lat:12.97,lon:77.59,g:STD.gwMix["Karnataka"],st:'Karnataka',src:[['Raichur',16.36,77.34,.55],['Kudgi',16.5,75.85,.45]],dx:-1},{id:'che',n:'Chennai',lat:13.08,lon:80.27,g:STD.gwMix["Tamil Nadu"],st:'Tamil Nadu',src:[['Ennore',13.25,80.32,.35],['Mettur',11.8,77.8,.3],['Neyveli',11.6,79.5,.35]],dx:1},
 {id:'hyd',n:'Hyderabad',lat:17.39,lon:78.49,g:STD.gwMix["Telangana"],st:'Telangana',src:[['Ramagundam',18.76,79.45,.6],['Kothagudem',17.55,80.62,.4]],dx:-1},{id:'noi',n:'Delhi NCR',lat:28.54,lon:77.39,g:STD.gwMix["Uttar Pradesh"],st:'Uttar Pradesh',src:[['Singrauli',24.1,82.7,.65],['Dadri',28.6,77.6,.35]],dx:-1},
 {id:'kol',n:'Kolkata',lat:22.57,lon:88.36,g:STD.gwMix["West Bengal"],st:'West Bengal',src:[['Farakka',24.8,87.9,.5],['Mejia',23.45,87.13,.5]],dx:1},{id:'viz',n:'Visakhapatnam',lat:17.69,lon:83.22,g:STD.gwMix["Andhra Pradesh"],st:'Andhra Pradesh',src:[['Simhadri',17.6,83.1,.6],['Vijayawada',16.6,80.55,.4]],dx:1}];
const PLD={Kudgi:-1,Mettur:-1,Dadri:-1,Vijayawada:-1};
const COAL=[['Talcher',20.95,85.23],['Korba',22.35,82.68],['Singrauli coalfield',24.15,82.45],['Jharia',23.75,86.42],['Singareni',18.1,79.9]];
const IM={d:'colo',sel:'blr'};
const IMD={colo:{n:'Colocation, towers',pue:1.25,wue:1.8},ai:{n:'AI, dry coolers',pue:1.15,wue:.05}};
VZ.imap=function(){const box=$('vz-imap');if(!box||!window.__GEO||!window.__proj)return;const G=window.__GEO,pj=window.__proj,D=IMD[IM.d],mwh=8760*(IM.d==='ai'?STD.ref.uAI:STD.ref.uConv);
 let g='';Object.keys(G.p).forEach(s=>{const c=GWS.over.includes(s)?'vz-gw3':GWS.semi.includes(s)?'vz-gw2':'vz-gw1';g+=`<path d="${G.p[s]}" class="vz-st ${c}"><title>${s}</title></path>`});
 const C=DCC.map(c=>{const [x,y]=pj(c.lon,c.lat);return Object.assign({},c,{x,y,s1:mwh*D.wue/1000,s2:mwh*D.pue*c.g/1000})});
 const mx=Math.max(...C.map(c=>c.s2));
 C.forEach(c=>{const on=c.id===IM.sel;c.src.forEach(([n,la,lo,f])=>{const [x2,y2]=pj(lo,la),mxp=(c.x+x2)/2,myp=(c.y+y2)/2,dx=x2-c.x,dy=y2-c.y,cx=mxp-dy*.25,cy=myp+dx*.25;
  g+=`<path d="M${c.x.toFixed(1)} ${c.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" class="vz-arc${on?' on':''}" style="stroke-width:${(1+5*c.s2*f/mx).toFixed(2)}"><title>${c.n} → ${n}: ~${fm(c.s2*f,1)} ML a year per MW of IT</title></path>`})});
 const plants={};C.forEach(c=>c.src.forEach(([n,la,lo])=>{plants[n]=[la,lo,(plants[n]&&plants[n][2])||c.id===IM.sel]}));
 Object.entries(plants).forEach(([n,[la,lo,on]])=>{const [x,y]=pj(lo,la);g+=`<rect x="${(x-3).toFixed(1)}" y="${(y-3).toFixed(1)}" width="6" height="6" class="vz-pl${on?' on':''}"><title>${n} thermal power</title></rect>`;if(on){const dl=PLD[n]||1;g+=`<text x="${(x+dl*6).toFixed(1)}" y="${(y+4).toFixed(1)}" text-anchor="${dl<0?'end':'start'}" class="vz-lbl">${n}</text>`}});
 COAL.forEach(([n,la,lo])=>{const [x,y]=pj(lo,la);g+=`<path d="M${x} ${y-5} L${x+5} ${y} L${x} ${y+5} L${x-5} ${y} Z" class="vz-coal"><title>${n}</title></path>`});
 C.forEach(c=>{const on=c.id===IM.sel,r1=Math.max(2.5,Math.sqrt(c.s1)*1.6);g+=`<g class="vz-dc${on?' on':''}" data-c="${c.id}" tabindex="0" role="button" aria-label="${c.n}"><circle cx="${c.x}" cy="${c.y}" r="${Math.max(r1,6)+3}" class="vz-hit"/><circle cx="${c.x}" cy="${c.y}" r="${r1}" class="vz-s1"/><circle cx="${c.x}" cy="${c.y}" r="2.2" class="vz-dot"/><text x="${c.x+c.dx*(r1+4)}" y="${c.y+4+(c.dy||0)}" text-anchor="${c.dx<0?'end':'start'}" class="vz-lbl b">${c.n}</text></g>`});
 box.innerHTML=`<svg viewBox="40 60 470 560" role="img" aria-label="Map of India: where a data centre's Scope 2 water is evaporated">${g}</svg>`;
 const s=C.find(c=>c.id===IM.sel);
 $('vz-imap-r').innerHTML=`<div><span class="v">${fm(s.s1,1)} ML</span><span class="k">Scope 1: evaporated on site in ${s.n} each year, per MW of IT (${D.n}, WUE ${D.wue})</span></div><div><span class="v cold">${fm(s.s2,1)} ML</span><span class="k">Scope 2: evaporated at ${s.src.map(x=>x[0]).join(', ')} (${s.st} grid, ${s.g} L/kWh at the meter, PUE ${D.pue})</span></div><div><span class="v">${Math.round(s.s2/(s.s1+s.s2)*100)}%</span><span class="k">of the operational water is used outside the city</span></div>`};
document.addEventListener('click',e=>{const d=e.target.closest&&e.target.closest('.vz-dc');if(d){IM.sel=d.dataset.c;VZ.imap()}});
document.addEventListener('keydown',e=>{const d=e.target.closest&&e.target.closest('.vz-dc');if(d&&(e.key==='Enter'||e.key===' ')){e.preventDefault();IM.sel=d.dataset.c;VZ.imap()}});
segOn('vz-imap-d',v=>{IM.d=v;VZ.imap()});VZ.IM=IM;

/* ============ 5. ASSET-LIFE RIVER + NPV TORNADO (14.4) ============ */
VZ.river=function(){const sv=$('vz-river');const L0=window.__DV;if(!sv)return;if(!L0||!L0.d){sv.innerHTML='';return}const {d,R,V}=L0,L=d.L;
 const lanes=[{n:'Building, power and shell',c:'--cold-2',segs:[[0,L,R.baseCap]]}];
 if(d.midY)lanes.push({n:'UPS and switchgear refit',c:'--warn',segs:[[d.midY,L,.2*R.baseCap]],from:d.midY});
 const rep=(v,life)=>{const s=[];for(let y=0;y<L;y+=life)s.push([y,Math.min(L,y+life),v]);return s};
 lanes.push({n:'Cooling, room side',c:'--cold',segs:rep(R.coolRoom,R.CP.Lr),life:R.CP.Lr});
 if(R.coolRej>0)lanes.push({n:'Cooling, heat rejection',c:'--good',segs:rep(R.coolRej,R.CP.Lj),life:R.CP.Lj});
 if(d.own)lanes.push({n:'IT hardware',c:'--heat',segs:rep(R.itCap,V.ref),life:V.ref});
 const mx=Math.max(...lanes.flatMap(l=>l.segs.map(s=>s[2])));const W=680,pl=150,pr=96,maxH=40,gap=12,pt=26;
 const hh=v=>Math.max(4,Math.sqrt(v/mx)*maxH);const x=t=>pl+t/L*(W-pl-pr);let y=pt,g='';
 for(let t=0;t<=L;t+=5)g+=`<line x1="${x(t)}" x2="${x(t)}" y1="${pt-6}" y2="1000" class="vz-grid"/><text x="${x(t)}" y="${pt-10}" text-anchor="middle" class="vz-t">${t===0?'start':'yr '+t}</text>`;
 lanes.forEach(l=>{const h=Math.max(26,...l.segs.map(s=>hh(s[2]))),cy=y+h/2,tot=l.segs.reduce((a,s)=>a+s[2],0);
  g+=`<text x="${pl-8}" y="${cy+1}" text-anchor="end" class="vz-t vz-tl">${l.n}</text><text x="${pl-8}" y="${cy+13}" text-anchor="end" class="vz-ax">${l.life?`${l.segs.length}× · ${l.life}-yr life`:l.from?`from year ${l.from}`:'whole life'}</text>`;
  l.segs.forEach(([a,b,v],i)=>{const sh=hh(v);g+=`<rect x="${x(a)+1}" y="${cy-sh/2}" width="${Math.max(2,x(b)-x(a)-2)}" height="${sh}" rx="3" style="fill:var(${l.c})" class="vz-seg"><title>${l.n}: ${cr(v)} bought in year ${a}, used to year ${b}</title></rect>`;if(x(b)-x(a)>58&&sh>=14)g+=`<text x="${x(a)+6}" y="${cy+4}" class="vz-in">${cr(v)}</text>`});
  g+=`<text x="${W-pr+8}" y="${cy+4}" class="vz-n">${cr(tot)}</text>`;y+=h+gap});
 /* money in: EBITDA per year */
 const eb=d.ebitda.slice(2),mE=Math.max(1,...eb.map(Math.abs)),bh=34,by=y+bh;
 g+=`<text x="${pl-8}" y="${by-bh/2+4}" text-anchor="end" class="vz-t vz-tl">Operating cash (EBITDA)</text>`;
 eb.forEach((v,i)=>{const t=i;const hgt=Math.abs(v)/mE*bh;g+=`<rect x="${x(t)+1}" y="${v>=0?by-hgt:by}" width="${Math.max(1.5,x(t+1)-x(t)-2)}" height="${Math.max(.5,hgt)}" class="${v>=0?'vz-eb':'vz-ebn'}"><title>Year ${t+1}: EBITDA ${cr(v)}</title></rect>`});
 g+=`<text x="${W-pr+8}" y="${by-bh/2+4}" class="vz-n">${cr(d.lifeE)}</text><text x="${W-pr+8}" y="${pt-10}" class="vz-t">life total</text>`;
 const H=by+16;sv.setAttribute('viewBox',`0 0 ${W} ${H}`);sv.innerHTML=g;
 const it=lanes.find(l=>l.n==='IT hardware'),itT=it?it.segs.reduce((a,s)=>a+s[2],0):0,all=lanes.reduce((a,l)=>a+l.segs.reduce((b,s)=>b+s[2],0),0);
 $('vz-river-n').textContent=`Band height grows with the money spent (square-root scale, so small items stay visible); each block is one purchase and its length is how long it lasts. `+(it?`IT hardware is ${Math.round(itT/all*100)}% of everything bought over ${L} years: the building is paid for once, the GPUs ${it.segs.length} times.`:`As a colocation landlord you never buy the IT; cooling is replaced ${lanes.filter(l=>l.life).reduce((a,l)=>a+l.segs.length-1,0)} times over ${L} years.`)};
VZ.ntor=function(){const sv=$('vz-ntor');const L0=window.__DV;if(!sv)return;if(!L0||!L0.d){sv.innerHTML='';return}const {R,S}=L0,V=Object.assign({},L0.V);
 const npv=(r,s,v)=>DTV.dc(r,s,v).npv,b0=npv(R,S,V);
 const RS=k=>Object.assign({},R,{baseCap:R.baseCap*k,coolRoom:R.coolRoom*k,coolRej:R.coolRej*k,coolCap:R.coolCap*k,facCap:R.facCap*k});
 const RE=k=>Object.assign({},R,{cost:Object.assign({},R.cost,{energy:R.cost.energy*k,demand:R.cost.demand*k})});
 const RI=k=>Object.assign({},R,{itCap:R.itCap*k});const VV=o=>Object.assign({},V,o);
 const own=V.biz!=='colo',rows=[];
 const P=V.biz==='colo'?['rent','Rent ±20%',v=>'₹'+fm(v)+'/kW/mo']:V.biz==='gpu'?['gpr','GPU-hour price ±20%',v=>'₹'+fm(v)]:['tokp','Token price ±20%',v=>'₹'+fm(v)+'/M'];
 rows.push([P[1],npv(R,S,VV({[P[0]]:V[P[0]]*.8})),npv(R,S,VV({[P[0]]:V[P[0]]*1.2})),P[2](V[P[0]]*.8)+' / '+P[2](V[P[0]]*1.2)]);
 rows.push(['Facility and cooling capex ±20%',npv(RS(1.2),S,V),npv(RS(.8),S,V),cr(R.facCap*1.2)+' / '+cr(R.facCap*.8)]);
 rows.push(['Electricity cost ±20%',npv(RE(1.2),S,V),npv(RE(.8),S,V),'energy and demand charges']);
 if(own)rows.push(['IT hardware cost ±20%',npv(RI(1.2),S,V),npv(RI(.8),S,V),cr(R.itCap*1.2)+' / '+cr(R.itCap*.8)]);
 if(own)rows.push(['IT refresh 4 / 6 years',npv(R,S,VV({ref:4})),npv(R,S,VV({ref:6})),'how often the GPUs are replaced']);
 if(V.biz!=='colo')rows.push(['Price decline per year ±5 points',npv(R,S,VV({dec:V.dec+5,dect:V.dect+5})),npv(R,S,VV({dec:Math.max(0,V.dec-5),dect:Math.max(0,V.dect-5)})),`${V.dec+5}% / ${Math.max(0,V.dec-5)}% a year`]);
 if(V.biz==='colo')rows.push(['Occupancy ±10 points',npv(R,S,VV({occ:Math.max(10,V.occ-10)})),npv(R,S,VV({occ:Math.min(100,V.occ+10)})),`${Math.max(10,V.occ-10)}% / ${Math.min(100,V.occ+10)}%`]);
 if(V.biz!=='colo'){const sh=d=>{const o={};['uT','uI','uG'].forEach(k=>{o[k]=Math.max(10,Math.min(100,(S[k]==null?S.u:S[k])+d))});return Object.assign({},S,o)},ru=d=>{const S2=sh(d),r=DTE.compute(S2);return r.ok?npv(r,r.S||S2,V):b0};const rL=DTE.compute(sh(-10)),rH=DTE.compute(sh(10));rows.push(['Utilisation ±10 points (every workload)',ru(-10),ru(10),`${rL.ok?rL.S.u:'—'}% / ${rH.ok?rH.S.u:'—'}% blended`])}
 rows.push(['Cost of capital ±2 points',npv(R,S,VV({disc:V.disc+2})),npv(R,S,VV({disc:Math.max(1,V.disc-2)})),`${V.disc+2}% / ${Math.max(1,V.disc-2)}%`]);
 rows.push(['Life 20 / 30 years',npv(R,S,VV({life:20})),npv(R,S,VV({life:30})),'building and plant']);
 const T=rows.map(([n,a,b,dd])=>({n,a,b,dd,sw:Math.abs(b-a)})).sort((p,q)=>q.sw-p.sw);
 const W=680,pl=220,pr=90,rh=30,pt=30,H=pt+T.length*rh+28;let lo=Math.min(b0,0,...T.flatMap(r=>[r.a,r.b])),hi=Math.max(b0,0,...T.flatMap(r=>[r.a,r.b]));const pad=(hi-lo)*.06||1;lo-=pad;hi+=pad;
 const x=v=>pl+(v-lo)/(hi-lo)*(W-pl-pr);let g=`<line x1="${x(0)}" x2="${x(0)}" y1="${pt-6}" y2="${H-24}" class="vz-zero"/><line x1="${x(b0)}" x2="${x(b0)}" y1="${pt-6}" y2="${H-24}" class="vz-base"/><text x="${x(b0)}" y="${pt-12}" text-anchor="middle" class="vz-n">NPV ${cr(b0)}</text>`;
 if(Math.abs(x(0)-x(b0))>60)g+=`<text x="${x(0)}" y="${H-12}" text-anchor="middle" class="vz-ax">break-even</text>`;
 T.forEach((r,i)=>{const y=pt+i*rh;g+=`<text x="${pl-8}" y="${y+13}" text-anchor="end" class="vz-t vz-tl">${r.n}</text><text x="${pl-8}" y="${y+25}" text-anchor="end" class="vz-ax">${r.dd}</text>`;
  g+=`<rect x="${x(Math.min(r.a,b0))}" y="${y+4}" width="${Math.abs(x(r.a)-x(b0))}" height="18" class="vz-hi"/><rect x="${x(Math.min(r.b,b0))}" y="${y+4}" width="${Math.abs(x(r.b)-x(b0))}" height="18" class="vz-lo"/>`;
  g+=`<text x="${x(Math.max(r.a,r.b))+6}" y="${y+17}" class="vz-n">±${cr(r.sw/2).replace('₹','₹')}</text>`});
 g+=`<rect x="${pl}" y="${H-18}" width="10" height="10" class="vz-hi"/><text x="${pl+14}" y="${H-9}" class="vz-t">worse case</text><rect x="${pl+110}" y="${H-18}" width="10" height="10" class="vz-lo"/><text x="${pl+124}" y="${H-9}" class="vz-t">better case</text>`;
 sv.setAttribute('viewBox',`0 0 ${W} ${H}`);sv.innerHTML=g;const cross=T.filter(r=>(r.a<0)!==(b0<0)||(r.b<0)!==(b0<0));
 const nm=r=>r.n.replace(/ ±.*| \d.*/,''),lc=t=>/^[A-Z]{2}/.test(t)?t:t[0].toLowerCase()+t.slice(1);const near=Math.abs(b0)<.15*T[T.length-1].sw+1;
 $('vz-ntor-n').textContent=near?`The base case is close to break-even (NPV ${cr(b0)}), so almost any input here can tip it either way. ${nm(T[0])} matters most (±${cr(T[0].sw/2)}), then ${lc(nm(T[1]||T[0]))} (±${cr((T[1]||T[0]).sw/2)}).`:`${T[0].n.replace(/ ±.*| \d.*/,'')} moves the NPV by ±${cr(T[0].sw/2)}, ${T[1]?'more than '+lc(nm(T[1]))+' (±'+cr(T[1].sw/2)+')':''}. `+(cross.length?`${cross.map(r=>lc(nm(r))).join(', ')} can flip the project between creating and destroying value.`:`No single input on its own flips the sign of the NPV.`)};
document.addEventListener('dt:run',()=>setTimeout(()=>{VZ.river();VZ.ntor()},0));
['input','click','change'].forEach(ev=>document.addEventListener(ev,e=>{if(e.target.closest&&e.target.closest('#ctwinv')&&!e.target.closest('#vz-dt'))setTimeout(()=>{VZ.river();VZ.ntor()},0)}));

/* ============ 6. CAPEX MEKKO (c8) ============ */
const MK={it:0};
VZ.mekko=function(){const sv=$('vz-mekko');if(!sv||typeof cxCats==='undefined')return;const MW=[20,50,100],N=['A · 20 MW colocation','B · 50 MW hyperscale','C · 100 MW AI'];
 const cats=cxCats.map(([n,v,c])=>({n,v,c}));if(MK.it)cats.push({n:'IT / GPUs + fabric',v:[0,0,266],c:'--heat'});
 const per=MW.map((_,j)=>cats.reduce((a,c)=>a+c.v[j],0)),W=680,pl=48,pr=150,pt=24,pb=46,H=MK.it?420:340,gp=10;const ymax=Math.max(...per)*1.06;
 const tw=W-pl-pr-gp*2,tm=MW.reduce((a,b)=>a+b,0),y=v=>pt+(ymax-v)/ymax*(H-pt-pb);let g='',x0=pl;
 const tk=ymax>200?100:20;for(let v=0;v<=ymax;v+=tk)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" class="vz-grid"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end" class="vz-t">${v}</text>`;
 MW.forEach((mw,j)=>{const w=tw*mw/tm;let acc=0;cats.forEach(c=>{const v=c.v[j];if(!v)return;const y1=y(acc+v),y0=y(acc);g+=`<rect x="${x0}" y="${y1}" width="${w}" height="${y0-y1}" style="fill:var(${c.c})" class="vz-mk"><title>${N[j]} · ${c.n}: ₹${fm(v,1)} cr/MW × ${mw} MW = ₹${fm(v*mw)} cr</title></rect>`;{const full=c.n+' '+fm(v*mw),num=fm(v*mw),t=full.length*6.6<w-10?full:num.length*6.6<w-10?num:'';if(y0-y1>13&&t)g+=`<text x="${x0+5}" y="${(y0+y1)/2+4}" class="vz-in">${t}</text>`};acc+=v});
  g+=`<text x="${x0+w/2}" y="${H-pb+16}" text-anchor="middle" class="vz-h">${N[j].split(' · ')[0]}</text><text x="${x0+w/2}" y="${H-pb+30}" text-anchor="middle" class="vz-t">${N[j].split(' · ')[1]}</text><text x="${x0+w/2}" y="${y(per[j])-6}" text-anchor="middle" class="vz-n">₹${fm(per[j]*mw)} cr</text>`;x0+=w+gp});
 const ly=pt;cats.slice().reverse().forEach((c,i)=>{g+=`<rect x="${W-pr+14}" y="${ly+i*18}" width="10" height="10" style="fill:var(${c.c})"/><text x="${W-pr+28}" y="${ly+i*18+9}" class="vz-t">${c.n}</text>`});
 g+=`<text x="${pl}" y="12" class="vz-t">₹ crore per MW (height) × MW (width) = total capex (area)</text>`;
 sv.setAttribute('viewBox',`0 0 ${W} ${H}`);sv.innerHTML=g;
 const tot=MW.map((m,j)=>per[j]*m);$('vz-mekko-n').textContent=MK.it?`With GPUs included, campus C costs ₹${fm(tot[2])} crore: ${Math.round(266/per[2]*100)}% of it is IT that is replaced every four to six years, against ${fm(tot[0])} crore for the whole of campus A.`:`Facility only: C needs ${fm(per[2],1)} crore per MW against ${fm(per[0],1)} for A, mostly because electrical (${fm(cxCats[2][1][2])}) and cooling (${fm(cxCats[3][1][2])}) grow with rack density. B is cheapest per MW (${fm(per[1],1)}) thanks to scale.`};
segOn('vz-mekko-t',v=>{MK.it=+v;VZ.mekko()});VZ.MK=MK;

/* ============ 7. CARBON DURATION CURVE (c4) ============ */
const DU={f:20,h:30,mw:50,pue:1.25};
VZ.dur=function(){const sv=$('vz-dur');if(!sv||typeof hrs==='undefined')return;const f=DU.f/100,hd=DU.h/100;
 const I=hrs.slice(),M=I.map((_,i)=>i>=18&&i<=22?1080:980),load=I.map(()=>1);
 /* move flexible energy from the dirtiest hours into the cleanest, up to the headroom */
 let pool=0;const ord=I.map((v,i)=>i).sort((a,b)=>I[b]-I[a]);ord.forEach(i=>{const t=Math.min(f,load[i]);load[i]-=t;pool+=t});
 ord.slice().reverse().forEach(i=>{if(pool<=1e-9)return;const t=Math.min(hd,pool);load[i]+=t;pool-=t});
 const av=(L,A)=>L.reduce((a,l,i)=>a+l*A[i],0)/L.reduce((a,b)=>a+b,0),a0=av(I.map(()=>1),I),a1=av(load,I),m0=av(I.map(()=>1),M),m1=av(load,M);
 const W=640,pl=50,pr=50,pt=20,pb=40,H=280,x=i=>pl+i/24*(W-pl-pr),y=v=>pt+(700-v)/700*(H-pt-pb),yl=v=>pt+(1.75-v)/1.75*(H-pt-pb);let g='';
 for(let v=0;v<=700;v+=100)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" class="vz-grid"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end" class="vz-t">${v}</text>`;
 [0,.5,1,1.5].forEach(v=>g+=`<text x="${W-pr+6}" y="${yl(v)+4}" class="vz-t vz-lt">${v}×</text>`);
 ord.forEach((h,k)=>{g+=`<rect x="${x(k)+1}" y="${y(I[h])}" width="${x(1)-x(0)-2}" height="${y(0)-y(I[h])}" class="vz-du"><title>${String(h).padStart(2,'0')}:00 · ${I[h]} g/kWh · load ${load[h].toFixed(2)}×</title></rect>`;if(k%3===0)g+=`<text x="${x(k+.5)}" y="${H-pb+14}" text-anchor="middle" class="vz-ax">${String(h).padStart(2,'0')}h</text>`});
 g+=`<polyline points="${ord.map((h,k)=>`${x(k)},${yl(1)} ${x(k+1)},${yl(1)}`).join(' ')}" class="vz-flat"/><polyline points="${ord.map((h,k)=>`${x(k)},${yl(load[h])} ${x(k+1)},${yl(load[h])}`).join(' ')}" class="vz-shift"/>`;
 g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(a0)}" y2="${y(a0)}" class="vz-avg"/><text x="${W-pr-4}" y="${y(a0)-5}" text-anchor="end" class="vz-n">flat load ${Math.round(a0)} g</text>`;
 if(f>0)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(a1)}" y2="${y(a1)}" class="vz-avg s"/><text x="${pl+4}" y="${y(a1)+13}" class="vz-n vz-st2">shifted ${Math.round(a1)} g</text>`;
 g+=`<text x="${(pl+W-pr)/2}" y="${H-8}" text-anchor="middle" class="vz-t">Hours of a Karnataka day, sorted from dirtiest to cleanest</text><text x="${pl}" y="12" class="vz-t">gCO₂/kWh (bars)</text><text x="${W-pr}" y="12" text-anchor="end" class="vz-t">data-centre load (lines)</text>`;
 sv.innerHTML=g;const E=DU.mw*DU.pue*8760;/* MWh/yr */
 $('vz-dur-r').innerHTML=`<div><span class="v">${Math.round(a0)} → ${Math.round(a1)}</span><span class="k">average g/kWh of the electricity used</span></div><div><span class="v good">${fm(E*(a0-a1)/1e6*1000,0)} t</span><span class="k">CO₂ a year saved on average-intensity accounting (${DU.mw} MW IT, PUE ${DU.pue})</span></div><div><span class="v ${m0-m1>0?'':'hot'}">${fm(E*(m0-m1)/1e6*1000,0)} t</span><span class="k">saved against the marginal plant, which is coal almost every hour</span></div>`;
 $('vz-dur-f-o').textContent=DU.f+'% of daily energy';$('vz-dur-h-o').textContent='+'+DU.h+'%'};
['f','h'].forEach(k=>{const el=$('vz-dur-'+k);if(el)el.addEventListener('input',e=>{DU[k]=+e.target.value;VZ.dur()})});VZ.DU=DU;

/* ============ 8. CUTAWAY LINKED TO THE DATA CENTRE MODEL ============ */
if(window.V2&&V2.cut){const old=V2.cut;V2.cut=function(){old();const box=$('v2-cut-i'),X=window.__DT;if(!box||!X||!X.R||!X.R.ok)return;const R=X.R,S=X.S,id=V2.cs||'hall';
 const city=(DTE.CITY[S.city]||{}).n||'';const M={
  sub:[`Grid connection about ${fm(R.kva/1000,0)} MVA`,`Peak facility load ${fm(R.dh.fac/1000,1)} MW on the design day`],
  tx:[`Transformer losses ${fm(R.E.tr/1000,0)} MWh a year`,`${S.dist==='dc'?'800 V DC':'415 V AC'} distribution`],
  ups:[`${R.gens} diesel generators · ${fm(R.batt,1)} MWh of batteries`,`UPS and distribution losses ${fm((R.E.ups+R.E.pdu)/1000,0)} MWh a year`],
  hall:[`${fm(R.racks)} racks${R.gpus?' · '+fm(R.gpus)+' GPUs':''}`,`IT capex ${cr(R.itCap)} · building and power ${cr(R.baseCap)}`],
  cdu:[`Room-side cooling ${cr(R.coolRoom)}`,`Pumps and fans ${fm((R.E.pump+R.E.fan)/1000,0)} MWh a year`],
  rej:[`Heat rejection ${cr(R.coolRej)} · yard ~${fm(R.yard,0)} m²`,`Site water ${fm(R.siteKL/1000,1)} ML a year (WUE ${R.wue.toFixed(2)})`]}[id];
 if(!M)return;box.insertAdjacentHTML('beforeend',`<div class="vz-cutdt"><span class="fieldlbl">In your design in Chapter 14 · ${fm(S.mw)} MW, ${city}, PUE ${R.pue.toFixed(2)}</span><ul class="clean xs">${M.map(m=>`<li>${m}</li>`).join('')}</ul><a href="#ctwin" class="xs">Change the design →</a></div>`)};
 document.addEventListener('dt:run',()=>setTimeout(()=>V2.cut(),0))}

/* initial draws */
const init=()=>{try{VZ.psy()}catch(e){console.error(e)}try{VZ.fp()}catch(e){console.error(e)}try{VZ.ltor()}catch(e){console.error(e)}try{VZ.imap()}catch(e){console.error(e)}try{VZ.river();VZ.ntor()}catch(e){console.error(e)}try{VZ.mekko()}catch(e){console.error(e)}try{VZ.dur()}catch(e){console.error(e)}try{window.V2&&V2.cut&&V2.cut()}catch(e){console.error(e)}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,50));else setTimeout(init,50);
})();
