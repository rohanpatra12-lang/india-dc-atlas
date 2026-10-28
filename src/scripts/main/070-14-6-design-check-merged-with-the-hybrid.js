
/* ---------- 14.6 design check (merged with the hybrid campus tool) ---------- */
(()=>{
const real=document.__realGet||document.getElementById.bind(document);
if(!real('ctwin5')||!real('hy-in'))return;
const $h=id=>real(id);
const SV=(f,d)=>{try{const v=+f();return isFinite(v)&&v>0?v:d}catch(e){return d}};
const CO2=SV(()=>window.STD.co2,0.675),FX0=SV(()=>window.STD.fx,90);
const CLIM=['Plateau','Humid coast','Hot-dry'];
/* cities: climate class, all-in tariff (atlas register), demand charge and design temperatures (14.2 city table), potable price, water stress */
const LOC={
 blr:{n:'Bengaluru',st:'Karnataka',c:0,tar:8.0,dem:365,tod:1.5,gwS:1.54,pw:99,tDes:34.7,tMean:24.0,stress:'High',src:'BESCOM HT-2(a) all-in ₹8.0; demand ₹365 (KERC, Mar 2026); BWSSB ₹99/kL; time-of-day spread estimate'},
 mum:{n:'Mumbai / Navi Mumbai',st:'Maharashtra',c:1,tar:9.1,dem:560,tod:2.0,gwS:2.84,pw:80,tDes:35.3,tMean:27.5,stress:'Medium',src:'MSEDCL HT-I(A) all-in ₹9.1; demand ₹560; water and time-of-day spread estimates'},
 pun:{n:'Pune',st:'Maharashtra',c:0,tar:9.1,dem:560,tod:2.0,gwS:2.84,pw:80,tDes:38.4,tMean:25.0,stress:'Medium',src:'MSEDCL HT-I(A) all-in ₹9.1; demand ₹560; water and time-of-day spread estimates'},
 che:{n:'Chennai',st:'Tamil Nadu',c:1,tar:8.8,dem:608,tod:1.8,gwS:2.10,pw:194,tDes:38.4,tMean:28.6,stress:'High',src:'TNPDCL HT-I all-in ₹8.8; demand ₹608; CMWSSB industry ₹194/kL above 500 kL; time-of-day spread estimate'},
 hyd:{n:'Hyderabad',st:'Telangana',c:2,tar:8.3,dem:500,tod:2.0,gwS:3.11,pw:80,tDes:40.4,tMean:26.5,stress:'Medium',src:'TGSPDCL HT-I(A): demand ₹500, time-of-day +1.50/−0.50 (FY2026-27); water estimate'},
 ncr:{n:'Delhi NCR (Noida)',st:'Uttar Pradesh',c:2,tar:7.2,dem:450,tod:2.0,gwS:3.28,pw:80,tDes:41.8,tMean:25.0,stress:'Extremely high',src:'UPPCL HV-2 all-in ₹7.2; demand ₹450; water and time-of-day spread estimates'},
 kol:{n:'Kolkata',st:'West Bengal',c:1,tar:8.0,dem:475,tod:1.5,gwS:3.45,pw:80,tDes:37.2,tMean:26.8,stress:'Medium',src:'Tariff estimate (energy charge ₹7.20 + demand ₹475); water estimate'},
 viz:{n:'Visakhapatnam',st:'Andhra Pradesh',c:1,tar:7.9,dem:475,tod:1.5,gwS:2.60,pw:80,tDes:36.4,tMean:28.0,stress:'Medium',src:'Tariff estimate (energy charge ₹7.20 + demand ₹475); water estimate'},
rez:{n:'Remote renewable zone (inland Andhra, e.g. Anantapur–Kurnool)',st:'Andhra Pradesh',c:2,tar:7.9,dem:475,tod:1.5,gwS:2.60,pw:40,tDes:41.0,tMean:27.5,stress:'High',src:'Atlas estimate for a remote site: Andhra Pradesh tariff and grid water; hot-dry climate like Kurnool (design ~41 °C); drought-prone, so water is scarce; water price assumes an industrial or canal supply'}
};
/* atlas cooling table: PUE / on-site WUE by climate, rack ceiling; heat rejection type, chiller unit MW, liquid fraction, cost (₹ cr/MW, 14.2 tables), loop supply °C for dry coolers */
const COOL=[
 {id:'dx',n:'DX room units + condensers',max:10,p:[1.70,1.80,1.80],w:[.05,.05,.05],rej:'cond',chU:0,f:0,cap:48},
 {id:'acc',n:'Air-cooled chillers + containment',max:30,p:[1.45,1.55,1.50],w:[.05,.05,.05],rej:'dry',chU:1.5,f:0,cap:53},
 {id:'fcc',n:'Free-cooling chillers + containment',max:30,p:[1.35,1.45,1.40],w:[.05,.05,.05],rej:'dry',chU:1.5,f:0,cap:54.5},
 {id:'wcc',n:'Water-cooled chillers + towers',max:30,p:[1.25,1.35,1.30],w:[1.8,2.4,2.4],rej:'tower',chU:3.5,f:0,cap:55.5},
 {id:'hyb',n:'Chillers + hybrid (wet/dry) coolers',max:30,p:[1.30,1.35,1.35],w:[.45,.90,.60],rej:'hyb',chU:1.5,f:0,cap:56.5},
 {id:'iec',n:'Indirect evaporative units',max:30,p:[1.20,1.30,1.25],w:[.55,.80,.80],rej:'adi',chU:0,f:0,cap:56},
 {id:'rdh',n:'Rear-door coils + free-cooling chillers',max:50,p:[1.33,1.43,1.38],w:[.05,.05,.05],rej:'dry',chU:1.5,f:0,cap:59.5},
 {id:'dlc32',n:'Direct-to-chip W32 + dry coolers + trim',max:250,p:[1.17,1.21,1.20],w:[.05,.05,.05],rej:'dry',chU:0,f:.85,cap:76.5,sup:32},
 {id:'dlc40',n:'Direct-to-chip W40 + dry coolers + trim',max:250,p:[1.15,1.18,1.17],w:[.05,.05,.05],rej:'dry',chU:0,f:.85,cap:76.5,sup:40},
 {id:'dlca',n:'Direct-to-chip + adiabatic coolers',max:250,p:[1.12,1.14,1.15],w:[.25,.40,.45],rej:'adi',chU:0,f:.85,cap:77.5},
 {id:'dlct',n:'Direct-to-chip + cooling towers',max:250,p:[1.10,1.12,1.12],w:[1.8,2.2,2.2],rej:'tower',chU:0,f:.85,cap:75.5},
 {id:'im1',n:'Single-phase immersion + dry coolers',max:150,p:[1.08,1.09,1.10],w:[.05,.05,.05],rej:'dry',chU:0,f:1,cap:73,sup:40}];
const REJN={cond:'air-cooled condensers',dry:'dry coolers',tower:'cooling towers',adi:'adiabatic coolers',hyb:'hybrid coolers'};
const PEAKK={cond:.03,dry:.03,tower:.02,adi:.025,hyb:.025},UNIT={cond:1.2,dry:1.2,tower:4,adi:1.5,hyb:2},PF={cond:1.3,dry:1.3,tower:1.5,adi:3.0,hyb:2.0},YARD={cond:250,dry:250,tower:60,adi:180,hyb:150};
const REFCAP={A:76.5,G:54.5},ELEC=.04,PKZ={T:.97,I:.79,G:.80};
const REDM={'N':{cap:.9,n:x=>x,lab:'N'},'N+1':{cap:1,n:x=>x+Math.ceil(x/4),lab:'N+1'},'2N':{cap:1.12,n:x=>2*x,lab:'2N'},'2N+1':{cap:1.15,n:x=>2*x+1,lab:'2N+1'}};
const STRESS={High:[500,2000],'Extremely high':[500,2000],Medium:[1000,4000],Low:[2500,10000]};
const _CH=STD.chips,_g=(id,n,tps)=>{const c=_CH[id],m=c.mlp.l70;return {n,kw:+(c.kw*1.1).toFixed(2),tps:m?Math.round(m[0]):tps,bf16:c.bf16,src:`${c.kwSrc} + 10% network (atlas register); ${m?'MLPerf Llama 2 70B Server '+m[1]:'throughput estimate: H200 ÷ 1.43 (memory bandwidth ratio)'}`}};
const GPU={h100:_g('h100','H100 SXM (HGX/DGX)',2885),h200:_g('h200','H200 SXM (HGX/DGX)'),b200:_g('b200','B200 (HGX/DGX)'),b300:_g('b300','B300 Blackwell Ultra (HGX/DGX)'),mi355x:_g('mi355x','AMD MI355X (8-GPU platform)'),
 gb200:{n:'GB200 NVL72',kw:1.75,tps:12000,bf16:2500,src:'≈120 kW per 72-GPU rack + 5%; NVIDIA v4.1 preview'}};
const RUNS={gpt3:['GPT-3 175B (2020)',1287,null],l70:['Llama 3.1 70B',null,7.0e6],l405:['Llama 3.1 405B',null,30.84e6],custom:['Custom',null,null]};
/* energy per run on the chosen GPU: Meta's H100 GPU-hours × (H100 BF16 989 TFLOPS ÷ this GPU's BF16) × this GPU's all-in kW */
const eRunFor=(run,gpu)=>{const R=RUNS[run];if(!R)return null;if(R[2]){const G=GPU[gpu]||GPU.h100;return Math.round(R[2]*989/G.bf16*G.kw/1000)}return R[1]};
const DEF0={"itMW": 50, "loc": "blr", "shT": 40, "shI": 40, "uT": 90, "uI": 70, "uG": 65, "cmp": 12, "idl": 20, "red": "N+1", "dT": 130, "cT": "dlc40", "dI": 60, "cI": "dlca", "dG": 12, "cG": "fcc", "ovr": false, "pT": 1.18, "wT": 0.05, "pI": 1.14, "wI": 0.4, "pG": 1.45, "wG": 0.05, "gpu": "b200", "kwGPU": 2.0, "tps": 12500, "der": 10, "tpq": 500, "run": "l70", "eRun": 9800, "gridCap": 0, "land": 0, "alloc": 0, "dieselH": 48, "re": 45, "ciB": "avg", "gwB": "nat", "tar": 8.0, "tarRE": 6.5, "pot": 50, "pw": 99, "tw": 40, "ewGPU": 2.6, "s3": true, "bMWh": 10, "bDur": 2, "bCost": 135, "bCyc": 1, "bRTE": 90, "bDoD": 90, "peak": 5, "spk": 10, "dem": 365, "tod": 1.5, "dr": 0, "flex": 60, "win": 4, "ciCut": 20, "facA": 74, "facG": 56.1, "itA": 266, "itG": 110, "dutyA": 0, "dutyG": 0, "landC": 3, "wplant": 1.2, "cont": 7, "wacc": 11, "lifeF": 20, "lifeI": 5, "lifeB": 12, "omF": 1.5, "omI": 2, "staff": 0.3, "ins": 0, "fx": 90, "kGW": 1, "kCI": 1};DEF0.fx=FX0;
const PRESETS={ai50:{},
 edge10:{itMW:10,loc:'mum',shT:0,shI:75,dT:60,dI:40,dG:10,cT:'dlc32',cI:'rdh',cG:'acc',gpu:'h200',run:'gpt3',re:30,bMWh:4,peak:2,uI:60},
 remote300:{itMW:300,loc:'rez',shT:100,shI:0,uT:92,cmp:12,idl:20,dT:140,cT:'dlc40',red:'N',gpu:'b300',run:'l405',re:85,tarRE:5.6,landC:0.6,pw:40,pot:100,bMWh:80,bDur:2,peak:30,spk:25,flex:0,win:0,dieselH:12},
 hyper200:{itMW:200,loc:'viz',shT:75,shI:20,dT:130,dI:120,dG:15,cT:'dlc40',cI:'dlc40',cG:'fcc',gpu:'gb200',run:'l405',re:60,bMWh:80,bDur:4,peak:20,red:'N+1'},
 flex50:{itMW:50,loc:'che',shT:50,shI:40,cT:'dlc40',cI:'dlca',cG:'iec',gpu:'b200',re:50,bMWh:30,bDur:2,bCyc:2,peak:15,spk:20,flex:80,win:6},
 colo20:{itMW:20,loc:'mum',shT:0,shI:0,dG:10,cG:'wcc',re:20,bMWh:0,peak:0,red:'2N',pot:30}};
let S={},pre='ai50',pins=[],sensOut='tco';
const coolOf=id=>COOL.find(c=>c.id===id)||COOL[0];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function coolPUE(T){const L=LOC[T.loc];[['T','cT'],['I','cI'],['G','cG']].forEach(([z,k])=>{const c=coolOf(T[k]);T['p'+z]=c.p[L.c];T['w'+z]=c.w[L.c]})}
function fill(p){S={...DEF0,...p};const L=LOC[S.loc];S.tar=L.tar;S.dem=L.dem;S.tod=L.tod;S.pw=L.pw;const G=GPU[S.gpu];S.kwGPU=G.kw;S.tps=G.tps;{const e=eRunFor(S.run,S.gpu);if(e)S.eRun=e}coolPUE(S);Object.assign(S,p)}
const crf=(r,n)=>r<=0?1/n:r/(1-Math.pow(1+r,-n));
const nf=(n,d=0)=>(+n).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d});
const fL=l=>l>=1e9?nf(l/1e9,2)+' billion L':l>=1e6?nf(l/1e6,1)+' million L':l>=1e3?nf(l/1e3,1)+' thousand L':nf(l,0)+' L';
const fCr=c=>Math.abs(c)>=1e5?'₹'+nf(c/1e5,2)+' lakh cr':Math.abs(c)>=1?'₹'+nf(c,Math.abs(c)>=100?0:2)+' cr':'₹'+nf(c*100,1)+' lakh';
const fMWh=m=>m>=1000?nf(m/1000,1)+' GWh':nf(m,0)+' MWh';
const fT=t=>t>=1000?nf(t/1000,1)+' kt':nf(t,0)+' t';
const fN=n=>n>=1e7?nf(n/1e7,n>=1e10?0:n>=1e9?1:2)+' crore':n>=1e5?nf(n/1e5,1)+' lakh':nf(n,0);
const ZN={T:'Training',I:'Inference',G:'General-purpose'},ZC={T:'--hot',I:'--cold',G:'--muted'};

function compute(S){
  const L=LOC[S.loc],RD=REDM[S.red]||REDM['N+1'];
  const rT=Math.max(0,S.shT),rI=Math.max(0,S.shI),over=rT+rI>100,sum=over?rT+rI:100;
  const sh={T:rT/sum,I:rI/sum,G:Math.max(0,100-rT-rI)/sum};
  const uTb=S.uT/100,cm=clamp(S.cmp==null?12:S.cmp,1,12)/12,uTe=cm*uTb+(1-cm)*clamp(S.idl==null?20:S.idl,0,100)/100;
  const u={T:uTe,I:S.uI/100,G:S.uG/100},dens={T:S.dT,I:S.dI,G:S.dG};
  const ci=(S.ciB==='marg'?0.963:CO2)*S.kCI,gw=(S.gwB==='state'?L.gwS:2.9)*S.kGW,re=clamp(S.re,0,100)/100,dT=L.tDes-L.tMean;
  const Z={};let it=0,fac=0,s1=0,s2=0,co2=0,peak=0,itPk=0;
  for(const z of['T','I','G']){const cool=coolOf(S['c'+z]),mw=S.itMW*sh[z],pue=S['p'+z],wue=S['w'+z],itMWh=mw*8760*u[z],facMWh=itMWh*pue;
    const w1=itMWh*1000*wue,w2=facMWh*1000*((1-re)*gw+re*0.05),c=facMWh*(1-re)*ci,gpus=z==='G'?0:mw*1000/S.kwGPU;
    const coolOH=Math.max(.01,pue-1-ELEC),pk=mw*(1+coolOH*(1+PEAKK[cool.rej]*Math.max(0,dT))+ELEC);
    Z[z]={k:z,mw,u:u[z],pue,wue,itMWh,facMWh,w1,w2,co2:c,racks:mw>0?Math.ceil(mw*1000/dens[z]):0,dens:dens[z],cool,gpus,pk};
    it+=itMWh;fac+=facMWh;s1+=w1;s2+=w2;co2+=c;peak+=pk;itPk+=mw*PKZ[z]}
  const zs=['T','I','G'].filter(z=>Z[z].mw>0);
  const gpusAI=Z.T.gpus+Z.I.gpus,s3=S.s3?gpusAI*S.ewGPU*1000/S.lifeI:0;
  for(const z of['T','I','G'])Z[z].w3=S.s3&&z!=='G'&&gpusAI>0?s3*Z[z].gpus/gpusAI:0;
  const water=s1+s2+s3,pueF=fac/it||0,wueF=s1/(it*1000)||0,ciDel=ci*1000*(1-re);
  /* inference and training */
  const tpsEff=S.tps*S.der/100,capTps=Z.I.gpus*tpsEff,servedTps=capTps*Z.I.u,qps=servedTps/S.tpq,qDay=qps*86400,qYr=qDay*365;
  const whQ=qYr>0?Z.I.facMWh*1e6/qYr:0,mlQ=qYr>0?(Z.I.w1+Z.I.w2)*1000/qYr:0,gQ=qYr>0?Z.I.co2*1e6/qYr:0;
  Z.T.uBusy=uTb;Z.T.cm=cm;Z.T.busyMWh=Z.T.mw*8760*uTb*cm;
  const runs=S.eRun>0?Z.T.busyMWh/S.eRun:0,hRun=Z.T.mw>0?S.eRun/(Z.T.mw*uTb):0;
  /* battery and load shifting */
  const bPow=S.bMWh>0?S.bMWh/S.bDur:0,dYr=S.bMWh*S.bDoD/100*S.bCyc*365,avgFac=fac/8760,shaveable=avgFac*S.spk/100,peakCut=Math.min(S.peak,bPow,shaveable);
  const demSave=peakCut*1000*S.dem*12/1e7,lossCost=dYr*1000*(1/(S.bRTE/100)-1)*S.tar/1e7,todGross=dYr*1000*S.tod/1e7,todSave=Math.max(0,todGross-lossCost),drRev=bPow*S.dr/1e7;
  const bCapex=S.bMWh*1000*S.bCost*S.fx/1e7,bOM=bCapex*0.015,bNet=demSave+todSave+drRev-bOM,bPay=bNet>0?bCapex/bNet:0;
  const flexMW=Z.T.mw*S.flex/100,want=flexMW*Z.T.u*S.win,room=Z.T.mw*(1-Z.T.u)*(24-S.win),shiftYr=Math.max(0,Math.min(want,room))*365;
  const shiftSave=shiftYr*1000*S.tod*Z.T.pue/1e7,shiftCO2=shiftYr*Z.T.pue*(1-re)*ci*S.ciCut/100;
  /* infrastructure */
  const mva=peak/.95,volt=mva<=20?'33 kV':mva<=80?'66–110 kV':mva<=300?'220 kV':'400 kV';
  const txN=RD.n(Math.ceil(mva/(3.15*.8))),mainN=Math.ceil(mva/80)+(S.red==='N'?0:1),genN=RD.n(Math.ceil(peak/3.0)),fuelKL=peak*S.dieselH*.27;
  const liqMW=zs.reduce((a,z)=>a+Z[z].mw*Z[z].cool.f,0),airMW=Math.max(0,S.itMW-liqMW)+S.itMW*ELEC,cduN=liqMW>0?RD.n(Math.ceil(liqMW/1.5)):0;
  const rejU={};zs.forEach(z=>{const r=Z[z].cool.rej;rejU[r]=(rejU[r]||0)+Z[z].pk});const rejN=Object.entries(rejU).map(([r,mw])=>[r,RD.n(Math.ceil(mw/UNIT[r])),mw]);
  const chillN=zs.reduce((a,z)=>{const c=Z[z].cool;if(!c.chU)return a;const air=Z[z].mw*(1-c.f)*(1+ELEC);return a+RD.n(Math.ceil(air*1.25/c.chU))},0);
  const racks=zs.reduce((a,z)=>a+Z[z].racks,0),gT=Math.round(Z.T.gpus),gI=Math.round(Z.I.gpus);
  const leafT=Math.ceil(gT/32),spineT=Math.ceil(leafT*32/64),coreT=leafT>64?Math.ceil(spineT/2):0,leafI=Math.ceil(gI/32),spineI=Math.ceil(leafI*32/64),fe=Math.ceil(racks/2),switches=leafT+spineT+coreT+leafI+spineI+fe;
  const fabric=gT>=8000?'800 Gb/s per GPU, three-tier rail-optimised fat tree':gT>=1000?'400–800 Gb/s per GPU, two-tier fat tree':gT>0?'400 Gb/s per GPU, single tier':'No training fabric (25–100 Gb/s front-end only)';
  const dayKL=s1/365/1000,wz=zs.slice().sort((a,b)=>Z[b].w1-Z[a].w1)[0],pf=wz?PF[Z[wz].cool.rej]:1.3,peakKL=dayKL*pf,freshPk=peakKL*S.pot/100;
  const evap=zs.some(z=>['tower','adi','hyb'].includes(Z[z].cool.rej));
  const trainTxt=evap&&zs.some(z=>['tower','hyb'].includes(Z[z].cool.rej))?'Treated sewage → membrane bioreactor or ultrafiltration → partial reverse osmosis (make-up ≤ 500 µS/cm) → UV and chlorination → 3-day storage; blowdown to zero liquid discharge':evap?'Treated sewage → ultrafiltration → reverse osmosis (adiabatic pads need low hardness) → UV → storage':'Treated sewage → ultrafiltration → reverse osmosis → mixed-bed polishing for closed-loop fill and top-up';
  const bldg=racks*4,yard=zs.reduce((a,z)=>a+Z[z].pk*YARD[Z[z].cool.rej],0),sub=3000+15*mva,genA=genN*60,bm=S.bMWh*12,fuelA=fuelKL*.5,landM2=(bldg+yard+sub+genA+bm+fuelA)*1.4,acres=landM2/4047;
  /* capex (₹ crore) */
  const W=S.wacc/100,cF=crf(W,S.lifeF),cI=crf(W,S.lifeI),cB=crf(W,S.lifeB);
  const facZ={};zs.forEach(z=>{const isA=z!=='G';facZ[z]=Z[z].mw*(isA?S.facA:S.facG)*Z[z].cool.cap/(isA?REFCAP.A:REFCAP.G)*RD.cap});['T','I','G'].forEach(z=>{if(facZ[z]==null)facZ[z]=0});
  const aiMW=Z.T.mw+Z.I.mw,facCap=facZ.T+facZ.I+facZ.G,landCost=S.itMW*S.landC,wpC=S.itMW*S.wplant,contC=(facCap+landCost+wpC)*S.cont/100;
  const itCapA=aiMW*S.itA*(1+S.dutyA/100),itCapG=Z.G.mw*S.itG*(1+S.dutyG/100),itCap=itCapA+itCapG,capex=facCap+landCost+wpC+contC+itCap+bCapex;
  const annFac=(facCap+landCost+wpC+contC)*cF,annIT=itCap*cI,annB=bCapex*cB;
  const blend=(1-re)*S.tar+re*S.tarRE,elec=fac*1000*blend/1e7,onKL=s1/1000,potKL=onKL*S.pot/100,twKL=onKL-potKL,wCost=(potKL*S.pw+twKL*S.tw)/1e7;
  const om=facCap*S.omF/100+itCap*S.omI/100,staff=S.itMW*S.staff,insC=(facCap+itCap)*S.ins/100;
  const opex=elec+wCost+om+staff+insC+bOM-(demSave+todSave+drRev)-shiftSave,tco=annFac+annIT+annB+opex;
  const zc={};for(const z of['T','I','G']){const isA=z!=='G',fc=facZ[z]+Z[z].mw*(S.landC+S.wplant),ic=Z[z].mw*(isA?S.itA*(1+S.dutyA/100):S.itG*(1+S.dutyG/100));
    zc[z]=fc*(1+S.cont/100)*cF+ic*cI+Z[z].facMWh*1000*blend/1e7+(facZ[z]*S.omF+ic*S.omI)/100+(S.itMW>0?S.itMW*S.staff*Z[z].mw/S.itMW:0)+(facZ[z]+ic)*S.ins/100+Z[z].w1/1000*(S.pot/100*S.pw+(1-S.pot/100)*S.tw)/1e7}
  const rsQ=qYr>0?zc.I*1e7/qYr:0,gpuH=(Z.T.gpus*Z.T.uBusy*Z.T.cm+Z.I.gpus*Z.I.u)*8760,rsGH=gpuH>0?(zc.T+zc.I)*1e7/gpuH:0;
  return {S,L,RD,sh,over,Z,zs,it,fac,s1,s2,s3,water,co2,pueF,wueF,ci,gw,re,ciDel,peak,itPk,gpusAI,tpsEff,capTps,servedTps,qps,qDay,qYr,whQ,mlQ,gQ,runs,hRun,
   bPow,dYr,avgFac,shaveable,peakCut,demSave,lossCost,todGross,todSave,drRev,bCapex,bOM,bNet,bPay,flexMW,want,room,shiftYr,shiftSave,shiftCO2,
   mva,volt,txN,mainN,genN,fuelKL,liqMW,airMW,cduN,rejN,chillN,racks,gT,gI,leafT,spineT,coreT,leafI,spineI,fe,switches,fabric,dayKL,pf,peakKL,freshPk,evap,trainTxt,
   bldg,yard,sub,genA,bm,fuelA,landM2,acres,facZ,aiMW,facCap,landCost,wpC,contC,itCapA,itCapG,itCap,capex,cF,cI,cB,annFac,annIT,annB,blend,elec,potKL,twKL,wCost,om,staff,insC,opex,tco,zc,rsQ,gpuH,rsGH};
}
function evaluate(r){
  const S=r.S,L=r.L,v={},st=(x,a,b)=>x>b?'FAIL':x>a?'CAUTION':'PASS';
  {const fails=[],near=[],notes=[];let worst=null;
   r.zs.forEach(z=>{const q=r.Z[z],nm=ZN[z].toLowerCase(),ratio=q.dens/q.cool.max;if(!worst||ratio>worst.ratio)worst={z,ratio};
    if(q.dens>q.cool.max)fails.push(`${nm} racks at ${q.dens} kW exceed the ${q.cool.max} kW ceiling of ${q.cool.n.toLowerCase()}`);
    else if(q.dens>q.cool.max*0.85)near.push(`${nm} racks at ${q.dens} kW are within 15% of the ${q.cool.max} kW ceiling`);
    if(q.cool.sup&&L.tDes>q.cool.sup-6)notes.push(`${nm} dry coolers hold ${q.cool.sup} °C water only up to ${q.cool.sup-6} °C outside (design day ${L.tDes} °C), so a trim chiller runs on the hottest hours; its energy is already in the PUE`)});
   v.cooling=fails.length?{st:'FAIL',why:fails.join('; ')+'.',act:'Pick a liquid system for that zone or lower the rack density.',worst}:near.length?{st:'CAUTION',why:near.join('; ')+'.',act:'Leave thermal headroom, or raise the loop temperature (W40) or add adiabatic assist.',worst}:{st:'PASS',why:'Every zone is within its cooling system\'s rack ceiling.'+(notes.length?' Note: '+notes.join('; ')+'.':''),act:'',worst}}
  if(S.gridCap>0){const x=r.peak/S.gridCap;v.power={st:st(x,.8,1),why:`Design-day peak ${r.peak.toFixed(1)} MW is ${Math.round(x*100)}% of the ${S.gridCap} MW connection.`,act:x>.8?`Secure ${Math.ceil(r.peak/.8)} MW (20% headroom) or phase the IT load.`:''}}
  else v.power={st:'NA',why:`Not checked: enter the grid connection available. Design-day peak ${r.peak.toFixed(1)} MW (${r.mva.toFixed(0)} MVA).`,act:''};
  {const th=STRESS[L.stress]||STRESS.Medium;let s1,why,act='';
   if(S.alloc>0){const x=r.freshPk/S.alloc;s1=st(x,.8,1);why=`Peak-day potable draw ${nf(r.freshPk)} kL/day is ${Math.round(x*100)}% of the ${nf(S.alloc)} kL/day allocation.`}
   else{s1=r.freshPk>th[1]?'FAIL':r.freshPk>th[0]?'CAUTION':'PASS';why=`${L.stress} water stress: peak-day potable draw ${nf(r.freshPk)} kL/day against a screening limit of ${nf(th[0])} kL/day.`}
   const hi=L.stress==='High'||L.stress==='Extremely high';
   if(r.wueF>1.5&&hi){s1='FAIL';why=`On-site WUE ${r.wueF.toFixed(2)} L/kWh in a ${L.stress.toLowerCase()} water-stress city. `+why}
   if(s1!=='PASS')act=`Raise treated sewage to ${Math.min(100,100-S.pot+30)}% or move to dry or closed-loop heat rejection.`;
   v.water={st:s1,why,act}}
  {const why=[],acts=[];let s1='PASS';
   if(r.pueF>1.35){s1='CAUTION';why.push(`Campus PUE ${r.pueF.toFixed(2)} is above the 1.35 asked in MeitY AI-cloud tenders`);acts.push('Bring PUE under 1.35')}
   if((L.stress==='High'||L.stress==='Extremely high')&&r.evap&&S.pot>=50){s1='CAUTION';why.push(`evaporative cooling on ${S.pot}% potable water in a water-stressed city; expect pressure for treated sewage and zero liquid discharge`);acts.push('Move make-up water to treated sewage and plan zero liquid discharge')}
   v.reg={st:s1,why:why.length?why.join('; ')+'.':'No screened rule is breached (India: no PUE limit in law; consent to operate covers cooling-tower blowdown).',act:acts.join('; ')}}
  {const d=r.ciDel,need=Math.ceil((1-400/(r.ci*1000))*100);v.carbon=d<=300?{st:'PASS',why:`Delivered carbon intensity ${Math.round(d)} g/kWh.`,act:''}:d<=400?{st:'CAUTION',why:`Delivered carbon intensity ${Math.round(d)} g/kWh, between the 300 and 400 g/kWh screens.`,act:`Contract at least ${Math.ceil((1-300/(r.ci*1000))*100)}% renewable supply for a pass.`}:{st:'FAIL',why:`Delivered carbon intensity ${Math.round(d)} g/kWh, above the 400 g/kWh screen.`,act:`Contract at least ${need}% renewable supply.`}}
  v.grid=S.bMWh<=0?{st:'PASS',why:'No battery specified.',act:''}:r.bPay>0&&r.bPay<=6?{st:'PASS',why:`Battery pays back in ${r.bPay.toFixed(1)} years.`,act:''}:r.bPay>0&&r.bPay<=10?{st:'CAUTION',why:`Battery payback ${r.bPay.toFixed(1)} years, about its warranty life.`,act:'Size the battery to the shaveable peak or seek a wider time-of-day spread.'}:{st:'FAIL',why:'The battery does not pay back within 10 years on grid savings.',act:'Shrink it, raise cycles, or count it as backup in place of diesel.'};
  if(S.land>0){const x=r.acres/S.land;v.site={st:st(x,.8,1),why:`Needs about ${r.acres.toFixed(1)} acres of the ${S.land} available (${Math.round(x*100)}%).`,act:x>.8?'Build multi-storey, choose towers (smaller yard) or find more land.':''}}
  else v.site={st:'NA',why:`Not checked: enter the land available. The design needs about ${r.acres.toFixed(1)} acres.`,act:''};
  const act=Object.entries(v).filter(([,x])=>x.st!=='NA'),sts=act.map(([,x])=>x.st),overall=sts.includes('FAIL')?'RED':sts.includes('CAUTION')?'AMBER':'GREEN';
  const order=['cooling','power','water','reg','carbon','grid','site'];const bind=order.map(k=>[k,v[k]]).find(([,x])=>x.st==='FAIL')||order.map(k=>[k,v[k]]).find(([,x])=>x.st==='CAUTION')||['none',{st:'PASS',why:'The design is within every checked limit.',act:''}];
  return {v,overall,bind};
}
const DL={cooling:'Cooling physics',power:'Power',water:'Water',reg:'Regulatory',carbon:'Carbon',grid:'Grid-interactive',site:'Site (land)',none:'None'};
/* smallest single change that flips the overall verdict */
function flip(r,ev){const b=ev.bind[0];if(b==='none')return null;const S0=r.S;let dr=null;
  if(b==='cooling'){const w=ev.v.cooling.worst;if(!w)return null;const z=w.z;dr={n:`${ZN[z].toLowerCase()} rack density`,get:T=>T['d'+z],f:(T,k)=>{T['d'+z]=Math.max(1,Math.round(S0['d'+z]*k))},u:' kW'}}
  if(b==='power'||b==='site')dr={n:'IT capacity',get:T=>T.itMW,f:(T,k)=>{T.itMW=S0.itMW*k},u:' MW'};
  if(b==='water')dr={n:'potable share',get:T=>T.pot,f:(T,k)=>{T.pot=clamp(S0.pot*k,0,100)},u:'%'};
  if(b==='reg'&&/potable/.test(ev.v.reg.why))dr={n:'potable share',get:T=>T.pot,f:(T,k)=>{T.pot=clamp(S0.pot*k,0,100)},u:'%'};
  else if(b==='reg')dr={n:'PUE overhead (all zones)',get:T=>r.pueF,f:(T,k)=>{T.ovr=true;['T','I','G'].forEach(z=>{T['p'+z]=1+(S0['p'+z]-1)*k})},u:'',res:X=>X.pueF.toFixed(2)};
  if(b==='carbon')dr={n:'renewable supply',get:T=>T.re,f:(T,k)=>{T.re=clamp(100-(100-S0.re)*k,0,100)},u:'%'};
  if(b==='grid')dr={n:'battery size',get:T=>T.bMWh,f:(T,k)=>{T.bMWh=Math.max(0,S0.bMWh*k)},u:' MWh'};
  if(!dr)return null;const lim=b==='carbon'?100:60,RK={RED:0,AMBER:1,GREEN:2};
  for(let i=1;i<=lim;i++)for(const sg of[-1,1]){const T={...S0};dr.f(T,1+sg*i/100);const X=compute(T),E=evaluate(X);if(RK[E.overall]>RK[ev.overall]){const dp=dr.u===' MW'||dr.u===' MWh'?1:0,ov=dr.res?dr.res(r):(+dr.get(S0)).toFixed(dp)+dr.u,nv=dr.res?dr.res(X):(+dr.get(T)).toFixed(dp)+dr.u;return `Smallest single change that improves the verdict: ${dr.n} from ${ov} to ${nv} turns it ${E.overall==='GREEN'?'green':'amber'}.`}}
  const same=Object.values(ev.v).filter(x=>x.st===ev.v[b].st).length;return `No single change of the ${dr.n} within ±${lim}% improves the verdict${same>1?`: ${same} checks are at ${ev.v[b].st.toLowerCase()}, so several need fixing`:''}.`}

/* ---- inputs ---- */
const IN=[...$h('hy-in').querySelectorAll('[data-hy]')];
function opts(sel){const k=sel.dataset.kind,L=LOC[S.loc];
  if(k==='loc')return Object.entries(LOC).map(([id,x])=>`<option value="${id}">${x.n} · ${CLIM[x.c].toLowerCase()}</option>`).join('');
  if(k==='cool')return COOL.map(c=>`<option value="${c.id}">${c.n} · PUE ${c.p[L.c].toFixed(2)} · ${c.w[L.c].toFixed(2)} L/kWh · ≤${c.max} kW</option>`).join('');
  if(k==='gpu')return Object.entries(GPU).map(([id,g])=>`<option value="${id}">${g.n}</option>`).join('');
  if(k==='run')return Object.entries(RUNS).map(([id,x])=>`<option value="${id}">${x[0]}${x[2]?' · '+nf(x[2]/1e6,2)+' M H100 GPU-hours':x[1]?' · '+nf(x[1])+' MWh':''}</option>`).join('');
  if(k==='ci')return '<option value="avg">CEA average '+CO2+' kg/kWh</option><option value="marg">CEA operating margin 0.963 kg/kWh</option>';
  if(k==='gw')return '<option value="nat">National average 2.9 L/kWh</option><option value="state">State generation mix</option>';
  if(k==='red')return Object.keys(REDM).map(x=>`<option value="${x}">${x}</option>`).join('');return ''}
function outTxt(el){const k=el.dataset.hy,v=S[k],u=(el.closest('.ctrl').querySelector('label .muted')||{}).textContent||'';
  if(u==='₹/MW/yr')return '₹'+nf(v/1e7,2)+' cr';if(k==='gridCap'||k==='land'||k==='alloc')return v>0?nf(v)+' '+u:'not checked';
  return nf(v,+el.step<1?(+el.step<0.1?2:1):0)+(u?' '+u.replace('% of capex/yr','%'):'')}
function syncIn(except){
  IN.forEach(el=>{if(el.tagName==='SELECT')el.innerHTML=opts(el)});
  IN.forEach(el=>{if(el===except)return;const k=el.dataset.hy;if(el.type==='checkbox')el.checked=!!S[k];else el.value=S[k]});
  IN.forEach(el=>{if(el.type==='range'){const o=$h(el.id+'-o');if(o)o.textContent=outTxt(el)}});
  $h('hy-in').querySelectorAll('[data-ovr]').forEach(e=>{e.style.display=S.ovr?'':'none'});
  const L=LOC[S.loc],n=$h('hy-loc-n');if(n)n.textContent=`${L.st} · ${CLIM[L.c].toLowerCase()} · design day ${L.tDes} °C · water stress ${L.stress.toLowerCase()} · ${L.src}`;
  const g=$h('hy-gpu-n');if(g)g.textContent=GPU[S.gpu].src;
  $h('hy-pre').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===pre));
}
const msg=t=>{const m=$h('hy-msg');if(m){m.textContent=t;clearTimeout(msg.t);msg.t=setTimeout(()=>m.textContent='',4000)}};
$h('hy-in').addEventListener('input',e=>{const el=e.target,k=el.dataset&&el.dataset.hy;if(!k)return;
  let v=el.type==='checkbox'?el.checked:el.tagName==='SELECT'?el.value:parseFloat(el.value);if(typeof v==='number'&&!isFinite(v))return;S[k]=v;
  if(k==='loc'){const L=LOC[v];S.tar=L.tar;S.dem=L.dem;S.tod=L.tod;S.pw=L.pw;if(!S.ovr)coolPUE(S)}
  if(['cT','cI','cG'].includes(k)&&!S.ovr)coolPUE(S);if(k==='ovr'&&!v)coolPUE(S);
  if(k==='gpu'){S.kwGPU=GPU[v].kw;S.tps=GPU[v].tps;const e=eRunFor(S.run,v);if(e&&S.run!=='custom')S.eRun=e}
  if(k==='run'){const e=eRunFor(v,S.gpu);if(e)S.eRun=e}if(k==='eRun')S.run='custom';
  syncIn(el);render()});
$h('hy-pre').addEventListener('click',e=>{const b=e.target.closest('button[data-p]');if(!b)return;pre=b.dataset.p;fill(PRESETS[pre]);syncIn();render()});
$h('hy-reset').addEventListener('click',()=>{fill(PRESETS[pre]);syncIn();render()});
/* load the 14.2 full-model design */
$h('hy-dt').addEventListener('click',()=>{const X=window.__DT;if(!X||!X.S||!X.R||!X.R.ok){msg('Build a design in 14.2 first.');return}const D=X.S,R0=X.R;
  const loc={blr:'blr',mum:'mum',che:'che',hyd:'hyd',noi:'ncr',pun:'pun',viz:'viz',kol:'kol'}[D.city]||'blr';
  const gpu={gb300:'b300',gb200:'gb200',b300:'b300',b200:'b200',h200:'h200',h100:'h100'}[D.hw]||'b200';
  const cool=D.cool==='dlc'?({dry:(D.wc>=40?'dlc40':'dlc32'),adi:'dlca',twr:'dlct'}[D.rej]||'dlc40'):(D.cool==='im1'||D.cool==='im2')?'im1':D.cool==='dx'?'dx':D.cool==='iec'?'iec':D.cool==='rdhx'?'rdh':({acc:'acc',accfc:'fcc',wcc:'wcc',wcch:'hyb'}[D.rej]||'fcc');
  const ai=D.hw!=='cpu',tr=clamp(D.train||0,0,100),inf=clamp(D.inf||0,0,100-tr),dens=Math.round(R0.rackKW||60);
  const p={itMW:D.mw,loc,gpu,red:{n:'N',n1:'N+1',n2:'2N'}[D.red]||'N+1',shT:ai?tr:0,shI:ai?inf:0,cT:cool,cI:cool,cG:cool,dT:ai?dens:130,dI:ai?dens:60,dG:ai?12:dens};
  if(D.uT!=null){p.uT=D.uT;p.uI=D.uI;p.uG=D.uG}
  pre='';fill(p);syncIn();render();msg(`Loaded your 14.2 design: ${D.mw} MW in ${LOC[loc].n}, ${coolOf(cool).n.toLowerCase()}.`)});
$h('hy-sns').addEventListener('click',e=>{const b=e.target.closest('button[data-o]');if(!b)return;sensOut=b.dataset.o;$h('hy-sns').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderSens(compute(S))});
$h('hy-pin').addEventListener('click',()=>{const r=compute(S),e=evaluate(r);if(pins.length>=3)pins.shift();pins.push({lab:`${S.itMW} MW ${r.L.n.split(' ')[0]} · T${Math.round(r.sh.T*100)}/I${Math.round(r.sh.I*100)}/G${Math.round(r.sh.G*100)} · ${coolOf(S.cT).n.split(' + ')[0]}`,r,e});renderPins()});
$h('hy-unpin').addEventListener('click',()=>{pins=[];renderPins()});
$h('hy-flipc').addEventListener('click',e=>{const b=e.target.closest('button[data-use]');if(!b)return;S.cT=S.cI=b.dataset.use;if(!S.ovr)coolPUE(S);syncIn();render();msg('AI zones switched to '+coolOf(b.dataset.use).n.toLowerCase()+'.')});

/* ---- render ---- */
const bar=(r,get,lab)=>`<div class="hy-row"><span>${lab}</span><div class="hy-stk">${r.zs.map(z=>{const p=get(z);return p>0.2?`<i style="width:${p}%;background:var(${ZC[z]})" title="${ZN[z]} ${p.toFixed(0)}%"></i>`:''}).join('')}</div></div>`;
const bs=rows=>rows.map(([a,b])=>`<div class="hy-bs"><span>${a}</span><b>${b}</b></div>`).join('');
function render(){
  const r=compute(S),ev=evaluate(r),{v,overall,bind}=ev,Z=r.Z;window.__HY={S,r,v,ev,compute,evaluate,COOL};
  $h('hy-share').textContent=`General-purpose share ${Math.round(r.sh.G*100)}%${r.over?' (training + inference above 100%, scaled down)':''}.`;
  $h('hy-verdict').innerHTML=`<div class="hy-verdict ${overall}"><div class="hy-vi" aria-hidden="true">${{GREEN:'✓',AMBER:'!',RED:'✕'}[overall]}</div><div><div class="xs muted mono">OVERALL VERDICT</div><div class="hy-vt">${{GREEN:'Build',AMBER:'Build with mitigations',RED:'Redesign required'}[overall]}</div><div class="small"><b>Binding constraint: ${DL[bind[0]]}.</b> ${bind[1].why}${bind[1].act?' → '+bind[1].act:''}</div></div></div>`;
  $h('hy-flip').textContent=flip(r,ev)||'';
  $h('hy-kpis').innerHTML=[
   ['IT energy',fMWh(r.it),`facility ${fMWh(r.fac)} · PUE ${r.pueF.toFixed(2)}`],
   ['Queries per day',Z.I.mw>0?fN(r.qDay):'—',Z.I.mw>0?`${r.whQ.toFixed(2)} Wh each (measured median 0.24)`:'no inference zone'],
   ['Training runs per year',Z.T.mw>0?nf(r.runs,1):'—',Z.T.mw>0?`${nf(S.eRun)} MWh each · ${nf(r.hRun/24,0)} days`:'no training zone'],
   ['Peak load',r.peak.toFixed(1)+' MW',`${r.mva.toFixed(0)} MVA at ${r.volt} · design day ${r.L.tDes} °C`],
   ['Water',fL(r.water)+'/yr',`${Math.round(r.s2/r.water*100||0)}% at power stations`],
   ['Carbon',fT(r.co2)+' CO₂/yr',`${Math.round(r.ciDel)} g/kWh delivered`],
   ['Cost of ownership',fCr(r.tco)+'/yr',`capex ${fCr(r.capex)}`],
   ['Cost per GPU-hour',r.gpuH>0?'₹'+nf(r.rsGH,0):'—',r.gpuH>0?`≈ $${(r.rsGH/S.fx).toFixed(2)}, all-in`:'no GPU zones']
  ].map(([l,x,n])=>`<div class="hy-k"><div class="l">${l}</div><div class="v">${x}</div><div class="n">${n}</div></div>`).join('');
  $h('hy-vtab').innerHTML='<thead><tr><th>Check</th><th>Status</th><th>Reason</th><th>Action</th></tr></thead><tbody>'+Object.entries(v).map(([k,x])=>`<tr><td><b>${DL[k]}</b></td><td><span class="hy-pill ${x.st}">${x.st==='NA'?'NOT CHECKED':x.st}</span></td><td>${x.why}</td><td class="muted">${x.act||'—'}</td></tr>`).join('')+'</tbody>';
  /* infrastructure */
  const liq=r.liqMW;
  $h('hy-spec').innerHTML=`<div class="hy-spg">
   <div><h4>Power</h4>${bs([['Average IT load',nf(r.it/8760,1)+' MW'],['Expected IT peak',nf(r.itPk,1)+' MW'],['Design-day facility peak',r.peak.toFixed(1)+' MW (PUE '+(r.peak/S.itMW).toFixed(2)+')'],['Grid connection',`${r.mva.toFixed(1)} MVA at ${r.volt}`],['Main intakes · transformers',`${r.mainN} · ${r.txN} × 3.15 MVA (${r.RD.lab})`],['Generators · diesel stored',`${r.genN} × 3 MW · ${nf(r.fuelKL)} kL (${S.dieselH} h)`],['Battery',S.bMWh>0?`${S.bMWh} MWh / ${r.bPow.toFixed(1)} MW`:'none'],['Ramp-smoothing reference',r.Z.T.mw>0?`${nf(S.itMW*.5)} MWh (0.5 per IT MW, heuristic)`:'not needed without training']])}</div>
   <div><h4>Cooling plant</h4>${bs([['Liquid heat',liq.toFixed(1)+' MW'],['Air heat',r.airMW.toFixed(1)+' MW'],['Coolant distribution units',r.cduN?nf(r.cduN)+' × 1.5 MW':'none'],...r.rejN.map(([k,n,mw])=>[`Heat rejection: ${REJN[k]}`,`${nf(n)} units for ${mw.toFixed(1)} MW`]),['Chillers',r.chillN?nf(r.chillN):'none (liquid or integrated units)']])}</div>
   <div><h4>Network</h4>${bs([['GPUs (training · inference)',`${nf(r.gT)} · ${nf(r.gI)}`],['Training fabric',r.fabric],['Leaf · spine · core (training)',`${r.leafT} · ${r.spineT} · ${r.coreT}`],['Leaf · spine (inference)',`${r.leafI} · ${r.spineI}`],['Front-end switches · total',`${r.fe} · ${nf(r.switches)}`]])}</div>
   <div><h4>Water plant</h4>${bs([['Average on-site draw',nf(r.dayKL)+' kL/day'],['Peak day (× '+r.pf+')',nf(r.peakKL)+' kL/day'],['Peak-day potable ('+S.pot+'%)',nf(r.freshPk)+' kL/day']])}<p class="xs muted" style="margin:6px 0 0">${r.trainTxt}.</p></div>
   <div><h4>Site</h4>${bs([['Racks',nf(r.racks)],['Building (4 m² per rack)',nf(r.bldg)+' m²'],['Heat-rejection yard',nf(r.yard)+' m²'],['Substation',nf(r.sub)+' m²'],['Generators, battery, fuel',nf(r.genA+r.bm+r.fuelA)+' m²'],['Land with roads and setbacks (× 1.4)',`${r.acres.toFixed(1)} acres`]])}</div>
   <div><h4>Zones</h4>${bs(r.zs.map(z=>[ZN[z],`${nf(Z[z].mw,1)} MW · ${nf(Z[z].racks)} racks of ${Z[z].dens} kW · ${Z[z].cool.n}`]))}</div></div>`;
  /* zones */
  $h('hy-zones').innerHTML=bar(r,z=>Z[z].mw/S.itMW*100,'IT capacity')+bar(r,z=>Z[z].facMWh/r.fac*100,'Energy')+bar(r,z=>(Z[z].w1+Z[z].w2+Z[z].w3)/r.water*100,'Water')+bar(r,z=>Z[z].co2/r.co2*100||0,'Carbon')+
   `<div class="hy-lg">${r.zs.map(z=>`<span><i class="hy-sw" style="background:var(${ZC[z]})"></i>${ZN[z]}</span>`).join('')}</div>
   <div class="tbl"><table class="aif-t"><thead><tr><th>Zone</th><th class="n">IT MW</th><th class="n">Utilisation</th><th class="n">IT energy</th><th class="n">Energy share</th><th class="n">PUE</th><th class="n">WUE</th><th class="n">Racks</th><th class="n">GPUs</th><th class="n">On site</th><th class="n">Power stations</th><th class="n">Embodied</th><th class="n">CO₂</th></tr></thead><tbody>`+
   r.zs.map(z=>{const q=Z[z];return `<tr><td><i class="hy-sw" style="background:var(${ZC[z]})"></i>${ZN[z]}</td><td class="n">${nf(q.mw,1)}</td><td class="n">${Math.round(q.u*100)}%</td><td class="n">${fMWh(q.itMWh)}</td><td class="n">${(q.facMWh/r.fac*100).toFixed(0)}%</td><td class="n">${q.pue.toFixed(2)}</td><td class="n">${q.wue.toFixed(2)}</td><td class="n">${nf(q.racks)}</td><td class="n">${nf(q.gpus)}</td><td class="n">${fL(q.w1)}</td><td class="n">${fL(q.w2)}</td><td class="n">${fL(q.w3)}</td><td class="n">${fT(q.co2)}</td></tr>`}).join('')+
   `<tr><td><b>Campus</b></td><td class="n"><b>${nf(S.itMW,1)}</b></td><td class="n">${Math.round(r.it/(S.itMW*8760)*100)}%</td><td class="n">${fMWh(r.it)}</td><td class="n">100%</td><td class="n">${r.pueF.toFixed(2)}</td><td class="n">${r.wueF.toFixed(2)}</td><td class="n">${nf(r.racks)}</td><td class="n">${nf(r.gpusAI)}</td><td class="n">${fL(r.s1)}</td><td class="n">${fL(r.s2)}</td><td class="n">${fL(r.s3)}</td><td class="n">${fT(r.co2)}</td></tr></tbody></table></div>`;
  $h('hy-inf').innerHTML=Z.I.mw>0?bs([['Inference GPUs',nf(Z.I.gpus)],['Peak throughput',fN(r.capTps)+' tokens/s'],[`Average served (× ${Math.round(Z.I.u*100)}%)`,fN(r.servedTps)+' tokens/s'],['Queries per day',fN(r.qDay)],['Energy per query',r.whQ.toFixed(3)+' Wh'],['Water per query',r.mlQ.toFixed(2)+' mL'],['Carbon per query',r.gQ.toFixed(2)+' g CO₂'],['Cost per 1,000 queries','₹'+nf(r.rsQ*1000,1)]])+
    `<p class="note">Google measured 0.24 Wh and 0.26 mL for a median Gemini prompt. ${r.whQ<0.05?'This design is far below that: check the serving efficiency or tokens per query.':r.whQ>3?'This design is well above that: check the serving efficiency.':'This design is in the same range.'}</p>`:'<p class="note">No inference zone in this design.</p>';
  $h('hy-trn').innerHTML=Z.T.mw>0?bs([['Training GPUs',nf(Z.T.gpus)],['Training IT energy a year',fMWh(Z.T.itMWh)],['Energy per run',nf(S.eRun)+' MWh'],['Campaign',Z.T.cm<1?`busy ${nf(Z.T.cm*12,0)} months a year at ${Math.round(Z.T.uBusy*100)}%; idle ${nf(12-Z.T.cm*12,0)} months at ${S.idl}% power → ${Math.round(Z.T.u*100)}% average`:`busy all year at ${Math.round(Z.T.uBusy*100)}%`],['Runs per year',nf(r.runs,1)],['Wall-clock per run',nf(r.hRun,0)+' h ≈ '+nf(r.hRun/24,1)+' days'],['Carbon per run',fT(S.eRun*Z.T.pue*(1-r.re)*r.ci)],['Water per run',fL(S.eRun*1000*(Z.T.wue+Z.T.pue*((1-r.re)*r.gw+r.re*0.05)))]])+
    `<p class="note">${RUNS[S.run][0]}. Energy per run scales Meta\'s H100 GPU-hours (Llama 3.1 405B: 30.84 million) to the chosen GPU by its BF16 speed and server power.</p>`:'<p class="note">No training zone in this design.</p>';
  const W=r.water,pc=x=>W>0?x/W*100:0,ppl=W/365/135;
  $h('hy-water').innerHTML=`<div class="hy-stk" style="height:24px">${[['--cold',r.s1],['--heat',r.s2],['--muted',r.s3]].map(([c,x])=>pc(x)>0.3?`<i style="width:${pc(x)}%;background:var(${c})"></i>`:'').join('')}</div>
   <div class="hy-lg"><span><i class="hy-sw" style="background:var(--cold)"></i>Scope 1, on site: ${fL(r.s1)} (${pc(r.s1).toFixed(0)}%)</span><span><i class="hy-sw" style="background:var(--heat)"></i>Scope 2, power stations: ${fL(r.s2)} (${pc(r.s2).toFixed(0)}%)</span>${S.s3?`<span><i class="hy-sw" style="background:var(--muted)"></i>Scope 3, embodied in GPUs: ${fL(r.s3)} (${pc(r.s3).toFixed(0)}%)</span>`:''}</div>
   <div class="hy-cmp"><div><b>${nf(r.dayKL)} kL/day</b><span>on-site draw: ${nf(r.potKL/365)} potable, ${nf(r.twKL/365)} treated sewage</span></div><div><b>${nf(W/2.5e6,0)}</b><span>Olympic pools a year</span></div><div><b>${fN(ppl)}</b><span>people's daily urban supply at 135 L/day</span></div><div><b>${(W/1935e6*24).toFixed(1)} h</b><span>of Bengaluru's whole city supply, per year</span></div><div><b>${r.mlQ.toFixed(2)} mL</b><span>per query, against Google's 0.26 mL</span></div></div>
   <p class="note">${r.s2>r.s1?`${pc(r.s2).toFixed(0)}% of the water is used at power stations, so contracting renewable power saves more water than changing the cooling system.`:'On-site cooling is the larger share here, so heat rejection is the main water lever.'}</p>`;
  $h('hy-grid').innerHTML=`<div class="tbl"><table class="aif-t"><thead><tr><th>Value stream</th><th class="n">₹ crore/yr</th><th>Basis</th></tr></thead><tbody>
   <tr><td>Demand-charge cut</td><td class="n">${r.demSave.toFixed(2)}</td><td>${r.peakCut.toFixed(1)} MW (smallest of requested ${S.peak}, battery ${r.bPow.toFixed(1)}, shaveable ${r.shaveable.toFixed(1)}) × ₹${S.dem}/kVA/month × 12</td></tr>
   <tr><td>Time-of-day arbitrage</td><td class="n">${r.todSave.toFixed(2)}</td><td>${nf(r.dYr)} MWh × ₹${S.tod} spread, less ₹${r.lossCost.toFixed(2)} cr of round-trip losses</td></tr>
   <tr><td>Demand response</td><td class="n">${r.drRev.toFixed(2)}</td><td>${r.bPow.toFixed(1)} MW × ₹${nf(S.dr)}/MW/yr</td></tr>
   <tr><td>Battery O&amp;M</td><td class="n">−${r.bOM.toFixed(2)}</td><td>1.5% of ${fCr(r.bCapex)}</td></tr>
   <tr><td><b>Battery net</b></td><td class="n"><b>${r.bNet.toFixed(2)}</b></td><td>Payback ${r.bPay>0?r.bPay.toFixed(1)+' years':'none'}</td></tr>
   <tr><td>Training load shifting</td><td class="n">${r.shiftSave.toFixed(2)}</td><td>${nf(r.shiftYr)} MWh a year moved out of ${S.win} peak hours</td></tr>
   <tr><td><b>Total</b></td><td class="n"><b>${(r.bNet+r.shiftSave).toFixed(2)}</b></td><td>Carbon saved by shifting ${fT(r.shiftCO2)} a year</td></tr></tbody></table></div>
   <p class="note">A data centre's load is nearly flat, so a battery can shave only the short peaks above it; in India most data centre batteries earn their keep as backup in place of diesel. ${r.want>r.room?`Load shifting is capped by spare capacity: ${nf(r.room,0)} MWh a day of headroom against ${nf(r.want,0)} MWh it would like to move.`:''}</p>`;
  const cr=rows=>rows.map(([a,b,c])=>`<div class="hy-bs"><span>${a}${c?`<br><span class="xs">${c}</span>`:''}</span><b>${fCr(b)}</b></div>`).join('');
  $h('hy-capex').innerHTML='<h4 class="cti-h4">Capex</h4>'+cr([...r.zs.map(z=>[`Facility, ${ZN[z].toLowerCase()} halls`,r.facZ[z],`${nf(Z[z].mw,1)} MW × ₹${z==='G'?S.facG:S.facA} cr × ${(Z[z].cool.cap/(z==='G'?REFCAP.G:REFCAP.A)).toFixed(2)} cooling × ${r.RD.cap} ${r.RD.lab}`]),['Land, water plant, contingency',r.landCost+r.wpC+r.contC,''],['GPU servers and network',r.itCapA,`with ${S.dutyA}% import duty`],['CPU servers, storage, network',r.itCapG,`with ${S.dutyG}% import duty`],['Battery',r.bCapex,'']])+`<div class="hy-bs"><span><b>Total capex</b><br><span class="xs">₹${nf(r.capex/S.itMW,0)} cr per IT MW · IT hardware ${Math.round(r.itCap/r.capex*100)}%</span></span><b>${fCr(r.capex)}</b></div>`;
  $h('hy-opex').innerHTML='<h4 class="cti-h4">Per year</h4>'+cr([['Electricity',r.elec,`${fMWh(r.fac)} at ₹${r.blend.toFixed(2)}/kWh blended`],['Water',r.wCost,''],['O&M, staff, insurance',r.om+r.staff+r.insC,''],['Grid-interactive savings',-(r.demSave+r.todSave+r.drRev+r.shiftSave)+r.bOM,'net of battery O&M'],['Capex spread over life',r.annFac+r.annIT+r.annB,`at ${S.wacc}%: facility ${S.lifeF} yr, IT ${S.lifeI} yr, battery ${S.lifeB} yr`]])+`<div class="hy-bs"><span><b>Cost of ownership</b><br><span class="xs">${r.gpuH>0?'₹'+nf(r.rsGH,0)+' per GPU-hour · ':''}${r.qYr>0?'₹'+nf(r.rsQ*1000,1)+' per 1,000 queries · ':''}electricity ${Math.round(r.elec/r.tco*100)}%</span></span><b>${fCr(r.tco)}</b></div>`;
  renderFlipCool(r,ev);renderSens(r);renderPins();
}
function renderFlipCool(r,ev){const el=$h('hy-flipc');if(r.aiMW<=0){el.innerHTML='<p class="note">No AI zones in this design.</p>';return}
  const need=Math.max(r.Z.T.mw>0?S.dT:0,r.Z.I.mw>0?S.dI:0);const rows=COOL.filter(c=>c.max>=need).map(c=>{const T={...S,cT:c.id,cI:c.id};if(!T.ovr)coolPUE(T);const X=compute(T),E=evaluate(X);return {c,X,E,cur:S.cT===c.id&&S.cI===c.id}});
  rows.sort((a,b)=>a.X.tco-b.X.tco);
  el.innerHTML=`<div class="tbl"><table class="aif-t"><thead><tr><th>AI-zone cooling</th><th class="n">PUE</th><th class="n">On-site WUE</th><th class="n">Total water</th><th class="n">CO₂</th><th class="n">Cost of ownership</th><th>Verdict</th><th></th></tr></thead><tbody>`+
   rows.map(x=>`<tr${x.cur?' class="cur"':''}><td>${x.c.n}</td><td class="n">${x.X.pueF.toFixed(2)}</td><td class="n">${x.X.wueF.toFixed(2)}</td><td class="n">${fL(x.X.water)}</td><td class="n">${fT(x.X.co2)}</td><td class="n">${fCr(x.X.tco)}</td><td><span class="hy-pill ${x.E.overall}">${x.E.overall}</span></td><td>${x.cur?'<span class="xs muted">current</span>':`<button type="button" class="btn" data-use="${x.c.id}" style="font-size:.74rem;padding:3px 9px">Use</button>`}</td></tr>`).join('')+'</tbody></table></div>'+
   `<p class="note">Sorted by cost of ownership. Systems that cannot carry ${need} kW racks are left out.</p>`}
const SENS=[['itMW','IT capacity',(T,k)=>{T.itMW*=k}],['util','Utilisation (all zones)',(T,k)=>{['uT','uI','uG'].forEach(x=>T[x]=clamp(T[x]*k,1,100))}],['pue','PUE overhead (PUE − 1)',(T,k)=>{T.ovr=true;['T','I','G'].forEach(z=>T['p'+z]=1+(T['p'+z]-1)*k)}],
 ['wue','On-site WUE',(T,k)=>{T.ovr=true;['T','I','G'].forEach(z=>T['w'+z]*=k)}],['gw','Grid water intensity',(T,k)=>{T.kGW*=k}],['ci','Grid carbon factor',(T,k)=>{T.kCI*=k}],['re','Renewable share',(T,k)=>{T.re=clamp(T.re*k,0,100)}],
 ['tar','Grid tariff',(T,k)=>{T.tar*=k}],['itA','GPU server capex',(T,k)=>{T.itA*=k}],['wacc','Cost of capital',(T,k)=>{T.wacc*=k}],['der','Serving efficiency',(T,k)=>{T.der=clamp(T.der*k,1,100)}],['lifeI','IT refresh years',(T,k)=>{T.lifeI=Math.max(1,T.lifeI*k)}]];
const OUTS={tco:['Cost of ownership',X=>X.tco,fCr],gph:['Cost per GPU-hour',X=>X.rsGH,v=>'₹'+nf(v,0)],water:['Total water',X=>X.water,fL],co2:['Carbon',X=>X.co2,fT],fac:['Facility energy',X=>X.fac,fMWh]};
function sensRows(r){const [,g]=OUTS[sensOut],b=g(r);return SENS.map(([k,n,f])=>{const lo={...S},hi={...S};f(lo,.8);f(hi,1.2);const a=g(compute(lo)),c=g(compute(hi));return {k,n,lo:a,hi:c,base:b,sw:Math.abs(c-a)}}).filter(x=>x.sw>Math.abs(b)*1e-6).sort((p,q)=>q.sw-p.sw).slice(0,5)}
function renderSens(r){const el=$h('hy-sens'),[nm,,fm]=OUTS[sensOut],rows=sensRows(r);if(!rows.length){el.innerHTML='<p class="note">Not available for this design.</p>';return}
  const b=rows[0].base,mx=Math.max(...rows.map(x=>Math.max(Math.abs(x.lo-b),Math.abs(x.hi-b))))||1,X=v=>50+(v-b)/mx*48;
  el.innerHTML=`<p class="small">${nm} now: <b>${fm(b)}</b>. Bars run from the result at −20% to the result at +20% of each input; the line is today's value.</p>`+rows.map(x=>{const a=X(Math.min(x.lo,x.hi)),c=X(Math.max(x.lo,x.hi));return `<div class="hy-tor"><span>${x.n}</span><div class="tr"><i style="left:${a}%;width:${Math.max(.5,c-a)}%;background:var(--cold)"></i><b style="left:50%"></b></div><span class="v">${fm(x.lo)} → ${fm(x.hi)}</span></div>`}).join('')}
function renderPins(){const el=$h('hy-pins');if(!pins.length){el.innerHTML='<p class="note">No designs pinned yet.</p>';return}
  const M=[['Verdict',p=>`<span class="hy-pill ${p.e.overall}">${p.e.overall}</span>`],['PUE · on-site WUE',p=>`${p.r.pueF.toFixed(2)} · ${p.r.wueF.toFixed(2)}`],['Peak load',p=>p.r.peak.toFixed(1)+' MW'],['Total water',p=>fL(p.r.water)],['CO₂',p=>fT(p.r.co2)],['Queries per day',p=>p.r.qYr>0?fN(p.r.qDay):'—'],['Training runs per year',p=>p.r.Z.T.mw>0?nf(p.r.runs,1):'—'],['Capex',p=>fCr(p.r.capex)],['Cost of ownership',p=>fCr(p.r.tco)+'/yr'],['Cost per GPU-hour',p=>p.r.gpuH>0?'₹'+nf(p.r.rsGH,0):'—'],['Land',p=>p.r.acres.toFixed(1)+' acres']];
  el.innerHTML=`<div class="tbl"><table class="aif-t"><thead><tr><th></th>${pins.map((p,i)=>`<th>${i+1}. ${p.lab}</th>`).join('')}</tr></thead><tbody>`+M.map(([n,f])=>`<tr><td>${n}</td>${pins.map(p=>`<td class="n">${f(p)}</td>`).join('')}</tr>`).join('')+'</tbody></table></div>'}
fill(PRESETS.ai50);syncIn();render();
})();
