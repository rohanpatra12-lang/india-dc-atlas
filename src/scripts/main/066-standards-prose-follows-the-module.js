
/* ---------- standards: prose follows the module ---------- */
(()=>{if(!window.STD)return;document.querySelectorAll('[data-std]').forEach(el=>{const v=STD.get(el.dataset.std);if(v==null)return;const d=+el.dataset.d||0;el.textContent=(+v).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d})});
 const box=document.getElementById('std-reg');if(!box)return;const E=Object.values(STD.E);const fm=v=>typeof v==='number'?v.toLocaleString('en-IN',{maximumFractionDigits:3}):v;
 const owners=[...new Set(E.map(e=>e.owner))].sort();const st={q:'',o:'',due:0};
 function draw(){const now='2026-10-25';const rows=E.filter(e=>(!st.q||(e.label+' '+e.src+' '+e.used).toLowerCase().includes(st.q))&&(!st.o||e.owner===st.o)&&(!st.due||e.review<=st.due));
  box.querySelector('tbody').innerHTML=rows.map(e=>`<tr><td><b>${e.label}</b><br><span class="xs muted mono">${e.k}</span></td><td class="mono">${fm(e.v)}</td><td class="mono">${fm(e.lo)} – ${fm(e.hi)}</td><td>${e.unit}</td><td><span class="ev ${({reported:'r',model:'m',estimate:'e'})[e.conf]||'e'} show">${e.conf}</span></td><td>${e.owner}</td><td class="mono">${e.review}</td><td class="xs">${e.src}</td><td class="xs">${e.used}</td></tr>`).join('');
  document.getElementById('std-n').textContent=`${rows.length} of ${E.length} values`}
 document.getElementById('std-q').addEventListener('input',e=>{st.q=e.target.value.toLowerCase();draw()});
 const os=document.getElementById('std-o');os.innerHTML='<option value="">All owners</option>'+owners.map(o=>`<option>${o}</option>`).join('');os.addEventListener('change',e=>{st.o=e.target.value;draw()});
 document.getElementById('std-due').addEventListener('change',e=>{st.due=e.target.checked?'2027-04':0;draw()});
 document.getElementById('std-v').textContent=STD.version+' · '+STD.date;const v2=document.getElementById('std-v2');if(v2)v2.textContent=STD.version+', '+STD.date;document.getElementById('std-h').innerHTML=STD.history.map(h=>`<li><b class="mono">${h.v}</b> (${h.d}): ${h.what}</li>`).join('');draw()})();