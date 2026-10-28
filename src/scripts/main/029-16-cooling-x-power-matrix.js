
/* ---------- 16 COOLING x POWER MATRIX ---------- */
{
const host=document.getElementById('cx');
if(host){
/* ===== data ===== */
const CC={
 blr:{n:'Bengaluru',st:'Karnataka',db:35,wb:23,t:STD.tE["Karnataka"],wp:STD.wp,gw:STD.gw["Karnataka"],oa:1.0,coast:0},
 mum:{n:'Mumbai',st:'Maharashtra',db:35,wb:28,t:STD.tE["Maharashtra"],wp:80,gw:STD.gw["Maharashtra"],oa:1.5,coast:1},
 che:{n:'Chennai',st:'Tamil Nadu',db:38,wb:29,t:STD.tE["Tamil Nadu"],wp:80,gw:STD.gw["Tamil Nadu"],oa:1.3,coast:1},
 hyd:{n:'Hyderabad',st:'Telangana',db:41,wb:26,t:STD.tE["Telangana"],wp:80,gw:STD.gw["Telangana"],oa:1.4,coast:0},
 pun:{n:'Pune',st:'Maharashtra',db:38,wb:25,t:STD.tE["Maharashtra"],wp:80,gw:STD.gw["Maharashtra"],oa:1.5,coast:0},
 noi:{n:'Delhi NCR (Noida)',st:'Uttar Pradesh',db:45,wb:29,t:STD.tE["Uttar Pradesh"],wp:80,gw:STD.gw["Uttar Pradesh"],oa:1.6,coast:0},
 viz:{n:'Visakhapatnam',st:'Andhra Pradesh',db:36,wb:28,t:STD.tE["Andhra Pradesh"],wp:80,gw:STD.gw["Andhra Pradesh"],oa:1.2,coast:1}};
const WK={conv:{n:'Conventional (≈10 kW/rack)',rack:10,ls:.045,ot:.015,u:30,idle:36,op:100,L0:.70},ai:{n:'AI (≈130 kW/rack, GB300-class)',rack:130,ls:.045,ot:.015,u:80,idle:20,op:78,L0:.80}};
/* fixed (load-independent) share of each overhead: other loads 100%, power-chain losses 40%, cooling 25% */
const FIX={ot:1,ls:.4,cool:.25};
/* cooling: id, name, short, family, max rack kW, overhead(conv), overhead(ai), WUE fn, capex ₹cr/MW-IT, O&M %, maturity level 3 mature/2 mainstream/1 selective/0 stalled-lab, status text, recommend-eligible {conv,ai} */
const COOL=[
 {id:'crac',n:'Room DX units (CRAC), raised floor',s:'CRAC (DX)',f:'air',mx:15,oc:(c)=>.64+.018*(c.db-24.6),oa:null,w:()=>.02,cx:6.0,om:.03,m:3,st:'Mature, declining',rc:0,ra:0,note:'Least efficient: units fight each other (humidify vs dehumidify). Common in small and legacy rooms (LBNL 2024).'},
 {id:'crahac',n:'Chilled-water CRAH + containment + air-cooled chillers',s:'CRAH + air-cooled chillers',f:'air',mx:25,oc:(c)=>.39+.015*(c.db-24.6),oa:null,w:()=>.02,cx:9.0,om:.03,m:3,st:'Mature, dominant',rc:1,ra:0,note:'Near-zero water, but compressors work hard in 40 °C+ heat ("no water, more energy", LBNL 2024).'},
 {id:'crahwc',n:'Chilled-water CRAH + water-cooled chillers + cooling towers',s:'CRAH + towers',f:'evap',mx:25,oc:(c)=>.19+.012*(c.wb-19.4),oa:null,w:(c)=>1.8*(1+.03*(c.wb-19.4)),cx:9.5,om:.035,m:3,st:'Mature, widespread',rc:1,ra:0,note:'Most efficient compressors (~0.5–0.6 kW/ton) but the highest site water use of any design (LBNL 2024).'},
 {id:'mag',n:'Magnetic-bearing chillers + towers + waterside economiser',s:'Mag-bearing + towers',f:'evap',mx:25,oc:(c)=>.16+.012*(c.wb-19.4),oa:null,w:(c)=>1.7*(1+.03*(c.wb-19.4)),cx:10.5,om:.03,m:3,st:'Mature',rc:1,ra:0,note:'~0.52 kW/ton full load, IPLV 0.29 (Daikin HXE). Few free-cooling hours at India\'s 27–29 °C coastal wet-bulbs.'},
 {id:'iec',n:'Indirect evaporative air handlers (e.g. Munters Oasis)',s:'Indirect evaporative',f:'evap',mx:30,oc:(c)=>.14+.014*(c.wb-19.4),oa:null,w:(c)=>.55*(1+.07*(c.wb-19.4)),cx:11.5,om:.035,m:3,st:'Mature',rc:1,ra:0,note:'Cooling pPUE 1.06–1.07 in Munters cases; outdoor air never enters the hall. Good in Bengaluru, Pune, Hyderabad; weak in humid coastal metros.'},
 {id:'dec',n:'Direct evaporative / adiabatic outside-air cooling',s:'Direct evaporative',f:'evap',mx:25,oc:(c)=>.09+.025*(c.wb-19.4),oa:null,w:(c)=>.45*(1+.09*(c.wb-19.4)),cx:9.5,om:.035,m:3,st:'Mature (cool, dry climates)',rc:0,ra:0,note:'Hyperscalers report WUE 0.1–0.3 L/kWh in dry climates. Brings outdoor air in: dust, pollution and monsoon humidity make it a poor fit in India.'},
 {id:'adiab',n:'Adiabatic / hybrid dry coolers (air-cooled IT)',s:'Adiabatic dry coolers',f:'hyb',mx:25,oc:(c)=>.24+.01*(c.db-24.6),oa:null,w:(c)=>Math.max(.1,.4*(1+.05*(c.db-24.6))),cx:11.0,om:.03,m:3,st:'Mature',rc:1,ra:0,note:'Runs dry most of the year and sprays water only above ~26–30 °C dry-bulb. Same formulas as the atlas simulator.'},
 {id:'rdhx',n:'Rear-door heat exchangers on chilled water (air-cooled chillers)',s:'Rear-door HX',f:'air',mx:50,oc:(c)=>.27+.013*(c.db-24.6),oa:null,w:()=>.02,cx:11.5,om:.03,m:3,st:'Mature; bridge for 20–50 kW',rc:0,ra:0,note:'Passive ~20 kW, active ~50 kW per rack (STT GDC India Pune lab). Used for residual air heat in xAI Colossus 1.'},
 {id:'dtctw',n:'Direct-to-chip liquid + CDUs + cooling towers',s:'DTC + towers',f:'evap',mx:150,oc:(c)=>.04+.004*(c.wb-19.4),oa:(c)=>.04+.004*(c.wb-19.4),w:(c)=>1.8*(1+.03*(c.wb-19.4)),cx:16.0,om:.035,m:2,st:'Mainstream for AI',rc:0,ra:1,note:'Low energy, but towers still evaporate water. Liquid-cooled systems on towers are why LBNL expects US WUE to rise to 0.45–0.48.'},
 {id:'dtcdry',n:'Direct-to-chip liquid (W32–W45) + dry coolers, chiller trim',s:'DTC + dry coolers',f:'dry',mx:150,oc:(c)=>.09+.006*Math.max(0,c.db-24.6)+(c.db+7>45?.02:0),oa:(c)=>.09+.006*Math.max(0,c.db-24.6)+(c.db+7>45?.02:0),w:(c)=>c.db+7>45?.1:.03,cx:17.0,om:.03,m:2,st:'Mainstream; NVIDIA Rubin targets 45 °C water',rc:0,ra:1,note:'The only design that is low on both energy and water. GB300 NVL72 is ~132–142 kW with ~90% of heat to liquid; ASHRAE W45 compliant.'},
 {id:'dtchyb',n:'Direct-to-chip liquid + adiabatic-hybrid dry coolers',s:'DTC + hybrid coolers',f:'hyb',mx:150,oc:(c)=>.06+.003*(c.db-24.6),oa:(c)=>.06+.003*(c.db-24.6),w:(c)=>Math.max(.05,.15*(1+.05*(c.db-24.6))),cx:17.5,om:.03,m:2,st:'Mainstream, growing',rc:0,ra:1,note:'Sprays water only in the hottest hours, so trim chillers can be smaller. A good fit for Delhi and Hyderabad summers.'},
 {id:'imm1',n:'Single-phase immersion + dry coolers',s:'1-phase immersion',f:'dry',mx:300,oc:(c)=>.02+.003*(c.db-24.6),oa:(c)=>.02+.003*(c.db-24.6),w:()=>.02,cx:19.0,om:.045,m:1,st:'Selective adoption (<25% of liquid market)',rc:0,ra:0,note:'100–300 kW per tank in Indian claims (STT 150 kW, CtrlS 300 kW). Server warranties and servicing are harder. IndiaAI prefers it over two-phase.'},
 {id:'imm2',n:'Two-phase immersion (fluorinated / HFO fluid)',s:'2-phase immersion',f:'dry',mx:250,oc:(c)=>Math.max(.005,.005+.002*(c.db-24.6)),oa:(c)=>Math.max(.005,.005+.002*(c.db-24.6)),w:()=>.01,cx:22.0,om:.05,m:0,st:'Stalled after 3M exited PFAS (end 2025)',rc:0,ra:0,note:'Lowest energy claims, but fluid supply and PFAS regulation (EU restriction; US TSCA reporting by 31 Jan 2027) make it a risk for new builds.'},
 {id:'sea',n:'Seawater heat exchange (with liquid or chilled-water room)',s:'Seawater',f:'sea',mx:150,oc:(c)=>.09+.003*(c.db-24.6),oa:(c)=>.09+.003*(c.db-24.6),w:()=>0,cx:19.0,om:.04,m:2,st:'Proven, site-specific (coastal only)',rc:0,ra:0,note:'No freshwater, but needs intake and outfall permits (Coastal Regulation Zone) and corrosion-proof exchangers. Andhra Pradesh policy promotes it.'}];
/* sources: id, name, short, station water L/kWh, CO2 t/MWh, generation ₹/kWh, hourly cover h, remote plant (÷0.92 losses) */
const SRCS=[
 {id:'grid',n:'State grid (DISCOM tariff)',s:'State grid',w:null,ef:STD.co2,g:null,h:1,rem:0,av:'Always available',why:'Water and carbon follow the state\'s generation mix (mostly coal).'},
 {id:'coal',n:'Coal plant with wet cooling tower',s:'Coal (wet)',w:3.0,ef:.95,g:5.5,h:1,rem:1,av:'Via thermal PPA; rarely chosen by DCs',why:'MoEFCC (2015) caps new plants at 3.0 m³/MWh and older ones at 3.5.'},
 {id:'coald',n:'Coal plant with air-cooled condenser (dry)',s:'Coal (dry)',w:.4,ef:1.0,g:5.8,h:1,rem:1,av:'Few plants (e.g. NTPC North Karanpura)',why:'Dry condensers cut plant water ~85% but raise heat rate and CO₂.'},
 {id:'gas',n:'Gas combined cycle (imported LNG)',s:'Gas CCGT',w:.75,ef:.40,g:9.0,h:1,rem:1,av:'Plants idle for want of cheap gas',why:'Steam cycle is only one-third of output, so tower water is low (NREL median ~0.75 L/kWh).'},
 {id:'nuc',n:'Nuclear (PHWR, inland cooling tower)',s:'Nuclear',w:2.6,ef:0,g:5.0,h:1,rem:1,av:'Private procurement only beginning to open',why:'Large steam cycle, so tower water is close to coal (NREL ~2.5 L/kWh). Coastal plants use seawater.'},
 {id:'hyd',n:'Reservoir hydro',s:'Hydro (reservoir)',w:'H',ef:0,g:4.5,h:.9,rem:1,av:'Limited contracts (~40 MW in Karnataka)',why:'Evaporation from the reservoir surface, allocated to electricity: 0–20 L/kWh, nobody measures it.'},
 {id:'ror',n:'Run-of-river / small hydro',s:'Hydro (run-of-river)',w:0,ef:0,g:4.5,h:.6,rem:1,av:'Small, seasonal (monsoon-heavy)',why:'No storage reservoir, so no evaporation is attributed.'},
 {id:'sol',n:'Solar PV via open access',s:'Solar',w:.1,ef:0,g:2.7,h:.35,rem:0,av:'Widely available',why:'Panel washing only (~0.1 L/kWh). Covers daytime hours.'},
 {id:'win',n:'Wind via open access',s:'Wind',w:.004,ef:0,g:3.4,h:.55,rem:0,av:'Good in Karnataka, TN, Gujarat',why:'Essentially no water. Strong in monsoon, weak in Oct–Feb.'},
 {id:'hyb',n:'Solar + wind hybrid via open access',s:'Solar + wind',w:.05,ef:0,g:3.2,h:.70,rem:0,av:'Widely available',why:'Wind fills some solar gaps, so more hours are covered.'},
 {id:'fdre',n:'Round-the-clock renewables (FDRE: solar + wind + storage)',s:'RTC / FDRE',w:.07,ef:0,g:4.8,h:.85,rem:0,av:'SECI FDRE tenders; growing',why:'Storage-backed contract with ~85% hourly availability.'},
 {id:'lp',n:'Least-water renewable mix (Chapter 16 optimisation)',s:'Least-water mix ★',w:.05,ef:0,g:4.06,h:.83,rem:0,av:'Buildable today via group captive',why:'161 MW solar + 86 MW wind + 379 MWh battery per 65 MW, hourly-optimised; no hydro.'}];
const LPK={sol:161/65,win:86/65,bat:379/65};
const BANK=.6,CRF15=crf(.11,15),PPL=135;
let S={city:'blr',wk:'ai',mw:50,u:80,idle:20,op:78,acc:'phys',hw:10,tol:5,met:'tw',ci:'dtcdry',si:'grid'};
const sw=(s,c)=>s.w==='H'?S.hw:(s.w===null?c.gw:s.w/(s.rem?.92:1));
const feas=(t,c,wk)=>{if(t.id==='sea'&&!c.coast)return [0,'Only for coastal sites (Mumbai, Chennai, Visakhapatnam).'];if(WK[wk].rack>t.mx||(wk==='ai'&&!t.oa))return [0,`Air or room cooling tops out near ${t.mx} kW per rack; an AI rack needs ~130 kW and about 90% of its heat must go to liquid.`];return [1,'']};
const warn=(t,c,wk)=>{const w=[];if(['evap'].includes(t.f)&&c.wb>=27)w.push(`Humid design wet-bulb (${c.wb} °C): evaporative cooling gains little here but still uses a lot of water.`);if(t.id==='dec')w.push('Brings outdoor air into the hall: dust, pollution and monsoon humidity limit its use in India.');if((t.f==='dry'||t.f==='air'||t.f==='hyb')&&c.db>=44)w.push(`${c.db} °C design dry-bulb derates dry coolers and air-cooled chillers; size trim capacity for the hottest hours.`);if(t.id==='imm2')w.push('Two-phase fluids face PFAS supply and regulatory risk after 3M stopped making Novec at the end of 2025.');if(wk==='conv'&&t.oa)w.push('Conventional servers are air-cooled; liquid designs need liquid-ready hardware and are rarely worth it below ~20 kW per rack.');if(t.id==='imm1')w.push('Immersion complicates server warranties and maintenance; adoption is selective.');return w};
function calc(t,s,cityK,wkK,o={}){
 const c=CC[cityK],wk=WK[wkK],mw=o.mw||S.mw,u=(o.u||S.u)/100,acc=o.acc||S.acc,idle=S.idle/100,op=S.op/100;
 const CLm=(window.__CLIM||{})[cityK];let ov=0,wue=0;
 if(CLm){const DMx=[31,28,31,30,31,30,31,31,30,31,30,31];for(let i=0;i<12;i++){const cm=Object.assign({},c,{db:CLm.db[i],wb:CLm.wb[i]});ov+=(wkK==='ai'&&t.oa?t.oa(cm):t.oc(cm))*DMx[i]/365;let ww=t.w(cm);if(t.f==='evap')ww=Math.min(2.5,ww);if(t.id==='adiab')ww=Math.min(1.6,ww);wue+=ww*DMx[i]/365}}
 else{ov=(wkK==='ai'&&t.oa?t.oa(c):t.oc(c));wue=t.w(c)}
 const L=Math.max(.05,idle*(1-u)+op*u),O=wk.ls+wk.ot+ov,phi=(wk.ot*FIX.ot+wk.ls*FIX.ls+ov*FIX.cool)/O;
 const pue0=1+O,pue=Math.max(1.03,1+O*(phi*wk.L0/L+(1-phi)));
 const eit=mw*L*8760,efac=eit*pue,idleSh=idle*(1-u)/L;
 const cover=s.id==='grid'?0:(s.id==='lp'||acc==='phys')?s.h:1;
 const ws=s.id==='grid'?c.gw:sw(s,c),efs=s.ef;
 const wmix=s.id==='grid'?c.gw:cover*ws+(1-cover)*c.gw;
 const efmix=s.id==='grid'?STD.co2:cover*efs+(1-cover)*STD.co2;
 const sp=s.id==='grid'?c.t:s.g+c.oa+(s.id==='lp'||s.h>=1?0:BANK*(1-s.h));
 const price=s.id==='grid'?c.t:s.id==='lp'?s.h*sp+(1-s.h)*c.t:sp;
 const dir=eit*wue/1000,ind=efac*wmix/1000,tot=dir+ind;
 const pwr=efac*price*1e-4,wat=dir*c.wp*1e-4,cap=mw*t.cx,capA=cap*CRF15,om=cap*t.om;
 const ann=pwr+wat+capA+om,co2=efac*efmix/1000;
 return {c,wk,t,s,mw,u,L,O,phi,pue0,idle,op,idleSh,pue,ov,wue,eit,efac,cover,ws,wmix,efmix,sp,price,dir,ind,tot,pwr,wat,cap,capA,om,ann,co2,lkwh:ann*1e7/(eit*1000),twue:tot*1000/eit};
}
function recommend(){
 const c=CC[S.city],lp=SRCS.find(s=>s.id==='lp');
 const cand=COOL.filter(t=>(S.wk==='ai'?t.ra:t.rc)&&feas(t,c,S.wk)[0]).map(t=>calc(t,lp,S.city,S.wk));
 const mn=Math.min(...cand.map(r=>r.ann));const ok=cand.filter(r=>r.ann<=mn*(1+S.tol/100));
 ok.sort((a,b)=>a.tot-b.tot);return {best:ok[0],cand,mn};
}
/* ===== UI ===== */
const F0=v=>fmt(v,0),F1=v=>fmt(v,1),F2=v=>fmt(v,2);
const sel=(id,arr,cur)=>{const e=document.getElementById(id);e.innerHTML=arr.map(a=>`<option value="${a.id}"${a.id===cur?' selected':''}>${a.n}</option>`).join('')};
function matrix(){
 const c=CC[S.city],lp=SRCS.find(s=>s.id==='lp'),R=recommend();
 const ALL=[];COOL.forEach(t=>SRCS.forEach(s=>{ALL.push(calc(t,s,S.city,S.wk))}));
 const fe=ALL.filter(r=>feas(r.t,c,S.wk)[0]);
 const key={tw:'tot',dir:'dir',ind:'ind',cost:'lkwh',co2:'co2'}[S.met];
 const vals=fe.map(r=>r[key]),lo=Math.min(...vals),hi=Math.max(...vals);
 const col=S.met==='cost'?'--hot':S.met==='co2'?'--heat':'--cold';
 const lab=v=>S.met==='cost'?'₹'+F2(v):F0(v);
 let h=`<div class="cx-g" role="grid" aria-label="Cooling technology by electricity source"><div class="cx-corner">Cooling ↓ · Power →</div>`;
 h+=SRCS.map(s=>`<div class="cx-ch${s.id===S.si?' on':''}" title="${s.n}">${s.s}</div>`).join('');
 COOL.forEach(t=>{const [ok]=feas(t,c,S.wk);
  h+=`<div class="cx-rh${t.id===S.ci?' on':''}${ok?'':' na'}" title="${t.n}"><span>${t.s}</span><i>${ok?'':'not feasible'}</i></div>`;
  SRCS.forEach(s=>{const r=ALL.find(x=>x.t===t&&x.s===s),v=r[key];
   const isR=R.best&&t===R.best.t&&s.id==='lp',on=t.id===S.ci&&s.id===S.si;
   if(!ok){h+=`<button type="button" class="cx-c na${on?' on':''}" data-c="${t.id}" data-s="${s.id}" aria-label="${t.s} with ${s.s}: not feasible">✕</button>`;return}
   const k=hi>lo?(Math.log(v+1)-Math.log(lo+1))/(Math.log(hi+1)-Math.log(lo+1)):0,p=Math.round(12+k*80);
   h+=`<button type="button" class="cx-c${on?' on':''}${isR?' rec':''}" data-c="${t.id}" data-s="${s.id}" style="background:color-mix(in srgb,var(${col}) ${p}%,var(--surface));color:${p>55?'#fff':'var(--ink)'}" aria-label="${t.s} with ${s.s}: ${lab(v)}">${lab(v)}</button>`})});
 h+='</div>';
 document.getElementById('cx-mx').innerHTML=h;
 const unit={tw:'Total water, ML a year (on site + power plants)',dir:'On-site (direct) water, ML a year',ind:'Power-plant (indirect) water, ML a year',cost:'All-in cost, ₹ per kWh of IT',co2:'CO₂, thousand tonnes a year'}[S.met];
 document.getElementById('cx-lg').innerHTML=`<span>${unit} · ${c.n} · ${WK[S.wk].n} · ${F0(S.mw)} MW IT · ${S.u}% busy, idle ${S.idle}%</span><span class="cx-ramp"><b>${lab(lo)}</b><i style="background:linear-gradient(90deg,color-mix(in srgb,var(${col}) 12%,var(--surface)),var(${col}))"></i><b>${lab(hi)}</b></span><span><span class="cx-k na">✕</span> not feasible · <span class="cx-k rec"></span> recommended combination · colour on a log scale</span>`;
}
function bars(el,rows){const mx=Math.max(...rows.map(r=>r[1]+r[2]),1);el.innerHTML=rows.map(([n,d,i,ex])=>`<div class="cx-sb"><span>${n}</span><div class="cx-tr"><i class="d" style="width:${d/mx*100}%"></i><i class="i" style="width:${i/mx*100}%"></i></div><span class="val">${F0(d+i)} ML</span>${ex?`<small>${ex}</small>`:''}</div>`).join('')+`<div class="cx-sk"><span><i class="d"></i>On site (direct)</span><span><i class="i"></i>At power plants (indirect)</span></div>`}
function detail(){
 const c=CC[S.city],t=COOL.find(x=>x.id===S.ci),s=SRCS.find(x=>x.id===S.si),lp=SRCS.find(x=>x.id==='lp');
 const r=calc(t,s,S.city,S.wk),[ok,why]=feas(t,c,S.wk),wr=warn(t,c,S.wk);
 const R=recommend(),b=R.best,a=calc(t,lp,S.city,S.wk);
 document.getElementById('cx-hd').innerHTML=`<b>${t.n}</b> powered by <b>${s.n}</b> · ${c.n} · ${WK[S.wk].n}`;
 document.getElementById('cx-fl').innerHTML=(!ok?`<div class="cx-al bad"><b>Not feasible.</b> ${why} The numbers below are shown only for comparison.</div>`:'')+wr.map(w=>`<div class="cx-al">${w}</div>`).join('');
 document.getElementById('cx-r').innerHTML=[
  [F0(r.L*100)+'%','IT load factor: average IT power as % of rated ('+F0(r.idleSh*100)+'% of it drawn while idle)',''],[F2(r.pue),'PUE at this load (design '+F2(r.pue0)+' at '+F0(r.wk.L0*100)+'%)',''],[F0(r.efac/1000)+' MU','Facility electricity a year',''],
  [F0(r.dir)+' ML','On-site (direct) water a year','cold'],[F0(r.ind)+' ML','Power-plant (indirect) water a year','hot'],
  [F0(r.tot)+' ML','Total water · '+F2(r.twue)+' L per kWh of IT',''],[F1(r.co2)+' kt','CO₂ a year',''],
  ['₹'+F0(r.ann)+' cr','All-in annual cost (power, water, cooling plant)',''],['₹'+F2(r.lkwh),'Cost per kWh of IT','']].map(([v,k,cl])=>`<div><span class="v ${cl}">${v}</span><span class="k">${k}</span></div>`).join('');
 const cb=[['Electricity',r.pwr],['Water bill',r.wat],['Cooling plant (capex ÷ 15 yr at 11%)',r.capA],['Cooling O&M',r.om]],cm=Math.max(...cb.map(x=>x[1]));
 document.getElementById('cx-cb').innerHTML=cb.map(([n,v])=>`<div class="hbar"><span>${n}</span><div class="track"><div class="fill hot" style="width:${Math.max(1.5,v/cm*100)}%"></div></div><span class="val">₹${F1(v)} cr</span></div>`).join('');
 /* recommendation */
 const rows=[['Your selection',r.dir,r.ind,`₹${F2(r.lkwh)}/kWh · ${F1(r.co2)} kt CO₂`],['Same cooling + least-water mix',a.dir,a.ind,`₹${F2(a.lkwh)}/kWh · ${F1(a.co2)} kt CO₂`]];
 if(b)rows.push(['Recommended: '+b.t.s+' + least-water mix',b.dir,b.ind,`₹${F2(b.lkwh)}/kWh · ${F1(b.co2)} kt CO₂`]);
 bars(document.getElementById('cx-cmp'),rows);
 const fac=r.efac/8760,ff=b?b.efac/8760:fac;
 let rh='';
 if(b){const sv=r.tot-b.tot,svA=r.tot-a.tot,dc=b.ann-r.ann,pk=sv>0?dc*1e7/(sv*1e6/1000):null;
  rh=`<div class="cx-rec"><div class="cx-rt"><span class="chip">Recommended combination</span><h4>${b.t.n}<br>+ least-water renewable mix</h4>
  <p class="small">Rule: among mature, feasible ${S.wk==='ai'?'liquid':'air'} designs for ${c.n}, take the one with the least total water whose annual cost is within <b>${S.tol}%</b> of the cheapest, all powered by the Chapter 16 mix.</p></div>
  <div class="cx-mix"><div><b>${F0(LPK.sol*ff)} MW</b><span>solar</span></div><div><b>${F0(LPK.win*ff)} MW</b><span>wind</span></div><div><b>${F0(LPK.bat*ff)} MWh</b><span>4-h battery</span></div><div><b>83%</b><span>clean, hour by hour</span></div></div>
  <p class="xs muted">Sized for the recommended design's average load of ${F1(ff)} MW (the Chapter 16 ratios: 161 MW solar, 86 MW wind, 379 MWh per 65 MW). Grid fills the other 17% of energy.</p>
  <div class="read cx-sv">${sv>0?`<div><span class="v good">${F0(sv)} ML</span><span class="k">Water saved a year (${F0(sv/r.tot*100)}% of your selection)</span></div><div><span class="v good">${F0(sv*1e6/(PPL*365))}</span><span class="k">People's daily water (135 L) that saving equals</span></div><div><span class="v">${F0(svA)} ML</span><span class="k">Of that, from changing power alone</span></div><div><span class="v">${F0(sv-svA)} ML</span><span class="k">Of that, from changing cooling</span></div>`:`<div><span class="v">${F0(-sv)} ML</span><span class="k">Your selection already uses <b>less</b> water than the recommended combination${S.acc==='cont'&&s.id!=='grid'&&s.id!=='lp'?' (under annual contract accounting, which credits banked renewables as if they ran every hour)':''}.</span></div>`}
  <div><span class="v ${dc<=0?'good':'hot'}">${dc<=0?'−':'+'}₹${F1(Math.abs(dc))} cr</span><span class="k">Change in annual cost</span></div>${pk!==null&&dc>0?`<div><span class="v">₹${F0(pk)}/kL</span><span class="k">Cost of each kilolitre saved (city water ₹${c.wp}/kL)</span></div>`:''}<div><span class="v good">${F1(r.co2-b.co2)} kt</span><span class="k">CO₂ avoided a year</span></div></div></div>`}
 document.getElementById('cx-rc').innerHTML=rh;
 /* trace */
 const sp=s.id==='grid'?`tariff ₹${F2(c.t)}`:s.id==='lp'?`${F0(s.h*100)}% × ₹${F2(r.sp)} (generation ₹${F2(s.g)} + open access ₹${F2(c.oa)}) + ${F0((1-s.h)*100)}% × grid ₹${F2(c.t)}`:`generation ₹${F2(s.g)} + open access ₹${F2(c.oa)}${s.h<1?` + banking ₹${BANK} × ${F0((1-s.h)*100)}% unmatched`:''}`;
 document.getElementById('cx-tr').innerHTML=`<ol class="cx-ol">
 <li><b>IT load factor</b> (average IT power ÷ rated capacity, the quantity every other chapter calls IT load) = idle ${S.idle}% × (1 − ${S.u}% busy) + busy power ${S.op}% × ${S.u}% = <b>${F1(r.L*100)}% of rated</b>; ${F0(r.idleSh*100)}% of IT energy is drawn while the servers are idle</li>
 <li><b>IT energy</b> = ${F0(S.mw)} MW × ${F1(r.L*100)}% × 8,760 h = <b>${F0(r.eit)} MWh</b></li>
 <li><b>Design overhead</b> = losses ${WK[S.wk].ls} + other ${WK[S.wk].ot} + cooling ${F2(r.ov)} (12-month average of 1991–2020 normals; design ${c.db}/${c.wb} °C) = ${F2(r.O)} → design PUE ${F2(r.pue0)} at ${F0(r.wk.L0*100)}% load</li>
 <li><b>Part-load PUE</b> = 1 + ${F2(r.O)} × (fixed share ${F2(r.phi)} × ${F0(r.wk.L0*100)}% ÷ ${F1(r.L*100)}% + variable share ${F2(1-r.phi)}) = <b>${F2(r.pue)}</b></li>
 <li><b>Facility energy</b> = ${F0(r.eit)} × ${F2(r.pue)} = <b>${F0(r.efac)} MWh</b></li>
 <li><b>Direct water</b> = IT energy × WUE ${F2(r.wue)} L/kWh ÷ 1,000 = <b>${F0(r.dir)} ML</b></li>
 <li><b>Water per kWh bought</b> = ${s.id==='grid'?`${c.st} grid ${F2(c.gw)} L/kWh`:`${F0(r.cover*100)}% × source ${F2(r.ws)} L/kWh${r.cover<1?` + ${F0((1-r.cover)*100)}% × ${c.st} grid ${F2(c.gw)} L/kWh`:''}`} = <b>${F2(r.wmix)} L/kWh</b>${s.rem?' (plant water ÷ 0.92 for transmission losses)':''}</li>
 <li><b>Indirect water</b> = ${F0(r.efac)} MWh × ${F2(r.wmix)} ÷ 1,000 = <b>${F0(r.ind)} ML</b></li>
 <li><b>Electricity price</b> = ${sp} = <b>₹${F2(r.price)}/kWh</b> → ${F0(r.efac)} MWh × ₹${F2(r.price)} ÷ 10,000 = <b>₹${F1(r.pwr)} cr</b></li>
 <li><b>Water bill</b> = ${F0(r.dir)} ML × ₹${c.wp}/kL ÷ 10,000 = <b>₹${F2(r.wat)} cr</b></li>
 <li><b>Cooling plant</b> = ${F0(S.mw)} MW × ₹${F1(t.cx)} cr/MW = ₹${F0(r.cap)} cr × CRF ${F2(CRF15)} = <b>₹${F1(r.capA)} cr/yr</b>, plus O&amp;M ${F1(t.om*100)}% = <b>₹${F1(r.om)} cr</b></li>
 <li><b>CO₂</b> = ${F0(r.efac)} MWh × ${F2(r.efmix)} t/MWh ÷ 1,000 = <b>${F1(r.co2)} kt</b></li>
 <li><b>Cost per kWh of IT</b> = ₹${F1(r.ann)} cr × 10⁷ ÷ ${F0(r.eit*1000)} kWh = <b>₹${F2(r.lkwh)}</b></li></ol>`;
 document.getElementById('cx-ti').innerHTML=`<p class="small"><b>${t.s}.</b> ${t.note} <span class="muted">Status: ${t.st}.</span></p><p class="small"><b>${s.s}.</b> ${s.why} <span class="muted">${s.av}.</span></p>`;
}
function tables(){
 const c=CC[S.city];
 document.getElementById('cx-tc').innerHTML=COOL.map(t=>{const rc=calc(t,SRCS[0],S.city,'conv'),ra=t.oa?calc(t,SRCS[0],S.city,'ai'):null;
  return `<tr><td><b>${t.n}</b></td><td class="n">${F2(rc.pue)}</td><td class="n">${ra?F2(ra.pue):'—'}</td><td class="n">${F2(rc.wue)}</td><td class="n">${t.mx}</td><td>${t.oa?'Yes':'No'}</td><td class="n">${F1(t.cx)}</td><td>${t.st}</td></tr>`}).join('');
 document.getElementById('cx-ts').innerHTML=SRCS.map(s=>`<tr><td><b>${s.n}</b></td><td class="n">${s.w==='H'?S.hw+' (0–20)':s.w===null?F2(c.gw)+' ('+c.st+')':F2(s.w)}</td><td class="n">${s.w===null?'—':F2(sw(s,c))}</td><td class="n">${F2(s.ef)}</td><td class="n">${s.id==='grid'?'₹'+F2(c.t):'₹'+F2(s.g)}</td><td class="n">${F0(s.h*100)}%</td><td>${s.av}</td></tr>`).join('');
}
function all(){
 const c=CC[S.city];
 out('cx-mw',F0(S.mw)+' MW');out('cx-u',S.u+'%');out('cx-idle',S.idle+'%');out('cx-op',S.op+'%');out('cx-tol',S.tol+'%');
 document.getElementById('cx-cty').textContent=`${c.n}: annual from monthly climate normals; design dry-bulb ${c.db} °C, wet-bulb ${c.wb} °C · grid water ${F2(c.gw)} L/kWh · tariff ₹${F2(c.t)}/kWh · water ₹${c.wp}/kL`;
 matrix();detail();tables();
}
sel('cx-cs',COOL,S.ci);sel('cx-ss',SRCS,S.si);
document.getElementById('cx-mx').addEventListener('click',e=>{const b=e.target.closest('.cx-c');if(!b)return;S.ci=b.dataset.c;S.si=b.dataset.s;document.getElementById('cx-cs').value=S.ci;document.getElementById('cx-ss').value=S.si;all();
 if(innerWidth<900)document.getElementById('cx-det').scrollIntoView({behavior:'smooth',block:'start'})});
document.getElementById('cx-cs').addEventListener('change',e=>{S.ci=e.target.value;all()});
document.getElementById('cx-ss').addEventListener('change',e=>{S.si=e.target.value;all()});
seg('cx-city',d=>{S.city=d.v;all()});
seg('cx-wk',d=>{S.wk=d.v;['u','idle','op'].forEach(k=>{S[k]=WK[d.v][k];document.getElementById('cx-'+k).value=S[k]});if(d.v==='ai'&&!COOL.find(t=>t.id===S.ci).oa)S.ci='dtcdry';if(d.v==='conv'&&COOL.find(t=>t.id===S.ci).oa)S.ci='crahwc';document.getElementById('cx-cs').value=S.ci;all()});
seg('cx-acc',d=>{S.acc=d.v;all()});seg('cx-hw',d=>{S.hw=+d.v;all()});seg('cx-met',d=>{S.met=d.v;matrix()});
['mw','u','idle','op','tol'].forEach(k=>document.getElementById('cx-'+k).addEventListener('input',e=>{S[k]=+e.target.value;all()}));
all();
window.__CX={calc,recommend,COOL,SRCS,CC,S};
}
}
