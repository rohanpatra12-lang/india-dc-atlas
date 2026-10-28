
/* ---------- SIMULATOR UI ---------- */
let g={city:'blr',wl:'colo',mw:20,u:65,gu:70,cc:4,cool:'tower',pw:'grid',ws:'muni',inc:true,gpu:true};
const PRE=[{city:'blr',wl:'colo',mw:20,u:65,cool:'tower',pw:'grid',ws:'ground'},{city:'blr',wl:'colo',mw:20,u:65,cool:'adiab',pw:'oa',ws:'ttw'},{city:'viz',wl:'ai',mw:100,u:78,cool:'dlc',pw:'rtc',ws:'muni'},{city:'che',wl:'hyp',mw:50,u:75,cool:'tower',pw:'oa',ws:'muni'},{city:'mum',wl:'colo',mw:20,u:65,cool:'tower',pw:'grid',ws:'muni'}];
$('#s-city').innerHTML=Object.entries(CITY).map(([k,c])=>`<button type="button" data-v="${k}"><b>${c.n}</b><small>${c.st}</small></button>`).join('');
const setSeg=(id,v)=>$$('#'+id+' button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===v?'true':'false'));
function syncUI(){setSeg('s-city',g.city);setSeg('s-wl',g.wl);setSeg('s-cool',g.cool);setSeg('s-pw',g.pw);setSeg('s-ws',g.ws);setv('s-mw',g.mw);setv('s-u',g.u);$('#s-inc').checked=g.inc;$('#s-gpu').checked=g.gpu;$('#s-gpu-w').style.display=g.wl==='ai'?'':'none'}
['s-city','s-wl','s-cool','s-pw','s-ws'].forEach(id=>{const key={'s-city':'city','s-wl':'wl','s-cool':'cool','s-pw':'pw','s-ws':'ws'}[id];document.getElementById(id).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g[key]=b.dataset.v;if(key==='wl'){g.u=WL[g.wl].u;if(g.wl==='ai'&&g.cool!=='dlc'&&g.cool!=='tower')g.cool='dlc'}$$('#s-pre button').forEach(x=>x.setAttribute('aria-pressed','false'));syncUI();sim()})});
$('#s-mw').addEventListener('input',()=>{g.mw=val('s-mw');sim()});$('#s-u').addEventListener('input',()=>{g.u=val('s-u');sim()});$('#s-gu').addEventListener('input',()=>{g.gu=val('s-gu');sim()});$('#s-cc').addEventListener('input',()=>{g.cc=val('s-cc');sim()});
$('#s-inc').addEventListener('change',()=>{g.inc=$('#s-inc').checked;sim()});$('#s-gpu').addEventListener('change',()=>{g.gpu=$('#s-gpu').checked;sim()});
seg('s-pre',d=>{g=Object.assign({inc:true,gpu:true,gu:70,cc:4},PRE[+d.p]);syncUI();sim()});
window.__SIMX={get g(){return g},set g(v){g=v},sim:()=>sim(),syncUI:()=>syncUI(),CITY,WL,K0,COOLN,PWN,coolOH,wueOf,CLIM,DM,model};

const R=(a,b,f)=>`<span class="rng">range ${f(a)} – ${f(b)}</span>`;
const cr=v=>'₹'+fmt(v,v<100?1:0)+' cr';
function kpi(cls,k,v,s,rg,ev){return `<div class="kpi ${cls}"><span class="k">${k}</span><span class="v">${v}</span>${rg||''}<span class="s">${s}</span>${ev?evTag(ev[0],ev[1]):''}</div>`}
let lastM=null;
function sim(){
  out('s-mw',g.mw+' MW');out('s-u',g.u+'%');if(!g.gu)g.gu=70;setv('s-gu',g.gu);out('s-gu',g.gu+'%');$('#s-gu-w').style.display=g.wl==='ai'?'':'none';if(!g.cc)g.cc=4;setv('s-cc',g.cc);out('s-cc',g.cc+' cycles · '+Math.round((g.cc-1)/g.cc*100)+'% evaporates');$('#s-cc-w').style.display=g.cool==='tower'?'':'none';
  const m=model(g);lastM=m;
  const cx=rngOf(g,x=>x.capex),lc=rngOf(g,x=>x.lcod),pu=rngOf(g,x=>x.pue),wa=rngOf(g,x=>x.onW/365),co=rngOf(g,x=>x.co2);
  const k=[];
  k.push(kpi('hot','Capex',cr(m.capex),`₹${fmt(m.capex/g.mw,1)} cr per MW of IT · cooling ${cr(m.coolCx)} (life ${m.CP.Lr}/${m.CP.Lj} yr)${m.itCx?` · GPUs ${(m.itCx/m.capex*100).toFixed(0)}%`:''} · land ₹${fmt(m.landCx)} cr`,R(cx[0],cx[1],cr),['m','Report 7 per-MW cost stacks, adjusted for cooling choice and city land price']));
  k.push(kpi('hot','Cost per IT-kWh','₹'+m.lcod.toFixed(1),`Levelised: capital at 11% over 20 years, power, O&amp;M, water${g.inc&&m.incA?', less incentives':''}`,R(lc[0],lc[1],v=>'₹'+v.toFixed(1)),['m','Report 7 LCOD method']));
  if(m.gpuh){const gh=rngOf(g,x=>x.gpuh);k.push(kpi('hot','Cost per GPU-hour','₹'+fmt(m.gpuh),`≈ US$${(m.gpuh/90).toFixed(2)} · ${g.gu}% of GPU hours sold · GPUs over 5 years · IndiaAI pays ₹150 for H100-class`,R(gh[0],gh[1],v=>'₹'+fmt(v)),['m','Report 7 GPU-hour model (GB300 price contested)']))}
  else k.push(kpi('hot','Break-even rent','₹'+fmt(m.rent),'per kW per month, power included. Mumbai 1–5 MW deals: ₹6,500–8,000 before power','',['m','Report 7 method; market rents from Cushman & Wakefield']));
  k.push(kpi('','Energy',fmt(m.fac,0)+' MU/yr',`Annual PUE ${m.pue.toFixed(2)} (months ${Math.min(...m.pueM).toFixed(2)}–${Math.max(...m.pueM).toFixed(2)}, hottest hour ${m.pueP.toFixed(2)}) · ${fmt(m.fac*1e6/1800)} homes' use · ${(m.fac/({'Karnataka':92450,'Tamil Nadu':130413,'Maharashtra':201816,'Telangana':88262,'Uttar Pradesh':165090,'Andhra Pradesh':79028,'West Bengal':71180,'Delhi':38255,'Gujarat':151878,'Haryana':70149}[m.c.st]||92450)*100).toFixed(2)}% of ${m.c.st}'s electricity requirement (FY2024-25, CEA)`,R(pu[0],pu[1],v=>'PUE '+v.toFixed(2)),['m','PUE from cooling overheads, averaged over 12 months of 1991–2020 climate normals (calibrated series model)']));
  k.push(kpi('','Water drawn on site',(m.onW/365).toFixed(2)+' MLD',`Evaporated ${(m.cons/365).toFixed(2)} · discharged ${(m.dis/365).toFixed(2)} MLD${m.ro>1?' (incl. RO reject)':''} · WUE ${m.wue.toFixed(2)} L/kWh (cooling make-up) · power stations evaporate ${(m.offW/365).toFixed(2)} MLD more`,R(wa[0],wa[1],v=>v.toFixed(2)+' MLD'),['m','Report 6 water model']));
  k.push(kpi('heat','CO₂',fmt(m.co2)+' t/yr',`CUE ${m.cue.toFixed(2)} kg per IT-kWh · ${(m.share*100).toFixed(0)}% clean power`,R(co[0],co[1],v=>fmt(v)+' t'),['m','Facility MU × 675 t × grid share of purchases (CEA 0.675 t/MWh)']));
  k.push(kpi('mut','Power bill',cr(m.pwr+m.dem)+'/yr',`${((m.pwr+m.dem)/(m.annual+m.incA+m.itA)*100).toFixed(0)}% of annual cost · blended ₹${m.price.toFixed(2)}/kWh`,'',['r',`Tariff: ${m.c.st} HT energy ₹${m.c.t}/kWh + ₹${m.c.dem}/kVA-month demand${m.c.tE?' (not verified; typical ₹7–8)':' (FY2025–26 order)'}`]));
  k.push(kpi(m.incA?'good':'mut','Incentives',m.incA?cr(m.incA)+'/yr':g.inc?(m.elig?'None modelled':'Not eligible'):'Switched off',m.incA?`Cuts cost by ₹${(m.incA/m.it*10).toFixed(2)} per IT-kWh while active`:(!m.elig?'Maharashtra park benefits need ≥51% renewable power':INC[m.c.st].note.split('.')[0]+'.'),'',['e','Published state incentives; electricity duty modelled at 7.5% of the energy charge']));
  k.push(kpi('mut','Grid connection','~'+fmt(m.mva)+' MVA',volt(m.mva)+` · sized on hottest-hour PUE ${m.pueP.toFixed(2)}`+(m.mva>55?' · expect a multi-year substation queue':''),'',['m','IT MW × hottest-hour PUE × 1.12 reserve ÷ 0.95 power factor']));
  $('#s-kpi').innerHTML=k.join('');
  flags(m);policy(m);cmpRender();sankeyRender();if(window.__wpic)window.__wpic();
}
function flags(m){
  const c=m.c,f=[];const add=(t,s)=>f.push(`<div class="flag ${t}"><i>${{bad:'!',warn:'△',good:'✓',info:'i'}[t]}</i><span>${s}</span></div>`);
  const evap=g.cool==='tower'||g.cool==='adiab';
  if(g.city==='blr'&&g.ws==='ground'&&evap)add('bad','Bangalore East groundwater is drawn at ~305% of recharge, and 6,997 of 14,781 public borewells failed in March 2024. An evaporative site on borewells competes directly with households.');
  else if(g.ws==='ground'&&evap)add('warn','Groundwater-fed evaporative cooling carries the highest scarcity-weighted footprint (Report 6). Meter the borewells and plan a switch to treated water.');
  if(g.ws==='ttw')add('good','Treated wastewater moves cooling off fresh water. RO reject raises gross withdrawal by about a third, but evaporation is unchanged.');
  if(g.city==='che'&&evap)add('warn','Chennai reservoirs ran dry in 2019, and a design wet-bulb near 29 °C weakens tower performance. Seawater heat exchange or warm-water liquid loops avoid both.');
  if(c.db>=41&&g.cool==='aircc')add('warn',`Design dry-bulb of ${c.db} °C forces air-cooled chillers to work hardest exactly at peak: PUE ${m.pue.toFixed(2)}.`);
  if(g.cool==='dlc'&&c.db+7>45)add('info',`At ${c.db} °C, dry coolers alone cannot hold 45 °C water on the hottest hours. Budget an adiabatic trim.`);
  if(g.cool==='dlc'&&!m.ai)add('info','Warm-water liquid cooling needs liquid-ready IT. Most enterprise racks today draw 7–8 kW and are air-cooled.');
  if(m.ai&&(g.cool==='adiab'||g.cool==='aircc'))add('bad','AI racks at 120–150 kW cannot be air-cooled. This assumes liquid cooling in the hall, rejecting heat through the plant you chose.');
  if(m.ai&&m.pue>1.35)add('warn',`PUE ${m.pue.toFixed(2)} fails MeitY's AI-cloud tender requirement of below 1.35.`);
  if(c.st==='Karnataka'&&m.pue<=1.2)add('good','PUE ≤ 1.20 qualifies for Karnataka\'s ₹20 crore one-time efficiency incentive.');
  if(c.st==='Karnataka'&&m.pue>1.2)add('info',`Karnataka pays ₹20 crore for PUE ≤ 1.20. This design is at ${m.pue.toFixed(2)}.`);
  if(c.st==='Tamil Nadu')add('bad','Tamil Nadu\'s data-centre policy lapsed on 31 March 2026. Price renewal risk until a successor is notified.');
  if(c.st==='Telangana')add('warn','Telangana runs on a 2016 policy with unpublished bespoke packages and no water or efficiency rules.');
  if(c.st==='Andhra Pradesh')add('warn','The Google–Adani Vizag campus faces PILs over water near Kambalakonda Wildlife Sanctuary and over land. Expect scrutiny of water sourcing.');
  if(c.st==='Maharashtra'&&g.inc&&!m.elig)add('warn','Maharashtra\'s park incentives need at least 51% renewable power. Switch power to 60% renewable to qualify.');
  if(g.city==='mum')add('info','Mumbai land at ~₹20 crore an acre is India\'s dearest, but ~95% of international bandwidth lands here.');
  if(m.mva>55)add('warn',`~${fmt(m.mva)} MVA needs a ${volt(m.mva)} connection. NERC's May 2026 alert shows how fast AI loads can swing a grid.`);
  if(m.ai&&g.u<60)add('bad',`At ${g.u}% utilisation, renting GPU capacity beats owning: the series puts break-even near 55% for an H100.`);
  if(g.pw==='grid')add('info',`Grid-only power: ${fmt(m.co2)} t CO₂ a year. Open-access renewables in ${c.st} land at about ₹${c.re.toFixed(1)}/kWh vs ₹${c.t} grid.`);
  if(g.pw==='rtc')add('good','Hourly-matched clean power cuts CO₂ and power-station water by 80–90%, a stronger claim than annual matching.');
  $('#s-flags').innerHTML=f.join('')||'<span class="small muted">No major flags.</span>';
}
function policy(m){
  const s=S.find(x=>x.n===m.c.st);$('#s-pol-h').innerHTML=`Policy · ${s.n} <span class="chip ${s.st}">${s.st}</span>`;
  $('#s-pol').innerHTML=`<div><b>Instrument.</b> ${s.inst}</div><div><b>Power.</b> ${s.pw}</div><div><b>Green conditions.</b> ${s.gr}</div><div><b>Modelled here.</b> ${INC[s.n].note}</div><div class="muted">${s.a}</div><a href="#states" class="xs">Compare states in chapter 17 →</a>`;
}
/* compare */
let pA=null,pB=null;
const snap=()=>({g:Object.assign({},g),m:model(g)});
$('#pinA').addEventListener('click',()=>{pA=snap();cmpRender()});$('#pinB').addEventListener('click',()=>{pB=snap();cmpRender()});
function cmpRender(){
  if(!pA&&!pB){$('#s-cmp').innerHTML='<tr><td colspan="4" class="muted">Pin a design as A, change something, then pin it as B.</td></tr>';return}
  const rows=[['City',p=>p.m.c.n],['Workload',p=>p.m.w.n+' · '+p.g.mw+' MW · '+p.g.u+'%'],['Cooling',p=>COOLN[p.g.cool]],['Power · water',p=>PWN[p.g.pw]+' · '+WSN[p.g.ws]],
   ['Capex (₹ cr)',p=>p.m.capex,0,1],['Cost per IT-kWh (₹)',p=>p.m.lcod,1,1],['PUE',p=>p.m.pue,2,1],['Energy (MU/yr)',p=>p.m.fac,0,1],['Water drawn on site (MLD)',p=>p.m.onW/365,2,1],['Water evaporated on site (ML/yr)',p=>p.m.cons,0,1],['Power-station water (ML/yr)',p=>p.m.offW,0,1],['Scarcity-weighted water (ML-eq/yr)',p=>p.m.scW,0,1],['CO₂ (t/yr)',p=>p.m.co2,0,1],['Incentives (₹ cr/yr)',p=>p.m.incA,1,1,1]];
  $('#s-cmp').innerHTML=rows.map(([n,f,d,num,good])=>{const a=pA?f(pA):null,b=pB?f(pB):null;const sh=v=>v===null?'—':num?fmt(v,d):v;let dl='';
    if(num&&a!==null&&b!==null){const df=b-a,pc=a?df/Math.abs(a)*100:0;const better=good?df>0:df<0;dl=Math.abs(df)<1e-9?'<td class="n">same</td>':`<td class="n ${better?'dn':'up'}">${df>0?'+':'−'}${fmt(Math.abs(df),d)}${a?`<small>${df>0?'+':'−'}${Math.abs(pc).toFixed(0)}%</small>`:''}</td>`}else dl='<td class="n"></td>';
    return `<tr><td>${n}</td><td>${sh(a)}</td><td>${sh(b)}</td>${dl}</tr>`}).join('');
}
