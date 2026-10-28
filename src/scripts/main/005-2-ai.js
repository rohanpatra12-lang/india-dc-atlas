
/* ---------- 2 AI ---------- */
reg('c-global',()=>({type:'bar',data:{labels:['2024','2030','2035'],datasets:[{data:[415,945,1200],backgroundColor:[T('--cold'),T('--hot'),A(T('--hot'),.55)],borderRadius:5}]},options:base({scales:{y:{title:{display:true,text:'TWh'},grid:grid()},x:{grid:{display:false}}}})}));
reg('c-split',()=>({type:'bar',data:{labels:['Legacy (PUE ~1.9)','Enterprise/colo (~1.55)','Hyperscale (~1.15)','AI liquid (~1.2)'],datasets:[{label:'IT',data:[52,64,88,84],backgroundColor:T('--cold')},{label:'Cooling',data:[35,27,7.5,11],backgroundColor:T('--heat')},{label:'Power losses',data:[10,7,3.5,4.5],backgroundColor:T('--hot')},{label:'Lighting & other',data:[3,2,1,0.5],backgroundColor:A(T('--muted'),.7)}]},options:base({indexAxis:'y',plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{label:c=>`${c.dataset.label}: ${c.raw}%`}})},scales:{x:{stacked:true,max:100,ticks:{callback:v=>v+'%'},grid:grid()},y:{stacked:true,grid:{display:false}}}})}));

function rkVal(s){return Math.round(3*Math.pow(200,s/100))}
function rack(){
  const kw=rkVal(val('rk'));out('rk',kw+' kW');let cls,cool,volt,liq,col;
  if(kw<=15){cls='Conventional';cool='Air with hot/cold-aisle containment; CRAH units';volt='400 V AC';liq=0;col='--cold'}
  else if(kw<=40){cls='High-density';cool='Rear-door heat exchanger or in-row coolers';volt='400–415 V AC';liq=40;col='--warn'}
  else if(kw<=150){cls='AI (GB200/GB300)';cool='Direct-to-chip liquid, CDU to facility water';volt='415/480 V AC + 54 V busbar';liq=90;col='--hot'}
  else{cls='Next-gen AI (Rubin / Kyber)';cool='100% liquid, fanless; sidecar for power and cooling';volt='800 V DC';liq=100;col='--heat'}
  readout($('#rk-read'),[[cls,'Class'],[Math.max(1,Math.floor(1000/kw))+'','Racks per MW of IT'],[liq+'%','Heat removed by liquid',liq?'hot':'cold'],[volt,'Power to rack'],[fmt(Math.round(kw*8760*.8/1800)),"Bengaluru homes' yearly use (one rack)"]]);
  $('#rk-text').textContent='Cooling: '+cool+'.';
  const n=26,lit=Math.min(n,Math.ceil(Math.log(kw/3+1)/Math.log(201)*n));
  $('#rack').innerHTML=Array.from({length:n},(_,i)=>`<i style="background:${i<lit?`var(${col})`:'var(--sunk)'}"></i>`).join('');
}
$('#rk').addEventListener('input',rack);rack();
let densMode='rack';
reg('c-density',()=>{if(densMode==='rack')return {type:'bar',data:{labels:['Enterprise modal','Air practical limit','Active RDHx','GB200/GB300 NVL72','Vera Rubin','Kyber (2027)'],datasets:[{data:[8,20,60,132,210,600],backgroundColor:[T('--cold'),T('--cold'),T('--warn'),T('--hot'),T('--hot'),T('--heat')],borderRadius:4}]},options:base({scales:{y:{type:'logarithmic',title:{display:true,text:'kW per rack (log)'},grid:grid(),ticks:{callback:v=>[5,10,20,50,100,200,500,1000].includes(v)?v:''}},x:{grid:{display:false}}}})};
  return {type:'line',data:{labels:['H100 (2023)','B200 (2024)','B300 (2025)','Rubin (2026, est.)','Leading GPU (2029, proj.)'],datasets:[{data:[700,1000,1400,2000,4000],borderColor:T('--heat'),backgroundColor:A(T('--heat'),.15),fill:true,tension:.3,pointRadius:5,pointBackgroundColor:T('--heat')}]},options:base({scales:{y:{title:{display:true,text:'Watts per GPU'},grid:grid(),min:0},x:{grid:{display:false}}}})}});
seg('dens-toggle',d=>{densMode=d.v;build('c-density')});
