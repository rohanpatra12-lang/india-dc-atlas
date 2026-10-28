import os,re,json,math,shutil
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'/'
SRC=ROOT+'src/';BUILD=ROOT+'build/';SITE=ROOT+'site/'
I=BUILD+'inline/';O=SITE
if os.path.isdir(O):shutil.rmtree(O)
os.makedirs(O)
def dp(pts,tol):
    if len(pts)<3:return pts
    a,b=pts[0],pts[-1];dx,dy=b[0]-a[0],b[1]-a[1];L=math.hypot(dx,dy)
    best,bi=0,0
    for i in range(1,len(pts)-1):
        p=pts[i]
        d=abs(dy*p[0]-dx*p[1]+b[0]*a[1]-b[1]*a[0])/L if L else math.hypot(p[0]-a[0],p[1]-a[1])
        if d>best:best,bi=d,i
    if best>tol:return dp(pts[:bi+1],tol)[:-1]+dp(pts[bi:],tol)
    return [a,b]
def simp(path,tol=0.35):
    out=[]
    for ring in re.findall(r'M([^MZ]+)Z?',path):
        pts=[tuple(map(float,q.split(','))) for q in ring.split()]
        if len(pts)>4:
            h=len(pts)//2;s=dp(pts[:h+1],tol)[:-1]+dp(pts[h:],tol)
        else:s=pts
        if len(s)<3:continue
        out.append('M'+' '.join(f'{x:g},{y:g}' for x,y in s)+'Z')
    return ''.join(out) or path
K='let DIST;try{DIST='
def fix(h,page):
    i=h.find(K);assert i>0;i+=len(K);j=h.find(';}catch',i)
    if page=='part4':
        D=json.loads(h[i:j]);D=[d[:2]+[simp(d[2])]+d[3:] for d in D]
        new=json.dumps(D,separators=(',',':'),ensure_ascii=False)
    else:new='[]'
    h=h[:i]+new+h[j:]
    if page!='part4':
        a=h.find('let SRC;try{SRC="<!doctype')
        if a>0:
            a+=len('let SRC;try{SRC=');b=h.find(';}catch',a)
            assert h[b-1]=='"';h=h[:a]+'""'+h[b:]
    return h
for f in sorted(os.listdir(I)):
    p=f[:-5];h=open(I+f).read();n0=len(h)
    if p=='changelog':
        # keep only site.js script + chart lib
        parts=re.split(r'(<script>\n[\s\S]*?\n</script>)',h)
        keep=[];k=0
        for x in parts:
            if x.startswith('<script>\n'):
                k+=1
                if 'window.__SIDX=' in x:keep.append(x)
            else:keep.append(x)
        h=''.join(keep)
    else:h=fix(h,p)
    open(O+f,'w').write(h);print(f,n0,'->',len(h))
