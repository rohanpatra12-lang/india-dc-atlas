
/* ---------- 6 WATER ---------- */
const E=504.6,DR=1.2,NC=14.6;let wbMode='std';
function wb(){
  const c=val('coc');out('coc',c);const B=E/(c-1);let W,Dis,parts;
  if(wbMode==='std'){W=E+B+DR+NC;Dis=B+0.8*NC;parts=[[E,'--cold','Evaporation'],[B,'--warn','Blowdown'],[DR+NC,'--muted','']]}
  else if(wbMode==='ro'){const M=E+B+DR,feed=M/0.75,rej=feed-M;W=feed+NC;Dis=B+rej+0.8*NC;parts=[[E,'--cold','Evaporation'],[B,'--warn','Blowdown'],[rej,'--hot','RO reject'],[DR+NC,'--muted','']]}
  else{W=E+DR+NC;Dis=0;parts=[[E,'--cold','Evaporation'],[DR+NC,'--muted','']]}
  const C=W-Dis,mx=1400;
  const bar=ps=>`<div class="wb-bar">${ps.map(([v,col,l])=>`<div style="width:${v/mx*100}%;background:var(${col})">${v/mx>.13&&l?l+' '+fmt(v):''}</div>`).join('')}</div>`;
  $('#wb').innerHTML=`<div class="wb-row"><span>Withdrawal</span>${bar(parts)}</div><div class="wb-row"><span>Consumption</span>${bar([[C,'--heat','Lost to air']])}</div><div class="wb-row"><span>Discharge</span>${Dis>0?bar([[Dis,'--warn','Returned']]):'<span class="xs muted">None (salts to landfill; +20–70 kWh/m³)</span>'}</div>`;
  readout($('#wb-read'),[[fmt(W,1)+' ML','Withdrawn ('+(W/365).toFixed(2)+' MLD)','cold'],[fmt(C,1)+' ML','Consumed ('+(C/365).toFixed(2)+' MLD)','heat'],[(W/350.4).toFixed(2),'Withdrawal WUE, L/kWh'],[(C/350.4).toFixed(2),'Consumption WUE, L/kWh']]);
  const W3=E+E/2+DR+NC;
  $('#wb-text').innerHTML=wbMode==='std'?`At CoC ${c}, withdrawal is <b>${((W-W3)/W3*100).toFixed(0)}%</b> vs CoC 3, but consumption stays <b>${fmt(C,1)} ML</b>. Treatment changes what you draw and discharge, not what evaporates.`:wbMode==='ro'?`Treated wastewater with RO <b>raises</b> gross withdrawal (RO reject) but moves it off fresh water. Consumption is unchanged.`:`Zero liquid discharge removes discharge but turns all withdrawal into consumption and adds 20–70 kWh per m³ of energy plus salt waste.`;
}
$('#coc').addEventListener('input',wb);seg('wb-mode',d=>{wbMode=d.m;wb()});wb();
const mult=[.85,.95,1.15,1.3,1.3,1.0,.9,.9,.95,.95,.85,.85];
reg('c-season',()=>({type:'bar',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],datasets:[{data:mult.map(m=>+(m*1.77).toFixed(2)),backgroundColor:mult.map(m=>m>=1.15?T('--heat'):T('--cold')),borderRadius:4}]},options:base({scales:{y:{min:0,title:{display:true,text:'MLD'},grid:grid()},x:{grid:{display:false}}}})}));
hbars($('#prompt-bars'),[['Bengaluru DLC, site only',0.03,'','0.03'],['Google Gemini, on-site',0.26,'','0.26'],['Bengaluru DLC, site + grid',0.7,'','0.5–0.9'],['Same site on coal power',2,'hot','~2'],['GPT-3, India case (UCR)',19.7,'hot','19.7'],['Mistral Large 2, full LCA',45,'heat','45']],{log:true,lo:-2});
reg('c-wsf',()=>({type:'bar',data:{labels:['A · Evap, East groundwater','B · Evap, potable','C · Evap, treated + RO','D · Dry + grid','E · Dry + renewable PPA'],datasets:[{label:'On site',data:[50.9,30.5,15.3,1.1,1.1],backgroundColor:T('--cold'),borderRadius:3},{label:'Off site (power plants)',data:[34.2,34.2,34.2,38.1,2.5],backgroundColor:T('--hot'),borderRadius:3}]},options:base({indexAxis:'y',plugins:{legend:legendB,tooltip:tip()},scales:{x:{stacked:true,title:{display:true,text:'Mm³-eq per year'},grid:grid()},y:{stacked:true,grid:{display:false}}}})}));
