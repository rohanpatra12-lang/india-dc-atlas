
/* ---------- 17 CARBON-WATER SCHEDULER ---------- */
{
if(document.getElementById('sc-p')){
const SC={blr:{n:'Bengaluru',lo:22,hi:35,dip:.40,gw:STD.gw["Karnataka"],st:'Karnataka'},hyd:{n:'Hyderabad',lo:27,hi:41,dip:.25,gw:STD.gw["Telangana"],st:'Telangana'},mum:{n:'Mumbai',lo:27,hi:34,dip:.20,gw:STD.gw["Maharashtra"],st:'Maharashtra'},che:{n:'Chennai',lo:28,hi:38,dip:.30,gw:STD.gw["Tamil Nadu"],st:'Tamil Nadu'},noi:{n:'Delhi NCR',lo:28,hi:43,dip:.15,gw:STD.gw["Uttar Pradesh"],st:'Uttar Pradesh'}};
let city='blr',sw=1;
const HH=[...Array(24).keys()];
const pW=d=>1.22+.015*Math.max(0,d-25),wW=d=>d<26?0:Math.min(1.6,.1+.107*(d-26)),pD=d=>1.22+.035*Math.max(0,d-25),wD=()=>.03;
function prof(k){const c=SC[k];const DB=HH.map(h=>(c.lo+c.hi)/2+(c.hi-c.lo)/2*Math.cos(2*Math.PI*(h-15)/24));
 const s=HH.map(h=>Math.pow(Math.max(0,Math.sin(Math.PI*(h-6)/12)),1.2)),ms=s.reduce((a,b)=>a+b,0)/24;
 const CI=s.map(v=>STD.co2*(1-c.dip*(v-ms)/(1-ms)));const mc=CI.reduce((a,b)=>a+b,0)/24;const EW=CI.map(v=>c.gw*v/mc);return {DB,CI,EW}}
/* evaluate a plan: arrays of wet/dry IT MW per hour, optional TES shift per hour (MW of IT heat cooled from storage) */
function evalP(P,yw,yd,k,tes){let co2=0,on=0,gr=0,E=0;const n=P.night;
 for(let h=0;h<24;h++){const d=P.DB[h];for(const [y,pp,ww] of [[yw[h],pW(d),wW(d)],[yd[h],pD(d),wD()]]){if(!y)continue;
   let tsh=tes?Math.min(tes[h]*(y/(yw[h]+yd[h])),y):0;const ov=pp-1;
   const eFac=y+ov*(y-tsh)+tsh*n.ov*1.05; /* MWh */
   co2+=y*P.CI[h]+ov*(y-tsh)*P.CI[h]+tsh*n.ov*1.05*P.CI[n.h];
   gr+=(y+ov*(y-tsh))*P.EW[h]+tsh*n.ov*1.05*P.EW[n.h];
   on+=ww*(y-tsh)+tsh*n.w*1.05;E+=eFac}}
 return {co2,on,gr,W:on+gr,Ws:k*on+gr,E}}
function plan(a,k,swi,flex,cap,S){
 const P=prof(city);let nh=0;P.DB.forEach((d,h)=>{if(d<P.DB[nh])nh=h});P.night={h:nh,ov:pW(P.DB[nh])-1,w:wW(P.DB[nh])};
 const avg=.75*cap,firm=avg*(1-flex),FE=avg*flex*24;
 /* baseline: flat, wet */
 const fl=HH.map(()=>avg),z=HH.map(()=>0),B=evalP(P,fl,z,k,null);
 const CR=B.co2,WR=B.Ws;
 const cost=(h,m)=>{const d=P.DB[h],pp=m?pD(d):pW(d),ww=m?wD():wW(d);return a*(pp*P.CI[h])/CR+(1-a)*(k*ww+pp*P.EW[h])/WR};
 const mode=HH.map(h=>swi&&cost(h,1)<cost(h,0)?1:0),c=HH.map(h=>cost(h,mode[h]));
 const L=HH.map(()=>firm);let rem=FE;
 [...HH].sort((x,y)=>c[x]-c[y]).forEach(h=>{const add=Math.min(cap-firm,rem);L[h]+=add;rem-=add});
 const yw=HH.map(h=>mode[h]?0:L[h]),yd=HH.map(h=>mode[h]?L[h]:0);
 let tes=null;
 if(S>0){tes=HH.map(()=>0);const n=P.night;
  const ben=HH.map(h=>{const d=P.DB[h],m=mode[h],ov=(m?pD(d):pW(d))-1,ww=m?wD():wW(d);
   const now=a*(ov*P.CI[h])/CR+(1-a)*(k*ww+ov*P.EW[h])/WR,st=a*(n.ov*1.05*P.CI[n.h])/CR+(1-a)*(k*n.w*1.05+n.ov*1.05*P.EW[n.h])/WR;return now-st});
  let r=S;[...HH].sort((x,y)=>ben[y]-ben[x]).forEach(h=>{if(ben[h]<=0||r<=0)return;const t=Math.min(L[h],r);tes[h]=t;r-=t})}
 const R=evalP(P,yw,yd,k,tes);
 return {P,L,mode,tes,R,B,avg,firm}}
const f0=v=>fmt(v,0),f1=v=>fmt(v,1),pc=(v,b)=>{const x=(v/b-1)*100;return (x>0?'+':'')+x.toFixed(1)+'%'};
const NS='http://www.w3.org/2000/svg';
function chart(p){const el=document.getElementById('sc-ch');const W=Math.max(320,Math.min(900,el.clientWidth||700)),H=W<500?250:280,L=40,R=40,T=14,B=34,pw=W-L-R,ph=H-T-B,cap=val('sc-mw');
 const bw=pw/24,X=h=>L+h*bw,Y=v=>T+ph-v/cap*ph,YC=v=>T+ph-v/1.0*ph;
 let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">`;
 for(let i=0;i<=4;i++){const v=cap*i/4;s+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-width=".5"/><text x="${L-5}" y="${Y(v)+4}" text-anchor="end" class="ax">${f0(v)}</text><text x="${W-R+5}" y="${Y(v)+4}" class="ax">${(i/4).toFixed(2)}</text>`}
 HH.forEach(h=>{const v=p.L[h],y=Y(v),tes=p.tes?p.tes[h]:0;const col=p.mode[h]?'var(--hot)':'var(--cold)';
  s+=`<rect x="${X(h)+1.5}" y="${y}" width="${bw-3}" height="${T+ph-y}" rx="2" fill="${col}" fill-opacity=".8"><title>${h}:00 · ${f0(v)} MW · ${p.mode[h]?'dry':'wet'} · ${p.P.DB[h].toFixed(0)} °C · ${p.P.CI[h].toFixed(2)} t/MWh</title></rect>`;
  if(tes>0)s+=`<rect x="${X(h)+1.5}" y="${y}" width="${bw-3}" height="${Math.min(T+ph-y,tes/cap*ph)}" fill="url(#sc-hatch)"/>`;
  if(h%3===0)s+=`<text x="${X(h)+bw/2}" y="${H-B+14}" text-anchor="middle" class="ax">${h}h</text>`;
  s+=`<text x="${X(h)+bw/2}" y="${H-6}" text-anchor="middle" class="ax" style="font-size:9px;fill:${p.P.DB[h]>=30?'var(--heat)':'var(--muted)'}">${W>560||h%2===0?p.P.DB[h].toFixed(0)+'°':''}</text>`});
 s+=`<defs><pattern id="sc-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="var(--surface)" stroke-width="2"/></pattern></defs>`;
 s+=`<line x1="${L}" x2="${W-R}" y1="${Y(p.avg)}" y2="${Y(p.avg)}" stroke="var(--ink)" stroke-dasharray="4 4" stroke-width="1"/>`;
 s+=`<polyline fill="none" stroke="var(--ink)" stroke-width="2" points="${HH.map(h=>`${X(h)+bw/2},${YC(p.P.CI[h])}`).join(' ')}"/>`;
 s+=`<text x="${L}" y="${T-2}" class="ax">IT MW</text><text x="${W-R}" y="${T-2}" text-anchor="end" class="ax">tCO₂/MWh</text></svg>`;
 s+=`<div class="sc-lg xs"><span><i style="background:var(--cold)"></i>Wet (spray) hour</span><span><i style="background:var(--hot)"></i>Dry hour</span><span><i class="hz"></i>Cooled from storage</span><span><i class="ln"></i>Grid carbon</span><span><i class="ds"></i>Flat baseline load</span><span>Bottom row: dry-bulb °C</span></div>`;
 el.innerHTML=s}
function pareto(cur){const el=document.getElementById('sc-pf');const k=val('sc-k'),fx=val('sc-f')/100,cap=val('sc-mw'),S=val('sc-s');
 const A=[...Array(11).keys()].map(i=>i/10);const g=A.map(a=>plan(a,k,0,fx,cap,S).R),t=A.map(a=>plan(a,k,1,fx,cap,S).R),B=cur.B;
 const all=[...g,...t,B,cur.R];const xs=all.map(r=>r.Ws),ys=all.map(r=>r.co2);
 let x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);const px=(x1-x0)*.08||1,py=(y1-y0)*.12||1;x0-=px;x1+=px;y0-=py;y1+=py;
 const W=Math.max(300,Math.min(520,el.clientWidth||460)),H=260,L=52,R=12,T=10,Bt=38,pw=W-L-R,ph=H-T-Bt,X=v=>L+(v-x0)/(x1-x0)*pw,Y=v=>T+ph-(v-y0)/(y1-y0)*ph;
 let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="${NS}">`;
 for(let i=0;i<=4;i++){const v=y0+(y1-y0)*i/4,u=x0+(x1-x0)*i/4;s+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)" stroke-width=".5"/><text x="${L-5}" y="${Y(v)+4}" text-anchor="end" class="ax">${f0(v)}</text><text x="${X(u)}" y="${H-Bt+18}" text-anchor="${i===0?'start':i===4?'end':'middle'}" class="ax">${f0(u)}</text>`}
 s+=`<text x="${L+pw/2}" y="${H-4}" text-anchor="middle" class="ax">Scarcity-weighted water, kL/day</text><text transform="translate(12 ${T+ph/2}) rotate(-90)" text-anchor="middle" class="ax">CO₂, t/day</text>`;
 const line=(arr,col)=>`<polyline fill="none" stroke="${col}" stroke-width="1.5" points="${arr.map(r=>`${X(r.Ws)},${Y(r.co2)}`).join(' ')}"/>`+arr.map(r=>`<circle cx="${X(r.Ws)}" cy="${Y(r.co2)}" r="3.5" fill="${col}"/>`).join('');
 s+=line(g,'var(--muted)')+line(t,'var(--cold)');
 s+=`<rect x="${X(B.Ws)-5}" y="${Y(B.co2)-5}" width="10" height="10" fill="var(--ink)"><title>Flat baseline</title></rect><circle cx="${X(cur.R.Ws)}" cy="${Y(cur.R.co2)}" r="8" fill="none" stroke="var(--hot)" stroke-width="2.5"><title>Your plan</title></circle></svg>`;
 el.innerHTML=s;
 const c0=t[10],w0=t[0],rate=(w0.co2-c0.co2)>0?(c0.Ws-w0.Ws)/(w0.co2-c0.co2):null;
 document.getElementById('sc-pn').textContent=`With mode switching, going from the carbon-best to the water-best plan saves ${f0(c0.Ws-w0.Ws)} kL of weighted water for ${f1(w0.co2-c0.co2)} t more CO₂${rate?` (about ${f1(rate)} kL per tonne)`:''}. With timing only, the two ends differ by ${f0(g[10].Ws-g[0].Ws)} kL and ${f1(g[0].co2-g[10].co2)} t.`}
function sc(){const sl=val('sc-a')/100,a=1-sl,fx=val('sc-f')/100,k=val('sc-k'),S=val('sc-s'),cap=val('sc-mw');
 out('sc-a',sl===0?'all carbon':sl===1?'all water':Math.round(a*100)+' carbon / '+Math.round(sl*100)+' water');out('sc-f',Math.round(fx*100)+'%');out('sc-k','×'+k.toFixed(1));out('sc-s',S?f0(S)+' MWh':'none');out('sc-mw',f0(cap)+' MW');
 const p=plan(a,k,sw,fx,cap,S),R=p.R,B=p.B;chart(p);
 document.getElementById('sc-r').innerHTML=[[f0(R.co2)+' t',`CO₂ a day (${pc(R.co2,B.co2)} vs flat)`,''],[f0(R.on)+' kL',`On-site water (${pc(R.on,B.on)})`,'cold'],[f0(R.gr)+' kL',`Grid water at power plants (${pc(R.gr,B.gr)})`,'hot'],[f0(R.W)+' kL',`Total water (${pc(R.W,B.W)})`,''],[f0(R.Ws)+' kL',`Scarcity-weighted water (${pc(R.Ws,B.Ws)})`,''],[f0(R.E)+' MWh',`Facility electricity (${pc(R.E,B.E)})`,'']].map(([v,k_,c])=>`<div><span class="v ${c}">${v}</span><span class="k">${k_}</span></div>`).join('');
 const dryH=p.mode.reduce((s,m)=>s+m,0),c=SC[city];
 document.getElementById('sc-n').innerHTML=`${c.n} (${c.st} grid, ${c.lo}–${c.hi} °C): the plan runs ${dryH?`<b>dry for ${dryH} hours</b> (${(()=>{const r=[];let st=null;p.mode.forEach((m,h)=>{if(m&&st===null)st=h;if((!m||h===23)&&st!==null){const e=m?h:h-1;r.push(st===e?st+':00':st+':00–'+(e+1)+':00');st=null}});return r.join(', ')})()})`:'<b>wet every hour</b>'} and places deferrable work in the hours where ${sl>=.5?'water':'carbon'} costs least.${sw?'':' Mode switching is off, so only the timing can change.'}${S?` Storage cools ${f0(p.tes.reduce((x,y)=>x+y,0))} MWh of afternoon heat with cold made at ${p.P.night.h}:00.`:''}`;
 pareto(p)}
seg('sc-city',d=>{city=d.v;sc()});seg('sc-sw',d=>{sw=+d.v;sc()});
['sc-a','sc-f','sc-k','sc-s','sc-mw'].forEach(i=>document.getElementById(i).addEventListener('input',sc));
let rz=null;addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(sc,250)});
sc();
window.__SC={plan};
}
}
