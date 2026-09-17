const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),checkOnly=process.argv.includes('--check');
const read=n=>fs.readFileSync(path.join(root,n),'utf8').replace(/^\uFEFF/,'');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const results=[];
const check=(name,ok,detail='')=>results.push({name,status:ok?'passed':'failed',detail});
const skip=(name,detail)=>results.push({name,status:'skipped',detail});
const common=read('維護資料/入口共用規則.md');
for(const [platform,target] of [['GPT','GPT-5.6'],['Claude','Sonnet 5']]){
 const entry='00_'+platform+'_系統提示.md';
 const text='# ANIMA Compiler — '+target+' 系統提示 v0.2.4\n\n'+common+'\n\n'+read('維護資料/'+platform+'適配.md');
 if(!checkOnly)fs.writeFileSync(path.join(root,entry),text,'utf8');
 check(platform+' 入口與來源一致',read(entry)===text);
 check(platform+' 文字交付及來源維護邊界',text.includes('不呼叫圖片生成')&&text.includes('衍生檔')&&text.includes('_meta'));
 const run=cp.spawnSync(process.execPath,[path.join(__dirname,'核心檢查.cjs'),'--platform='+platform,'--check'],{encoding:'utf8'});
 process.stdout.write(run.stdout||'');if(run.stderr)process.stderr.write(run.stderr);
 check(platform+' 專案核心檢查',run.status===0);
}
const cases=JSON.parse(read('驗收/模型測試案例.json'));
let doc='# 模型驗收案例 v0.2.4\n\n本檔由模型測試案例.json產生，不手改。使用專案模式：00入口及三份正式附件；完整載入版停止維護。\n\n狀態：NOT_RUN。測試時不要把判準提供給受測模型；逐輪保存回覆與工具活動。\n\n## 冒煙順序\n\n先跑全部critical，再跑其餘指定案例：\n\n'+cases.smoke_case_ids.join('、')+'\n\n## 全部案例\n';
for(const c of cases.cases){doc+='\n### '+c.id+' '+c.name+'（'+c.severity+'）\n\n';c.turns.forEach((t,i)=>{doc+='第'+(i+1)+'輪：'+t+'\n\n';});doc+='判準：\n\n'+c.assertions.map(x=>'- '+x).join('\n')+'\n';}
const md='驗收/模型驗收案例.md';if(!checkOnly)fs.writeFileSync(path.join(root,md),doc,'utf8');
check('案例及統一說明同步',cases.cases.length===75&&read(md)===doc);
const manifest=JSON.parse(read('維護資料/v024_source_manifest.json'));
check('正式來源與v0.2.4清單一致',manifest.files.every(f=>fs.existsSync(path.join(root,f.name))&&hash(path.join(root,f.name))===f.sha256));
check('證據檔納入清單',manifest.files.some(f=>f.name==='observations.md'));
if(!manifest.source||!fs.existsSync(manifest.source))skip('外部來源包核對','未設定或無法存取外部來源；未執行，不計為通過');
else check('外部來源包核對',manifest.files.every(f=>fs.existsSync(path.join(manifest.source,f.name))&&hash(path.join(manifest.source,f.name))===f.sha256));
const out={checked_at:new Date().toISOString(),version:'0.2.4',passed:results.filter(x=>x.status==='passed').length,failed:results.filter(x=>x.status==='failed').length,skipped:results.filter(x=>x.status==='skipped').length,total:results.length,results,model_execution_status:'NOT_RUN'};
fs.writeFileSync(path.join(root,'驗收/平台入口檢查結果.json'),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));if(out.failed)process.exitCode=1;
