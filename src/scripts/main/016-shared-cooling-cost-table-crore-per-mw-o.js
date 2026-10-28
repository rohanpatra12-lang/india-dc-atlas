
/* ---------- shared cooling cost table (₹ crore per MW of IT, 2026) ---------- */
var CCOST=(function(){
/* room / server side: c capex, om share of capex a year, L life in years */
const R={dx:{n:'DX room units + outdoor condensers',c:6.0,om:.03,L:12},crah:{n:'CRAH air handlers, open aisles',c:4.5,om:.03,L:15},crahc:{n:'CRAH air handlers + containment',c:5.0,om:.03,L:15},
 dec:{n:'Direct evaporative air handlers',c:9.5,om:.035,L:15},iec:{n:'Indirect evaporative units (incl. trim DX)',c:11.5,om:.035,L:15},rdh:{n:'Rear-door coils + chilled-water distribution',c:7.0,om:.03,L:15},
 dlc:{n:'Manifolds, CDUs, secondary loop, residual air plant (cold plates in IT capex)',c:9.0,om:.03,L:12},im1:{n:'Immersion tanks, pumps, exchangers (fluid extra)',c:13.0,om:.045,L:15},im2:{n:'Two-phase tanks and condensers (fluid extra)',c:16.0,om:.05,L:15}};
/* heat rejection: om is added to the room rate for this part */
const J={none:{n:'Integrated in the room units',c:0,om:0,L:20},acc:{n:'Air-cooled chillers',c:4.0,om:0,L:20},fcc:{n:'Free-cooling air-cooled chillers',c:4.5,om:0,L:20},
 wcc:{n:'Water-cooled chillers + cooling towers',c:4.5,om:.005,L:15},mag:{n:'Magnetic-bearing water-cooled chillers + towers',c:4.9,om:.004,L:20},wcch:{n:'Water-cooled chillers + hybrid coolers',c:6.0,om:.002,L:15},dry:{n:'Dry coolers + trim chiller',c:6.5,om:0,L:20},
 adi:{n:'Adiabatic dry coolers + trim chiller',c:6.25,om:.002,L:15},twr:{n:'Cooling towers + plate exchangers, no chillers',c:5.5,om:.005,L:15},sea:{n:'Seawater intake, titanium exchangers, outfall',c:8.5,om:.01,L:20}};
function pair(room,rej){const r=R[room],j=J[rej]||J.none;return {room:r.c,rej:j.c,cap:r.c+j.c,om:(r.c+j.c)*r.om+j.c*j.om,Lr:r.L,Lj:j.L,rn:r.n,jn:j.n}}
return {R,J,pair,BASE:{air:46,liq:55.5},CHEM:15,FLUIDLOSS:{im1:.01,im2:.03}};
})();


const CSMAP={conv:{tower:['crahc','wcc'],adiab:['crahc','wcch'],aircc:['crahc','acc'],dlc:['dlc','dry']},ai:{tower:['dlc','twr'],adiab:['dlc','adi'],aircc:['dlc','acc'],dlc:['dlc','dry']}},CSREF={colo:[10,'crahc','wcc'],hyp:[7.5,'crahc','wcc'],ai:[17,'dlc','dry']};
const PWN={grid:'Grid only',oa:'60% renewable',rtc:'90% clean, hourly'};
const WSN={muni:'Municipal',ground:'Groundwater',ttw:'Treated wastewater'};
function coolOH(c,db,wb,ai){/* calibrated to the atlas cooling reference (Chapter 6): Bengaluru PUE = 1.06 + this */switch(c){case'tower':return ai?.04+.004*(wb-19.4):.19+.012*(wb-19.4);case'adiab':return ai?.06+.004*(db-24.6):.24+.01*(db-24.6);case'aircc':return ai?.17+.006*(db-24.6):.39+.015*(db-24.6);default:return .09+.006*Math.max(0,db-24.6)+(db+7>45?.02:0)}}
function wueOf(c,db,wb){switch(c){case'tower':return 1.8*(1+.03*(wb-19.4));case'adiab':return Math.max(.1,.4*(1+.05*(db-24.6)));case'aircc':return .02;default:return db+7>45?.1:.03}}
const K0={cx:1,pue:0,wue:1,t:0,ef:STD.co2,itx:1};
/* monthly climate normals 1991–2020 (IMD-based tables; wet-bulb derived from humidity / dew point); Noida uses New Delhi */
const CLIM={"blr":{"db":[22.3,24.3,26.8,28.1,27.4,25.2,24.2,24.1,24.3,24.0,22.9,21.7],"wb":[16.5,16.8,18.3,20.8,21.7,20.9,20.6,20.5,20.6,19.9,18.9,17.3]},"mum":{"db":[24.6,25.3,27.6,28.8,30.2,29.3,27.9,27.8,27.9,29.0,28.0,25.8],"wb":[19.2,19.4,21.9,24.1,26.1,26.7,26.2,26.0,25.6,25.0,23.0,20.7]},"che":{"db":[25.4,26.7,28.7,31.0,33.0,32.3,31.0,30.3,29.8,28.5,26.7,25.6],"wb":[22.1,23.2,25.3,27.7,28.5,28.1,27.1,26.7,27.1,26.4,24.5,22.7]},"hyd":{"db":[22.8,25.4,28.8,31.4,33.2,29.7,27.2,26.4,26.8,26.2,24.1,22.2],"wb":[16.0,16.7,18.5,20.7,22.3,23.7,23.2,23.3,23.2,21.6,18.2,15.9]},"noi":{"db":[13.8,17.4,22.7,28.9,32.7,33.3,31.5,30.4,29.5,26.2,20.5,15.6],"wb":[10.6,12.4,15.5,17.8,21.4,25.3,27.2,26.9,24.9,20.3,16.4,12.8]},"viz":{"db":[24.5,25.8,28.0,29.4,30.7,30.2,29.0,29.0,28.9,28.5,27.0,25.1],"wb":[21.2,22.2,24.6,26.5,27.5,27.2,26.4,26.6,27.0,26.1,23.7,21.3]},"pun":{"db":[20.5,22.5,25.8,29.0,30.1,27.6,25.4,24.7,25.2,25.3,22.9,20.6],"wb":[15.2,15.6,17.0,19.1,22.1,23.0,22.2,22.0,22.2,21.0,18.3,15.8]}};
const DM=[31,28,31,30,31,30,31,31,30,31,30,31];
/* cooling formulas take real temperatures; they are anchored at Bengaluru's annual mean (24.6 °C DB, 19.4 °C WB),
   where the base values are calibrated so a Bengaluru colocation site with towers has annual PUE 1.25 (the atlas cooling reference, Chapter 6) */
const TREF={db:24.6,wb:19.4};
const wueCap=(c,v)=>c==='tower'?Math.min(2.5,v):c==='adiab'?Math.min(1.6,v):v;
function climAnn(cool,city,ai){const m=CLIM[city]||CLIM.blr;let o=0,w=0;const om=[],wm=[];
  for(let i=0;i<12;i++){const d=m.db[i],b=m.wb[i],oo=coolOH(cool,d,b,ai),ww=wueCap(cool,wueOf(cool,d,b));om.push(oo);wm.push(ww);o+=oo*DM[i];w+=ww*DM[i]}
  return {o:o/365,w:w/365,om,wm}}
window.__CLIM=CLIM;window.__TREF=TREF;
function model(g,k=K0){
  const c=CITY[g.city],w=WL[g.wl],ai=g.wl==='ai',inc=INC[c.st];
  const CA=climAnn(g.cool,g.city,ai),ovhPk=coolOH(g.cool,c.db,c.wb,ai)+k.pue;
  const ovh=CA.o+k.pue,O_=w.ls+w.ot+ovh,pue0=Math.max(1.03,1+O_),pueP=Math.max(1.03,1+w.ls+w.ot+ovhPk);
  const pueM=CA.om.map(o=>Math.max(1.03,1+w.ls+w.ot+o+k.pue));
  const phi=Math.min(1,Math.max(0,(w.ot+.4*w.ls+.25*Math.max(0,ovh))/O_)),L0=w.u/100,Lr=Math.max(.1,g.u/100);
  const pue=Math.max(1.03,1+O_*(phi*L0/Lr+1-phi)); /* part-load: fixed overheads spread over less IT energy */
  const CC=g.cc||4,tsc=g.cool==='tower'?.75*CC/(CC-1):1;/* tower formula gives make-up at the standard 4 cycles; evaporation is fixed by the heat, so make-up = evaporation × C ÷ (C − 1) */
  const wue=CA.w*k.wue*tsc,wueM=CA.wm.map(x=>x*k.wue*tsc);
  const share=g.pw==='grid'?0:g.pw==='oa'?.6:.9;
  const reP=g.pw==='rtc'?Math.max(c.re+.6,6.4):c.re;
  const tar=c.t+k.t,price=share*reP+(1-share)*tar;
  const it=g.mw*g.u/100*8.76,fac=it*pue,mva=g.mw*pueP*1.12/.95;
  const mp=CSMAP[ai?'ai':'conv'][g.cool],CP=CCOST.pair(mp[0],mp[1]),ref=CSREF[g.wl],RP=CCOST.pair(ref[1],ref[2]),sc=ref[0]/RP.cap;
  const coolRoom=g.mw*CP.room*sc*k.cx,coolRej=g.mw*CP.rej*sc*k.cx,coolCx=coolRoom+coolRej,baseCx=g.mw*(w.fac-ref[0])*k.cx;
  const facCx=baseCx+coolCx,landCx=g.mw*w.ac*c.land,itCx=ai&&g.gpu?g.mw*w.it*k.itx:0;
  const capA=(baseCx+landCx)*crf(.11,20)+coolRoom*crf(.11,CP.Lr)+coolRej*crf(.11,CP.Lj),itA=itCx?itCx*crf(.11,5):0;
  const coolOM=g.mw*CP.om*sc,pwr=fac*price*.1,dem=mva*1000*c.dem*12/1e7,om=g.mw*(w.o-ref[0]*RP.om/RP.cap)+coolOM;
  const ro=g.ws==='ttw'?1/.75:1,mk=it*wue,onW=mk*ro,evf=g.cool==='tower'?(CC-1)/CC:({adiab:.9,aircc:.5,dlc:.85}[g.cool]||.8),cons=mk*evf,dis=mk*(1-evf)+(onW-mk),offW=fac*(1-share)*c.gw+fac*share*.05;
  const wp=g.ws==='muni'?c.wp:g.ws==='ground'?20:40,wCost=onW*1000*wp/1e7;
  let incA=0,elig=true;
  if(g.inc){if(inc.re51&&share<.51)elig=false;else incA=fac*.1*(inc.sub+(inc.ed?.075*tar:0))+(inc.bonus&&pue<=1.2?inc.bonus*crf(.11,20):0)}
  const chem=g.cool==='tower'?mk*1000*CCOST.CHEM/1e7:0;
  const opex=pwr+dem+om+chem+wCost,annual=capA+opex-incA,lcod=annual/it*10,total=annual+itA;
  const gu=(g.gu||70)/100,gpuh=itCx?total*1e7/(g.mw*w.gpm*8760*gu):null;
  const co2=fac*1000*k.ef*(1-share),cue=co2/(it*1000);
  const sf=g.ws==='ground'?1:g.ws==='muni'?.7:.1,scW=onW*sf*c.ws+offW*.4;
  return {coolCx,coolRoom,coolRej,baseCx,CP,coolOM,chem,CC,tsc,c,w,ai,pue,pue0,pueP,ovhPk,pueM,wueM,CA,mk,cons,dis,evf,gu,ovh,phi,L0,wue,share,price,reP,tar,it,fac,mva,facCx,landCx,itCx,capex:facCx+landCx+itCx,capA,itA,pwr,dem,om,wCost,incA,elig,opex,annual,lcod,total,gpuh,co2,cue,onW,offW,scW,ro,rent:annual*1e7/(g.mw*1000*12)};
}
const KLO={cx:.88,pue:-.04,wue:.7,t:-.5,ef:STD.E.co2.lo,itx:.88},KHI={cx:1.12,pue:.04,wue:1.35,t:.5,ef:STD.E.co2.hi,itx:1.55};
const rngOf=(g,f)=>{const a=f(model(g,KLO)),b=f(model(g,KHI));return [Math.min(a,b),Math.max(a,b)]};
const volt=mva=>mva<=20?'66 kV':mva<=55?'110 kV':mva<=250?'220 kV, dual feed':'400 kV';
window.__dcModel=model;
