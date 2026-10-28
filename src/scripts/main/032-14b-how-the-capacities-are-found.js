
/* ---------- 14b HOW THE CAPACITIES ARE FOUND ---------- */
{
if(document.getElementById('kc-p')&&window.__KA){
const K=window.__KA,M=K.meta,B=K.cases.base,LT=M.Ltot;
const r=.10,crf=(1.1**25)*r/((1.1**25)-1),sA=3.8*crf+3.8*.015,wA=7.0*crf+7.0*.015,bA=3.5e5*12/4/1e7,hA=M.hydro_ann;
const sMWh=8760*.205,wMWh=8760*.33;
const NM={base:'Cheapest mix (no water cap)','min':'Least possible water'};
const nm=t=>NM[t]||('Water cap '+Math.round(parseFloat(t)*100)+'%'+(t==='0.15'?' · recommended':''));
const sel=document.getElementById('kc-o');sel.innerHTML=B.map((o,i)=>`<option value="${i}"${o.tag==='0.15'?' selected':''}>${nm(o.tag)}</option>`).join('');
const F=(v,d=0)=>fmt(v,d);
document.getElementById('kc-u').innerHTML=[
 ['Solar, per MW',`₹3.8 cr × 0.1102 + 1.5% O&M = <b>₹${F(sA,3)} cr</b>; makes 8,760 × 20.5% = ${F(sMWh)} MWh`,`${F(sA*1e7/(sMWh*1e3),2)} + 1.00 = <b>${F(sA*1e7/(sMWh*1e3)+1,2)}</b>`],
 ['Wind, per MW',`₹7.0 cr × 0.1102 + 1.5% O&M = <b>₹${F(wA,3)} cr</b>; makes 8,760 × 33% = ${F(wMWh)} MWh`,`${F(wA*1e7/(wMWh*1e3),2)} + 1.00 = <b>${F(wA*1e7/(wMWh*1e3)+1,2)}</b>`],
 ['Battery, per MWh',`₹3.5 lakh per MW-month × 12 ÷ 4 h = <b>₹${F(bA,3)} cr</b>`,'storage only'],
 ['Hydro, per MW contracted',`₹4.5/kWh take-or-pay on the monthly allowance = <b>₹${F(hA,2)} cr</b>`,'4.50 + 1.00 = <b>5.50</b>'],
 ['Grid','₹7.0 per kWh bought','<b>7.00</b>']].map(([a,b,c])=>`<tr><td><b>${a}</b></td><td>${b}</td><td class="n">${c}</td></tr>`).join('');
function kc(){const o=B[+sel.value],cheap=B[0],mn=B[B.length-1];
 const S=o.Cs*sMWh,W=o.Cw*wMWh,H=o.hydro,G=o.grid,U=o.curt,loss=S+W+H+G-U-LT,thr=loss>0?loss/.12:0,cyc=o.E>0?thr/o.E:0;
 const cS=o.Cs*sA,cW=o.Cw*wA,cH=o.Ch*hA,cB=o.E*bA,cO=(S+W+H-U)*1e-4,cG=G*7e-4,tot=cS+cW+cH+cB+cO+cG;
 const wS=S*.1/1000,wG=G*2/1000,wH=H*10/1000,wt=wS+wG+wH;
 const f=parseFloat(o.tag),cap=isNaN(f)?null:mn.water+f*(cheap.water-mn.water);
 document.getElementById('kc-c').innerHTML=[[F(o.Cs)+' MW','Solar'],[F(o.Cw)+' MW','Wind'],[F(o.Ch)+' MW','Hydro contract'],[F(o.E)+' MWh','Battery (4-hour) · '+F(o.E/4)+' MW'],[F(o.cfe*100)+'%','Hours\' energy met without grid'],['₹'+F(o.lcoe,2),'Per kWh, all-in']].map(([v,k])=>`<div><span class="v">${v}</span><span class="k">${k}</span></div>`).join('');
 document.getElementById('kc-why').innerHTML=o.tag==='base'?'With no water limit, the optimiser buys the cheapest energy first: solar (₹3.65 delivered) for daytime, wind (₹4.03) for evenings and the monsoon, a 28 MW hydro contract (₹5.50) to fill nights, and only a small battery, because storing a kWh costs more than buying it from the grid.':o.tag==='min'?'With water as the only goal, even solar\'s washing water (0.1 L/kWh) is avoided: wind alone plus a 4.4 GWh battery covers every hour, at more than three times the cost. Shown for completeness, not as a practical choice.':`The water cap rules out hydro (10 L/kWh) and limits grid power (2 L/kWh). To replace them the optimiser adds solar and a battery large enough to carry midday surplus into the night, accepting some curtailment. ${o.tag==='0.15'?'This is the option chosen by the three rules: each kilolitre saved costs about ₹85, below the ₹99 city water price.':''}`;
 const row=(a,b,c)=>`<tr><td>${a}</td><td>${b}</td><td class="n">${c}</td></tr>`;
 document.getElementById('kc-e').innerHTML=[
  row('Solar output',`${F(o.Cs,1)} MW × ${F(sMWh)} h`,F(S)),row('Wind output',`${F(o.Cw,1)} MW × ${F(wMWh)} h`,F(W)),row('Hydro used','from the hourly solution',F(H)),row('Grid bought','from the hourly solution',F(G)),
  row('− Curtailed surplus','energy that could not be used or stored','−'+F(U)),row('− Battery losses',`12% of ${F(thr)} MWh charged (${F(cyc)} full cycles a year)`,'−'+F(loss)),
  row('<b>= Load</b>','65 MW × 8,760 h','<b>'+F(LT)+'</b>')].join('');
 document.getElementById('kc-k').innerHTML=[
  row('Solar',`${F(o.Cs,1)} × ₹${F(sA,3)} cr`,'₹'+F(cS,1)+' cr'),row('Wind',`${F(o.Cw,1)} × ₹${F(wA,3)} cr`,'₹'+F(cW,1)+' cr'),row('Hydro',`${F(o.Ch,1)} × ₹${F(hA,2)} cr`,'₹'+F(cH,1)+' cr'),row('Battery',`${F(o.E,1)} × ₹${F(bA,3)} cr`,'₹'+F(cB,1)+' cr'),
  row('Open access',`${F(S+W+H-U)} MWh × ₹1.0`,'₹'+F(cO,1)+' cr'),row('Grid',`${F(G)} MWh × ₹7.0`,'₹'+F(cG,1)+' cr'),
  row('<b>Total cost</b>',`÷ ${F(LT)} MWh = ₹${F(tot*1e7/(LT*1e3),2)}/kWh`,'<b>₹'+F(tot,1)+' cr</b>'),
  row('Water',`solar ${F(wS,1)} + grid ${F(wG,1)}${H?` + hydro ${F(wH,1)}`:''} ML`,'<b>'+F(wt,1)+' ML</b>'),
  ...(cap!==null?[row('Water cap',`${F(mn.water,2)} + ${Math.round(f*100)}% × (${F(cheap.water,1)} − ${F(mn.water,2)})`,F(cap,1)+' ML')]:[]),
  ...(o!==cheap&&cheap.water>o.water?[row('₹ per kL saved',`(₹${F(o.cost,1)} − ₹${F(cheap.cost,1)} cr) ÷ ${F(cheap.water-o.water)} ML`,'₹'+F((o.cost-cheap.cost)*1e7/((cheap.water-o.water)*1e3))+'/kL')]:[])].join('');
}
sel.addEventListener('change',kc);kc();
}
}
