#!/usr/bin/env node
// Deterministic authoring-only Recipe and cumulative-state builder.
// Does not install a reference as current learner code or reset progress.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {sourceOrder,projectSources,suppliedRuntime,runtimeDimensions} from './project-source.mjs';
import {buildVisualRecipes} from './visual-recipes.mjs';
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

try{console.log(stable(buildVisualRecipes(options(process.argv.slice(2)))));}catch(e){console.error('build-recipes: '+e.message);process.exitCode=1;}
