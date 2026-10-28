
/* ---------- 5 CARBON ---------- */
const mxL=['India grid avg (+8% losses)','Karnataka mix','Marginal coal, evening peak','24/7 RE + battery (90% CFE)','France (nuclear)','Norway (hydro)','Nuclear with towers','Gas CCGT'];
const mxC=[.77,.54,1.09,.11,.045,.025,.009,.49],mxW=[4.5,1.8,6.7,.3,1.75,null,2.6,.75];let mxMode='co2';
reg('c-matrix',()=>{const d=mxMode==='co2'?mxC:mxW;const c=mxMode==='co2'?T('--heat'):T('--cold');return {type:'bar',data:{labels:mxL,datasets:[{data:d,backgroundColor:d.map((v,i)=>i===2?T('--bad'):i===3?T('--good'):c),borderRadius:4}]},options:base({indexAxis:'y',scales:{x:{title:{display:true,text:mxMode==='co2'?'Mt CO₂ per TWh':'billion litres consumed per TWh'},grid:grid()},y:{grid:{display:false}}}})}});
seg('mx-toggle',d=>{mxMode=d.m;build('c-matrix')});
const hrs=[580,580,575,575,570,565,560,500,420,330,270,240,220,215,225,260,330,430,540,600,610,600,590,585];
reg('c-hours',()=>({type:'line',data:{labels:hrs.map((_,i)=>String(i).padStart(2,'0')),datasets:[{label:'Average intensity',data:hrs,borderColor:T('--cold'),backgroundColor:A(T('--cold'),.14),fill:true,tension:.35,pointRadius:0,borderWidth:2.5},{label:'Marginal unit (coal)',data:hrs.map((_,i)=>i>=18&&i<=22?1080:980),borderColor:T('--heat'),borderDash:[6,5],pointRadius:0,borderWidth:1.8,fill:false}]},options:base({plugins:{legend:legendB,tooltip:Object.assign(tip(),{callbacks:{title:c=>c[0].label+':00',label:c=>`${c.dataset.label}: ${c.raw} g/kWh`}})},scales:{y:{min:0,max:1200,title:{display:true,text:'gCO₂/kWh'},grid:grid()},x:{grid:{display:false},ticks:{maxTicksLimit:12}}}})}));
function ls(){const mw=val('ls-mw'),h=val('ls-h'),d=val('ls-d'),t=val('ls-t');out('ls-mw',mw+' MW');out('ls-h',h+' h');out('ls-d',d);out('ls-t','₹'+t.toFixed(1));
  const mwh=mw*h*d,co2=mwh*0.30,spread=t*1.2-t*0.8,rs=mwh*1000*spread/1e7;
  readout($('#ls-read'),[[fmt(mwh/1000,1)+' GWh','Moved into solar hours a year','cold'],[fmt(co2)+' t','CO₂ avoided (average basis)','heat'],['₹'+fmt(rs,1)+' cr','Saved on energy charges (₹'+spread.toFixed(2)+'/kWh spread)','good']]);}
['ls-mw','ls-h','ls-d','ls-t'].forEach(i=>document.getElementById(i).addEventListener('input',ls));ls();
const SF=[['Source','Who supplies each hour?',.20],['Timing','Hourly matched? Flexible load in solar hours?',.15],['Location','Marginal factor, losses',.10],['Carbon','tCO₂/MWh',.30],['Water','Site + source water, scarcity-weighted',.25]];
const SP={grid:[2,2,2,2,1.5],green:[5,4.5,4,5,4.5]};let sc=SP.grid.slice();
function renderSc(){$('#sc-ctrls').innerHTML=SF.map(([n,q],i)=>`<div class="ctrl"><label for="sc${i}">${n} <span class="xs muted">· ${q}</span></label><output id="sc${i}-o">${sc[i]}</output><input id="sc${i}" type="range" min="1" max="5" step="0.5" value="${sc[i]}" data-i="${i}"></div>`).join('');scScore()}
function scScore(){const s=sc.reduce((a,v,i)=>a+v*SF[i][2],0);readout($('#sc-read'),[[s.toFixed(1)+' / 5','Weighted score',s>=4?'good':s>=3?'cold':'heat'],[s>=4?'Leading':s>=3?'Improving':'Poor','Verdict']])}
$('#sc-ctrls').addEventListener('input',e=>{const i=+e.target.dataset.i;sc[i]=+e.target.value;out('sc'+i,sc[i]);$$('#sc-presets button').forEach(b=>b.setAttribute('aria-pressed','false'));scScore()});
seg('sc-presets',d=>{sc=SP[d.p].slice();renderSc()});renderSc();
hbars($('#lc-bars'),[['Coal',820,'heat'],['Gas CCGT',490,'hot'],['Solar PV',48],['Hydro',24],['Nuclear',12],['Wind',11.5,'','11']],{max:820});
hbars($('#ws-bars'),[['Coal, tower (India actual)',3400,'heat','~3,400'],['CSP, wet tower',3250,'hot','~3,250'],['Nuclear, tower',2600,'hot','~2,600'],['Gas CCGT, tower',850,'','~850'],['Solar PV (cleaning)',60,'','20–100'],['Wind',2,'','~0']],{max:3400});
reg('c-msft',()=>({type:'bar',data:{labels:['FY20','FY24'],datasets:[{label:'Location-based',data:[4.33,9.96],backgroundColor:T('--heat'),borderRadius:4},{label:'Market-based',data:[0.456,0.259],backgroundColor:T('--cold'),borderRadius:4}]},options:base({plugins:{legend:legendB,tooltip:tip()},scales:{y:{title:{display:true,text:'Mt CO₂e'},grid:grid()},x:{grid:{display:false}}}})}));
