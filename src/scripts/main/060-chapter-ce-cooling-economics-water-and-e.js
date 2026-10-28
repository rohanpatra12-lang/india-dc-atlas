
/* ---------- CHAPTER CE: cooling economics, water and energy ---------- */
var CEM=(function(){
const CCT=(typeof CCOST!=='undefined')?CCOST:require('./cc_table.js');
const crf=(r,n)=>r/(1-Math.pow(1+r,-n));
/* all-in HT tariffs at 75% load factor (Oct 2026 research), water ₹/kL, grid water L/kWh, compressor-free hours for dry coolers at 35 °C supply */
const CITY={blr:{n:'Bengaluru',cl:'b',t:STD.tA["Karnataka"],wp:STD.wp,gw:STD.gw["Karnataka"],st:'Karnataka · BESCOM HT-2(a)',fh:71},pun:{n:'Pune',cl:'b',t:STD.tA["Maharashtra"],wp:80,gw:STD.gw["Maharashtra"],st:'Maharashtra · MSEDCL HT-I(A)',fh:66},
 hyd:{n:'Hyderabad',cl:'d',t:STD.tA["Telangana"],wp:80,gw:STD.gw["Telangana"],st:'Telangana · TGSPDCL HT-I(A)',fh:53},noi:{n:'Delhi NCR (Noida)',cl:'d',t:STD.tA["Uttar Pradesh"],wp:80,gw:STD.gw["Uttar Pradesh"],st:'Uttar Pradesh · HV-2',fh:59},
 mum:{n:'Mumbai',cl:'c',t:STD.tA["Maharashtra"],wp:80,gw:STD.gw["Maharashtra"],st:'Maharashtra · MSEDCL HT-I(A)',fh:27},che:{n:'Chennai',cl:'c',t:STD.tA["Tamil Nadu"],wp:80,gw:STD.gw["Tamil Nadu"],st:'Tamil Nadu · TNPDCL HT-I',fh:32}};
const CLN={b:'plateau',c:'humid coast',d:'hot-dry'};
/* PUE and on-site WUE (L/kWh IT) for plateau / humid coast / hot-dry, after the Oct 2026 research corrections */
const SYS=(typeof STD!=='undefined'&&STD.cool)?STD.cool:[
 {id:'dx',n:'DX room units + condensers',room:'dx',rej:'none',max:10,liq:0,p:[1.70,1.80,1.80],w:[.05,.05,.05]},
 {id:'crah',n:'CRAH, open aisles + air-cooled chillers',room:'crah',rej:'acc',max:12,liq:0,p:[1.50,1.60,1.55],w:[.05,.05,.05]},
 {id:'acc',n:'CRAH + containment + air-cooled chillers',room:'crahc',rej:'acc',max:30,liq:0,p:[1.45,1.55,1.50],w:[.05,.05,.05]},
 {id:'fcc',n:'CRAH + containment + free-cooling chillers',room:'crahc',rej:'fcc',max:30,liq:0,p:[1.35,1.45,1.40],w:[.05,.05,.05]},
 {id:'wcc',n:'CRAH + containment + water-cooled chillers + towers',room:'crahc',rej:'wcc',max:30,liq:0,p:[1.25,1.35,1.30],w:[1.8,2.4,2.4],tw:1},
 {id:'mag',n:'CRAH + containment + magnetic-bearing chillers + towers',room:'crahc',rej:'mag',max:30,liq:0,p:[1.22,1.32,1.27],w:[1.8,2.4,2.4],tw:1},
 {id:'hyb',n:'CRAH + containment + chillers + hybrid coolers',room:'crahc',rej:'wcch',max:30,liq:0,p:[1.30,1.35,1.35],w:[.45,.90,.60]},
 {id:'iec',n:'Indirect evaporative units',room:'iec',rej:'none',max:30,liq:0,p:[1.20,1.30,1.25],w:[.55,.80,.80]},
 {id:'rdh',n:'Rear-door coils + free-cooling chillers',room:'rdh',rej:'fcc',max:50,liq:0,p:[1.33,1.43,1.38],w:[.05,.05,.05]},
 {id:'dlc32',n:'Direct-to-chip W32 + dry coolers + trim',room:'dlc',rej:'dry',max:250,liq:1,p:[1.17,1.21,1.20],w:[.05,.05,.05]},
 {id:'dlc40',n:'Direct-to-chip W40 + dry coolers + trim',room:'dlc',rej:'dry',max:250,liq:1,p:[1.15,1.18,1.17],w:[.05,.05,.05]},
 {id:'dlca',n:'Direct-to-chip + adiabatic coolers',room:'dlc',rej:'adi',max:250,liq:1,p:[1.12,1.14,1.15],w:[.25,.40,.45]},
 {id:'dlct',n:'Direct-to-chip + towers, no chillers',room:'dlc',rej:'twr',max:250,liq:1,p:[1.10,1.12,1.12],w:[1.8,2.2,2.2],tw:1},
 {id:'im1',n:'Single-phase immersion + dry coolers',room:'im1',rej:'dry',max:150,liq:2,p:[1.08,1.09,1.10],w:[.05,.05,.05],fl:.18,loss:.01},
 {id:'im2',n:'Two-phase immersion + dry coolers',room:'im2',rej:'dry',max:250,liq:2,p:[1.06,1.07,1.08],w:[.05,.05,.05],fl:.7,loss:.03,warn:'Not for new builds: PFAS fluids, 3M exit'}];
const ci={b:0,c:1,d:2};
const DEF={city:'blr',mw:10,u:65,rack:10,disc:11,t:null,wp:null,fan:1,comp:1};
function compFrac(r){return r<=10?0:r<=20?.10*(r-10)/10:r<=40?.10+.04*(r-20)/20:.14}
function one(s,o,c,EIT){const k=ci[c.cl],P=CCT.pair(s.room,s.rej),pue=s.p[k],wue=s.w[k],r=o.disc/100;
 const tanks=o.mw*1000/Math.max(o.rack,100),fluid=s.fl?tanks*s.fl:0,cR=o.mw*P.room,cJ=o.mw*P.rej;
 const capA=cR*crf(r,P.Lr)+cJ*crf(r,P.Lj)+fluid*crf(r,P.Lr);
 const kL=EIT*wue;/* kL a year */
 const om=o.mw*P.om+(s.tw?kL*CCT.CHEM/1e7:0)+(s.fl?fluid*s.loss:0);
 const elec=EIT*Math.max(.01,pue-1.06)*1000*o.t/1e7,water=kL*o.wp/1e7;
 const dz=Math.min(1,Math.max(0,(o.rack-10)/30)),rel=o.rack<=50,fanS=s.liq===1?.03+.04*dz:s.liq===2?.05+.045*dz:0,fan=o.fan&&rel?EIT*fanS*pue*1000*o.t/1e7:0;
 const comp=o.comp&&s.liq&&rel?o.mw*CCT.BASE.air*compFrac(o.rack)*crf(r,20):0;
 const tot=capA+om+elec+water-fan-comp;
 return {s,P,pue,wue,ok:o.rack<=s.max,capex:cR+cJ+fluid,cR,cJ,fluid,capA,om,elec,water,fan,comp,tot,lcoc:tot*1e7/EIT,siteML:kL/1000,peakWUE:s.tw?wue*2.2:null,tw:wue+pue*c.gw,co2:pue*STD.co2,coolKW:Math.max(.01,pue-1.06)}}
function compute(o0){const o=Object.assign({},DEF,o0),c=CITY[o.city];if(o.t==null)o.t=c.t;if(o.wp==null)o.wp=c.wp;const EIT=o.mw*o.u/100*8760;
 const rows=SYS.map(s=>one(s,o,c,EIT));const ok=rows.filter(x=>x.ok).sort((a,b)=>a.lcoc-b.lcoc);
 const by=id=>rows.find(x=>x.s.id===id);
 /* break-evens */
 const beW=(a,b)=>{const A=by(a),B=by(b);if(!A.ok||!B.ok)return null;const per=EIT*A.wue/1e7-EIT*B.wue/1e7;if(per<=0)return null;return o.wp+(B.tot-A.tot)/per};
 const beT=(a,b)=>{const f=t=>{const oo=Object.assign({},o,{t});return [one(SYS.find(s=>s.id===a),oo,c,EIT).tot,one(SYS.find(s=>s.id===b),oo,c,EIT).tot]};const [a1,b1]=f(5),[a2,b2]=f(15);const sa=(a2-a1)/10,sb=(b2-b1)/10,ia=a1-5*sa,ib=b1-5*sb;if(Math.abs(sb-sa)<1e-9)return null;return (ia-ib)/(sb-sa)};
 const beG=(a,b)=>{const A=by(a),B=by(b);const dp=B.pue-A.pue;return dp>0?(A.wue-B.wue)/dp:null};
 let dens=null;{const best=r=>{const oo=Object.assign({},o,{rack:r});const rr=SYS.map(s=>one(s,oo,c,EIT));const air=rr.filter(x=>!x.s.liq&&x.ok);const liq=rr.find(x=>x.s.id==='dlc40');return air.length?liq.tot<=Math.min(...air.map(x=>x.tot)):true};for(let r=5;r<=60;r+=1){if(best(r)){dens=r;break}}}
 return {o,c,EIT,rows,ok,best:ok[0],be:{twFcc:beW('wcc','fcc'),twAcc:beW('wcc','acc'),dlcTwDry:beW('dlct','dlc40'),immT:beT('im1','dlc40'),gTwAcc:beG('wcc','acc'),gIec:beG('iec','acc'),gHyb:beG('hyb','acc'),gDlc:beG('dlct','dlc40'),dens}}}
return {CITY,CLN,SYS,DEF,compute,compFrac,fanShare:(liq,rack)=>{const dz=Math.min(1,Math.max(0,(rack-10)/30));return liq===1?.03+.04*dz:liq===2?.05+.045*dz:0}}})();
