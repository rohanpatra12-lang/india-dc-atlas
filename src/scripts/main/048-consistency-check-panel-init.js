
/* ---------- consistency check panel + init ---------- */
V2.renderCheck=()=>{const el=document.getElementById('v2-check');if(!el)return;const r=V2.check();const bad=r.filter(x=>!x[3]);
 el.innerHTML=`<p class="small"><b>${r.length} values checked against the standards table: ${bad.length?bad.length+' mismatch'+(bad.length>1?'es':''):'all match'}.</b> The check runs every time the page loads.</p><div class="tbl"><table class="aif-t"><thead><tr><th>Value</th><th class="n">In the chapter</th><th class="n">Standard</th><th></th></tr></thead><tbody>${r.map(x=>`<tr><td>${x[0]}</td><td class="n">${x[1]}</td><td class="n">${x[2]}</td><td>${x[3]?'<span class="chip good">match</span>':'<span class="chip bad">differs</span>'}</td></tr>`).join('')}</tbody></table></div>`};
setTimeout(()=>{try{V2.flow()}catch(e){console.error(e)}try{V2.hm()}catch(e){console.error(e)}try{V2.map()}catch(e){console.error(e)}try{V2.cut()}catch(e){console.error(e)}try{V2.sm()}catch(e){console.error(e)}try{V2.fan()}catch(e){console.error(e)}try{V2.circ()}catch(e){console.error(e)}try{V2.renderCheck()}catch(e){console.error(e)}try{const rt=document.getElementById('re-t');rt&&rt.dispatchEvent(new Event('input',{bubbles:true}))}catch(e){}},50);
window.V2=V2;
})();

