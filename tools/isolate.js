// Isolate statements of a script so one failing block does not stop the rest.
// Top level of the outer IIFE: declarations become var + guarded assignment; other statements are wrapped in try.
// Inside top-level blocks, IIFEs and if-blocks (recursively, depth 3): declarations become let + guarded assignment.
const acorn=require('acorn');const fs=require('fs');
const LOG='window.__ISO&&window.__ISO.push(String(__e&&__e.message))';
function transform(src){const ast=acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',allowReturnOutsideFunction:true});
 const edits=[];let n=0;
 const iifeBody=e=>{if(!e)return null;if(e.type==='UnaryExpression')e=e.argument;if(e.type==='CallExpression'&&(e.callee.type==='FunctionExpression'||e.callee.type==='ArrowFunctionExpression')&&e.callee.body.type==='BlockStatement'&&e.arguments.length===0)return e.callee.body.body;return null};
 function decl(st,kind){const parts=st.declarations.map(d=>{if(d.id.type!=='Identifier')return null;const name=d.id.name;return {name,init:d.init?src.slice(d.init.start,d.init.end):null}});
  if(parts.some(p=>!p))return false;
  const head=`${kind} ${parts.map(p=>p.name).join(',')};`,asg=parts.filter(p=>p.init!=null).map(p=>`${p.name}=${p.init};`).join('');
  edits.push([st.start,st.end,asg?`${head}try{${asg}}catch(__e){${LOG}}`:head]);n++;return true}
 function body(stmts,depth,top){for(const st of stmts){
  if(st.type==='FunctionDeclaration'||st.type==='EmptyStatement'||st.type==='ClassDeclaration')continue;
  if(depth>=1&&st.type==='IfStatement'&&/^if\s*\(\s*!\s*document\.getElementById\(\s*['"][\w-]+['"]\s*\)\s*\)\s*return\s*;?$/.test(src.slice(st.start,st.end))){edits.push([st.start,st.end,'/* page guard removed: blocks are isolated */']);continue}
  if(st.type==='VariableDeclaration'){if(top){if(!decl(st,'var'))edits.push([st.start,st.start+st.kind.length,'var'])}else if(st.kind!=='var'){decl(st,'let')}continue}
  if(depth<3){
   if(st.type==='BlockStatement'){body(st.body,depth+1,false);continue}
   if(st.type==='ExpressionStatement'){const b=iifeBody(st.expression);if(b){body(b,depth+1,false);continue}}
   if(st.type==='IfStatement'&&st.consequent.type==='BlockStatement'&&!st.alternate&&/^\s*if\s*\(\s*[\w$.]+\s*\)/.test(src.slice(st.start,st.consequent.start))){body(st.consequent.body,depth+1,false);continue}}
  edits.push([st.start,st.end,`try{${src.slice(st.start,st.end)}\n}catch(__e){${LOG}}`]);n++}}
 let target=ast.body,top=false;
 if(ast.body.length===1&&ast.body[0].type==='ExpressionStatement'){const b=iifeBody(ast.body[0].expression);if(b){target=b;top=true}}
 body(target,0,top);
 edits.sort((a,b)=>b[0]-a[0]);for(let i=1;i<edits.length;i++)if(edits[i][1]>edits[i-1][0])throw new Error('overlapping edits');
 let out=src;for(const [a,b,r] of edits)out=out.slice(0,a)+r+out.slice(b);return {out,n}}
const [,,inp,outp]=process.argv;const src=fs.readFileSync(inp,'utf8');const {out,n}=transform(src);
acorn.parse(out,{ecmaVersion:'latest',sourceType:'script',allowReturnOutsideFunction:true});
fs.writeFileSync(outp,'window.__ISO=window.__ISO||[];\n'+out);console.log('isolated',n,'statements',inp);
