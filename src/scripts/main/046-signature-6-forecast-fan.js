
/* ---------- SIGNATURE 6: FORECAST FAN ---------- */
const FAN={dots:[[2030,4.2,'it','Cushman & Wakefield'],[2030,4.5,'it','Colliers'],[2030,6.5,'it','S&P Global'],[2030,8,'it','Jefferies'],[2030,9,'it','IEEFA'],[2030,12,'it','Wood Mackenzie'],[2030,8,'pc','MeitY ("power capacity")'],[2030,16,'it','NITI Aayog (40% used)'],[2032,13.56,'gr','MeitY citing MoP'],[2032,17,'gr','CEA'],[2032,26.3,'gr','Ministry of Power (additional)'],[2050,64,'it','NITI Aayog'],[2026,1.789,'it','Operating, H1 2026']],
 atlas:[[2026,1.789],[2030,4.66],[2035,10.8]],niti:[[2030,16],[2050,64]]};
V2.fan=()=>{const el=document.getElementById('v2-fan');if(!el)return;const W=Math.max(320,el.clientWidth||800),H=300,L=44,R=W<520?16:150,T=14,B=30;const x0=2024,x1=2050;const X=y=>L+(y-x0)/(x1-x0)*(W-L-R),Y=v=>T+(1-(Math.log10(v)-0)/(Math.log10(100)))*(H-T-B);
 const band=`<path d="M${X(2026)},${Y(1.789)} L${X(2030)},${Y(12)} L${X(2030)},${Y(4.2)} Z" class="fan-b"/>`;
 const pl=(a,c,d)=>`<polyline points="${a.map(p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join(' ')}" fill="none" stroke="var(${c})" stroke-width="2.4" ${d?'stroke-dasharray="5 4"':''}/>`;
 const col={it:'--cold',pc:'--hot',gr:'--heat'};
 const grid=[1,2,5,10,20,50,100].map(v=>`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${Y(v)+4}" text-anchor="end" class="sm-ax">${v}</text>`).join('')+[2026,2030,2035,2040,2047,2050].map(y=>`<text x="${X(y)}" y="${H-10}" text-anchor="middle" class="sm-ax">${y}</text>`).join('');
 const dots=FAN.dots.map(([y,v,u,n])=>`<circle cx="${X(y)}" cy="${Y(v)}" r="5.5" fill="var(${col[u]})" stroke="var(--surface)" stroke-width="1.5"><title>${n}: ${v} GW (${{it:'IT',pc:'power capacity',gr:'grid load'}[u]})</title></circle>`).join('');
 const lab=W<520?'':`<text x="${X(2035)+8}" y="${Y(10.8)+4}" class="fan-l">Atlas base 10.8 GW (2035)</text><text x="${X(2050)+8}" y="${Y(64)+4}" class="fan-l">NITI 64 GW (2050)</text><text x="${X(2032)+10}" y="${Y(26.3)+4}" class="fan-l">MoP 26.3 GW grid</text><text x="${X(2030)-10}" y="${Y(12)-8}" text-anchor="end" class="fan-l">2030 range 4.2–12</text>`;
 el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Forecast fan chart">${grid}${band}${pl(FAN.atlas,'--ink')}${pl(FAN.niti,'--hot',1)}${dots}${lab}<text x="${L}" y="${T+2}" class="sm-ax">GW (log scale)</text></svg>`};
