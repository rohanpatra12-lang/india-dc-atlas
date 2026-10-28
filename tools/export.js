// Writes the standards register and the chip records as open data files: site/data/*.json and *.csv.
// Runs as the last build step, so the downloadable data always matches what the pages use.
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.join(__dirname,'..'),OUT=path.join(ROOT,'site','data');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(ROOT,'src','data','standards.js'),'utf8'),ctx);
const S=ctx.window.STD;fs.mkdirSync(OUT,{recursive:true});
const csv=(rows,cols)=>[cols.join(',')].concat(rows.map(r=>cols.map(c=>{const v=r[c]==null?'':String(r[c]);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(','))).join('\n')+'\n';
const E=Object.values(S.E);const ec=['k','label','v','lo','hi','unit','owner','review','conf','src','used'];
fs.writeFileSync(path.join(OUT,'standards.json'),JSON.stringify({version:S.version,date:S.date,values:E,history:S.history},null,1));
fs.writeFileSync(path.join(OUT,'standards.csv'),csv(E,ec));
const C=Object.entries(S.chips).map(([id,c])=>Object.assign({id},c,{mlp_llama31_8b:(c.mlp.l8||[])[0],mlp_llama2_70b:(c.mlp.l70||[])[0],mlp_gpt_oss_120b:(c.mlp.oss||[])[0],mlp_deepseek_r1:(c.mlp.r1||[])[0],mlp_basis:Object.entries(c.mlp).map(([k,v])=>k+': '+v[1]).join(' | ')}));
const cc=['id','n','arch','mem','memT','bw','bf16','fp8','fp4','tdp','kw','kwC','kwSrc','cool','link','usd','usdSrc','inr','inrSrc','mlp_llama31_8b','mlp_llama2_70b','mlp_gpt_oss_120b','mlp_deepseek_r1','mlp_basis','specSrc'];
fs.writeFileSync(path.join(OUT,'chips.json'),JSON.stringify(S.chips,null,1));fs.writeFileSync(path.join(OUT,'chips.csv'),csv(C,cc));
console.log('exported',E.length,'standards and',C.length,'chips (version '+S.version+')');
