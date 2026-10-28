
/* ---------- 13 AI VS CONVENTIONAL ---------- */
{
const NS='http://www.w3.org/2000/svg';
const cw=el=>Math.max(260,Math.min(900,(el&&el.clientWidth)||640));const TW=window.__tw||(window.__tw=(()=>{const c=document.createElement('canvas').getContext('2d');return (t,fs=11,wt=400)=>{c.font=`${wt} ${fs}px ${getComputedStyle(document.body).fontFamily||'sans-serif'}`;return c.measureText(String(t)).width}})());
const f0=v=>fmt(v,0),f1=v=>fmt(v,1),f2=v=>fmt(v,2);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const EVL={r:'reported',e:'estimate',d:'design',m:'model',u:'unaudited'};
const evc=t=>t==='d'?'e':t==='u'?'r':t;
const evs=(t,src)=>`<span class="ev ${evc(t)} show" data-src="${esc(src)}">${EVL[t]}</span>`;
const svg=(W,H,body,cls='')=>`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="${NS}"${cls?` class="${cls}"`:''}>${body}</svg>`;
const hatch=id=>`<defs><pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="var(--surface)"/><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="2.4"/></pattern></defs>`;

/* ===== 1 two buildings ===== */
const SITES={co:{n:'Conventional colo',sub:'20 MW IT · 65% load',mw:20,lf:STD.ref.uConv,wet:{pue:1.30,wue:1.8},dry:{pue:1.48,wue:.05},c:'--cold'},
             ai:{n:'AI campus',sub:'100 MW IT · 78% load (40% training)',mw:100,lf:STD.ref.uAI,wet:{pue:1.12,wue:1.8},dry:{pue:1.17,wue:.05},c:'--hot'}};
let v1n='site',v1c='wet';
function calc1(k,cool,G,s){const S=SITES[k],d=S[cool];const it=S.mw*S.lf*8.76,fac=it*d.pue,on=it*d.wue,gr=fac*(1-s)*G,co2=fac*STD.co2*(1-s);return {it,fac,on,gr,tot:on+gr,co2,pue:d.pue,wue:d.wue,mw:S.mw}}
function drawSite(x0,hw,H,k,m,mx,s,cool){
  const S=SITES[k],gy=H-34;let o='';
  // power station (left of the half)
  const sm=hw<260,px=x0+(sm?6:18),tw=sm?24:34,th=sm?34:46;
  o+=`<path d="M${px} ${gy} L${px+5} ${gy-th} Q${px+tw/2} ${gy-th+10} ${px+tw-5} ${gy-th} L${px+tw} ${gy} Z" fill="var(--sunk)" stroke="var(--muted)" stroke-width="1"/>`;
  if(!sm)o+=`<text x="${px+tw/2}" y="${gy+15}" text-anchor="middle" class="halo">Coal plant</text>`;
  const rg=(sm?4:6)+(sm?20:30)*Math.sqrt(m.gr/mx.w);if(m.gr>0.01*mx.w){const cx=px+tw/2,cy=gy-th-rg*.8;o+=`<g opacity=".9"><circle cx="${cx-rg*.45}" cy="${cy+rg*.25}" r="${rg*.7}" fill="var(--sunk)" stroke="var(--muted)" stroke-width=".8"/><circle cx="${cx+rg*.4}" cy="${cy+rg*.1}" r="${rg*.75}" fill="var(--sunk)" stroke="var(--muted)" stroke-width=".8"/><circle cx="${cx}" cy="${cy-rg*.35}" r="${rg*.8}" fill="var(--sunk)" stroke="var(--muted)" stroke-width=".8"/></g>`}
  // solar for clean share
  const ns=Math.round(s*6);for(let i=0;i<ns;i++){const sx=px-6+(i%3)*15,sy=gy+20+Math.floor(i/3)*9;o+=`<path d="M${sx+2} ${sy} h12 l-3 6 h-12 Z" fill="var(--good)" opacity=".8"/>`}
  // wire
  const cxb=x0+hw*(sm?.62:.58),f=Math.max(.16,Math.sqrt(m.fac/mx.e)),bw=(hw*(sm?.5:.56))*f,bh=118*f,bx=cxb-bw/2,by=gy-bh;
  o+=`<path d="M${px+tw} ${gy-14} C ${px+tw+20} ${gy-30}, ${bx-20} ${gy-30}, ${bx} ${gy-bh*.5}" fill="none" stroke="var(--spark)" stroke-width="${1+3*Math.sqrt(m.fac/mx.e)}" stroke-dasharray="5 4" opacity=".9"/>`;
  // building
  o+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3" fill="var(${S.c})" fill-opacity=".14" stroke="var(${S.c})" stroke-width="1.6"/>`;
  const cols=Math.max(2,Math.floor(bw/11)),rows=Math.max(1,Math.floor((bh-10)/12));
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){o+=`<rect x="${bx+5+c*((bw-10)/cols)}" y="${by+6+r*((bh-10)/rows)}" width="${Math.max(2,(bw-10)/cols-3)}" height="${Math.max(2,(bh-10)/rows-4)}" rx="1" fill="var(${S.c})" opacity="${k==='ai'?.55:.3}"/>`}
  // roof: plume or fans
  if(cool==='wet'){const r=(sm?4:6)+(sm?20:30)*Math.sqrt(m.on/mx.w),cx=bx+bw/2,cy=by-r*.9;o+=`<g><circle cx="${cx-r*.5}" cy="${cy+r*.25}" r="${r*.7}" fill="var(--cold-soft)" stroke="var(--cold-2)" stroke-width=".8"/><circle cx="${cx+r*.45}" cy="${cy+r*.1}" r="${r*.72}" fill="var(--cold-soft)" stroke="var(--cold-2)" stroke-width=".8"/><circle cx="${cx}" cy="${cy-r*.35}" r="${r*.8}" fill="var(--cold-soft)" stroke="var(--cold-2)" stroke-width=".8"/></g>`}
  else{const nf=Math.max(2,Math.min(8,Math.round(bw/22)));for(let i=0;i<nf;i++){const cx=bx+bw*(i+.5)/nf,cy=by-8;o+=`<circle cx="${cx}" cy="${cy}" r="6" fill="var(--surface)" stroke="var(--muted)" stroke-width="1"/><path d="M${cx-4} ${cy} L${cx+4} ${cy} M${cx} ${cy-4} L${cx} ${cy+4}" stroke="var(--muted)" stroke-width="1"/>`}}
  o+=`<text x="${x0+hw/2}" y="${gy+15}" text-anchor="middle" class="ax halo" style="font-weight:700">${sm?(k==='ai'?'AI campus':'Colo'):S.n}</text><text x="${x0+hw/2}" y="${gy+29}" text-anchor="middle" class="halo">${sm?S.sub.split(' · ')[0]:S.sub}</text>`;
  return o;
}
function vs1(){
  const G=val('vs1-g'),s=val('vs1-s')/100;out('vs1-g',G.toFixed(1)+' L/kWh');out('vs1-s',(s*100).toFixed(0)+'%');
  const mw=v1n==='mw';const a=calc1('co',v1c,G,s),b=calc1('ai',v1c,G,s);
  const dv=(m,x)=>mw?x/m.mw:x;
  const A={fac:dv(a,a.fac),on:dv(a,a.on),gr:dv(a,a.gr),co2:dv(a,a.co2)},B={fac:dv(b,b.fac),on:dv(b,b.on),gr:dv(b,b.gr),co2:dv(b,b.co2)};
  const el=$('#vs1');const W=cw(el),H=W<520?250:270,hw=W/2;
  const mx={e:Math.max(A.fac,B.fac),w:Math.max(A.on,A.gr,B.on,B.gr,1e-9)};
  let o=`<line x1="0" x2="${W}" y1="${H-34}" y2="${H-34}" stroke="var(--line)"/><line x1="${hw}" x2="${hw}" y1="10" y2="${H-40}" stroke="var(--line)" stroke-dasharray="3 4"/>`;
  o+=drawSite(0,hw,H,'co',A,mx,s,v1c)+drawSite(hw,hw,H,'ai',B,mx,s,v1c);
  o+=`<text x="${W-6}" y="14" text-anchor="end" class="halo">Building area ∝ energy · cloud area ∝ water</text>`;
  el.innerHTML=`<div class="wpsvg">${svg(W,H,o)}</div>`;
  // metric rows
  const U=mw?{e:'MWh per MW',w:'ML per MW',c:'kt per MW'}:{e:'GWh/yr',w:'ML/yr',c:'kt CO₂/yr'};
  const ef=x=>mw?f0(x*1000):f1(x),wf=x=>mw?f2(x):f0(x),cf=x=>mw?f2(x):f0(x);
  const rows=[['Facility energy',A.fac,B.fac,U.e,ef,'--spark'],['On-site water',A.on,B.on,U.w,wf,'--cold'],['Water at power plants',A.gr,B.gr,U.w,wf,'--muted'],['Total water',A.on+A.gr,B.on+B.gr,U.w,wf,'tot'],['CO₂',A.co2,B.co2,U.c,cf,'--heat']];
  const wmax=Math.max(A.on+A.gr,B.on+B.gr,1e-9);
  let h=`<div class="vs-rows"><div class="vs-rh"></div><div class="vs-rh" style="color:var(--cold)">Conventional colo</div><div class="vs-rh" style="color:var(--hot)">AI campus</div><div class="vs-rh n">AI ÷ colo</div>`;
  rows.forEach(([n,x,y,u,ff,c])=>{const m=c==='tot'?wmax:(c==='--cold'||c==='--muted')?wmax:Math.max(x,y,1e-9);
    const bar=(v,who)=>{if(c==='tot'){const on=who==='a'?A.on:B.on,gr=who==='a'?A.gr:B.gr;return `<div class="vs-tr"><i style="width:${on/m*100}%;background:var(--cold)"></i><i style="width:${gr/m*100}%;background:var(--muted)"></i></div>`}return `<div class="vs-tr"><i style="width:${v/m*100}%;background:var(${c})"></i></div>`};
    const r=x>0?y/x:0;
    h+=`<div class="vs-rl">${n}<small>${u}</small></div><div>${bar(x,'a')}<span class="mono">${ff(x)}</span></div><div>${bar(y,'b')}<span class="mono">${ff(y)}</span></div><div class="n mono vs-x">${x>0?'×'+r.toFixed(1):'—'}</div>`});
  h+=`</div>`;$('#vs1-r').innerHTML=h;
  const shA=A.gr/(A.on+A.gr||1)*100,shB=B.gr/(B.on+B.gr||1)*100;
  $('#vs1-note').innerHTML=mw?`Per megawatt of IT the two buildings are close: the AI campus runs fuller (75% vs 60%) but at a lower PUE, so energy per MW comes out within ${Math.abs((B.fac/A.fac-1)*100).toFixed(0)}%. Its scale, not its efficiency, makes it big.`
    :`The AI campus uses ${(B.fac/A.fac).toFixed(1)}× the energy and ${((B.on+B.gr)/(A.on+A.gr)).toFixed(1)}× the water of the colo. Power-plant water is ${shA.toFixed(0)}% of the colo's total and ${shB.toFixed(0)}% of the campus's${s>0?`, even with ${(s*100).toFixed(0)}% clean power`:''}. ${v1c==='wet'?'Switch to dry cooling: on-site water almost vanishes, but energy and CO₂ rise.':'Dry cooling cut on-site water by 93–95% but added 8–10% to energy and CO₂.'}`;
}
seg('vs1-n',d=>{v1n=d.v;vs1()});seg('vs1-c',d=>{v1c=d.v;vs1()});['vs1-g','vs1-s'].forEach(id=>$('#'+id).addEventListener('input',vs1));

/* ===== 2 archetypes ===== */
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const PROF={
 ent:t=>.2+.03*Math.sin(t/6)+.02*(rnd()-.5),
 colo:t=>.6+.05*Math.sin((t/144)*2*Math.PI*2-1.4)+.015*(rnd()-.5),
 hyp:t=>.5+.17*Math.sin((t/144)*2*Math.PI*2-1.6)+.02*(rnd()-.5),
 trn:t=>(t%18===0?.2:.72+.03*(rnd()-.5)),
 inf:t=>Math.min(.97,.36+.3*(.5+.5*Math.sin((t/144)*2*Math.PI*2-1.6))+(rnd()<.06?.25*rnd():0)+.04*(rnd()-.5))};
const ARCH=[['Enterprise / on-prem','ent','3–10 kW','<1–5 MW','Servers ~11% busy (2014) → ~20% (2027)','CRAC units, air-cooled chillers','--muted'],
 ['Colocation','colo','5–15 kW, rising to 10–30','5–50 MW per building','Servers 21% → 35% busy; halls 50–70% of contracted IT','Chilled water + towers or air-cooled chillers','--cold'],
 ['Hyperscale cloud','hyp','10–30 kW','50–300 MW campuses','Servers 45–50% busy; smooth daily cycle','Air economiser + adiabatic; liquid growing','--cold'],
 ['AI training','trn','40 kW (H100, air) to 120–142 kW (GB200/GB300, liquid)','100 MW to over 1 GW','80% of hours at ~70% of rated power; synchronised swings','Direct-to-chip liquid + dry coolers, chillers or towers','--hot'],
 ['AI inference','inf','20–130 kW','10–300 MW, near users','~40% of hours at half of training power; follows demand','Mixed air and liquid','--hot']];
function vs2(){
  $('#vs2').innerHTML=ARCH.map(([n,k,rk,sz,ut,co,c])=>{seed=11;const pts=[];for(let t=0;t<288;t++)pts.push(PROF[k](t));
    const W=220,H=46,p=pts.map((v,i)=>`${(i/287*W).toFixed(1)},${(H-2-v*(H-4)).toFixed(1)}`).join(' ');
    return `<div class="vs-ac" style="border-top-color:var(${c})"><b>${n}</b><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="vs-spark" aria-hidden="true"><line x1="0" x2="${W}" y1="${H-2-(H-4)}" y2="${H-2-(H-4)}" stroke="var(--line)" stroke-dasharray="2 3"/><polyline points="${p}" fill="none" stroke="var(${c})" stroke-width="1.4"/></svg><dl><dt>Rack</dt><dd>${rk}</dd><dt>Size</dt><dd>${sz}</dd><dt>Load</dt><dd>${ut}</dd><dt>Cooling</dt><dd>${co}</dd></dl></div>`}).join('');
}

/* ===== 3 rack density ===== */
const RACK=[['Enterprise / on-prem',3,10,'e','c','Typical range (series, LBNL)'],['Colocation',5,15,'e','c','Typical colo range; Uptime sees racks moving into 10–30 kW'],['Hyperscale cloud',10,30,'r','c','Uptime 2025: typical racks 10–30 kW, few above 30 kW'],
 ['H100, air-cooled',40,40,'e','a','Series estimate for air-cooled H100 racks'],['GB200 NVL72',120,132,'r','a','NVIDIA reference ~120 kW; HPE 132 kW (115 liquid + 17 air)'],['Fairwater (Microsoft)',140,140,'d','a','Built for ~140 kW per rack, 1,360 kW per row'],['GB300 NVL72',142,142,'r','a','Up to 142 kW'],
 ['Vera Rubin NVL72',190,230,'e','a','Hashrate Index estimate; NVIDIA has not disclosed'],['Kyber rack (2027)',600,600,'d','a','Jensen Huang, GTC 2025 roadmap']];
function vs3(){
  const el=$('#vs3'),W=cw(el),lw=W<480?132:176,R=W<480?52:62,rh=W<480?24:26,T=8,H=T+RACK.length*rh+40;
  const X=v=>lw+(Math.log10(v))/3*(W-lw-R);
  let o=hatch('vsh3');
  (W<520?[1,10,100,1000]:[1,3,10,30,100,300,1000]).forEach(t=>{o+=`<line x1="${X(t)}" x2="${X(t)}" y1="${T}" y2="${H-32}" stroke="var(--line)" stroke-width=".6"/><text x="${X(t)}" y="${H-19}" text-anchor="middle">${t}</text>`});
  o+=`<text x="${W-R}" y="${H-4}" text-anchor="end" class="halo">kW per rack, log scale</text>`;
  RACK.forEach(([n,lo,hi,ev,g,src],i)=>{const y=T+i*rh,c=g==='a'?'--hot':'--cold',x0=X(lo),x1=Math.max(X(hi),x0+7);
    const fill=ev==='d'?`url(#vsh3)`:`var(${c})`;
    o+=`<text x="${lw-8}" y="${y+rh/2+4}" text-anchor="end" style="fill:var(--ink)">${n}</text><g style="color:var(${c})"><rect x="${x0}" y="${y+5}" width="${x1-x0}" height="${rh-10}" rx="3" fill="${fill}" fill-opacity="${ev==='e'?.38:.9}" stroke="var(${c})" stroke-width="${ev==='r'?0:1.2}"><title>${n}: ${lo===hi?lo:lo+'–'+hi} kW · ${EVL[ev]} · ${src}</title></rect></g><text x="${x1+6}" y="${y+rh/2+4}" class="mono" style="fill:var(--ink)">${lo===hi?lo:lo+'–'+hi}</text>`});
  el.innerHTML=svg(W,H,o);
}
function vs4(){
  const a=+$('#vs4-a').value,c=val('vs4-c');out('vs4-c',c+' kW');const n=Math.round(a/c);
  const ic=(cls)=>`<i class="${cls}"></i>`;
  $('#vs4').innerHTML=`<div class="vs-rk1"><i class="ai" style="height:${Math.min(120,40+a/6)}px"></i><span class="mono">${a} kW</span></div><div class="vs-eq">=</div><div><div class="vs-rkn">${Array.from({length:n},()=>ic('co')).join('')}</div><p class="small" style="margin:6px 0 0"><b class="mono">${n}</b> conventional racks at ${c} kW each. ${a>=120?`One liquid-cooled AI rack also needs a coolant distribution unit and warm-water loop; ${n} air-cooled racks would fill most of a small hall.`:'Air-cooled AI racks at 40 kW already push the limit of moving air.'}</p></div>`;
}
$('#vs4-a').addEventListener('change',vs4);$('#vs4-c').addEventListener('input',vs4);

/* ===== 4 PUE ladder ===== */
const PUEL=[['Global surveys',[['Uptime average 2023',1.58,'r','Uptime Institute Global Survey 2023'],['Uptime average 2024',1.56,'r','Uptime 2024'],['Uptime average 2025',1.54,'r','Uptime 2025: sixth year of near-stagnation'],['Built in last 5 years',1.48,'r','Uptime 2025'],['Sites over 20 MW',1.44,'r','Uptime 2025'],['US fleet 2023 (LBNL)',1.40,'e','LBNL 2024 model; 1.15–1.35 projected for 2028'],['On-prem enterprise (IDC)',1.63,'e','IDC estimate cited by AWS']]],
 ['Hyperscalers',[['Meta',1.08,'r','Meta sustainability data'],['Google fleet 2025',1.09,'r','Google data-centre efficiency page'],['AWS 2025',1.14,'r','AWS sustainability; 1.15 in 2024']]],
 ['Indian operators',[['Sify FY2024-25',1.7554,'r','Sify Infinit Spaces sustainability report 2024-25'],['CtrlS',1.35,'u','Company claim, not audited'],['Yotta NM1 / D1',1.40,'d','Design value'],['STT GDC India new builds',1.50,'d','Design target: below 1.5'],['Yotta GIFT City',1.60,'d','Design value ~1.6'],['"Good" in India (industry)',1.55,'e','Industry executives: ~1.5 (ET) to 1.5–1.6 (The Secretariat)']]]];
let p5=null;
function vs5(){
  const el=$('#vs5'),W=cw(el),nar=W<520,L=nar?Math.ceil(Math.max(...PUEL.map(q=>TW(q[0],11,600))))+14:130,R=10,x0=1.0,x1=1.8,X=v=>L+(v-x0)/(x1-x0)*(W-L-R);
  const lanes=PUEL.map(([n,pts])=>{const s=pts.map((p,i)=>({p,i})).sort((a,b)=>a.p[1]-b.p[1]);const ends=[];s.forEach(o=>{const tw=TW(o.p[0])+10,x=X(o.p[1]);o.tx=Math.max(L+tw/2-4,Math.min(W-R-tw/2+4,x));let lv=0;while(ends[lv]!==undefined&&ends[lv]>o.tx-tw/2)lv++;ends[lv]=o.tx+tw/2;o.lv=lv});return {n,s,lv:ends.length}});
  let y=34,o='';const T=34;
  // overhead bands
  [[1.0,1.15,nar?'≤13%':'≤13% overhead'],[1.15,1.35,'13–26%'],[1.35,1.55,'26–35%'],[1.55,1.8,'35–44%']].forEach(([a,b,t],i)=>{o+=`<rect x="${X(a)}" y="${T-4}" width="${X(b)-X(a)}" height="100%" fill="var(--sunk)" opacity="${i%2?.0:.55}"/><text x="${(X(a)+X(b))/2}" y="${T-12}" text-anchor="middle">${t}</text>`});
  let body='';
  lanes.forEach(ln=>{const lh=26+ln.lv*15;const cy=y+lh-12;
    body+=`<line x1="${L}" x2="${W-R}" y1="${cy}" y2="${cy}" stroke="var(--line)"/><text x="${L-8}" y="${cy+4}" text-anchor="end" style="fill:var(--ink);font-weight:600">${ln.n}</text>`;
    ln.s.forEach(({p,lv,tx})=>{const x=X(p[1]),c=ln.n==='Hyperscalers'?'--good':ln.n==='Indian operators'?'--hot':'--cold';const on=p5&&p5[0]===p[0];
      body+=`<line x1="${x}" x2="${x}" y1="${cy}" y2="${cy-10-lv*15}" stroke="var(--line)"/><path d="M${x} ${cy-10-lv*15}L${tx} ${cy-10-lv*15}" stroke="var(--line)"/><text x="${tx}" y="${cy-13-lv*15}" text-anchor="middle" class="halo" style="${on?'fill:var(--ink);font-weight:700':''}">${p[0]}</text>`;
      body+=`<circle class="tb" data-k="${esc(p[0])}" cx="${x}" cy="${cy}" r="${on?7:5.5}" fill="${p[2]==='r'||p[2]==='u'?`var(${c})`:'var(--surface)'}" stroke="var(${c})" stroke-width="2" ${p[2]==='d'?'stroke-dasharray="2.5 2"':''} tabindex="0" role="button" aria-label="${esc(p[0])} ${p[1]}"><title>${p[0]}: ${p[1]}</title></circle>`});
    y+=lh+8});
  const H=y+30;
  [[1.35,W<520?'IndiaAI 1.35':'IndiaAI tender cap 1.35','--bad',1],[1.20,W<520?'Karnataka ≤1.20':'Karnataka ₹20 cr bonus ≤1.20','--good',0]].forEach(([v,t,c,r])=>{body+=`<line x1="${X(v)}" x2="${X(v)}" y1="${T}" y2="${H-24}" stroke="var(${c})" stroke-width="1.6" stroke-dasharray="5 3"/><text x="${X(v)+(r?4:-4)}" y="${H-28}" text-anchor="${r?'start':'end'}" style="fill:var(${c});font-weight:600" class="halo">${t}</text>`});
  for(let t=1.0;t<=1.801;t+=0.1)body+=`<text x="${X(t)}" y="${H-8}" text-anchor="middle">${t.toFixed(1)}</text>`;
  el.innerHTML=svg(W,H,o.replace(/height="100%"/g,`height="${H-T-20}"`)+body);
  const d=p5||PUEL[0][1][2];const ov=(d[1]-1)/d[1]*100;
  $('#vs5-d').innerHTML=`<b>${d[0]}</b> · PUE <b class="mono">${d[1]}</b> · ${ov.toFixed(0)}% of electricity is overhead ${evs(d[2],d[3])}<br><span class="muted">${d[3]}</span>`;
}
$('#vs5').addEventListener('click',e=>{const c=e.target.closest('[data-k]');if(!c)return;for(const [,pts] of PUEL)for(const p of pts)if(p[0]===c.dataset.k)p5=p;vs5()});
$('#vs5').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('[data-k]');if(c){e.preventDefault();c.dispatchEvent(new MouseEvent('click',{bubbles:true}))}}});

/* ===== 5 per prompt ===== */
const SC={site:['On-site cooling','--cold'],idle:['Idle capacity + overhead','--warn'],grid:['Power-plant water','--muted'],hw:['Hardware manufacturing','--heat'],chip:['Chip only','--hot']};
const QE=[['Gemini median prompt, chip-only',.10,.10,'r',['chip'],'Google, Aug 2025'],['Gemini median prompt, full stack',.24,.24,'r',['chip','idle'],'Google, Aug 2025'],['GPT-4o typical query',.3,.3,'e',['chip'],'Epoch AI, Feb 2025'],['Google web search (old estimate)',.3,.3,'e',['chip','idle'],'EPRI'],['ChatGPT average query',.34,.34,'u',[],'Sam Altman, June 2025; scope undisclosed'],['GPT-4o, 10k-token input',2.5,2.5,'e',['chip'],'Epoch AI'],['Older ChatGPT estimate',2.9,2.9,'e',['chip','idle'],'EPRI, A100-era; now considered high'],['GPT-4o, 100k-token input',40,40,'e',['chip'],'Epoch AI']];
const QW=[['Gemini prompt, chip-only',.12,.12,'r',['site'],'Google, Aug 2025'],['Gemini prompt, full stack',.26,.26,'r',['site','idle'],'Google: "about five drops"'],['ChatGPT average query',.32,.32,'u',[],'Altman: ~0.000085 gallons; scope undisclosed'],['Gemini prompt + Indian grid water',0.96,0.96,'m',['site','idle','grid'],'0.26 mL + 0.24 Wh × 2.9 L/kWh at the meter'],['GPT-3 response (Li et al.)',10,50,'e',['site','grid'],'"500 mL per 10–50 responses", UC Riverside'],['Mistral Large 2, 400 tokens',45,45,'r',['site','grid','hw'],'Life-cycle assessment, ADEME / Carbone 4 method']];
let m6='e';
function vs6(){
  const D=m6==='e'?QE:QW,lo=.05,hi=100,P=v=>Math.log10(v/lo)/Math.log10(hi/lo)*100;
  $('#vs6').innerHTML=D.map(([n,a,b,ev,sc,src])=>{const eq=m6==='e'?`${a*360>=60?(a*360/60).toFixed(a*360>=600?0:1)+' min':(a*360).toFixed(0)+' s'} of a 10 W LED`:`${a/.05>=1?f0(a/.05)+(b>a?'–'+f0(b/.05):''):'<1'} drops`;
    const drops=m6==='w'?`<span class="vs-drops">${Array.from({length:Math.min(20,Math.round(a/.05))},()=>'<i></i>').join('')}${a/.05>20?`<em>+${f0(b/.05-20)}</em>`:''}</span>`:'';
    return `<div class="vs-qr"><div class="vs-ql">${n} ${evs(ev,src)}</div><div class="vs-qb"><i style="left:${b>a?P(a):0}%;width:${b>a?Math.max(1.2,P(b)-P(a)):Math.max(1.2,P(a))}%;background:var(${m6==='e'?'--spark':'--cold'})${ev==='e'||ev==='m'?';opacity:.55':''}"></i></div><div class="vs-qv mono">${b>a?a+'–'+b:a} ${m6==='e'?'Wh':'mL'}</div><div class="vs-qe">${eq}${drops}</div><div class="vs-qs">${sc.length?sc.map(k=>`<span class="vs-sc" style="--c:var(${SC[k][1]})" title="${SC[k][0]}"></span>`).join(''):'<span class="xs muted">scope ?</span>'}</div></div>`}).join('')+
   `<div class="vs-qr vs-qax"><div></div><div class="vs-qb ax">${[.1,1,10,100].map(t=>`<span style="left:${P(t)}%">${t}</span>`).join('')}</div><div></div><div></div><div></div></div>`;
  $('#vs6-k').innerHTML='<b class="xs">What each figure includes:</b> '+Object.values(SC).filter(([n])=>m6==='e'?!/water|manufact|cooling/i.test(n):n!=='Chip only').map(([n,c])=>`<span class="vs-key"><span class="vs-sc" style="--c:var(${c})"></span>${n}</span>`).join('')+(m6==='w'?' <span class="xs muted">· 1 drop ≈ 0.05 mL</span>':' <span class="xs muted">· log scale</span>');
}
seg('vs6-m',d=>{m6=d.v;vs6()});

/* ===== 6 energy split + Gemini ===== */
function vs7(){
  const R=[['Survey average (Uptime 2025)',1.54],['India "good" (industry)',1.55],['IndiaAI tender cap',1.35],['Sites over 20 MW',1.44],['Hyperscale (Google)',1.09],['Sify FY25 (reported)',1.7554]].sort((a,b)=>a[1]-b[1]);
  $('#vs7').innerHTML=R.map(([n,p])=>{const it=100/p;return `<div class="vs-sb"><span>${n}<small class="mono"> PUE ${p}</small></span><div class="vs-tr"><i style="width:${it}%;background:var(--cold)"></i><i style="width:${100-it}%;background:var(--line)"></i></div><span class="mono">${it.toFixed(0)} / ${(100-it).toFixed(0)}</span></div>`}).join('')+`<div class="xs muted">Numbers: units reaching IT / units of overhead, per 100 in.</div>`;
}
function vs8(){
  const el=$('#vs8'),W=cw(el),L=W<480?78:120,R=60,X=v=>L+v/.26*(W-L-R),stk=TW('Accelerators 58%')+TW('Host, idle, building 42%')+24>X(.24)-X(0),dy=stk?14:0,H=118+dy;
  let o=`<text x="${L-8}" y="38" text-anchor="end" style="fill:var(--ink)">Full stack</text><rect x="${X(0)}" y="24" width="${X(.139)-X(0)}" height="22" fill="var(--hot)"/><rect x="${X(.139)}" y="24" width="${X(.24)-X(.139)}" height="22" fill="var(--warn)" opacity=".55"/><text x="${X(.24)+6}" y="39" class="mono" style="fill:var(--ink)">0.24 Wh</text>`;
  o+=stk?`<text x="${X(0)}" y="62">Accelerators 58%</text><text x="${X(.24)}" y="76" text-anchor="end">Host, idle, building 42%</text>`:`<text x="${(X(0)+X(.139))/2}" y="62" text-anchor="middle">Accelerators 58%</text><text x="${(X(.139)+X(.24))/2}" y="62" text-anchor="middle">Host, idle, building 42%</text>`;
  o+=`<text x="${L-8}" y="${92+dy}" text-anchor="end" style="fill:var(--ink)">Chip only</text><rect x="${X(0)}" y="${78+dy}" width="${X(.10)-X(0)}" height="22" fill="var(--hot)" opacity=".6"/><text x="${X(.10)+6}" y="${93+dy}" class="mono" style="fill:var(--ink)">0.10 Wh</text>`;
  el.innerHTML=svg(W,H,o);
}

/* ===== 7 going dry ===== */
let s9='ai';
function vs9(){
  const ww=val('vs9-w'),dp=val('vs9-p'),G=val('vs9-g'),r=val('vs9-r')/100;out('vs9-w',ww.toFixed(2)+' L/kWh');out('vs9-p','+'+dp.toFixed(2));out('vs9-g',G.toFixed(1)+' L/kWh');out('vs9-r',(r*100).toFixed(0)+'%');
  const S=s9==='ai'?{mw:100,lf:STD.ref.uAI}:{mw:20,lf:STD.ref.uConv};const it=S.mw*S.lf*8.76;
  const saved=it*(ww-.05),ex=it*dp,grid=ex*(1-r)*G,net=grid-saved,co2=ex*STD.co2*(1-r),be=(ww-.05)/dp;
  const el=$('#vs9'),W=cw(el),H=250,L=56,R=16,T=22,B=44;const raw=Math.max(saved,grid,1)*1.1,stp=[50,100,200,250,500,1000].find(x=>raw/x<=4)||1000,mx=Math.ceil(raw/stp)*stp;const Y=v=>T+(1-(v+mx)/(2*mx))*(H-T-B);
  const bars=[['On-site water saved',-saved,'--good'],['Extra water at power plants',grid,'--muted'],['Net change',net,net<0?'--cold':'--bad']];
  const bw=Math.min(110,(W-L-R)/3*.55);let o=`<line x1="${L}" x2="${W-R}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--ink)" stroke-width="1"/>`;
  [-mx,-mx/2,0,mx/2,mx].forEach(t=>{o+=`<text x="${L-6}" y="${Y(t)+4}" text-anchor="end">${t>0?'+':''}${f0(t)}</text><line x1="${L}" x2="${W-R}" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--line)" stroke-width=".5"/>`});
  o+=`<text transform="translate(12 ${(H-B+T)/2}) rotate(-90)" text-anchor="middle" class="ax">ML of water per year</text>`;
  let run=0;bars.forEach(([n,v,c],i)=>{const cx=L+(W-L-R)*(i+.5)/3,x=cx-bw/2;let y0,y1;if(i<2){y0=Y(run);run+=v;y1=Y(run)}else{y0=Y(0);y1=Y(v)}
    o+=`<rect x="${x}" y="${Math.min(y0,y1)}" width="${bw}" height="${Math.max(1.5,Math.abs(y1-y0))}" rx="3" fill="var(${c})" opacity="${i===1?.7:.9}"/>`;
    if(i<2)o+=`<line x1="${x+bw}" x2="${x+bw+((W-L-R)/3-bw)}" y1="${y1}" y2="${y1}" stroke="var(--muted)" stroke-dasharray="3 3"/>`;
    const vl=`${v>0?'+':'−'}${f0(Math.abs(v))} ML`,ly=v<0?Math.max(y0,y1)-8:Math.min(y0,y1)-6,inn=v<0&&Math.abs(y1-y0)>22&&TW(vl,11,700)+8<bw;o+=`<text x="${cx}" y="${inn?ly:(v<0?Math.max(y0,y1)+14:ly)}" text-anchor="middle" class="mono ${inn?'':'halo'}" style="fill:${inn?'#fff':'var(--ink)'};font-weight:700">${v>0?'+':'−'}${f0(Math.abs(v))} ML</text>${(()=>{const colw=(W-L-R)/3-6;if(W<480)n=n.replace('Extra water at power plants','Extra plant water').replace('On-site water saved','On-site saved');if(TW(n)<=colw)return `<text x="${cx}" y="${H-B+22}" text-anchor="middle" style="fill:var(--ink)">${n}</text>`;const w=n.split(' '),h=Math.ceil(w.length/2);return `<text x="${cx}" y="${H-B+18}" text-anchor="middle" style="fill:var(--ink)"><tspan x="${cx}">${w.slice(0,h).join(' ')}</tspan><tspan x="${cx}" dy="13">${w.slice(h).join(' ')}</tspan></text>`})()}`});
  el.innerHTML=svg(W,H,o);
  $('#vs9-r2').innerHTML=`<div><span class="v" style="color:var(${net<0?'--cold':'--bad'})">${net<0?'−':'+'}${f0(Math.abs(net))} ML</span><span class="k">Net water per year (${net<0?'saved':'added'}): ${(Math.abs(net)/365).toFixed(2)} MLD</span></div><div><span class="v hot">+${f1(ex)} GWh</span><span class="k">Extra electricity per year</span></div><div><span class="v" style="color:var(--heat)">+${f1(co2)} kt</span><span class="k">Extra CO₂ per year</span></div><div><span class="v">${f1(be)} L/kWh</span><span class="k">Break-even grid water: going dry saves water below this</span></div>`;
  $('#vs9-n').innerHTML=be>G?`Going dry wins on water: India's grid would need ${f1(be)} L/kWh, ${(be/G).toFixed(1)}× today's ${G.toFixed(1)}, before the extra electricity cost more water than the towers save. The price is carbon: +${f1(co2)} kt a year${r>0?'':', which clean power would remove'}.`:`Here the extra electricity costs more water than the towers would have evaporated: the grid (${G.toFixed(1)} L/kWh) is above the ${f1(be)} L/kWh break-even.`;
}
seg('vs9-s',d=>{s9=d.v;vs9()});['vs9-w','vs9-p','vs9-g','vs9-r'].forEach(id=>$('#'+id).addEventListener('input',vs9));

/* ===== 8 WUE spectrum ===== */
const BANDS=[['Air-cooled chillers / DX',0,.05,'--hot','LBNL: "use no water, they use more energy"'],['Liquid to chip + dry coolers',0,.05,'--hot','Closed loop, one-time fill; near zero in operation'],['Immersion + dry coolers',0,.05,'--hot','Near zero'],['Air economiser + adiabatic (hyperscale)',.1,.3,'--good','Hyperscalers report 0.1–0.3 fleet-wide'],['Dry coolers + adiabatic assist',.2,.8,'--good','Chapter 8 range for Indian climates'],['Liquid to chip + cooling towers',1.0,2.0,'--cold','LBNL base case for liquid AI; chapter 8 waterside-economiser range'],['Chillers + cooling towers',1.4,2.5,'--cold','Highest; up to ~2.5 L/kWh cited for evaporative']];
const OPS=[['AWS 2025',.12,'w','r','Global WUE, withdrawal basis; 0.06 in N. Virginia'],['AWS 2024',.15,'w','r','Global WUE, withdrawal'],['Meta (2023 data)',.18,'w','r','Withdrawal ÷ IT electricity'],['Microsoft FY2024',.30,'w','r','Withdrawal; 0.49 in 2021'],['US average 2023 (LBNL)',.36,'c','e','Consumption basis; 0.45–0.48 projected for 2028'],['STT GDC India FY25',.58,'u','r','Portfolio WUE, DNV limited assurance; 1.34 in FY21'],['Equinix global 2025',.91,'u','r','Equinix 2025 sustainability report (verify against original)'],['Equinix evaporative sites',1.41,'u','r','Equinix 2025 (verify against original)']];
let p10=null;
function vs10(){
  const el=$('#vs10'),W=cw(el),nar=W<560,L=nar?14:230,R=16,rh=nar?34:24,T=8,X=v=>L+v/2.6*(W-L-R);
  let o='';const Hb=T+BANDS.length*rh;
  BANDS.forEach(([n,a,b,c,src],i)=>{const y=T+i*rh;o+=(nar?`<text x="${L}" y="${y+11}" style="fill:var(--ink)">${n}</text>`:`<text x="${L-8}" y="${y+rh/2+4}" text-anchor="end" style="fill:var(--ink)">${n}</text>`)+`<rect x="${X(a)}" y="${nar?y+15:y+5}" width="${Math.max(6,X(b)-X(a))}" height="${nar?14:rh-10}" rx="3" fill="var(${c})" fill-opacity=".35" stroke="var(${c})"><title>${n}: ${a}–${b} L/kWh · ${src}</title></rect>`});
  // operator lane with staggered labels
  const s=OPS.map(p=>p).sort((a,b)=>a[1]-b[1]);const ends=[];const txs=[];const lv=s.map((p,i)=>{const tw=TW(p[0])+8,x=X(p[1]);const tx=Math.max(tw/2+2,Math.min(W-R-tw/2+8,x));txs[i]=tx;let l=0;while(ends[l]!==undefined&&ends[l]>tx-tw/2)l++;ends[l]=tx+tw/2;return l});
  const ly=Hb+18+(nar?16:0)+ends.length*14,H=ly+60;
  o+=nar?`<text x="${L}" y="${Hb+14}" style="fill:var(--ink);font-weight:600">Operators report</text>`:`<text x="${L-8}" y="${ly+4}" text-anchor="end" style="fill:var(--ink);font-weight:600">Operators report</text><line x1="${L}" x2="${W-R}" y1="${ly}" y2="${ly}" stroke="var(--line)"/>`;
  s.forEach((p,i)=>{const x=X(p[1]),on=p10&&p10[0]===p[0];o+=`<line x1="${x}" x2="${x}" y1="${ly}" y2="${ly-8-lv[i]*14}" stroke="var(--line)"/><path d="M${x} ${ly-8-lv[i]*14}L${txs[i]} ${ly-8-lv[i]*14}" stroke="var(--line)"/><text x="${txs[i]}" y="${ly-11-lv[i]*14}" text-anchor="middle" class="halo" style="${on?'fill:var(--ink);font-weight:700':''}">${p[0]}</text>`;
    const sh=p[2]==='u'?`<rect class="tb" data-k="${esc(p[0])}" x="${x-5}" y="${ly-5}" width="10" height="10" transform="rotate(45 ${x} ${ly})" fill="var(--ink)" tabindex="0"/>`:`<circle class="tb" data-k="${esc(p[0])}" cx="${x}" cy="${ly}" r="${on?7:5.5}" fill="${p[2]==='w'?'var(--ink)':'var(--surface)'}" stroke="var(--ink)" stroke-width="2" tabindex="0"/>`;o+=sh});
  for(let t=0;t<=2.5;t+=.5)o+=`<line x1="${X(t)}" x2="${X(t)}" y1="${T}" y2="${H-32}" stroke="var(--line)" stroke-width=".5"/><text x="${X(t)}" y="${H-20}" text-anchor="middle">${t}</text>`;
  o+=`<text x="${W-R}" y="${H-3}" text-anchor="end" class="halo">L per kWh of IT</text>`;
  el.innerHTML=svg(W,H,o);
  const d=p10||OPS[5];$('#vs10-d').innerHTML=`<b>${d[0]}</b> · WUE <b class="mono">${d[1]}</b> L/kWh · ${d[2]==='w'?'withdrawal basis':d[2]==='c'?'consumption basis':'basis not stated'} ${evs(d[3],d[4])} <span class="muted">${d[4]}</span> <span class="xs muted">● withdrawal · ○ consumption · ◆ not stated</span>`;
}
$('#vs10').addEventListener('click',e=>{const c=e.target.closest('[data-k]');if(!c)return;p10=OPS.find(p=>p[0]===c.dataset.k);vs10()});

/* ===== 9 iceberg ===== */
const ICE={meta:{u:'ML',a:2974,b:72207,c:null,n:'Meta 2024: data centres consumed 2,974 ML directly, while generating the electricity they bought evaporated about 72,207 ML, roughly 24× more. Chip-making water is not disclosed.',ev:['r','Meta 2025 Environmental Data Index']},
 glob:{u:'billion L',a:140,b:373,c:47,n:'All data centres worldwide use ~560 billion litres a year: ~140 on site, ~373 at power plants, ~47 in hardware manufacturing (De Vries-Gao, Patterns 2025). The IEA expects ~1,200 billion litres by 2030.',ev:['e','IEA Energy and AI 2025; De Vries-Gao 2025']},
 ai:{u:'ML',a:657,b:2050,c:null,n:'The 100 MW AI campus on cooling towers: 657 ML a year on site against 2,050 ML evaporated at Indian power plants. Its chips\' water is unknown.',ev:['m','Report 13 section 5.2, wet case']}};
let m11='meta';
function vs11(){
  const d=ICE[m11],el=$('#vs11'),W=cw(el),H=310,nar=W<520,cx=nar?W*.27:W*.36,wl=70,sc=Math.min((H-wl-16)/(d.b+(d.c||d.b*.08)),(wl-12)/d.a);
  const ha=Math.max(4,d.a*sc),hb=d.b*sc,hc=(d.c||d.b*.08)*sc;const wmax=nar?Math.min(W*.2,150):Math.min(W*.3,150);
  let o=`<rect x="0" y="${wl}" width="${W}" height="${H-wl}" fill="var(--cold-soft)" opacity=".5"/><line x1="0" x2="${W}" y1="${wl}" y2="${wl}" stroke="var(--cold-2)" stroke-width="1.5"/>`;
  const tw=Math.max(14,wmax*Math.min(1,Math.sqrt(d.a/d.b))*1.4);
  o+=`<path d="M${cx-tw/2} ${wl} L${cx-tw*.15} ${wl-ha} L${cx+tw*.1} ${wl-ha*.8} L${cx+tw/2} ${wl} Z" fill="var(--surface)" stroke="var(--cold)" stroke-width="1.6"/>`;
  o+=`<path d="M${cx-tw/2} ${wl} L${cx-wmax*.55} ${wl+hb*.08} L${cx-wmax*.82} ${wl+hb*.22} L${cx-wmax*.97} ${wl+hb*.42} L${cx-wmax*.86} ${wl+hb*.6} L${cx-wmax*.7} ${wl+hb*.84} L${cx-wmax*.3} ${wl+hb} L${cx+wmax*.4} ${wl+hb} L${cx+wmax*.72} ${wl+hb*.78} L${cx+wmax} ${wl+hb*.52} L${cx+wmax*.9} ${wl+hb*.3} L${cx+wmax*.6} ${wl+hb*.12} L${cx+tw/2} ${wl} Z" fill="var(--muted)" fill-opacity=".35" stroke="var(--muted)" stroke-width="1.2"/>`;
  o+=`<path d="M${cx-wmax*.3} ${wl+hb} L${cx-wmax*.15} ${wl+hb+hc} L${cx+wmax*.25} ${wl+hb+hc} L${cx+wmax*.4} ${wl+hb} Z" fill="${d.c?'var(--heat)':'none'}" fill-opacity=".35" stroke="var(--heat)" stroke-dasharray="4 3"/>`;
  const lx=cx+wmax+(nar?10:16),sum=d.a+d.b+(d.c||0);
  const lab=(y,t,v,c)=>`<text x="${lx}" y="${y}" style="fill:var(${c});font-weight:700" class="halo">${t}</text><text x="${lx}" y="${y+14}" class="mono halo" style="fill:var(--ink)">${v}</text>`;
  o+=lab(Math.max(14,wl-ha-24),'On site',`${f0(d.a)} ${d.u} · ${(d.a/sum*100).toFixed(0)}%`,'--cold');
  o+=lab(wl+hb*.45,'At power plants',`${f0(d.b)} ${d.u} · ${(d.b/sum*100).toFixed(0)}%`,'--muted');
  o+=lab(Math.min(H-20,wl+hb+hc/2),'Making the chips',d.c?`${f0(d.c)} ${d.u} · ${(d.c/sum*100).toFixed(0)}%`:'not disclosed','--heat');
  el.innerHTML=svg(W,H,o);
  $('#vs11-n').innerHTML=d.n+' '+evs(d.ev[0],d.ev[1]);
}
seg('vs11-m',d=>{m11=d.v;vs11()});window.__VS11=()=>({d:ICE[m11]});

/* ===== 10 two speeds ===== */
function vs12(){
  const el=$('#vs12'),W=cw(el),H=230,L=40,R=W<480?104:140,T=14,B=30,X=y=>L+(y-2024)/6*(W-L-R),Y=v=>T+(1-(v-1)/4.2)*(H-T-B);
  let o='';[1,2,3,4,5].forEach(v=>{o+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-width=".6"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end">${v}×</text>`});
  for(let y=2024;y<=2030;y+=2)o+=`<text x="${X(y)}" y="${H-10}" text-anchor="middle">${y}</text>`;
  const ln=(g,c,n)=>{const p=[];for(let y=2024;y<=2030;y++)p.push(`${X(y)},${Y(Math.pow(1+g,y-2024))}`);const v=Math.pow(1+g,6);return `<polyline points="${p.join(' ')}" fill="none" stroke="var(${c})" stroke-width="2.6"/><circle cx="${X(2030)}" cy="${Y(v)}" r="4" fill="var(${c})"/><text x="${X(2030)+8}" y="${Y(v)+4}" style="fill:var(${c});font-weight:700" class="halo">${n} ${v.toFixed(1)}×</text>`};
  o+=ln(.09,'--cold','Conventional')+ln(.30,'--hot','AI');
  el.innerHTML=svg(W,H,o);
  $('#vs12-r').innerHTML=`<div><span class="v">415 → 945 TWh</span><span class="k">World data centres, 2024 → 2030 (IEA base case) ${evs('e','IEA Energy and AI, Apr 2025')}</span></div><div><span class="v hot">~½</span><span class="k">Share of the 2024–30 increase from AI servers; conventional ~20% ${evs('e','IEA')}</span></div><div><span class="v">&lt;2 → &gt;40 TWh</span><span class="k">US AI-server electricity, 2017 → 2023; conventional ~30 → ~60 ${evs('e','LBNL 2024')}</span></div>`;
}

/* ===== 11 India ===== */
function vs13(){
  const sq=(n,ai)=>Array.from({length:n},(_,i)=>`<i class="${i<ai?'ai':''}"></i>`).join('');
  $('#vs13').innerHTML=`<div class="vs-iy"><b>2025</b><div class="vs-waf">${sq(22,3)}</div><p class="small"><span class="mono">2.2 GW</span> operational · <span class="mono" style="color:var(--hot)">275 MW</span> AI (12%)</p></div>
  <div class="vs-iy"><b>2030</b><div class="vs-waf">${sq(120,65)}</div><p class="small"><span class="mono">12 GW</span> · <span class="mono" style="color:var(--hot)">6,546 MW</span> AI (55%) ${evs('e','Wood Mackenzie, India data centre outlook')}</p></div>
  <div class="vs-iy vs-ie"><b>Electricity</b><div class="vs-tw"><div><span class="mono">13 TWh</span><i style="height:${13/57*100}%"></i><small>2024 · 0.8% of India</small></div><div><span class="mono">57 TWh</span><i style="height:100%"></i><small>2030 · 2.6%</small></div></div><p class="small">S&amp;P Global ${evs('e','S&P Global, India Forward')}. The IndiaAI GPUs alone add ~2 TWh a year. Wood Mackenzie sees 191 TWh (~7%) by 2040.</p></div>`;
}

/* ===== 12 city fit ===== */
const CITYF=[['Mumbai',35,28],['Chennai',38,29],['Vizag',36,28],['Bengaluru',35,23],['Hyderabad',41,26],['NCR (Noida)',45,29]];
const COLF=['Cooling towers','Adiabatic','Liquid + dry coolers','Closed-loop chillers','Seawater'];
const FIT={
 'Mumbai':[[1,'Works, but a ~28 °C design wet-bulb limits economiser hours and municipal water is contested.'],[0,'Humid air most of the year: evaporation adds little cooling.'],[2,'35 + 7 = 42 °C: 45 °C liquid loops stay dry on design days.'],[2,'Reliable in humidity; water-free, at some PUE cost.'],[2,'Coastal; seawater or desalinated make-up avoids fresh water (CoreWeave–AdaniConneX Taloja plans non-evaporative chilled water).']],
 'Chennai':[[0,'Reservoirs ran dry in 2019 and a ~29 °C wet-bulb weakens towers.'],[0,'Humid; little evaporative benefit.'],[1,'38 + 7 = 45 °C: right at the limit; budget an adiabatic trim for the hottest hours.'],[2,'Water-free and dependable.'],[2,'Coastal option; sea at 27–31 °C still needs chillers on peaks.']],
 'Vizag':[[0,'Google–Adani campus faces PILs over water near Kambalakonda sanctuary.'],[0,'Humid coastal air.'],[2,'36 + 7 = 43 °C: dry coolers hold 45 °C loops; Google cites "advanced air cooling".'],[2,'Water-free.'],[2,'Coastal; seawater exchange possible (CRZ clearance needed).']],
 'Bengaluru':[[0,'Bangalore East groundwater drawn at ~305% of recharge; borewell failures and tankers make towers politically costly.'],[1,'Mild climate means few wet hours, but peaks coincide with summer shortages.'],[2,'Most dry-cooling hours of any Indian hub: the smallest PUE penalty for going waterless.'],[2,'Low chiller hours in a mild climate.'],[-1,'Inland.']],
 'Hyderabad':[[1,'Workable with treated water; municipal supply is tight in May.'],[1,'Very effective in dry heat, but water use peaks exactly when supply is tightest (chapter 8).'],[1,'41 + 7 = 48 °C: dry coolers need adiabatic or chiller trim on hot afternoons.'],[1,'Air-cooled chillers hit PUE ~1.5+ at a 41 °C design day.'],[-1,'Inland.']],
 'NCR (Noida)':[[1,'Workable; a 29 °C design wet-bulb and summer water stress.'],[1,'Effective in pre-monsoon dry heat; peak demand doubles the average day.'],[1,'45 + 7 = 52 °C: dry-only cannot hold 45 °C water on peaks; plan trim.'],[0,'45 °C+ peaks derate air-cooled chillers when they are needed most.'],[-1,'Inland.']]};
let c14=['Bengaluru',2];
function vs14(){
  const SV=['<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" stroke-width="2"/></svg>','<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 2 A7 7 0 0 0 9 16 Z" fill="currentColor"/></svg>','<svg viewBox="0 0 18 18" width="18" height="18"><circle cx="9" cy="9" r="8" fill="currentColor"/></svg>'];const sym=[[SV[0],'Poor fit','--bad'],[SV[1],'Workable, with conditions','--warn'],[SV[2],'Good fit','--good']];
  $('#vs14').innerHTML=`<thead><tr><th>City <small class="muted">design DB/WB °C</small></th>${COLF.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>`+CITYF.map(([c,db,wb])=>`<tr><th>${c} <small class="mono muted">${db}/${wb}</small></th>${FIT[c].map(([v],j)=>v<0?`<td class="na">—</td>`:`<td><button type="button" class="vs-fc${c14[0]===c&&c14[1]===j?' on':''}" data-c="${c}" data-j="${j}" style="color:var(${sym[v][2]})" aria-label="${c}, ${COLF[j]}: ${sym[v][1]}">${sym[v][0]}</button></td>`).join('')}</tr>`).join('')+'</tbody>';
  const [v,t]=FIT[c14[0]][c14[1]];$('#vs14-d').innerHTML=`<b>${c14[0]} · ${COLF[c14[1]]}:</b> <span style="color:var(${sym[Math.max(0,v)][2]})">${v<0?'Not applicable':sym[v][1]}</span>. ${t} <span class="xs muted vs-lg"><span style="color:var(--good)">${SV[2]}</span> good <span style="color:var(--warn)">${SV[1]}</span> workable <span style="color:var(--bad)">${SV[0]}</span> poor · series judgement, to be quantified with ISHRAE typical-year data.</span>`;
}
$('#vs14').addEventListener('click',e=>{const b=e.target.closest('.vs-fc');if(!b)return;c14=[b.dataset.c,+b.dataset.j];vs14()});

/* ===== 13 projects + disclosure + gaps ===== */
const PROJ=[['Google AI hub, Visakhapatnam','~1 GW first, "multiple GW" later · US$15 bn (2026–30) · with AdaniConneX and Airtel/Nxtra','"Advanced air cooling"; state guarantees water for 20 years; PILs over water and an adjacent sanctuary','r','Ground broken 28 Apr 2026'],
 ['Reliance–Meta, Jamnagar','168 MW; first 120 MW targeted by end-2026','100% renewable power; desalinated seawater for cooling; no PUE/WUE published','d','Announced June 2026'],
 ['CoreWeave–AdaniConneX, Taloja','240 MW, Navi Mumbai','Direct liquid cooling with non-evaporative chilled water','d','Announced'],
 ['IndiaAI compute','~29,000 GPUs after round 2; Yotta empanelled for 8,192 B200s · ₹10,372 crore mission','Tender requires PUE < 1.35; no water rule','r','Operating / expanding'],
 ['Yotta NM1 and D1','Hyperscale campuses, Navi Mumbai and Greater Noida','Design PUE 1.4; says it avoids fresh water; no WUE published','d','Operating'],
 ['AdaniConneX pipeline','2.6 GW','PUE-linked US$1.44 bn sustainability loan; targets not public','r','Building']];
function vs15(){$('#vs15').innerHTML=PROJ.map(([n,s,w,ev,st])=>`<div class="vs-pc"><div class="vs-pch"><b>${n}</b><span class="chip">${st}</span></div><div class="small">${s}</div><div class="small vs-pw"><span aria-hidden="true">💧</span> ${w} ${evs(ev,n)}</div></div>`).join('')}
const DISC=[['STT GDC India',['<1.5','d'],['0.58 L/kWh','r'],['—',''],['DNV limited','r']],['Sify Infinit Spaces',['1.7554','r'],['—',''],['296,279 kL','r'],['—','']],['Nxtra by Airtel',['—',''],['—',''],['216,357 kL','r'],['—','']],['CtrlS',['1.35','u'],['—',''],['409,037 kL','r'],['—','']],['Yotta',['1.4','d'],['—',''],['—',''],['—','']]];
function vs16(){$('#vs16').innerHTML=`<thead><tr><th>Operator</th><th>PUE</th><th>WUE</th><th>Water used / yr</th><th>Assured</th></tr></thead><tbody>`+DISC.map(([n,...c])=>`<tr><th>${n}</th>${c.map(([v,t])=>`<td class="${v==='—'?'na':''}">${v}${t&&t!=='r'?` <small class="muted">${EVL[t]}</small>`:''}</td>`).join('')}</tr>`).join('')+'</tbody>'}
const GAPS=[['Per-prompt numbers are not comparable','Medians vs averages, different scopes, undisclosed prompt mixes; none cover reasoning, image or video.'],['"Capacity" means different things','IT load vs operational vs contracted vs announced MW explains most of the 1.4 vs 2.2 GW and 8 vs 12 GW gaps.'],['WUE has two definitions','Withdrawal (AWS, Microsoft, Meta) vs consumption (LBNL) differ by ~25%; peak-day demand is almost never disclosed.'],['Models assume perfect operation','LBNL: simulated PUEs assume systems run as designed, which "is rarely the case".'],['The AI flagships are silent','No operating PUE or WUE for Fairwater, Stargate Abilene, Prometheus/Hyperion or Colossus; xAI water figures conflict (1.2 to 3.7 million gal/day).'],['India\'s grid water is unverified','No public plant-level compliance data for the 3.0 / 3.5 m³/MWh caps; the CEA once found 5–7 m³/MWh.'],['Forecasts span 2–3×','LBNL 2028: 325–580 TWh; Indian forecasts differ by factors of 2–3. Scenarios, not predictions.'],['Chips are a blank','Embodied water and energy in GPUs, HBM and construction are largely undisclosed.']];
function vs17(){$('#vs17').innerHTML=GAPS.map(([t,d],i)=>`<div class="vs-gc"><span class="mono">${String(i+1).padStart(2,'0')}</span><b>${t}</b><p class="small">${d}</p></div>`).join('')}

function all(){vs1();vs3();vs5();vs8();vs9();vs10();vs11();vs12()}
vs1();vs2();vs3();vs4();vs5();vs6();vs7();vs8();vs9();vs10();vs11();vs12();vs13();vs14();vs15();vs16();vs17();
let rt=null,lw=window.innerWidth;window.addEventListener('resize',()=>{if(Math.abs(window.innerWidth-lw)<8)return;lw=window.innerWidth;clearTimeout(rt);rt=setTimeout(all,150)});
}

