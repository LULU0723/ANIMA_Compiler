const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),checkOnly=process.argv.includes('--check');
const read=n=>fs.readFileSync(path.join(root,n),'utf8').replace(/^\uFEFF/,'');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const common=read('維護資料/入口共用規則.md');
const results=[];
for(const [platform,target] of [['GPT','GPT-5.6'],['Claude','Sonnet 5']]){
 const entry='00_'+platform+'_系統提示.md';
 const text='# ANIMA Compiler — '+target+' 系統提示 v0.2.2\n\n'+common+'\n\n'+read('維護資料/'+platform+'適配.md');
 if(!checkOnly)fs.writeFileSync(path.join(root,entry),text,'utf8');
 results.push({name:platform+' 入口與共用來源一致',pass:read(entry)===text});
 results.push({name:platform+' 文字交付與必要唯讀工具邊界',pass:text.includes('不呼叫圖片生成')&&text.includes('唯讀')});
 const args=[path.join(__dirname,'核心檢查.cjs'),'--platform='+platform];if(checkOnly)args.push('--check');
 const run=cp.spawnSync(process.execPath,args,{encoding:'utf8'});
 process.stdout.write(run.stdout||'');if(run.stderr)process.stderr.write(run.stderr);
 results.push({name:platform+' 核心及完整載入版驗證',pass:run.status===0});
}
const gpt=read('01_GPT_完整載入版.md'),claude=read('01_Claude_完整載入版.md');
for(const tag of ['ANIMA_BEHAVIOR','ANIMA_PROMPT_CONTRACT','ANIMA_CHARACTERS']){
 const extract=s=>s.split('<'+tag+'>')[1]?.split('</'+tag+'>')[0];
 results.push({name:tag+' 跨平台逐字一致',pass:!!extract(gpt)&&extract(gpt)===extract(claude)});
}
const manifest=JSON.parse(read('維護資料/v022_source_manifest.json'));
results.push({name:'目前正式來源與 v0.2.2 清單一致',pass:manifest.files.every(f=>hash(path.join(root,f.name))===f.sha256)});
results.push({name:'來源包未改（可存取時）',pass:!manifest.source||!fs.existsSync(manifest.source)||manifest.files.every(f=>hash(path.join(manifest.source,f.name))===f.sha256)});
results.push({name:'50 個待測案例齊全',pass:JSON.parse(read('驗收/模型測試案例.json')).cases.length===50});
const output={checked_at:new Date().toISOString(),adapter_version:'0.2.2',behavior_version:'0.2.2',data_version:'0.2.0',passed:results.filter(r=>r.pass).length,total:results.length,results,model_execution_status:'NOT_RUN'};
fs.writeFileSync(path.join(root,'驗收/平台入口檢查結果.json'),JSON.stringify(output,null,2)+'\n','utf8');
console.log(JSON.stringify(output,null,2));if(results.some(r=>!r.pass))process.exitCode=1;
