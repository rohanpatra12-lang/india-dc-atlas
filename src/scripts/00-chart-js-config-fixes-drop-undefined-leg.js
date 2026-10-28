
/* Chart.js config fixes: drop undefined legend items; on narrow screens wrap long category labels and limit ticks */
window.__cjFix=function(cfg,cv){if(!cfg)return;const o=cfg.options=cfg.options||{};o.plugins=o.plugins||{};const lg=o.plugins.legend=o.plugins.legend||{};lg.labels=lg.labels||{};const f0=lg.labels.filter;
 lg.labels.filter=(it,d)=>it&&it.text!=null&&String(it.text)!=='undefined'&&String(it.text).trim()!==''&&(f0?f0(it,d):true);
 const w=(cv&&cv.parentElement&&cv.parentElement.clientWidth)||innerWidth;if(w>=540)return;if(/^(pie|doughnut|polarArea|radar)$/.test(cfg.type||''))return;
 const wrap=(t,n)=>{if(typeof t!=='string'||t.length<=n)return t;const out=[];let cur='';t.split(' ').forEach(x=>{if((cur+' '+x).trim().length>n&&cur){out.push(cur);cur=x}else cur=(cur+' '+x).trim()});if(cur)out.push(cur);return out};
 const d=cfg.data||{};const horiz=o.indexAxis==='y';o.scales=o.scales||{};
 if(Array.isArray(d.labels)&&d.labels.length){
  if(horiz){const orig=d.labels.slice();if(d.labels.length>6){d.labels=d.labels.map(t=>typeof t==='string'&&t.length>(w<400?19:24)?t.slice(0,(w<400?18:23)).trim()+'…':t);const tp=o.plugins.tooltip=o.plugins.tooltip||{};tp.callbacks=tp.callbacks||{};if(!tp.callbacks.title)tp.callbacks.title=it=>it.length?orig[it[0].dataIndex]:''}else d.labels=d.labels.map(t=>wrap(t,w<400?16:20));const y=o.scales.y=o.scales.y||{};y.ticks=Object.assign({autoSkip:false},y.ticks||{});y.ticks.font=Object.assign({size:10},y.ticks.font||{})}
  else{const x=o.scales.x=o.scales.x||{};x.ticks=x.ticks||{};x.ticks.maxRotation=0;
   if(cfg.type==='line'||d.labels.length>8){x.ticks.autoSkip=true;x.ticks.maxTicksLimit=Math.max(5,Math.floor(w/55))}
   else if(d.labels.length>5&&d.labels.some(t=>typeof t==='string'&&t.length>8)){x.ticks.autoSkip=false;x.ticks.minRotation=45;x.ticks.maxRotation=60;x.ticks.font=Object.assign({size:9},x.ticks.font||{})}
   else{d.labels=d.labels.map(t=>wrap(t,Math.max(6,Math.floor(w/d.labels.length/7.5))));x.ticks.autoSkip=false;x.ticks.font=Object.assign({size:d.labels.length>4?9:10},x.ticks.font||{})}}}
 else if(!horiz&&(cfg.type==='line'||cfg.type==='scatter'||cfg.type==='bubble')){const x=o.scales.x=o.scales.x||{};x.ticks=x.ticks||{};x.ticks.maxRotation=0;x.ticks.autoSkip=true;x.ticks.maxTicksLimit=Math.max(5,Math.floor(w/55))}
 if(lg.labels){lg.labels.boxWidth=Math.min(lg.labels.boxWidth||12,12);lg.labels.font=Object.assign({size:10.5},lg.labels.font||{})}};
