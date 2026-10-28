
/* ---------- DATA CENTRE MODEL: lifetime value ---------- */
var DTV=(function(){
const USD=STD.fx;
/* comparator projects: per unit, ₹ crore; constant 2026 rupees, pre-tax */
const COMP={
 solar:{n:'Utility solar plant',unit:'MW',cap:4.0,rev:0.64,ebm:.88,life:25,ramp:[1],sus:.005,mid:{at:[12],f:.08},jobs:.1,water:250,elec:-2450,dom:.55,
  basis:'₹4.0 cr/MW (CTUIL benchmark ₹3.5; recent SJVN awards ₹4.2–5.5); 28% CUF → 2,450 MWh/MW at ₹2.6/kWh (SECI-type tariff); O&M ~12% of revenue; inverters replaced around year 12.'},
 cement:{n:'Integrated cement plant',unit:'MTPA',cap:725,rev:360,ebm:.19,life:35,ramp:[.6,.85,1],sus:.02,mid:null,jobs:250,water:144000,elec:54000,dom:.85,
  basis:'₹725 cr per MTPA (≈₹1.2 lakh cr for 160–170 Mt of FY26–28 additions, CRISIL); 72% utilisation × ~₹5,000/t; EBITDA ~₹950/t.'},
 steel:{n:'Integrated steel plant',unit:'MTPA',cap:5200,rev:4675,ebm:.19,life:40,ramp:[.6,.85,1],sus:.03,mid:{at:[15,30],f:.08},jobs:700,water:2550000,elec:468000,dom:.7,
  basis:'₹5,200 cr per MTPA (JSW 5 MTPA expansion ₹26,000 cr); 85% utilisation × ~₹55,000/t; EBITDA ~₹10,500/t; blast-furnace relines at years 15 and 30.'},
 hosp:{n:'Private multi-speciality hospital',unit:'bed',cap:2.0,rev:1.76,ebm:.25,life:30,ramp:[.45,.7,.9,1],sus:.03,mid:{every:10,f:.25},jobs:2.5,water:164,elec:20,dom:.6,
  basis:'~₹2 cr per bed (CRISIL sector capex ÷ beds added ≈ ₹2.4 cr incl. acquisitions); mature revenue ₹1.76 cr/bed (Max Healthcare FY26: ₹10,538 cr on 6,000 beds, ARPOB ₹78,000, 76% occupancy), EBITDA 25%; medical equipment renewed every 10 years.'},
 fab:{n:'Semiconductor fab (mature node)',unit:'fab of 50,000 wafers/month',cap:91000,rev:9300,ebm:.40,life:25,ramp:[.15,.4,.7,.9,1],sus:.01,mid:{every:8,f:.08},jobs:4000,water:4400000,elec:900000,dom:.2,sub:.7,
  basis:'Tata–PSMC Dholera: ₹91,000 cr for 50,000 wafers/month (28–110 nm). Revenue assumes 80% utilisation × ~$2,200 per 300 mm wafer (blend of 28–110 nm); EBITDA 40% (mature foundries such as UMC run 40–45%); tool upgrades of 8% of capex every 8 years; 20,000 jobs claimed incl. indirect, ~4,000 direct assumed. Government support of up to ~70% of project cost (50% central ISM + state).'}};
const GPR={cpu:0,l40s:70,h100:170,b200:300,gb200:330,gb300:380,rubin:600};
const TOKP={m8:8,m70:50,moe:80,m405:250};
const DEFV={biz:'gpu',life:25,ref:5,rent:8000,gpr:380,tokp:50,dec:15,dect:25,disc:11,comp:'solar',sub:0,occ:90,cpue:1.5};
function npv(cf,r){let v=0;for(let i=0;i<cf.length;i++)v+=cf[i]/Math.pow(1+r,i-1);return v}
function irr(cf){const f=r=>npv(cf,r);let lo=-.95,hi=5,flo=f(lo),fhi=f(hi);if(!isFinite(flo)||flo*fhi>0)return null;for(let i=0;i<200;i++){const m=(lo+hi)/2,fm=f(m);if(fm*flo>0){lo=m;flo=fm}else hi=m}return (lo+hi)/2}
function payback(cf){let c=0;for(let i=0;i<cf.length;i++){const p=c;c+=cf[i];if(i>1&&p<0&&c>=0)return (i-1)-1+(-p)/(cf[i]||1)}return null}
function metrics(o,V){const cf=o.rev.map((r,i)=>r-o.opx[i]-o.cap[i]);let cum=0;o.cum=cf.map(x=>cum+=x);o.cf=cf;o.ebitda=o.rev.map((r,i)=>r-o.opx[i]);
 o.npv=npv(cf,V.disc/100);o.irr=irr(cf);o.pb=payback(cf);o.lifeRev=o.rev.reduce((a,b)=>a+b,0);o.lifeE=o.ebitda.reduce((a,b)=>a+b,0);o.lifeCap=o.cap.reduce((a,b)=>a+Math.max(b,0),0);o.mult=o.lifeE/o.lifeCap;
 const ops=o.rev.length-2;o.revS=o.rev.slice(2).reduce((a,b)=>a+b,0)/ops;o.ebS=o.ebitda.slice(2).reduce((a,b)=>a+b,0)/ops;o.marg=o.revS>0?o.ebS/o.revS:0;return o}
/* data centre cash flows; index 0 = year −1 (construction), 1 = year 0, 2.. = operating years 1..L */
function dc(R,S,V){const L=V.life,own=V.biz!=='colo',fac=R.facCap,it=R.itCap,n=L+2,z=()=>new Array(n).fill(0);const rev=z(),opx=z(),cap=z(),buys=[];
 cap[0]=.5*fac;cap[1]=.5*fac+(own?it:0);if(own)buys.push(0);
 if(own)for(let k=1;k*V.ref<L;k++){cap[k*V.ref+1]+=it;buys.push(k*V.ref)}
 const midY=L>=18?15:null;if(midY)cap[midY+1]+=.20*R.baseCap;
 const coolBuys=[];const rep=(part,life,tag)=>{for(let y=life;y<L;y+=life){cap[y+1]+=part;coolBuys.push([y,tag])}};rep(R.coolRoom,R.CP.Lr,'room');if(R.coolRej>0)rep(R.coolRej,R.CP.Lj,'rej');
 const lastR=Math.floor((L-1)/R.CP.Lr)*R.CP.Lr,lastJ=Math.floor((L-1)/R.CP.Lj)*R.CP.Lj;
 let resid=.1*R.baseCap+R.coolRoom*Math.max(0,1-(L-lastR)/R.CP.Lr)+R.coolRej*Math.max(0,1-(L-lastJ)/R.CP.Lj);if(own){const b=buys[buys.length-1];resid+=it*Math.max(0,(V.ref-(L-b))/V.ref)}cap[L+1]-=resid;
 const C=R.cost,u=S.u/100,occT=V.occ/100;
 for(let t=1;t<=L;t++){const i=t+1,age=(t-1)%V.ref;let r=0;
  if(V.biz==='colo'){const occ=t===1?Math.min(occT,.5):t===2?Math.min(occT,.75):occT;const pw=(C.energy+C.demand)*occ/occT,rec=pw*V.cpue/R.pue;r=V.rent*S.mw*1000*12*occ/1e7+rec;opx[i]=pw+C.water*occ/occT+C.om+C.cool+C.staff+.05*(r-rec)}
  else{if(V.biz==='gpu')r=R.gpus*8760*u*V.gpr*Math.pow(1-V.dec/100,age)/1e7;
   else r=(R.tok*365/1e6*V.tokp*Math.pow(1-V.dect/100,age)+R.gpus*8760*u*(R.tr/100)*V.gpr*Math.pow(1-V.dec/100,age))/1e7;
   opx[i]=C.energy+C.demand+C.water+C.om+C.cool+C.staff+(C.itm||0)+.10*r}
  rev[i]=r}
 const o=metrics({rev,opx,cap,buys,coolBuys,midY,resid,L,own,P:fac+(own?it:0)},V);
 o.dom=(R.baseCap*.7+R.coolCap*.4+(own?it*.05:0))/o.P;o.coolLife=R.coolCap+coolBuys.reduce((a,[y,t])=>a+(t==='room'?R.coolRoom:R.coolRej),0);o.coolOpex=C.cool*L;o.jobs=C.staff*5;o.water=R.siteKL;o.elec=R.facMWh;o.itShare=own?(it*buys.length)/o.lifeCap:0;return o}
function comp(key,P,V){const c=COMP[key],L=c.life,n=L+2,z=()=>new Array(n).fill(0);const rev=z(),opx=z(),cap=z();const sub=(V.sub&&c.sub)?c.sub:0,Pn=P*(1-sub);
 cap[0]=.5*Pn;cap[1]=.5*Pn;const units=P/c.cap;
 for(let t=1;t<=L;t++){const i=t+1,rp=c.ramp[t-1]!=null?c.ramp[t-1]:1;rev[i]=units*c.rev*rp;opx[i]=rev[i]*(1-c.ebm);cap[i]+=P*c.sus;
  if(c.mid){if(c.mid.at&&c.mid.at.includes(t)&&t<L)cap[i]+=P*c.mid.f;if(c.mid.every&&t%c.mid.every===0&&t<L)cap[i]+=P*c.mid.f}}
 cap[L+1]-=.1*P;
 const o=metrics({rev,opx,cap,L,P,Pn,units},V);o.key=key;o.c=c;o.dom=c.dom;o.jobs=units*c.jobs;o.water=units*c.water;o.elec=units*c.elec;o.sub=sub;return o}
return {COMP,GPR,TOKP,DEFV,dc,comp,npv,irr,USD}})();
