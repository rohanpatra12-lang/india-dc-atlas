
/* ---------- SIGNATURE 1: COAL-TO-CHIP FLOW ---------- */
function sankey(el,cols,links,opt){const W=Math.max(280,el.clientWidth||900),H0=opt.h||260,TP=18,H=H0+TP,nw=14,gap=10,narrow=W<560,pad=opt.pad||(narrow?8:150);
 const colX=i=>pad+(W-2*pad-nw)*i/(cols.length-1);const tot=Math.max(...cols.map(c=>c.reduce((a,n)=>a+n.v,0)));const k=(H0-gap*4)/tot;const pos={};
 cols.forEach((c,ci)=>{let y=TP+(H0-c.reduce((a,n)=>a+n.v*k,0)-gap*(c.length-1))/2;c.forEach(n=>{pos[n.id]={x:colX(ci),y,h:Math.max(1.5,n.v*k),o:0,i:0,n};y+=Math.max(1.5,n.v*k)+gap})});
 let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opt.label)}">`;
 links.forEach(([a,b,v,c])=>{const A=pos[a],B=pos[b];const h=Math.max(1,v*k);const y0=A.y+A.o+h/2,y1=B.y+B.i+h/2;A.o+=h;B.i+=h;const x0=A.x+nw,x1=B.x,mx=(x0+x1)/2;
  svg+=`<path d="M${x0},${y0}C${mx},${y0} ${mx},${y1} ${x1},${y1}" stroke="var(${c})" stroke-opacity=".45" stroke-width="${h}" fill="none"><title>${esc(A.n.l)} → ${esc(B.n.l)}: ${fmt(v,1)} ${opt.u}</title></path>`});
 Object.values(pos).forEach(p=>{const ci=cols.findIndex(c=>c.includes(p.n));const left=ci===0,right=ci===cols.length-1;
  const lx=narrow?(left?p.x:right?p.x+nw:p.x+nw/2):(left?p.x-6:right?p.x+nw+6:p.x+nw/2),ly=narrow?p.y-5:(left||right?p.y+p.h/2+4:p.y-6),an=narrow?(left?'start':right?'end':'middle'):(left?'end':right?'start':'middle');svg+=`<rect x="${p.x}" y="${p.y}" width="${nw}" height="${p.h}" rx="2" fill="var(${p.n.c||'--ink'})"/>`;if(!narrow)svg+=`<text class="fl-t halo" x="${lx}" y="${ly}" text-anchor="${an}">${esc(p.n.l)} <tspan class="fl-v">${fmt(p.n.v,p.n.v<10?1:0)}</tspan></text>`});
 el.innerHTML=svg+'</svg>'+(narrow?`<div class="aif-lg" style="margin-top:4px">${Object.values(pos).map(p=>`<span><i style="background:var(${p.n.c||'--ink'})"></i>${esc(p.n.l)} <b class="mono">${fmt(p.n.v,p.n.v<10?1:0)}</b></span>`).join('')}</div>`:'')}
V2.flow=()=>{const el=document.getElementById('v2-flow');if(!el||!window.__dcModel)return;const m=window.__dcModel(SX.g);
 const grid=m.fac*(1-m.share),cln=m.fac*m.share,ls=m.it*(m.w.ls+m.w.ot),cool=Math.max(0,m.fac-m.it-ls);
 sankey(document.getElementById('v2-fe'),[[{id:'g',l:'Grid (coal-heavy)',v:grid,c:'--heat'},{id:'r',l:'Clean power',v:cln,c:'--good'}].filter(n=>n.v>0.01),[{id:'f',l:'Facility',v:m.fac,c:'--ink'}],[{id:'it',l:'IT (servers, GPUs)',v:m.it,c:'--cold'},{id:'co',l:'Cooling',v:cool,c:'--hot'},{id:'ls',l:'Losses + other',v:ls,c:'--muted'}],[{id:'h',l:'Heat to air',v:m.fac,c:'--heat'}]],
  [['g','f',grid,'--heat'],['r','f',cln,'--good'],['f','it',m.it,'--cold'],['f','co',cool,'--hot'],['f','ls',ls,'--muted'],['it','h',m.it,'--cold'],['co','h',cool,'--hot'],['ls','h',ls,'--muted']].filter(l=>l[2]>0.01),{label:'Energy flow',u:'MU/yr',h:230});
 const ps=m.offW,on=m.onW,ev=m.cons,ds=m.dis;
 sankey(document.getElementById('v2-fw'),[[{id:'ps',l:'Power-station water',v:ps,c:'--hot'},{id:'src',l:'Site water source',v:on,c:'--cold'}],[{id:'pse',l:'Evaporated at power stations',v:ps,c:'--hot'},{id:'mk',l:'Cooling make-up + treatment',v:on,c:'--cold'}],[{id:'vap',l:'Vapour (consumed)',v:ps+ev,c:'--heat'},{id:'dis',l:'Discharged as liquid',v:ds,c:'--cold-2'}]],
  [['ps','pse',ps,'--hot'],['src','mk',on,'--cold'],['pse','vap',ps,'--hot'],['mk','vap',ev,'--heat'],['mk','dis',ds,'--cold-2']].filter(l=>l[2]>0.01),{label:'Water flow',u:'ML/yr',h:200});
 document.getElementById('v2-flow-r').innerHTML=`<div><span class="v">${fmt(m.fac,1)} MU</span><span class="k">electricity a year · PUE ${m.pue.toFixed(2)}</span></div><div><span class="v hot">${fmt((ps)/365,2)} MLD</span><span class="k">evaporated at power stations</span></div><div><span class="v cold">${fmt(on/365,2)} MLD</span><span class="k">drawn on site · ${fmt(ev/365,2)} evaporated</span></div><div><span class="v">${Math.round(ps/(ps+ev)*100)}%</span><span class="k">of the water consumed is at power stations · ${human((ps+ev)/365)}</span></div>`;
 document.getElementById('v2-flow-n').textContent=`${CITYN[SX.g.city]||SX.g.city}, ${WL[SX.g.wl].n}, ${SX.g.mw} MW, ${COOLN[SX.g.cool]}, ${PWN[SX.g.pw]}. Ribbon widths are to scale within each diagram. Change the scenario bar or Build a data centre and both diagrams redraw.`};
document.addEventListener('input',e=>{if(e.target.closest&&e.target.closest('#sim'))setTimeout(()=>V2.flow&&V2.flow(),80)},true);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#sim'))setTimeout(()=>V2.flow&&V2.flow(),80)},true);
window.addEventListener('resize',()=>{clearTimeout(V2.rt);V2.rt=setTimeout(()=>{V2.flow();V2.map&&V2.map();V2.fan&&V2.fan()},200)});
