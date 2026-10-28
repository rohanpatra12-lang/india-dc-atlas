
/* ---------- SIGNATURE 2: 8,760-HOUR CLEAN-POWER MAP ---------- */
const HM=(()=>{let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;const sol=[],win=[];
 const mon=d=>Math.min(11,Math.floor(d/30.42));
 const cl=[];for(let d=0;d<365;d++){const m=mon(d),monsoon=m>=5&&m<=8;cl.push(monsoon?.45+.55*rnd():.82+.18*rnd())}
 const wd=[];for(let d=0;d<365;d++){const m=mon(d);const base=[.18,.2,.25,.3,.55,.85,.9,.85,.6,.3,.17,.16][m];wd.push(clamp(base*(.6+.8*rnd()),.02,1))}
 let ss=0,sw=0;for(let d=0;d<365;d++)for(let h=0;h<24;h++){const s=Math.pow(Math.max(0,Math.sin(Math.PI*(h-6)/12)),1.2)*cl[d]*(mon(d)>=2&&mon(d)<=4?1.05:1);const w=clamp(wd[d]*(1+.35*Math.cos(2*Math.PI*(h-21)/24)),0,1);sol.push(s);win.push(w);ss+=s;sw+=w}
 const ks=.22*8760/ss,kw=.35*8760/sw;for(let i=0;i<8760;i++){sol[i]=Math.min(1,sol[i]*ks);win[i]=Math.min(1,win[i]*kw)}
 return {sol,win}})();
function hmSim(pf,t){const N=8760,S=HM.sol,W=HM.win;let a,b,E=0,P=0,cap=Infinity;
 if(pf==='p1'||pf==='p4'){const f=pf==='p4'?2/3:1;a=.5*t*f/.22;b=.5*t*f/.35}
 else if(pf==='p2'){const R=1.184*t;a=2.0*R;b=1.6*R;E=3*R;P=R;cap=R}
 else{a=2.81*t;b=1.76*t;E=2.81*t;P=E/4}
 let soc=E/2,gen=0,cln=0;const c=new Float32Array(N);
 for(let i=0;i<N;i++){let gq=a*S[i]+b*W[i];gen+=gq;let want=Math.min(1,cap);let use=Math.min(gq,want);let sur=gq-use;
  if(E>0){if(use<want){const dch=Math.min(P,want-use,soc*.95);use+=dch;soc-=dch/.95}if(sur>0){const ch=Math.min(P,sur,(E-soc)/.95);soc+=ch*.95}}
  c[i]=Math.min(1,use);cln+=c[i]}
 const ann=pf==='p4'?t:pf==='p2'?cln/N:Math.min(1,gen/N);return {c,hr:cln/N,ann,full:c.reduce((x,v)=>x+(v>.98?1:0),0)}}
window.__hmSim=hmSim;
V2.hm=()=>{const cv=document.getElementById('v2-hm');if(!cv)return;const pfb=document.querySelector('#re-pf button[aria-pressed="true"]');const pf=pfb?pfb.dataset.v:'p1';const t=(+document.getElementById('re-t').value||60)/100;const r=hmSim(pf,t);
 const ctx=cv.getContext('2d');const W=cv.width=730,H=cv.height=216;const cw=W/365,ch=H/24;const c0=css('--sunk')||'#ddd',c1=css('--cold')||'#0a6f7a',night=css('--ink')||'#123';
 const mix=(x)=>{const p=s=>{s=s.replace('#','');return [0,2,4].map(i=>parseInt(s.substr(i,2),16))};const A=p(c0.length===7?c0:'#e1e8e6'),B=p(c1.length===7?c1:'#0a6f7a');return `rgb(${A.map((v,i)=>Math.round(v+(B[i]-v)*x)).join(',')})`};
 for(let d=0;d<365;d++)for(let h=0;h<24;h++){ctx.fillStyle=mix(r.c[d*24+h]);ctx.fillRect(d*cw,(23-h)*ch,cw+.6,ch+.6)}
 document.getElementById('v2-hm-r').innerHTML=`<div><span class="v">${Math.round(r.ann*100)}%</span><span class="k">clean over the year (annual matching${pf==='p4'?', incl. certificates':''})</span></div><div><span class="v ${r.hr<t-.05?'hot':'good'}">${Math.round(r.hr*100)}%</span><span class="k">clean hour by hour</span></div><div><span class="v">${fmt(r.full)}</span><span class="k">of 8,760 hours fully clean</span></div>`;
 V2.hmR={pf,t,...r}};
['#re-pf','#re-t'].forEach(s=>{const el=document.querySelector(s);if(el)el.addEventListener(s==='#re-t'?'input':'click',()=>setTimeout(V2.hm,30))});
