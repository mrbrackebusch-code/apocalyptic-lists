// Shared deterministic source transport. Conserve usage; no answers in runtime.
import fs from 'node:fs';
import path from 'node:path';
export const sourceOrder=['contracts.ts','config.ts','supplied-world/rooms.ts','supplied-world/combat.ts','supplied-world/goals.ts','supplied-world/art.ts','supplied-world/advice.ts','supplied-world/save.ts','supplied-world/view.ts','supplied-world/world.ts','learner-api.ts','main.ts','bootstrap.ts'];
export const lf=s=>s.replace(/\r\n/g,'\n');
// New games own their runtime contracts. Frozen returns remain readable when a
// portable historical package does not yet carry a game-owned contract copy.
export function sourcePath(game,common,file){const owned=path.join(game,'implementation',file);return file==='contracts.ts'&&!fs.existsSync(owned)?path.join(common,file):owned;}
export function projectSources(game,common){return Object.fromEntries(sourceOrder.map(file=>[file,lf(fs.readFileSync(sourcePath(game,common,file),'utf8'))]));}
export const suppliedRuntime=files=>sourceOrder.filter(f=>f!=='main.ts'&&files[f]).map(f=>'// SUPPLIED SOURCE '+f+'\n'+files[f].trimEnd()+'\n').join('\n');
export function runtimeDimensions(files){return ['WIDTH','HEIGHT'].map(name=>{const m=files['config.ts'].match(new RegExp('ARCADE_SCREEN_'+name+'\\s*=\\s*(\\d+)'));if(!m)throw Error('Missing screen '+name);return Number(m[1]);});}
