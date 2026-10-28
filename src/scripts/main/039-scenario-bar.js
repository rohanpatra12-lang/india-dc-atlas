
/* ---------- SCENARIO BAR ---------- */
const SCN={city:SX.g.city,wl:SX.g.wl,mw:SX.g.mw,cool:SX.g.cool,pw:SX.g.pw,fc:'base'};
const CITYN={blr:'Bengaluru',mum:'Mumbai',che:'Chennai',hyd:'Hyderabad',noi:'Delhi NCR',viz:'Vizag'};
const FCN={low:'Low forecast',base:'Base forecast',high:'High forecast'};
function pressIn(id,attr,v){const b=document.querySelector(`#${id} button[data-${attr}="${v}"]`);if(b&&b.getAttribute('aria-pressed')!=='true')b.click()}
function setRange(id,v){const el=document.getElementById(id);if(!el)return;const lo=+el.min,hi=+el.max;el.value=clamp(v,lo,hi);el.dispatchEvent(new Event('input',{bubbles:true}))}
V2.apply=(S=SCN,quiet)=>{
 SX.g.city=S.city;SX.g.wl=S.wl;SX.g.mw=clamp(S.mw,5,200);SX.g.cool=(S.wl==='ai'&&(S.cool==='aircc'))?'dlc':S.cool;SX.g.pw=S.pw;syncUI();sim();
 pressIn('cx-city','v',S.city);pressIn('cx-wk','v',S.wl==='ai'?'ai':'conv');setRange('cx-mw',S.mw);
 if(['blr','hyd','mum','che','noi'].includes(S.city))pressIn('sc-city','v',S.city);
 pressIn('fc-pre','p',S.fc);setRange('ai-gw',{low:4.2,base:4.66,high:8}[S.fc]);setRange('ai-cl',{grid:0,oa:60,rtc:90}[S.pw]);
 setRange('ai-mw',S.mw);pressIn('ai-grid','v',S.pw==='rtc'?'0.34':S.pw==='oa'?'1.19':'2.9');
 pressIn('ai-cool','v',{tower:'t',adiab:'h',aircc:'t',dlc:'d'}[S.cool]);
 pressIn('re-sc','v',{low:'lo',base:'ce',high:'hi'}[S.fc]);setRange('re-t',S.pw==='rtc'?90:60);
 V2.renderBar();V2.flow&&V2.flow();
 if(!quiet)try{history.replaceState(null,'',location.pathname+location.search+'#s='+[S.city,S.wl,S.mw,S.cool,S.pw,S.fc].join('.'))}catch(e){}
};
document.body.insertAdjacentHTML('beforeend',`<div class="scbar" id="scbar" role="region" aria-label="Scenario">
 <button type="button" class="scbar-sum" id="scbar-sum" aria-expanded="false" aria-controls="scbar-panel"></button>
 <div class="scbar-modes" role="group" aria-label="Reading mode"><button type="button" data-m="brief">Brief</button><button type="button" data-m="analyst" aria-pressed="true">Analyst</button></div>
 <div class="scbar-panel" id="scbar-panel" hidden>
  <div class="scbar-h"><b>One scenario for the whole atlas</b><span class="xs muted">Every chapter's tools follow these settings. Change a chapter's own controls to explore further.</span></div>
  <div class="scbar-grid">
   <label>City<select id="sb-city">${Object.entries(CITYN).map(([k,n])=>`<option value="${k}">${n}</option>`).join('')}</select></label>
   <label>Workload<select id="sb-wl"><option value="colo">Colocation</option><option value="hyp">Hyperscale cloud</option><option value="ai">AI training</option></select></label>
   <label>IT capacity <output id="sb-mw-o"></output><input id="sb-mw" type="range" min="5" max="200" step="5"></label>
   <label>Cooling<select id="sb-cool"><option value="tower">Cooling towers</option><option value="adiab">Adiabatic dry coolers</option><option value="aircc">Air-cooled chillers</option><option value="dlc">Liquid + dry coolers</option></select></label>
   <label>Power<select id="sb-pw"><option value="grid">Grid only</option><option value="oa">60% renewable</option><option value="rtc">90% clean, hourly</option></select></label>
   <label>India forecast<select id="sb-fc"><option value="low">Low</option><option value="base">Base</option><option value="high">High</option></select></label>
  </div>
  <div class="scbar-ab"><button type="button" class="d1-btn" id="sb-pin">Pin as A</button><button type="button" class="d1-btn" id="sb-link">Copy link to this scenario</button><span class="xs muted" id="sb-msg"></span></div>
  <div id="sb-cmp"></div>
 </div></div>`);
const SBA={A:null};
function sbMetrics(S){const gg=Object.assign({},SX.g,{city:S.city,wl:S.wl,mw:clamp(S.mw,5,200),cool:S.cool,pw:S.pw});const m=window.__dcModel(gg);
 return [['PUE (annual)',m.pue.toFixed(2),m.pue],['Electricity',fmt(m.fac,1)+' MU',m.fac],['Water on site',fmt(m.onW/365,2)+' MLD',m.onW/365],['Water at power stations',fmt(m.offW/365,2)+' MLD',m.offW/365],['CO₂',fmt(m.co2)+' t',m.co2],['Annual cost','₹'+fmt(m.annual,1)+' cr',m.annual],['Cost per IT-kWh','₹'+m.lcod.toFixed(1),m.lcod],['Grid connection',fmt(m.mva)+' MVA',m.mva]]}
V2.renderBar=()=>{const S=SCN;
 document.getElementById('scbar-sum').innerHTML=`<span class="sb-k">Scenario</span><b>${CITYN[S.city]}</b><span>${WL[S.wl].n}</span><span>${S.mw} MW</span><span>${COOLN[S.cool]||S.cool}</span><span>${PWN[S.pw]}</span><span>${FCN[S.fc]}</span><span class="sb-edit">Change ▴</span>`;
 ['city','wl','cool','pw','fc'].forEach(k=>{document.getElementById('sb-'+k).value=S[k]});document.getElementById('sb-mw').value=S.mw;document.getElementById('sb-mw-o').textContent=S.mw+' MW';
 const B=sbMetrics(S);let h='';
 if(SBA.A){const A=sbMetrics(SBA.A);h=`<div class="tbl"><table class="aif-t"><thead><tr><th></th><th class="n">A (pinned)</th><th class="n">B (now)</th><th class="n">Change</th></tr></thead><tbody>${B.map((b,i)=>{const a=A[i],d=a[2]?((b[2]-a[2])/a[2]*100):0;return `<tr><td>${b[0]}</td><td class="n">${a[1]}</td><td class="n">${b[1]}</td><td class="n ${d>0.5?'up':d<-0.5?'dn':''}">${Math.abs(d)<0.5?'—':(d>0?'+':'')+d.toFixed(0)+'%'}</td></tr>`}).join('')}</tbody></table></div><p class="xs muted">A: ${CITYN[SBA.A.city]}, ${WL[SBA.A.wl].n}, ${SBA.A.mw} MW, ${COOLN[SBA.A.cool]}, ${PWN[SBA.A.pw]}. Computed with the simulator's model (Build a data centre).</p>`}
 else h=`<div class="read sb-read">${B.slice(0,6).map(b=>`<div><span class="v">${b[1]}</span><span class="k">${b[0]}</span></div>`).join('')}</div><p class="xs muted">Pin this as A, change the scenario, and the differences appear here.</p>`;
 document.getElementById('sb-cmp').innerHTML=h};
document.getElementById('scbar-sum').addEventListener('click',e=>{const p=document.getElementById('scbar-panel'),op=p.hidden;p.hidden=!op;e.currentTarget.setAttribute('aria-expanded',op)});
['city','wl','cool','pw','fc'].forEach(k=>document.getElementById('sb-'+k).addEventListener('change',e=>{SCN[k]=e.target.value;if(k==='wl'&&SCN.wl==='ai'&&SCN.cool==='aircc')SCN.cool='dlc';V2.apply()}));
document.getElementById('sb-mw').addEventListener('input',e=>{SCN.mw=+e.target.value;document.getElementById('sb-mw-o').textContent=SCN.mw+' MW'});
document.getElementById('sb-mw').addEventListener('change',()=>V2.apply());
document.getElementById('sb-pin').addEventListener('click',()=>{SBA.A=Object.assign({},SCN);document.getElementById('sb-msg').textContent='A pinned. Now change the scenario.';V2.renderBar()});
document.getElementById('sb-link').addEventListener('click',()=>{const u=location.href.split('#')[0]+'#s='+[SCN.city,SCN.wl,SCN.mw,SCN.cool,SCN.pw,SCN.fc].join('.');const done=()=>document.getElementById('sb-msg').textContent='Link copied.';try{navigator.clipboard.writeText(u).then(done,()=>{document.getElementById('sb-msg').textContent=u})}catch(e){document.getElementById('sb-msg').textContent=u}});
(()=>{const m=/#s=([a-z]+)\.([a-z]+)\.(\d+)\.([a-z]+)\.([a-z]+)\.([a-z]+)/.exec(location.hash);if(m&&CITYN[m[1]]&&WL[m[2]]){Object.assign(SCN,{city:m[1],wl:m[2],mw:+m[3],cool:m[4],pw:m[5],fc:m[6]});setTimeout(()=>V2.apply(SCN,true),300)}else V2.renderBar()})();
