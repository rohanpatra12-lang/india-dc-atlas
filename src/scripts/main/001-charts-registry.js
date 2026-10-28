
/* ---------- charts registry ---------- */
const charts={},builders={};
function reg(id,b){builders[id]=b;build(id)}
function build(id){if(typeof Chart==='undefined'||!builders[id]||!document.getElementById(id))return;if(charts[id])charts[id].destroy();Chart.defaults.color=T('--muted');Chart.defaults.borderColor=T('--line');Chart.defaults.font.family=T('--f-body')||'sans-serif';const cfg=builders[id]();try{window.__cjFix&&window.__cjFix(cfg,document.getElementById(id))}catch(e){};charts[id]=new Chart(document.getElementById(id),cfg)}
function rebuildAll(){Object.keys(builders).forEach(build)}
const mq=window.matchMedia('(prefers-color-scheme: dark)');
if(mq.addEventListener)mq.addEventListener('change',()=>setTimeout(rebuildAll,30));
new MutationObserver(()=>setTimeout(rebuildAll,30)).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
const tip=()=>({backgroundColor:T('--ink'),titleColor:T('--bg'),bodyColor:T('--bg'),padding:10,cornerRadius:6});
const base=(x={})=>Object.assign({responsive:true,maintainAspectRatio:false,animation:{duration:450},plugins:{legend:{display:false},tooltip:tip()}},x);
const legendB={display:true,position:'bottom',labels:{boxWidth:12,boxHeight:12}};
const grid=()=>({color:A(T('--line'),.7)});
