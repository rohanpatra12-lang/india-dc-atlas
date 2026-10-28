
/* ---------- SANKEY ---------- */
function sankey(el,cols,links,u){
  const W_=960,H=380,nw=14,pad=24,tp=14,lx=200,rx=210;
  const ins={},outs={};links.forEach(l=>{outs[l.s]=(outs[l.s]||0)+l.v;ins[l.t]=(ins[l.t]||0)+l.v});
  const nv=n=>Math.max(ins[n.id]||0,outs[n.id]||0);
  cols=cols.map(c=>c.filter(n=>nv(n)>1e-9));
  const sc=Math.min(...cols.map(c=>(H-2*tp-pad*(c.length-1))/Math.max(1e-9,c.reduce((a,n)=>a+nv(n),0))));
  const pos={};cols.forEach((c,ci)=>{const x=lx+ci*(W_-lx-rx-nw)/(cols.length-1);const tot=c.reduce((a,n)=>a+Math.max(1.5,nv(n)*sc),0)+pad*(c.length-1);let y=(H-tot)/2;c.forEach(n=>{const h=Math.max(1.5,nv(n)*sc);pos[n.id]={x,y,h,n,ci,oy:y,iy:y};y+=h+pad})});
  let p='';
  links.filter(l=>l.v>1e-9&&pos[l.s]&&pos[l.t]).forEach(l=>{const a=pos[l.s],b=pos[l.t],h=Math.max(.8,l.v*sc);const x0=a.x+nw,x1=b.x,xm=(x0+x1)/2,y0=a.oy,y1=b.iy;a.oy+=h;b.iy+=h;
    p+=`<path d="M${x0},${y0}C${xm},${y0} ${xm},${y1} ${x1},${y1}L${x1},${y1+h}C${xm},${y1+h} ${xm},${y0+h} ${x0},${y0+h}Z" fill="var(${l.c||a.n.c})" opacity=".42"><title>${a.n.l} → ${b.n.l}: ${u(l.v)}</title></path>`});
  let nd='';Object.values(pos).forEach(({x,y,h,n,ci})=>{const last=ci===cols.length-1,first=ci===0;const tx=first?x-8:x+nw+8,anc=first?'end':'start';const cy=y+h/2;
    nd+=`<rect x="${x}" y="${y}" width="${nw}" height="${h}" rx="2" fill="var(${n.c})"><title>${n.l}: ${u(nv(n))}</title></rect><text class="sk-l" x="${tx}" y="${cy-2}" text-anchor="${anc}">${n.l}</text><text class="sk-v" x="${tx}" y="${cy+12}" text-anchor="${anc}">${u(nv(n))}</text>`});
  el.innerHTML=`<svg viewBox="0 0 ${W_} ${H}" role="img" aria-label="Flow diagram">${p}${nd}</svg>`;
}
let skTab='power';seg('sk-tab',d=>{skTab=d.v;sankeyRender()});
function sankeyRender(){
  const m=lastM;if(!m)return;const el=$('#sk');
  if(skTab==='power'){
    const loss=m.it*m.w.ls,oth=m.it*m.w.ot,coolE=m.fac-m.it-loss-oth;const U=v=>fmt(v,v<10?1:0)+' MU';
    sankey(el,[[{id:'fos',l:'Grid power',c:'--muted'},{id:'ren',l:'Clean power',c:'--good'}],[{id:'bus',l:'Facility intake',c:'--hot'}],[{id:'it',l:'Servers & GPUs',c:'--cold'},{id:'cool',l:'Cooling',c:'--heat'},{id:'loss',l:'Power-chain losses',c:'--hot'},{id:'oth',l:'Lighting & other',c:'--warn'}],[{id:'heat',l:'Heat released to air',c:'--heat'}]],
      [{s:'fos',t:'bus',v:m.fac*(1-m.share)},{s:'ren',t:'bus',v:m.fac*m.share},{s:'bus',t:'it',v:m.it},{s:'bus',t:'cool',v:coolE},{s:'bus',t:'loss',v:loss},{s:'bus',t:'oth',v:oth},{s:'it',t:'heat',v:m.it},{s:'cool',t:'heat',v:coolE},{s:'loss',t:'heat',v:loss},{s:'oth',t:'heat',v:oth}],U);
    $('#sk-sub').textContent=`${fmt(m.fac)} MU a year enters; ${(m.it/m.fac*100).toFixed(0)}% reaches the servers. Every unit ends as heat.`;
    $('#sk-note').innerHTML=`Cooling takes ${(coolE/m.fac*100).toFixed(0)}% of facility energy with ${COOLN[g.cool].toLowerCase()} in ${m.c.n}. Nothing is reused as heat today; Report 8 treats heat reuse as a future lever.`;
  }else if(skTab==='water'){
    const M=m.onW/m.ro,rej=m.onW-M,ev={tower:.7,adiab:.9,aircc:.5,dlc:.85}[g.cool];const U=v=>fmt(v,v<10?1:0)+' ML';
    sankey(el,[[{id:'src',l:WSN[g.ws]+' water',c:g.ws==='ttw'?'--good':g.ws==='ground'?'--bad':'--cold'},{id:'pp',l:'Water at power stations',c:'--muted'}],[{id:'site',l:'Cooling on site',c:'--cold'},{id:'ro',l:'RO treatment',c:'--warn'},{id:'ppl',l:'Thermal power plants',c:'--muted'}],[{id:'evap',l:'Evaporated (lost to air)',c:'--heat'},{id:'dis',l:'Discharged as blowdown',c:'--warn'},{id:'rej',l:'RO reject to drain',c:'--hot'}]],
      [{s:'src',t:'ro',v:g.ws==='ttw'?m.onW:0},{s:'ro',t:'site',v:g.ws==='ttw'?M:0},{s:'ro',t:'rej',v:rej},{s:'src',t:'site',v:g.ws==='ttw'?0:M},{s:'pp',t:'ppl',v:m.offW},{s:'site',t:'evap',v:M*ev},{s:'site',t:'dis',v:M*(1-ev)},{s:'ppl',t:'evap',v:m.offW}],U);
    $('#sk-sub').textContent=`${fmt(m.onW+m.offW)} ML a year in total: ${fmt(m.onW)} on site and ${fmt(m.offW)} at power stations.`;
    $('#sk-note').innerHTML=m.offW>m.onW?`Power-station water is ${(m.offW/Math.max(m.onW,.01)).toFixed(1)}× on-site water here. Cleaner power is also a water measure.`:'On-site evaporation dominates. Dry heat rejection or treated water are the main levers.';
  }else{
    const sh={sh:.15,el:.39,co:.18,bk:.08,fb:.05,so:.15},cf=crf(.11,20),fa=m.facCx*cf;const U=v=>'₹'+fmt(v,v<10?1:0)+' cr';
    sankey(el,[[{id:'land',l:'Land',c:'--muted'},{id:'shell',l:'Shell & core',c:'--cold-2'},{id:'elec',l:'Electrical plant',c:'--cold'},{id:'coolx',l:'Cooling plant',c:'--warn'},{id:'bk',l:'Backup power',c:'--hot'},{id:'fb',l:'Fire, BMS, network',c:'--good'},{id:'soft',l:'Soft costs & contingency',c:'--line'},{id:'itx',l:'GPUs, servers & network',c:'--heat'},{id:'en',l:'Electricity (energy)',c:'--hot'},{id:'dm',l:'Demand charges',c:'--hot'},{id:'om',l:'O&M, staff, insurance',c:'--cold-2'},{id:'wt',l:'Water',c:'--cold'}],[{id:'cap',l:'Capital recovery',c:'--cold'},{id:'op',l:'Operating costs',c:'--hot'}],[{id:'tot',l:'Annual cost',c:'--ink'}]],
      [{s:'land',t:'cap',v:m.landCx*cf},{s:'shell',t:'cap',v:fa*sh.sh},{s:'elec',t:'cap',v:fa*sh.el},{s:'coolx',t:'cap',v:fa*sh.co},{s:'bk',t:'cap',v:fa*sh.bk},{s:'fb',t:'cap',v:fa*sh.fb},{s:'soft',t:'cap',v:fa*sh.so},{s:'itx',t:'cap',v:m.itA},{s:'en',t:'op',v:m.pwr},{s:'dm',t:'op',v:m.dem},{s:'om',t:'op',v:m.om},{s:'wt',t:'op',v:m.wCost},{s:'cap',t:'tot',v:m.capA+m.itA},{s:'op',t:'tot',v:m.opex}],U);
    const tot=m.capA+m.itA+m.opex;$('#sk-sub').textContent=`₹${fmt(tot)} crore a year before incentives: ${((m.capA+m.itA)/tot*100).toFixed(0)}% capital, ${(m.opex/tot*100).toFixed(0)}% operating.`;
    $('#sk-note').innerHTML=`Capital is spread at 11% over 20 years (GPUs over 5). Water is ${(m.wCost/tot*100).toFixed(2)}% of cost, which is why price alone never curbs it.${m.incA?` Incentives offset ₹${fmt(m.incA,1)} crore a year.`:''}`;
  }
}
/* assumptions table */
const ASS=[['Grid tariffs (energy + demand)','KA ₹6.70 + ₹365/kVA; MH ₹7.27 + ₹560; TN ₹7.50 + ₹608; TG ₹6.65 + ₹500 (FY2025–26 orders)','r','State commission tariff orders, Report 7'],['UP and AP tariffs','₹7.4 and ₹7.2/kWh (typical ₹7–8)','e','Not verified in Report 7'],['Renewable landed cost','₹5.5–6.2/kWh open access; ≥₹6.4 for 90% hourly clean','e','SECI RTC ₹5.25 + charges; group captive ₹4.5–6.5 (Report 7)'],['Facility capex','Colo ₹56.1, hyperscale ₹39.2, AI ₹72.5 cr/MW before land; cooling adds ₹0–3 cr/MW','m','Report 7 cost stacks'],['GPU capex','₹266 cr per MW of IT (~425 GB300-class GPUs/MW)','m','Report 7; GB300 rack price contested at US$3.7–6.5 m'],['Land','₹3–20 cr per acre by city; 0.25–0.4 acre/MW','e','Report 7 and market reports'],['Cooling overhead and WUE','Function of design dry and wet bulb; towers ~1.8 L/kWh, adiabatic ~0.4, liquid + dry ~0.03','m','Reports 3, 4 and 6'],['Grid carbon','0.675 tCO₂/MWh for all states (FY2025-26)','r','CEA v22.0; one national grid factor'],['Power-station water','India grid 2.9 L/kWh at the meter for every state (atlas standard); state generation mixes 1.5–3.5 as a sensitivity','e','MoEFCC limits; IRENA/WRI; atlas mixes'],['Water price','BWSSB ₹99/kL; ₹80 elsewhere; groundwater ₹20; treated + RO ₹40','e','BWSSB tariff; others assumed'],['Electricity duty','7.5% of the energy charge, where waived','e','Assumption; duty rates differ by state'],['Finance','WACC 11%; facility 20 years, GPUs 5 years','m','Report 7'],['Scarcity weights','Groundwater 1.0, municipal 0.7, treated 0.1, power stations 0.4, × city stress','m','Report 6; illustrative']];
$('#s-ass').innerHTML=ASS.map(([a,b,t,s])=>`<tr><td>${a}</td><td>${b}</td><td>${evTag(t,s).replace('class="ev','class="ev show')}</td></tr>`).join('');
syncUI();setSeg('s-pre','0');sim();
