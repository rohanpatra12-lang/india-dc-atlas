
/* ---------- 24-HOUR DAY ---------- */
const SEAS={apr:{t:[22,35],w:[19,23],cf:1.05,n:'April'},jul:{t:[20,28],w:[19,22],cf:.8,n:'July'},jan:{t:[15,28],w:[12,17],cf:1,n:'January'}};
const shape=h=>{const x=(h-6+24)%24;return x<=9?(1-Math.cos(Math.PI*x/9))/2:(1+Math.cos(Math.PI*(x-9)/15))/2};
const INF=[.45,.4,.38,.36,.36,.38,.45,.55,.65,.75,.82,.86,.88,.86,.84,.84,.86,.9,.95,.97,.95,.85,.7,.55];
let dS='apr',dC='tower',dW='colo',dH=15,playT=null;
function dayCalc(shift){
  const s=SEAS[dS],mw=val('d-mw'),ai=dW!=='colo',w=ai?WL.ai:WL.colo;const rows=[];
  for(let h=0;h<24;h++){
    const db=s.t[0]+(s.t[1]-s.t[0])*shape(h),wb=s.w[0]+(s.w[1]-s.w[0])*shape(h);
    let L=dW==='colo'?.7:dW==='ai'?.85:INF[h];
    if(shift){const base=dW==='inf'?INF:null;const amt=shift/100;if(h>=18&&h<23)L-=amt*L;if(h>=10&&h<15){let moved=0;for(let k=18;k<23;k++)moved+=amt*(base?base[k]:L);L+=moved/5}}
    let oh=coolOH(dC,db,wb,ai),mode,mc;
    if(dC==='aircc'&&db<18){oh=ai?.08:.12;mode='Economiser (free cooling)';mc='good'}
    else if(dC==='aircc'){mode='Compressor chillers';mc='heat'}
    else if(dC==='tower'){if(wb<14){oh*=.6;mode='Waterside free cooling';mc='good'}else{mode='Chillers + towers';mc='warn'}}
    else if(dC==='adiab'){if(db>30){mode='Wet pads on (adiabatic)';mc='warn'}else{oh*=.85;mode='Dry mode';mc='good'}}
    else{if(db+7>40){mode='Dry coolers + spray trim';mc='warn'}else{mode='Dry coolers only';mc='good'}}
    const pue=1+w.ls+w.ot+oh,itMW=mw*L,facMW=itMW*pue;
    const wue=dC==='tower'?Math.min(2.5,1.8*(1+.03*(wb-19.4))):dC==='adiab'?(db>30?1.2:0):dC==='dlc'?(db+7>40?.5:0):.02;
    const ci=hrs[h]*s.cf,tf=6.70*(h>=18&&h<22?1.2:h>=10&&h<16?.8:1);
    rows.push({h,db,wb,L,itMW,facMW,pue,mode,mc,ci,tf,wat:itMW*1000*wue/1000,co2:facMW*ci/1000,rs:facMW*1000*tf})}
  return rows}
window.__DAY=()=>({rows:dayCalc(val('d-shift')),h:dH,dS,SEAS});
function dayRender(){
  out('d-mw',val('d-mw')+' MW');out('d-shift',val('d-shift')+'%');dH=+$('#d-h').value;out('d-h',String(dH).padStart(2,'0')+':00');
  const R0=dayCalc(0),R1=dayCalc(val('d-shift')),Rr=R1;
  const strip=(lab,key,col,f)=>{const vs=Rr.map(r=>r[key]),mn=Math.min(...vs),mx=Math.max(...vs);return `<div class="strip"><span>${lab}</span><div class="cells">${Rr.map((r,i)=>`<i data-h="${i}" class="${i===dH?'on':''}" title="${String(i).padStart(2,'0')}:00 · ${f(r[key])}" style="background:${A(T(col),.12+.88*(mx>mn?(r[key]-mn)/(mx-mn):.5))}"></i>`).join('')}</div></div>`};
  const modeStrip=`<div class="strip"><span>Cooling mode</span><div class="cells">${Rr.map((r,i)=>`<i data-h="${i}" class="${i===dH?'on':''}" title="${String(i).padStart(2,'0')}:00 · ${r.mode}" style="background:var(--${r.mc})"></i>`).join('')}</div></div>`;
  $('#d-strips').innerHTML=strip('Grid carbon','ci','--heat',v=>fmt(v)+' g/kWh')+strip('Tariff','tf','--hot',v=>'₹'+v.toFixed(2))+strip('Outdoor heat','db','--bad',v=>v.toFixed(1)+' °C')+modeStrip+strip('IT load','itMW','--cold',v=>v.toFixed(1)+' MW')+`<div class="strip"><span></span><div class="hrs">${Rr.map((_,i)=>`<span>${String(i).padStart(2,'0')}</span>`).join('')}</div></div>`;
  const r=Rr[dH];
  readout($('#d-read'),[[String(dH).padStart(2,'0')+':00','Hour'],[r.db.toFixed(1)+' / '+r.wb.toFixed(1)+' °C','Dry / wet bulb'],[fmt(r.ci)+' g','Grid CO₂ per kWh','heat'],['₹'+r.tf.toFixed(2),'Tariff per kWh','hot'],[r.facMW.toFixed(1)+' MW','Facility draw · PUE '+r.pue.toFixed(2),'cold'],[fmt(r.wat,1)+' kL','Water this hour'],[r.mode,'Cooling mode']]);
  const sum=(R,k)=>R.reduce((a,x)=>a+x[k],0);
  const e0=sum(R0,'facMW'),e1=sum(R1,'facMW'),c0=sum(R0,'co2'),c1=sum(R1,'co2'),m0=sum(R0,'rs'),m1=sum(R1,'rs'),w0=sum(R0,'wat');
  readout($('#d-tot'),[[fmt(e1)+' MWh','Facility energy'],[fmt(c1,1)+' t','CO₂ (average basis)','heat'],['₹'+fmt(m1/1e5,1)+' lakh','Energy charges','hot'],[fmt(w0)+' kL','Water on site','cold']]);
  const sh=val('d-shift'),pk=R0.reduce((a,x)=>x.db>a.db?x:a);
  $('#d-text').innerHTML=(sh?`Moving ${sh}% of evening load into solar hours saves <b>${fmt(c0-c1,1)} t CO₂</b> and <b>₹${fmt((m0-m1)/1e5,1)} lakh</b> today, about ₹${fmt((m0-m1)*365/1e7,1)} crore a year. `:'Move flexible load into solar hours with the slider to see the saving. ')+`Hottest hour ${String(pk.h).padStart(2,'0')}:00 at ${pk.db.toFixed(0)} °C pushes PUE to ${pk.pue.toFixed(2)}; ${R0.filter(x=>x.mc==='good').length} of 24 hours run in the cheapest cooling mode.`;
  if(charts['c-day'])build('c-day');
}
reg('c-day',()=>{const R0=dayCalc(0),R1=dayCalc(val('d-shift'));return {type:'line',data:{labels:R1.map(r=>String(r.h).padStart(2,'0')),datasets:[{label:'Facility MW',data:R1.map(r=>+r.facMW.toFixed(2)),borderColor:T('--cold'),backgroundColor:A(T('--cold'),.14),fill:true,tension:.35,pointRadius:R1.map(r=>r.h===dH?5:0),pointBackgroundColor:T('--cold'),borderWidth:2.5,yAxisID:'y'},{label:'Before shift',data:R0.map(r=>+r.facMW.toFixed(2)),borderColor:A(T('--muted'),.8),borderDash:[4,4],pointRadius:0,borderWidth:1.4,fill:false,yAxisID:'y',hidden:!val('d-shift')},{label:'Grid gCO₂/kWh',data:R1.map(r=>Math.round(r.ci)),borderColor:T('--heat'),pointRadius:0,borderWidth:1.8,tension:.35,fill:false,yAxisID:'y1'}]},options:base({plugins:{legend:legendB,tooltip:tip()},scales:{x:{grid:{display:false},ticks:{maxTicksLimit:8}},y:{title:{display:true,text:'MW'},grid:grid(),min:0},y1:{position:'right',grid:{display:false},min:0,title:{display:true,text:'gCO₂/kWh'}}}})}});
['d-mw','d-shift','d-h'].forEach(i=>document.getElementById(i).addEventListener('input',dayRender));
seg('d-season',d=>{dS=d.v;dayRender()});seg('d-cool',d=>{dC=d.v;dayRender()});seg('d-wl',d=>{dW=d.v;dayRender()});
$('#d-strips').addEventListener('click',e=>{const c=e.target.closest('i[data-h]');if(c){setv('d-h',c.dataset.h);dayRender()}});
$('#d-play').addEventListener('click',()=>{const b=$('#d-play');if(playT){clearInterval(playT);playT=null;b.textContent='▶ Play the day';b.setAttribute('aria-pressed','false');return}
  b.textContent='❚❚ Pause';b.setAttribute('aria-pressed','true');playT=setInterval(()=>{setv('d-h',(+$('#d-h').value+1)%24);dayRender()},650)});
dayRender();
