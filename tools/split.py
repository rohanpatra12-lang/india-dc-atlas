import re,json,os,html,shutil
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
SRC=ROOT+'src/';BUILD=ROOT+'build/';SITE=ROOT+'site/'
OUT=BUILD+'pages/'
if os.path.isdir(OUT):shutil.rmtree(OUT)
os.makedirs(OUT)
s=open(BUILD+'atlas.html').read()
STDV=re.search(r"const VERSION='([^']+)',DATE='([^']+)'",s).groups()
# ---- pieces ----
st_a=s.find('<style>');st_b=s.find('</style>',st_a)
css=s[st_a+7:st_b]
head_extra=s[:st_a].replace('<title>Data Centre Atlas II</title>','')
hero_a=s.find('<header class="hero"');hero_b=s.find('</header>',hero_a)+9
hero=s[hero_a:hero_b]
shell_a=s.find('<div class="shell">',hero_b);nav_a=s.find('<nav class="side"',shell_a);nav_b=s.find('</nav>',s.find('</ol>',nav_a))+6
rail=s[nav_a:nav_b]
main_a=s.find('<main>');main_b=s.find('</main>')
main=s[main_a+6:main_b]
foot_a=s.find('<footer>');foot_b=s.find('</footer>')+9;footer=s[foot_a:foot_b]
tail=s[foot_b:]
# scripts after the footer, in order (inline only; the CDN one stays in the head)
scripts=[];k=0;extra_html=''
pos=0
while True:
    a=tail.find('<script',pos)
    if a<0:break
    extra_html+=tail[pos:a]
    gt=tail.find('>',a);b=tail.find('</script>',gt)
    scripts.append(tail[gt+1:b]);pos=b+9
extra_html+=tail[pos:]
# ---- split main into pages ----
def cut(a_marker,b_marker):
    a=main.find(a_marker);b=main.find(b_marker) if b_marker else len(main)
    a=main.rfind('<',0,a);b=main.rfind('<',0,b) if b_marker else b
    return main[a:b]
blocks={'index':main[:main.rfind('<',0,main.find('id="part-I"'))],
 'part1':cut('id="part-I"','id="part-II"'),'part2':cut('id="part-II"','id="part-III"'),'part3':cut('id="part-III"','id="part-IV"'),
 'part4':cut('id="part-IV"','id="part-V"'),'part5':cut('id="part-V"','id="numbers"'),'reference':cut('id="numbers"',None)}
TITLES={'index':'Data Centre Atlas II','part1':'Atlas II · Understand','part2':'Atlas II · Measure','part3':'Atlas II · Forecast','part4':'Atlas II · Choose','part5':'Atlas II · Act','reference':'Atlas II · Reference','changelog':'Atlas II · Changelog'}
PARTN={'part1':'I · Understand','part2':'II · Measure','part3':'III · Forecast','part4':'IV · Choose','part5':'V · Act','reference':'Reference'}
# ---- id → page map ----
PAGEMAP={}
for pg,b in blocks.items():
    for m in re.finditer(r'\bid="([^"]+)"',b):PAGEMAP.setdefault(m.group(1),pg)
for k in ['top']:PAGEMAP[k]='index'
# ---- landing: the atlas in nineteen answers ----
ans=[]
for pg in ['part1','part2','part3','part4','part5']:
    for m in re.finditer(r'<section class="ch[^"]*" id="([^"]+)"[^>]*data-n="([^"]*)".*?<h2 class="chq-t">(.*?)</h2>.*?<p class="chq-q"><span>The question</span>(.*?)</p>\s*<p class="chq-a"><span>The short answer</span>(.*?)</p>',blocks[pg],re.S):
        sid,n,t,q,a=m.groups();ans.append((pg,sid,n,t,q,a))
ANS='<section class="ch" id="answers"><div class="chq"><div class="chq-n" aria-hidden="true">19</div><div class="chq-b"><h2 class="chq-t">The atlas in nineteen answers</h2><p class="chq-q"><span>Brief</span>Each chapter\'s question and short answer, with a link to the full chapter.</p></div></div><div class="ans">'+''.join(f'<a class="ans-c" href="{pg}.html#{sid}"><span class="ans-n mono">{n}</span><b>{t}</b><span class="ans-q">{q}</span><span class="ans-a">{a}</span><span class="ans-go">Read chapter {n} →</span></a>' for pg,sid,n,t,q,a in ans)+'</div></section>'
blocks['index']=blocks['index']+ANS
# ---- changelog ----
VERS=[(x['version'],x['date'],x['changes']) for x in json.load(open(SRC+'changelog.json'))]
std_hist=re.findall(r"\{v:'([^']+)',d:'?([^,']+)'?,what:'((?:[^'\\]|\\.)*)'\}",s)
CL='<section class="ch" id="changelog"><div class="chq"><div class="chq-n" aria-hidden="true">Δ</div><div class="chq-b"><h2 class="chq-t">Changelog</h2><p class="chq-q"><span>What changed</span>Versions of the atlas and of its standards.</p></div></div>'
CL+='<div class="panel"><h3>Atlas versions</h3><div class="tbl"><table class="aif-t"><thead><tr><th>Version</th><th>Date</th><th>Changes</th></tr></thead><tbody>'+''.join(f'<tr><td class="mono">{v}</td><td class="mono">{d}</td><td>{html.escape(w)}</td></tr>' for v,d,w in VERS)+'</tbody></table></div></div>'
import os
if os.path.exists(SRC+'changelog-extra.html'):CL+=open(SRC+'changelog-extra.html').read()
CL+='<div class="panel"><h3>Standards versions<span class="sub">The values every model shares; the full register is on the <a href="reference.html#std-p">reference page</a>.</span></h3><div class="tbl"><table class="aif-t"><thead><tr><th>Version</th><th>Date</th><th>Changes</th></tr></thead><tbody>'+''.join(f'<tr><td class="mono">{v}</td><td class="mono">{d.replace("DATE",STDV[1])}</td><td>{w}</td></tr>' for v,d,w in std_hist)+'</tbody></table></div></div></section>'
blocks['changelog']=CL
for m in re.finditer(r'\bid="([^"]+)"',CL):PAGEMAP.setdefault(m.group(1),'changelog')
# ---- search index ----
idx=[]
def txt(h):return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',h))).strip()
for pg,b in blocks.items():
    if pg=='changelog':continue
    for m in re.finditer(r'<section class="ch[^"]*" id="([^"]+)"[^>]*data-n="([^"]*)".*?<h2 class="chq-t">(.*?)</h2>(.*?)</div>\s*</div>',b,re.S):
        idx.append({'t':txt(m.group(3)),'n':m.group(2),'p':pg,'a':m.group(1),'k':'Chapter','x':txt(m.group(4))[:260]})
    for m in re.finditer(r'<div class="subch" id="([^"]+)">\s*<div class="ch-head">\s*<div class="ch-tag"><span class="ch-num" aria-hidden="true">([^<]+)</span>.*?<h2>(.*?)</h2>\s*(?:<p class="lede">(.*?)</p>)?',b,re.S):
        idx.append({'t':txt(m.group(3)),'n':m.group(2),'p':pg,'a':m.group(1),'k':'Section','x':txt(m.group(4) or '')[:260]})
    for m in re.finditer(r'<div class="panel[^"]*"(?: id="([^"]+)")?[^>]*>\s*<h3>(.*?)</h3>',b,re.S):
        h=m.group(2);t=txt(h.split('<span class="sub">')[0]);sub=txt(h.split('<span class="sub">')[1]) if '<span class="sub">' in h else ''
        pid=m.group(1)
        if not pid:
            before=b[:m.start()];mm=list(re.finditer(r'\bid="([^"]+)"',before));pid=mm[-1].group(1) if mm else ''
        idx.append({'t':t,'n':'','p':pg,'a':pid,'k':'Panel','x':sub[:200]})
json.dump(idx,open(OUT+'search.json','w'),ensure_ascii=False,separators=(',',':'))
# ---- shared assets ----
SITECSS='''
/* ===== site: pages, header, search ===== */
body{margin:0}
@media(max-width:700px){.site{position:static}}
.site{position:sticky;top:env(safe-area-inset-top,0px);z-index:40;background:var(--night,#0f1716);color:var(--night-ink,#e8eeec);display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;padding:8px max(16px,env(safe-area-inset-right,0px)) 8px max(16px,env(safe-area-inset-left,0px))}
.site a{color:inherit;text-decoration:none}.site .brand{font-family:var(--f-display);font-weight:700;letter-spacing:.02em;margin-right:6px}
.site .parts{display:flex;flex-wrap:wrap;gap:2px 4px;flex:1 1 auto}.site .parts a{font-size:.8rem;padding:4px 9px;border-radius:999px;opacity:.85}.site .parts a:hover{opacity:1;background:rgba(255,255,255,.08)}.site .parts a[aria-current="page"]{background:var(--cold);color:var(--surface);opacity:1}
.srch{position:relative;flex:0 1 280px;min-width:0}.srch input{width:100%;font:inherit;font-size:.85rem;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:inherit}
.srch input::placeholder{color:inherit;opacity:.6}
#qr{position:absolute;right:0;top:calc(100% + 6px);width:min(520px,calc(100vw - 32px));max-height:70vh;overflow:auto;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:6px}
#qr a{display:block;padding:7px 9px;border-radius:6px;color:var(--ink)}#qr a:hover,#qr a.on{background:var(--sunk)}#qr b{font-family:var(--f-display)}#qr .k{font-family:var(--f-mono);font-size:.7rem;color:var(--muted);margin-right:6px}#qr .x{display:block;font-size:.78rem;color:var(--muted)}
.ans{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:12px;margin-top:14px}
.ans-c{display:grid;gap:5px;align-content:start;padding:14px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);text-decoration:none}
.ans-c:hover{border-color:var(--cold)}.ans-n{font-size:1.6rem;color:var(--cold)}.ans-q{font-size:.85rem;color:var(--muted)}.ans-a{font-size:.88rem}.ans-go{font-size:.78rem;color:var(--cold);margin-top:4px}
.pg-next{display:flex;justify-content:space-between;gap:12px;margin:30px 0 10px;flex-wrap:wrap}.pg-next a{padding:10px 14px;border:1px solid var(--line);border-radius:8px;text-decoration:none;color:var(--ink)}
'''
open(OUT+'atlas.css','w').write(css+SITECSS)
for i,sc in enumerate(scripts):
    sc=sc.replace("!builders[id]||!document.getElementById(id))return;","!builders[id]||!(document.__realGet||document.getElementById.bind(document))(id))return;")
    sc=sc.replace("const ok=(n,a,b)=>r.push([n,a,b,Math.abs(a-b)<1e-9]);","const ok=(n,a,b)=>{if(isFinite(a))r.push([n,a,b,Math.abs(a-b)<1e-9])};")
    open(OUT+f'atlas-{i+1}.raw.js','w').write(sc)
    import subprocess;r=subprocess.run(['node',ROOT+'tools/isolate.js',OUT+f'atlas-{i+1}.raw.js',OUT+f'atlas-{i+1}.js'],capture_output=True,text=True)
    if r.returncode:print('FAIL isolate',r.stderr[:500]);raise SystemExit(1)
    os.remove(OUT+f'atlas-{i+1}.raw.js')
SITEJS='''/* site: cross-page links and search */
window.__PAGE=document.documentElement.dataset.page||'index';
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1);if(!id||document.getElementById(id))return;const pg=(window.__PAGEMAP||{})[id];if(pg){e.preventDefault();location.href=pg+'.html#'+id}},true);
(()=>{const q=document.getElementById('q'),box=document.getElementById('qr');if(!q||!box)return;let IDX=null,sel=-1;const LAB={index:'Start',part1:'Part I',part2:'Part II',part3:'Part III',part4:'Part IV',part5:'Part V',reference:'Reference'};
 const load=()=>IDX?Promise.resolve(IDX):fetch('search.json').then(r=>r.json()).then(j=>IDX=j).catch(()=>IDX=[]);
 const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 function run(){const t=q.value.trim().toLowerCase();if(t.length<2){box.hidden=true;return}load().then(I=>{const ws=t.split(/\\s+/);const R=I.map(e=>{const T=(e.t||'').toLowerCase(),X=(e.x||'').toLowerCase();if(!ws.every(w=>T.includes(w)||X.includes(w)))return null;let sc=ws.reduce((a,w)=>a+(T.includes(w)?3:1),0)+(e.k==='Chapter'?2:e.k==='Section'?1:0);return [sc,e]}).filter(Boolean).sort((a,b)=>b[0]-a[0]).slice(0,14);
  sel=-1;box.innerHTML=R.length?R.map(([,e])=>`<a href="${e.p}.html${e.a?'#'+e.a:''}"><span class="k">${LAB[e.p]||e.p}${e.n?' · '+e.n:''}</span><b>${esc(e.t)}</b>${e.x?`<span class="x">${esc(e.x.slice(0,140))}</span>`:''}</a>`).join(''):'<p class="small" style="padding:8px">No matches. Try a city, a technology or a number.</p>';box.hidden=false})}
 q.addEventListener('input',run);q.addEventListener('focus',()=>{load();if(q.value.trim().length>1)run()});
 q.addEventListener('keydown',e=>{const as=[...box.querySelectorAll('a')];if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,Math.min(as.length-1,sel+(e.key==='ArrowDown'?1:-1)));as.forEach((a,i)=>a.classList.toggle('on',i===sel))}if(e.key==='Enter'&&as[Math.max(0,sel)]){location.href=as[Math.max(0,sel)].getAttribute('href')}if(e.key==='Escape'){box.hidden=true;q.blur()}});
 document.addEventListener('click',e=>{if(!e.target.closest('.srch'))box.hidden=true})})();
'''
# stand-ins for elements that live on other pages
TAG={}
for m in re.finditer(r'<(input|select|textarea|canvas|svg|button|output|table|tbody|details|ol|ul)\b([^>]*?)\bid="([^"]+)"([^>]*)>',main):
    tag,a1,id_,a2=m.groups();attrs=a1+a2;keep={}
    for k in ['type','value','min','max','step']:
        mm=re.search(r'\b'+k+r'="([^"]*)"',attrs)
        if mm:keep[k]=mm.group(1)
    if re.search(r'\bchecked\b',attrs):keep['checked']='1'
    if tag=='select':
        e=main.find('</select>',m.end());keep['html']=main[m.end():e]
    TAG[id_]=[tag,keep]
STUB=r"""
(()=>{const real=document.getElementById.bind(document),realQ=document.querySelector.bind(document),cache={};document.__realGet=real;
 function stub(id){if(cache[id])return cache[id];const t=(window.__TAGS||{})[id];let el;if(t){el=document.createElement(t[0]==='svg'?'div':t[0]);const k=t[1];for(const a of ['type','value','min','max','step'])if(k[a]!=null)el.setAttribute(a,k[a]);if(k.value!=null)el.value=k.value;if(k.checked)el.checked=true;if(k.html)el.innerHTML=k.html}else el=document.createElement('div');el.id=id;el.dataset.stub='1';return cache[id]=el}
 document.getElementById=function(id){const el=real(id);if(el)return el;const pg=(window.__PAGEMAP||{})[id];return pg&&pg!==window.__PAGE?stub(id):null};
 document.querySelector=function(sel){const el=realQ(sel);if(el)return el;const m=/^#([\w-]+)$/.exec(sel);if(m){const pg=(window.__PAGEMAP||{})[m[1]];if(pg&&pg!==window.__PAGE)return stub(m[1])}return null}})();
"""
open(OUT+'site.js','w').write('window.__PAGEMAP='+json.dumps(PAGEMAP,separators=(',',':'))+';\nwindow.__TAGS='+json.dumps(TAG,separators=(',',':'))+';\n'+SITEJS)
# ---- rail per page ----
def rail_for(pg):
    r=rail
    def fix(m):
        id_=m.group(1);t=PAGEMAP.get(id_,'index')
        return f'href="{"" if t==pg else t+".html"}#{id_}"'
    return re.sub(r'href="#([^"]+)"',fix,r)
def fix_links(h,pg):
    return re.sub(r'href="#([^"]+)"',lambda m:m.group(0) if PAGEMAP.get(m.group(1),pg)==pg else f'href="{PAGEMAP[m.group(1)]}.html#{m.group(1)}"',h)
ORDER=['index','part1','part2','part3','part4','part5','reference','changelog']
def header(pg):
    links=[('index','Start'),('part1','I Understand'),('part2','II Measure'),('part3','III Forecast'),('part4','IV Choose'),('part5','V Act'),('reference','Reference'),('changelog','Changelog')]
    return '<header class="site"><a class="brand" href="index.html">Data Centre Atlas II</a><nav class="parts" aria-label="Parts">'+''.join(f'<a href="{k}.html"{" aria-current=\"page\"" if k==pg else ""}>{n}</a>' for k,n in links)+'</nav><div class="srch"><input id="q" type="search" placeholder="Search the atlas" aria-label="Search the atlas" autocomplete="off"><div id="qr" hidden></div></div></header>'
def nextprev(pg):
    i=ORDER.index(pg);pv=ORDER[i-1] if i>0 else None;nx=ORDER[i+1] if i<len(ORDER)-1 else None
    lab=lambda k:TITLES[k].replace('Atlas II · ','') if k!='index' else 'Start'
    return '<nav class="pg-next" aria-label="Pages">'+(f'<a href="{pv}.html">← {lab(pv)}</a>' if pv else '<span></span>')+(f'<a href="{nx}.html">{lab(nx)} →</a>' if nx else '')+'</nav>'
HEAD_COMMON=head_extra+'<link rel="stylesheet" href="atlas.css">\n'
SCRIPTS='<script src="site.js"></script>\n'+''.join(f'<script src="atlas-{i+1}.js"></script>\n' for i in range(len(scripts)))
sizes={}
for pg in ORDER:
    body=fix_links(blocks[pg],pg)
    top=hero if pg=='index' else ''
    headp=f'<title>{TITLES[pg]}</title>\n'+HEAD_COMMON+f'<script>document.documentElement.dataset.page="{pg}"</script>\n'
    bodyp=header(pg)+'\n'+fix_links(top,pg)+'\n<div class="shell">\n'+rail_for(pg)+'\n<main>\n'+body+nextprev(pg)+'\n</main>\n</div>\n'+footer+extra_html+SCRIPTS
    page=headp+bodyp if pg=='index' else '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'+headp+'</head><body>\n'+bodyp+'\n</body></html>'
    open(OUT+pg+'.html','w').write(page);sizes[pg]=len(page)
# full single page for offline reading
open(OUT+'atlas-full.html','w').write('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n'+s+'\n</body></html>')
print('split ok',sizes,'scripts',[len(x) for x in scripts],'idx',len(idx),'answers',len(ans))
