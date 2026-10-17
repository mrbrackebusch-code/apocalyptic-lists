#!/usr/bin/env node
// Apocalyptic Lists: deterministic native project assembly with explicit peer dependencies.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {sourceOrder,suppliedRuntime,sourcePath} from './project-source.mjs';
const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const digest=x=>crypto.createHash('sha256').update(x).digest('hex');
const sort=x=>Array.isArray(x)?x.map(sort):(x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,sort(x[k])])):x);
const stable=x=>JSON.stringify(sort(x),null,2)+'\n';
// Inspection only: ignore ordinary TS comments when guarding the blank starter and startup.
const withoutComments=s=>s.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'');
const order=sourceOrder;
function params(args){const opt={gameRoot:defaultRoot,commonRoot:null,check:false,partial:false,repository:'mrbrackebusch-code/apocalyptic-lists'};for(let i=0;i<args.length;i++){
 if(args[i]==='--check')opt.check=true;
 else if(args[i]==='--partial')opt.partial=true;
 else if(args[i]==='--repository')opt.repository=args[++i];
 else if(args[i]==='--game-root'||args[i]==='--common-root'){
  const flag=args[i],value=args[++i];
  if(!value||value.startsWith('--'))throw Error(flag+' requires a path');
  opt[flag==='--game-root'?'gameRoot':'commonRoot']=path.resolve(value);
 }
 else throw Error('Unknown argument '+args[i]);
 } if(!opt.commonRoot)opt.commonRoot=path.resolve(opt.gameRoot,'handoffs/implementation-2026-10-12/prepared');return opt;
}
function safe(root,rel){if(path.isAbsolute(rel)||rel.split(/[\\/]/).includes('..'))throw Error('Unsafe file '+rel);const candidate=path.resolve(root,rel);if(!candidate.startsWith(root+path.sep))throw Error('Path outside root '+rel);return candidate;}
function run(o){
 const commonFiles=['contracts.ts','API_CONTRACT.md','ROOM_DATA.json','ROOM_GOALS.json','STATION_MAP.json','GAME_CONTRACT.json','ACCEPTANCE_CORRECTIONS.md','COMBAT_RULES.md'];
 const hashes={};for(const file of commonFiles){const p=safe(o.commonRoot,file);if(!fs.existsSync(p))throw Error('Missing frozen common input: '+file+' (provide --common-root)');hashes[file]=digest(fs.readFileSync(p));}
 const main=safe(o.gameRoot,'implementation/main.ts');if(!fs.existsSync(main))throw Error('Missing implementation/main.ts learner starter');
 const learnerMain=fs.readFileSync(main,'utf8').replace(/\r\n/g,'\n');
 // Only comments and blank lines are accepted; generated runtime must not hide a reference solution.
 if(withoutComments(learnerMain).trim()!=='')throw Error('Canonical learner main.ts must be comment-only; do not ship a solution or registration');
 const files={},missing=[],sourceRecords=[];
 for(const rel of order){const inputPath=sourcePath(o.gameRoot,o.commonRoot,rel);
  if(!fs.existsSync(inputPath)){missing.push('implementation/'+rel);continue;}
  const value=fs.readFileSync(inputPath,'utf8').replace(/\r\n/g,'\n');files[rel]=value;
  sourceRecords.push({file:rel,source:path.relative(o.gameRoot,inputPath).replace(/\\/g,'/'),bytes:Buffer.byteLength(value),sha256:digest(value)});
 }
 // A normal integrated build must reject missing peer inputs before generating anything.
 // Partial mode is the explicitly authorized authoring-only path.
 if(missing.length&&!o.partial)throw Error('Cannot assemble complete native game. Missing peer source files: '+missing.join(', ')+'. Use --partial for authoring-only assembly.');
 const recipeArgs=[safe(o.gameRoot,'tools/build-recipes.mjs'),'--game-root',o.gameRoot,'--common-root',o.commonRoot,'--repository',o.repository];if(o.check)recipeArgs.push('--check');
 const rec=spawnSync(process.execPath,recipeArgs,{encoding:'utf8'});if(rec.status!==0)throw Error('Recipe assembly/check failed: '+(rec.stderr||rec.stdout).trim());
 if(o.check){
  let details;try{details=JSON.parse(rec.stdout);}catch{throw Error('Recipe check did not return a readable result');}
  if(details.outputs_absent_in_check?.length)throw Error('Recipe check cannot verify absent generated files: '+details.outputs_absent_in_check.join(', '));
 }
 const recipesPath=safe(o.gameRoot,'generated/tutorial/recipes/index.json');
 if(!fs.existsSync(recipesPath))throw Error('Missing generated Recipe index: '+recipesPath);
 const recipes=JSON.parse(fs.readFileSync(recipesPath,'utf8'));
 if(recipes.recipes?.length!==27)throw Error('Expected 27 generated Recipes');
 // Single world bootstrap; config is the only owner of the screen shape.
 if(files['bootstrap.ts'] && (withoutComments(files['bootstrap.ts']).match(/\bapocWorld\.start\s*\(/g)||[]).length!==1)throw Error('Expected exactly one apocWorld.start() in supplied bootstrap.ts');
 if(files['main.ts'] && (withoutComments(files['main.ts']).match(/\bapocalypse\.onInteract\(/g)||[]).length>1)throw Error('Learner starter unexpectedly contains handlers');
 if(files['config.ts']&& withoutComments(files['config.ts']).includes('namespace userconfig')===false)throw Error('Missing Package02 owned userconfig screen configuration');
 // Check for unexpected solution-bearing reference filenames in project's source list.
 if(order.some(p=>p.includes('learner-states')))throw Error('Reference source was included in production file order');
 const paletteFile=safe(o.gameRoot,'implementation/palette.json');
 const palette=fs.existsSync(paletteFile)?JSON.parse(fs.readFileSync(paletteFile,'utf8')):null;
 if(palette&&(!Array.isArray(palette)||palette.length!==16||palette.some(c=>!/^#[0-9a-f]{6}$/i.test(c))))throw Error('Expected 16 explicit hex palette slots');
 if(palette&&files['config.ts']){
  const applied=[...withoutComments(files['config.ts']||'').matchAll(/image\.setPalette\(hex`([0-9a-f\s]+)`\)/gi)];
  if(applied.length!==1||applied[0][1].replace(/\s/g,'').toLowerCase()!==palette.map(c=>c.slice(1)).join('').toLowerCase())throw Error('config.ts must apply exactly the palette.json bytes once for native tutorial transport');
 }
 const complete=missing.length===0, project={name:'apocalyptic-lists',version:'0.0.1',description:'Apocalyptic Lists — native MakeCode Arcade list tutorial',dependencies:{device:'*'},...(palette?{palette}:{}),files:order.slice(),preferredEditor:'blocksprj',supportedTargets:['arcade'],testDependencies:{}};
 const projectJson=stable(project);
 const supplied=suppliedRuntime(files);
 const outputs=new Map();
 if(complete){
  for(const f of order)outputs.set('generated/project/'+f,files[f]);
  outputs.set('generated/project/pxt.json',projectJson);outputs.set('generated/supplied-runtime.ts',supplied);
  const setup=fs.readFileSync(safe(o.gameRoot,'generated/tutorial/setup.md'),'utf8');
  if(/^```(?:template|customts|assetjson|package)\b/m.test(setup))throw Error('Starter copy cannot own runtime fences');
  const tutorial=setup.trimEnd()+'\n\n```template\n'+learnerMain.trimEnd()+'\n```\n\n```customts\n'+supplied.trimEnd()+'\n```\n';
  const firstRecipe=fs.readFileSync(safe(o.gameRoot,'generated/tutorial/recipes/r01.md'),'utf8');
  const first=firstRecipe.replace(/\n```customts\n/,'\n```template\n'+learnerMain.trimEnd()+'\n```\n\n```customts\n');
  if((first.match(/^```template$/gm)||[]).length!==1)throw Error('FIRST must have one blank learner template');
  const tutorialFiles=['main.ts','README.md','FIRST.md','recipes/directory.md',...recipes.recipes.map(r=>'recipes/'+r.id.toLowerCase()+'.md')];
  outputs.set('generated/tutorial/main.ts',learnerMain);
  outputs.set('generated/tutorial/README.md',tutorial);
  outputs.set('generated/tutorial/FIRST.md',first);
  outputs.set('generated/tutorial/pxt.json',stable({...project,files:tutorialFiles}));
 }
 const assembledList=[...outputs].map(([file,value])=>({path:file,sha256:digest(value),bytes:Buffer.byteLength(value)})).sort((a,b)=>a.path.localeCompare(b.path));
 const manifest={schema:'AL-BUILD-1',contract:'AL-IMPLEMENTATION-1.0',game:'apocalyptic-lists',complete,partial:o.partial,project_ready:complete,source_order:order,source_files:sourceRecords,missing_dependencies:missing,common_input_hashes:hashes,learner_main_sha256:digest(learnerMain),learner_main_comment_only:true,reference_solutions_in_runtime:false,accepted_program_cache:false,recipe_count:recipes.recipes.length,recipe_index_sha256:digest(fs.readFileSync(recipesPath)),assembly_outputs:assembledList,native_compilation:'not_run',native_blocks_decompile:'not_run',native_recipe_attachment:'not_run'};
 outputs.set('generated/BUILD.json',stable(manifest));
 // An incomplete partial build must not leave a previously assembled runnable game.
 // Delete only the explicit assembler-owned artifacts, not arbitrary generated files.
 const staleFullOutputs=['generated/project/pxt.json',...order.map(f=>'generated/project/'+f),'generated/supplied-runtime.ts','generated/tutorial/README.md','generated/tutorial/pxt.json','generated/tutorial/main.ts'];
 const stale=complete?[]:staleFullOutputs.filter(rel=>fs.existsSync(safe(o.gameRoot,rel)));
 if(stale.length&&o.check)throw Error('Incomplete build has stale runnable outputs: '+stale.join(', '));
 if(!o.check)for(const rel of stale)fs.rmSync(safe(o.gameRoot,rel));
 let compared=0,written=0,absent=[];
 for(const [rel,value] of [...outputs].sort((a,b)=>a[0].localeCompare(b[0]))){const output=safe(o.gameRoot,rel);
  if(o.check){if(fs.existsSync(output)){if(fs.readFileSync(output,'utf8')!==value)throw Error('Generated source stale: '+rel);compared++;}else absent.push(rel);}
  else{fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,value);written++;}
 }
 if(absent.length)throw Error('Cannot verify absent generated assembly files: '+absent.join(', ')+'. Run the corresponding write-mode build first.');
 const summary={complete,partial:o.partial,check:o.check,missing_dependencies:missing,recipe_count:manifest.recipe_count,source_files:sourceRecords.length,assembled_files:assembledList.length,compared,written,stale_runtime_removed:stale.length,absent_outputs_during_check:absent,native_compile:'not_run'};
 return summary;
}
try{console.log(stable(run(params(process.argv.slice(2)))));}catch(e){console.error('build: '+e.message);process.exitCode=1;}
