
/* ---------- 12 WATER & ENERGY ---------- */
{
const NS='http://www.w3.org/2000/svg';
const f1=v=>fmt(v,1),f2=v=>fmt(v,2);
/* ===== 1 power vs water ===== */
const TECH=[
 ['Chillers + open cooling towers','ev',1.5,2.5,1.35,1.60,'Wet-bulb; coastal design ~28–29 °C','Baseline','Mature; highest water use (LBNL)'],
 ['Waterside economiser + towers','ev',1.0,2.0,1.15,1.35,'Wet-bulb','+0–10%','Mature; "consumes substantial water" (LBNL)'],
 ['Direct evaporative (air-side)','hy',0.3,1.2,1.10,1.25,'Needs low wet-bulb and clean air','+0–10%','Limited fit in India'],
 ['Indirect evaporative (IEC)','hy',0.3,1.0,1.15,1.30,'Wet-bulb; no outside air in the hall','+15–30%','Mature'],
 ['Adiabatic / hybrid dry coolers','hy',0.2,0.8,1.20,1.40,'Runs wet above ~26–30 °C dry-bulb','+10–20%','Mature'],
 ['Air-cooled chillers','dr',0,0.05,1.45,1.75,'Dry-bulb; 45 °C+ Delhi peaks derate them','−5 to −10%','Mature; "no water, more energy" (LBNL)'],
 ['Dry coolers + chiller trim (air IT)','dr',0,0.05,1.30,1.55,'Dry-bulb','+5–15%','Mature'],
 ['Direct-to-chip liquid + dry coolers','dr',0,0.05,1.10,1.25,'Dry-bulb vs warm water (W32–W45)','+15–30%','Mainstream for GB200 (~120 kW racks)'],
 ['Immersion, single-phase','dr',0,0.05,1.05,1.15,'Dry-bulb','+20–40%','Growing'],
 ['Seawater heat exchange','sw',0,0.02,1.15,1.30,'Sea at 27–31 °C off India','High (CRZ, intake/outfall)','Coastal hyperscalers (CEEW)']];
const TC_={ev:'--cold',hy:'--good',dr:'--hot',sw:'--chill'},TCN={ev:'Evaporative',hy:'Hybrid / adiabatic',dr:'Dry or liquid',sw:'Seawater'};
const FLEET=[['Microsoft global FY25',0.27,1.17,9,16,'start'],['Microsoft Asia-Pacific FY25',0.25,1.28,9,12,'start'],['NTT DATA portfolio FY24',0.72,1.38,9,16,'start'],['US average 2023 (LBNL)',0.36,1.40,9,-7,'start'],['Google (PUE 2025, WUE 2024)',1.15,1.09,9,4,'start']];
let m1='site',sel1=0;
function wp1(){
 const E=val('wp1-e'),src=m1==='src';out('wp1-e',E.toFixed(1)+' L/kWh');$('#wp1-e').disabled=!src;{const c=$('#wp1-e').closest('.ctrl');if(c)c.style.opacity=src?1:.45}
 const W=Math.max(330,Math.min(640,$('#wp1').clientWidth||640)),H=W<500?330:380,L=44,R=12,Tp=12,B=40,pw=W-L-R,ph=H-Tp-B;
 const bx=TECH.map(t=>{let x0=t[2],x1=t[3];if(src){x0=t[2]+t[4]*E;x1=t[3]+t[5]*E}return {t,x0,x1,y0:t[4],y1:t[5]}});
 const xmax=src?Math.ceil(Math.max(...bx.map(b=>b.x1),...FLEET.map(f=>f[1]+f[2]*E))+.5):3;
 const X=v=>L+v/xmax*pw,Y=v=>Tp+(1.8-v)/(0.8)*ph;
 let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">`;
 for(let p=1.0;p<=1.801;p+=0.1){s+=`<line x1="${L}" x2="${W-R}" y1="${Y(p)}" y2="${Y(p)}" stroke="var(--line)" stroke-width=".6"/><text x="${L-6}" y="${Y(p)+4}" text-anchor="end">${p.toFixed(1)}</text>`}
 const st=xmax>6?2:0.5;for(let x=0;x<=xmax+1e-9;x+=st){s+=`<line x1="${X(x)}" x2="${X(x)}" y1="${Tp}" y2="${H-B}" stroke="var(--line)" stroke-width=".4"/><text x="${X(x)}" y="${H-B+16}" text-anchor="middle">${x}</text>`}
 s+=`<text x="${L+pw/2}" y="${H-6}" text-anchor="middle" class="ax">${src?'Total water: on site + at power plants (L per kWh of IT)':'On-site water, WUE (L per kWh of IT)'}</text><text transform="translate(12 ${Tp+ph/2}) rotate(-90)" text-anchor="middle" class="ax">PUE (energy)</text>`;
 s+=`<line x1="${L}" x2="${W-R}" y1="${Y(1.54)}" y2="${Y(1.54)}" stroke="var(--muted)" stroke-dasharray="4 4"/><text x="${L+6}" y="${Y(1.54)-5}" class="halo">Global average PUE 1.54 (Uptime 2025)</text>`;
 bx.forEach((b,i)=>{const w=Math.max(X(b.x1)-X(b.x0),7);const on=i===sel1;
  s+=`<rect class="tb" data-i="${i}" x="${X(b.x0)}" y="${Y(b.y1)}" width="${w}" height="${Y(b.y0)-Y(b.y1)}" rx="3" fill="var(${TC_[b.t[1]]})" fill-opacity="${on?.45:.16}" stroke="var(${TC_[b.t[1]]})" stroke-width="${on?2.2:1}" tabindex="0" role="button" aria-label="${b.t[0]}"><title>${b.t[0]}</title></rect>`});
 const _mk=[];bx.forEach((b,i)=>{let cx=X(b.x0)+Math.max(X(b.x1)-X(b.x0),7)/2,cy=(Y(b.y0)+Y(b.y1))/2;for(const q of _mk)if(Math.hypot(q[0]-cx,q[1]-cy)<19){cx=q[0]+19}_mk.push([cx,cy]);s+=`<g class="tb" data-i="${i}" style="cursor:pointer"><circle cx="${cx}" cy="${cy}" r="9" fill="var(--surface)" stroke="var(${TC_[b.t[1]]})" stroke-width="1.5"/><text x="${cx}" y="${cy+4}" text-anchor="middle" style="fill:var(--ink);font-weight:700">${i+1}</text></g>`});
 FLEET.forEach(f=>{const x=X(f[1]+(src?f[2]*E:0)),y=Y(f[2]);s+=`<path d="M${x} ${y-6}L${x+6} ${y}L${x} ${y+6}L${x-6} ${y}Z" fill="var(--ink)"><title>${f[0]}: WUE ${f[1]}, PUE ${f[2]}</title></path><text x="${x+f[3]}" y="${y+f[4]}" text-anchor="${f[5]}" class="halo fl" style="fill:var(--ink)">${f[0]}</text>`});
 s+='</svg>';$('#wp1').innerHTML=s;
 const t=TECH[sel1],b=bx[sel1];
 $('#wp1-d').innerHTML=`<div class="wpleg">${TECH.map((t,i)=>`<button type="button" class="wpk${i===sel1?' on':''}" data-i="${i}"><i style="border-color:var(${TC_[t[1]]});background:${i===sel1?`var(${TC_[t[1]]})`:'transparent'}">${i+1}</i>${t[0]}</button>`).join('')}</div>
 <p style="margin-top:8px"><b>${sel1+1}. ${t[0]}</b> <span class="chip">${TCN[t[1]]}</span> · on-site WUE ${t[2]}–${t[3]} L/kWh · PUE ${t[4].toFixed(2)}–${t[5].toFixed(2)}${src?` · total water <b>${f1(b.x0)}–${f1(b.x1)} L/kWh</b>`:''}<br><span class="muted">Climate driver: ${t[6]} · Capex vs baseline: ${t[7]} · ${t[8]}</span> ${window.__evTag?window.__evTag('e','Report 12 cooling table: engineering ranges for Indian climates, cross-checked with LBNL 2024'):''}</p><p class="xs muted">◆ = published fleet figures (${FLEET.map(f=>f[0]).join('; ')}). Bases differ: some are withdrawal, some consumption.</p>`}
const pick1=e=>{const g=e.target.closest('[data-i]');if(!g)return;sel1=+g.dataset.i;wp1()};
$('#wp1').addEventListener('click',pick1);$('#wp1-d').addEventListener('click',pick1);
$('#wp1').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick1(e)}});
seg('wp1-m',d=>{m1=d.v;wp1()});$('#wp1-e').addEventListener('input',wp1);

/* ===== 2 hourly ===== */
const TP=[31,29,27.5,28,32,36,38.5,40,39,35.5,33,32];
const Td=h=>{const i=Math.floor(h/2),f=(h%2)/2;return TP[i]+(TP[(i+1)%12]-TP[i])*f};
const PX=[6.0,5.0,4.0,3.9,3.8,4.1,4.5,3.4,2.0,1.6,1.3,1.17,1.2,1.3,1.5,1.9,3.0,4.6,6.5,7.6,9.0,9.2,9.9,6.8];
const CO={adi:{w:t=>t<26?0:Math.min(1.6,.1+.107*(t-26)),p:t=>1.22+.015*Math.max(0,t-25)},twr:{w:t=>1.9+.4*(t-27)/13,p:t=>1.30+.10*(t-27)/13},dry:{w:()=>.03,p:t=>1.15+.008*Math.max(0,t-25)}};
const IT2=42,PEN=0.10;let c2='adi',l2='mw';
function prof(cool,dry,s,e){return [...Array(24)].map((_,h)=>{const t=Td(h),c=CO[cool];let w=c.w(t),p=c.p(t);const inW=dry&&cool==='adi'&&h>=s&&h<e;if(inW){w=0;p+=PEN}return {h,t,w,p,kl:IT2*w,mw:IT2*p,px:PX[h],inW}})}
function wp2(){
 let s=val('wp2-s'),e=val('wp2-e');if(e<=s){e=s+1;$('#wp2-e').value=e}out('wp2-s',String(s).padStart(2,'0')+':00');out('wp2-e',String(e).padStart(2,'0')+':00');
 const can=c2==='adi',dry=$('#wp2-dry').checked&&can;$('#wp2-dry').disabled=!can;$('#wp2-win').style.opacity=dry?1:.45;
 const P0=prof(c2,false),P1=prof(c2,dry,s,e);
 const sum=(P,k)=>P.reduce((a,x)=>a+x[k],0),cost=P=>P.reduce((a,x)=>a+x.mw*x.px*1000,0)/1e5;
 const w0=sum(P0,'kl'),w1=sum(P1,'kl'),e0=sum(P0,'mw'),e1=sum(P1,'mw'),pk=P1.reduce((a,x)=>x.kl>a.kl?x:a,P1[0]),avgH=w1/24;
 const pk0=Math.max(...P0.map(x=>x.kl));
 let r=`<div><span class="v cold">${fmt(w1)} kL</span><span class="k">Water drawn in the day</span></div><div><span class="v">${f1(pk.kl)} kL/h</span><span class="k">Peak hour (${String(pk.h).padStart(2,'0')}:00)</span></div><div><span class="v">${avgH>0?f1(pk.kl/avgH)+'×':'—'}</span><span class="k">Peak hour ÷ this day's average hour</span></div>${c2==='adi'?`<div><span class="v">${f1(pk.kl/18)}×</span><span class="k">Peak hour ÷ the year's average hour (18 kL/h, Report 12)</span></div>`:''}<div><span class="v">${fmt(e1)} MWh</span><span class="k">Facility electricity in the day</span></div><div><span class="v">₹${f1(cost(P1))} lakh</span><span class="k">Day's power at exchange prices</span></div>`;
 if(dry){const dw=w0-w1,de=e1-e0,dc=cost(P1)-cost(P0);r+=`<div><span class="v good">−${fmt(dw)} kL</span><span class="k">Water saved (${Math.round(dw/w0*100)}%), peak hour ${f1(pk0)} → ${f1(pk.kl)} kL/h</span></div><div><span class="v heat">+${f1(de)} MWh</span><span class="k">Extra electricity, costing ₹${fmt(dc*1e5/1000,0)} thousand</span></div><div><span class="v">₹${dw>0?fmt(dc*1e5/dw):'—'}/kL</span><span class="k">Cost of each kL of water saved</span></div>`}
 if(!can&&$('#wp2-dry').checked)r+=`<div><span class="v">n/a</span><span class="k">"Dry at noon" only applies to adiabatic coolers</span></div>`;
 $('#wp2-r').innerHTML=r;build('c-wp2')}
reg('c-wp2',()=>{const dry=$('#wp2-dry').checked&&c2==='adi';const P0=prof(c2,false),P1=prof(c2,dry,val('wp2-s'),Math.max(val('wp2-e'),val('wp2-s')+1));
 const lk={mw:['Facility power (MW)',P1.map(x=>+x.mw.toFixed(1)),'--hot'],px:['Exchange price (₹/kWh)',P1.map(x=>x.px),'--heat'],t:['Temperature (°C)',P1.map(x=>+x.t.toFixed(1)),'--warn']}[l2];
 const ds=[];if(dry)ds.push({type:'bar',label:'Water without dry-at-noon (kL/h)',data:P0.map(x=>+x.kl.toFixed(1)),backgroundColor:A(T('--cold'),.18),borderColor:A(T('--cold'),.6),borderWidth:1,borderRadius:3,grouped:false,order:3,yAxisID:'y'});
 ds.push({type:'bar',label:'Water drawn (kL/h)',data:P1.map(x=>+x.kl.toFixed(1)),backgroundColor:P1.map(x=>x.inW?A(T('--good'),.7):T('--cold')),borderRadius:3,grouped:false,order:2,yAxisID:'y'});
 ds.push({type:'line',label:lk[0],data:lk[1],borderColor:T(lk[2]),backgroundColor:T(lk[2]),pointRadius:2,borderWidth:2.5,tension:.35,order:1,yAxisID:'y2'});
 return {data:{labels:[...Array(24)].map((_,h)=>String(h).padStart(2,'0')),datasets:ds},options:base({interaction:{mode:'index',intersect:false},plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{title:i=>i[0].label+':00'}})},scales:{x:{grid:{display:false},title:{display:true,text:'Hour of day'}},y:{beginAtZero:true,title:{display:true,text:'Water (kL/h)'},grid:grid()},y2:{position:'right',grid:{display:false},title:{display:true,text:lk[0]},beginAtZero:l2==='px'}}})}});
seg('wp2-c',d=>{c2=d.v;wp2()});seg('wp2-l',d=>{l2=d.v;build('c-wp2')});['wp2-s','wp2-e'].forEach(i=>$('#'+i).addEventListener('input',wp2));$('#wp2-dry').addEventListener('change',wp2);

/* ===== 3 annual ===== */
const NRM={hyd:['Hyderabad',[[29,15],[32,17],[36,21],[38,24],[40,26],[35,24],[31,22],[30,22],[31,22],[30,20],[29,17],[28,14]]],blr:['Bengaluru',[[27,15],[30,17],[33,19],[34,21],[33,21],[29,20],[28,19],[28,19],[28,19],[28,19],[27,17],[26,15]]],del:['Delhi NCR',[[21,8],[24,10],[30,15],[37,21],[40,26],[39,28],[35,27],[34,27],[34,25],[33,19],[28,13],[23,9]]],bom:['Mumbai',[[31,17],[32,18],[33,21],[33,24],[34,27],[32,26],[30,25],[30,25],[31,24],[33,23],[34,21],[32,19]]],maa:['Chennai',[[29,21],[31,22],[33,24],[35,26],[38,28],[37,27],[35,26],[35,26],[34,25],[32,24],[29,23],[29,22]]]};
const DM=[31,28,31,30,31,30,31,31,30,31,30,31],MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const shp=h=>{if(h>=5&&h<=15)return (1-Math.cos(Math.PI*(h-5)/10))/2;const x=h>15?h-15:h+9;return (1+Math.cos(Math.PI*x/14))/2};
let c3='hyd',m3='w',yr=null;
function annual(k){const N=NRM[k][1],hrs=[],grid=[];let W=0,E=0,wet=0,dry0=0;const mDay=[];
 for(let mo=0;mo<12;mo++){const row=[];let md=0;for(let h=0;h<24;h++){const t=N[mo][1]+(N[mo][0]-N[mo][1])*shp(h),w=CO.adi.w(t),p=CO.adi.p(t);row.push(IT2*w);md+=IT2*w;
   for(let d=0;d<DM[mo];d++){hrs.push({kl:IT2*w,mw:IT2*p});W+=w;E+=p;if(t>28)wet++;if(w===0)dry0++}}grid.push(row);mDay.push(md)}
 const n=hrs.length,avgDay=IT2*W/n*24;return {hrs,grid,wue:W/n,pue:E/n,wet,dry0,ml:IT2*W/1000,mwh:IT2*E,pkM:Math.max(...mDay)/avgDay,pkMo:MO[mDay.indexOf(Math.max(...mDay))]}}
function wp3(){yr=annual(c3);
 $('#wp3-r').innerHTML=`<div><span class="v cold">${f2(yr.wue)} L/kWh</span><span class="k">Annual on-site WUE (model)</span></div><div><span class="v">${fmt(yr.wet)}</span><span class="k">Wet-mode hours above 28 °C</span></div><div><span class="v">${fmt(yr.dry0)}</span><span class="k">Hours with no evaporation at all</span></div><div><span class="v">${f1(yr.pkM)}×</span><span class="k">Peak month (${yr.pkMo}) ÷ average, daily water</span></div><div><span class="v">${fmt(yr.ml,0)} ML</span><span class="k">Water a year (42 MW IT)</span></div><div><span class="v">${f2(yr.pue)}</span><span class="k">Annual PUE (model)</span></div>`;
 const mx=Math.max(...yr.grid.flat(),1),W=Math.max(300,Math.min(640,$('#wp3-hm').clientWidth||640)),H=Math.round(W*.5)+30,L=34,Tp=4,B=22,cw=(W-L-4)/24,ch=(H-Tp-B)/12;let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}" class="hm">`;
 yr.grid.forEach((row,mo)=>{s+=`<text x="${L-5}" y="${Tp+mo*ch+ch/2+4}" text-anchor="end">${MO[mo]}</text>`;row.forEach((v,h)=>{s+=`<rect x="${L+h*cw}" y="${Tp+mo*ch}" width="${cw-1}" height="${ch-1}" rx="2" fill="${v>0?'var(--cold)':'var(--sunk)'}" fill-opacity="${v>0?(.12+.88*v/mx).toFixed(2):1}"><title>${MO[mo]} ${String(h).padStart(2,'0')}:00 · ${f1(v)} kL/h</title></rect>`})});
 for(let h=0;h<24;h+=3)s+=`<text x="${L+h*cw+cw/2}" y="${H-6}" text-anchor="middle">${String(h).padStart(2,'0')}</text>`;
 $('#wp3-hm').innerHTML=s+'</svg>';build('c-wp3')}
reg('c-wp3',()=>{if(!yr)return {type:'bar',data:{labels:[],datasets:[]}};const isW=m3==='w';const step=isW?5:1;const vals=yr.hrs.map(x=>isW?x.kl:x.mw);
 const lo=isW?0:Math.floor(Math.min(...vals)),hi=isW?70:Math.ceil(Math.max(...vals))+1;const bins=[];
 if(isW)bins.push({l:'0 (dry)',n:vals.filter(v=>v===0).length});for(let b=lo;b<hi;b+=step)bins.push({l:isW?`${b}–${b+step}`:`${b}–${b+step}`,n:vals.filter(v=>(isW?v>0:true)&&v>=b&&v<b+step&&!(isW&&b===0&&v===0)).length});
 return {type:'bar',data:{labels:bins.map(b=>b.l),datasets:[{label:'Hours a year',data:bins.map(b=>b.n),backgroundColor:bins.map((b,i)=>isW?(i===0?T('--muted'):T('--cold')):T('--hot')),borderRadius:2,barPercentage:1,categoryPercentage:.96}]},options:base({plugins:{legend:{display:false},tooltip:Object.assign(tip(),{callbacks:{label:c=>`${fmt(c.raw)} hours (${(c.raw/87.6).toFixed(1)}% of the year)`}})},scales:{x:{grid:{display:false},title:{display:true,text:isW?'Water drawn (kL per hour)':'Facility power (MW)'},ticks:{maxRotation:0,autoSkip:true}},y:{title:{display:true,text:'Hours a year'},grid:grid()}}})}});
seg('wp3-c',d=>{c3=d.v;wp3()});seg('wp3-m',d=>{m3=d.v;build('c-wp3')});

/* ===== 4 direct vs indirect ===== */
const EX=['A · 20 MW colo, Mumbai (towers)','B · 50 MW hyperscale, Hyderabad (adiabatic)','C · 100 MW AI campus, Bengaluru (dry + liquid)'];
const DIR=[245.3,157.7,19.7],IND={g:[551.9,1275.5,1478.3],re:[71.8,168.5,221.7]};let m4='g';
reg('c-wp4',()=>({type:'bar',data:{labels:EX.map(x=>x.split(' (')[0]),datasets:[{label:'On site (cooling, people)',data:DIR,backgroundColor:T('--cold'),borderRadius:3},{label:m4==='g'?'At power plants (grid)':'At power plants (90% renewables)',data:IND[m4],backgroundColor:T('--hot'),borderRadius:3}]},
 options:base({indexAxis:'y',plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.dataset.label}: ${fmt(c.raw,1)} ML/yr`,footer:i=>{const k=i[0].dataIndex;return `Total ${fmt(DIR[k]+IND[m4][k],0)} ML/yr`}}})},scales:{x:{stacked:true,max:1800,title:{display:true,text:'Million litres a year'},grid:grid()},y:{stacked:true,grid:{display:false}}}})}));
seg('wp4-m',d=>{m4=d.v;build('c-wp4')});window.__WP4=()=>({EX,DIR,IND,m4});

/* ===== 5 cost vs water ===== */
const OPT={grid:['DISCOM tariff','circle'],green:['DISCOM green tariff','triangle'],cap:['Group-captive renewables','rectRot'],ists:['Third-party renewables (ISTS)','rect']};
const CW=[[['HT-I industrial','grid',9.37,797.2],['HT-II commercial','grid',11.15,797.2],['HT-I + green tariff','green',9.62,797.2],['Group captive RE-RTC','cap',7.94,317.1],['Third-party ISTS FDRE','ists',9.94,317.1]],
 [['HT-I(A) ≥132 kV','grid',7.48,1433.1],['HT-II(A) commercial','grid',8.63,1433.1],['HT-I + green tariff','green',8.14,1433.1],['Group captive RE-RTC','cap',7.55,326.2],['Third-party OA FDRE','ists',9.51,326.2]],
 [['KERC HT-2(a) via BESCOM','grid',8.28,1498.0],['Group captive (₹6.3–7.4)','cap',6.85,241.4],['Third-party ISTS (₹8.6–10.7)','ists',9.65,241.4]]];
const EXC=['--cold','--good','--hot'];
reg('c-wp5',()=>({type:'scatter',data:{datasets:CW.map((ex,k)=>({label:EX[k].split(' · ')[0]+' · '+EX[k].split(' · ')[1].split(',')[0],data:ex.map(o=>({x:o[2],y:o[3],n:o[0],o:o[1]})),pointStyle:ex.map(o=>OPT[o[1]][1]),pointRadius:8,pointHoverRadius:10,backgroundColor:A(T(EXC[k]),.75),borderColor:T(EXC[k])}))},
 options:base({plugins:{legend:Object.assign({},legendB,{labels:{boxWidth:10,boxHeight:10,usePointStyle:true,pointStyle:'circle'}}),tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.raw.n} (${OPT[c.raw.o][0]}): ₹${c.raw.x.toFixed(2)}/kWh · ${fmt(c.raw.y)} ML/yr`}})},scales:{x:{min:6,max:12,title:{display:true,text:'Landed electricity cost (₹/kWh)'},grid:grid()},y:{min:0,max:1600,ticks:{stepSize:200},title:{display:true,text:'Total water (ML/yr)'},grid:grid()}}})}));

/* ===== 6 grid water by source, by state ===== */
const SRC=[['Coal and lignite (73% × 3.5 L/kWh at the plant)',+(0.73*STD.coalW).toFixed(2),'--heat'],['Gas (1.5%)',0.01,'--warn'],['Nuclear (3%)',0.08,'--night'],['Solar, wind, bio (14%)',0.01,'--good'],['Large hydro (8%)',0,'--cold']];let m6='lo';
reg('c-wp6',()=>{const v=SRC.map(s=>s[1]);if(m6==='hi')v[4]=+(0.08*STD.hydroW).toFixed(2);const tot=v.reduce((a,b)=>a+b,0);
 return {type:'bar',data:{labels:['At the power station','At your meter (÷ 0.92 for losses)'],datasets:SRC.map((s,i)=>({label:s[0],data:[v[i],v[i]/0.92],backgroundColor:s[2]==='--night'?T('--muted'):T(s[2]),borderRadius:2}))},
 options:base({indexAxis:'y',plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.dataset.label}: ${c.raw.toFixed(2)} L/kWh`,footer:i=>`Total ${(i[0].dataIndex?tot/0.92:tot).toFixed(2)} L/kWh`}})},scales:{x:{stacked:true,max:6,title:{display:true,text:'Litres evaporated per kWh'},grid:grid()},y:{stacked:true,grid:{display:false}}}})}});
seg('wp6-m',d=>{m6=d.v;build('c-wp6')});window.__WP6=()=>({SRC,m6});
const STG=[['India (atlas standard 2.9)','gw.IN'],['Uttar Pradesh','gwmix.UP'],['Telangana','gwmix.TG'],['Maharashtra','gwmix.MH'],['Andhra Pradesh','gwmix.AP'],['Tamil Nadu','gwmix.TN'],['Karnataka','gwmix.KA']].map(([n,k])=>[n,STD.E[k].lo,STD.E[k].hi]);
reg('c-wp7',()=>({type:'bar',data:{labels:STG.map(s=>s[0]),datasets:[{label:'Range',data:STG.map(s=>[s[1],s[2]]),backgroundColor:STG.map((s,i)=>i?A(T('--hot'),.65):A(T('--muted'),.5)),borderRadius:4,barPercentage:.7}]},
 options:base({indexAxis:'y',plugins:{legend:{display:false},tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.raw[0]}–${c.raw[1]} L/kWh`}})},scales:{x:{min:0,max:6,title:{display:true,text:'L/kWh delivered'},grid:grid()},y:{grid:{display:false}}}})}));

/* ===== 7 peaks ===== */
const PKF=[['Towers (Mumbai, Chennai)',[1.10,1.25],[1.3,1.6],[1.5,1.9]],['Adiabatic (Hyd., Delhi)',[1.8,2.5],[2.0,2.5],[3.5,5.0]],['Dry or liquid',[1.0,1.1],[1.1,1.3],[2,3]]];
reg('c-wp8',()=>({type:'bar',data:{labels:PKF.map(p=>p[0]),datasets:[['Peak month',1,'--chill'],['Peak day',2,'--cold'],['Peak hour',3,'--night']].map(([l,k,c])=>({label:l,data:PKF.map(p=>(p[k][0]+p[k][1])/2),rng:PKF.map(p=>p[k]),backgroundColor:c==='--night'?T('--ink'):T(c),borderRadius:3}))},
 options:base({plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.dataset.label}: ${c.dataset.rng[c.dataIndex][0]}–${c.dataset.rng[c.dataIndex][1]}× the average`}})},scales:{x:{grid:{display:false},ticks:{font:{size:11},maxRotation:0,autoSkip:false}},y:{beginAtZero:true,title:{display:true,text:'× annual average rate'},grid:grid()}}})}));
const WET=[['Bengaluru',1000,1800],['Pune',1800,2800],['Hyderabad',3000,4000],['Delhi NCR',3000,3800],['Kolkata',3500,4500],['Mumbai',3500,5000],['Visakhapatnam',4500,6000],['Chennai',5000,6500]];
reg('c-wp9',()=>({type:'bar',data:{labels:WET.map(w=>w[0]),datasets:[{label:'Wet-mode hours',data:WET.map(w=>[w[1],w[2]]),backgroundColor:A(T('--cold'),.7),borderRadius:4,barPercentage:.7}]},
 options:base({indexAxis:'y',plugins:{legend:{display:false},tooltip:Object.assign(tip(),{callbacks:{label:c=>`${fmt(c.raw[0])}–${fmt(c.raw[1])} hours a year`}})},scales:{x:{min:0,max:8760,title:{display:true,text:'Hours a year (of 8,760)'},grid:grid()},y:{grid:{display:false}}}})}));

/* ===== 8 tower balance ===== */
const twr=(coc,fl)=>{const Q=1.25,E=Q*fl*3600/2430,B=E/(coc-1),D=0.002*Q;return {E,B,D,M:E+B+D}};
function wp10(){const c=val('wp10-c'),fl=val('wp10-f');out('wp10-c',c.toFixed(1));out('wp10-f',Math.round(fl*100)+'%');const r=twr(c,fl),r3=twr(3,fl);
 $('#wp10-r').innerHTML=`<div><span class="v cold">${f2(r.M)} L/kWh</span><span class="k">Tower WUE (make-up per kWh IT)</span></div><div><span class="v">${fmt(r.M*20*0.65*24)} kL/day</span><span class="k">For a 20 MW colo at 65% load</span></div><div><span class="v ${r.M<r3.M?'good':''}">${r.M<r3.M?'−':'+'}${Math.abs(Math.round((1-r.M/r3.M)*100))}%</span><span class="k">Versus CoC 3</span></div>`;build('c-wp10')}
reg('c-wp10',()=>{const fl=val('wp10-f'),cs=[2,3,4,5,6,7,8,9,10],selc=val('wp10-c'),R=cs.map(c=>twr(c,fl)),al=c=>Math.abs(c-selc)<.51?1:.35;
 return {type:'bar',data:{labels:cs.map(c=>'CoC '+c),datasets:[['Evaporation','E','--cold'],['Blowdown','B','--chill'],['Drift','D','--muted']].map(([l,k,col])=>({label:l,data:R.map(r=>+r[k].toFixed(3)),backgroundColor:cs.map(c=>A(T(col),al(c))),borderRadius:2}))},
 options:base({plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.dataset.label}: ${c.raw.toFixed(2)} L/kWh`}})},scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,title:{display:true,text:'L per kWh of IT'},grid:grid()}}})}});
['wp10-c','wp10-f'].forEach(i=>$('#'+i).addEventListener('input',wp10));

/* ===== 9 prompt ===== */
const PR=[['Google Gemini (on-site only)',0.26,0],['ChatGPT (as stated)',0.32,0],['India, dry-cooled',0.0072,1.2],['India, evaporative',0.48,1.2]];
reg('c-wp11',()=>({type:'bar',data:{labels:PR.map(p=>p[0]),datasets:[{label:'On site',data:PR.map(p=>p[1]),backgroundColor:T('--cold'),borderRadius:3},{label:'At power plants',data:PR.map(p=>p[2]),backgroundColor:T('--hot'),borderRadius:3}]},
 options:base({indexAxis:'y',plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.dataset.label}: ${c.raw.toFixed(2)} mL${c.raw===0&&c.datasetIndex===1&&c.dataIndex<2?' (not counted)':''}`,footer:i=>{const p=PR[i[0].dataIndex];return `Total ${(p[1]+p[2]).toFixed(2)} mL`}}})},scales:{x:{stacked:true,title:{display:true,text:'Millilitres per prompt'},grid:grid()},y:{stacked:true,grid:{display:false},ticks:{font:{size:11}}}}})}));

/* ===== 10 calculator ===== */
const DES={twr:[2.0,1.50,1.65,1.5,1.7],adi:[0.45,1.30,1.45,2.1,3.7],dry:[0.03,1.25,1.35,1.2,2.5],air:[0.03,1.60,1.80,1.1,2.5],sea:[0,1.25,1.35,1,1]};
function wp12(){if(!document.getElementById("wp12-mw"))return;const mw=val('wp12-mw'),u=val('wp12-u'),re=val('wp12-re'),px=val('wp12-px'),hA=val('wp12-h'),d=DES[$('#wp12-c').value],g=parseFloat($('#wp12-g').value);
 out('wp12-mw',fmt(mw)+' MW');out('wp12-u',Math.round(u*100)+'%');out('wp12-re',Math.round(re*100)+'%');out('wp12-px','₹'+px.toFixed(1)+'/kWh');out('wp12-h',hA+' h');
 const plf=1+(d[1]-1)*(.35*.8/u+.65),it=mw*u*8760,fac=it*plf,ew=re*0.1+(1-re)*g,dir=it*d[0]/1000,ind=fac*ew/1000,tot=dir+ind,avgD=mw*u*24*d[0],pkD=avgD*d[3],pkH=mw*u*d[0]*d[4];
 const ppl=tot*1e6/(135*365);
 $('#wp12-r').innerHTML=`<div><span class="v">${fmt(fac/1000,0)} MU</span><span class="k">Facility electricity a year (IT ${fmt(it/1000,0)} MU)</span></div><div><span class="v cold">${fmt(dir,0)} ML</span><span class="k">On-site water a year</span></div><div><span class="v hot">${fmt(ind,0)} ML</span><span class="k">Power-plant water a year</span></div><div><span class="v">${f2(tot*1000/it)} L/kWh</span><span class="k">Total (source) WUE</span></div><div><span class="v">${fmt(pkD)} kL</span><span class="k">Peak-day water (average ${fmt(avgD)} kL)</span></div><div><span class="v">${f1(pkH)} kL/h</span><span class="k">Peak-hour water</span></div><div><span class="v">${fmt(pkH*hA)} kL</span><span class="k">Storage for ${hA} h at peak</span></div><div><span class="v">${fmt(mw*d[2]/0.95)} MVA</span><span class="k">Contract demand (hot hour)</span></div><div><span class="v">₹${fmt(fac*px/1e4,0)} cr</span><span class="k">Power cost a year</span></div><div><span class="v">${fmt(ppl)}</span><span class="k">People's daily water, all year (135 L/day)</span></div>`;
 const mx=Math.max(tot,1);$('#wp12-b').innerHTML=[['On site',dir,''],['At power plants',ind,'hot'],['Total',tot,'mut']].map(([l,v,c])=>`<div class="hbar"><span>${l}</span><div class="track"><div class="fill ${c}" style="width:${v/mx*100}%"></div></div><span class="val">${fmt(v,0)} ML</span></div>`).join('')}
['wp12-mw','wp12-u','wp12-re','wp12-px','wp12-h'].forEach(i=>$('#'+i).addEventListener('input',wp12));['wp12-c','wp12-g'].forEach(i=>$('#'+i).addEventListener('change',wp12));

wp1();wp2();wp3();wp10();wp12();
let rzT=null,rzW=innerWidth;addEventListener('resize',()=>{if(Math.abs(innerWidth-rzW)<40)return;rzW=innerWidth;clearTimeout(rzT);rzT=setTimeout(()=>{wp1();wp3()},200)});
}
