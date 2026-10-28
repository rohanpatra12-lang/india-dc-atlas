
/* ---------- 13b WHY AI USES MORE WATER ---------- */
{
if(document.getElementById('wy-p')){
const D={tw:{c:{pue:1.25,wue:1.8,n:'CRAH + chillers + towers'},a:{pue:1.10,wue:1.8,n:'direct-to-chip + towers'}},dry:{c:{pue:1.45,wue:.05,n:'CRAH + air-cooled chillers'},a:{pue:1.15,wue:.05,n:'direct-to-chip + dry coolers'}}};
const IDc=.36,BUc=1.0,IDa=.20,BUa=.78;
let cm='tw';
const f0=v=>fmt(v,0),f1=v=>fmt(v,1),f2=v=>fmt(v,2),rx=v=>(v>=9.95?fmt(v,0):fmt(v,1))+'×';
function wy(){
 const uc=val('wy-uc')/100,ua=val('wy-ua')/100,rc=val('wy-rc'),ra=val('wy-ra'),mc=val('wy-mc'),ma=val('wy-ma'),g=val('wy-g');
 out('wy-uc',Math.round(uc*100)+'%');out('wy-ua',Math.round(ua*100)+'%');out('wy-rc',rc+' kW');out('wy-ra',ra+' kW');out('wy-mc',mc+' MW');out('wy-ma',fmt(ma)+' MW');out('wy-g',g.toFixed(1)+' L/kWh');
 const C=D[cm].c,A_=D[cm].a;
 const lc=IDc*(1-uc)+BUc*uc,la=IDa*(1-ua)+BUa*ua;
 const kc=C.wue+C.pue*g,ka=A_.wue+A_.pue*g; /* total L per kWh of IT */
 const ec=lc*8760,ea=la*8760; /* MWh per MW */
 const onc=ec*C.wue/1000,ona=ea*A_.wue/1000,inc=ec*C.pue*g/1000,ina=ea*A_.pue*g/1000,tc=onc+inc,ta=ona+ina;
 const rkc=rc*lc*24*kc,rka=ra*la*24*ka,rkoc=rc*lc*24*C.wue,rkoa=ra*la*24*A_.wue;
 const sc=tc*mc,sa=ta*ma;
 const lev=[['Per kWh of IT',kc,ka,'L/kWh',2],['Per MW of capacity, a year',tc,ta,'ML',1],['Per rack, a day',rkc,rka,'L',0],['Per site, a year',sc,sa,'ML',0]];
 const mx=Math.max(...lev.map(l=>l[2]/l[1]),1.05);
 document.getElementById('wy-lad').innerHTML=`<div class="wy-h"><span></span><span>Conventional = 1 · AI shown as a multiple</span><span>AI ÷ conv.</span></div>`+lev.map(([n,c,a,u,d])=>{const r=a/c;return `<div class="wy-r"><span class="wy-l">${n}<small>${fmt(c,d)} vs ${fmt(a,d)} ${u}</small></span><span class="wy-b"><i class="c" style="width:${100/mx}%"></i><i class="a" style="width:${Math.max(1.5,r/mx*100)}%"></i></span><b class="wy-x ${r>1.3?'hot':''}">${rx(r)}</b></div>`}).join('')+`<div class="cx-sk"><span><i class="d" style="background:var(--muted)"></i>Conventional</span><span><i class="i"></i>AI</span></div>`;
 const row=(s,a,b,r)=>`<tr><td>${s}</td><td>${a}</td><td>${b}</td><td class="n">${r}</td></tr>`;
 document.getElementById('wy-tb').innerHTML=[
  row('<b>1 · Physics.</b> Water per kWh of heat: 3.6 ÷ 2.43 = 1.48 L if fully evaporated; a tower evaporates ~80% and drains blowdown, ~1.58 L per kWh of heat',`${C.n}: WUE <b>${f2(C.wue)}</b> L/kWh${cm==='tw'?' (tower also removes chiller heat, ×1.17)':''}`,`${A_.n}: WUE <b>${f2(A_.wue)}</b> L/kWh${cm==='tw'?' (warm water, no chiller heat)':''}`,rx(A_.wue/C.wue)),
  row('<b>2 · How hard it runs.</b> IT load factor = idle × (1 − busy share) + busy power × busy share',`${f2(IDc)} × ${f2(1-uc)} + ${f2(BUc)} × ${f2(uc)} = <b>${f0(lc*100)}%</b>`,`${f2(IDa)} × ${f2(1-ua)} + ${f2(BUa)} × ${f2(ua)} = <b>${f0(la*100)}%</b>`,rx(la/lc)),
  row('<b>3 · Per MW of capacity.</b> IT energy, then on-site + power-station water',`${f0(ec)} MWh → ${f1(onc)} + ${f0(ec)} × ${f2(C.pue)} × ${g.toFixed(1)} ÷ 1,000 = ${f1(inc)} → <b>${f1(tc)} ML</b>`,`${f0(ea)} MWh → ${f1(ona)} + ${f0(ea)} × ${f2(A_.pue)} × ${g.toFixed(1)} ÷ 1,000 = ${f1(ina)} → <b>${f1(ta)} ML</b>`,rx(ta/tc)),
  row('<b>4 · Per rack, a day.</b> Rack kW × load × 24 h × litres per kWh of IT',`${rc} × ${f2(lc)} × 24 × ${f2(kc)} = <b>${f0(rkc)} L</b> (on site ${f0(rkoc)})`,`${ra} × ${f2(la)} × 24 × ${f2(ka)} = <b>${f0(rka)} L</b> (on site ${f0(rkoa)})`,rx(rka/rkc)),
  row('<b>5 · Per site, a year.</b> Per-MW total × site size',`${f1(tc)} × ${mc} MW = <b>${f0(sc)} ML</b> · ${f1(sc/365)} ML a day · ${f0(sc*1e6/365/135)} people`,`${f1(ta)} × ${fmt(ma)} MW = <b>${f0(sa)} ML</b> · ${f1(sa/365)} ML a day · ${f0(sa*1e6/365/135)} people`,rx(sa/sc))].join('');
 const shA=ina/ta;
 document.getElementById('wy-n').innerHTML=`Per kWh the AI hall needs <b>${rx(ka/kc)}</b> the water of the conventional hall, and per MW <b>${rx(ta/tc)}</b>. The gap is per rack (<b>${rx(rka/rkc)}</b>, from ${rx(ra/rc)} the rack power and ${rx(la/lc)} the load factor) and per site (<b>${rx(sa/sc)}</b>, from ${rx(ma/mc)} the size). ${f0(shA*100)}% of the AI site's water is evaporated at power stations${cm==='tw'?'; switch to dry cooling to see that on-site water nearly vanishes while the total falls far less':''}.`;
}
['wy-uc','wy-ua','wy-rc','wy-ra','wy-mc','wy-ma','wy-g'].forEach(i=>document.getElementById(i).addEventListener('input',wy));
seg('wy-c',d=>{cm=d.v;wy()});wy();
}
}
