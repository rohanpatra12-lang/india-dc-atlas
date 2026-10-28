
/* ---------- CHAPTER SW: Scope 1, 2 and 3 water ---------- */
var SWM=(function(){
const CE=CEM;
/* Scope 2 factors, m³ per MWh delivered (consumption: hydro excluded / net / gross; withdrawal hydro excluded). Atlas standard = state value at the meter. */
/* Atlas standard = national grid at the meter (CEA publishes one grid; carbon uses the same boundary). State values come from each state's own generation mix and are a sensitivity. Hydro conventions: excluded / allocated 10 L/kWh / gross 26 L/kWh. */
const _S=(typeof STD!=='undefined'&&STD.mixW)?STD:null,_HW=_S?_S.hydroW:10,_mw=(st,h)=>_S?_S.mixW(_S.mix[st],_S.coalW,h):null;
const _g=(n,st,w,fb)=>{const c=_S?[_mw(st,0),_mw(st,_HW),_mw(st,26)].map(v=>+v.toFixed(2)):fb;return {n,std:_S?(st==='India'?_S.gw.India:_S.gwMix[st]):fb[0],c,w,cf:30}};
const GRID={india:_g('All-India grid','India',3.4,[2.9,3.8,5.2]),KA:_g('Karnataka','Karnataka',2.0,[1.54,3.5,6.6]),MH:_g('Maharashtra','Maharashtra',3.3,[2.84,3.4,4.3]),TN:_g('Tamil Nadu','Tamil Nadu',1.3,[2.1,2.6,3.5]),TG:_g('Telangana','Telangana',3.6,[3.1,3.7,4.5]),UP:_g('Uttar Pradesh','Uttar Pradesh',3.5,[3.3,3.8,4.7])};
if(_S)GRID.india.c[0]=_S.gw.India;
/* sites: state grid, AWARE-type stress weight for on-site water (illustrative placeholder, see notes) */
const SITE={blr:{n:'Bengaluru',g:'KA',cf:70,ce:'blr'},mum:{n:'Mumbai',g:'MH',cf:40,ce:'mum'},che:{n:'Chennai',g:'TN',cf:80,ce:'che'},hyd:{n:'Hyderabad',g:'TG',cf:60,ce:'hyd'},noi:{n:'Delhi NCR (Noida)',g:'UP',cf:90,ce:'noi'},pun:{n:'Pune',g:'MH',cf:50,ce:'pun'}};
const HW={cpu:{n:'Conventional servers',srvMW:1360,gpuMW:0},ai:{n:'GB200/GB300-class GPU racks',srvMW:120,gpuMW:464}};
const DEF={site:'blr',mw:50,u:(typeof STD!=='undefined'&&STD.ref)?Math.round(STD.ref.uAI*100):78,sys:'dlc40',coc:4,basis:'std',hydro:1,clean:0,match:'annual',hw:'ai',ref:5,gpuW:2.6,whp:0.22,view:'c'};
function compute(o0){const o=Object.assign({},DEF,o0),st=SITE[o.site],c=CE.CITY[st.ce]||CE.CITY.blr,cl={b:0,c:1,d:2}[c.cl];
 const sys=CE.SYS.find(x=>x.id===o.sys)||CE.SYS[0],pue=sys.p[cl],wue=sys.w[cl];
 const EIT=o.mw*o.u/100*8760,Efac=EIT*pue;/* MWh */
 /* Scope 1 */
 const tower=!!sys.tw,evapShare=tower?(o.coc-1)/o.coc:sys.w[cl]>.1?.9:.8;
 const wueW=tower?wue*(o.coc/(o.coc-1))/(4/3):wue;/* reference WUE is make-up at 4 cycles */
 const s1W=EIT*wueW+o.mw*300,s1C=EIT*wueW*evapShare+o.mw*150;/* kL; non-cooling 300 m³/MW/yr, half consumed */
 /* Scope 2 */
 const G=o.basis==='state'?GRID[st.g]:GRID.india;const gC=o.basis==='std'?GRID.india.std:G.c[o.hydro],gW=G.w;
 const sh=o.clean/100,cleanF=.05;
 const s2C_LB=Efac*gC,s2W_LB=Efac*gW;
 const mbF=o.match==='hourly'?sh*cleanF+(1-sh)*gC:sh*cleanF+(1-sh)*gC;/* market-based (claimed) */
 const phys=o.match==='hourly'?sh:sh*.55;/* annual contracts cover only ~55% of their volume hour by hour (solar-heavy) */
 const s2C=Efac*(phys*cleanF+(1-phys)*gC),s2W=Efac*(phys*cleanF+(1-phys)*gW),s2C_MB=Efac*mbF;
 /* Scope 3 (withdrawal basis; consumption 50%) */
 const H=HW[o.hw],itW=o.mw*(H.gpuMW*o.gpuW+H.srvMW*2.8)/o.ref,bldW=o.mw*5600/25,coalW=Efac*(1-phys)*.16,dslW=o.mw*4;
 const s3W=itW+bldW+coalW+dslW,s3C=s3W*.5;
 const S1={W:s1W,C:s1C},S2={W:s2W,C:s2C},S3={W:s3W,C:s3C,it:itW,bld:bldW,coal:coalW,dsl:dslW};
 const totC=S1.C+S2.C+S3.C,totW=S1.W+S2.W+S3.W;
 const aw=S1.C*st.cf+S2.C*G.cf+(itW*.5)*15+(bldW+coalW+dslW)*.5*30;/* m³ world-eq, illustrative */
 /* break-even grid factor against the driest option for the same density */
 const dry=CE.SYS.find(x=>x.id===(sys.liq?'dlc40':'fcc')),dryP=dry.p[cl],dryW=dry.w[cl];let be=null;
 if(sys.tw||wue>.1){const dS1=EIT*(wueW*evapShare-dryW*.8);const dE=EIT*(dryP-pue);be=dE>0?dS1/dE:null}
 const per=v=>v/EIT;/* m³ per MWh IT = L/kWh = mL per Wh */
 return {o,st,c,sys,pue,wue,wueW,EIT,Efac,gC,gW,G,S1,S2,S3,totC,totW,aw,be,s2C_LB,s2W_LB,s2C_MB,phys,
  ppm:{s1:per(o.view==='w'?S1.W:S1.C)*o.whp,s2:per(o.view==='w'?S2.W:S2.C)*o.whp,s3:per(o.view==='w'?S3.W:S3.C)*o.whp},dry}}
return {GRID,SITE,HW,DEF,compute}})();
