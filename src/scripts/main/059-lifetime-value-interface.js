
/* ---------- lifetime value: interface ---------- */
(()=>{if(typeof document==='undefined')return;const root=document.getElementById('ctwinv');if(!root||typeof DTV==='undefined'||!window.__DTX)return;
const $=id=>document.getElementById(id),f0=v=>fmt(v,0),f1=v=>fmt(v,1);const V=Object.assign({},DTV.DEFV);let lastHw=null,lastModel=null,last=null;
const cr=v=>{const a=Math.abs(v);return (v<0?'−':'')+'₹'+(a>=1e5?fmt(a/1e5,2)+' lakh cr':fmt(a,0)+' cr')};
const pct=v=>v==null?'below −95%':(v*100).toFixed(1)+'%';
$('dv-comp').innerHTML=Object.keys(DTV.COMP).map(k=>`<option value="${k}">${DTV.COMP[k].n}</option>`).join('');
const RNG={life:'dv-life',ref:'dv-ref',rent:'dv-rent',gpr:'dv-gpr',tokp:'dv-tokp',dec:'dv-dec',dect:'dv-dect',disc:'dv-disc',occ:'dv-occ',cpue:'dv-cpue'};let lastLiq=null;
Object.entries(RNG).forEach(([k,id])=>$(id).addEventListener('input',e=>{V[k]=+e.target.value;draw()}));
$('dv-comp').addEventListener('change',e=>{V.comp=e.target.value;draw()});$('dv-sub').addEventListener('change',e=>{V.sub=e.target.checked?1:0;draw()});
$('dv-biz').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;V.biz=b.dataset.v;draw()});
function sync(S,R){if(S.hw!==lastHw){V.gpr=DTV.GPR[S.hw]||0;$('dv-gpr').value=V.gpr;if(S.hw==='cpu')V.biz='colo';else if(lastHw==='cpu'||lastHw===null)V.biz='gpu';lastHw=S.hw}
 const liq=!!R.c.liq;if(liq!==lastLiq){V.cpue=liq?1.35:1.5;$('dv-cpue').value=V.cpue;lastLiq=liq}
 if(S.model!==lastModel){V.tokp=DTV.TOKP[S.model];$('dv-tokp').value=V.tokp;lastModel=S.model}}
function draw(){const X=window.__DT;if(!X)return;const S=X.S,R=X.R;const ob=$('dv-out');
 if(!R.ok){ob.innerHTML='<p class="small">Choose a workable design in 14.2 first.</p>';$('dv-svg').innerHTML='';$('dv-tab').innerHTML='';return}
 sync(S,R);const ai=R.gpus>0;
 $('dv-biz').querySelectorAll('button').forEach(b=>{const dis=!ai&&b.dataset.v!=='colo';b.disabled=dis;b.title=dis?'Needs GPU hardware':'';b.setAttribute('aria-pressed',b.dataset.v===V.biz)});
 out('dv-life',V.life+' years');out('dv-ref',V.ref+' years');out('dv-rent','₹'+f0(V.rent)+' /kW/month (≈ $'+(V.rent/DTV.USD).toFixed(0)+')');out('dv-gpr','₹'+f0(V.gpr)+' (≈ $'+(V.gpr/DTV.USD).toFixed(2)+')');out('dv-tokp','₹'+f0(V.tokp)+' (≈ $'+(V.tokp/DTV.USD).toFixed(2)+')');out('dv-dec',V.dec+'%');out('dv-dect',V.dect+'%');out('dv-disc',V.disc+'%');out('dv-occ',V.occ+'%');out('dv-cpue',V.cpue.toFixed(2)+' (yours '+R.pue.toFixed(2)+')');
 root.querySelectorAll('[data-dv]').forEach(el=>{const m=el.dataset.dv.split(' ');el.classList.toggle('dt-off',!m.includes(V.biz))});
 const d=DTV.dc(R,S,V),c=DTV.comp(V.comp,d.P,V);last={d,c,V:Object.assign({},V),S,R};window.__DV=last;
 const tile=(v,k,cls)=>`<div><span class="v ${cls||''}">${v}</span><span class="k">${k}</span></div>`;
 const nb=d.buys.length;
 let h=`<div class="read dt-read">`+
  tile(cr(d.P),`initial capex: building and electrical ${cr(R.baseCap)} + cooling ${cr(R.coolCap)}${d.own?' + IT '+cr(R.itCap):' (tenants buy the IT)'}`)+
  tile(cr(d.lifeCap),`capex over ${V.life} years: ${d.own?`IT bought ${nb}× (${Math.round(d.itShare*100)}%), `:''}cooling ${cr(d.coolLife)} incl. ${d.coolBuys.length} replacement${d.coolBuys.length===1?'':'s'}${d.midY?', UPS and switchgear refit in year 15':''}`)+
  tile(cr(d.revS)+'/yr',`average revenue a year · ${cr(d.lifeRev)} over the life`,'cold')+
  tile((d.marg*100).toFixed(0)+'%',`operating (EBITDA) margin · ${cr(d.ebS)}/yr`)+
  tile(cr(d.npv),`net present value at ${V.disc}%`,d.npv>=0?'good':'hot')+
  tile(pct(d.irr),'project IRR (pre-tax, real)',d.irr!=null&&d.irr>=V.disc/100?'good':'hot')+
  tile(d.pb==null?'not repaid':f1(d.pb)+' yr',`payback from start of operation`)+
  tile(d.mult.toFixed(2)+'×',`value multiple: lifetime EBITDA ÷ lifetime capex`)+
  tile(Math.round(d.dom*100)+'%',d.own?'of initial capex spent in India (rest imported: GPUs, servers, chillers, switchgear)':'of initial capex spent in India (rest imported: chillers, UPS, switchgear)')+
  tile(cr(R.cost.cool)+'/yr',`cooling maintenance and consumables · cooling electricity ${cr((R.E.comp+R.E.fan+R.E.pump+R.E.rfan)*R.tariff/1e7)}/yr${V.biz==='colo'?' (recovered through the contracted PUE)':''}`)+tile(f0(d.jobs),'permanent jobs on site (estimate)')+'</div>';
 ob.innerHTML=h;
 chart(d,c);table(d,V);note(d,c,R,S);cmpTable(d,R,V)}
function chart(d,c){const sv=$('dv-svg'),W=680,H=280,pl=64,pr=16,pt=24,pb=34;const Lx=Math.max(d.L,c.L);const all=d.cum.concat(c.cum);let mn=Math.min(0,...all),mx=Math.max(0,...all);if(mx-mn<1)mx=mn+1;
 const x=i=>pl+(i)/(Lx+1)*(W-pl-pr),y=v=>pt+(mx-v)/(mx-mn)*(H-pt-pb);
 const tick=(()=>{const span=mx-mn,raw=span/5,p=Math.pow(10,Math.floor(Math.log10(raw))),m=[1,2,2.5,5,10].find(k=>k*p>=raw);return m*p})();
 let g='';for(let v=Math.ceil(mn/tick)*tick;v<=mx+1e-9;v+=tick){g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" class="dv-grid${Math.abs(v)<1e-9?' z':''}"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end" class="t3">${cr(v).replace('₹','')}</text>`}
 for(let t=0;t<=Lx;t+=5)g+=`<text x="${x(t+1)}" y="${H-12}" text-anchor="middle" class="t3">${t===0?'start':'yr '+t}</text>`;
 const line=(arr,cls)=>`<polyline points="${arr.map((v,i)=>x(i)+','+y(v)).join(' ')}" class="dv-l ${cls}"/>`;
 g+=line(c.cum,'c')+line(d.cum,'d');
 d.buys.slice(1).forEach(b=>{const i=b+1;g+=`<path d="M${x(i)} ${y(d.cum[i])+4} l-5 9 h10 z" class="dv-mk"/>`});
 d.coolBuys.forEach(([b])=>{const i=b+1;g+=`<rect x="${x(i)-4}" y="${y(d.cum[i])-12}" width="8" height="8" class="dv-mk3"/>`});
 if(d.midY)g+=`<circle cx="${x(d.midY+1)}" cy="${y(d.cum[d.midY+1])}" r="4" class="dv-mk2"/>`;
 g+=`<text x="${x(d.L+1)-4}" y="${y(d.cum[d.L+1])-8}" text-anchor="end" class="t1 dv-td">Data centre</text><text x="${x(c.L+1)-4}" y="${y(c.cum[c.L+1])+16}" text-anchor="end" class="t1 dv-tc">${c.c.n}</text>`;
 g+=`<text x="${pl}" y="14" class="t3">Cumulative cash (₹ crore, constant 2026 rupees, undiscounted)</text>`;
 sv.innerHTML=g}
function table(d,V){const rows=[];for(let i=0;i<d.rev.length;i++){const t=i-1;rows.push(`<tr${d.buys.includes(t)&&t>0?' class="dv-rf"':''}><td>${t<0?'Build −1':t===0?'Build 0':t}</td><td>${f0(d.rev[i])}</td><td>${f0(d.opx[i])}</td><td>${f0(d.ebitda[i])}</td><td>${f0(d.cap[i])}</td><td>${f0(d.cf[i])}</td><td>${f0(d.cum[i])}</td></tr>`)}
 $('dv-tab').innerHTML=`<table class="aif-t dv-t"><thead><tr><th>Year</th><th>Revenue</th><th>Opex</th><th>EBITDA</th><th>Capex</th><th>Cash</th><th>Cumulative</th></tr></thead><tbody>${rows.join('')}</tbody></table><p class="xs muted">₹ crore. Shaded rows: IT refresh bought at the end of that year. ${d.coolBuys.length?'Cooling replaced in year '+d.coolBuys.map(([y,t])=>y+(t==='room'?' (room side)':' (heat rejection)')).join(', ')+'. ':''}${V.biz==='colo'?'Colocation revenue includes electricity recharged to tenants at the contracted PUE. ':''}The last year's capex is negative: remaining value of the building (10%) and of cooling and IT not yet fully used.</p>`}
function note(d,c,R,S){const r1=d.revS/d.P,r2=c.revS/c.P;const t=[];
 t.push(`Each ₹100 of initial capex earns ₹${f0(r1*100)} of revenue a year in this data centre, against ₹${f0(r2*100)} in a ${c.c.n.toLowerCase()} of the same cost.`);
 if(d.own)t.push(`But ${Math.round(d.itShare*100)}% of its lifetime capex is IT hardware that must be bought ${d.buys.length} times in ${d.L} years, and about 95% of that money goes abroad; only ${Math.round(d.dom*100)}% of the initial spend stays in India, against about ${Math.round(c.dom*100)}% for the ${c.c.n.toLowerCase()}.`);
 else t.push(`As a colocation landlord it only builds the shell and plant (tenants buy and refresh the IT), so its returns look like long-life infrastructure: ${pct(d.irr)} IRR against ${pct(c.irr)}.`);
 t.push(d.npv>=0&&c.npv>=0?`Both create value at ${V.disc}%: NPV ${cr(d.npv)} against ${cr(c.npv)}.`:d.npv>=0?`At ${V.disc}% the data centre creates value (NPV ${cr(d.npv)}) while the ${c.c.n.toLowerCase()} does not (${cr(c.npv)}).`:c.npv>=0?`At ${V.disc}% the ${c.c.n.toLowerCase()} creates value (NPV ${cr(c.npv)}) and the data centre does not (${cr(d.npv)}); try a higher price or a longer refresh cycle.`:`Neither repays a ${V.disc}% cost of capital at these assumptions.`);
 t.push(`Per ₹1,000 crore of capex: ${f0(d.jobs/d.P*1000)} permanent jobs in the data centre against ${f0(c.jobs/c.P*1000)}; on-site water ${f0(d.water/d.P*1000)} kL a year against ${f0(c.water/c.P*1000)} kL.`);
 $('dv-note').innerHTML=t.map(x=>`<p class="small" style="margin:4px 0">${x}</p>`).join('')}
function cmpTable(d,R,V){const keys=Object.keys(DTV.COMP);const cs=keys.map(k=>DTV.comp(k,d.P,V));const col=(o,name,unit)=>`<tr${o.key===V.comp?' class="dv-sel"':''}><td><b>${name}</b><br><span class="xs muted">${unit}</span></td><td>${cr(o.revS)}</td><td>${Math.round(o.marg*100)}%</td><td>${o.L} yr</td><td>${pct(o.irr)}</td><td>${cr(o.npv)}</td><td>${o.pb==null?'—':f1(o.pb)+' yr'}</td><td>${o.mult.toFixed(2)}×</td><td>${f0(o.jobs)}</td><td>${o.water>=1e6?fmt(o.water/1e6,2)+' M':f0(o.water/1000)+' k'}</td><td>${o.elec<0?'makes '+f0(-o.elec/1000):f0(o.elec/1000)}</td><td>${Math.round(o.dom*100)}%</td></tr>`;
 let h=`<table class="aif-t dv-ct"><thead><tr><th>Project, same ${cr(d.P)} capex</th><th>Revenue / yr</th><th>Margin</th><th>Life</th><th>IRR</th><th>NPV at ${V.disc}%</th><th>Payback</th><th>Value multiple</th><th>Jobs</th><th>Water kL/yr</th><th>Electricity GWh/yr</th><th>Spent in India</th></tr></thead><tbody>`+col(d,'Your data centre',`${f0(R.S.mw)} MW · ${R.h.n.split(' (')[0]} · ${V.biz==='colo'?'colocation lease':V.biz==='gpu'?'GPU cloud':'AI tokens + training'}`);
 cs.forEach(o=>{h+=col(o,o.c.n,`${fmt(o.units,o.units<10?2:0)} ${o.c.unit}${o.sub?` · ${Math.round(o.sub*100)}% capex from government`:''}`)});
 $('dv-ctab').innerHTML=h+'</tbody></table>';
 $('dv-basis').innerHTML=keys.map(k=>`<li><b>${DTV.COMP[k].n}:</b> ${DTV.COMP[k].basis}</li>`).join('')}
document.addEventListener('dt:run',draw);draw();
window.__DVX={V,draw,get last(){return last}};
})();
