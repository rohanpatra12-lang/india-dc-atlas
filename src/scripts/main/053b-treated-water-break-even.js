/* ---------- 12.6 treated water vs drinking water: break-even distance ---------- */
(()=>{if(!document.getElementById('bw-p7'))return;
let q='f',fin='a',pp=99;
const PRE={a:{mw:50,u:75,w:.3,km:5},t:{mw:50,u:75,w:1.8,km:10},w:{mw:100,u:80,w:1.8,km:10}};
const model=(o)=>{const kly=o.mw*o.u/100*8760*o.w,f=o.fin==='s'?.10:crf(.10,15),pot=kly*o.pp/1e7;
 let treat,sec,plant=0;if(o.q==='ro'){const feed=kly/.75;treat=kly*18/1e7;sec=feed*10/1e7;plant=feed/365/1000*5.5*f}else{treat=kly*7.5/1e7;sec=kly*10/1e7}
 const run=treat+sec+plant+kly*1/1e7+.05,pk=o.ck*f,net=km=>run+km*pk-pot;
 return {kly,pot,run,pk,net,be:Math.max(0,(pot-run)/pk),treat,sec,plant}};
const cur=()=>({mw:val('bw-be-mw'),u:val('bw-be-u'),w:val('bw-be-w'),km:val('bw-be-km'),ck:val('bw-be-ck'),q,fin,pp});
const L=n=>(n*100).toLocaleString('en-IN',{maximumFractionDigits:0});
let last=null;
function rb(){const o=cur(),m=model(o),n=m.net(o.km);last={o,m};
 out('bw-be-mw',fmt(o.mw)+' MW');out('bw-be-u',o.u+'%');out('bw-be-w',o.w.toFixed(2)+' L/kWh');out('bw-be-km',o.km+' km');out('bw-be-ck','₹'+o.ck.toFixed(1)+' cr');
 const beR=(m.pot-m.run+.08)/m.pk;
 readout(document.getElementById('bw-be-r'),[
  [fmt(m.kly)+' kL','water a year · '+fmt(m.kly/365)+' kL a day','cold'],
  ['₹'+L(m.pot)+' lakh','drinking-water bill a year at ₹'+o.pp+'/kL'],
  ['₹'+L(m.run+o.km*m.pk)+' lakh','treated water a year: pipe ₹'+L(o.km*m.pk)+' lakh · running ₹'+L(m.run)+' lakh'],
  [(n<0?'saves ₹':'costs ₹')+L(Math.abs(n))+' lakh',n<0?'a year against drinking water':'more a year than drinking water',n<0?'cold':'hot'],
  [m.be>=0.05?fmt(m.be,1)+' km':'never','break-even pipe length · '+fmt(Math.max(0,beR),1)+' km while the ₹8 lakh reimbursement lasts']]);
 const big=o.w>=1;document.getElementById('bw-be-n').textContent=`At ${o.km} km, treated water ${n<0?'is cheaper by':'costs more by'} about ₹${L(Math.abs(n))} lakh a year. ${m.be>=0.05?`It pays only if the plant is within about ${fmt(m.be,1)} km.`:'At this volume it never pays, however close the plant.'} ${o.q==='ro'?'Reverse osmosis buys a third more feed water and adds a plant, so the break-even shrinks.':'Cooling-tower grade (TDS below 70 ppm) needs reverse osmosis; switch the treatment to see the real break-even.'} ${big?'High water use makes a long pipe worth it, which is why towers belong on treated water.':'A low-water design saves little on its water bill, so only a nearby plant or a shared public main makes sense.'}`;
 build('c-bw-be')}
reg('c-bw-be',()=>{if(!last)return {type:'line',data:{labels:[],datasets:[]}};const {o,m}=last,kx=Math.min(30,Math.max(10,o.km+2,Math.ceil(m.be*2/5)*5)),ks=[...Array(kx+1).keys()];
 const mF=model({...o,q:'f'}),mR=model({...o,q:'ro'});const cur2=o.q==='ro'?mR:mF;
 return {type:'line',data:{labels:ks.map(String),datasets:[
  {label:'Filtration + softening',data:ks.map(k=>+(mF.net(k)*100).toFixed(1)),borderColor:T('--cold'),borderWidth:o.q==='f'?2.6:1.4,borderDash:o.q==='f'?[]:[5,4],pointRadius:0,fill:false},
  {label:'Reverse osmosis',data:ks.map(k=>+(mR.net(k)*100).toFixed(1)),borderColor:T('--heat'),borderWidth:o.q==='ro'?2.6:1.4,borderDash:o.q==='ro'?[]:[5,4],pointRadius:0,fill:false},
  {label:'This campus',data:ks.map(k=>k===o.km?+(cur2.net(k)*100).toFixed(1):null),borderColor:T('--ink'),backgroundColor:T('--ink'),pointRadius:5,showLine:false},
  {label:'Break-even',data:ks.map(()=>0),borderColor:T('--muted'),borderWidth:1,borderDash:[2,3],pointRadius:0,fill:false}]},
 options:base({plugins:{legend:Object.assign({},legendB,{labels:Object.assign({},legendB.labels,{filter:i=>i.text!=='Break-even'})}),tooltip:Object.assign(tip(),{callbacks:{title:c=>c[0].label+' km',label:c=>c.raw==null?null:`${c.dataset.label}: ${c.raw<0?'saves':'costs'} ₹${fmt(Math.abs(c.raw))} lakh/yr`}})},
  scales:{y:{title:{display:true,text:'₹ lakh/yr vs drinking water'},grid:grid()},x:{title:{display:true,text:'Pipe length to the treatment plant, km'},grid:{display:false},ticks:{maxTicksLimit:7}}}})}});
seg('bw-be-q',d=>{q=d.v;rb()});seg('bw-be-f',d=>{fin=d.v;rb()});seg('bw-be-pp',d=>{pp=+d.v;rb()});
seg('bw-be-ex',d=>{const p=PRE[d.v];setv('bw-be-mw',p.mw);setv('bw-be-u',p.u);setv('bw-be-w',p.w);setv('bw-be-km',p.km);rb()});
['bw-be-mw','bw-be-u','bw-be-w','bw-be-km','bw-be-ck'].forEach(i=>document.getElementById(i).addEventListener('input',rb));rb();
window.__BWBE={model,cur};
})();
