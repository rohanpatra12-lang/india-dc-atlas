
/* ---------- CITY WATER RANGE (Chapter 13) ---------- */
(()=>{if(!document.getElementById('cw-p'))return;const X=window.__SIMX;const {coolOH,wueOf,CLIM,DM}=X;
const CWC=[{k:'mum',n:'Mumbai',cl:'mum',live:890,up:1726,sup:4100,gw:STD.gw.India},{k:'hyd',n:'Hyderabad',cl:'hyd',live:151,up:710,sup:2478,gw:STD.gw.India},{k:'che',n:'Chennai',cl:'che',live:214,up:368,sup:1245,gw:STD.gw.India},{k:'noi',n:'Delhi NCR',cl:'noi',live:183,up:387,sup:4555,gw:STD.gw.India},{k:'pun',n:'Pune',cl:'pun',live:133,up:258,sup:1222,gw:STD.gw.India},{k:'blr',n:'Bengaluru',cl:'blr',live:162,up:100,sup:1935,gw:STD.gw.India},{k:'kol',n:'Kolkata',cl:'che',live:22,up:84,sup:1850,gw:STD.gw.India},{k:'viz',n:'Visakhapatnam',cl:'viz',live:0,up:1000,sup:384,gw:STD.gw.India,ann:1}];
const RDS=[{kw:40,f:0},{kw:132,f:.85},{kw:190,f:.9},{kw:600,f:1}];
const HALL={colo:{n:'Colocation',u:.70,ls:.06},hyp:{n:'Hyperscale',u:.75,ls:.06},ai:{n:'AI',u:.80,ls:.06}};
const CN={tower:'towers',adiab:'adiabatic',aircc:'air-cooled chillers',dlc:'liquid + dry'};
let cap='both',rd=1,pw=0,allow=new Set(['tower','adiab','aircc','dlc']),sel='blr';
const cocF=C=>(C/(C-1))/(4/3); /* tower formula is make-up at 4 cycles */
/* one hall, one cooling choice, one month (db, wb) */
function hallAt(c,f,db,wb,C){const cA=c==='dlc'?'aircc':c;let wL=wueOf(c,db,wb),wA=wueOf(cA,db,wb);if(c==='tower'){wL*=cocF(C);wA*=cocF(C)}
 const oL=coolOH(c,db,wb,true),oA=coolOH(cA,db,wb,false);/* liquid reference values already include the residual air plant */return {wue:f>0?wL:wA,oh:f>0?oL:oA}}
function opts(f){return [...allow].filter(c=>!(c==='dlc'&&f===0&&allow.size>1&&!(allow.size===1)))}
function city(c){const cl=CLIM[c.cl],aiL=val('cw-ail')/100,aiU=val('cw-aiu')/100,hy=val('cw-hyp')/100,du=document.getElementById('cw-load').checked?.1:0;
 const parts=[];const add=(mw,ai)=>{if(mw<=0)return;parts.push(['colo',mw*(1-ai)*(1-hy)],['hyp',mw*(1-ai)*hy],['ai',mw*ai])};
 const upMW=c.ann&&!document.getElementById('cw-viz').checked?0:c.up;
 if(cap!=='up')add(c.live,aiL);if(cap!=='live')add(upMW,c.ann?1:aiU);
 const mw=parts.reduce((a,p)=>a+p[1],0);
 const caseOf=(best)=>{let on=0,ps=0,used={};const share=pw;
  parts.forEach(([h,m])=>{if(m<=0)return;const H=HALL[h],f=h==='ai'?RDS[rd].f:0,u=Math.min(.95,Math.max(.3,H.u+(best?-du:du))),C=best?6:3;
   let cs=[...allow];if(f===0)cs=cs.filter(x=>x!=='dlc');if(!cs.length)cs=['aircc'];
   const ann=cs.map(x=>{let w=0,o=0,d=0;for(let i=0;i<12;i++){const r=hallAt(x,f,cl.db[i],cl.wb[i],C);w+=r.wue*DM[i];o+=r.oh*DM[i];d+=DM[i]}return {x,wue:w/d,oh:o/d}});
   const gf0=(1-share)*c.gw+share*.05;const pk=cs.map(x=>{let bm=null;for(let i=0;i<12;i++){const r=hallAt(x,f,cl.db[i],cl.wb[i],C);const v=r.wue+(1+H.ls+r.oh)*gf0;if(!bm||v>bm.v)bm={x,wue:r.wue,oh:r.oh,mo:i,v}}return bm});
   const gf=(1-share)*c.gw+share*.05,tw=o=>o.wue+(1+H.ls+o.oh)*gf;const pick=best?ann.reduce((a,b)=>tw(b)<tw(a)?b:a):pk.reduce((a,b)=>tw(b)>tw(a)?b:a);
   const it=m*u*24;/* MWh a day */const pue=1+H.ls+pick.oh;
   on+=it*pick.wue/1000;ps+=it*pue*((1-share)*c.gw+share*.05)/1000;used[h]={c:pick.x,wue:pick.wue,pue,u,it,m,f,mo:pick.mo,C}});
  return {on,ps,tot:on+ps,used}};
 const b=caseOf(true),w=caseOf(false);return {c,mw,b,w,parts}}
function render(){out('cw-ail',val('cw-ail')+'%');out('cw-aiu',val('cw-aiu')+'%');out('cw-hyp',val('cw-hyp')+'%');
 const rs=CWC.map(city).filter(r=>r.mw>0);const mx=Math.max(...rs.map(r=>r.w.tot))*1.02||1;
 const T={mw:0,bo:0,bp:0,wo:0,wp:0,sup:0};rs.forEach(r=>{T.mw+=r.mw;T.bo+=r.b.on;T.bp+=r.b.ps;T.wo+=r.w.on;T.wp+=r.w.ps;T.sup+=r.c.sup});
 const P=v=>(v/mx*100).toFixed(2)+'%';const F=v=>fmt(v,v<10?1:0);
 document.getElementById('cw-rows').innerHTML=rs.map(r=>`<button type="button" class="cw-row${r.c.k===sel?' on':''}" data-k="${r.c.k}"><span><b>${r.c.n}</b><small>${fmt(r.mw)} MW${r.c.ann?' · announced':''}</small></span><span class="tr"><i class="bo" style="left:0;width:${P(r.b.on)}"></i><i class="bi" style="left:${P(r.b.on)};width:${P(r.b.ps)}"></i><i class="wo" style="left:0;width:${P(r.w.on)}"></i><i class="wi" style="left:${P(r.w.on)};width:${P(r.w.ps)}"></i></span><span class="v">${F(r.b.tot)}–${F(r.w.tot)}<small>MLD in total</small></span></button>`).join('');
 const nm=u=>Object.entries(u).map(([h,v])=>`${HALL[h].n.slice(0,4)}: ${CN[v.c]}`).join(', ');
 document.getElementById('cw-tb').innerHTML=rs.map(r=>`<tr${r.c.k===sel?' class="on"':''}><td><b>${r.c.n}</b></td><td class="n">${fmt(r.mw)}</td><td class="n">${fmt(r.b.on,1)} · ${fmt(r.w.on,1)}</td><td class="n">${fmt(r.b.ps,1)} · ${fmt(r.w.ps,1)}</td><td class="n">${fmt(r.b.tot,1)}–${fmt(r.w.tot,1)}</td><td class="n">${(r.b.tot/r.c.sup*100).toFixed(2)}–${(r.w.tot/r.c.sup*100).toFixed(2)}%</td><td class="xs">${nm(r.b.used)} · <span style="color:var(--bad)">${nm(r.w.used)}</span></td></tr>`).join('')+`<tr class="tot"><td>Total</td><td class="n">${fmt(T.mw)}</td><td class="n">${fmt(T.bo,1)} · ${fmt(T.wo,1)}</td><td class="n">${fmt(T.bp,1)} · ${fmt(T.wp,1)}</td><td class="n">${fmt(T.bo+T.bp,1)}–${fmt(T.wo+T.wp,1)}</td><td class="n">${((T.bo+T.bp)/T.sup*100).toFixed(2)}–${((T.wo+T.wp)/T.sup*100).toFixed(2)}%</td><td></td></tr>`;
 const top=rs.slice().sort((a,b)=>b.w.tot/b.c.sup-a.w.tot/a.c.sup)[0];
 document.getElementById('cw-r').innerHTML=`<div><span class="v">${fmt(T.mw)} MW</span><span class="k">${cap==='live'?'live':cap==='up'?'upcoming':'live + upcoming'} IT capacity in these cities</span></div><div><span class="v cold">${fmt(T.bo,1)} · ${fmt(T.wo,1)} MLD</span><span class="k">on site in the best · worst case</span></div><div><span class="v hot">${fmt(T.bp,1)} · ${fmt(T.wp,1)} MLD</span><span class="k">at power stations in the best · worst case</span></div><div><span class="v">${fmt(T.bo+T.bp,1)}–${fmt(T.wo+T.wp,1)} MLD</span><span class="k">total · ${fmt((T.bo+T.bp)*1e6/135/1e5,1)}–${fmt((T.wo+T.wp)*1e6/135/1e5,1)} lakh people's daily water</span></div><div><span class="v ${top&&top.w.tot/top.c.sup>.01?'bad':''}">${top?top.c.n:'—'}</span><span class="k">highest share of its city's supply in the worst case: ${top?(top.w.tot/top.c.sup*100).toFixed(1)+'%':''}</span></div>`;
 const onlyDry=[...allow].every(x=>x==='aircc'||x==='dlc');
 document.getElementById('cw-n').textContent=(T.wo>0?`Total water spans ${((T.wo+T.wp)/Math.max(.01,T.bo+T.bp)).toFixed(1)}× from best to worst. The best case minimises on-site plus power-station water together, so in humid cities it can keep some evaporative cooling: evaporating a little on site can save more at coal plants than a chiller's extra power would cost. `:'')+(onlyDry?'With only dry or liquid systems allowed, almost all the water left is at the power stations, so the power supply decides the total.':allow.has('tower')?'Switch off cooling towers to see how far the worst case falls.':'')+(cap!=='live'&&document.getElementById('cw-viz').checked?' Visakhapatnam\'s announced hub alone would take a large share of GVMC\'s ~384 MLD supply in the worst case.':'');
 window.__CW={rs,T,sel}}
seg('cw-cap',d=>{cap=d.v;render()});seg('cw-rd',d=>{rd=+d.v;render()});seg('cw-pw',d=>{pw=+d.v;render()});
const cg=document.getElementById('cw-cool');cg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const on=b.getAttribute('aria-pressed')==='true';if(on&&allow.size===1)return;b.setAttribute('aria-pressed',on?'false':'true');on?allow.delete(b.dataset.v):allow.add(b.dataset.v);render()});
['cw-ail','cw-aiu','cw-hyp'].forEach(i=>document.getElementById(i).addEventListener('input',render));['cw-load','cw-viz'].forEach(i=>document.getElementById(i).addEventListener('change',render));
const pick=e=>{const b=e.target.closest('[data-k]');if(!b)return;sel=b.dataset.k;render()};document.getElementById('cw-rows').addEventListener('click',pick);
render();window.__CWX={CWC,HALL,RDS,CN,hallAt,cocF,city,get sel(){return sel},get pw(){return pw},get rd(){return rd}};
})();
