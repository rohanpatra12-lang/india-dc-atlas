/* ---------- 4.2 How each cooling system works: animated schematics + hour-by-hour model ---------- */
(()=>{if(typeof document==='undefined'||!document.getElementById('ckw'))return;
const $=id=>document.getElementById(id);
const VZ=window.__VZ;if(!VZ||!VZ.hoursOf)return;
const fx=(v,d=0)=>(+v).toLocaleString('en-IN',{maximumFractionDigits:d,minimumFractionDigits:d});
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CITYN={blr:'Bengaluru',pun:'Pune',hyd:'Hyderabad',noi:'Delhi NCR',mum:'Mumbai',che:'Chennai',viz:'Visakhapatnam'};

/* ---- physics (per kWh of IT heat) ---- */
const EVAP=3.6/2.43;              /* L of water evaporated to carry 1 kWh of heat as latent heat */
const COC=4,BLOW=COC/(COC-1);     /* tower cycles of concentration; make-up = evaporation × 4/3 */
const LAT=.8;                     /* share of tower heat leaving as evaporation (rest sensible) */
const PAD=.148*1.15;              /* adiabatic pre-cooling: L/kWh per K of air pre-cooling (10 K air rise across coil), plus 15% pad bleed */
const OTHER=.06;                  /* UPS, distribution and lighting losses, added to get PUE */
const cop=(te,tc)=>cl(.45*(te+273.15)/Math.max(4,tc-te),2,9);   /* 45% of Carnot, capped 2–9 */

/* chilled-water plant with a dry free-cooling coil (air-cooled chiller): returns free share, compressor kWh per kWh of heat */
function accPlant(h,sup,ret){const tfc=h.DB+5,f=cl((ret-tfc)/(ret-sup),0,1),c=(1-f)/cop(sup-2,h.DB+15);return {f,c,tfc}}
/* liquid (facility water) loop to dry coolers with optional adiabatic assist and a trim chiller */
function liqPlant(h,ts,adi){const ret=ts+10,dry=h.DB+6;let pre=0,src=dry;
 if(dry>ts&&adi){pre=Math.min(dry-ts,.8*(h.DB-h.WB));src=dry-pre}
 const f=cl((ret-src)/(ret-ts),0,1),c=(1-f)/cop(ts-2,h.DB+12);return {f,c,pre,src,dry,ret}}

const SYS={
 crac:{n:'Room air units (DX, refrigerant)',short:'DX room units',
  run(h){const fans=.06,cf=.02,c=(1+fans)/cop(8,h.DB+18);
   return {comp:1,water:0,cool:fans+cf+c,cop:cop(8,h.DB+18),t:{sa:18,ra:32,cond:h.DB+18}}}},
 twr:{n:'Air handlers + water-cooled chiller + cooling tower',short:'Chiller + tower',
  run(h){const sup=18,ret=26,tw=h.WB+4,f=cl((ret-(tw+2))/(ret-sup),0,1),cp=cop(sup-2,tw+6),c=(1-f)/cp,ov=.04+.015+.015+.01;
   const q=1+ov+c,water=EVAP*LAT*q*BLOW;
   return {comp:1-f,water,cool:ov+c,cop:cp,t:{sa:20,ra:32,sup,ret,tw,twr:tw+5.5}}}},
 acc:{n:'Air handlers + air-cooled chiller with free-cooling coil',short:'Air-cooled chiller',
  run(h){const p=accPlant(h,18,26),ov=.04+.02+.025;
   return {comp:1-p.f,water:0,cool:ov+p.c,cop:cop(16,h.DB+15),t:{sa:20,ra:32,sup:18,ret:26,fc:p.tfc,mid:Math.min(26,p.tfc+2)}}}},
 iec:{n:'Indirect evaporative cooling units',short:'Indirect evaporative',
  run(h){const R=36,S=24,e=.7,dry=R-e*(R-h.DB);let pre=0,sa=dry,trim=0;
   if(dry>S){const need=h.DB-(R-(R-S)/e),max=.85*(h.DB-h.WB);pre=cl(need,0,max);const tw=h.DB-pre;sa=R-e*(R-tw);if(sa>S)trim=cl((sa-S)/(R-S),0,1)}
   const cp=cop(12,h.DB-pre+15),ov=.05+(pre>0?.005:0);
   return {comp:trim,water:PAD*pre,cool:ov+trim/cp,cop:cp,pre,t:{sa:Math.min(sa,S),hx:sa,ra:R,sec:h.DB-pre,ex:h.DB-pre+(R-sa)*.8}}}},
 dlc:{n:'Direct-to-chip liquid cooling + dry coolers',short:'Direct-to-chip',liq:1,
  run(h,o){const L=.8,p=liqPlant(h,o.ts,o.adi),a=accPlant(h,20,28),ov=L*(.01+.01+.02)+(1-L)*(.03+.02);
   return {comp:L*(1-p.f)+(1-L)*(1-a.f),water:L*PAD*p.pre,cool:ov+L*p.c+(1-L)*a.c,main:1-p.f,res:1-a.f,cop:cop(o.ts-2,h.DB+12),pre:p.pre,liqF:p.f,airF:a.f,
    t:{tcs:o.ts+3,tcsr:o.ts+13,ts:o.ts,tr:p.ret,src:p.src,dry:p.dry,sup:20,ret:28}}}},
 rdhx:{n:'Rear-door heat exchangers on chilled water',short:'Rear-door coils',
  run(h){const p=accPlant(h,20,28),ov=.02+.025;
   return {comp:1-p.f,water:0,cool:ov+p.c,cop:cop(18,h.DB+15),t:{sup:20,ret:28,ra:36,ex:24,fc:p.tfc,mid:Math.min(28,p.tfc+2)}}}},
 imm:{n:'Single-phase immersion tanks',short:'Immersion',liq:1,
  run(h,o){const p=liqPlant(h,o.ts,o.adi),ov=.015+.01+.02;
   return {comp:1-p.f,water:PAD*p.pre,cool:ov+p.c,cop:cop(o.ts-2,h.DB+12),pre:p.pre,liqF:p.f,t:{oil:o.ts+15,oilr:o.ts+5,ts:o.ts,tr:p.ret,src:p.src,dry:p.dry}}}}
};
const klass=r=>{const c=r.main!=null?r.main:r.comp;return c>.6?3:c>.001?2:r.water>.001?1:0};
const CLS=[['--good','No compressor, no water'],['--cold','No compressor, uses water'],['--warn','Compressor part of the time'],['--hot','Compressor carries the load']];
function annual(sys,city,o){let w=0,cool=0,water=0;const n=[0,0,0,0];VZ.hoursOf(city,0).forEach(h=>{const r=SYS[sys].run(h,o);w+=h.d;cool+=r.cool*h.d;water+=r.water*h.d;n[klass(r)]+=h.d});
 return {pue:1+cool/w+OTHER,wue:water/w,share:n.map(x=>x/w)}}

/* ---- state ---- */
const ST={sys:'dlc',city:'blr',m:4,hh:15,ts:40,adi:true,play:null};
let HRS=VZ.hoursOf(ST.city,0);
const hour=()=>HRS[ST.m*24+ST.hh];

/* ---- SVG kit ---- */
const tcol=t=>{const p=cl((t-15)/40,0,1);return `color-mix(in oklab,var(--heat) ${Math.round(p*100)}%,var(--cold))`};
const B=(x,y,w,h,t,s,c='')=>`<rect class="d-box ${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/><text class="d-t" x="${x+w/2}" y="${y+h/2-(s?4:-4)}" text-anchor="middle">${t}</text>`+(s?`<text class="d-s ck-live" x="${x+w/2}" y="${y+h/2+13}" text-anchor="middle">${s}</text>`:'');
/* pipe: base stroke coloured by temperature + moving dashes; on=0..1 flow strength */
const P=(d,t,on=1,w=5)=>`<path d="${d}" fill="none" stroke="${tcol(t)}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${on>0?1:.25}"/>`+(on>0?`<path class="ck-flow" d="${d}" fill="none" stroke="var(--surface)" stroke-width="${Math.max(1.5,w-3)}" stroke-dasharray="3 11" stroke-linecap="round" style="animation-duration:${(1.6/Math.max(.25,on)).toFixed(2)}s"/>`:'');
/* air stream: wide translucent band */
const A=(d,t,on=1)=>`<path d="${d}" fill="none" stroke="${tcol(t)}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="${on>0?.35:.1}"/>`+(on>0?`<path class="ck-flow ck-air" d="${d}" fill="none" stroke="${tcol(t)}" stroke-width="3" stroke-dasharray="10 14" stroke-linecap="round"/>`:'');
const L=(x,y,s,a='middle',c='d-s')=>`<text class="${c} ck-live" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const fan=(x,y,on,r=11)=>`<g transform="translate(${x} ${y})"><circle r="${r+2}" class="ck-fanr"/><g class="ck-fan${on?' on':''}"><path d="M0 0 L${r} -3 A${r} ${r} 0 0 1 ${r} 3Z M0 0 L-${r} 3 A${r} ${r} 0 0 1 -${r} -3Z M0 0 L3 ${r} A${r} ${r} 0 0 1 -3 ${r}Z M0 0 L-3 -${r} A${r} ${r} 0 0 1 3 -${r}Z"/></g></g>`;
const comp=(x,y,s)=>{const st=s>.6?'on':s>.001?'part':'off';return `<g transform="translate(${x} ${y})" class="ck-comp ${st}"><circle r="15"/><path d="M-7 5 L0 -7 L7 5Z"/><text x="0" y="30" text-anchor="middle" class="d-s ck-live">${st==='off'?'compressor off':st==='part'?'compressor '+Math.round(s*100)+'%':'compressor on'}</text></g>`};
const spray=(x,y,w,on)=>on?`<g class="ck-drops">${[...Array(Math.round(w/14))].map((_,i)=>`<circle cx="${x+7+i*14}" cy="${y}" r="2.2" style="animation-delay:${(i%4)*.2}s"/>`).join('')}</g>`:'';
const N=(n,x,y)=>`<g class="ck-step"><circle cx="${x}" cy="${y}" r="10"/><text x="${x}" y="${y+4}" text-anchor="middle">${n}</text></g>`;
const zone=(x,w,t)=>`<rect class="ck-zone" x="${x}" y="6" width="${w}" height="348" rx="10"/><text class="ck-zt" x="${x+12}" y="24">${t}</text>`;
const ZONES=(a,b,c)=>zone(6,300,a)+zone(314,300,b)+zone(622,272,c);
const rack=(x,y,h=150,lab='Racks')=>`<rect class="d-box" x="${x}" y="${y}" width="70" height="${h}" rx="6"/>${[...Array(Math.floor(h/18))].map((_,i)=>`<rect class="ck-srv" x="${x+8}" y="${y+8+i*18}" width="54" height="11" rx="2"/>`).join('')}<text class="d-t" x="${x+35}" y="${y+h+18}" text-anchor="middle">${lab}</text>`;
const c1=v=>fx(v,1)+' °C';
const sky=(x,y,on)=>on?`<g class="ck-rise"><path d="M${x} ${y} q-8 -10 0 -20 q8 -10 0 -20" /><path d="M${x+18} ${y} q-8 -10 0 -20 q8 -10 0 -20"/><path d="M${x-18} ${y} q-8 -10 0 -20 q8 -10 0 -20"/></g>`:'';

/* ---- one schematic per system ---- */
const AHU=(t)=>A('M150 300 H110 V260',t.sa)+A('M110 105 V70 H232 V105',t.ra)+rack(75,105)+B(185,105,95,195,'Air handler','')+fan(232,135,1)+`<rect class="ck-coil on" x="195" y="232" width="75" height="34" rx="4"/>`+
  L(140,60,'hot air '+c1(t.ra))+L(150,330,'cold air '+c1(t.sa));
const ROOF=(h,r,t)=>B(650,120,105,110,'Free-cooling coil',r.comp<1?Math.round((1-r.comp)*100)+'% free':'too warm',r.comp<1?'c':'')+B(770,120,110,110,'Chiller','',r.comp>0?'h':'')+comp(825,195,r.comp)+
  P('M755 175 H770',t.mid,1,4)+P('M825 230 V255 H800',t.sup,1)+fan(702,108,1)+fan(825,108,r.comp>0)+sky(765,80,1)+
  L(702,280,'coil outlet '+c1(t.fc))+L(765,40,'outdoor air '+c1(h.DB))+L(765,56,'no water used');
const TRIM=(t,tc)=>B(450,190,110,50,'Trim chiller',tc>0?'cools '+Math.round(tc*100)+'% of heat':'bypassed',tc>0?'h':'')+comp(505,285,tc);
const DRY=(h,r,o,t)=>{const wet=r.pre>0;return B(660,110,210,140,'Dry cooler','')+`<rect class="ck-coil on" x="680" y="150" width="170" height="50" rx="4"/>`+fan(725,100,1)+fan(805,100,1)+
  (o.adi?`<rect class="ck-pad${wet?' on':''}" x="672" y="262" width="186" height="14" rx="3"/>`+spray(676,288,180,wet):'')+sky(765,78,1)+
  L(765,232,'water leaves at '+c1(t.src))+L(765,318,o.adi?(wet?'adiabatic pads on: '+fx(r.water,2)+' L/kWh':'adiabatic pads dry'):'no adiabatic pads')+L(765,40,'outdoor '+c1(h.DB)+', wet-bulb '+c1(h.WB))};
const DRAW={
 crac(h,r){const t=r.t;return ZONES('Data hall','Plant room','Outside')+
  A('M156 300 H110 V260','18')+A('M110 105 V70 H235 V105',32)+
  rack(75,105)+B(190,105,90,195,'CRAC','','')+fan(235,128,1)+`<rect class="ck-coil on" x="200" y="150" width="70" height="30" rx="4"/>`+comp(235,250,1)+
  L(140,60,'hot air '+c1(t.ra))+L(150,330,'cold air under the floor '+c1(t.sa))+
  P('M280 230 H700',t.cond,1)+P('M700 275 H280',t.cond-8,1)+L(468,222,'hot refrigerant gas')+L(468,295,'liquid refrigerant back')+
  L(464,160,'no plant room: refrigerant')+L(464,175,'pipes run to the roof')+
  B(700,190,170,110,'Condenser','condensing at '+c1(t.cond))+fan(745,180,1)+fan(825,180,1)+sky(785,150,1)+L(785,95,'heat to outdoor air '+c1(h.DB))+
  N(1,92,90)+N(2,250,60)+N(3,212,250)+N(4,690,180)},
 twr(h,r){const t=r.t,f=1-r.comp,ch=r.comp>0?1:0;return ZONES('Data hall','Plant room','Outside')+AHU(t)+
  P('M280 160 H325 V100 H360',t.ret,ch)+P('M325 160 V255 H360',t.ret,f)+P('M360 130 H345 V205 H280',t.sup,ch)+P('M360 280 H345 V205',t.sup,f)+
  L(300,150,c1(t.ret))+L(300,222,c1(t.sup))+
  B(360,70,130,80,'Chiller',ch?'COP '+fx(r.cop,1):'idle',ch?'h':'')+comp(425,182,r.comp)+
  B(360,235,130,70,'Plate HX',f>0?'free cooling '+Math.round(f*100)+'%':'off',f>0?'c':'')+
  P('M490 90 H570 V160 H700',t.twr,ch)+P('M490 250 H570 V160',t.twr,f)+P('M700 290 H600 V130 H490',t.tw,ch)+P('M600 285 H490',t.tw,f)+
  B(700,110,170,210,'','')+`<text class="d-t" x="785" y="132" text-anchor="middle">Cooling tower</text>`+spray(712,170,146,1)+`<rect class="ck-fill" x="712" y="185" width="146" height="60" rx="4"/>`+fan(785,104,1)+sky(785,84,1)+
  L(785,268,'water out '+c1(t.tw))+L(785,284,'= wet-bulb '+c1(h.WB)+' + 4 K')+L(785,40,'evaporates '+fx(r.water,2)+' L per kWh of IT')+
  P('M880 340 H780 V320',22,1,3)+L(872,334,'make-up','end')+
  N(1,92,90)+N(2,318,85)+N(3,425,58)+N(4,350,318)+N(5,690,120)},
 acc(h,r){const t=r.t;return ZONES('Data hall','Plant room (pumps)','Outside (roof)')+AHU(t)+
  P('M280 175 H650',t.ret,1)+P('M800 255 H280',t.sup,1)+L(465,165,'chilled-water return '+c1(t.ret))+L(465,280,'chilled-water supply '+c1(t.sup))+
  `<g class="ck-pump" transform="translate(465 255)"><circle r="12"/><path d="M-5 -6 L7 0 L-5 6Z"/></g>`+ROOF(h,r,t)+
  N(1,92,90)+N(2,465,140)+N(3,640,110)+N(4,770,105)},
 iec(h,r){const t=r.t,wet=r.pre>0;return ZONES('Data hall','IEC unit (on the wall)','Outside air')+
  `<rect class="d-box" x="340" y="50" width="270" height="280" rx="8"/>`+rack(75,105)+A('M110 105 V70 H400 V110',t.ra)+A('M400 232 V290 H120 V260',t.sa)+L(230,60,'hot aisle '+c1(t.ra))+L(230,312,'supply air '+c1(t.sa))+
  `<g class="ck-hx">${[...Array(8)].map((_,i)=>`<path d="M${420+i*16} 112 l50 60 l-50 60"/>`).join('')}</g>`+
  `<text class="d-t" x="475" y="72" text-anchor="middle">Air-to-air heat exchanger</text>`+spray(420,100,150,wet)+
  A('M880 300 H585 V232',h.DB)+A('M585 112 V36 H880',t.ex)+fan(700,36,1)+
  `<rect class="ck-coil${r.comp>0?' on':''}" x="370" y="262" width="60" height="22" rx="4"/>`+comp(470,272,r.comp)+
  L(745,322,'outdoor air '+c1(h.DB)+(wet?' → '+c1(t.sec)+' after spray':''))+L(745,62,'exhaust '+c1(t.ex)+', never touches servers')+
  L(745,180,wet?'wet mode: spray on':'dry mode: no water')+L(745,196,wet?fx(r.water,2)+' L per kWh of IT':'')+
  N(1,92,90)+N(2,350,62)+N(3,870,280)+N(4,412,100)+N(5,355,273)},
 dlc(h,r,o){const t=r.t,tc=1-r.liqF;return ZONES('Data hall','Plant room','Outside')+
  rack(60,95)+`<rect class="ck-plate" x="75" y="120" width="40" height="8"/><rect class="ck-plate" x="75" y="156" width="40" height="8"/><rect class="ck-plate" x="75" y="192" width="40" height="8"/>`+
  P('M115 124 H160 M115 160 H160 M115 196 H160',t.tcsr,1,3)+P('M160 110 H200',t.tcsr,1)+P('M200 230 H150 V210 H95 V200',t.tcs,1,3)+
  B(200,95,90,150,'CDU','pumps + HX')+L(245,82,'chip loop '+c1(t.tcs)+' → '+c1(t.tcsr))+
  A('M95 245 V292 H165','34',1)+B(165,270,135,56,'Rear door','20% of heat')+L(232,344,'chilled water '+c1(t.sup)+', small chiller')+
  P('M290 130 H660',t.tr,1)+P('M660 215 H560',t.ts,1)+P('M450 215 H290',t.ts,1)+L(470,122,'facility water return '+c1(t.tr))+L(370,206,'supply '+c1(t.ts))+
  TRIM(t,tc)+DRY(h,r,o,t)+
  N(1,48,110)+N(2,245,60)+N(3,300,150)+N(4,650,110)+N(5,440,180)+N(6,155,262)},
 rdhx(h,r){const t=r.t;return ZONES('Data hall','Plant room (pumps)','Outside (roof)')+
  rack(100,105,160,'Racks + rear doors')+`<rect class="ck-door" x="170" y="105" width="14" height="160" rx="3"/>`+
  A('M30 185 H100',t.ex)+A('M184 185 H250',t.ex)+L(60,210,'room '+c1(t.ex))+L(220,210,'out '+c1(t.ex))+L(150,80,'exhaust '+c1(t.ra)+' → door coil')+
  P('M184 125 H260 V160 H650',t.ret,1)+P('M800 255 H260 V245 H184',t.sup,1)+L(465,152,'return '+c1(t.ret))+L(465,280,'chilled water '+c1(t.sup))+
  `<g class="ck-pump" transform="translate(465 255)"><circle r="12"/><path d="M-5 -6 L7 0 L-5 6Z"/></g>`+ROOF(h,r,t)+
  N(1,88,95)+N(2,196,95)+N(3,465,128)+N(4,640,110)},
 imm(h,r,o){const t=r.t,tc=1-r.liqF;return ZONES('Data hall','Plant room','Outside')+
  `<rect class="d-box" x="30" y="120" width="170" height="160" rx="8"/><rect class="ck-oil" x="36" y="140" width="158" height="134" rx="4"/>${[0,1,2,3,4,5].map(i=>`<rect class="ck-srv" x="${50+i*24}" y="152" width="12" height="108" rx="2"/>`).join('')}<text class="d-t" x="115" y="300" text-anchor="middle">Tank of dielectric oil</text>`+
  P('M194 150 H250',t.oil,1)+P('M250 255 H194',t.oilr,1)+L(115,108,'oil '+c1(t.oilr)+' → '+c1(t.oil))+
  B(250,120,90,150,'Plate HX','oil → water')+
  P('M340 140 H660',t.tr,1)+P('M660 215 H560',t.ts,1)+P('M450 215 H340',t.ts,1)+L(500,132,'facility water return '+c1(t.tr))+L(395,206,'supply '+c1(t.ts))+
  TRIM(t,tc)+DRY(h,r,o,t)+
  N(1,22,130)+N(2,222,138)+N(3,295,108)+N(4,650,110)+N(5,440,180)}
};

/* ---- step-by-step text ---- */
const STEPS={
 crac:['Server fans pull cold air (about 18 °C) from a raised floor through the racks.','Hot air (about 32 °C) rises and returns to the room unit, where it crosses an evaporator coil.','Refrigerant boils in the coil and takes the heat; a compressor squeezes the vapour so it can be hotter than outdoor air.','Outdoor condenser fans blow air over the hot refrigerant, which condenses and flows back. The compressor runs every hour of the year; no water is used.'],
 twr:['Racks breathe in cold air from the air handler; hot air goes back to its coil.','Chilled water at about 18 °C cools the coil and returns at about 26 °C.','When outdoor air is warm, the chiller compressor moves the heat from chilled water into condenser water.','When the tower water is cold enough, a plate heat exchanger bypasses the chiller ("free cooling").','The cooling tower sprays condenser water over fill. Part of it evaporates, cooling the rest to about 4 K above the wet-bulb temperature. Make-up water replaces evaporation and blowdown.'],
 acc:['Racks are cooled by air handlers, as with a tower plant.','Pumps send chilled-water return (about 26 °C) up to the roof.','When outdoor air is cool, the free-cooling coil in front of the chiller pre-cools the water, partly or fully.','The chiller compressor removes whatever heat is left and rejects it to outdoor air with fans. No water evaporates, but the compressor works harder on hot afternoons.'],
 iec:['Hot-aisle air (about 36 °C) is ducted to a unit on the outside wall.','It passes through one side of an air-to-air heat exchanger and comes back at 24 °C.','Outdoor air flows through the other side and carries the heat away; the two air streams never mix.','On hot hours, water is sprayed into the outdoor-air channels; evaporation drops their temperature towards the wet-bulb.','On the hottest, most humid hours a small refrigerant (DX) coil trims the supply air.'],
 dlc:['Cold plates sit directly on the GPUs and CPUs; liquid flows through micro-channels.','A coolant distribution unit (CDU) pumps the chip loop and passes its heat to facility water through a heat exchanger (2–4 K approach).','Facility water returns warm, about 10 K above supply.','Dry coolers reject that heat to outdoor air with fans. Warm water (W40–W45) is above outdoor temperature most hours, so no compressor is needed.','On the hottest hours, adiabatic pads pre-cool the inlet air, or a trim chiller tops up.','About 20% of the heat still leaves in air (memory, power supplies, network gear) and needs a small chilled-water loop, here with rear-door coils.'],
 rdhx:['A water coil replaces the rack\'s rear door; server fans push their hot exhaust through it.','The door coil cools the air back to room temperature before it leaves the rack, so the room stays neutral.','Chilled water at about 20 °C feeds the doors and returns about 8 K warmer.','The plant on the roof uses a free-cooling coil when outdoor air is cool and a chiller for the rest. Doors handle 40–75 kW per rack, a bridge for AI racks in existing halls.'],
 imm:['Servers sit fully submerged in a tank of dielectric oil, which carries away all of their heat.','A pump circulates the warm oil (about 15 K above facility water) to a plate heat exchanger.','The heat exchanger passes the heat to facility water.','Dry coolers reject it outside; adiabatic pads or a trim chiller help on the hottest hours.','There is no residual air load. In two-phase immersion the fluid boils at about 49–50 °C instead and condenses on a coil above the tank, but those fluorinated fluids face PFAS restrictions.']
};

/* ---- render ---- */
const opts=()=>({ts:ST.ts,adi:ST.adi});
function draw(){const h=hour(),s=SYS[ST.sys],r=s.run(h,opts()),k=klass(r);
 $('ck-svg').innerHTML=DRAW[ST.sys](h,r,opts());
 $('ck-when').textContent=`${MON[ST.m]}, ${String(ST.hh).padStart(2,'0')}:00 · ${CITYN[ST.city]} typical day`;
 readout($('ck-r'),[[c1(h.DB),'outdoor air · wet-bulb '+c1(h.WB)],[`<span style="color:var(${CLS[k][0]})">${CLS[k][1]}</span>`,'this hour'],
  [fx(r.cool*100,0)+'%','cooling electricity as a share of IT power'+(r.res!=null?` · the 20% air loop's chiller is ${r.res>.001?'running ('+Math.round(r.res*100)+'% of its heat)':'off'}`:'')],[fx(r.water,2)+' L','water per kWh of IT this hour',r.water>0?'cold':'']]);
 $('ck-steps').innerHTML=STEPS[ST.sys].map(x=>`<li>${x}</li>`).join('');
 document.querySelectorAll('#ck-strip rect[data-i]').forEach(e=>e.classList.toggle('cur',+e.dataset.i===ST.m*24+ST.hh));
 $('ck-ts-w').hidden=!s.liq;
}
function strip(){const o=opts(),cw=26,ch=9,sv=$('ck-strip');let g='';
 HRS.forEach((h,i)=>{const k=klass(SYS[ST.sys].run(h,o));g+=`<rect data-i="${i}" x="${30+h.m*cw}" y="${4+h.hh*ch}" width="${cw-2}" height="${ch-1}" rx="1.5" fill="var(${CLS[k][0]})"><title>${MON[h.m]} ${h.hh}:00 · ${c1(h.DB)} · ${CLS[k][1]}</title></rect>`});
 g+=MON.map((m,i)=>`<text class="d-s" x="${30+i*cw+12}" y="232" text-anchor="middle">${m[0]}</text>`).join('')+[0,6,12,18].map(hh=>`<text class="d-s" x="24" y="${4+hh*ch+8}" text-anchor="end">${hh}h</text>`).join('');
 sv.innerHTML=g;
 const a=annual(ST.sys,ST.city,o);
 $('ck-ann').innerHTML=a.share.map((x,i)=>x>.005?`<span><i style="background:var(${CLS[i][0]})"></i>${Math.round(x*100)}% ${CLS[i][1].toLowerCase()}</span>`:'').join('')+`<span class="mono">PUE ≈ ${fx(a.pue,2)} · WUE ${fx(a.wue,2)} L/kWh</span>`;
 table();draw()}
function table(){const o=opts(),rows=Object.keys(SYS).map(k=>[k,annual(k,ST.city,o)]);
 $('ck-tbl').innerHTML=`<thead><tr><th>${CITYN[ST.city]}, typical year</th><th class="n">PUE ≈</th><th class="n">On-site WUE, L/kWh</th><th class="n">Hours with no compressor</th></tr></thead><tbody>`+
  rows.map(([k,a])=>`<tr data-k="${k}"${k===ST.sys?' class="on"':''}><td>${SYS[k].n}</td><td class="n">${fx(a.pue,2)}</td><td class="n">${fx(a.wue,2)}</td><td class="n">${Math.round((a.share[0]+a.share[1])*100)}%</td></tr>`).join('')+'</tbody>'}

/* ---- controls ---- */
seg('ck-sys',d=>{ST.sys=d.v;strip()});
seg('ck-city',d=>{ST.city=d.v;HRS=VZ.hoursOf(ST.city,0);strip()});
seg('ck-ts',d=>{ST.ts=+d.v;strip()});
seg('ck-adi',d=>{ST.adi=d.v==='1';strip()});
const sync=()=>{$('ck-m').value=ST.m;$('ck-h').value=ST.hh;out('ck-m',MON[ST.m]);out('ck-h',String(ST.hh).padStart(2,'0')+':00')};
$('ck-m').addEventListener('input',e=>{ST.m=+e.target.value;sync();draw()});
$('ck-h').addEventListener('input',e=>{ST.hh=+e.target.value;sync();draw()});
$('ck-strip').addEventListener('click',e=>{const t=e.target.closest('rect[data-i]');if(!t)return;const i=+t.dataset.i;ST.m=Math.floor(i/24);ST.hh=i%24;sync();draw()});
$('ck-hot').addEventListener('click',()=>{let b=0;HRS.forEach((h,i)=>{if(h.DB>HRS[b].DB)b=i});ST.m=Math.floor(b/24);ST.hh=b%24;sync();draw()});
$('ck-play').addEventListener('click',e=>{const b=e.currentTarget;if(ST.play){clearInterval(ST.play);ST.play=null;b.textContent='▶ Play a year';b.setAttribute('aria-pressed','false');return}
 b.textContent='❚❚ Pause';b.setAttribute('aria-pressed','true');ST.play=setInterval(()=>{ST.hh+=2;if(ST.hh>23){ST.hh=ST.hh%24;ST.m=(ST.m+1)%12}sync();draw()},450)});
$('ck-tbl').addEventListener('click',e=>{const tr=e.target.closest('tr[data-k]');if(!tr)return;ST.sys=tr.dataset.k;document.querySelectorAll('#ck-sys button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===ST.sys));strip()});
sync();strip();
window.__CKW={SYS,annual,klass,ST};
})();
