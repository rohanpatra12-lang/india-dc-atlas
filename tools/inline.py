import os,re,json
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
SRC=ROOT+'src/';BUILD=ROOT+'build/';SITE=ROOT+'site/'
S=BUILD+'pages/';O=BUILD+'inline/'
os.makedirs(O,exist_ok=True)
css=open(S+'atlas.css').read()
idx=open(S+'search.json').read()
site=open(S+'site.js').read()
a="fetch('search.json').then(r=>r.json()).then(j=>IDX=j).catch(()=>IDX=[])"
assert site.count(a)==1
site=site.replace(a,"Promise.resolve(IDX=window.__SIDX||[])")
site='window.__SIDX='+idx.strip()+';\n'+site
js={f:open(S+f).read() for f in os.listdir(S) if f.startswith('atlas-') and f.endswith('.js')}
js['site.js']=site
for f in os.listdir(S):
    if not f.endswith('.html') or f=='atlas-full.html':continue
    h=open(S+f).read()
    n=h.count('<link rel="stylesheet" href="atlas.css">');assert n==1,(f,n)
    h=h.replace('<link rel="stylesheet" href="atlas.css">',lambda m:None or '<style>\n'+css+'\n</style>') if False else h.replace('<link rel="stylesheet" href="atlas.css">','<style>\n'+css.replace('\\','\\\\')+'\n</style>') if False else h.replace('<link rel="stylesheet" href="atlas.css">','@@CSS@@')
    h=h.replace('@@CSS@@','<style>\n'+css+'\n</style>')
    def rep(m):
        name=m.group(1)
        return '<script>\n'+js[name]+'\n</script>'
    h,k=re.subn(r'<script src="((?:site|atlas-\d)\.js)"></script>',rep,h)
    assert k==1+len([x for x in js if x.startswith("atlas-")]),(f,k)
    assert 'src="atlas-' not in h and 'href="atlas.css"' not in h
    open(O+f,'w').write(h)
    print(f,len(h))
