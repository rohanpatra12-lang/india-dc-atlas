
/* ---------- audit: headline claims must match the standards and the models ---------- */
(()=>{if(!window.V2||!V2.check)return;const base=V2.check;
 V2.claims=()=>{const r=[];const S=window.STD;const ok=(n,a,b,tol)=>r.push([n,a,b,Math.abs(a-b)<=(tol==null?1e-9:tol)]);
  const txt=sel=>{const e=document.querySelector(sel);return e?e.textContent.replace(/\s+/g,' '):''};
  const has=(n,sel,str)=>{if(!document.querySelector(sel))return;r.push([n,str,txt(sel).includes(str)?str:'(missing)',txt(sel).includes(str)])};
  const u=S.ref.uAI,on=100*u*24*1.8/1000,ps=100*u*24*1.10*S.gw.India/1000;
  has('Card 03 carbon','.tks','0.675 kg');has('Card 03 grid water','.tks','2.9 L');
  has('Card 05 total, 100 MW AI campus on towers','.tks',(on+ps).toFixed(1)+' MLD');
  has('Chapter 8 on-site water','#c5',on.toFixed(1)+' million litres a day on site');
  const gw1=1000*u*24*1.8/1000;has('Chapter 12, 1 GW on towers','#cbw','about '+Math.round(gw1)+' MLD, '+(gw1/1935*100).toFixed(1)+'% of BWSSB');
  has('Chapter 1, 1 GW on towers','#cwhy','~'+Math.round(gw1)+' MLD on site');
  if(window.__KA){const M=__KA.meta,c=__KA.cases.base,rec=c.find(x=>x.tag==='0.15'),ch=c.find(x=>x.tag==='base');
   ok('Chapter 16 grid water factor',M.w_g,S.gw.India);
   has('Chapter 16 recommended water','#c9',Math.round(rec.water)+' ML a year');
   has('Chapter 16 cheapest vs all-grid','#c9',Math.round(ch.water).toLocaleString('en-IN')+' vs '+Math.round(M.Ltot*S.gw.India/1000).toLocaleString('en-IN')+' ML');}
  if(window.__RE60&&document.getElementById('re60')){const x=__RE60.reCalc();ok('Chapter 18 India demand',x.s.dem,S.dem30);ok('Chapter 18 water factor',+(x.wat/x.Ere+.075).toFixed(3),S.gw.India,1e-6)}
  if(window.__AIF)ok('Chapter 13 India demand',__AIF.DEM,S.dem30);
  if(window.__DTE){const R=__DTE.compute(__DTE.DEF);ok('Chapter 14 carbon factor',R.ef,S.co2);ok('Chapter 14 marginal factor',R.efM,S.co2om)}
  const stale=[['4.5 L/kWh at the meter',/4\.5 L\/kWh at the meter/],['0.71 as the CEA factor',/CEA[^.]{0,30}\b0\.71\b|\b0\.71 t\/MWh \(CEA|× 0\.71\b/],['8–10 MLD',/8–10 MLD/],['Karnataka 1.8 L/kWh grid',/Karnataka (grid )?1\.8 L\/kWh/]];
  if(!document.querySelector('main section'))return r;
  const all=[...document.querySelectorAll('main section')].map(sec=>{const c=sec.cloneNode(true);c.querySelectorAll('.panel').forEach(pn=>{if(/The check runs every time the page loads/.test(pn.textContent))pn.remove()});return c.textContent}).join(' ');
  stale.forEach(([n,re])=>r.push(['No stale "'+n+'" in the text',0,re.test(all)?1:0,!re.test(all)]));
  return r};
 V2.check=()=>base().concat(V2.claims())})();

