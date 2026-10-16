// Visual lessons are required content: menus, annotated construction and real result.
// Conserve usage: reuse unchanged native references; never install them in main.ts.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {sourceOrder,projectSources,suppliedRuntime,runtimeDimensions} from './project-source.mjs';
import {stationSources,currentRoomSource} from './instruction-sources.mjs';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const sort=x=>Array.isArray(x)?x.map(sort):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x;
const stable=x=>JSON.stringify(sort(x),null,2)+'\n';
function safe(root,rel){assert.ok(rel&&!path.isAbsolute(rel)&&!rel.split(/[\\/]/).includes('..'));const p=path.resolve(root,rel);assert.ok(p.startsWith(root+path.sep));return p;}
export function buildVisualRecipes(opts) {
 const root=opts.gameRoot,common=opts.commonRoot;
 const read=rel=>fs.readFileSync(safe(root,rel),'utf8').replace(/\r\n/g,'\n');
 const get=rel=>JSON.parse(read(rel)),outputs=new Map(),media=[],index=[],sourceHashes={};
 const plan=get('copy/visual-lessons.json'),mapping=get('copy/ROOM_TEACHING_MAP.json'),catalog=get('implementation/LEARNER_STATE_CATALOG.json');
 const reuse=get('copy/media/NATIVE_BLOCKS_REUSE.json'),sources=projectSources(root,common),runtime=suppliedRuntime(sources),screen=runtimeDimensions(sources);
 assert.equal(plan.schema,'AL-VISUAL-LESSONS-1');assert.equal(plan.jobs.length,29);assert.equal(new Set(plan.jobs.map(j=>j.id)).size,29);
 assert.equal(plan.complete_visible_examples,true);assert.equal(plan.automatic_fading,false);
 assert.equal(mapping.rooms.length,27);assert.equal(catalog.rooms.length,27);
 for(const [file,expected]of Object.entries(reuse.native_api_lf_sha256))assert.equal(hash(sources[file]),expected,'Retained native API '+file);
 const captures=new Map();
 for(const file of ['copy/media/visual-captures.json','copy/media/game-captures.json'])if(fs.existsSync(safe(root,file)))for(const record of get(file).captures){if(record.verification_status!=='passed'){if(opts.strict)throw Error(record.id+' has not passed visual review');continue;}if(file.endsWith('game-captures.json')&&!record.full_sequence&&!record.outcome_observed)continue;assert.ok(!captures.has(record.id));captures.set(record.id,record);}
 const link=id=>'#recipe:https://github.com/'+opts.repository+'/recipes/'+id.toLowerCase();
 const resolve=s=>s.replace(/\{\{recipe:(R\d{2})\}\}/g,(_,id)=>'[Open '+id+']('+link(id)+')').replace(/\{\{directory\}\}/g,'[Recipe directory](#recipe:https://github.com/'+opts.repository+'/recipes/directory)');
 const hint=code=>'#### ~ tutorialhint\n\n```blocks\n'+code.trim()+'\n```';
 const cumulativeParts=[],header='// CUMULATIVE INSTRUCTIONAL REFERENCE ONLY; never automatically install as learner code.\n// World progress belongs to supplied world settings; behavior belongs to the currently edited program.\n\n';
 function asset({id,kind,room,job,sourceHash,description}) {
  const capture=captures.get(id),binding={id,kind,room,job_id:job?.id||null,reference_sha256:sourceHash,capture_status:'planned',verification_status:'not_run',status:'planned',artifact_path:null,alt_text:description};
  if(capture) {
   assert.equal(capture.reference_sha256,sourceHash,id+' actual source');
   assert.equal(capture.verification_status,'passed',id+' verified rendering');
   const rel=capture.artifact_path.replace(/^games\/apocalyptic-lists\//,''),bytes=fs.readFileSync(safe(root,rel));
   assert.equal(hash(bytes),capture.sha256,id+' bytes');assert.ok(capture.capture_method&&capture.evidence_path,id+' provenance');
   if(job) {
    assert.equal(capture.job_id,job.id);assert.equal(capture.kind,kind);assert.equal(capture.width,318,id+' guide width');
    assert.ok(/\.svg$/i.test(rel),id+' native SVG composition');
    const focused=stationSources(read('implementation/learner-states/rooms/'+room+'.ts')).find(s=>s.id===job.id);
    assert.equal(capture.focused_source_sha256||capture.focused_handler_sha256,hash(focused.code),id+' exact focused callback');
   } else {
    assert.deepEqual([capture.width,capture.height],screen,id+' native game dimensions');
    assert.equal(capture.runtime_sources.length,sourceOrder.length-1,id+' current runtime');
    for(const s of capture.runtime_sources){assert.notEqual(s.file,'main.ts');assert.equal(s.hash_form,'raw-bytes');const input=s.file==='contracts.ts'?safe(common,s.file):safe(root,'implementation/'+s.file);assert.equal(hash(fs.readFileSync(input)),s.sha256,id+':'+s.file);}
    assert.equal(capture.outcome_observed,true,id+' actual completed outcome');
    assert.equal(capture.full_sequence,true,id+' whole physical edit and battle');
   }
   Object.assign(binding,{capture_status:'captured',verification_status:'passed',status:'ready',artifact_path:rel,capture_sha256:capture.sha256,dimensions:{width:capture.width,height:capture.height},capture_method:capture.capture_method,evidence_path:capture.evidence_path,focused_source_sha256:capture.focused_source_sha256||capture.focused_handler_sha256||null,layout_evidence:capture.layout_evidence||capture.layout_receipt||null});
   if(job)binding.teaching={station:job.station,variables:job.variables.map(v=>v.name),needed_types:job.needed_blocks.map(b=>b.type),callouts:job.callouts.map(c=>c.text)};
   else binding.capture_lineage={...capture};
  }
  media.push(binding);
  if(!capture)return '<!-- Pending required native visual: '+id+' -->';
  return '!['+description.replace(/\]/g,'')+'](https://raw.githubusercontent.com/'+opts.repository+'/main/'+binding.artifact_path+')';
 }
 for(let n=1;n<=27;n++) {
  const id='R'+String(n).padStart(2,'0'),item=mapping.rooms[n-1],record=catalog.rooms[n-1];
  assert.equal(item.room,id);assert.equal(record.room,id);
  const source=read(item.reference_file),sourceHash=hash(source),station=stationSources(source),jobs=plan.jobs.filter(j=>j.room===id);
  assert.equal(sourceHash,record.isolated.sha256,id+' reference');assert.equal(station.length,[24,27].includes(n)?2:1);assert.equal(jobs.length,station.length);
  cumulativeParts.push(source.replace(/^\/\/[^\n]*\n/,'').trim());
  const cumulative=header+cumulativeParts.join('\n\n')+'\n';
  assert.equal(hash(cumulative),reuse.references[id].cumulative,id+' retained cumulative reference');assert.equal(sourceHash,reuse.references[id].isolated,id+' retained isolated reference');
  outputs.set(item.cumulative_file,cumulative);sourceHashes[id]={isolated:sourceHash,cumulative:hash(cumulative)};
  let canonical=read(item.recipe_source);
  assert.ok(canonical.includes('<!-- AP_RECIPE id='+id+' same_project=true -->'));assert.ok(canonical.includes('### @explicitHints true'));
  assert.ok(!/^```(?:template|customts|assetjson|package)\b/m.test(canonical),id+' preserves learner project');
  for(const job of jobs) {
   assert.equal(job.source_event.sha256,sourceHash,job.id+' teaching source');
   const code=station.find(s=>s.id===job.id);assert.ok(code,job.id+' exact event');
   const visual='<!-- AP_VISUAL job='+job.id+' -->';assert.equal(canonical.split(visual).length,2,job.id+' visible construction');
   const pictures=asset({id:job.id+'-menu',kind:'native_menu_blocks',room:id,job,sourceHash,description:'Native blocks and variable setup for '+job.id})+'\n\n'+asset({id:job.id+'-assembled',kind:'annotated_native_blocks',room:id,job,sourceHash,description:'Complete '+job.station+' construction for '+id+', with explanations at the relevant blocks'});
   canonical=canonical.replace(visual,pictures);
   const token='<!-- AP_HINT station='+job.station+' -->';assert.equal(canonical.split(token).length,2,job.id+' focused hint');canonical=canonical.replace(token,hint(code.code));
  }
  const resultToken='<!-- AP_MEDIA id='+id+'-before-after -->';assert.equal(canonical.split(resultToken).length,2,id+' expected actual gameplay');
  canonical=canonical.replace(resultToken,asset({id:id+'-before-after',kind:'game_before_after',room:id,sourceHash,description:id+' actual altar interaction, list change, battle and outcome'}));
  const roomHint='<!-- AP_HINT room='+id+' -->';assert.equal(canonical.split(roomHint).length,2,id+' room-only result backup');canonical=canonical.replace(roomHint,hint(currentRoomSource(source)));
  assert.ok(!/<!-- AP_(VISUAL|HINT|MEDIA)\b/.test(canonical),id+' resolved visual bindings');
  const ghost='\n\n```ghost\n'+currentRoomSource(source)+'\n```\n';
  // MakeCode treats everything after a tutorialhint heading as hint content.
  // Keep visible result/navigation outside it even if a source token is earlier.
  canonical=canonical.split(/(?=^## )/m).map(section=>{const found=[...section.matchAll(/^#### ~ tutorialhint\n\n```blocks\n[\s\S]*?^```/gm)];assert.ok(found.length<=1,id+' one focused hint per page');if(!found.length)return section;return section.replace(found[0][0],'').trimEnd()+'\n\n'+found[0][0]+'\n\n';}).join('');
  const render=resolve(canonical).trimEnd()+ghost+'\n```customts\n'+runtime.trimEnd()+'\n```\n';
  outputs.set(item.recipe_output,render);
  const bindings=media.filter(m=>m.room===id);record.media=bindings;record.cumulative.sha256=hash(cumulative);
  record.assembly_provenance={focused_hints:true,visible_examples:true,visual_jobs:jobs.map(j=>j.id),reference_api_reuse:'copy/media/NATIVE_BLOCKS_REUSE.json'};
  index.push({id,order:n,canonical:item.recipe_source,output:item.recipe_output,sha256:hash(render),next_recipe:item.next_recipe,reference_sha256:sourceHash,cumulative_sha256:hash(cumulative),hint_from:item.reference_file,hint_scope:'current station or current room only',media_ids:bindings.map(m=>m.id),visual_jobs:jobs.map(j=>j.id),overlay_only:true,initial_project_resources:false,supplied_runtime_sha256:hash(runtime),learner_template:false});
 }
 assert.equal(media.length,85);assert.equal(new Set(media.map(m=>m.id)).size,85);
 let directory='# Apocalyptic Lists Recipes\n\n## Continue your current game\n\nOpen the Recipe for the room you are playing. Your code stays in this project.\n\n';
 for(const room of mapping.rooms)directory+='- ['+room.room+' — '+room.title+']('+link(room.room)+')\n';
 directory+='\n```customts\n'+runtime.trimEnd()+'\n```\n';
 outputs.set('generated/tutorial/recipes/directory.md',directory);
 outputs.set('generated/tutorial/recipes/index.json',stable({schema:'AL-RECIPE-INDEX-2',existing_project_overlay:true,recipes:index}));
 outputs.set('generated/tutorial/setup.md',resolve(read('copy/setup.md')));
 const captured=media.filter(m=>m.capture_status==='captured').length,verified=media.filter(m=>m.verification_status==='passed').length;
 outputs.set('generated/tutorial/MEDIA_BINDINGS.json',stable({schema:'AL-VISUAL-INSTRUCTION-MEDIA-1',runtime_dimensions:screen,guide_width:318,supplied_runtime_sha256:hash(runtime),count:85,requirements:{jobs:29,native_menu_blocks:29,annotated_native_blocks:29,game_before_after:27},captures:verified===85?'complete':'incomplete',media}));
 catalog.deferred=[];catalog.assembly_provenance={supplied_runtime_sha256:hash(runtime),runtime_dimensions:screen,focused_hints:true,complete_visible_examples:true,learner_main_comment_only:true,recipes_preserve_current_code:true,source_bound_native_blocks_reuse:'copy/media/NATIVE_BLOCKS_REUSE.json'};
 outputs.set('implementation/LEARNER_STATE_CATALOG.json',stable(catalog));
 outputs.set('generated/RECIPE_BUILD.json',stable({schema:'AL-VISUAL-RECIPE-BUILD-1',recipe_count:27,construction_count:29,required_media:85,media_planned:85-captured,media_captured:captured,media_verified:verified,release_complete:verified===85,release_strict_passed:verified===85,focused_hints:true,automatic_fading:false,accepted_program_cache:false,source_hashes:sourceHashes,teaching_plan_sha256:hash(read('copy/visual-lessons.json')),generated_files:[...outputs].filter(([p])=>p.startsWith('generated/tutorial')).map(([p,b])=>({path:p,sha256:hash(b),bytes:Buffer.byteLength(b)}))}));
 if(opts.strict)assert.equal(verified,85,'Release requires all 58 reviewed native visuals and 27 completed gameplay recordings');
 let written=0,compared=0;const absent=[];
 for(const [rel,data]of outputs){const out=safe(root,rel);if(opts.check){if(!fs.existsSync(out))absent.push(rel);else{assert.equal(fs.readFileSync(out,'utf8'),data,rel+' stale');compared++;}}else{fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,data);written++;}}
 return {recipe_count:27,construction_count:29,media_captured:captured,media_verified:verified,media_planned:85-captured,written,compared,outputs_absent_in_check:absent,native_compile:'retained exact reference/API proof',hint_scope:'current construction or current room only'};
}
