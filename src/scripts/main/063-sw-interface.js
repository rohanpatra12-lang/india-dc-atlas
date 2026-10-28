
/* ---------- SW interface ---------- */
(()=>{if(typeof document==='undefined')return;const root=document.getElementById('cscope');if(!root)return;const $=id=>document.getElementById(id);
const O=Object.assign({},SWM.DEF);const f0=v=>fmt(v,0),f1=v=>fmt(v,1),f2=v=>fmt(v,2);
const kl=v=>v>=1e6?fmt(v/1e3,0)+' ML':v>=1e4?fmt(v/1e3,1)+' ML':fmt(v,0)+' kL';
$('sw-site').innerHTML=Object.keys(SWM.SITE).map(k=>`<option value="${k}">${SWM.SITE[k].n}</option>`).join('');
const sysOpts=()=>{const air=O.hw==='cpu';$('sw-sys').innerHTML=CEM.SYS.filter(s=>air?!s.liq||s.id==='dlc40':s.liq).map(s=>`<option value="${s.id}"${s.id===O.sys?' selected':''}>${s.n}</option>`).join('');if(![...$('sw-sys').options].some(x=>x.value===O.sys)){O.sys=$('sw-sys').options[0].value}};
const NUM={mw:'sw-mw',u:'sw-u',coc:'sw-coc',clean:'sw-clean',ref:'sw-ref',gpuW:'sw-gpu',whp:'sw-wh'};
Object.entries(NUM).forEach(([k,id])=>$(id).addEventListener('input',e=>{O[k]=+e.target.value;draw()}));
$('sw-site').addEventListener('change',e=>{O.site=e.target.value;draw()});$('sw-sys').addEventListener('change',e=>{O.sys=e.target.value;draw()});
const SEG={basis:'sw-basis',hydro:'sw-hydro',match:'sw-match',hw:'sw-hw',view:'sw-view'};
Object.entries(SEG).forEach(([k,id])=>$(id).addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;O[k]=k==='hydro'?+b.dataset.v:b.dataset.v;if(k==='hw'){O.sys=O.hw==='cpu'?'wcc':'dlc40';sysOpts()}$(id).querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()}));
$('sw-pre').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const P={colo:{site:'blr',mw:10,u:75,hw:'cpu',sys:'wcc'},colod:{site:'blr',mw:10,u:75,hw:'cpu',sys:'fcc'},ai:{site:'blr',mw:50,u:80,hw:'ai',sys:'dlc40'},aim:{site:'mum',mw:50,u:80,hw:'ai',sys:'dlct'}}[b.dataset.v];Object.assign(O,SWM.DEF,P);syncUI();$('sw-pre').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw();tern()});
function syncUI(){$('sw-site').value=O.site;Object.entries(NUM).forEach(([k,id])=>{$(id).value=O[k]});Object.entries(SEG).forEach(([k,id])=>$(id).querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.v)===String(O[k]))));sysOpts();$('sw-sys').value=O.sys}
let anim=true;try{anim=!matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
function draw(){const R=SWM.compute(O);window.__SW=R;const v=O.view,S1=R.S1[v.toUpperCase()],S2=R.S2[v.toUpperCase()],S3=R.S3[v.toUpperCase()],T=S1+S2+S3,lab=v==='c'?'consumed':'withdrawn';
 out('sw-mw',f0(O.mw)+' MW');out('sw-u',O.u+'%');out('sw-coc',O.coc+' cycles');out('sw-clean',O.clean+'%');out('sw-ref',O.ref+' years');out('sw-gpu',O.gpuW.toFixed(1)+' m³ per GPU');out('sw-wh',O.whp.toFixed(2)+' Wh');
 root.querySelectorAll('[data-sw-tw]').forEach(el=>el.classList.toggle('dt-off',!R.sys.tw));root.querySelectorAll('[data-sw-ai]').forEach(el=>el.classList.toggle('dt-off',O.hw!=='ai'));root.querySelectorAll('[data-sw-hy]').forEach(el=>el.classList.toggle('dt-off',O.basis==='std'));
 const pct=x=>Math.round(x/T*100)+'%';
 $('sw-r').innerHTML=`<div><span class="v cold">${kl(S1)}</span><span class="k">Scope 1, on site, ${lab} a year (${pct(S1)}) · ${R.sys.n.toLowerCase()}, PUE ${R.pue.toFixed(2)}</span></div><div><span class="v hot">${kl(S2)}</span><span class="k">Scope 2, at power stations (${pct(S2)}) · ${R.gC.toFixed(2)} m³/MWh ${O.basis==='std'?'atlas standard':['hydro excluded','hydro net','hydro gross'][O.hydro]}${O.clean?`, ${O.clean}% clean (${O.match})`:''}</span></div><div><span class="v">${kl(S3)}</span><span class="k">Scope 3, supply chain (${pct(S3)}): chips and servers ${kl(R.S3.it*(v==='c'?.5:1))}, building ${kl(R.S3.bld*(v==='c'?.5:1))}, coal mining ${kl(R.S3.coal*(v==='c'?.5:1))}</span></div><div><span class="v">${kl(T)}</span><span class="k">total ${lab} · ${f2(T/R.EIT)} m³ per MWh of IT · ${f2(T/365/1000)} MLD</span></div><div><span class="v">${f2(R.ppm.s1+R.ppm.s2+R.ppm.s3)} mL</span><span class="k">per prompt at ${O.whp.toFixed(2)} Wh of IT: ${f2(R.ppm.s1)} on site + ${f2(R.ppm.s2)} power stations + ${f2(R.ppm.s3)} supply chain</span></div><div><span class="v">${f1(R.aw/1e6)} M</span><span class="k">m³ world-equivalent, weighted for water stress (illustrative weights: on site ${R.st.cf}, grid 30, chips 15)</span></div>`+
  (R.be!=null?`<div><span class="v">${f1(R.be)} m³/MWh</span><span class="k">grid water above which this design would use less total water than ${R.dry.n.toLowerCase()}; India's grid is 2.5–9.4</span></div>`:'')+
  (O.clean?`<div><span class="v">${kl(R.s2C_MB)}</span><span class="k">Scope 2 market-based (what a contract claims, consumption) vs ${kl(R.S2.C)} physical${O.match==='annual'&&O.clean?': annual matching leaves night-time demand on the grid':''}</span></div>`:'');
 sankey(R,v);story(R);conv(T);
 $('sw-n').textContent=`${S2>S1?'Scope 2 dominates: the power stations behind the meter evaporate more than the site':'Scope 1 dominates: the cooling towers evaporate more than the power stations behind the meter'} (${pct(S2)} vs ${pct(S1)}). ${R.sys.tw?`Switching to ${R.dry.n.toLowerCase()} would cut total consumption unless grid water exceeded ${f1(R.be)} m³/MWh.`:'This is a dry design, so clean power is its main water lever.'} Every 10 points of clean power cuts about ${kl(R.Efac*.1*(R.gC-.05)*(O.match==='hourly'?1:.55))} a year of physical Scope 2 water.`}
/* ---- Sankey ---- */
function sankey(R,v){const el=$('sw-sk');const W=760,H=360,k=v==='c'?'C':'W';const S1=R.S1[k],S2=R.S2[k],S3=R.S3[k],T=S1+S2+S3;const sc=(H-80)/T;
 const ws=O.site&&R.st?'':'';const srcIn=[['On-site supply (municipal, borewell, treated sewage)',S1,'--cold'],['Power-station cooling water',S2,'--hot'],['Supply chain: fabs, materials, coal mines',S3,'--muted']];
 const fates=k==='C'?[['Evaporated on site',S1,'--cold'],['Evaporated at power stations',S2,'--hot'],['Consumed in the supply chain',S3,'--muted']]:[['Evaporated on site',R.S1.C,'--cold'],['Blowdown and sewage discharged',R.S1.W-R.S1.C,'color-mix(in srgb,var(--cold) 45%,var(--sunk))'],['Evaporated at power stations',Math.min(R.S2.C,R.S2.W),'--hot'],['Returned to rivers by power stations',Math.max(0,R.S2.W-R.S2.C),'color-mix(in srgb,var(--hot) 40%,var(--sunk))'],['Supply chain (consumed + returned)',S3,'--muted']];
 const col=c=>c.startsWith('--')?`var(${c})`:c;let g='',y=40;const x0=170,x1=360,x2=420,x3=560;
 const left=[];srcIn.forEach(([n,val,c])=>{const h=Math.max(2,val*sc);left.push({n,val,c,y,h});y+=h+14});let ly=-1e9;left.forEach(L=>{L.ly=Math.max(L.y+L.h/2,ly+30);ly=L.ly});
 const midH=T*sc,midY=40+((y-14-40)-midH)/2;g+=`<rect x="${x1}" y="${midY}" width="${x2-x1}" height="${midH}" rx="6" class="sw-dc"/><text x="${(x1+x2)/2}" y="${midY-8}" text-anchor="middle" class="t1">Data centre</text>`;
 let my=midY;left.forEach(L=>{const h=L.val*sc;g+=`<path d="M${x0} ${L.y} C ${(x0+x1)/2} ${L.y}, ${(x0+x1)/2} ${my}, ${x1} ${my} L ${x1} ${my+h} C ${(x0+x1)/2} ${my+h}, ${(x0+x1)/2} ${L.y+L.h}, ${x0} ${L.y+L.h} Z" fill="${col(L.c)}" opacity=".55"/>`+(anim?`<path d="M${x0} ${L.y+L.h/2} C ${(x0+x1)/2} ${L.y+L.h/2}, ${(x0+x1)/2} ${my+h/2}, ${x1} ${my+h/2}" class="sw-flow" style="stroke-width:${Math.max(1,Math.min(6,h/6))}"/>`:'');
  g+=`<rect x="${x0-8}" y="${L.y}" width="8" height="${L.h}" fill="${col(L.c)}"/><text x="${x0-12}" y="${L.ly+4}" text-anchor="end" class="t3">${L.n.split(' (')[0].split(':')[0]}</text><text x="${x0-12}" y="${L.ly+17}" text-anchor="end" class="t2">${kl(L.val)}</text>`;my+=h});
 let ry=40,mo=midY,lab=-1e9;const tot2=fates.reduce((a,f)=>a+f[1],0),sc2=(H-80)/tot2;fates.forEach(([n,val,c])=>{const h=Math.max(1.5,val*sc2),hm=val*sc;g+=`<path d="M${x2} ${mo} C ${(x2+x3)/2} ${mo}, ${(x2+x3)/2} ${ry}, ${x3} ${ry} L ${x3} ${ry+h} C ${(x2+x3)/2} ${ry+h}, ${(x2+x3)/2} ${mo+hm}, ${x2} ${mo+hm} Z" fill="${col(c)}" opacity=".5"/>`+(anim&&val>0?`<path d="M${x2} ${mo+hm/2} C ${(x2+x3)/2} ${mo+hm/2}, ${(x2+x3)/2} ${ry+h/2}, ${x3} ${ry+h/2}" class="sw-flow" style="stroke-width:${Math.max(1,Math.min(6,h/6))}"/>`:'');
  const lyy=Math.max(ry+h/2,lab+30);lab=lyy;g+=`<rect x="${x3}" y="${ry}" width="8" height="${h}" fill="${col(c)}"/><text x="${x3+14}" y="${lyy+4}" class="t3">${n}</text><text x="${x3+14}" y="${lyy+17}" class="t2">${kl(val)} · ${Math.round(val/tot2*100)}%</text>`;ry+=h+14;mo+=hm});
 el.innerHTML=g;el.setAttribute('viewBox',`0 0 ${W} ${Math.max(H,ry+10,y+10,lab+30)}`)}
/* ---- follow one prompt ---- */
let step=0,timer=null;
function story(R){const p=R.ppm,wh=O.whp,fw=wh*R.pue;const ST=[
 ['📱','Your phone','A prompt leaves the phone and crosses the mobile network and the internet (network energy not counted here).',0,0],
 ['🔤','Tokeniser and scheduler','Text is split into tokens and batched with other users\' requests so one read of the model serves many.',0,0],
 ['🧮','GPU',`The GPUs spend about ${wh.toFixed(2)} Wh of IT energy on your answer.`,wh,0],
 ['🏭','Rest of the building',`Cooling, UPS and lighting add ${((R.pue-1)*wh).toFixed(3)} Wh (PUE ${R.pue.toFixed(2)}): ${fw.toFixed(3)} Wh at the meter.`,fw,0],
 ['💧','On-site cooling (Scope 1)',`${R.sys.n} ${O.view==='c'?'evaporates':'draws'} ${p.s1.toFixed(3)} mL on site.`,fw,p.s1],
 ['⚡','Power station (Scope 2)',`Making ${fw.toFixed(3)} Wh evaporates ${p.s2.toFixed(3)} mL at ${R.G.n}'s power stations, mostly coal cooling towers.`,fw,p.s1+p.s2],
 ['⛏️','Supply chain (Scope 3)',`Coal mining, chip fabs and the building add ${p.s3.toFixed(3)} mL, spread over their lives.`,fw,p.s1+p.s2+p.s3]];
 if(step>=ST.length)step=ST.length-1;const s=ST[step];
 $('sw-st').innerHTML=`<div class="sw-steps">${ST.map((x,i)=>`<button type="button" data-i="${i}" class="${i===step?'on':i<step?'done':''}" aria-label="${x[1]}"><span>${x[0]}</span></button>`).join('<i></i>')}</div><div class="sw-stc"><h4>${step+1} · ${s[1]}</h4><p class="small">${s[2]}</p><div class="read"><div><span class="v">${s[3].toFixed(3)} Wh</span><span class="k">energy so far</span></div><div><span class="v cold">${s[4].toFixed(3)} mL</span><span class="k">water so far · ${s[4]>0?f0(1000/s[4]):'—'} prompts per litre</span></div></div><div class="sw-glass"><i style="height:${Math.min(100,s[4]/(p.s1+p.s2+p.s3||1)*100)}%"></i></div></div>`;
 $('sw-st').querySelectorAll('.sw-steps button').forEach(b=>b.addEventListener('click',()=>{step=+b.dataset.i;stop();story(window.__SW)}))}
function stop(){if(timer){clearInterval(timer);timer=null;$('sw-play').textContent='▶ Play the journey'}}
$('sw-play').addEventListener('click',()=>{if(timer){stop();return}step=0;story(window.__SW);$('sw-play').textContent='❚❚ Pause';timer=setInterval(()=>{step++;if(step>6){stop();return}story(window.__SW)},anim?1600:300)});
$('sw-next').addEventListener('click',()=>{stop();step=Math.min(6,step+1);story(window.__SW)});
/* ---- scale converter ---- */
function conv(T){const ML=T/1000;const pools=ML/2.5,hh=T*1000/(135*4*365),pc=T*1000/135/365,cau=T/365/1000/1935*100;
 $('sw-conv').innerHTML=`<div><span class="v">${f0(pools)}</span><span class="k">Olympic pools a year (2.5 ML each)</span></div><div><span class="v">${f0(pc)}</span><span class="k">people's daily water all year (135 L a day)</span></div><div><span class="v">${f0(hh)}</span><span class="k">four-person households for a year</span></div><div><span class="v">${cau.toFixed(2)}%</span><span class="k">of Bengaluru's 1,935 MLD piped supply, if it all came from there</span></div>`}
/* ---- ternary plot of state grid mixes ---- */
const OFF={India:[-12,4,'end'],Maharashtra:[10,16,'start'],'Uttar Pradesh':[10,-4,'start'],Telangana:[10,8,'start']};
const MIX=(typeof STD!=='undefined'&&STD.mix)?['India','Karnataka','Maharashtra','Tamil Nadu','Telangana','Uttar Pradesh','Andhra Pradesh'].map(n=>[n,...STD.mix[n]]):[['India',73,8,19],['Karnataka',35,18,47],['Maharashtra',72,5,23],['Tamil Nadu',50,5,45],['Telangana',80,5,15],['Uttar Pradesh',85,5,10],['Andhra Pradesh',65,5,30]];
function tern(){const el=$('sw-tern');const W=520,H=470,cx=W/2,top=40,side=400,hgt=side*Math.sqrt(3)/2,A=[cx,top],B=[cx-side/2,top+hgt],C=[cx+side/2,top+hgt];
 const hv=[0,(typeof STD!=='undefined'&&STD.hydroW)||10,26][O.hydro],cwF=(typeof STD!=='undefined'&&STD.coalW)||3.5;const fac=(c,h,o)=>(c*cwF+h*hv+o*.4)/100;
 const P=(c,h,o)=>{const t=c+h+o;return [(A[0]*c+B[0]*h+C[0]*o)/t,(A[1]*c+B[1]*h+C[1]*o)/t]};
 let g=`<polygon points="${A} ${B} ${C}" class="sw-tri"/>`;
 for(let q=20;q<100;q+=20){const a=P(q,100-q,0),b=P(q,0,100-q);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="sw-grid"/>`}
 /* isolines of grid water: points where fac = level */
 [2,3,4,6,10,15].forEach(L=>{const pts=[];for(let c=0;c<=100;c+=1){/* along c fixed, solve h: c*3.4+h*hv+(100-c-h)*.4=100L */const den=hv-.4;if(Math.abs(den)<1e-9)continue;const h=(100*L-c*cwF-(100-c)*.4)/den;if(h>=0&&h<=100-c)pts.push(P(c,h,100-c-h))}if(pts.length>1)g+=`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" class="sw-iso"/><text x="${pts[0][0]+4}" y="${pts[0][1]-3}" class="t3">${L} m³/MWh</text>`});
 if(hv===0)[1,2,3].forEach(L=>{const c=(100*L-40)/(cwF-.4);if(c>0&&c<100){const a=P(c,100-c,0),b=P(c,0,100-c);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="sw-iso"/><text x="${b[0]+4}" y="${b[1]}" class="t3">${L} m³/MWh</text>`}});
 MIX.forEach(([n,c,h,o])=>{const [x,y]=P(c,h,o),f=fac(c,h,o);g+=`<circle cx="${x}" cy="${y}" r="${n==='India'?8:6}" class="sw-pt${n==='India'?' in':''}"><title>${n}: coal ${c}%, hydro ${h}%, other ${o}% → ${f.toFixed(1)} m³/MWh</title></circle><text x="${x+(OFF[n]?OFF[n][0]:10)}" y="${y+(OFF[n]?OFF[n][1]:4)}" text-anchor="${OFF[n]?OFF[n][2]:'start'}" class="t3">${n} ${f.toFixed(1)}</text>`});
 g+=`<text x="${A[0]}" y="${A[1]-12}" text-anchor="middle" class="t1">Coal 100%</text><text x="${B[0]-6}" y="${B[1]+20}" text-anchor="start" class="t1">Hydro 100%</text><text x="${C[0]+6}" y="${C[1]+20}" text-anchor="end" class="t1">Solar, wind, nuclear, gas</text>`;
 el.innerHTML=g}
$('sw-hydro').addEventListener('click',()=>setTimeout(tern,0));
sysOpts();draw();tern();window.__SWX={O,draw,tern,M:SWM,CE:CEM};
})();

window.__DTE=DTE;window.__DTV=DTV;window.__CEM=CEM;