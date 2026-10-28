
/* ---------- WATER YOU CAN PICTURE ---------- */
const WPP={p20:{city:'blr',wl:'colo',mw:20,u:65,cool:'tower',pw:'grid',ws:'muni',inc:true,gpu:true},p50:{city:'blr',wl:'hyp',mw:50,u:75,cool:'tower',pw:'grid',ws:'muni',inc:true,gpu:true},p100:{city:'blr',wl:'ai',mw:100,u:78,cool:'dlc',pw:'grid',ws:'muni',inc:true,gpu:true}};
let wpSel='p20';
const PPL='<svg viewBox="0 0 12 12"><circle cx="6" cy="3" r="2.2" fill="var(--cold)"/><path d="M2.2 11.5c0-2.6 1.7-4.6 3.8-4.6s3.8 2 3.8 4.6z" fill="var(--cold)"/></svg>';
const TKS='<svg viewBox="0 0 24 14"><rect x="1" y="2" width="14" height="8" rx="3" fill="var(--hot)"/><path d="M15 4h4l3 3v3h-7z" fill="var(--hot)" opacity=".75"/><circle cx="5" cy="11.5" r="2" fill="var(--ink)"/><circle cx="18" cy="11.5" r="2" fill="var(--ink)"/></svg>';
function icons(n,unit,svg,cap){const k=Math.round(n/unit);const shown=Math.min(k,cap);return svg.repeat(shown)+(k>cap?`<span class="more">+${fmt(k-cap)} more</span>`:'')+(k===0?`<span class="more">less than one</span>`:'')}
function wpic(){
  const gg=wpSel==='sim'?g:WPP[wpSel],m=model(gg),c=m.c;const off=$('#wp-off').checked;
  const mld=(m.onW+(off?m.offW:0))/365,evap=gg.cool==='tower'||gg.cool==='adiab',pkM=m.onW/365*(evap?1.3:1);
  const ppl=mld*1e6/135,tk=mld*1e6/12000;
  readout($('#wp-read'),[[mld.toFixed(2)+' MLD','Water a day'+(off?' (site + power stations)':' on site'),'cold'],[fmt(ppl),'People\'s daily needs at 135 L'],[fmt(tk,tk<10?1:0),'Tanker loads a day'],[fmt(mld*365/2.5),'Olympic pools a year'],[(mld/1935*100).toFixed(3)+'%','of BWSSB\'s daily supply'],[(mld/45*100).toFixed(1)+'%','of Bangalore East\'s sustainable groundwater','heat']]);
  const unit=ppl>300000?10000:1000;
  $('#wp-ppl-l').textContent=`Each figure = ${fmt(unit)} people's daily water`;$('#wp-ppl').innerHTML=icons(ppl,unit,PPL,240);
  $('#wp-tk-l').textContent='Each truck = one 12,000-litre tanker, every day';$('#wp-tk').innerHTML=icons(tk,1,TKS,160);
  const cut=val('ws-cut')/100,bw=val('ws-bw')/100,tp=val('ws-tp'),st=val('ws-st');
  out('ws-cut',Math.round(cut*100)+'%');out('ws-bw',Math.round(bw*100)+'%');out('ws-tp','₹'+fmt(tp));out('ws-st',st+' ML');
  const short=gg.ws==='muni'?pkM*cut:gg.ws==='ground'?pkM*bw:0;
  const tkd=short*1e6/12000,cost=tkd*30*tp/1e5,days=short>0?st/short:Infinity,autonomy=pkM>0?st/pkM:Infinity;
  readout($('#ws-read'),[[pkM.toFixed(2)+' MLD','Peak April–May demand'+(evap?' (×1.3)':'')],[short.toFixed(2)+' MLD','Shortfall to replace',short>0?'heat':'good'],[fmt(tkd,tkd<10?1:0),'Tanker trips a day'],['₹'+fmt(cost,1)+' lakh','Tanker bill a month','hot'],[isFinite(days)?days.toFixed(1)+' days':'not needed','Storage covers the shortfall for'],[isFinite(autonomy)?autonomy.toFixed(1)+' days':'—','Storage covers full demand for']]);
  $('#ws-text').innerHTML=gg.ws==='ttw'?`This design draws treated wastewater, so a cut in potable supply does not reach it directly. Sewage flows also fall when supply is cut, so contract a fixed share of an STP's output.`:short<=0.001?'Nothing to replace: this design barely uses water on site.':`In a 2024-style summer this ${m.w.n.toLowerCase()} in ${c.n} would need <b>${fmt(tkd,tkd<10?1:0)} tanker loads a day</b>, the daily water of about <b>${fmt(short*1e6/135)}</b> people, bought from the same trucks households queue for. ${gg.cool==='dlc'?'':'Switching to warm-water liquid with dry coolers would cut this by over 95%.'}`;
}
seg('wp-pre',d=>{wpSel=d.v;wpic()});$('#wp-off').addEventListener('change',wpic);['ws-cut','ws-bw','ws-tp','ws-st'].forEach(i=>document.getElementById(i).addEventListener('input',wpic));
wpic();
window.__wpic=wpic;window.__WPG=()=>wpSel==='sim'?g:WPP[wpSel];
}



