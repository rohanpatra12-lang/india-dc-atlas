
/* ---------- 3 COOLING ---------- */
hbars($('#fluid-bars'),[['Air',1.2,'mut','1.2'],['Dielectric oil (1-phase)',1750,'','1,750'],['Two-phase fluid (sensible)',1850,'','1,850'],['PG25 coolant',4000,'','4,000'],['Water',4180,'','4,180']],{log:true,lo:-0.3});
const fwc=[{n:'Bengaluru',db:35,wb:23},{n:'Hyderabad',db:41,wb:26},{n:'Pune',db:39,wb:25},{n:'Mumbai',db:35,wb:28},{n:'Chennai',db:38,wb:29},{n:'Visakhapatnam',db:36,wb:28},{n:'Delhi NCR',db:45,wb:29}];
function fw(){const t=val('fw');out('fw',t+' °C');const cls=t<=17?'W17':t<=27?'W27':t<=32?'W32':t<=40?'W40':t<=45?'W45':'W+';
  $('#fw-class').innerHTML=`ASHRAE class <b class="mono">${cls}</b>. ${t>=40?'Nvidia\'s Vera Rubin racks are designed for 45 °C inlet water: "no water chillers are necessary."':t>=32?'Towers or dry coolers do most of the work; chillers trim the peak.':'Cold water needs chillers most of the year, with economisers in winter.'}`;
  $('#fw-cities').innerHTML=fwc.map(c=>{const dry=c.db+7,ad=c.wb+0.3*(c.db-c.wb)+7,tw=c.wb+4;let k,s;if(dry<=t){k='ok';s='Dry coolers only'}else if(ad<=t){k='ad';s='Adiabatic assist on peak'}else if(tw<=t){k='tw';s='Evaporative tower'}else{k='ch';s='Chiller at peak'}return `<div class="city ${k}"><b>${c.n}</b><span>design ${c.db} °C dry / ${c.wb} °C wet</span><span class="st">${s}</span></div>`}).join('');}
$('#fw').addEventListener('input',fw);fw();

let cw='high',cc='plateau';
const room=[['Perimeter air (CRAH)',15],['Air + containment',30],['Active rear-door HX',70],['Direct-to-chip liquid',250],['Immersion',250]];
function cool(){
  const d=val('cd');out('cd',d+' kW');let inner,outer,key,wue;
  if(d>40){inner='Single-phase direct-to-chip cooling (cold plates, PG25, CDU) with RDHx for the residual';if(cw==='high'||cc==='hot'){outer='Run facility water warm (W40–W45) and reject heat with dry coolers; no chillers most of the year.';key='dlc';wue='0–0.1'}else{outer='Dry coolers with adiabatic assist on the hottest hours.';key='adiabatic';wue='0.1–0.5'}}
  else if(d>15){inner='Active rear-door heat exchangers or in-row coolers, with containment';if(cw==='high'){outer='Dry coolers; any evaporative trim on treated water only.';key='dry';wue='~0–0.2'}else{outer='Adiabatic or hybrid dry coolers.';key=cw==='med'?'hybrid':'adiabatic';wue='0.1–0.7'}}
  else{inner='Air with hot-aisle containment and supply air up to 27 °C';if(cw==='low'&&cc!=='hot'){outer='Cooling towers are acceptable if fed with treated wastewater; add indirect evaporative economisers.';key='tower';wue='1.4–2.0'}else if(cw==='med'){outer='Adiabatic dry coolers with indirect evaporative economisers.';key='adiabatic';wue='0.1–0.5'}else{outer='Dry coolers or air-cooled free-cooling chillers.';key='dry';wue='~0'}}
  if(cc==='coastal'&&d>15)outer+=' On the coast, seawater heat exchange can replace towers for W32–W45 loops.';
  const tipc=cc==='plateau'?'Bengaluru design wet-bulb ~23 °C: free cooling for many hours a year.':cc==='coastal'?'Monsoon wet-bulb near 28–32 °C limits evaporative cooling; warm liquid loops still reject heat easily.':'Hot dry air favours evaporation but water is scarce; budget for the dry-cooler energy penalty.';
  $('#cool-rec').innerHTML=`<dl><dt>In the room</dt><dd>${inner}</dd><dt>Heat rejection</dt><dd>${outer}</dd><dt>Expected WUE</dt><dd class="mono">${wue} L/kWh</dd><dt>Climate note</dt><dd>${tipc}</dd></dl>`;
  $$('#heat-tbl tbody tr').forEach(r=>r.classList.toggle('hl',r.dataset.k===key||(cc==='coastal'&&d>15&&r.dataset.k==='sea')));
  hbars($('#room-bars'),room.map(([n,lim])=>[n,lim,d<=lim?'':'heat',(d<=lim?'✓ ':'✗ ')+lim]),{max:250,head:'<span class="xs muted">Practical kW-per-rack ceiling; ✗ means your rack is beyond it.</span>'});
}
$('#cd').addEventListener('input',cool);seg('cw',d=>{cw=d.v;cool()});seg('cc',d=>{cc=d.v;cool()});cool();

reg('c-lcmkt',()=>({type:'bar',data:{labels:['2024','2025','2029 (proj.)'],datasets:[{data:[1.5,3,7],backgroundColor:[A(T('--cold'),.6),T('--cold'),T('--hot')],borderRadius:5}]},options:base({scales:{y:{title:{display:true,text:'US$ bn'},grid:grid()},x:{grid:{display:false}}}})}));
hbars($('#mna-bars'),[['Eaton → Boyd Thermal',9.5,'hot','$9.5 bn'],['Ecolab → CoolIT',4.75,'hot','$4.75 bn'],['Vertiv → PurgeRite',1,'','~$1 bn'],['Schneider → Motivair',0.85,'','$0.85 bn'],['Trane → LiquidStack',0.5,'mut','n/d']],{max:9.5});
