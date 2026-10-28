
/* ---------- DATA CENTRE MODEL: engine ---------- */
var DTE=(function(){
const CCT=(typeof CCOST!=='undefined')?CCOST:require('./cc_table.js');const CRF=(r,n)=>r/(1-Math.pow(1+r,-n));
const RMAP={crah:'crah',crahc:'crahc',dx:'dx',rdhx:'rdh',iec:'iec',dlc:'dlc',im1:'im1',im2:'im2'},JMAP={acc:'acc',accfc:'fcc',wcc:'wcc',wcch:'wcch',dry:'dry',adi:'adi',twr:'twr',integ:'none'};
const CLIM={blr:{db:[22.3,24.3,26.8,28.1,27.4,25.2,24.2,24.1,24.3,24.0,22.9,21.7],wb:[16.5,16.8,18.3,20.8,21.7,20.9,20.6,20.5,20.6,19.9,18.9,17.3]},mum:{db:[24.6,25.3,27.6,28.8,30.2,29.3,27.9,27.8,27.9,29.0,28.0,25.8],wb:[19.2,19.4,21.9,24.1,26.1,26.7,26.2,26.0,25.6,25.0,23.0,20.7]},che:{db:[25.4,26.7,28.7,31.0,33.0,32.3,31.0,30.3,29.8,28.5,26.7,25.6],wb:[22.1,23.2,25.3,27.7,28.5,28.1,27.1,26.7,27.1,26.4,24.5,22.7]},hyd:{db:[22.8,25.4,28.8,31.4,33.2,29.7,27.2,26.4,26.8,26.2,24.1,22.2],wb:[16.0,16.7,18.5,20.7,22.3,23.7,23.2,23.3,23.2,21.6,18.2,15.9]},noi:{db:[13.8,17.4,22.7,28.9,32.7,33.3,31.5,30.4,29.5,26.2,20.5,15.6],wb:[10.6,12.4,15.5,17.8,21.4,25.3,27.2,26.9,24.9,20.3,16.4,12.8]},viz:{db:[24.5,25.8,28.0,29.4,30.7,30.2,29.0,29.0,28.9,28.5,27.0,25.1],wb:[21.2,22.2,24.6,26.5,27.5,27.2,26.4,26.6,27.0,26.1,23.7,21.3]},pun:{db:[20.5,22.5,25.8,29.0,30.1,27.6,25.4,24.7,25.2,25.3,22.9,20.6],wb:[15.2,15.6,17.0,19.1,22.1,23.0,22.2,22.0,22.2,21.0,18.3,15.8]}};
const CITY={
 blr:{n:'Bengaluru',st:'Karnataka',cl:'blr',dr:10,wr:3,rho:1.07,dDB:34.7,dWB:19.6,eWB:23.5,gw:STD.gw["Karnataka"],t:STD.tE["Karnataka"],dem:365,wp:STD.wp,sup:1935,gws:'Bengaluru Urban groundwater is over-exploited (186.7% of recharge)',over:1},
 mum:{n:'Mumbai',st:'Maharashtra',cl:'mum',dr:7,wr:2,rho:1.18,dDB:35.3,dWB:22.8,eWB:27.9,gw:STD.gw["Maharashtra"],t:STD.tE["Maharashtra"],dem:560,wp:80,sup:4100,gws:'',over:0},
 che:{n:'Chennai',st:'Tamil Nadu',cl:'che',dr:8,wr:2,rho:1.18,dDB:38.4,dWB:26.2,eWB:29.1,gw:STD.gw["Tamil Nadu"],t:STD.tE["Tamil Nadu"],dem:608,wp:80,sup:1245,gws:'Chennai district groundwater is over-exploited (127.5% of recharge)',over:1},
 hyd:{n:'Hyderabad',st:'Telangana',cl:'hyd',dr:11,wr:3,rho:1.12,dDB:40.4,dWB:22.5,eWB:25.6,gw:STD.gw["Telangana"],t:STD.tE["Telangana"],dem:500,wp:80,sup:2478,gws:'',over:0},
 noi:{n:'Delhi NCR',st:'Uttar Pradesh / Delhi',cl:'noi',dr:12,wr:3,rho:1.17,dDB:41.8,dWB:23.6,eWB:28.4,gw:STD.gw["Uttar Pradesh / Delhi"],t:STD.tE["Uttar Pradesh / Delhi"],dem:450,wp:80,sup:4555,gws:'',over:0},
 pun:{n:'Pune',st:'Maharashtra',cl:'pun',dr:13,wr:3,rho:1.12,dDB:38.4,dWB:20.5,eWB:24.8,gw:STD.gw["Maharashtra"],t:STD.tE["Maharashtra"],dem:560,wp:80,sup:1222,gws:'',over:0},
 viz:{n:'Visakhapatnam',st:'Andhra Pradesh',cl:'viz',dr:6,wr:2,rho:1.18,dDB:36.4,dWB:26.5,eWB:29.2,gw:STD.gw["Andhra Pradesh"],t:STD.tE["Andhra Pradesh"],dem:475,wp:80,sup:384,gws:'',over:0},
 kol:{n:'Kolkata',st:'West Bengal',cl:'che',dr:8,wr:2,rho:1.18,dDB:37.2,dWB:25.4,eWB:29.5,gw:STD.gw["West Bengal"],t:STD.tE["West Bengal"],dem:475,wp:80,sup:1850,gws:'',over:0,proxy:1}};
/* tok: FP8-equivalent MLPerf Llama 2 70B Server throughput per GPU from the atlas register (FP4 results ÷ the FP4 factor 1.9; H100 = H200 ÷ 1.43, the memory-bandwidth ratio). hardware: rack kW (air version where it exists), GPUs per rack, server-fan share of rack power when air-cooled, liquid share with DLC, allowed cooling, cost per rack (Rs crore), GPU TDP W, inference tokens/s per GPU at FP8 (70B-class model, benchmark batching), training dense PFLOPS FP8, FP4 support */
const CHV=(id,k,d)=>{const C=(typeof STD!=='undefined'&&STD.chips)?STD.chips[id]:null;if(!C)return d;if(k==='tdp')return C.tdp||d;const m=C.mlp[k];return m?m[0]:d};
const HW={
 cpu:{n:'CPU servers (colocation, enterprise)',kw:8,gpr:0,sf:.06,f:.70,ok:['crah','crahc','dx','rdhx','iec','dlc','im1','im2'],cost:1.7,tdp:0,tok:0,pf:0,fp4:0,note:'Web, databases, enterprise apps; no large-model AI.'},
 l40s:{n:'NVIDIA L40S inference servers',kw:18,gpr:32,sf:.07,f:.60,ok:['crahc','rdhx','iec','dlc','im1','im2'],cost:2.5,tdp:350,tok:600,pf:.73,fp4:0,note:'Enterprise and edge inference, vision, small models; air-cooled PCIe cards.'},
 h100:{n:'NVIDIA HGX H100 (4 × 8-GPU servers)',kw:41,gpr:32,sf:.08,f:.75,ok:['rdhx','dlc','im1','im2'],cost:9.5,tdp:CHV('h100','tdp',700),tok:Math.round(CHV('h200','l70',4125)/1.43),pf:1.98,fp4:0,note:'Most of the IndiaAI GPU pool; air or liquid.'},
 b200:{n:'NVIDIA HGX B200 (4 × 8-GPU servers)',kw:57,gpr:32,sf:.08,f:.80,ok:['dlc','im1','im2'],cost:16,tdp:CHV('b200','tdp',1000),tok:Math.round(CHV('b200','l70',12499)/1.9),pf:4.5,fp4:1,note:'Blackwell 8-GPU servers; air version needs ~14 kW per server.'},
 gb200:{n:'NVIDIA GB200 NVL72 rack',kw:132,gpr:72,sf:0,f:.87,ok:['dlc'],cost:29,tdp:1200,tok:6700,pf:5,fp4:1,note:'72 GPUs in one NVLink domain; about 115 kW to liquid, 17 kW to air.'},
 gb300:{n:'NVIDIA GB300 NVL72 rack',kw:142,gpr:72,sf:0,f:.90,ok:['dlc'],cost:40,tdp:CHV('b300','tdp',1400),tok:Math.round(CHV('b300','l70',14495.6)/1.9),pf:5,fp4:1,note:'Blackwell Ultra; ~128 kW liquid, ~14 kW air.'},
 rubin:{n:'NVIDIA Vera Rubin NVL144 (estimate)',kw:200,gpr:72,sf:0,f:1,ok:['dlc'],cost:55,tdp:2300,tok:17000,pf:17.5,fp4:1,note:'Fanless, 100% liquid, designed for 45 °C water; power and throughput are analyst estimates.'}};
const COOL={
 crah:{n:'Chilled-water air handlers, open aisles',max:12,air:1,dT:8,dP:450,pen:3,cap:50},
 crahc:{n:'Chilled-water air handlers + aisle containment',max:30,air:1,dT:12,dP:400,pen:0,cap:53},
 dx:{n:'DX room units (refrigerant)',max:10,air:1,integ:1,cap:48},
 rdhx:{n:'Rear-door heat exchangers',max:50,air:1,door:1,cap:58},
 iec:{n:'Indirect evaporative cooling units',max:30,air:1,integ:1,cap:56},
 dlc:{n:'Direct-to-chip liquid (cold plates)',max:250,liq:1,cap:73.5},
 im1:{n:'Single-phase immersion (oil tanks)',max:120,liq:1,imm:1,cap:70},
 im2:{n:'Two-phase immersion (boiling fluid)',max:250,liq:1,imm:2,cap:85}};
const REJ={acc:{n:'Air-cooled chillers',cap:0},accfc:{n:'Air-cooled chillers with free-cooling coils',cap:1.5},wcc:{n:'Water-cooled chillers + cooling towers',cap:2.5},wcch:{n:'Water-cooled chillers + hybrid (adiabatic) coolers',cap:3.5},dry:{n:'Dry coolers (trim chiller if needed)',cap:3},adi:{n:'Adiabatic dry coolers (spray on hot hours)',cap:4},twr:{n:'Cooling towers, no chillers',cap:2},integ:{n:'Integrated in the room units',cap:0}};
const REJFOR=c=>COOL[c].integ?['integ']:COOL[c].liq?['dry','adi','twr']:['accfc','acc','wcc','wcch'];
const UPS={leg:{n:'Legacy double-conversion (VRLA)',e:.94,min:10},dc:{n:'Modern double-conversion (Li-ion)',e:.965,min:5},eco:{n:'Eco-mode / line-interactive',e:.985,min:5},rack:{n:'Rack-level batteries, no central UPS',e:.99,min:3}};
const RED={n:{n:'N (no spare)',p:0,cx:.92,g:0},n1:{n:'N+1',p:.003,cx:1,g:1},n2:{n:'2N (fully duplicated)',p:.01,cx:1.15,g:2}};
const PWR={grid:{n:'State grid',c:0,dt:0},rtc:{n:'60% round-the-clock clean + grid',c:.6,dt:-.5},cl90:{n:'90% clean (RTC + storage)',c:.9,dt:-.2}};
const WS={muni:{n:'Municipal piped water',p:null},treat:{n:'Treated sewage (tertiary)',p:40},bore:{n:'Borewell',p:20},tank:{n:'Tankers',p:131}};
const MODEL={m8:{n:'8B model',k:6},m70:{n:'70B model',k:1},moe:{n:'Large MoE (~37B active)',k:.35},m405:{n:'405B dense model',k:.18}};
const PREC={bf16:{n:'BF16',k:.6},fp8:{n:'FP8',k:1},fp4:{n:'FP4',k:1.9}};
const DAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
const EF=(typeof STD!=='undefined'&&STD.co2)||0.675,EFM=(typeof STD!=='undefined'&&STD.co2om)||0.963,GWM=(typeof STD!=='undefined'&&STD.gwM)||3.8,CRF15=.1391,CRF5=.2706,RHOCP={w:4.18,pg:3.98,oil:1.68};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const UZ=(typeof STD!=='undefined'&&STD.util)?STD.util:{T:.9,I:.7,G:.65};/* workload utilisation, atlas standards (Chapter 18) */
const DEF={city:'blr',mw:50,hw:'gb300',u:80,uT:Math.round(UZ.T*100),uI:Math.round(UZ.I*100),uG:Math.round(UZ.G*100),train:40,inf:60,cool:'dlc',rej:'dry',wc:40,tsa:24,coc:4,ws:'muni',ups:'dc',red:'n1',dist:'ac',tr:'std',pwr:'grid',model:'m70',prec:'fp8',batch:.3,tpp:500,mfu:.4};
function feas(S){const h=HW[S.hw],c=COOL[S.cool],out={ok:true,why:[],warn:[]};
 if(!h.ok.includes(S.cool)){out.ok=false;out.why.push(S.hw.startsWith('gb')||S.hw==='rubin'?`${h.n} is designed only for direct-to-chip liquid cooling; NVIDIA offers no air or immersion option for it.`:`${h.n} at ${h.kw} kW per rack cannot be cooled by ${c.n.toLowerCase()} (limit ~${c.max} kW per rack).`)}
 else if(h.kw>c.max){out.ok=false;out.why.push(`${h.kw} kW per rack is above the ~${c.max} kW limit of ${c.n.toLowerCase()}.`)}
 if(!REJFOR(S.cool).includes(S.rej)){out.ok=false;out.why.push(`${REJ[S.rej]?REJ[S.rej].n:S.rej} cannot serve ${c.n.toLowerCase()}.`)}
 if(S.cool==='im2')out.warn.push('Two-phase fluids are fluorinated (PFAS); 3M stopped making them in 2025 and EU restrictions are pending. Facility water is capped at 39 °C so the fluid (boiling ~49 °C) can condense.');
 if(c.imm&&['h100','b200','l40s','cpu'].includes(S.hw))out.warn.push('Immersion voids most server warranties unless the maker certifies it (Intel offers a rider for Xeon only).');
 if(S.prec==='fp4'&&!h.fp4)out.warn.push(`${h.n} has no FP4 support, so FP8 is used.`);
 if(S.dist==='dc'&&S.hw!=='rubin')out.warn.push('800 V DC distribution is arriving with Rubin-generation and later racks; for this hardware it is a forward-looking assumption.');
 const evap=['wcc','wcch','adi','twr'].includes(S.rej)||S.cool==='iec';
 if(evap&&S.ws==='bore'&&CITY[S.city].over)out.warn.push(`${CITY[S.city].gws}: drawing borewell water for evaporative cooling here worsens a depleted aquifer.`);
 if(S.train+S.inf>100)out.warn.push('Training and inference shares add to more than 100%; they are scaled down proportionally.');
 return out}
function rejHour(Q,Ts,dTw,rej,DB,WB,coc){
 const Tr=Ts+dTw,free=T=>T<=Ts?1:T>=Tr?0:(Tr-T)/(Tr-Ts);let phi=0,Tcond,eta=.45,fanK=.02,water=0,spray=0,Tf,cond=0;
 if(rej==='acc'){Tf=null;phi=0;Tcond=DB+12;eta=.40;fanK=.03}
 else if(rej==='accfc'){Tf=DB+8;phi=free(Tf);Tcond=DB+12;eta=.40;fanK=.025}
 else if(rej==='wcc'||rej==='twr'){const Tcw=WB+4;Tf=Tcw+1.5;phi=free(Tf);Tcond=Tcw+3;fanK=.007;cond=1}
 else if(rej==='wcch'){let Tin=DB;if(DB>22){Tin=DB-.8*(DB-WB);spray=1}Tf=Tin+6;phi=free(Tf);Tcond=Tf+3;fanK=.018;if(spray)water=(DB-Tin)/10}
 else if(rej==='dry'){Tf=DB+6;phi=free(Tf);Tcond=Tf+3}
 else if(rej==='adi'){let Tin=DB;Tf=DB+6;if(Tf>Ts){Tin=Math.max(Ts-6,DB-.8*(DB-WB));if(Tin<DB-.05){spray=1;fanK=.015;water=(DB-Tin)/10}Tf=Tin+6}phi=free(Tf);Tcond=Tf+3}
 const mech=(1-phi)*Q;let cop=0,ch=0;if(mech>0){const Te=Ts-3+273.15,Tc=Tcond+273.15;cop=clamp(eta*Te/Math.max(Tc-Te,3),2,10);ch=mech/cop}
 const Qrej=Q+ch,fan=fanK*Qrej,pump=cond?Qrej*0.0124:0;let w=0;
 if(cond)w=Qrej*1.185*coc/(coc-1)*1.005;else if(water)w=Qrej*3600*water/2430*1.1;
 return {phi,cop,ch,fan,pump,w,spray,Tf,Tcond,Qrej,mech}}
function hour(S,DB,WB,ITkW,dm){
 const h=HW[S.hw],c=COOL[S.cool],city=CITY[S.city],o={DB,WB,it:ITkW,comp:0,fan:0,pump:0,rfan:0,w:0,free:1,trim:0,spray:0,cop:0,phiL:1,phiA:1};
 const ups=UPS[S.ups],eU=ups.e-RED[S.red].p,upsL=ITkW*(1/eU-1),pduL=ITkW*(S.dist==='dc'?.007:.015);o.ups=upsL;o.pdu=pduL;
 const misc=S.mw*1000*(.01+.0015);o.misc=misc;
 let Qair=0,Qliq=0;const f=c.liq?(c.imm?1:h.f):0;Qliq=ITkW*f;Qair=ITkW*(1-f)+upsL+pduL;
 const airPlant=c.liq?(S.rej==='twr'?'wcc':'accfc'):S.rej;
 if(Qliq>0){let Ts=S.wc;if(c.imm===2)Ts=Math.min(Ts,39);const dTw=c.imm===2?8:10;const r=rejHour(Qliq,Ts,dTw,S.rej,DB,WB,S.coc);
  let pumpK=.0051+(c.imm===1?.0106:c.imm===2?0:.0072);o.pump+=Qliq*pumpK+r.pump;o.comp+=r.ch;o.rfan+=r.fan;o.w+=r.w;o.phiL=r.phi;if(r.mech>0)o.trim=1;if(r.spray)o.spray=1;o.L={Ts,dTw,Tf:r.Tf,Tcond:r.Tcond,cop:r.cop,phi:r.phi,Qrej:r.Qrej,w:r.w}}
 if(Qair>0){
  if(S.cool==='dx'){const Te=S.tsa-10+273.15,Tc=DB+15+273.15,cop=clamp(.30*Te/Math.max(Tc-Te,3),2,8),fan=.10*Qair;o.comp+=Qair/cop;o.fan+=fan;o.cop=cop;o.phiA=0;o.free=0;o.A={Tsa:S.tsa,Tret:S.tsa+10,cop,Tcond:DB+15}}
  else if(S.cool==='iec'){const Tsa=S.tsa,Tret=Tsa+12,dry=Tret-.7*(Tret-DB);let phi=1,water=0,trimK=0,wet=0;const fan=.05*Qair;
   if(dry>Tsa){wet=1;const Tw=DB-.85*(DB-WB),Ta=Tret-.7*(Tret-Tw);phi=Ta<=Tsa?1:(Tret-Ta)/(Tret-Tsa);phi=clamp(phi,0,1);const LF=clamp((DB-Tw)/((Tret-2)-Tw),0,1);water=Qair*phi*LF*3600/2430*1.15;
    if(phi<1){const Te=Tsa-8+273.15,Tc=DB+12+273.15,cop=clamp(.4*Te/Math.max(Tc-Te,3),2,8);trimK=(1-phi)*Qair/cop;o.cop=cop}}
   o.comp+=trimK;o.fan+=fan;o.w+=water;o.phiA=phi;if(wet)o.spray=1;o.A={Tsa,Tret,phi,wet,Tw:DB-.85*(DB-WB)}}
  else{const door=c.door,Tsa=S.tsa-(c.pen||0),Tchw=Math.max(7,door?S.tsa-4:Tsa-6),fan=door?0:Qair/(city.rho*1.006*(c.dT||12))*(c.dP||400)/.65/1000;
   const Qa=Qair+fan,r=rejHour(Qa,Tchw,6,airPlant,DB,WB,S.coc);o.fan+=fan;o.pump+=Qa*.01424+r.pump;o.comp+=r.ch;o.rfan+=r.fan;o.w+=r.w;o.phiA=r.phi;if(r.spray)o.spray=1;if(r.cop)o.cop=r.cop;o.A={Tsa,Tret:Tsa+(c.dT||12),Tchw,Tf:r.Tf,Tcond:r.Tcond,cop:r.cop,phi:r.phi,plant:airPlant,Qrej:r.Qrej}}}
 o.free=Math.min(o.phiL,o.phiA);
 const sub=ITkW+o.comp+o.fan+o.pump+o.rfan+upsL+pduL+misc,eT=S.tr==='hi'?.992:.985;o.tr=sub/eT-sub;o.fac=sub+o.tr;
 o.w+=ITkW*((typeof STD!=="undefined"&&STD.dryWUE!=null)?STD.dryWUE:.05);/* humidification, domestic */
 return o}
function compute(S0){const S=Object.assign({},DEF,S0);const F=feas(S);if(!F.ok)return {ok:false,F,S};
 const h=HW[S.hw],c=COOL[S.cool],city=CITY[S.city],cl=CLIM[city.cl];let sh=S.train+S.inf;const tr=sh>100?S.train*100/sh:S.train,inf=sh>100?S.inf*100/sh:S.inf;
 const prec=(S.prec==='fp4'&&!h.fp4)?'fp8':S.prec;const capKW=S.mw*1000,gp=Math.max(0,100-tr-inf);
 /* energy by workload: each share of the hall runs at its own utilisation and daily shape (training flat; inference peaks ~20:00, peak ÷ average 1.19; general-purpose peaks in office hours, amplitude 0.25, estimate). Each shape averages 1 over the day. */
 const ZK=[['T','Training',tr,S.uT,0,0],['I','Inference',inf,S.uI,.19,20],['G','General-purpose and other',gp,S.uG,.25,14]].map(([k,n,sh,uz,amp,pk])=>({k,n,share:sh/100,u:clamp(+uz||0,1,100)/100,amp,pk,it:0,fac:0,w:0}));
 const u=ZK.reduce((x,z)=>x+z.share*z.u,0);S.u=Math.round(u*100);
 const E={it:0,comp:0,fan:0,pump:0,rfan:0,ups:0,pdu:0,tr:0,misc:0,fac:0},W={site:0},M=[];let hrs=0,freeH=0,trimH=0,sprayH=0,freeL=0,freeA=0,peakIT=0;
 for(let m=0;m<12;m++){let mE=0,mI=0,mW=0;for(let hh=0;hh<24;hh++){const cs=Math.cos(2*Math.PI*(hh-15)/24),DB=cl.db[m]+city.dr/2*cs,WB=Math.min(DB,cl.wb[m]+city.wr/2*cs);
  const zl=ZK.map(z=>z.share*z.u*(1+z.amp*Math.cos(2*Math.PI*(hh-z.pk)/24))),zs=zl.reduce((x,y)=>x+y,0),load=Math.min(1,zs);const r=hour(S,DB,WB,capKW*load);const d=DAYS[m];
  if(zs>0)ZK.forEach((z,i)=>{const f=zl[i]/zs;z.it+=r.it*f*d;z.fac+=r.fac*f*d;z.w+=r.w*f*d});
  for(const k in E)E[k]+=(r[k]||0)*d;W.site+=r.w*d;mE+=r.fac*d;mI+=r.it*d;mW+=r.w*d;hrs+=d;if(r.free>=.999)freeH+=d;if(r.phiL>=.999)freeL+=d;if(r.phiA>=.999)freeA+=d;if(r.trim)trimH+=d;if(r.spray)sprayH+=d}
  M.push({pue:mE/mI,wue:mW/mI,fac:mE,it:mI,w:mW})}
 /* design hours at full IT */
 const d1=hour(S,city.dDB,city.dWB,capKW),d2=hour(S,city.dDB-3,city.eWB,capKW),dh=d1.fac>=d2.fac?d1:d2;
 const typ=hour(S,cl.db.reduce((x,y)=>x+y)/12,cl.wb.reduce((x,y)=>x+y)/12,capKW*u);
 const pue=E.fac/E.it,wue=W.site/E.it,P=PWR[S.pwr],ewif=city.gw*(1-P.c)+.05*P.c,ef=EF*(1-P.c);
 const facMWh=E.fac/1000,itMWh=E.it/1000,siteKL=W.site/1000,gridKL=facMWh*ewif,co2=facMWh*ef,co2M=facMWh*EFM*(1-P.c),gridKLM=facMWh*(GWM*(1-P.c)+.05*P.c);
 const tariff=city.t+P.dt,wp=WS[S.ws].p==null?city.wp:WS[S.ws].p;const peakKW=dh.fac,kva=peakKW/.95;
 const fShare=c.liq&&!c.imm?h.f:(c.imm?1:0),rackKW=h.kw*(1-h.sf*fShare),racks=Math.ceil(capKW/rackKW),gpus=racks*h.gpr;
 const CP=CCT.pair(RMAP[S.cool],JMAP[S.rej]),rx=RED[S.red].cx,baseCap=S.mw*(c.liq?CCT.BASE.liq:CCT.BASE.air)*rx,coolRoom=S.mw*CP.room*rx,coolRej=S.mw*CP.rej*rx,coolCap=coolRoom+coolRej,facCap=baseCap+coolCap,fluid=c.imm===1?racks*.18:c.imm===2?racks*0.7:0,itCap=racks*h.cost+fluid,capex=facCap+itCap;
 const towerW=['wcc','twr'].includes(S.rej)||(c.liq&&!c.imm&&S.rej==='twr'),coolOM=S.mw*CP.om*rx,chem=towerW?siteKL*CCT.CHEM/1e7:0,fluidTop=c.imm?fluid*CCT.FLUIDLOSS[S.cool]:0;
 const cost={energy:facMWh*1000*tariff/1e7,demand:kva*city.dem*12/1e7,water:siteKL*wp/1e7,om:baseCap*.015,cool:coolOM+chem+fluidTop,staff:Math.max(3,S.mw*.3),capF:baseCap*CRF(.11,20),capC:coolRoom*CRF(.11,CP.Lr)+coolRej*CRF(.11,CP.Lj),capIT:itCap*CRF5,itm:itCap*.02};cost.total=Object.values(cost).reduce((x,y)=>x+y,0);
 const gens=Math.ceil(peakKW/2500)+(S.red==='n'?0:S.red==='n1'?1:Math.ceil(peakKW/2500)),diesel=peakKW*48*.26,batt=S.mw*UPS[S.ups].min/60;
 const ws=racks*(c.imm?3.2:2.6),rejMW=dh.L?dh.L.Qrej/1000+(dh.A&&dh.A.Qrej?dh.A.Qrej/1000:0):(dh.A&&dh.A.Qrej?dh.A.Qrej/1000:S.mw*1.3),yard=rejMW*({dry:60,adi:45,twr:15,wcc:20,wcch:35,acc:40,accfc:45,integ:30}[S.rej]);
 ZK.forEach(z=>{z.itMWh=z.it/1000;z.facMWh=z.fac/1000;z.e=E.it>0?z.it/E.it:0;z.pue=z.it>0?z.fac/z.it:0;z.siteKL=z.w/1000;z.gridKL=z.facMWh*ewif;z.co2=z.facMWh*ef;z.eCost=z.facMWh*1000*tariff/1e7});
 const ZI=ZK[1],ZT=ZK[0];
 /* AI output */
 const tok=gpus*ZI.u*(inf/100)*h.tok*PREC[prec].k*MODEL[S.model].k*S.batch*86400,prompts=tok/S.tpp;
 const infE=ZI.fac*1000/365,whp=prompts>0?infE/prompts:0,mlp=prompts>0?(ZI.w/365+ZI.gridKL*1000/365)*1000/prompts+whp/pue*.13:0,mlp3=whp/pue*.13;
 const flop=gpus*ZT.u*(tr/100)*h.pf*1e15*S.mfu*3.156e7,runs=flop/3.8e25;
 return {ok:true,u,Z:ZK,co2M,gridKLM,efM:EFM,gwM:GWM,F,S,h,c,city,E,W,M,pue,wue,peakPUE:dh.fac/capKW,dh,typ,facMWh,itMWh,siteKL,gridKL,co2,ewif,ef,tariff,wp,kva,cost,capex,facCap,baseCap,coolCap,coolRoom,coolRej,CP,coolOM,chem,fluidTop,fluid,itCap,racks,gpus,rackKW,gens,diesel,batt,ws,yard,rejMW,freeH,freeL,freeA,trimH,sprayH,hrs,tok,prompts,whp,mlp,runs,prec,tr,inf,fShare,mld:siteKL/365/1000,cityPct:siteKL/365/1000/city.sup*100}}
return {CLIM,CITY,HW,COOL,REJ,REJFOR,UPS,RED,PWR,WS,MODEL,PREC,DEF,feas,compute,hour,rejHour,EF,CCT,RMAP,JMAP};
})();

