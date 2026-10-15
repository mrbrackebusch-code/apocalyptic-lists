#!/usr/bin/env node
// Deterministic authoring-only Recipe and cumulative-state builder.
// Does not install a reference as current learner code or reset progress.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const stable = x => JSON.stringify(sort(x), null, 2) + '\n';
function sort(x) { if (Array.isArray(x)) return x.map(sort); if (x && typeof x==='object') return Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])); return x; }
function options(args) {
 const result={check:false,strict:false,gameRoot:defaultRoot,commonRoot:null,repository:'mrbrackebusch-code/apocalyptic-lists'};
 for(let i=0;i<args.length;i++) {
  if(args[i]==='--check') result.check=true;
  else if(args[i]==='--release-strict') result.strict=true;
  else if(args[i]==='--game-root') result.gameRoot=path.resolve(args[++i]||'');
  else if(args[i]==='--common-root') result.commonRoot=path.resolve(args[++i]||'');
  else if(args[i]==='--repository') result.repository=args[++i];
  else throw new Error('Unknown argument: '+args[i]);
 }
 if(!result.commonRoot) result.commonRoot=path.resolve(result.gameRoot,'handoffs/implementation-2026-10-12/prepared');
 if(!/^[\w.-]+\/[\w.-]+$/.test(result.repository)) throw new Error('Expected owner/repository');
 return result;
}
function contained(root, rel) {
 if (path.isAbsolute(rel) || rel.split(/[\\/]/).includes('..') || rel==='') throw new Error('Unsafe relative path: '+rel);
 const full=path.resolve(root,rel); if(!(full.startsWith(root+path.sep))) throw new Error('Escapes input root: '+rel); return full;
}
function build(opts) {
 const root=opts.gameRoot, commonRoot=opts.commonRoot;
 const read=(base,p)=>fs.readFileSync(contained(base,p),'utf8').replace(/\r\n/g,'\n');
 const get=(base,p)=>JSON.parse(read(base,p));
 const mapping=get(root,'copy/ROOM_TEACHING_MAP.json'),catalog=get(root,'implementation/LEARNER_STATE_CATALOG.json');
 const goals=get(commonRoot,'ROOM_GOALS.json');
 const nativePath=contained(root,'validation/native-tutorial/RESULTS.json');
 const nativeProof=fs.existsSync(nativePath)?JSON.parse(fs.readFileSync(nativePath,'utf8')):null;
 if(mapping.rooms.length!==27 || catalog.rooms.length!==27 || goals.variants.length!==81) throw new Error('Expected exactly 27 lessons, catalog entries and 81 shared goals');
 const outputs=new Map(),cumulatives=[], media=[],index=[], sourceHashes={};
 const recipeLink=id=>'#recipe:https://github.com/'+opts.repository+'/recipes/'+id.toLowerCase();
 const directoryLink='[Recipe directory](#recipe:https://github.com/'+opts.repository+'/recipes/directory)';
 const resolveLinks=s=>s.replace(/\{\{recipe:(R\d{2})\}\}/g,(_,id)=>'[Open '+id+']('+recipeLink(id)+')').replace(/\{\{directory\}\}/g,directoryLink);
 const captured=new Map();
 const captureDir=contained(root,'copy/media');
 if(fs.existsSync(captureDir))for(const name of fs.readdirSync(captureDir).filter(n=>n.endsWith('-captures.json')).sort()){
  const doc=JSON.parse(fs.readFileSync(path.join(captureDir,name),'utf8'));
  for(const m of doc.captures||[]){if(captured.has(m.id))throw Error('Duplicate media capture '+m.id);captured.set(m.id,m);}
 }
 const header='// CUMULATIVE INSTRUCTIONAL REFERENCE ONLY; never automatically install as learner code.\n// World progress belongs to supplied world settings; behavior belongs to the currently edited program.\n\n';
 for(let k=1;k<=27;k++) {
  const id='R'+String(k).padStart(2,'0');const item=mapping.rooms[k-1],record=catalog.rooms[k-1];
  if(item.room!==id||record.room!==id||item.sequence!==k||record.sequence!==k)throw new Error('Catalog/order mismatch at '+id);
  const source=read(root,item.reference_file);
  const expected=`apocalypse.onInteract(apocTypes.Room.${id}, apocTypes.Station.Primary, function ()`;
  if(!source.includes(expected)) throw new Error(id+' missing primary native handler');
  const occurrences=(source.match(/apocalypse\.onInteract\(/g)||[]).length;
  if(occurrences!==(k===24||k===27?2:1)) throw new Error(id+' wrong station registrations');
  if(source.includes('solveRoom')||/\b(?:pause|async|await|setTimeout|controller\.onEvent)\b/.test(source)) throw new Error(id+' reference contains disallowed learner behavior');
  if(record.isolated.sha256!==hash(source)) throw new Error(id+' isolated SHA mismatch in catalog; do not overwrite source outside canonical room file');
  cumulatives.push(source.replace(/^\/\/[^\n]*\n/,'').trim());
  const cumulative=header+cumulatives.join('\n\n')+'\n';
  outputs.set(item.cumulative_file,cumulative);
  const cumulativeHash=hash(cumulative),sourceHash=hash(source);sourceHashes[id]={isolated:sourceHash,cumulative:cumulativeHash};
  const canonical=read(root,item.recipe_source);
  if(!canonical.includes(`<!-- AP_RECIPE id=${id} same_project=true -->`) || !canonical.includes('### @explicitHints true'))throw new Error(id+' missing same-project Recipe identity / hint mode');
  const token=`<!-- AP_HINT cumulative=${id} -->`;
  if(canonical.split(token).length!==2) throw new Error(id+' must have exactly one canonical hint binding');
  for(const kind of ['blocks','before-after']) {
   if(!canonical.includes(`<!-- AP_MEDIA id=${id}-${kind} -->`)) throw new Error(id+' missing '+kind+' planned medium binding');
  }
  if(/^[ \t]*```(?:template|customts|package|assetjson)\b/m.test(canonical)) throw new Error(id+' cannot reinitialize learner workspace in a Recipe');
  if(canonical.indexOf('After success')>canonical.indexOf(token)) throw new Error(id+' continuation must precede hint');
  const hint=['#### ~ tutorialhint','','```blocks',cumulative.trim(),'```'].join('\n');
  // Ghost supplies native vocabulary to the editor's toolbox, not executable learner code.
  const ghost=['```ghost',source.replace(/^\/\/[^\n]*\n/,'').trim(),'```'].join('\n');
  let render=resolveLinks(canonical.replace(token,ghost+'\n\n'+hint));
  if((render.match(/^#### ~ tutorialhint$/gm)||[]).length!==1)throw new Error(id+' hint injected incorrectly');
  const outputPath=item.recipe_output;
  // The two captures have different purposes. Bind only actual, source-matched files.
  const planned=[];
  const targets=[['blocks','assembled_native_blocks'],['before-after','game_before_after']];
  if(!Array.isArray(item.media)||item.media.length!==targets.length) throw new Error(id+' requires exactly two independent media targets');
  for(let j=0;j<targets.length;j++) {
   const [suffix,kind]=targets[j],m=item.media[j];
   if(m.id!==id+'-'+suffix||m.kind!==kind)throw new Error(id+' wrong media target ID/kind '+m.id);
   const stations=['R24','R27'].includes(id)?['Primary','Secondary']:['Primary'];
   if(!Array.isArray(m.station_interactions)||m.station_interactions.join(',')!==stations.join(','))throw new Error(id+' wrong ordered media stations');
   if(!Array.isArray(m.dimensions)||m.dimensions[0]!==480||m.dimensions[1]!==360)throw new Error('Incorrect media capture plan dimensions');
   if(!goals.variants.some(v=>v.goalId===m.variant_id&&v.roomId===id))throw new Error('Bad planned media variant ID '+m.variant_id);
   if(typeof m.alt_text!=='string'||!m.alt_text.trim()||typeof m.focal_change!=='string'||!m.focal_change.trim())throw new Error(id+' missing media alt text or focal change');
   const binding={id:m.id,kind,room:id,variant_id:m.variant_id,reference_source:item.reference_file,reference_sha256:sourceHash,cumulative_source:item.cumulative_file,cumulative_sha256:cumulativeHash,station_interactions:stations,intended_visible_change:m.intended_visible_change,focal_change:m.focal_change,alt_text:m.alt_text,dimensions:{width:480,height:360},status:'planned',capture_status:'planned',artifact_path:null,verification_status:'not_run'};
   const capture=captured.get(m.id);
   if(capture&&capture.reference_sha256===sourceHash){
    const local=capture.artifact_path.replace(/^games\/apocalyptic-lists\//,'');
    const artifact=contained(root,local);
    if(!fs.existsSync(artifact)||hash(fs.readFileSync(artifact))!==capture.sha256)throw Error('Missing/changed capture '+m.id);
    if(!capture.capture_method||!capture.evidence_path||!capture.width||!capture.height)throw Error('Incomplete capture lineage '+m.id);
    if(kind==='game_before_after'&&(capture.width!==480||capture.height!==360))throw Error('Runtime capture must retain native 480x360 '+m.id);
    Object.assign(binding,{status:capture.verification_status==='passed'?'ready':'captured',capture_status:'captured',artifact_path:local,verification_status:capture.verification_status,dimensions:{width:capture.width,height:capture.height},capture_sha256:capture.sha256,capture_method:capture.capture_method,evidence_path:capture.evidence_path});
    const url='https://raw.githubusercontent.com/'+opts.repository+'/main/'+local;
    let shown=kind==='assembled_native_blocks'&&item.support_level!=='worked'?'[Compare with complete native Blocks]('+url+')':'!['+m.alt_text.replace(/\]/g,'')+']('+url+')';
    if(kind==='assembled_native_blocks'&&item.support_level==='worked'&&capture.native_menu){
     const menu=contained(root,capture.native_menu.artifact_path);
     if(!fs.existsSync(menu)||hash(fs.readFileSync(menu))!==capture.native_menu.sha256)throw Error('Missing/changed native menu '+m.id);
     binding.native_menu=capture.native_menu;
     const menuUrl='https://raw.githubusercontent.com/'+opts.repository+'/main/'+capture.native_menu.artifact_path;
     shown='![Actual menu blocks used in '+id+']('+menuUrl+')\n\n*Find these native blocks in the toolbox.* [Open the menu picture at full size]('+menuUrl+')\n\n'+shown;
    }
    if(kind==='assembled_native_blocks'&&item.support_level==='worked')shown+='\n\n[Open the assembled Blocks at full size]('+url+')';
    render=render.replace(`<!-- AP_MEDIA id=${m.id} -->`,shown+'\n\n*'+(kind==='assembled_native_blocks'?'Native MakeCode Blocks.':'Before and after this station job in the actual game.')+'*');
   }
   media.push(binding);planned.push(m.id);
  }
  outputs.set(outputPath,render);
  index.push({id,order:k,canonical:item.recipe_source,output:outputPath,sha256:hash(render),next_recipe:item.next_recipe,reference_sha256:sourceHash,cumulative_sha256:cumulativeHash,hint_from:item.cumulative_file,media_ids:planned,overlay_only:true,initial_project_resources:false});
  // Keep the catalog's planned-media IDs aligned with the canonical teaching map.
  // Isolated learner source and all original shared contracts remain untouched.
  record.media=media.filter(m=>m.room===id);
  record.cumulative.sha256=cumulativeHash;
  const native=nativeProof?.passed&&nativeProof.isolated?.find(r=>r.id===id&&r.success&&r.source_sha256===sourceHash);
  if(native){record.native_compile='pass';record.native_decompile='pass';record.native_media_capture=media.find(m=>m.id===id+'-blocks')?.capture_status==='captured'?'captured':'not_run';record.native_evidence={path:'validation/native-tutorial/RESULTS.json',sha256:hash(fs.readFileSync(nativePath)),target:nativeProof.target,isolated_xml_sha256:native.xml_sha256,roundtrip_sha256:native.roundtrip_sha256};}
  else{record.native_compile='not_run';record.native_decompile='not_run';record.native_media_capture='not_run';delete record.native_evidence;}
 }
 const inputHashes={teaching_map:hash(read(root,'copy/ROOM_TEACHING_MAP.json')),common_goals:hash(read(commonRoot,'ROOM_GOALS.json'))};
 let directory='# Apocalyptic Lists Recipes\n\n## Continue your current game\n\nOpen the Recipe for your current room. These links keep the same project and your editable code. Complete each room in the game to open the next one.\n\n';
 for(const item of mapping.rooms)directory+='- ['+item.room+' — '+item.title+']('+recipeLink(item.room)+')\n';
 outputs.set('generated/tutorial/recipes/directory.md',directory);
 let setup=resolveLinks(read(root,'copy/setup.md'));
 const first=outputs.get(mapping.rooms[0].cumulative_file).trim();
 setup=setup.replace(/<!-- AP_HINT cumulative=R01 -->/g,'#### ~ tutorialhint\n\n```blocks\n'+first+'\n```');
 outputs.set('generated/tutorial/setup.md',setup);
 const mediaCaptured=media.filter(m=>m.capture_status==='captured').length,mediaVerified=media.filter(m=>m.verification_status==='passed').length;
 if(Array.isArray(catalog.deferred))catalog.deferred=catalog.deferred.filter(x=>!(nativeProof?.passed&&x==='Native PXT compile/decompile')&&!(mediaVerified===54&&x==='480x360 instructional media capture'));
 outputs.set('generated/tutorial/recipes/index.json',stable({schema:'AL-RECIPE-INDEX-1',existing_project_overlay:true,not_startup_project:true,repository:opts.repository,recipes:index}));
 outputs.set('generated/tutorial/MEDIA_BINDINGS.json',stable({schema:'AL-INSTRUCTION-MEDIA-2',runtime_dimensions:[480,360],count:media.length,captures:mediaCaptured===media.length?'complete':mediaCaptured?'partial':'not_run',media}));
 outputs.set('implementation/LEARNER_STATE_CATALOG.json',stable(catalog));
 const manifest={schema:'AL-RECIPE-BUILD-2',draft_complete:true,release_complete:mediaVerified===media.length,recipe_count:index.length,media_planned:media.length-mediaCaptured,media_captured:mediaCaptured,media_verified:mediaVerified,release_strict_passed:mediaVerified===media.length,accepted_program_cache:false,source_hashes:sourceHashes,input_hashes:inputHashes,generated_files:[...outputs].filter(([p])=>p.startsWith('generated/tutorial/')).map(([p,s])=>({path:p,sha256:hash(s),bytes:Buffer.byteLength(s)})).sort((a,b)=>a.path.localeCompare(b.path)),native_recipe_attachment:'not_run'};
 outputs.set('generated/RECIPE_BUILD.json',stable(manifest));
 let compared=0,written=0;
 for (const [rel,data] of [...outputs].sort((a,b)=>a[0].localeCompare(b[0]))) {
  const full=contained(root,rel);
  if(opts.check) {
   if(fs.existsSync(full)){if(fs.readFileSync(full,'utf8')!==data)throw new Error('Out of date generated output: '+rel);compared++;}
  } else {fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,data);written++;}
 }
 if(opts.strict&&mediaVerified!==media.length)throw new Error('Release-strict: '+(media.length-mediaVerified)+' instructional captures remain unverified');
 return {recipe_count:27,media_planned:media.length-mediaCaptured,media_captured:mediaCaptured,media_verified:mediaVerified,write_mode:opts.check?'check (no writes)':'write',written,compared,outputs_absent_in_check:[...outputs].filter(([p])=>opts.check&&!fs.existsSync(contained(root,p))).map(([p])=>p),native_compile:'not_run',native_recipe_attachment:'not_run'};
}
try{console.log(stable(build(options(process.argv.slice(2)))));}catch(e){console.error('build-recipes: '+e.message);process.exitCode=1;}
