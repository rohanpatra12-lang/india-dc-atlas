
/* ---------- HERO ---------- */
function flow(){
  const p=val('pue');out('pue',p.toFixed(2));
  const it=100/p,ov=100-it,cool=ov*.70,loss=ov*.22,oth=ov*.08;
  $('#sv-it').textContent=`IT ${it.toFixed(0)}%`;$('#sv-cool').textContent=`cooling ${cool.toFixed(0)}%`;$('#sv-loss').textContent=`losses ${(loss+oth).toFixed(0)}%`;
  $('#flow-text').innerHTML=`Of every 100 units bought at PUE ${p.toFixed(2)}, <b style="color:#5CCAD4">${it.toFixed(1)}</b> reach the servers. For a 20 MW hall at 70% load the overhead is <b style="color:#F2B34B">${fmt(20*.7*8.76*(p-1),1)} GWh</b> a year, about ₹${fmt(20*.7*8.76*(p-1)*.8,1)} crore at ₹8/kWh.`;
  $$('#pue-presets button').forEach(b=>b.setAttribute('aria-pressed',Math.abs(parseFloat(b.dataset.v)-p)<0.005?'true':'false'));
}
$('#pue').addEventListener('input',flow);seg('pue-presets',d=>{setv('pue',d.v);flow()});flow();
