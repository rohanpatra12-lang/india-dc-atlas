
/* ---------- 11 FORECAST ---------- */
{
const YRS=[2026,2027,2028,2029,2030,2031,2032,2033,2034,2035];
const HIST=[[2019,375],[2020,450],[2021,560],[2022,720],[2023,977],[2024,1200],[2025,1611],[2026.5,1789]];
const C0=1611;
const P={
 main:[['K','S-curve ceiling K',12000,45000,500,25000,v=>fmt(v/1000,1)+' GW'],['cP','Planned pipeline actually built',0.3,0.9,0.01,0.60,v=>Math.round(v*100)+'%'],['u35','Utilisation in 2035',0.5,0.75,0.01,0.65,v=>Math.round(v*100)+'%'],['ef35','Grid CO₂ factor in 2035',0.40,0.70,0.005,0.535,v=>v.toFixed(3)+' t/MWh']],
 more:[['r','S-curve growth rate r',0.20,0.34,0.01,0.26,v=>v.toFixed(2)],['g','Growth rate g (CAGR model)',0.12,0.36,0.01,0.25,v=>Math.round(v*100)+'%'],['cUC','Under-construction delivered',0.8,1,0.01,0.95,v=>Math.round(v*100)+'%'],['X','Extra GW campuses outside 7 markets by 2030',0,1500,50,0,v=>fmt(v)+' MW'],['dlv','Delivery factor after 2030',0.7,1,0.01,0.90,v=>v.toFixed(2)],['u26','Utilisation in 2026',0.45,0.65,0.01,0.55,v=>Math.round(v*100)+'%'],['pue35','PUE in 2035',1.20,1.50,0.01,1.35,v=>v.toFixed(2)],['cl35','Clean power share in 2035',0.2,0.95,0.01,0.60,v=>Math.round(v*100)+'%'],['q','Conventional halls: dry/liquid adoption q',0.15,0.6,0.01,0.40,v=>v.toFixed(2)],['m','Conventional halls: dry/liquid ceiling m',0.6,0.95,0.01,0.85,v=>Math.round(v*100)+'%'],['wev','WUE evaporative',1.5,2.5,0.05,1.8,v=>v.toFixed(2)+' L/kWh'],['b','Learning exponent b',0,0.2,0.01,0.10,v=>v.toFixed(2)+' (LR '+Math.round((1-Math.pow(2,-v))*100)+'%)'],['pi','Equipment inflation π',0,0.08,0.005,0.04,v=>(v*100).toFixed(1)+'%/yr'],['a','AI facility premium a',0.2,1,0.05,0.5,v=>'+'+Math.round(v*100)+'%'],['d','GPU price decline d',0.05,0.4,0.01,0.20,v=>Math.round(v*100)+'%/yr'],['p0','H100-class price 2026',100,400,5,220,v=>'₹'+v],['gg','India demand growth',0.04,0.08,0.0025,0.0641,v=>(v*100).toFixed(2)+'%/yr'],['k','City allocation exponent k',2,14,1,8,v=>v],['al','Incumbency weight α',0.2,0.8,0.05,0.5,v=>v.toFixed(2)]]};
P.water=[['ai30','AI share of IT capacity, 2030',0.15,0.70,0.01,0.40,v=>Math.round(v*100)+'%'],['ai35','AI share of IT capacity, 2035',0.20,0.85,0.01,0.60,v=>Math.round(v*100)+'%'],['rk26','Average AI rack density, 2026',20,130,5,40,v=>v+' kW'],['rk35','Average AI rack density, 2035',60,400,10,200,v=>v+' kW'],['dry26','Liquid heat rejected dry, 2026',0,1,0.05,0.30,v=>Math.round(v*100)+'%'],['dry35','Liquid heat rejected dry, 2035',0,1,0.05,0.70,v=>Math.round(v*100)+'%']];
const SRCW={sw:[0.05,'Solar + wind'],rtc:[0.07,'Round-the-clock solar + wind + storage'],hyd:[10,'Reservoir hydro'],nuc:[2.6,'Nuclear (inland tower)'],mix:[1.93,'Mix: 70% solar/wind, 15% hydro, 15% nuclear'],grid:[null,'No clean power: grid only']};let fsrc='sw';
const flq=k=>k<=20?0:k<=130?0.9*(k-20)/110:Math.min(1,0.9+0.1*(k-130)/120);
const ALL=[...P.main,...P.more,...P.water];const DEF={};ALL.forEach(p=>DEF[p[0]]=p[5]);
const PRE={base:{},low:{K:12000,r:0.24,cP:0.40,cUC:0.85,u35:0.58,u26:0.50,pue35:1.42,ef35:0.65,cl35:0.40,g:0.18,q:0.25,b:0.15,pi:0.02,a:0.3,d:0.10,dlv:0.85},high:{K:45000,r:0.30,cP:0.80,cUC:1,X:1000,u35:0.72,u26:0.60,pue35:1.30,ef35:0.45,cl35:0.85,g:0.32,q:0.55,b:0.05,pi:0.07,a:0.8,d:0.30,dlv:1}};
let S_=Object.assign({},DEF),mod='int',met='mw',scSrc='rep',mc=null,det=null;
function sliders(id,list){$('#'+id).innerHTML=list.map(([k,l,mn,mx,st,v,f])=>`<div class="ctrl"><label for="fc_${k}">${l}</label><output id="fc_${k}-o">${f(S_[k])}</output><input id="fc_${k}" type="range" min="${mn}" max="${mx}" step="${st}" value="${S_[k]}" data-k="${k}"></div>`).join('')}
function syncSl(){ALL.forEach(([k,,,,,,f])=>{const el=document.getElementById('fc_'+k);if(el){el.value=S_[k];out('fc_'+k,f(S_[k]))}})}
/* ---- model ---- */
const lerp=(a,b,t)=>a+(b-a)*t;
const pw3=(y,v26,v30,v35)=>y<=2030?lerp(v26,v30,(y-2026)/4):lerp(v30,v35,(y-2030)/5);
const fUC={2026:.4,2027:.9},fP={2026:0,2027:.12,2028:.37,2029:.65,2030:1};
function capPaths(s){
  const t0=2025+Math.log(s.K/C0-1)/s.r;const L=y=>s.K/(1+Math.exp(-s.r*(y-t0)));
  const G=y=>C0*Math.pow(1+s.g,y-2025);
  const Pp=y=>y>2030?null:1789+509*s.cUC*(fUC[y]===undefined?1:fUC[y])+(3351*s.cP+s.X)*(fP[y]||0);
  const I=y=>y<=2030?(Pp(y)+L(y))/2:L(y)*s.dlv;
  return {L,G,Pp,I,t0}}
const SCREP={Mumbai:85,Chennai:80,Hyderabad:78,NCR:72,Vizag:70,Pune:68,Bengaluru:65,Kolkata:50};
const CITY=[['Mumbai',890,.475,19.03,73.03,4100],['Hyderabad',151,.195,17.30,78.30,2478],['Chennai',214,.101,13.05,80.20,1245],['NCR',183,.107,28.50,77.35,4555],['Pune',133,.071,18.52,73.86,1222],['Bengaluru',162,.028,12.97,77.65,1935],['Kolkata',22,.023,22.57,88.36,1850],['Vizag',0,0,17.69,83.22,384],['Other',0,0,22.47,70.06,null]];
function ch10Scores(){const r=window.__whRes;if(!r)return SCREP;const v=id=>{const x=r.sc.find(z=>z.c.id===id);return x?x.v*10:0};const mx=ids=>Math.max(...ids.map(v));
  return {Mumbai:mx(['nmb']),Chennai:mx(['che']),Hyderabad:mx(['hyp','hyc']),NCR:mx(['gno','noi','ggn','del']),Vizag:mx(['viz']),Pune:mx(['pun']),Bengaluru:mx(['blr','hsk']),Kolkata:mx(['kol'])}}
function run1(s,cap){
  const cp=capPaths(s),C=y=>Math.max(0,cap?cap(cp,y):cp[mod==='int'?'I':mod==='log'?'L':mod==='cagr'?'G':'I'](y));
  const out={y:[],mw:[],it:[],twh:[],share:[],co2:[],loc:[],wat:[],ind:[],wtot:[],wue:[],wai:[],wcv:[],Ash:[],eA:[],rk:[],fl:[],dr:[],wkwh:[],wg:[],cl:[],air:[],ai:[],blend:[],capex:[],gpu:[],u:[],pue:[],L:[]};
  let prev=C0,cum=0;
  YRS.forEach((y,i)=>{let mw=mod==='pipe'&&!cap&&y>2030?null:C(y);if(mod==='pipe'&&!cap&&y<=2030)mw=cp.Pp(y);
    if(mw===null){['mw','it','twh','share','co2','loc','wat','ind','wtot','air','ai','blend','capex','gpu'].forEach(k=>out[k].push(null));out.y.push(y);return}
    const u=lerp(s.u26,s.u35,(y-2026)/9),pue=lerp(1.50,s.pue35,(y-2026)/9);
    const it=mw*u*8.76/1000,fac=it*pue,bu=1694*Math.pow(1+s.gg,y-2024);
    const e0=STD.co2,ef=pw3(y,e0,e0+(s.ef35-e0)*0.485,s.ef35),cl=fsrc==='grid'?0:pw3(y,0.30,0.30+(s.cl35-0.30)*0.433,s.cl35);
    const t=y-2025,p_=0.03,F=(1-Math.exp(-(p_+s.q)*t))/(1+(s.q/p_)*Math.exp(-(p_+s.q)*t)),Ls=0.20+(s.m-0.20)*F,e=lerp(0.69,0.50,t/10);
    const wair=e*s.wev+(1-e)*0.5,wconv=Ls*0.1+(1-Ls)*wair;
    const Ash=pw3(y,0.15,s.ai30,s.ai35),rk=lerp(s.rk26,s.rk35,(y-2026)/9),fl=flq(rk),dr=lerp(s.dry26,s.dry35,(y-2026)/9),wliq=dr*0.05+(1-dr)*s.wev,wai=fl*wliq+(1-fl)*wair;
    const eA=Ash*1.2/(Ash*1.2+(1-Ash)),wue=eA*wai+(1-eA)*wconv;
    const wg=STD.gw.India*ef/STD.co2,wsrc=fsrc==='grid'?0:SRCW[fsrc][0],wkwh=cl*wsrc+(1-cl)*wg,ind=fac*wkwh*2.7397;
    const air=58.4*Math.pow(Math.max(mw,C0)/C0,-s.b)*Math.pow(1+s.pi,t),aish=pw3(y,0.4,0.6,0.7),blend=air*(1+s.a*aish);
    cum+=Math.max(0,mw-prev)*blend;prev=mw;
    out.y.push(y);out.mw.push(mw);out.it.push(it);out.twh.push(fac);out.share.push(fac/bu*100);out.co2.push(fac*ef*(1-cl));out.loc.push(fac*ef);out.wat.push(it*wue*2.7397);out.ind.push(ind);out.wtot.push(it*wue*2.7397+ind);out.wue.push(wue);out.wai.push(wai);out.wcv.push(wconv);out.Ash.push(Ash);out.eA.push(eA);out.rk.push(rk);out.fl.push(fl);out.dr.push(dr);out.wkwh.push(wkwh);out.wg.push(wg);out.cl.push(cl);
    out.air.push(air);out.ai.push(air*(1+s.a));out.blend.push(blend);out.capex.push(cum/1e5);out.gpu.push(s.p0*Math.pow(1-s.d,y-2026));out.u.push(u);out.pue.push(pue);out.L.push(Ls)});
  return out}
function cities(o,s){
  const sc=scSrc==='ch10'?ch10Scores():SCREP;const names=CITY.map(c=>c[0]);const res={};names.forEach(n=>res[n]=[]);
  let cur={};CITY.forEach(c=>cur[c[0]]=c[1]);
  YRS.forEach((y,i)=>{const T=o.mw[i];if(T===null){names.forEach(n=>res[n].push(null));return}
    if(y<=2030){const inc=Math.max(0,T-1789);CITY.forEach(c=>{const sh=c[0]==='Vizag'?.086:c[0]==='Other'?.052:c[2]*0.862/0.998;cur[c[0]]=c[1]+inc*sh})}
    else{const tot=Object.values(cur).reduce((a,b)=>a+b,0),inc=Math.max(0,T-tot);const ks=Object.keys(sc),den=ks.reduce((a,n)=>a+Math.pow(sc[n],s.k),0);
      const add={};names.forEach(n=>{const inc_sh=cur[n]/tot,sm=n==='Other'?0:Math.pow(sc[n]||0,s.k)/den;add[n]=inc*(s.al*inc_sh+(1-s.al)*sm)});names.forEach(n=>cur[n]+=add[n])}
    names.forEach(n=>res[n].push(cur[n]))});
  return res}
/* ---- Monte Carlo ---- */
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function monte(){
  const R=rng(424242),N=1000,keys=['mw','twh','share','co2','wat','ind','wtot','capex','air','ai','gpu'],acc={};keys.forEach(k=>acc[k]=YRS.map(()=>[]));
  const nrm=()=>{let u=0,v=0;while(!u)u=R();while(!v)v=R();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
  const tri=(lo,mo,hi)=>{const u=R(),c=(mo-lo)/(hi-lo);return u<c?lo+Math.sqrt(u*(hi-lo)*(mo-lo)):hi-Math.sqrt((1-u)*(hi-lo)*(hi-mo))};
  const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
  for(let n=0;n<N;n++){const z1=nrm(),z2=nrm();const s=Object.assign({},S_);
    s.K=Math.max(C0*2.2,S_.K*Math.exp(0.36*z1));s.r=cl(S_.r+(R()-.5)*0.10,0.15,0.4);s.cP=cl(tri(S_.cP-0.2,S_.cP,S_.cP+0.2),0.2,0.95);s.cUC=tri(Math.max(.75,S_.cUC-.1),S_.cUC,Math.min(1,S_.cUC+.05)||1);
    s.dlv=cl(tri(S_.dlv-0.1,S_.dlv,S_.dlv+0.08),0.6,1);s.g=tri(S_.g-0.08,S_.g,S_.g+0.08);
    s.u35=cl(S_.u35+0.07*cl(0.5*z1+0.866*z2,-2,2)/2,0.45,0.8);s.u26=cl(S_.u26+(R()-.5)*0.06,0.4,0.7);
    s.pue35=tri(S_.pue35-0.06,S_.pue35,S_.pue35+0.06);s.ef35=tri(S_.ef35-0.09,S_.ef35,S_.ef35+0.09);s.cl35=cl(tri(S_.cl35-0.2,S_.cl35,S_.cl35+0.2),0.1,1);
    s.q=cl(S_.q+(R()-.5)*0.3,0.1,0.7);s.m=cl(S_.m+(R()-.5)*0.25,0.5,0.98);s.wev=tri(1.5,S_.wev,2.5);s.ai30=cl(tri(S_.ai30-0.1,S_.ai30,S_.ai30+0.1),0.05,0.9);s.ai35=cl(tri(S_.ai35-0.12,S_.ai35,S_.ai35+0.12),0.05,0.95);s.rk35=tri(Math.max(60,S_.rk35-60),S_.rk35,S_.rk35+80);s.dry35=cl(tri(S_.dry35-0.2,S_.dry35,S_.dry35+0.15),0,1);
    s.b=cl(S_.b+(R()-.5)*0.1,0,0.25);s.pi=tri(Math.max(0,S_.pi-0.02),S_.pi,S_.pi+0.03);s.a=cl(S_.a+(R()-.5)*0.5,0.1,1.2);s.d=tri(Math.max(.02,S_.d-0.1),S_.d,S_.d+0.1);s.p0=tri(S_.p0*0.7,S_.p0,S_.p0*1.8);s.gg=tri(0.045,S_.gg,0.073);
    const o=run1(s);keys.forEach(k=>o[k].forEach((v,i)=>{if(v!==null)acc[k][i].push(v)}))}
  const q=(a,p)=>{if(!a.length)return null;const s=a.slice().sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.floor(p*s.length))]};
  const outp={};keys.forEach(k=>outp[k]={p10:acc[k].map(a=>q(a,.1)),p50:acc[k].map(a=>q(a,.5)),p90:acc[k].map(a=>q(a,.9))});return outp}
/* ---- render ---- */
const yi=()=>YRS.indexOf(val('fc-yr'));window.__FCD=()=>({det,S_,mod,i:yi(),YRS,CITY,cities,capPaths,PUB,scSrc});
const MET={mw:['Capacity','MW of IT load','MW',v=>fmt(v)],twh:['Electricity','Facility energy, TWh a year (right axis: share of India)','TWh',v=>v.toFixed(1)],co2:['Carbon','Net MtCO₂ a year after clean-power purchases; dashed = location-based','MtCO₂',v=>v.toFixed(1)],wat:['Water on site','On-site water, million litres a day (national); dashed = power-plant and total water','MLD',v=>v.toFixed(1)],ind:['Water at power plants','Water evaporated generating the electricity, million litres a day','MLD',v=>v.toFixed(1)],wtot:['Total water','On-site + power-plant water, million litres a day','MLD',v=>v.toFixed(1)],cost:['Build cost','₹ crore per MW, excluding land and IT','₹ cr/MW',v=>v.toFixed(1)],capex:['Investment','Cumulative facility capex from 2026, ₹ lakh crore','₹ lakh cr',v=>v.toFixed(2)],gpu:['GPU-hour','H100-class on-demand price in India, ₹ per GPU-hour','₹/hr',v=>fmt(v)]};
const PUB=[['CareEdge',4.0],['Colliers',4.5],['Arizton',4.8],['C&W pipeline, if all built',5.6],['JLL (2029)',6.0],['Rubix',6.5],['Macquarie (implied)',7.0],['Jefferies',8.0],['PIB factsheet',8.0],['Wood Mackenzie',12.0]];
function render(){
  det=run1(S_);const i=yi(),y=YRS[i];out('fc-yr',y);
  const cityR=cities(det,S_);
  const band=k=>mc&&mc[k]?` <span class="rng">P10–P90 ${MET[k]?MET[k][3](mc[k].p10[i]):mc[k].p10[i].toFixed(1)} – ${MET[k]?MET[k][3](mc[k].p90[i]):mc[k].p90[i].toFixed(1)}</span>`:'';
  const v=(k,f)=>det[k][i]===null?'—':f(det[k][i]);
  const mwv=det.mw[i];
  $('#fc-kpi').innerHTML=mwv===null?'<div class="kpi mut"><span class="k">Pipeline model</span><span class="v">to 2030 only</span><span class="s">The pipeline model has no data after 2030. Choose Integrated or S-curve.</span></div>':[
    ['','Capacity '+y,fmt(mwv/1000,2)+' GW',band('mw'),`IT load · ${(mwv/1789).toFixed(1)}× today's 1,789 MW`],
    ['hot','Electricity',v('twh',x=>x.toFixed(1))+' TWh',band('twh'),`${det.share[i].toFixed(2)}% of India's demand · PUE ${det.pue[i].toFixed(2)} · utilisation ${Math.round(det.u[i]*100)}%`],
    ['heat','Carbon',v('co2',x=>x.toFixed(1))+' Mt',band('co2'),`net of clean power; ${det.loc[i].toFixed(1)} Mt location-based`],
    ['cold','Water on site',v('wat',x=>x.toFixed(1))+' MLD',band('wat'),`fleet WUE ${det.wue[i].toFixed(2)} L/kWh · AI ${Math.round(det.Ash[i]*100)}% of capacity at ${Math.round(det.rk[i])} kW/rack (${Math.round(det.fl[i]*100)}% of heat to liquid)`],
    ['hot','Water at power plants',v('ind',x=>x.toFixed(1))+' MLD',band('ind'),`${det.wkwh[i].toFixed(2)} L per kWh bought · ${Math.round(det.cl[i]*100)}% clean (${SRCW[fsrc][1].toLowerCase()}), grid ${det.wg[i].toFixed(2)} L/kWh`],
    ['','Total water',v('wtot',x=>x.toFixed(1))+' MLD',band('wtot'),`daily needs of ${fmt(det.wtot[i]*1e6/135)} people · ${Math.round(det.ind[i]/det.wtot[i]*100)}% at power plants`],
    ['hot','Investment since 2026','₹'+v('capex',x=>x.toFixed(2))+' lakh cr',band('capex'),`≈ US$${(det.capex[i]*1e5/90/100).toFixed(0)} bn facility capex (no land, no GPUs)`],
    ['mut','Build cost','₹'+v('air',x=>x.toFixed(0))+' / '+v('ai',x=>x.toFixed(0))+' cr/MW','',`air-cooled / AI-liquid · rising, because inflation beats learning`],
    ['good','GPU-hour (H100-class)','₹'+v('gpu',x=>fmt(x)),band('gpu'),`IndiaAI subsidised floor ≈ ₹65–92`]
  ].map(([c,k,val_,b,s])=>`<div class="kpi ${c}"><span class="k">${k}</span><span class="v">${val_}</span>${b}<span class="s">${s}</span>${window.__evTag?window.__evTag('m','Report 11 model with your slider settings'):''}</div>`).join('');
  if(mwv!==null){const j=i,wop=document.querySelector('#fc-wtr details');const op=wop&&wop.open?' open':'';$('#fc-wtr').innerHTML=`<details class="cx-dt"${op}><summary>Show the ${y} water calculation</summary><ol class="cx-ol"><li><b>IT energy</b> = ${fmt(det.mw[j])} MW × ${Math.round(det.u[j]*100)}% × 8.76 ÷ 1,000 = <b>${det.it[j].toFixed(2)} TWh</b>; facility = × PUE ${det.pue[j].toFixed(2)} = ${det.twh[j].toFixed(2)} TWh</li><li><b>AI halls</b>: ${Math.round(det.Ash[j]*100)}% of capacity; running harder (load × 1.2) they use ${Math.round(det.eA[j]*100)}% of IT energy</li><li><b>Rack density</b> ${Math.round(det.rk[j])} kW → ${Math.round(det.fl[j]*100)}% of AI heat goes to liquid (0% at 20 kW, 90% at 130 kW, 100% at 250 kW); ${Math.round(det.dr[j]*100)}% of that liquid heat is rejected by dry coolers (0.05 L/kWh), the rest by towers (${S_.wev} L/kWh, register wue.tower)</li><li><b>AI WUE</b> = ${det.fl[j].toFixed(2)} × ${(det.dr[j]*0.05+(1-det.dr[j])*S_.wev).toFixed(2)} + ${(1-det.fl[j]).toFixed(2)} × ${((det.wai[j]-det.fl[j]*(det.dr[j]*0.05+(1-det.dr[j])*S_.wev))/Math.max(1e-6,1-det.fl[j])).toFixed(2)} (air plant) = <b>${det.wai[j].toFixed(2)} L/kWh</b>; conventional WUE (${Math.round(det.L[j]*100)}% dry/liquid) = <b>${det.wcv[j].toFixed(2)}</b></li><li><b>Fleet WUE</b> = ${det.eA[j].toFixed(2)} × ${det.wai[j].toFixed(2)} + ${(1-det.eA[j]).toFixed(2)} × ${det.wcv[j].toFixed(2)} = <b>${det.wue[j].toFixed(3)} L/kWh</b> → on site ${det.it[j].toFixed(2)} × ${det.wue[j].toFixed(3)} × 2.7397 = <b>${det.wat[j].toFixed(1)} MLD</b></li><li><b>Water per kWh bought</b> = ${Math.round(det.cl[j]*100)}% clean × ${fsrc==='grid'?'0':SRCW[fsrc][0]} + ${Math.round((1-det.cl[j])*100)}% grid × ${det.wg[j].toFixed(2)} (India grid water: 2.9 L/kWh in 2026, falling in step with the grid's CO₂ factor as coal's share drops, i.e. 2.9 × EF ÷ 0.675) = <b>${det.wkwh[j].toFixed(2)} L/kWh</b> → power plants ${det.twh[j].toFixed(2)} × ${det.wkwh[j].toFixed(2)} × 2.7397 = <b>${det.ind[j].toFixed(1)} MLD</b></li><li><b>Total</b> = ${det.wat[j].toFixed(1)} + ${det.ind[j].toFixed(1)} = <b>${det.wtot[j].toFixed(1)} MLD</b></li></ol></details>`}
  /* chart header */
  const M=MET[met];$('#fc-ch-h').firstChild.textContent=M[0];$('#fc-ch-sub').textContent=M[1];
  if(charts['c-fc'])build('c-fc');
  /* cities */
  $('#fc-th-y').textContent=y;
  const tot=CITY.reduce((a,c)=>a+(cityR[c[0]][i]||0),0);
  $('#fc-ct').innerHTML=CITY.map(c=>{const mw=cityR[c[0]][i];if(mw===null)return '';const w=mw*det.u[i]*8.76/1000*(det.wat[i]/Math.max(1e-6,det.it[i]))*1;return `<tr><td><b>${c[0]==='NCR'?'Delhi NCR':c[0]==='Vizag'?'Visakhapatnam':c[0]==='Other'?'Other (Jamnagar etc.)':c[0]}</b></td><td class="n">${fmt(c[1])}</td><td class="n">${fmt(mw)}</td><td class="n">${(mw/tot*100).toFixed(1)}%</td><td class="n">${w.toFixed(1)}</td><td class="n ${c[5]&&w/c[5]>0.008?'up':''}">${c[5]?(w/c[5]*100).toFixed(2)+'%':'—'}</td></tr>`}).join('');
  $('#fc-map-sub').textContent=mwv===null?'':`${y}: ${fmt(tot)} MW across cities. Mumbai's share ${(cityR.Mumbai[i]/tot*100).toFixed(0)}% (50% today).`;
  fcMap(cityR,i);
  /* states */
  const sh=n=>(cityR[n][i]||0)/Math.max(1,tot);const twh=det.twh[i]||0;const bu=(b30,b35)=>y<=2030?b30*Math.pow(1.06,y-2030):b35*Math.pow(1.06,y-2035);
  const ST=[['Maharashtra',sh('Mumbai')+sh('Pune'),bu(250,330)],['Telangana',sh('Hyderabad'),bu(120,160)],['Tamil Nadu',sh('Chennai'),bu(175,230)],['Andhra Pradesh',sh('Vizag'),bu(105,140)],['Karnataka',sh('Bengaluru'),bu(120,160)],['Uttar Pradesh',sh('NCR')*0.7,bu(210,280)]];
  hbars($('#fc-state'),ST.map(([n,s_,b])=>{const p=twh*s_/b*100;return [n,p,p>8?'heat':p>4?'hot':'',p.toFixed(1)+'%']}),{max:Math.max(14,...ST.map(([n,s_,b])=>twh*s_/b*100))});
  $('#fc-st-sub').textContent=`Data centres' share of each state's electricity in ${y}`;
  /* table */
  const g=(k,j,f)=>det[k][j]===null?'—':f(det[k][j]),rg=(k,j,f)=>mc&&mc[k]&&mc[k].p10[j]!==null?`<small>${f(mc[k].p10[j])}–${f(mc[k].p90[j])}</small>`:'';
  $('#fc-tb').innerHTML=YRS.map((yy,j)=>`<tr class="${j===i?'hl':''}"><td>${yy}</td><td class="n">${g('mw',j,x=>fmt(x))}${rg('mw',j,x=>fmt(x))}</td><td class="n">${g('twh',j,x=>x.toFixed(1))}${rg('twh',j,x=>x.toFixed(0))}</td><td class="n">${g('share',j,x=>x.toFixed(2)+'%')}</td><td class="n">${g('co2',j,x=>x.toFixed(1))}${rg('co2',j,x=>x.toFixed(0))}</td><td class="n">${g('wat',j,x=>x.toFixed(1))}${rg('wat',j,x=>x.toFixed(0))}</td><td class="n">${g('ind',j,x=>x.toFixed(0))}${rg('ind',j,x=>x.toFixed(0))}</td><td class="n">${g('wtot',j,x=>x.toFixed(0))}${rg('wtot',j,x=>x.toFixed(0))}</td><td class="n">${g('capex',j,x=>x.toFixed(2))}</td><td class="n">${g('air',j,x=>x.toFixed(0))} · ${g('ai',j,x=>x.toFixed(0))}</td><td class="n">${g('gpu',j,x=>fmt(x))}</td></tr>`).join('');
  build('c-fcpub');
}
const lp=(n,p,r)=>n==='Mumbai'?`x="${p[0].toFixed(1)}" y="${(p[1]+r+10).toFixed(1)}" text-anchor="middle"`:n==='Pune'?`x="${(p[0]+r+3).toFixed(1)}" y="${(p[1]-r-2).toFixed(1)}"`:n==='Bengaluru'?`x="${(p[0]-r-3).toFixed(1)}" y="${(p[1]+3).toFixed(1)}" text-anchor="end"`:`x="${(p[0]+r+3).toFixed(1)}" y="${(p[1]+3).toFixed(1)}"`;
function fcMap(cityR,i){
  const box=$('#fc-map');if(!window.__GEO||!window.__proj)return;
  if(!box.dataset.b){const GEO=window.__GEO;box.innerHTML=`<svg viewBox="0 0 548 628" role="img" aria-label="Map of India with forecast city capacity"><g class="fst">${Object.values(GEO.p).map(d=>`<path d="${d}"></path>`).join('')}</g><g class="fbub"></g></svg>`;box.dataset.b='1'}
  const mx=18800*0.42;let h='';
  CITY.slice().sort((a,b)=>(cityR[b[0]][i]||0)-(cityR[a[0]][i]||0)).forEach(c=>{const p=window.__proj(c[4],c[3]),mw=cityR[c[0]][i]||0,r=Math.max(2,Math.sqrt(mw/mx)*58),r0=Math.sqrt(c[1]/mx)*58;
    h+=`<circle class="fb" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r.toFixed(1)}"><title>${c[0]}: ${fmt(mw)} MW (H1 2026: ${fmt(c[1])} MW)</title></circle>${c[1]?`<circle class="fb0" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r0.toFixed(1)}"></circle>`:''}<text class="fbl" ${lp(c[0],p,r)}>${c[0]==='Other'?'Jamnagar/other':c[0]} ${mw>=1000?(mw/1000).toFixed(1)+' GW':fmt(mw)+' MW'}</text>`});
  box.querySelector('.fbub').innerHTML=h}
reg('c-fc',()=>{
  if(!det)return {type:'line',data:{datasets:[]}};const M=MET[met];const key=met==='cost'?'air':met;const xs=YRS;
  const pt=a=>xs.map((x,i)=>({x,y:a[i]})).filter(p=>p.y!==null&&p.y!==undefined);
  const ds=[];const band=mc&&mc[key];
  if(band){ds.push({label:'P90',data:pt(band.p90),borderColor:'transparent',backgroundColor:A(T('--cold'),.16),fill:'+1',pointRadius:0,tension:.3});ds.push({label:'P10',data:pt(band.p10),borderColor:'transparent',backgroundColor:'transparent',fill:false,pointRadius:0,tension:.3});}
  ds.push({label:met==='cost'?'Air-cooled (your settings)':'Your settings',data:pt(det[key]),borderColor:T('--cold'),backgroundColor:T('--cold'),borderWidth:2.8,pointRadius:xs.map(x=>x===val('fc-yr')?5:0),tension:.3,fill:false});
  if(met==='cost'){ds.push({label:'AI / liquid-cooled',data:pt(det.ai),borderColor:T('--hot'),borderWidth:2.2,pointRadius:0,tension:.3,fill:false});ds.push({label:'Blended new build',data:pt(det.blend),borderColor:T('--warn'),borderDash:[5,4],borderWidth:1.6,pointRadius:0,tension:.3,fill:false})}
  if(met==='wat'){ds.push({label:'At power plants',data:pt(det.ind),borderColor:T('--hot'),borderDash:[5,4],borderWidth:1.8,pointRadius:0,tension:.3,fill:false});ds.push({label:'Total',data:pt(det.wtot),borderColor:T('--ink'),borderDash:[2,3],borderWidth:1.8,pointRadius:0,tension:.3,fill:false})}
  if(met==='co2')ds.push({label:'Location-based (no clean power)',data:pt(det.loc),borderColor:T('--heat'),borderDash:[6,4],borderWidth:1.8,pointRadius:0,tension:.3,fill:false});
  if(met==='twh')ds.push({label:'Share of India (%)',data:pt(det.share),borderColor:T('--hot'),borderDash:[5,4],borderWidth:1.8,pointRadius:0,yAxisID:'y1',tension:.3,fill:false});
  if(met==='mw'){
    ds.push({label:'Reported history',data:HIST.map(([x,y])=>({x,y})),type:'scatter',backgroundColor:T('--ink'),pointRadius:4,showLine:false});
    ds.push({label:'Published 2030 forecasts',data:PUB.filter(p=>!p[0].includes('2029')).map(p=>({x:2030.15,y:p[1]*1000,l:p[0]})),type:'scatter',backgroundColor:A(T('--hot'),.7),pointStyle:'triangle',pointRadius:5,showLine:false});
    if($('#fc-all').checked){const cp=capPaths(S_);[['Growth rate',cp.G,'--warn'],['S-curve',cp.L,'--good'],['Pipeline',y=>cp.Pp(y),'--heat']].forEach(([n,f,c])=>ds.push({label:n,data:xs.map(x=>({x,y:f(x)})).filter(p=>p.y!==null),borderColor:T(c),borderDash:[4,4],borderWidth:1.5,pointRadius:0,tension:.3,fill:false}))}
  }
  return {type:'line',data:{datasets:ds},options:base({plugins:{legend:Object.assign({},legendB,{labels:Object.assign({},legendB.labels,{filter:i=>!['P90','P10'].includes(i.text)})}),tooltip:Object.assign(tip(),{callbacks:{title:c=>String(Math.round(c[0].parsed.x)),label:c=>`${c.raw.l||c.dataset.label}: ${c.dataset.yAxisID==='y1'?c.parsed.y.toFixed(2)+'%':M[3](c.parsed.y)+' '+M[2]}`}})},
    scales:{x:{type:'linear',min:met==='mw'?2019:2026,max:2035.5,afterBuildTicks:ax=>{const a=[];for(let v=Math.ceil(ax.min);v<=2035;v++)a.push({value:v});ax.ticks=a},ticks:{autoSkip:false,maxRotation:0,callback:v=>Number.isInteger(v)?(v%2&&met==='mw'?'':v):''},grid:{display:false}},y:{beginAtZero:true,title:{display:true,text:M[2]},grid:grid()},...(met==='twh'?{y1:{position:'right',beginAtZero:true,grid:{display:false},title:{display:true,text:'% of India'}}}:{})}})}});
reg('c-fcpub',()=>{const hc=val('fc-hc');const mine=det&&det.mw[4]?det.mw[4]/1000:4.7;const rows=PUB.concat([['This atlas (your settings)',+mine.toFixed(2)]]).sort((a,b)=>a[1]-b[1]);const med=6.5*hc;
  return {type:'bar',data:{labels:rows.map(r=>r[0]),datasets:[{data:rows.map(r=>r[1]),backgroundColor:rows.map(r=>r[0].startsWith('This')?T('--cold'):r[1]>med?A(T('--hot'),.75):A(T('--muted'),.6)),borderRadius:3}]},
    options:base({indexAxis:'y',plugins:{legend:{display:false},tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.raw} GW`}})},scales:{x:{beginAtZero:true,title:{display:true,text:`GW in 2030 · haircut line ${med.toFixed(1)} GW`},grid:grid()},y:{grid:{display:false},ticks:{font:{size:11}}}}}),plugins:[{id:'hcl',afterDatasetsDraw(ch){const x=ch.scales.x.getPixelForValue(med),{top,bottom}=ch.chartArea,c=ch.ctx;c.save();c.strokeStyle=T('--good');c.setLineDash([5,4]);c.lineWidth=2;c.beginPath();c.moveTo(x,top);c.lineTo(x,bottom);c.stroke();c.restore()}}]}});
hbars($('#fc-drv'),[['UPI volumes (+20%/yr)',2.5,'mut','2.5 GW'],['Mobile data traffic',3.7,'mut','3.7 GW'],['Public cloud spend',4.4,'mut','3.9–4.9 GW'],['Driver mean',3.7,'','≈3.7 GW'],['Supply-side base (this atlas)',4.7,'hot','4.7 GW'],['Median published forecast',6.5,'heat','6.5 GW']],{max:6.5});
/* wire up */
sliders('fc-main',P.main);sliders('fc-more',P.more);sliders('fc-wat',P.water);
let tm=null;const later=()=>{clearTimeout(tm);tm=setTimeout(()=>{mc=monte();render()},160)};
['fc-main','fc-more','fc-wat'].forEach(id=>$('#'+id).addEventListener('input',e=>{const k=e.target.dataset.k;if(!k)return;S_[k]=+e.target.value;const p=ALL.find(x=>x[0]===k);out('fc_'+k,p[6](S_[k]));$$('#fc-pre button').forEach(b=>b.setAttribute('aria-pressed','false'));render();later()}));
seg('fc-pre',d=>{S_=Object.assign({},DEF,PRE[d.p]);syncSl();mc=monte();render()});
seg('fc-mod',d=>{mod=d.v;mc=monte();render()});seg('fc-src',d=>{fsrc=d.v;mc=monte();render()});seg('fc-met',d=>{met=d.v;build('c-fc')});seg('fc-sc',d=>{scSrc=d.v;render()});
$('#fc-yr').addEventListener('input',render);$('#fc-all').addEventListener('change',()=>build('c-fc'));$('#fc-hc').addEventListener('input',()=>{out('fc-hc',val('fc-hc').toFixed(2)+'×');build('c-fcpub')});
window.__fcOnScores=()=>{if(scSrc==='ch10')render()};
out('fc-hc','0.72×');mc=monte();render();
}
