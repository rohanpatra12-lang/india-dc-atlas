
/* ---------- 19 60% RENEWABLE FOR DATA CENTRES ---------- */
(()=>{if(!document.getElementById('re60'))return;
hbars(document.getElementById('re-dm'),[['Today, run-rate (1.79 GW)',12.9,'mut','12.9'],['C&W 4.2 GW (2030)',31.3,'','31.3'],['Atlas 4.66 GW (2030)',34.7,'','34.7'],['S&P 6.5 GW (2030)',48.4,'','48.4'],['Jefferies 8 GW (2030)',59.6,'','59.6'],['Wood Mackenzie 12 GW (2030)',89.4,'','89.4'],['NITI Aayog 16 GW (2030)',89.7,'hot','89.7'],['MeitY / MoP 13.56 GW grid (FY32)',89.1,'heat','89.1'],['CEA ~17 GW grid (FY32)',111.7,'heat','111.7'],['MoP 26.3 GW grid (FY32)',172.8,'heat','138–173']],{max:175});
const SC={lo:{n:'Cushman & Wakefield 4.2 GW IT, 2030',gw:4.2,uf:.595,pue:1.43,dem:STD.dem30,yrs:4},ce:{n:'atlas 4.66 GW IT, 2030',gw:4.66,uf:.595,pue:1.43,dem:STD.dem30,yrs:4},sp:{n:'S&P 6.5 GW IT, 2030',gw:6.5,uf:.595,pue:1.43,dem:STD.dem30,yrs:4},hi:{n:'Jefferies 8 GW IT, 2030',gw:8,uf:.595,pue:1.43,dem:STD.dem30,yrs:4},ni:{n:'NITI Aayog 16 GW IT, 2030',gw:16,uf:.40,pue:1.60,dem:STD.dem30,yrs:4},wm:{n:'Wood Mackenzie 12 GW IT, 2030',gw:12,uf:.595,pue:1.43,dem:STD.dem30,yrs:4},mp:{n:'Ministry of Power 26.3 GW grid load, 2031-32',gw:26.3,uf:.75,pue:1,grid:1,dem:STD.dem32,yrs:5.5}};
const PF={p1:{n:'solar–wind open access with banking',c:5.0,cr:'4.5–5.5'},p2:{n:'round-the-clock (FDRE-RTC) contracts',c:6.8,cr:'6.3–7.3'},p3:{n:'overbuilt hybrid + batteries',c:6.0,cr:'5.5–6.5'},p4:{n:'open access for two-thirds, certificates and green tariffs for the rest',c:5.0,cr:'4.5–5.5'}};
const K={sol:1.93,win:3.07,rtc:7.4,cS:4.25,cW:7.5,cB:1.5,grid:8.72,addS:44.6,addW:6.05,nep:236};
let sc='ce',pf='p1';
function reCalc(){const s=SC[sc],p=PF[pf],t=val('re-t')/100;const E=s.gw*s.uf*s.pue*8.76,Ere=E*t;let S=0,W=0,R=0,B=0,rec=0,ann=t,hr=0;
 if(pf==='p1'){S=.5*Ere/K.sol;W=.5*Ere/K.win;hr=Math.min(.5,.72*t)}
 else if(pf==='p2'){R=Ere/K.rtc;S=1.8*R;W=1.2*R;B=3*R;hr=Math.min(.9,t)}
 else if(pf==='p3'){S=.321*Ere;W=.201*Ere;B=.321*Ere;ann=Math.min(1,1.23*t);hr=t}
 else{S=.5*(Ere*2/3)/K.sol;W=.5*(Ere*2/3)/K.win;rec=Ere/3;hr=Math.min(.5,.72*t*2/3)+.03}
 if(window.__hmSim){const hs=window.__hmSim(pf,t);hr=hs.hr}
 const capex=(S*K.cS+W*K.cW)*1000+B*K.cB*1000,blend=t*p.c+(1-t)*K.grid,save=E*1e9*(K.grid-blend)/1e7;
 return {s,p,t,E,Ere,S,W,R,B,rec,ann,hr,capex,blend,save,sh:E/s.dem,shS:S/s.yrs/K.addS,shW:W/s.yrs/K.addW,shB:B/K.nep,co2:Ere*STD.co2,wat:Ere*(STD.gw.India-.075)}}
function reR(){const r=reCalc();out('re-t',Math.round(r.t*100)+'%');const F=(v,d)=>fmt(v,d??(v<10?1:0));
 document.getElementById('re-r').innerHTML=`<div><span class="v">${F(r.E)} TWh</span><span class="k">data-centre electricity · ${(r.sh*100).toFixed(1)}% of India's ${fmt(r.s.dem)} BU</span></div><div><span class="v cold">${F(r.Ere)} TWh</span><span class="k">renewable power needed for ${Math.round(r.t*100)}%</span></div><div><span class="v">${F(r.S)} + ${F(r.W)} GW</span><span class="k">solar + wind${r.R?` behind ${F(r.R)} GW of contracts`:''}${r.rec?` · plus ${F(r.rec)} TWh of certificates / green tariff`:''}</span></div><div><span class="v">${r.B?F(r.B)+' GWh':'none'}</span><span class="k">battery storage</span></div><div><span class="v">${r.capex>=1e5?'₹'+(r.capex/1e5).toFixed(2)+' lakh cr':'₹'+fmt(r.capex)+' cr'}</span><span class="k">capital cost of the renewable build${pf==='p2'?' (developer side, paid through the tariff)':''}</span></div><div><span class="v ${r.hr>=r.t-0.01?'good':'hot'}">${Math.round(r.ann*100)}% · ${Math.round(r.hr*100)}%</span><span class="k">annual · hourly clean share (hourly is an estimate)</span></div><div><span class="v">₹${r.blend.toFixed(2)}/kWh</span><span class="k">blended price vs ₹8.72 grid (Maharashtra commercial) · ${r.save>=0?'saves':'costs'} ₹${fmt(Math.abs(r.save))} cr a year</span></div><div><span class="v heat">${F(r.co2)} Mt</span><span class="k">CO₂ avoided a year${pf==='p4'?' (the certificate share is accounting only)':''}</span></div><div><span class="v cold">${F(r.wat)} bn L</span><span class="k">power-station water saved a year · ${fmt(r.wat*1000/365)} MLD</span></div>`;
 const row=(n,v,cls)=>`<div class="aif-row"><span class="aif-n">${n}</span><div class="aif-tr"><i class="${cls}" style="width:${Math.min(100,v*100)}%"></i></div><span class="aif-v">${(v*100).toFixed(0)}%</span></div>`;
 document.getElementById('re-bars').innerHTML='<p class="fieldlbl" style="margin:0 0 4px">Share of India\'s yearly build this would take</p>'+row(`Solar: ${F(r.S/r.s.yrs)} GW a year of 44.6 GW (FY26)`,r.shS,'d')+row(`Wind: ${F(r.W/r.s.yrs)} GW a year of 6.05 GW (FY26)`,r.shW,'i')+(r.B?row(`Batteries: ${F(r.B)} GWh of 236 GWh planned for 2031-32`,r.shB,'f'):'');
 document.getElementById('re-n').textContent=`${r.s.n}, bought as ${r.p.n} (₹${r.p.cr}/kWh landed). `+(r.shW>.4?'Wind is the binding constraint: data centres alone would take a large slice of India\'s record yearly wind additions.':r.hr<r.t-0.05?`Counted over the year this meets ${Math.round(r.t*100)}%, but hour by hour only about ${Math.round(r.hr*100)}% is clean: solar cannot serve the night without storage.`:'This portfolio delivers the target hour by hour as well as over the year, at a higher price.')}
seg('re-sc',d=>{sc=d.v;reR()});seg('re-pf',d=>{pf=d.v;reR()});document.getElementById('re-t').addEventListener('input',reR);reR();
window.__RE60={reCalc,K};
})();

(()=>{
/* =====================================================================
   ATLAS v2 LAYER: standards, scenario bar, reading modes, signature visuals
   ===================================================================== */
const V2={};const SX=window.__SIMX;const {CITY,WL,K0,COOLN,PWN,coolOH,wueOf,CLIM,DM}=SX;const syncUI=SX.syncUI,sim=SX.sim;