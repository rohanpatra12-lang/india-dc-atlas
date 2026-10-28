// Opens every built page in headless Chromium and fails if any page throws, any built-in
// consistency check fails, or a page scrolls sideways on a 390 px phone screen.
// Usage: node tools/check.js   (after `npm install` and `npx playwright install chromium`)
const {chromium}=require('playwright');const path=require('path');
const SITE=path.join(__dirname,'..','site');
const PAGES=['index','part1','part2','part3','part4','part5','reference','changelog','growth'];
(async()=>{const b=await chromium.launch();let bad=0;
 for(const f of PAGES){
  for(const w of [1400,390]){
   const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];
   p.on('pageerror',e=>errs.push(e.message));
   await p.route(/^https?:\/\/(?!cdnjs\.cloudflare\.com)/,r=>r.abort());
   await p.goto('file://'+path.join(SITE,f+'.html'));await p.waitForTimeout(3000);
   const r=await p.evaluate(()=>{const c=(window.V2&&V2.check)?V2.check():[];return {n:c.length,fail:c.filter(x=>!x[3]).map(x=>x[0]+': '+x[1]+' vs '+x[2]),sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}});
   const over=r.sw>r.cw+2,ok=!errs.length&&!r.fail.length&&!over;
   if(!ok)bad++;
   console.log(`${ok?'ok  ':'FAIL'} ${f}@${w}: ${r.n} checks${r.fail.length?' · failed: '+r.fail.join('; '):''}${errs.length?' · errors: '+errs.slice(0,3).join(' | '):''}${over?' · page scrolls sideways ('+r.sw+'px)':''}`);
   await p.close()}}
 await b.close();if(bad){console.log(bad+' problem(s)');process.exit(1)}console.log('all pages pass')})();
