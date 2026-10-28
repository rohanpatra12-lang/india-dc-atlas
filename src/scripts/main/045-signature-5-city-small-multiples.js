
/* ---------- SIGNATURE 5: CITY SMALL MULTIPLES ---------- */
V2.sm=()=>{const el=document.getElementById('v2-sm');if(!el)return;const NM={blr:'Bengaluru',mum:'Mumbai',che:'Chennai',hyd:'Hyderabad',noi:'Delhi NCR',viz:'Visakhapatnam',pun:'Pune'};const mode=el.dataset.m||'pue';
 const W=200,H=110,L=26,B=16,T=10;const yr=mode==='pue'?[1.0,1.65]:[0,2.5];const Y=v=>T+(1-(v-yr[0])/(yr[1]-yr[0]))*(H-T-B),X=i=>L+i*(W-L-6)/11;
 el.innerHTML=Object.keys(NM).filter(k=>CLIM[k]).map(k=>{const cl=CLIM[k];const tw=[],dl=[],ww=[];for(let i=0;i<12;i++){const db=cl.db[i],wb=cl.wb[i];tw.push(1.06+coolOH('tower',db,wb,false));dl.push(1.06+coolOH('dlc',db,wb,true));ww.push(Math.min(2.5,wueOf('tower',db,wb)))}
  const line=(a,c)=>`<polyline points="${a.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ')}" fill="none" stroke="var(${c})" stroke-width="2"/>`;
  const avg=a=>a.reduce((x,v,i)=>x+v*DM[i],0)/365;
  const body=mode==='pue'?line(tw,'--hot')+line(dl,'--cold'):ww.map((v,i)=>`<rect x="${(X(i)-5).toFixed(1)}" y="${Y(v).toFixed(1)}" width="10" height="${(Y(0)-Y(v)).toFixed(1)}" fill="var(--cold)" opacity=".8"/>`).join('');
  const ticks=(mode==='pue'?[1.0,1.2,1.4,1.6]:[0,1,2]).map(v=>`<line x1="${L}" x2="${W-4}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}" stroke="var(--line)"/><text x="${L-3}" y="${(Y(v)+3).toFixed(1)}" text-anchor="end" class="sm-ax">${v}</text>`).join('');
  return `<figure class="sm-c"><figcaption><b>${NM[k]}</b><span class="mono xs">${mode==='pue'?`towers ${avg(tw).toFixed(2)} · liquid ${avg(dl).toFixed(2)}`:`WUE ${avg(ww).toFixed(2)} L/kWh`}</span></figcaption><svg viewBox="0 0 ${W} ${H}">${ticks}${body}<text x="${X(0)}" y="${H-3}" class="sm-ax" text-anchor="middle">J</text><text x="${X(6)}" y="${H-3}" class="sm-ax" text-anchor="middle">J</text><text x="${X(11)}" y="${H-3}" class="sm-ax" text-anchor="middle">D</text></svg></figure>`}).join('')};
document.addEventListener('click',e=>{const b=e.target.closest('#v2-sm-m button');if(!b)return;document.querySelectorAll('#v2-sm-m button').forEach(x=>x.setAttribute('aria-pressed',x===b));document.getElementById('v2-sm').dataset.m=b.dataset.v;V2.sm()});
