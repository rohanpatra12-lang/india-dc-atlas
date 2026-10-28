
/* ---------- 15 RECOMMENDATIONS ---------- */
{
const NS='http://www.w3.org/2000/svg';
const cw=el=>Math.max(260,Math.min(900,(el&&el.clientWidth)||640));const TW=window.__tw||(window.__tw=(()=>{const c=document.createElement('canvas').getContext('2d');return (t,fs=11,wt=400)=>{c.font=`${wt} ${fs}px ${getComputedStyle(document.body).fontFamily||'sans-serif'}`;return c.measureText(String(t)).width}})());
const svg=(W,H,b)=>`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="${NS}">${b}</svg>`;
/* ===== 1 hubs ===== */
const CR=['Power headroom','Clean power','Water','Hazard','Latency / cables','Land'];
const WP={cloud:[25,10,15,10,20,10],ai:[30,20,15,10,5,10]};
const HUBS=[
 ['Mumbai / Navi Mumbai',[3,3,3,2,5,1],'Colo, cloud zone','Multi-storey; plinth above design flood level; closed-loop liquid + dry coolers; TSE only; 51%+ renewables via MSEDCL green open access.'],
 ['Pune',[3,3,3,4,4,3],'Cloud zone, colo overflow','Pair with Navi Mumbai as a second availability zone; adiabatic-assisted dry coolers.'],
 ['Chennai',[3,4,1,2,5,3],'Colo, cloud, cable-landing','Desalinated or treated water only; raised plinth; cyclone-rated envelope. The state policy lapsed on 31 March 2026 and the 2025 banking rules cut green-power savings.'],
 ['Hyderabad',[4,3,3,5,3,4],'Cloud zone, inference, mid-size training','Dry coolers with trim chillers. Telangana still runs on a 2016 policy that needs replacing.'],
 ['Bengaluru',[2,4,1,5,3,2],'Colo, enterprise, inference','Hoskote treated-water park; best free-cooling climate of the metros; zero groundwater; PUE ≤ 1.20 earns the state bonus.'],
 ['NCR / Noida',[3,2,1,3,4,3],'Cloud zone, colo, government','Air-cooled or hybrid chillers sized for 47 °C+; no groundwater; UP DC Policy 2026.'],
 ['Kolkata',[3,2,3,2,3,3],'Eastern colo, edge','Raised plinth; adds geographic diversity in the east.'],
 ['Vizag',[4,4,3,2,4,4],'AI training, hyperscale','Cyclone-rated structure (Hudhud, 2014); desalinated water or closed loop; seawater heat rejection only after a marine ecology study.'],
 ['Jamnagar / Gujarat',[4,5,3,3,3,5],'AI training','Desalinated seawater; dry coolers for a hot-arid climate; keep critical halls out of Kutch (seismic Zone V).'],
 ['GIFT City',[3,4,3,4,3,3],'Fintech colo, IFSC workloads','Connect to GIFT\'s district-cooling network for heat reuse; SEZ/IFSC benefits.'],
 ['Tier-2 cities',[3.5,3,3.5,4,2.5,5],'Edge, inference, state/sovereign','Prefabricated modules; air-cooled, zero water; anchor on government demand (Lucknow, Bhubaneswar, Nagpur, Coimbatore, Indore, Naya Raipur).']];
let ra='cloud',rw=WP.cloud.slice(),rsel='Hyderabad';
function rc1w(){
  $('#rc1-w').innerHTML=CR.map((c,i)=>`<div class="ctrl"><label for="rcw${i}">${c}</label><output id="rcw${i}-o">${rw[i]}</output><input id="rcw${i}" type="range" min="0" max="40" step="5" value="${rw[i]}" ${ra==='custom'?'':'disabled'}></div>`).join('');
  CR.forEach((c,i)=>$('#rcw'+i).addEventListener('input',()=>{rw[i]=val('rcw'+i);out('rcw'+i,rw[i]);rc1()}));
  $('#rc1-w').style.opacity=ra==='custom'?1:.6;
}
function rc1(){
  const lat=$('#rc1-l').checked&&ra==='cloud',sw=rw.reduce((a,b)=>a+b,0)||1;
  const rows=HUBS.map(h=>({h,s:h[1].reduce((a,v,i)=>a+v*rw[i],0)/sw,out:lat&&h[1][4]<4})).sort((a,b)=>(a.out-b.out)||(b.s-a.s));
  const col=v=>v>=4.5?'var(--good)':v>=3.5?'var(--cold)':v>=2.5?'var(--warn)':'var(--bad)';
  $('#rc1').innerHTML=`<div class="rc-hh"><span></span>${CR.map((c,i)=>`<span title="${c}">${c}<small>${rw[i]}%</small></span>`).join('')}<span>Weighted</span></div>`+
   rows.map((r,i)=>`<button type="button" class="rc-hr${r.out?' out':''}${r.h[0]===rsel?' on':''}" data-h="${r.h[0]}"><span class="rc-hn"><b class="mono">${r.out?'–':i+1}</b> ${r.h[0]}</span>${r.h[1].map(v=>`<span class="rc-c" style="background:${col(v)};opacity:${.25+v/5*.75}">${v}</span>`).join('')}<span class="rc-ws"><i style="width:${r.s/5*100}%"></i><b class="mono">${r.out?'filtered':r.s.toFixed(2)}</b></span></button>`).join('');
  const h=HUBS.find(x=>x[0]===rsel);$('#rc1-d').innerHTML=`<b>${h[0]}</b> · best fit: <b>${h[2]}</b>. ${h[3]}`;
}
seg('rc1-a',d=>{ra=d.v;if(WP[ra])rw=WP[ra].slice();rc1w();rc1()});$('#rc1-l').addEventListener('change',rc1);
$('#rc1').addEventListener('click',e=>{const b=e.target.closest('[data-h]');if(!b)return;rsel=b.dataset.h;rc1()});
/* ===== 2 archetypes ===== */
const ARC=[['Hyperscale cloud','50–300 MW per campus','Navi Mumbai, Pune, Chennai, Hyderabad, NCR, Bengaluru periphery','Paired availability zones 30–100 km apart on separate substations and flood basins, near a cable landing.','33 kV distribution, N+1 transformers, block-redundant UPS (not full 2N), Li-ion, 30–50% liquid-ready halls, dry coolers with adiabatic assist on peaks, in-state group-captive RE + battery.','--cold'],
 ['Colocation','5–100 MW','Mumbai, Chennai, NCR, Hyderabad, Kolkata, Bengaluru','Carrier density and interconnection first; existing industrial land with treated water.','Mixed tenancy: 10–20 kW air racks now, space for 50–130 kW liquid pods; facility-water take-offs (W32–W40) on every floor; 4–8 storeys with ≥20–25 kN/m² slabs; sell hourly clean-power and water reports to tenants.','--cold'],
 ['AI training campus','100 MW – 1 GW+','Vizag, Jamnagar, Kurnool/Anantapur, Tumakuru/Chitradurga, Telangana interior, western Rajasthan, Bhubaneswar–Paradip','Co-locate with renewables + batteries at a 400 kV pooling station; desalinated or treated water; seismic Zone II/III; hourly clean power.','Treat it as a power plant plus load: own substation; batteries of 2–4 h at 30–50% of IT load to smooth training swings and firm renewables; 100% direct-to-chip liquid at W40–W45 for 120–142 kW racks, scalable to 200–600 kW; a small evaporative trim for April–May peaks only.','--hot'],
 ['AI inference / edge','0.5–20 MW','Lucknow, Jaipur, Ahmedabad, Indore, Nagpur, Coimbatore, Kochi, Bhubaneswar, Guwahati, Patna','Near users and 5G aggregation nodes.','Prefabricated 1–5 MW modules; air-cooled DX or pumped refrigerant with rear-door coolers for 30–60 kW racks; zero water; HVO-ready gensets or batteries.','--hot'],
 ['Sovereign / government','10–100 MW','NIC and state DCs, Naya Raipur AI park, Bhubaneswar','Geo-redundant pairs ≥500 km apart in different seismic and flood regions; Indian-owned operator.','Tier III minimum; audited PUE, WUE and CUE published quarterly. Government should lead on transparency.','--good']];
function rc2(){$('#rc2').innerHTML=ARC.map(([n,s,l,r,d,c])=>`<div class="rc-ac" style="border-top-color:var(${c})"><b>${n}</b><span class="chip">${s}</span><dl><dt>Where</dt><dd>${l}</dd><dt>Rule</dt><dd>${r}</dd><dt>Design</dt><dd>${d}</dd></dl></div>`).join('')}
/* ===== 3 targets ===== */
const TG={hyp:{n:'Hyperscale cloud',p:[1.20,1.28,1.25],w:.3,f:70,c:.25,fr:'≤20%',e:'Feasibility study'},colo:{n:'Colocation',p:[1.30,1.38,1.35],w:.5,f:60,c:.35,fr:'≤30%',e:'Feasibility study'},ai:{n:'AI training campus',p:[1.15,1.22,1.20],w:.2,f:80,c:.15,fr:'0% (TSE/desal only)',e:'≥5% with an offtaker'},edge:{n:'AI inference / edge',p:[1.35,1.45,1.40],w:.05,f:50,c:.45,fr:'n/a',e:'—'},gov:{n:'Sovereign / government',p:[1.30,1.35,1.35],w:.4,f:60,c:.35,fr:'≤20%',e:'Feasibility study'}};
let rcl=0;
function rc3(){if(!document.getElementById("rc3-a"))return;
  const a=$('#rc3-a').value,T=TG[a],P=val('rc3-p'),Wv=val('rc3-w'),F=val('rc3-f');out('rc3-p',P.toFixed(2));out('rc3-w',Wv.toFixed(2)+' L/kWh');out('rc3-f',F+'%');
  const cue=P*STD.co2*(1-F/100),tp=T.p[rcl];
  const bar=(lbl,v,t,lo,hi,fmtv,better,marks)=>{const X=x=>Math.max(0,Math.min(100,(x-lo)/(hi-lo)*100)),ok=better==='low'?v<=t+1e-9:v>=t-1e-9;
    return `<div class="rc-cr"><span class="rc-cl">${lbl}</span><div class="rc-ct"><i class="rc-tz" style="${better==='low'?`left:0;width:${X(t)}%`:`left:${X(t)}%;right:0`}"></i>${(marks||[]).map(([m,n],j)=>`<b class="rc-mk${j%2?' alt':''}" style="left:${X(m)}%" title="${n}"><em>${n}</em></b>`).join('')}<i class="rc-tv" style="left:${X(t)}%"></i><span class="rc-dot ${ok?'ok':'no'}" style="left:${X(v)}%"></span></div><span class="rc-cv ${ok?'ok':'no'}">${fmtv(v)} <small>target ${better==='low'?'≤':'≥'} ${fmtv(t)}</small> ${ok?'✓':'✗'}</span></div>`};
  $('#rc3').innerHTML=bar('PUE',P,tp,1.0,1.7,v=>v.toFixed(2),'low',[[1.35,'IndiaAI 1.35'],[1.25,'SG / CN 1.25'],[1.2,'DE 1.2']])+
   bar('WUE, L/kWh',Wv,T.w,0,2,v=>v.toFixed(2),'low',[[.58,'STT India 0.58']])+
   bar('Hourly clean power',F,T.f,0,100,v=>v.toFixed(0)+'%','high',[])+
   bar('CUE, kg/IT-kWh',cue,T.c,0,1.3,v=>v.toFixed(2),'low',[]);
  $('#rc3-t').innerHTML=`<thead><tr><th>Archetype</th><th>PUE mild / humid / arid</th><th>WUE</th><th>Freshwater</th><th>CFE 2030</th><th>CUE</th><th>Heat reuse</th></tr></thead><tbody>`+Object.entries(TG).map(([k,t])=>`<tr class="${k===a?'on':''}"><th>${t.n}</th><td class="mono">${t.p.map((v,i)=>i===rcl&&k===a?`<b>${v.toFixed(2)}</b>`:v.toFixed(2)).join(' / ')}</td><td class="mono">≤${t.w}</td><td>${t.fr}</td><td class="mono">≥${t.f}%</td><td class="mono">≤${t.c}</td><td>${t.e}</td></tr>`).join('')+'</tbody>';
}
['rc3-a','rc3-p','rc3-w','rc3-f'].forEach(id=>$('#'+id).addEventListener('input',rc3));seg('rc3-c',d=>{rcl=+d.v;rc3()});
/* ===== 4–9 design blocks ===== */
const CLIM=[['Mild plateau','Bengaluru · Pune · Hyderabad','~35–40 °C dry-bulb / ~23–25 °C wet-bulb','Liquid to dry coolers at W32–W40; air halls with indirect evaporative only on peak hours','Treated water for any evaporation; WUE below 0.2','--good'],
 ['Hot-humid coast','Mumbai · Chennai · Kolkata · Vizag','~35–38 °C / ~28–29 °C','High-temperature liquid (W40–W45) + dry coolers; magnetic-bearing chillers as trim','Desalinated or treated water; seawater once-through only after a marine EIA; no towers on drinking water','--cold'],
 ['Hot-arid','NCR · Jamnagar · Rajasthan · Ahmedabad/GIFT','~44–47 °C / ~26–28 °C','Dry coolers oversized for 47 °C+; adiabatic assist for short peaks only; dust filtration','Zero groundwater; desalination in Gujarat; storage sized for April–June peaks','--hot']];
function rc4(){$('#rc4').innerHTML=CLIM.map(([n,c,t,h,w,col])=>`<div class="rc-cc" style="border-top-color:var(${col})"><b>${n}</b><small>${c}</small><span class="mono xs">${t} (0.4% design, est.)</span><div><span class="fieldlbl">Heat rejection</span>${h}</div><div><span class="fieldlbl">Water</span>${w}</div></div>`).join('')}
const L=(id,arr)=>{$(id).innerHTML=arr.map(([t,d])=>`<div><b>${t}</b><span>${d}</span></div>`).join('')};
const ELEC=[['Redundancy','2N for colocation SLAs; N+1 or block-redundant for hyperscale and AI, which can lose part of a hall and resume from checkpoints.'],['Medium voltage','33 kV internal rings above 50 MW; plan 800 V or ±400 V DC busways for future 200–600 kW racks.'],['UPS and batteries','Li-ion (LFP) UPS plus a separate grid-scale battery for frequency response, peak shaving and firming renewables. The 100% transmission-charge waiver for co-located storage ends June 2028.'],['Grid-forming','Grid-forming inverters on batteries; meet CEA\'s draft ride-through rules for 50 MW+ loads now, before they bind.'],['Backup','HVO-compatible diesel gensets; gas engines only as backup or flexibility above 200 MW, never as baseload.'],['Power swings','Rack-level capacitors or batteries and GPU power capping keep training-load ramps within DISCOM limits.']];
const WAT=[['1','Closed loop, no evaporation','Liquid cooling to dry coolers'],['2','Treated sewage water (TSE)','e.g. Hoskote, 60 MLD'],['3','Desalinated seawater','coastal sites'],['4','Surface water','with a drought-curtailment clause'],['5','Fresh groundwater','never in over-exploited, critical or semi-critical units']];
function rc6(){$('#rc6').innerHTML=WAT.map(([n,t,d],i)=>`<div class="rc-rung" style="--w:${100-i*12}%;--c:var(${i<2?'--good':i<4?'--warn':'--bad'})"><span class="mono">${n}</span><b>${t}</b><small>${d}</small></div>`).join('')}
const HAZ=[['Seismic','Design for the stricter of IS 1893:2016 and the withdrawn 2025 values, importance factor 1.5; restrain raised floors, busways, manifolds and battery racks; keep primary campuses out of Zone V.'],['Flood','Floor level and all MV, UPS and battery rooms ≥1 m above the higher of the 1-in-100-year and highest recorded flood (Mumbai 2005, Chennai 2015/2023); nothing critical in basements.'],['Cyclone','Envelope, louvres, rooftop coolers and solar to IS 875 (Part 3) wind speeds plus uplift margin; storm-surge setbacks; 72–96 h of fuel on site.'],['Heat','Size heat rejection for today\'s extremes + 2 °C on the design dry-bulb.'],['Fire','Li-ion rooms in 2-hour construction with off-gas detection and deflagration venting (NFPA 855); leak detection at liquid manifolds; NBC 2016 is the floor, not enough.'],['Embodied carbon','30–50% GGBS or fly-ash in cement, recycled steel, a design-stage life-cycle assessment; report embodied carbon per MW.']];
const HEAT=[['Absorption chilling','Heat pumps lift 45–60 °C return water to 80–90 °C to drive chillers for offices or cold chains.'],['District cooling','GIFT City already runs a network; the natural first pilot.'],['Process heat','Food processing, dairy pasteurisation, laundries, pharma drying, desalination pre-heat at Jamnagar or Vizag.'],['Agriculture','Grain and spice drying, aquaculture in tier-2 parks.']];
const PROC=[['In-state group captive','26% equity in solar + wind + battery; interstate supply only where co-located storage still earns the waiver.'],['Hourly matching','Contract 24×7 clean power, not annual certificates; chapter 16 shows an hourly-optimised mix beats the grid on cost and water.'],['Model banking rules','Tamil Nadu charges 8% in kind and bars third-party banking; Gujarat ₹1–1.50/unit. These matter more than headline subsidies.'],['Use price spreads','Run battery arbitrage and flexible AI scheduling against exchange prices (chapter 8).']];
/* ===== 10 framework ===== */
const FW=[['MeitY Draft DC Policy 2020','Never notified; consultations revived Aug 2025 (single window, 4 economic zones)','No binding framework, efficiency standard or water rule','bad'],
 ['Infrastructure status','Data centres included (2022)','Financing benefit not tied to performance','warn'],
 ['Budget 2026–27 tax holiday to 2047','Enacted; "specified DC" scheme reported not yet issued','Could carry PUE/WUE/CFE conditions; none announced','warn'],
 ['DPDP Act 2023 + Rules 2025','Notified Nov 2025; cross-border rule from 13 May 2027','Blacklist model; sector rules (RBI) still localise','warn'],
 ['IndiaAI Mission','₹10,372 crore; 38,000+ GPUs; ~₹65/GPU-hour','PUE < 1.35 only; no WUE, clean-power or disclosure terms','warn'],
 ['BEE / ECBC','General building codes','No data-centre label, benchmark or reporting','bad'],
 ['CEA connectivity regulations 2026','Draft; comments closed 2 Sep 2026','Technical only; no flexibility or cost-allocation rules','warn'],
 ['Green Energy Open Access Rules 2022','In force; states diverge','No hourly certificate; banking rules vary','warn'],
 ['ISTS waiver','Graded phase-out; 100% for co-located storage to June 2028','Data centres not a distinct category','warn'],
 ['CGWA groundwater guidelines','In force (2020, amended 2023)','No WUE disclosure; MSME exemption could be gamed','warn'],
 ['EIA Notification 2006','Data centres generally not listed','1 GW campuses escape cumulative impact assessment','bad'],
 ['NBC 2016 / fire norms','In force','Inadequate for Li-ion and liquid cooling at scale','warn'],
 ['E-Waste Rules 2022','In force (EPR)','No server reuse targets','warn'],
 ['PLI IT Hardware 2.0, Semiconductor Mission','In force','Weak link to data-centre equipment','warn']];
function rc10(){$('#rc10').innerHTML=`<thead><tr><th>Instrument</th><th>Status</th><th>Gap for data centres</th></tr></thead><tbody>`+FW.map(([a,b,c,s])=>`<tr><th>${a}</th><td>${b}</td><td><span class="rc-st ${s}">${s==='bad'?'missing':'partial'}</span> ${c}</td></tr>`).join('')+'</tbody>'}
/* ===== 11 international ===== */
const TOOLS=['Mandatory disclosure','Efficiency floor','Water rules or pricing','Grid connection conditions','Heat reuse','Capacity allocation / zoning'];
const INT=[['EU',[[2,'Delegated Reg. 2024/1364: PUE, WUE, ERF, REF to a public database from 500 kW'],[1,'Draft rating: A ≤1.15 … G >1.90'],[1,'WUE reported; draft label A ≤0.10'],[0,''],[1,'ERF reported; waste-heat cost-benefit analysis above 1 MW'],[0,'']]],
 ['Germany',[[2,'EU reporting applies'],[2,'EnEfG: new DCs from 1 Jul 2026 PUE ≤1.2; existing ≤1.5 (2027), ≤1.3 (2030)'],[0,''],[1,'Renewable electricity requirement'],[2,'ERF 10% (2026), 15% (2027), 20% (2028)'],[0,'']]],
 ['Singapore',[[1,'Green DC Roadmap reporting'],[2,'DC-CFA2: PUE ≤1.25 at full load to win capacity'],[0,''],[2,'Capacity rationed (≥200 MW in CFA2)'],[0,''],[2,'Competitive capacity calls']]],
 ['Ireland',[[0,''],[0,''],[0,''],[2,'CRU 2025: ≥10 MVA needs dispatchable generation/storage = import capacity, market participation, 80% additional RE'],[0,''],[1,'Connection policy steers location']]],
 ['Netherlands',[[0,''],[0,''],[0,''],[0,''],[0,''],[2,'Amsterdam pause 2019–20; hyperscale limited to designated areas (2022) — not re-verified']]],
 ['Malaysia (Johor)',[[1,'Approval vetting'],[1,'PUE thresholds in vetting'],[2,'DC water tariff RM5.33/m³; reclaimed water for new DCs; pause on water-cooled expansion'],[2,'National task force checks power and water capacity'],[0,''],[1,'Expansion pauses']]],
 ['US · Texas',[[1,'Disclose duplicate requests and backup generation'],[0,''],[0,''],[2,'SB 6: ≥75 MW pay ≥$100k study fee, curtailable in load shed'],[0,''],[0,'']]],
 ['US · Virginia',[[0,''],[0,''],[0,''],[1,'Large-load tariff class, minimum-demand charges — not re-verified'],[0,''],[0,'']]],
 ['China',[[1,'National reporting under the action plan'],[2,'New large DCs ≤1.25; hub nodes ≤1.2; national average <1.5'],[0,''],[1,'>80% renewable at hub nodes'],[0,''],[2,'National hub nodes steer siting']]],
 ['Japan',[[0,''],[0,''],[0,''],[1,'Watt-bit council: plan DCs near decarbonised power'],[0,''],[2,'Joint power–telecom zone planning']]],
 ['India today',[[0,'No mandatory reporting; one operator publishes audited WUE'],[1,'IndiaAI tender PUE < 1.35 (procurement only)'],[1,'CGWA general guidelines; Karnataka WUE reporting'],[1,'CEA draft technical standards only'],[0,'None'],[1,'DC economic zones proposed; Karnataka parks']]]];
let i11=[10,0];
function rc11(){const S=['<svg viewBox="0 0 18 18" width="16" height="16"><line x1="4" x2="14" y1="9" y2="9" stroke="currentColor" stroke-width="2"/></svg>','<svg viewBox="0 0 18 18" width="16" height="16"><circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 2 A7 7 0 0 0 9 16 Z" fill="currentColor"/></svg>','<svg viewBox="0 0 18 18" width="16" height="16"><circle cx="9" cy="9" r="8" fill="currentColor"/></svg>'],C=['var(--muted)','var(--warn)','var(--good)'];
  $('#rc11').innerHTML=`<thead><tr><th></th>${TOOLS.map(t=>`<th>${t}</th>`).join('')}</tr></thead><tbody>`+INT.map(([n,v],r)=>`<tr class="${n==='India today'?'rc-in':''}"><th>${n}</th>${v.map(([s,t],c)=>`<td><button type="button" class="rc-ib${i11[0]===r&&i11[1]===c?' on':''}" data-r="${r}" data-c="${c}" style="color:${C[s]}" aria-label="${n}, ${TOOLS[c]}">${S[s]}</button></td>`).join('')}</tr>`).join('')+'</tbody>';
  const [n,v]=INT[i11[0]],[s,t]=v[i11[1]];$('#rc11-d').innerHTML=`<b>${n} · ${TOOLS[i11[1]]}:</b> ${t||'No such rule.'} <span class="xs muted vs-lg"><span style="color:var(--good)">${S[2]}</span> in force <span style="color:var(--warn)">${S[1]}</span> partial / draft <span style="color:var(--muted)">${S[0]}</span> none</span>`;}
$('#rc11').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;i11=[+b.dataset.r,+b.dataset.c];rc11()});
/* ===== 12 roadmap ===== */
const PR=[['P1','National Data Centre Policy with a statutory backbone','MeitY','MoP, MoEFCC, Jal Shakti, DoT, MoF','Framework',0,12,'Define categories; single-window portal replacing 30+ permissions; designate economic zones; make the "specified DC" tax holiday conditional on P2–P4. Set floors, not ceilings, to respect state autonomy.'],
 ['P2','Mandatory, assured disclosure to a national registry','BEE','MeitY, CEA','Standards',6,24,'DCs ≥500 kW IT report PUE, WUE (withdrawal/consumption, by source), peak-day water, CUE, hourly CFE, REF, ERF and utilisation, with accredited-auditor assurance; align with ISO/IEC 30134 and EU 2024/1364.'],
 ['P3','WUE and hourly clean power in public compute tenders','MeitY (IndiaAI)','NIC, GeM','Standards',0,6,'Keep PUE < 1.35, tighten to ≤1.30 by 2028; add WUE ≤0.5, zero groundwater in stressed units, hourly CFE disclosure; score bids on ₹/GPU-hour and a sustainability index.'],
 ['P4','Minimum performance standards with a glide path','BEE','MeitY','Standards',12,48,'New builds from 2028: PUE ≤1.30 hot-humid, ≤1.25 elsewhere; AI campuses >50 MW ≤1.20 by 2030; existing ≤1.50 by 2030, ≤1.40 by 2033. Rack-level IT metering to stop gaming.'],
 ['P5','Statutory water hierarchy','Jal Shakti / CGWA','MoEFCC, state water boards, ULBs','Water',6,18,'No fresh groundwater for cooling in over-exploited, critical or semi-critical units (close the MSME loophole); TSE or desal first; full-cost DC water tariffs; drought-curtailment plans; online water audits for all DCs.'],
 ['P6','Large-load grid connection regime','CEA, CERC','SERCs, CTU, STUs, DISCOMs','Grid & power',12,24,'Large load = 50 MW+. Study fee and security against speculative queue entries; disclose duplicate applications; curtailability and power smoothing; co-located storage in constrained nodes; dedicated tariff class; a public nodal headroom map.'],
 ['P7','Make 24×7 clean power procurable','MoP','CERC, SERCs, SECI, Grid-India','Grid & power',12,24,'RTC/FDRE tenders open to DCs; hourly green certificates; cap banking charges and allow third-party banking above 10 MW; extend storage waiver logic past June 2028 with a sunset.'],
 ['P8','Outcome-based incentives with sunset clauses','State IT departments','DISCOMs, NITI Aayog','Incentives & land',0,60,'Pay for verified PUE ≤1.20, WUE ≤0.2, hourly CFE ≥70%, ERF > 0; claw back after two missed years; national incentive code of conduct; 5–7 year sunsets with published reviews.'],
 ['P9','Green DC zones with shared infrastructure','States, MeitY','CTU/STUs, ULBs','Incentives & land',24,60,'Build 400/220 kV substations, renewable pooling, treated-water or desal pipelines and diverse fibre ahead of demand: Vizag–Anakapalli, Jamnagar, Hoskote/Tumakuru, Navi Mumbai–Panvel, Noida/YEIDA, Hyderabad–Shamshabad, Bhubaneswar–Paradip.'],
 ['P10','Environmental assessment for campuses >100 MW','MoEFCC','State SEIAAs','Environment & safety',0,12,'List large DC campuses in the EIA schedule with cumulative power–water assessment and public consultation; standard terms of reference and a 120-day timeline.'],
 ['P11','Heat-reuse readiness','BEE','MoHUA, state IDCs, GIFT City','Environment & safety',12,36,'Feasibility study for ≥10 MW sites; ERF disclosure; concessional finance for absorption chilling, process heat and district cooling.'],
 ['P12','Fire codes for Li-ion and liquid cooling','BIS (NBC)','State fire services','Environment & safety',6,18,'NBC Part 4 amendment or BIS standard aligned with NFPA 855; liquid-cooling fluid classes; leak detection; firefighter access for multi-storey DCs; training.'],
 ['P13','Circularity under the E-Waste Rules','MoEFCC / CPCB','MeitY','Environment & safety',12,36,'Server and GPU refurbishment targets; DPDP-compliant data sanitisation; battery second life; disclose tonnage retired and reused.'],
 ['P14','Calibrated data sovereignty','MeitY','RBI, SEBI, IRDAI','Framework',0,7,'Keep the DPDP blacklist approach; publish the Section 16 negative list well before May 2027; pair sovereign workloads with the strictest efficiency and disclosure rules.'],
 ['P15','Local manufacturing and supply chain','MeitY, DPIIT','ISM, MoF (customs)','Industry & people',12,36,'Extend PLI to transformers, switchgear, CDUs, dry coolers, LFP packs; rationalise duties on items not made in India; disclose domestic value-add in IndiaAI scoring.'],
 ['P16','Skills','MSDE','ESSC, AICTE','Industry & people',6,24,'National curriculum for DC technicians and critical-facility engineers (liquid cooling, MV switching, battery safety), with tier-2 training centres at DC parks.'],
 ['P17','Community benefit and transparency','States, ULBs','—','Governance',0,12,'Publish water and power allocations per project; public hearings above 50 MW; ring-fence a share of DC water and electricity-duty revenue for local water infrastructure.'],
 ['P18','Monitoring, review and sunset','MeitY, NITI Aayog','BEE','Governance',12,60,'An annual "State of Indian Data Centres" report from registry data; review incentives every three years and sunset those without verified results.']];
const THEMES=['All',...new Set(PR.map(p=>p[4]))];
const TC={'Framework':'--cold','Standards':'--good','Water':'--chill','Grid & power':'--spark','Incentives & land':'--hot','Environment & safety':'--heat','Industry & people':'--warn','Governance':'--muted'};
const AG=[...new Set(PR.flatMap(p=>[...p[2].split(/, | \/ /),...p[3].split(/, /)]).map(s=>s.replace(/ \(.*\)/,'').trim()).filter(s=>s&&s!=='—'))].sort();
let pt='All',pa='',psel='P3';
$('#rc12-t').innerHTML=THEMES.map(t=>`<button data-v="${t}" aria-pressed="${t==='All'}">${t}</button>`).join('');
$('#rc12-a').innerHTML=`<option value="">All agencies</option>`+AG.map(a=>`<option>${a}</option>`).join('');
function rc12(){
  const el=$('#rc12'),W=cw(el),L=W<520?40:250,R=10,T=26,rh=24,P=PR.filter(p=>(pt==='All'||p[4]===pt)&&(!pa||(p[2]+', '+p[3]).includes(pa)));
  const H=T+Math.max(1,P.length)*rh+24,X=m=>L+m/60*(W-L-R);
  let o='';const Y0=W<520?["Oct '26","'27","'28","'29","'30","Oct '31"]:['Oct 2026','2027','2028','2029','2030','Oct 2031'];
  for(let m=0;m<=60;m+=12)o+=`<line x1="${X(m)}" x2="${X(m)}" y1="${T-6}" y2="${H-20}" stroke="var(--line)" stroke-width=".6"/><text x="${X(m)}" y="${T-10}" text-anchor="${m===0?'start':m===60?'end':'middle'}">${Y0[m/12]}</text>`;
  [[7,'DPDP cross-border rules · May 2027'],[20,'Storage waiver ends · Jun 2028']].forEach(([m,t],i)=>{o+=`<line x1="${X(m)}" x2="${X(m)}" y1="${T-4}" y2="${H-20}" stroke="var(--bad)" stroke-dasharray="3 3"/><text x="${X(m)+(i?4:-4)}" y="${H-6}" text-anchor="${i?'start':'end'}" style="fill:var(--bad)" class="halo">${W<520?(i?'Jun 28':'May 27'):t}</text>`});
  P.forEach((p,i)=>{const y=T+i*rh,on=p[0]===psel,c=TC[p[4]];
    o+=`<g class="tb" data-p="${p[0]}" style="cursor:pointer"><rect x="0" y="${y}" width="${W}" height="${rh}" fill="${on?'var(--cold-soft)':'transparent'}"/><text x="${L-8}" y="${y+rh/2+4}" text-anchor="end" style="fill:var(--ink);font-weight:${on?700:500}">${W<520?p[0]:p[0]+' · '+(p[1].length>34?p[1].slice(0,33)+'…':p[1])}</text><rect x="${X(p[5])}" y="${y+5}" width="${Math.max(6,X(p[6])-X(p[5]))}" height="${rh-10}" rx="4" fill="var(${c})" opacity="${on?1:.75}"/>${p[0]==='P18'?[12,24,36,48,60].map(m=>`<circle cx="${X(m)}" cy="${y+rh/2}" r="3.5" fill="var(--surface)" stroke="var(--ink)"/>`).join(''):''}</g>`});
  if(!P.length)o+=`<text x="${W/2}" y="${T+16}" text-anchor="middle">No recommendations match</text>`;
  el.innerHTML=svg(W,H,o);
  const d=PR.find(p=>p[0]===psel);$('#rc12-d').innerHTML=`<div class="ka-card"><div><b>${d[0]} · ${d[1]}</b> <span class="chip" style="color:var(${TC[d[4]]})">${d[4]}</span></div><p class="small" style="margin:0">${d[7]}</p><div class="small"><b>Lead:</b> ${d[2]} · <b>Supporting:</b> ${d[3]} · <b>Timing:</b> month ${d[5]}–${d[6]} from Oct 2026</div></div>`;
}
seg('rc12-t',d=>{pt=d.v;rc12()});$('#rc12-a').addEventListener('change',e=>{pa=e.target.value;rc12()});
$('#rc12').addEventListener('click',e=>{const g=e.target.closest('[data-p]');if(!g)return;psel=g.dataset.p;rc12()});
/* ===== 13 agencies ===== */
function rc13(){const cnt={};PR.forEach(p=>{p[2].split(/, | \/ /).forEach(a=>{a=a.replace(/ \(.*\)/,'').trim();cnt[a]=cnt[a]||[0,0];cnt[a][0]++});p[3].split(/, /).forEach(a=>{a=a.replace(/ \(.*\)/,'').trim();if(!a||a==='—')return;cnt[a]=cnt[a]||[0,0];cnt[a][1]++})});
  const E=Object.entries(cnt).sort((a,b)=>(b[1][0]*2+b[1][1])-(a[1][0]*2+a[1][1])).slice(0,12),mx=Math.max(...E.map(e=>e[1][0]+e[1][1]));
  $('#rc13').innerHTML=E.map(([a,[l,s]])=>`<div class="hbar"><span>${a}</span><div class="track" style="display:flex"><div class="fill hot" style="width:${l/mx*100}%"></div><div class="fill" style="width:${s/mx*100}%;opacity:.5;border-radius:0 3px 3px 0"></div></div><span class="val">${l} + ${s}</span></div>`).join('')+`<div class="xs muted">Amber: leads · teal: supports</div>`;}
const STATES=[['Water-stressed metro states','Karnataka, Tamil Nadu, Delhi-NCR/UP, Telangana: incentives only for zero-freshwater designs; treated water allocated first. Tamil Nadu should notify a successor policy with PUE/WUE conditions and fix its 2025 banking rules; Telangana should replace its 2016 policy.'],['Renewable-rich states','Gujarat, Rajasthan, Andhra Pradesh, interior Karnataka, Odisha: market "renewables + land + water" campuses with pre-built 400 kV substations and desal or treated water; compete on readiness, not tariff discounts.'],['Maharashtra','Restore a rising green-power path (51% now, 75% by 2030, hourly) instead of a fixed 51% floor, and attach WUE conditions to the ₹1/unit concession.'],['UP and the east','Use DC policies to anchor edge and sovereign capacity for underserved regions, prioritising reliability and fibre.']];
window.__RC={HUBS,CR,get rw(){return rw},get rsel(){return rsel}};
rc1w();rc1();rc2();rc3();rc4();L('#rc5',ELEC);rc6();L('#rc7',HAZ);L('#rc8',HEAT);L('#rc9',PROC);rc10();rc11();rc12();rc13();L('#rc14',STATES);
let rt=null,lw=window.innerWidth;window.addEventListener('resize',()=>{if(Math.abs(window.innerWidth-lw)<8)return;lw=window.innerWidth;clearTimeout(rt);rt=setTimeout(rc12,150)});
}
