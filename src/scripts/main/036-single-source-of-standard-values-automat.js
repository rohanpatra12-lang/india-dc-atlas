
/* ---------- single source of standard values + automatic consistency check ---------- */
const STD=window.STD;
V2.check=()=>{const r=[];const ok=(n,a,b)=>r.push([n,a,b,Math.abs(a-b)<1e-9]);
 Object.values(CITY).forEach(c=>ok(`Simulator grid water, ${c.st}`,c.gw,STD.gw[c.st]));
 ok('Simulator carbon factor',K0.ef,STD.co2);
 if(window.__RE60)ok('60% chapter carbon factor (CO₂ avoided)',(()=>{const r=window.__RE60.reCalc();return +(r.co2/r.Ere).toFixed(3)})(),STD.co2);
 if(window.__AIF){const r=window.__AIF.fcCalc();ok('Forecast panel grid water (2030 grid, no clean power)',+((r.gwx-r.cl*.05)/Math.max(.01,1-r.cl)).toFixed(2),+(STD.gw.India*r.ef30/STD.co2).toFixed(2))}
 if(typeof DTE!=='undefined')ok('Data centre model grid water, Karnataka',DTE.CITY.blr.gw,STD.gw.Karnataka);
 if(typeof CEM!=='undefined'){ok('Cooling cost chapter grid water, Karnataka',CEM.CITY.blr.gw,STD.gw.Karnataka);ok('Cooling reference PUE, colo towers, Bengaluru',CEM.SYS.find(x=>x.id==='wcc').p[0],+(1.06+coolOH('tower',24.6,19.4,false)).toFixed(3))}
 ok('Tower WUE at Bengaluru annual mean',+wueOf('tower',24.6,19.4).toFixed(3),STD.towerWUE);
 return r};
