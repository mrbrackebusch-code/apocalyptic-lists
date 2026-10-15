#!/usr/bin/env node
// Executes actual returned learner TypeScript through a deliberately narrow, documented
// host-only adapter. No private correct-answer implementation is executed as learner code.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const sorted=x=>Array.isArray(x)?x.map(sorted):(x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sorted(x[k])])):x);
const json=x=>JSON.stringify(sorted(x),null,2)+'\n';
function parse(args){const o={gameRoot:defaultRoot,commonRoot:null,check:false,nativeRoundtrip:false};for(let i=0;i<args.length;i++){
 if(args[i]==='--game-root')o.gameRoot=path.resolve(args[++i]||'');else if(args[i]==='--common-root')o.commonRoot=path.resolve(args[++i]||'');else if(args[i]==='--check')o.check=true;else if(args[i]==='--native-roundtrip')o.nativeRoundtrip=true;else if(args[i]==='--native-cumulative'){o.nativeRoundtrip=true;o.nativeCumulative=true;}else throw Error('Unknown argument '+args[i]);
 }if(!o.commonRoot)o.commonRoot=path.resolve(o.gameRoot,'handoffs/implementation-2026-10-12/prepared');return o;}
function read(root,name){return fs.readFileSync(path.join(root,name),'utf8').replace(/\r\n/g,'\n');}
// STRIP ONLY: a small number of explicit simple : Sprite, : number, : string, and []
// annotations found on let variables in our isolated sources. No other TS syntax rewrite.
function adapt(source,id) {
 const inspected=source.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'');
 if(/\b(?:as\s+\w+|interface\s+|class\s+|enum\s+|namespace\s+|import\s+|export\s+|async\s+|await\s+|\.splice\(|\.map\(|\.filter\(|\.forEach\()/.test(inspected))throw Error(id+' unsupported native-host syntax');
 const stripped=source.replace(/\blet\s+([A-Za-z_]\w*)\s*:\s*(?:Sprite|string|number)(?:\[\])?(?=\s*=)/g,'let $1');
 if(/\blet\s+\w+\s*:/.test(stripped))throw Error(id+' unsupported TypeScript annotation');
 return stripped;
}
const listNames=['allyMoves','allyValues','allyTargets','enemyMoves','enemyValues','enemyTargets'];
const moveNames=new Set(['Empower','Flurry','Mend','Reap','Strike','Venom','Wait','Ward']);
function makeFixture(input, station, controls={}) {
 const actor=new Map(input.initial.actors.map(a=>[a.id,{id:a.id,held:a.held,present:a.present}]));
 const all={id:'ALL',sentinel:true};const ref=id=>id==='ALL'?all:actor.get(id);
 const convert=(k,x)=>k.endsWith('Targets')?x.map(id=>{const v=ref(id);if(!v)throw Error('Unknown fixture actor '+id);return v;}):x.slice();
 const state={lists:Object.fromEntries(listNames.map(k=>[k,convert(k,input.initial.lists[k])])),roster:input.initial.roster.map(ref),sourceMoves:input.initial.sourceMoves.slice(),effects:[],records:[],commits:0};
 const stations=new Map(), calls=[];let active=null;let currentStation=station;let randIndex=0;
 const stationSpec=s=>station.variants.find(v=>v.id===input.id)?.stations.find(t=>t.station===s);
 if(!stationSpec(1))throw Error(input.id+' station missing');
 const expose=x=>{const out=x.slice();
  Object.defineProperty(out,'insertAt',{value:function(i,val){if(!Number.isInteger(i)||i<0||i>this.length)throw Error('invalid insertAt index '+i);this.splice(i,0,val);},configurable:true});
  Object.defineProperty(out,'removeAt',{value:function(i){if(!Number.isInteger(i)||i<0||i>=this.length)throw Error('invalid removeAt index '+i);return this.splice(i,1)[0];},configurable:true});
  return out;};
 function legal(name,l){
  if(!Array.isArray(l)||l.length>10)throw Error('Invalid list '+name);
  for(const x of l){if(name.endsWith('Targets')||name==='roster') {if(x!==all&&![...actor.values()].includes(x))throw Error('Sprite identity invalid in '+name);}
   else if(name.endsWith('Values')){if(!Number.isInteger(x)||x<0||x>9)throw Error('Numeric value invalid in '+name);}
   else if(typeof x!=='string'||!moveNames.has(x))throw Error('Move invalid in '+name+': '+x);}
 }
 const en=()=>{if(!active)throw Error('Getter/commit outside active station');return active;};
 const api={
  onInteract(room,s,fn){if(!Number.isInteger(room)||!Number.isInteger(s)||typeof fn!=='function')throw Error('bad registration');stations.set(`${room}-${s}`,fn);},
  moves(side){en();return expose(state.lists[side===0?'allyMoves':'enemyMoves']);},
  values(side){en();return expose(state.lists[side===0?'allyValues':'enemyValues']);},
  targets(side){en();return expose(state.lists[side===0?'allyTargets':'enemyTargets']);},
  roster(){en();return expose(state.roster);},
  sourceMoves(){en();return expose(state.sourceMoves);},
  setMoves(side,list){commit(side===0?'allyMoves':'enemyMoves',list);},
  setValues(side,list){commit(side===0?'allyValues':'enemyValues',list);},
  setTargets(side,list){commit(side===0?'allyTargets':'enemyTargets',list);},
  setRoster(list){commit('roster',list);},setSourceMoves(list){commit('sourceMoves',list);},
  hold(sprite){effect('hold',sprite);},banish(sprite){effect('banish',sprite);},
  markedIndex(){en();return stationSpec(currentStation).markedIndex;},
  numberHint(){en();return station.variants.find(v=>v.id===input.id).numberHint;}
 };
 function commit(name,list){en();const spec=stationSpec(currentStation);if(!spec.editableLists.includes(name))throw Error('Uneditable '+name+' at station '+currentStation);
  legal(name,list);if(controls.dropCommit===name)return;
  if(name==='roster'||name==='sourceMoves')state[name]=list.slice();else state.lists[name]=list.slice();state.commits++;calls.push({station:currentStation,action:'commit',name});}
 function effect(kind,sprite){en();const spec=stationSpec(currentStation);if(kind==='hold'&&!spec.allowHold||kind==='banish'&&!spec.allowBanish)throw Error('Effect not allowed');
  if(sprite===all||![...actor.values()].includes(sprite)||!sprite.present)throw Error('Wrong Sprite identity or absent actor');
  if(controls.dropEffect===kind)return;
  if(kind==='hold')sprite.held=true;else sprite.present=false;
  state.effects.push({kind,actor:sprite});calls.push({station:currentStation,action:kind,id:sprite.id});
 }
 const context=vm.createContext({apocalypse:api,apocTypes:{Room:Object.fromEntries(Array.from({length:27},(_,i)=>['R'+String(i+1).padStart(2,'0'),i+1])),Side:{Ally:0,Enemy:1},Station:{Primary:1,Secondary:2}},
  randint(min,max){if(!Number.isInteger(min)||!Number.isInteger(max)||max<min)throw Error('Bad randint');const result=controls.randomChoice===undefined?min:controls.randomChoice===1?max:min;randIndex++;return result;}});
 // Every station attempt is transactional. PXT's world rejects all writes/effects
 // if an invocation fails; the test adapter must not accidentally accept partial work.
 // Run the actual registered VM callback INSIDE a bounded VM execution, not by
 // calling the function on the host (which would bypass the VM timeout).
 const invoke=s=>{
  currentStation=s;
  const fn=stations.get(`${Number(input.room.slice(1))}-${s}`);
  if(!fn)return false;
  const before=Object.fromEntries(listNames.map(k=>[k,state.lists[k].slice()]));
  const checkpoint={roster:state.roster.slice(),sourceMoves:state.sourceMoves.slice(),commits:state.commits,
   effectsLength:state.effects.length,callsLength:calls.length,
   actors:[...actor.values()].map(a=>({actor:a,held:a.held,present:a.present}))};
  context.__alInvoke=fn;
  active=true;
  try{
   vm.runInContext('__alInvoke()',context,{timeout:1500,filename:input.id+'-interaction.js'});
  }catch(error){
   for(const name of listNames)state.lists[name]=before[name].slice();
   state.roster=checkpoint.roster;
   state.sourceMoves=checkpoint.sourceMoves;
   state.commits=checkpoint.commits;
   state.effects.length=checkpoint.effectsLength;
   calls.length=checkpoint.callsLength;
   for(const a of checkpoint.actors){a.actor.held=a.held;a.actor.present=a.present;}
   throw error;
  }finally{
   active=false;
   delete context.__alInvoke;
  }
  state.records.push({station:s,before,after:Object.fromEntries(listNames.map(k=>[k,state.lists[k].slice()]))});
  return true;
 };
 const reset=()=>{
  for(const original of input.initial.actors){const a=actor.get(original.id);a.held=original.held;a.present=original.present;}
  for(const name of listNames)state.lists[name]=convert(name,input.initial.lists[name]);
  state.roster=input.initial.roster.map(ref);state.sourceMoves=input.initial.sourceMoves.slice();state.effects.length=0;state.records.length=0;state.commits=0;calls.length=0;
 };
 return {api,context,invoke,reset,state,actor,all,calls,stations,getRandomCalls:()=>randIndex};
}
function assess(fixture,goal,t,expectedOrder=true){
 const same=(a,b)=>a.length===b.length&&a.every((x,i)=>x===b[i]);
 const ref=id=>id==='ALL'?t.all:t.actor.get(id);
 const wrong=[];for(const name of listNames){const expected=goal.expectedLists[name].map(x=>name.endsWith('Targets')?ref(x):x);
  if(!same(t.state.lists[name],expected))wrong.push(name);}
 if(goal.sourceName==='hazardRoster'&& !same(t.state.roster,goal.expectedSource.map(ref)))wrong.push('hazardRoster');
 if(goal.sourceName==='reserveMoves'&&!same(t.state.sourceMoves,goal.expectedSource))wrong.push('reserveMoves');
 if(goal.sourceIsCombatAlias&& !same(t.state.lists.enemyMoves,goal.expectedSource))wrong.push('source-combat-alias');
 const effects=goal.allowedEffectStates.some(e=>{
  const held=[...t.actor.values()].filter(a=>a.held).map(a=>a.id).sort();
  const banished=[...t.actor.values()].filter(a=>!a.present).map(a=>a.id).sort();
  const expectedHeld=e.heldActorIds.slice().sort(), expectedB=e.banishedActorIds.slice().sort();
  return same(held,expectedHeld)&&same(banished,expectedB);
 }); if(!effects)wrong.push('Sprite effects');
 if(expectedOrder&&goal.history.length){if(t.state.records.length!==goal.history.length) wrong.push('history station count');
  else for(let i=0;i<goal.history.length;i++){
   const r=t.state.records[i],e=goal.history[i];if(r.station!==e.stationId)wrong.push('history order');
   for(const name of listNames){for(const stage of ['before','after']){
    const expect=e[stage+'Lists'][name].map(x=>name.endsWith('Targets')?ref(x):x);
    if(!same(r[stage][name],expect))wrong.push(`history ${i} ${stage} ${name}`);
   }}
  }}
 return [...new Set(wrong)];
}
function main(opt){
 const data=JSON.parse(read(opt.commonRoot,'ROOM_DATA.json'));
 const goals=JSON.parse(read(opt.commonRoot,'ROOM_GOALS.json'));
 const station=JSON.parse(read(opt.commonRoot,'STATION_MAP.json'));
 const catalog=JSON.parse(read(opt.gameRoot,'implementation/LEARNER_STATE_CATALOG.json'));
 const nativeProof=opt.nativeRoundtrip?JSON.parse(read(opt.gameRoot,'validation/native-tutorial/RESULTS.json')):null;
 if(opt.nativeRoundtrip&&!nativeProof.passed)throw Error('Native roundtrip verification requires complete actual editor compile/decompile evidence');
 const sourceFor=id=>{
  const canonical=read(opt.gameRoot,`implementation/learner-states/rooms/${id}.ts`);
  if(!opt.nativeRoundtrip)return canonical;
  const proof=opt.nativeCumulative?nativeProof.cumulative.find(r=>r.id==='R27-cumulative'&&r.success&&r.source_sha256===hash(read(opt.gameRoot,'implementation/learner-states/cumulative/R27.ts'))):nativeProof.isolated.find(r=>r.id===id&&r.success&&r.source_sha256===hash(canonical));
  if(!proof)throw Error('Missing/stale native source evidence '+id);
  const source=read(opt.gameRoot,proof.roundtrip_path);
  if(hash(source)!==proof.roundtrip_sha256)throw Error('Changed native roundtrip source '+id);
  return source;
 };
 const variants=new Map(data.variants.map(v=>[v.id,v]));const objectives=new Map(goals.variants.map(v=>[v.goalId,v]));
 const results=[];let tested=0,negative=0,random=0,repeats=0;const failures=[];let sourceReviewed=0;
 let harnessIntegrity=0;
 function assertHarness(label,condition){harnessIntegrity++;if(!condition)failures.push({id:'harness-'+label,error:'host seam regression'});}
 function execute(id,order,controls={},sourceOverride=null,desired='met'){
  const input=variants.get(id),goal=objectives.get(id);const t=makeFixture(input,station,controls);
  let source=sourceOverride===null?sourceFor(input.room):sourceOverride;
  vm.runInContext(adapt(source,id),t.context,{timeout:1500,filename:id+'.ts'});
  for(const s of order)t.invoke(s);
  const problems=assess(input,goal,t);
  const met=problems.length===0;const pass=desired==='met'?met:!met;
  if(!pass)failures.push({id,order,controls,desired,problems});
  if(desired==='met'&&sourceOverride===null){
   t.reset();for(const s of order)t.invoke(s);const repeated=assess(input,goal,t);repeats++;
   if(repeated.length)failures.push({id,order,controls,desired,repeat:true,problems:repeated});
  }
  tested++;return {pass,met,problems,t};
 }
 for(let r=1;r<=27;r++){
  const rid='R'+String(r).padStart(2,'0');const item=catalog.rooms[r-1];const source=read(opt.gameRoot,`implementation/learner-states/rooms/${rid}.ts`);
  if(item.isolated.sha256!==hash(source))throw Error(rid+' isolated source hash does not match catalog');
  if((source.match(/apocalypse\.onInteract\(/g)||[]).length!==(r===24||r===27?2:1))throw Error(rid+' wrong handler registration count');
  // Source construction audit, informational, distinct from runtime completion checks.
  const nativeTokens=['.push(','.hold(','.setMoves(','.push(','.insertAt(','.unshift(','.removeAt(','.length - 1','.shift(','.pop(','.banish(','.indexOf(', 'for (let actor of', 'savedNumber', 'for (let i =', 'let allyMoves: string[] = []', '.pop(','.removeAt(', 'randint(','.reverse(','.indexOf(','.removeAt(','.indexOf(','.unshift(','.length - 1','seenAttack','for (let actor of'];
  if(!source.includes(nativeTokens[r-1]))throw Error(rid+' pedagogical source token absent '+nativeTokens[r-1]);
  sourceReviewed++;
  for(let v=1;v<=3;v++){
   const id=`${rid}-V${v}`, order=r===24||r===27?[1,2]:[1];
   if(r===19){for(let choice of [0,1]){const run=execute(id,order,{randomChoice:choice});random++;results.push({id,draw:choice,pass:run.pass,problems:run.problems});}}
   else {const run=execute(id,order);results.push({id,pass:run.pass,problems:run.problems});}
  }
 }
 // Constrained negative checks, run through the same fixture/assessment seam.
 const negatives=[
  {id:'R03-V1',source:'// intentionally no handler\n',order:[1],reason:'no handler'},
  {id:'R04-V1',source:'apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () { let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally); allyMoves.push("Strike") })\n',order:[1],reason:'no commit'},
  {id:'R11-V1',source:null,order:[1],controls:{dropEffect:'banish'},reason:'missing effect'},
  {id:'R14-V1',source:'apocalypse.onInteract(apocTypes.Room.R14, apocTypes.Station.Primary, function () { let allyValues: number[] = apocalypse.values(apocTypes.Side.Ally); let saved = allyValues[0]; allyValues[0] = allyValues[2]; allyValues[2] = saved; apocalypse.setValues(apocTypes.Side.Ally, allyValues); })\n',order:[1],reason:'wrong index'},
  {id:'R17-V1',source:null,order:[1],controls:{dropCommit:'sourceMoves'},reason:'missing reserve source commit'},
  {id:'R18-V1',source:null,order:[1],controls:{dropCommit:'allyValues'},reason:'missing numeric destination commit'},
  {id:'R27-V1',source:null,order:[1,2],controls:{dropEffect:'hold'},reason:'missing hazard effects'},
  {id:'R27-V1',source:null,order:[1,2],controls:{dropCommit:'enemyMoves'},reason:'missing conditional move repair'},
  {id:'R24-V1',source:null,order:[1],reason:'primary alone'},
  {id:'R24-V1',source:null,order:[2],reason:'secondary alone'},
  {id:'R24-V1',source:null,order:[2,1],reason:'reversed order'}
 ];
 for(const n of negatives){const run=execute(n.id,n.order,n.controls||{},n.source,'unmet');negative++;results.push({id:n.id,negative:n.reason,pass:run.pass,problems:run.problems});}
 // Observable-state equivalence: a fixed-six loop passes V1 but fails extended V3.
 const fixedSix='apocalypse.onInteract(apocTypes.Room.R25, apocTypes.Station.Primary, function () { let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally); let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy); for (let i = 0; i <= 5; i++) { if (allyMoves[i] == "Wait" && enemyMoves[i] == "Strike") { allyMoves[i] = "Ward"; } } apocalypse.setMoves(apocTypes.Side.Ally, allyMoves); })\n';
 const equivalenceV1=execute('R25-V1',[1],{},fixedSix,'met');const extendedV3=execute('R25-V3',[1],{},fixedSix,'unmet');
 // Setter defensive-copy guarantee, separately measured in the exact mock.
 const alias=makeFixture(variants.get('R04-V1'),station);
 vm.runInContext(adapt('apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () { let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally); allyMoves.push("Strike"); apocalypse.setMoves(apocTypes.Side.Ally, allyMoves); allyMoves[0] = "Wait"; })\n','alias'),alias.context);
 alias.invoke(1);const detachedAfterCommit=alias.state.lists.allyMoves[0]===variants.get('R04-V1').initial.lists.allyMoves[0];if(!detachedAfterCommit)failures.push({id:'alias',error:'setter failed to detach'});
 // Host harness integrity cases: these are tests of the TEST, not extra claims
 // about gameplay, the battle engine or native Blocks. Failed calls must roll back.
 function rollbackCase(label,source,expectedError){
  const fixture=makeFixture(variants.get('R04-V1'),station);
  const initial=fixture.state.lists.allyMoves.slice();
  vm.runInContext(adapt(source,label),fixture.context,{timeout:1500});
  let rejected=false;
  try{fixture.invoke(1);}catch(e){rejected=String(e.message).includes(expectedError);}
  assertHarness(label+'-rejected',rejected);
  assertHarness(label+'-list-atomic',fixture.state.lists.allyMoves.length===initial.length&&fixture.state.lists.allyMoves.every((x,i)=>x===initial[i]));
  assertHarness(label+'-no-record',fixture.state.records.length===0&&fixture.state.commits===0&&fixture.state.effects.length===0);
 }
 rollbackCase('unauthorized-after-commit',
  'apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () { let a: string[] = apocalypse.moves(apocTypes.Side.Ally); a.push("Strike"); apocalypse.setMoves(apocTypes.Side.Ally,a); apocalypse.setMoves(apocTypes.Side.Enemy,["Wait"]); })',
  'Uneditable');
 rollbackCase('invalid-element-after-commit',
  'apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () { let a: string[] = apocalypse.moves(apocTypes.Side.Ally); a.push("Strike"); apocalypse.setMoves(apocTypes.Side.Ally,a); a.push("NotAMove"); apocalypse.setMoves(apocTypes.Side.Ally,a); })',
  'Move invalid');
 rollbackCase('callback-timeout',
  'apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () { while (true) { } })',
  'Script execution timed out');
 // Actor flags and roster edits also belong to the one atomic station attempt.
 const effectRollback=makeFixture(variants.get('R11-V1'),station);
 const originalRoster=effectRollback.state.roster.slice();
 const firstActor=originalRoster[0];
 const effectSource='apocalypse.onInteract(apocTypes.Room.R11, apocTypes.Station.Primary, function () { let hazardRoster: Sprite[] = apocalypse.roster(); let actor: Sprite = hazardRoster.shift(); apocalypse.setRoster(hazardRoster); apocalypse.banish(actor); apocalypse.setMoves(apocTypes.Side.Enemy,["Wait"]); })';
 vm.runInContext(adapt(effectSource,'actor-rollback'),effectRollback.context,{timeout:1500});
 let actorRejected=false;
 try{effectRollback.invoke(1);}catch(e){actorRejected=String(e.message).includes('Uneditable');}
 assertHarness('actor-rollback-rejected',actorRejected);
 assertHarness('actor-rollback-roster',effectRollback.state.roster.length===originalRoster.length&&effectRollback.state.roster.every((a,i)=>a===originalRoster[i]));
 assertHarness('actor-rollback-presence',firstActor.present===variants.get('R11-V1').initial.actors.find(a=>a.id===firstActor.id).present);
 assertHarness('actor-rollback-effect-record',effectRollback.state.effects.length===0&&effectRollback.state.records.length===0&&effectRollback.state.commits===0);
 // Native behavior is tested with Arcade at integration. These assertions solely
 // ensure our own host adapter cannot silently over-credit invalid code.
 // Goal/variant totals and stable report. Native proof deliberately not claimed.
 const report={schema:'AL-LEARNER-VERIFICATION-1',run_command:'node tools/verify-learner-states.mjs --common-root PATH_TO_ATTACHED_COMMON',adapter:'Node vm executes exact returned native handler source after removing only explicit let-variable simple type annotations (: Sprite, string, number or []); no TS compilation, no rewriting of algorithm, no learner solution replacement',test_only_methods:'Host getter copies add insertAt(index,item), removeAt(index) with strict in-range indices; ES shift/pop/unshift/push/reverse/indexOf/for-of remain native. randint mock controls low/high ends. Setters copy staged values; actor and ALL target references are stable objects.',room_count:27,shared_variant_count:81,positive_trials:84,random_trials:random,negative_trials:negative,equivalence_regressions:2,alias_defensive_copy_trials:1,harness_integrity_assertions:harnessIntegrity,total_trials:tested,source_construction_reviews:sourceReviewed,passed:failures.length===0,failures,results,accepted_program_cache:false,semantic_scope:['exact arrays by value/reference identity','fresh variant starter data each run','registered current handler, station rules, explicit setters and real object effects','R24 ordered snapshots','both R19 random draws across three variants'],checks:{native_compile:'not_run',native_blocks_decompile:'not_run',native_sprite_allocation:'not_run',native_gameplay_and_save:'not_run',native_recipe_attachment:'not_run',instructional_media:'not_run'},limitations:['Host controls actor identity via real JavaScript objects, not Arcade Sprite allocation.','No battle engine or victory replay is run; goals are shared prebattle objective snapshots.','No native TypeScript/Blocks structural proof is claimed.','R25 state-equivalent fixed-six V1 accepted behaviorally; copy teaches dynamic current-length traversal.']};
 report.source_mode=opt.nativeCumulative?'actual_editor_generated_cumulative_typescript':opt.nativeRoundtrip?'actual_editor_generated_typescript':'canonical_reference_typescript';report.same_callback_fresh_attempt_trials=repeats;
 if(nativeProof)report.native_evidence={path:'validation/native-tutorial/RESULTS.json',sha256:hash(read(opt.gameRoot,'validation/native-tutorial/RESULTS.json')),target:nativeProof.target};
 const out=path.join(opt.gameRoot,'validation/learner-states/'+(opt.nativeCumulative?'NATIVE_CUMULATIVE_RESULTS.json':opt.nativeRoundtrip?'NATIVE_ROUNDTRIP_RESULTS.json':'RESULTS.json'));const bytes=json(report);
 if(opt.check){if(!fs.existsSync(out))throw Error('Missing validation RESULTS.json');if(fs.readFileSync(out,'utf8')!==bytes)throw Error('Stale validation RESULTS.json');}else{fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,bytes);}
 for(const c of catalog.rooms){c[opt.nativeCumulative?'native_cumulative_host_verification':opt.nativeRoundtrip?'native_roundtrip_host_verification':'host_verification']=failures.filter(f=>f.id.startsWith(c.room+'-')).length?'fail':'pass';}
 const catalogFile=path.join(opt.gameRoot,'implementation/LEARNER_STATE_CATALOG.json');
 const catalogBytes=json(catalog);
 if(opt.check){if(fs.readFileSync(catalogFile,'utf8')!==catalogBytes)throw Error('Stale host verification field in LEARNER_STATE_CATALOG.json');}
 else fs.writeFileSync(catalogFile,catalogBytes);
 return {passed:report.passed,positive_trials:report.positive_trials,same_callback_fresh_attempt_trials:repeats,source_mode:report.source_mode,negative_trials:negative,random_trials:random,harness_integrity_assertions:harnessIntegrity,failures:failures.length,equivalence_fixed_six_v1:equivalenceV1.pass,equivalence_fixed_six_v3_rejected:extendedV3.pass,alias_detached:detachedAfterCommit,report:path.relative(opt.gameRoot,out).replaceAll('\\','/'),native_compile:'not_run',native_blocks_decompile:'not_run'};
}
try{const out=main(parse(process.argv.slice(2)));console.log(json(out));if(!out.passed)process.exitCode=1;}catch(e){console.error('verify-learner-states: '+(e.stack||e.message));process.exitCode=1;}
