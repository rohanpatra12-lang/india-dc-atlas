# Post-slim step: adds the Growth explorer page (growth.html) to site_slim and links it everywhere.
import os,re,html
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
SRC=ROOT+'src/';BUILD=ROOT+'build/';SITE=ROOT+'site/'
D=SITE
EXP=SRC+'growth/india-dc-growth.html'
LINKS=[('index','Start'),('part1','I Understand'),('part2','II Measure'),('part3','III Forecast'),('growth','Growth explorer'),('part4','IV Choose'),('part5','V Act'),('reference','Reference'),('changelog','Changelog')]
def chk(cond,msg):
    if not cond:raise SystemExit('FAIL '+msg)
# ---------- 1. growth.html
g=open(EXP).read()
chk(g.count('<title>India DC Growth Explorer</title>')==1,'title')
g=g.replace('<title>India DC Growth Explorer</title>','<title>Atlas II · Growth explorer</title>')
HCSS='''
/* atlas site header */
.site{position:sticky;top:0;z-index:40;background:#0B1719;color:#DDEBEA;display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;padding:8px 16px}
@media(max-width:700px){.site{position:static}}
.site a{color:inherit;text-decoration:none}.site .brand{font-family:"Archivo","Arial Narrow",Arial,sans-serif;font-weight:700;letter-spacing:.02em;margin-right:6px}
.site .parts{display:flex;flex-wrap:wrap;gap:2px 4px;flex:1 1 auto}.site .parts a{font-size:.8rem;padding:4px 9px;border-radius:999px;opacity:.85}
.site .parts a:hover{opacity:1;background:rgba(255,255,255,.08)}.site .parts a[aria-current="page"]{background:#DDEBEA;color:#0B1719;opacity:1}
.crumb{font-size:12px;color:var(--ink-3);margin:0 0 6px}.crumb a{color:var(--ink-2)}
.pg-next{display:flex;justify-content:space-between;gap:12px;margin:24px 0 0;flex-wrap:wrap}.pg-next a{padding:10px 14px;border:1px solid var(--line);border-radius:8px;text-decoration:none;color:var(--ink);background:var(--surface)}
'''
chk(g.count('</style>')==1,'style');g=g.replace('</style>',HCSS+'</style>')
hdr='<header class="site"><a class="brand" href="index.html">Data Centre Atlas II</a><nav class="parts" aria-label="Parts">'+''.join(f'<a href="{k}.html"{" aria-current=\"page\"" if k=="growth" else ""}>{n}</a>' for k,n in LINKS)+'</nav></header>'
chk(g.count('<body>\n<div class="wrap">')==1,'body')
g=g.replace('<body>\n<div class="wrap">','<body>\n'+hdr+'\n<div class="wrap">\n  <p class="crumb"><a href="part3.html">Part III · Forecast</a> › Growth explorer · values from the atlas standards register v2026.10.5</p>')
chk(g.count('</section>\n</div>\n\n<script>')==1,'tail')
g=g.replace('</section>\n</div>\n\n<script>','</section>\n  <nav class="pg-next" aria-label="Pages"><a href="part3.html">← III Forecast</a><a href="part4.html">IV Choose →</a></nav>\n</div>\n\n<script>')
open(D+'growth.html','w').write(g)
# ---------- 2. every atlas page
ENTRY='{"t":"Growth explorer: capacity, energy, water and cost to 2035","n":"","p":"growth","a":"","k":"Page","x":"General-purpose only, AI only and hybrid futures; cooling system choices with PUE and WUE by climate; comparisons with India\'s electricity, water and budget; auto-written narrative."},'
for f in sorted(os.listdir(D)):
    if not f.endswith('.html') or f=='growth.html':continue
    h=open(D+f).read()
    if 'href="growth.html"' in h:raise SystemExit('FAIL already patched '+f)
    # header link after III Forecast
    h,n=re.subn(r'(<a href="part3\.html"(?: aria-current="page")?>III Forecast</a>)',r'\1<a href="growth.html">Growth explorer</a>',h);chk(n==1,f+' header')
    # rail entry at the end of Part III
    a='      <li class="rail-part">Part IV'
    chk(h.count(a)==1,f+' rail');h=h.replace(a,'      <li><a href="growth.html"><b>↗</b>Growth explorer, 2026–2035</a></li>\n'+a)
    # search index entry + label
    chk(h.count('window.__SIDX=[')==1,f+' sidx');h=h.replace('window.__SIDX=[','window.__SIDX=['+ENTRY,1)
    lab="reference:'Reference'}"
    chk(h.count(lab)==1,f+' lab');h=h.replace(lab,"reference:'Reference',growth:'Explorer'}")
    open(D+f,'w').write(h)
# ---------- 3. Part III panel
h=open(D+'part3.html').read()
a="How big India's data-centre load gets, by whose count.</p></div>"
chk(h.count(a)==1,'part3 divider')
PANEL=a+'''
<div class="panel" id="growth-x" style="border-left:4px solid var(--cold)"><h3>Growth explorer: capacity, energy, water and cost to 2035<span class="sub">An interactive companion to this part, on its own page</span></h3>
<p>India's projected IT capacity from 2026 to 2035 as four stacked charts (capacity, energy, water, all-in cost), split into general-purpose, AI inference and AI training. Switch between <b>general-purpose only</b>, <b>AI only</b> and <b>hybrid</b>; the other two stay on screen as outlines.</p>
<ul><li>About 80 editable inputs, each with its source. One-click capacity forecasts run from Axis Capital (3.6 GW in 2030) to Wood Mackenzie (12 GW).</li>
<li>Fifteen cooling and heat-rejection systems with PUE and WUE by climate. General-purpose and AI halls, old fleet and new builds, are each set separately.</li>
<li>Cost includes everything: facility, land, IT hardware with import duty, electricity, water, O&amp;M, staff, insurance and tax.</li>
<li>A <b>Put it in perspective</b> section compares the fleet with India's electricity use, water use and the Union Budget, and writes the narrative for you.</li></ul>
<p><a href="growth.html" style="display:inline-block;padding:9px 16px;border-radius:8px;background:var(--cold);color:var(--surface);text-decoration:none;font-weight:600">Open the growth explorer →</a></p></div>'''
h=h.replace(a,PANEL);open(D+'part3.html','w').write(h)
# ---------- 4. landing card
h=open(D+'index.html').read()
a='<div class="ans"><a class="ans-c"'
chk(h.count(a)==1,'answers')
CARD='<div class="ans"><a class="ans-c" href="growth.html" style="border-color:var(--cold)"><span class="ans-n mono">↗</span><b>Growth explorer: India to 2035</b><span class="ans-q">How much capacity, energy, water and money: general-purpose, AI or hybrid?</span><span class="ans-a">Interactive. Choose the forecast, workload mix, cooling systems and costs; compare with Delhi, Bengaluru and the Union Budget.</span><span class="ans-go">Open the explorer →</span></a><a class="ans-c"'
h=h.replace(a,CARD,1);open(D+'index.html','w').write(h)
# ---------- 5. changelog row
h=open(D+'changelog.html').read()
a='<tr><td class="mono">v27</td>'
chk(h.count(a)==1,'changelog')
row='<tr><td class="mono">v28</td><td class="mono">2026-10-27</td><td>Growth explorer added as its own page (linked from Part III, the header and the landing page): India 2026–2035 capacity, energy, water, carbon and all-in cost for general-purpose only, AI only and hybrid; fifteen cooling systems with PUE and WUE by climate; benchmarks from CEA, CGWB, NCIWRD, BWSSB, BMC and the Union Budget 2026-27; auto-written narrative.</td></tr>'
h=h.replace(a,row+a);open(D+'changelog.html','w').write(h)
print('growth_post ok')
