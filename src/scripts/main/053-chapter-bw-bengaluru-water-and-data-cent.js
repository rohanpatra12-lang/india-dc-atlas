
/* ---------- CHAPTER BW: Bengaluru water and data centres ---------- */
(()=>{if(!document.getElementById('cbw'))return;
const BWS=1935;
hbars(document.getElementById('bw-bal'),[['Cauvery, delivered by BWSSB',1935,'','1,935'],['Groundwater (borewells)',800,'','600–1,000'],['Freshwater demand',2600,'hot','~2,600'],['Sewage generated',2250,'','2,200–2,300'],['Sewage treated by BWSSB',1275,'','1,200–1,350'],['Treated water reused (mostly lakes)',838,'','820–855'],['Lost before billing (26.5%)',513,'hot','~510']],{max:2700});
/* 12.4 scenarios */
const H={cv:{u:STD.ref.uConv,o:{t:{n:'Chilled water + towers',pue:1.25,wue:1.8},d:{n:'Air-cooled chillers',pue:1.45,wue:.05}}},ai:{u:STD.ref.uAI,o:{t:{n:'Liquid + towers',pue:1.10,wue:1.8},a:{n:'Liquid + adiabatic',pue:1.12,wue:.25},d:{n:'Liquid + dry coolers',pue:1.15,wue:.05}}}};
let mw=600,ty='ai',cl='t',pr=99,gr=STD.gw.India;
const calc=(m,t,c,p,g)=>{const h=H[t],o=h.o[c];const it=m*h.u*8760/1000;/* GWh */const fac=it*o.pue,mld=m*h.u*o.wue*.024,mly=mld*365,ps=fac*g,cost=mly*p/10000,elec=fac*1e6*(STD.tA&&STD.tA.Karnataka||8)/1e7;return {m,t,c,o,u:h.u,it,fac,mld,mly,ps,psd:ps/365,cost,elec,sh:mld/BWS*100}};
function clBtns(){const g=document.getElementById('bw-cl');const o=H[ty].o;if(!o[cl])cl='t';g.innerHTML=Object.keys(o).map(k=>`<button data-v="${k}" aria-pressed="${k===cl}">${o[k].n}</button>`).join('')}
function r4(){const r=calc(mw,ty,cl,pr,gr);
 document.getElementById('bw-r').innerHTML=`<div><span class="v cold">${fmt(r.mld,r.mld<10?2:1)} MLD</span><span class="k">on-site water · ${fmt(r.mly,0)} ML a year</span></div><div><span class="v">${r.sh<.1?r.sh.toFixed(3):r.sh.toFixed(2)}%</span><span class="k">of BWSSB's 1,935 MLD</span></div><div><span class="v">${fmt(r.fac,0)} GWh</span><span class="k">electricity a year · PUE ${r.o.pue} · load ${Math.round(r.u*100)}%</span></div><div><span class="v hot">${fmt(r.ps,0)} ML</span><span class="k">at power stations a year (${fmt(r.psd,1)} MLD) at ${gr} L/kWh</span></div><div><span class="v">₹${fmt(r.cost,r.cost<10?1:0)} cr</span><span class="k">water bill a year at ₹${pr}/kL</span></div><div><span class="v">${(r.cost/r.elec*100).toFixed(1)}%</span><span class="k">water bill ÷ electricity bill (₹${fmt(r.elec,0)} cr at ₹${STD.tA&&STD.tA.Karnataka||8}/kWh all-in)</span></div>`;
 const tw=calc(mw,ty,'t',pr,gr),dr=calc(mw,ty,'d',pr,gr);
 document.getElementById('bw-n').textContent=`${ty==='ai'?'AI':'Conventional'} halls on ${r.o.n.toLowerCase()} use ${fmt(r.mld,1)} MLD in the city and ${fmt(r.psd,1)} MLD-equivalent at power stations. Moving from towers to ${ty==='ai'?'dry coolers':'air-cooled chillers'} would save ${fmt(tw.mld-dr.mld,1)} MLD on site for ${fmt(dr.fac-tw.fac,0)} GWh more electricity a year (${((dr.fac/tw.fac-1)*100).toFixed(0)}%), which adds ${fmt((dr.ps-tw.ps)/365,1)} MLD at power stations, so the net saving is ${fmt((tw.mld+tw.psd)-(dr.mld+dr.psd),1)} MLD. ${r.sh<2?'Even the thirstiest option is under 2% of BWSSB\'s supply; the concern is where it is drawn.':''}`;
 const rows=[];[100,600,1000].forEach(m=>{[['cv','t'],['cv','d'],['ai','t'],['ai','a'],['ai','d']].forEach(([t,c])=>rows.push(calc(m,t,c,pr,gr)))});
 document.getElementById('bw-grid').innerHTML=`<thead><tr><th>Scenario</th><th>On-site MLD</th><th>Share of BWSSB</th><th>GWh/yr</th><th>Power-station ML/yr</th><th>Water ₹ cr/yr</th></tr></thead><tbody>`+rows.map(x=>`<tr${x.m===mw&&x.t===ty&&x.c===cl?' class="sel"':''}><td>${x.m===1000?'1 GW':x.m+' MW'} ${x.t==='ai'?'AI':'conventional'}, ${x.o.n.toLowerCase()}</td><td>${fmt(x.mld,x.mld<1?2:1)}</td><td>${x.sh<.1?x.sh.toFixed(3):x.sh.toFixed(2)}%</td><td>${fmt(x.fac,0)}</td><td>${fmt(x.ps,0)}</td><td>${fmt(x.cost,x.cost<10?1:0)}</td></tr>`).join('')+'</tbody>';
 window.__BW4=r}
seg('bw-mw',d=>{mw=+d.v;r4()});seg('bw-ty',d=>{ty=d.v;clBtns();r4()});seg('bw-cl',d=>{cl=d.v;r4()});seg('bw-pr',d=>{pr=+d.v;r4()});seg('bw-gr',d=>{gr=+d.v;r4()});clBtns();r4();
/* 12.5 rack density */
const RK=[{n:'6 kW enterprise',kw:6,u:.65,f:0,pue:{t:1.55,a:1.45,d:1.6},w:{t:1.9,a:.55,d:.1}},{n:'12 kW contained',kw:12,u:.65,f:0,pue:{t:1.45,a:1.4,d:1.5},w:{t:1.8,a:.5,d:.1}},{n:'50 kW rear door',kw:50,u:.75,f:0,pue:{t:1.35,a:1.33,d:1.4},w:{t:1.7,a:.3,d:.1}},{n:'132 kW NVL72',kw:132,u:.8,f:.85,pue:{t:1.2,a:1.22,d:1.25},w:{t:1.7,a:.28,d:.05}},{n:'190 kW Vera Rubin',kw:190,u:.8,f:.9,pue:{t:1.16,a:1.18,d:1.2},w:{t:1.7,a:.25,d:.05}},{n:'600 kW Kyber',kw:600,u:.8,f:1,pue:{t:1.12,a:1.13,d:1.15},w:{t:1.7,a:.25,d:.05}}];
let rc='t';
function r5(){const rows=RK.map(r=>{const w=r.w[rc],p=r.pue[rc];return {r,w,p,day:r.kw*r.u*24*w,racks:1e5/r.kw}});
 hbars(document.getElementById('bw-rk1'),rows.map(x=>[x.r.n,x.w*1000,'',fmt(x.w*1000)+' L']),{max:2000});
 hbars(document.getElementById('bw-rk2'),rows.map(x=>[x.r.n,x.day,'hot',fmt(x.day)+' L']),{max:Math.max(...rows.map(x=>x.day))*1.02});
 document.getElementById('bw-rkt').innerHTML=`<thead><tr><th>Rack</th><th>Heat to liquid</th><th>Load</th><th>PUE</th><th>WUE (L/kWh)</th><th>L per rack per day</th><th>Racks per 100 MW</th></tr></thead><tbody>`+rows.map(x=>`<tr><td>${x.r.n}</td><td>${Math.round(x.r.f*100)}%</td><td>${Math.round(x.r.u*100)}%</td><td>${x.p.toFixed(2)}</td><td>${x.w}</td><td>${fmt(x.day)}</td><td>${fmt(x.racks)}</td></tr>`).join('')+'</tbody>';
 document.getElementById('bw-rk-n').textContent=rc==='t'?'On towers, water per MWh barely moves (1.7–1.9 kL) because evaporation is set by heat, not density; only PUE improves with liquid cooling. Per rack, water rises with kW: one 600 kW rack uses as much as ~110 enterprise racks.':rc==='a'?'With adiabatic coolers, dense liquid-cooled racks need spray far less often because their warm water can be cooled by air most of the year, so water per MWh falls by about half from air-cooled halls.':'On dry coolers (or air-cooled chillers for air racks) water is near zero for every density, but only liquid-cooled racks get there without the energy penalty of chillers: compare PUE 1.6 for 6 kW racks with 1.15–1.25 for liquid.';
 window.__BW5={rc,rows}}
seg('bw-rc',d=>{rc=d.v;r5()});r5();
/* 12.6 treated water */
const TC={at:{u:.8,wue:1.8,pue:1.10,n:'AI on towers'},aa:{u:.8,wue:.25,pue:1.12,n:'AI on adiabatic'},ct:{u:.65,wue:1.8,pue:1.25,n:'conventional on towers'}};
const PRE={w:{mw:100,km:10,tc:'at'},h:{mw:500,km:3,tc:'at'},c:{mw:100,km:10,tc:'ct'}};
let tc='at',ro=.75;const CRF=.1315;
function r6(){const m=val('bw-tmw'),km=val('bw-tkm'),ck=val('bw-tck'),pc=val('bw-tpc'),T=TC[tc];
 out('bw-tmw',fmt(m)+' MW');out('bw-tkm',km+' km');out('bw-tck','₹'+ck.toFixed(1)+' cr');out('bw-tpc','₹'+pc.toFixed(1)+' cr');
 const mk=m*T.u*T.wue*.024,feed=mk/ro,rej=feed-mk,kly=mk*1000*365;const plant=feed*pc,pipe=km*ck;const cP=plant*CRF*1e7/kly,cQ=pipe*CRF*1e7/kly,om=18,sec=12*feed/mk,lc=cP+cQ+om+sec;
 const eD=feed*1000*(ro<.9?1.0:.3)+feed*1000*.05*km;/* kWh/day */const facD=m*T.u*24*T.pue*1000;const eSh=eD/facD*100;const bill=kly*lc/1e7,pot=kly*99/1e7;
 document.getElementById('bw-tr').innerHTML=`<div><span class="v cold">${fmt(mk,2)} MLD</span><span class="k">make-up water the towers need</span></div><div><span class="v">${fmt(feed,2)} MLD</span><span class="k">secondary water drawn from the plant · ${fmt(rej,2)} MLD reject back to sewer</span></div><div><span class="v">₹${fmt(plant+pipe,0)} cr</span><span class="k">capital: plant ₹${fmt(plant,0)} · pipe ₹${fmt(pipe,0)}</span></div><div><span class="v">₹${fmt(lc,0)}/kL</span><span class="k">full cost: capital ₹${fmt(cP+cQ,0)} · O&amp;M ₹${om} · water ₹${fmt(sec,0)}</span></div><div><span class="v">₹${fmt(bill,1)} cr</span><span class="k">a year, vs ₹${fmt(pot,1)} cr on BWSSB water at ₹99</span></div><div><span class="v">${eSh.toFixed(2)}%</span><span class="k">extra electricity for treatment and pumping</span></div>`;
 const isH=tc==='at'&&m>=400;document.getElementById('bw-tn').textContent=`${fmt(m)} MW ${T.n} needs ${fmt(feed,1)} MLD of secondary water. At full cost the treated water comes to about ₹${fmt(lc,0)}/kL, ${lc<80?'below':lc<99?'close to':'above'} BWSSB's ₹99, so the atlas's ₹40/kL holds only if the trunk main is shared or publicly funded. ${m>=400?`Against Hoskote's 60 MLD allocation this uses ${Math.round(feed/60*100)}%; the rest should stay with KC Valley's lakes.`:''} ${tc==='aa'?'Adiabatic cooling needs so little water that a small branch line or even tanker deliveries of tertiary water could serve it.':''}`;
 window.__BW6={m,km,ck,pc,T,mk,feed,rej,plant,pipe,cP,cQ,om,sec,lc,eD,facD,eSh,bill,kly,ro}}
seg('bw-tc',d=>{tc=d.v;r6()});seg('bw-tro',d=>{ro=+d.v;r6()});
const press2=(id,v)=>{const b=document.querySelector(`#${id} button[data-v="${v}"]`);if(b&&b.getAttribute('aria-pressed')!=='true')b.click()};
seg('bw-tp',d=>{const p=PRE[d.v];document.getElementById('bw-tmw').value=p.mw;document.getElementById('bw-tkm').value=p.km;press2('bw-tc',p.tc);r6()});
['bw-tmw','bw-tkm','bw-tck','bw-tpc'].forEach(i=>document.getElementById(i).addEventListener('input',r6));r6();
window.__BWX={H,calc,RK,TC,CRF};
})();
