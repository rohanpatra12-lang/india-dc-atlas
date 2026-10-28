"""Build the atlas: src/ -> build/atlas.html -> pages -> site/.

    python3 tools/build.py          # build site/
    python3 tools/build.py --check  # build, then open every page in a headless browser and run the atlas's own checks

Needs Python 3.9+ and Node 18+ (with `npm install` run once for acorn; Playwright only for --check)."""
import json,os,subprocess,sys,time
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
SRC=ROOT+'src/';BUILD=ROOT+'build/'
def step(name,cmd):
    t=time.time();r=subprocess.run(cmd,cwd=ROOT,capture_output=True,text=True)
    if r.returncode or 'FAIL' in r.stdout:
        print(r.stdout[-3000:],r.stderr[-3000:]);sys.exit(f'build failed at: {name}')
    print(f'  {name:<10} ok  ({time.time()-t:.1f}s)')
os.makedirs(BUILD,exist_ok=True)
man=json.load(open(SRC+'manifest.json'))
html=''.join(open(SRC+x,encoding='utf-8').read() if isinstance(x,str) else x['text'] for x in man)
open(BUILD+'atlas.html','w',encoding='utf-8').write(html)
print(f'  assemble   ok  ({len(man)} parts, {len(html)/1e6:.2f} MB)')
for n in ['split','inline','slim','growth']:step(n,[sys.executable,'tools/'+n+'.py'])
step('export',['node','tools/export.js'])
print('site/ is ready: open site/index.html in a browser.')
if '--check' in sys.argv:step('check',['node','tools/check.js'])
