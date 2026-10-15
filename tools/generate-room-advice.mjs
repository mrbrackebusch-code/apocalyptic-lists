#!/usr/bin/env node
// Canonical room-specific advice wording. Numeric details come from encounter data.
// Conserve usage: generation and --check are local; neither runs a build campaign.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const variants=JSON.parse(read('implementation/encounters.json')).variants;
const name=id=>id==='ALL'?'ALL':id.replace(/^[AE]-/,'');
const names=ids=>ids.map(name).join(', ');
const order=a=>a.join(', ');
const indexes=(a,move)=>a.flatMap((m,i)=>m===move?[i]:[]).join(', ');
function strategy(x){
 const a=x.lists,f=x.expected.lists,m=x.stations[0].markedIndex;
 const owner=(side,move)=>name(x.actors.find(a=>a.side===side&&a.ability===move).id);
 const last=f.allyMoves.length-1;
 switch(x.room){
 case 1:return `Create allied moves: ${order(f.allyMoves)}. Guardian's Ward ${f.allyValues[f.allyMoves.indexOf('Ward')]} protects Medic before the incoming Strike; Medic then heals ${f.allyValues[f.allyMoves.indexOf('Mend')]}. Blade's final Strikes hit Raider for ${2*f.allyValues[last-1]} and Decoy for ${2*f.allyValues[last]}.${x.numberHint?' Keep the '+x.numberHint+' leading Wait '+(x.numberHint===1?'entry':'entries')+'.':''}`;
 case 2:return `Get roster index ${m}: ${name(x.rosterIDs[m])}. Hold that Sprite so its ${owner('enemy','Strike')===name(x.rosterIDs[m])?'Strike':'Flurry'} cannot hit Medic. Holding the actor stops its casting; leave the roster and move lists as they are. Then run the protected Ward, Mend, Strike plan.`;
 case 3:return `Set enemy move index ${m} from Strike to Wait. This cancels Raider's ${2*a.enemyValues[m]} damage to Medic without shifting any rows. Leave every other entry unchanged; Guardian and Medic can then protect and heal Medic through the pass.`;
 case 4:return `Append Strike to allied moves. It lands at index ${last}, using the waiting power ${f.allyValues[last]} to deal ${2*f.allyValues[last]} damage to Raider. The earlier Strike deals ${2*f.allyValues[f.allyMoves.indexOf('Strike')]} damage; together they finish Raider after Ward and Mend keep Medic alive.`;
 case 5:return `Insert Ward at allied index ${m}, before Mend. It uses power ${f.allyValues[m]} to absorb Decoy's ${2*a.enemyValues[m]} damage to Medic. The earlier Strike hits Boss; after the shield, Mend heals Medic and the remaining Strikes finish Boss and Decoy. Move entries shift; values and targets stay put.`;
 case 6:return `Prepend Wait to enemy moves. Raider's first Strike moves from index 0 to 1, where Guardian's Ward ${f.allyValues[1]} absorbs its ${2*f.enemyValues[1]} damage to Medic. Only enemy move names shift. The allied plan then heals Medic and finishes Raider.`;
 case 7:return `Remove the Ward at enemy index ${m}; discard the removed string. Shaman loses the shield cast for Boss. Later enemy moves shift left, while powers and targets stay put. Allied Ward protects Medic, and Blade's Strikes can damage the unshielded enemies.`;
 case 8:return `Set the existing last allied move, index ${last} (length minus 1), to Strike. Its power ${f.allyValues[last]} deals ${2*f.allyValues[last]} damage to Raider after the earlier small Strike. Do not append: the needed power and target are already in this last row.`;
 case 9:return `Remove just the first allied Wait. Ward moves to index 0 and uses power ${f.allyValues[0]} to block Raider's ${2*a.enemyValues[0]} opening damage to Medic. Mend and the Strikes move earlier too. Keep the value and target lists still, so the moves use their new rows' powers.`;
 case 10:return `Remove the last enemy move at index ${a.enemyMoves.length-1}. This deletes Raider's final Strike ${a.enemyValues.at(-1)}, which would deal ${2*a.enemyValues.at(-1)} damage to Medic. Keep the earlier moves and all values/targets. Ward and Mend handle the opening hit; survival through this one pass wins.`;
 case 11:return `Get-and-remove the first roster Sprite: ${name(x.rosterIDs[0])}. Banish that returned Sprite, so it is absent and cannot cast. Removing its roster entry alone does not stop it. Blade's final Strike ${f.allyValues[last]} targets ALL, dealing ${2*Math.ceil(f.allyValues[last]/2)} damage to each remaining enemy.`;
 case 12:return `Find Ward in enemy moves: index ${a.enemyMoves.indexOf('Ward')}. Set that entry to Wait, keeping the list length. This prevents Shaman's power ${a.enemyValues[a.enemyMoves.indexOf('Ward')]} shield on Boss. Guardian's Ward and Medic's Mend keep Medic safe while Blade hits the unshielded targets.`;
 case 13:return `Hold every roster Sprite, in this setup: ${names(x.rosterIDs)}. This stops Strike, Flurry and Venom, so none can answer the allied attacks. Keep every Sprite in the roster; pass each real Sprite to hold. Then run the supplied Strike, Reap and Flurry attacks to clear the enemies.`;
 case 14:return `Swap allied powers at indices 0 and 3 using a saved number: ${a.allyValues[0]} and ${a.allyValues[3]} become ${f.allyValues[0]} and ${f.allyValues[3]}. Blade's first Strike now deals 2 to Small (2 HP); the last deals ${2*f.allyValues[3]} to Boss (${x.actors.find(a=>a.id==='E-Boss').hp} HP). Leech and Mend keep Blade alive between hits. Do not spend the large hit on Small.`;
 case 15:return `Change BOTH enemy Wards, indices ${indexes(a.enemyMoves,'Ward')}, to Wait. Leave Strike and Flurry where they are. Removing these power-9 shields lets Venom ${f.allyValues[0]} keep hurting enemies and lets Blade's later Strikes finish them. Replacing only the first Ward leaves another shield.`;
 case 16:return `Build allied moves from empty: ${order(f.allyMoves)}. For every enemy Strike use Ward; for every Wait use Strike. Ward power 3 protects Medic against each Strike's 4 damage; Blade's power-3 Strikes deal 6 in the openings. Read every source move in its current order.`;
 case 17:return `Get-and-remove the last reserve move: ${x.sourceMoves.at(-1)}. Append that returned move to allied moves at index ${last}. It uses power ${f.allyValues[last]} against Raider. ${x.sourceMoves.at(-1)==='Reap'?'The earlier Strike wounds Raider, so Executioner\'s Reap can finish the missing-HP target.':'Blade\'s final Strike deals '+2*f.allyValues[last]+' damage to finish Raider.'} Keep the other reserve entries.`;
 case 18:return `Remove enemy power ${a.enemyValues[m]} at index ${m}; append that returned number to allied values at index ${last}. Raider's dangerous Strike is left with power ${f.enemyValues[m]}, while Blade's final Strike gains ${f.allyValues[last]} and deals ${2*f.allyValues[last]} damage. Leave move and target lists unchanged.`;
 case 19:return `Choose a random roster index from 0 to ${x.rosterIDs.length-1}, then hold the returned Sprite. This setup's choices are ${names(x.rosterIDs)}; either choice works. Keep both roster entries. Ward 5 limits incoming damage, and Medic's Mend 3 heals and clears Venom so Medic survives the pass.`;
 case 20:return `Reverse only enemy moves to: ${order(f.enemyMoves)}. Enemy attacks are delayed until the last rows. Blade wounds Raider, Ranger's Flurry hits Shaman before its delayed Ward, and Executioner's Reap finishes wounded targets. Keep enemy powers and targets fixed; reversing those too would change the plan.`;
 case 21:return `Find the first enemy Strike at index ${a.enemyMoves.indexOf('Strike')}; insert Ward at that same allied index. It uses power 6 to block Raider's 6 damage to Medic. Mend shifts to the next row, followed by the remaining Strikes. Keep all powers and targets in their original rows.`;
 case 22:return `Remove the Raider Sprite from enemy targets at index ${m}, then prepend that SAME Sprite to this target list. Blade's first Strike ${a.allyValues[0]} now deals ${2*a.allyValues[0]} to Raider (${x.actors.find(a=>a.id==='E-Raider').hp} HP), killing it before its lethal reply to Medic. Preserve the other targets' order and all other lists.`;
 case 23:return `Find and remove enemy Ward at index ${a.enemyMoves.indexOf('Ward')}. Discard the string; leave values and targets fixed. Raider's next Strike shifts onto the row where Guardian casts Ward ${f.allyValues[f.allyMoves.indexOf('Ward')]}. Shaman also loses its shield cast. Medic heals, then Blade clears the unshielded enemies.`;
 case 24:return `Use Station 1 FIRST: prepend Wait to enemy moves. Raider's Strike shifts from index ${a.enemyMoves.indexOf('Strike')} to ${a.enemyMoves.indexOf('Strike')+1}. THEN use Station 2: set that shifted Strike to Wait. Its ${2*a.enemyValues[a.enemyMoves.indexOf('Strike')+1]} damage is cancelled, leaving Medic safe while Blade finishes Raider. Both station actions are required in this order.`;
 case 25:return `Set allied Wait to Ward only at indices ${indexes(f.allyMoves,'Ward')}, where enemy moves are Strike. Each Ward 6 blocks Raider's 8 damage down to 2; Mend 4 restores Medic between hits. Keep harmless Wait fillers and existing attacks. Blade's three Strikes 4 deal 24 total damage to Raider.`;
 case 26:return `Build from empty: ${order(f.allyMoves)}. Ward every Strike. Use Mend for the first opening AFTER an attack; Strike in all other openings. Ward 2 reduces each 4-damage hit to 2; Mend 2 restores Medic. Blade's remaining Strikes each deal 4 to Raider. A leading opening is for Strike, not Mend.`;
 case 27:return `Station 1: hold ${names(x.rosterIDs)}. Station 2: change enemy Wards at indices ${indexes(a.enemyMoves,'Ward')} to Wait. King then has no shields, and the held attackers cannot cast. Five Strikes 2 deal 20 to King; Ranger's Flurry 8 breaks Raider's one-hit shield and clears its 6 HP; Strike 3 clears Wisp's 6 HP.`;
 default:throw Error('Unknown room '+x.room);
 }
}
const entries=variants.map(x=>{
 const rid='R'+String(x.room).padStart(2,'0');
 const reference=`implementation/learner-states/rooms/${rid}.ts`;
 return {room:x.room,variant:x.variant,text:strategy(x),provenance:{encounter:`implementation/encounters.json#/variants/${variants.indexOf(x)}`,encounter_sha256:hash(JSON.stringify(x)),reference,reference_sha256:hash(read(reference)),goal:'expected lists/effects/history in the named encounter; checked against retained learner-states/RESULTS.json',instruction:x.instruction}};
});
if(entries.length!==81||new Set(entries.map(e=>e.room+'-'+e.variant)).size!==81)throw Error('Expected all 27 x 3 variants');
for(let r=1;r<=27;r++)for(let v=1;v<=3;v++)if(!entries.some(e=>e.room===r&&e.variant===v))throw Error('Missing '+r+'-'+v);
const data=JSON.stringify({schema:'AL-ROOM-ADVICE-1',generated_by:'tools/generate-room-advice.mjs',index_convention:'zero-based, matching the visible list rows',purpose:'Optional explicit gameplay solutions requested by owner; does not execute or replace learner code',entries},null,2)+'\n';
let ts='// Generated by tools/generate-room-advice.mjs. Read-only optional help.\nnamespace apocAdvice {\n    export function text(room: number, variant: number): string {\n';
for(const e of entries)ts+=`        if (room == ${e.room} && variant == ${e.variant}) return ${JSON.stringify(e.text)}\n`;
ts+='        return "Advice unavailable for this room setup."\n    }\n}\n';
for(const [p,content] of [['implementation/room-advice.json',data],['implementation/supplied-world/advice.ts',ts]]){
 if(process.argv.includes('--check')){if(read(p)!==content)throw Error('Stale advice: '+p);}
 else fs.writeFileSync(path.join(root,p),content);
}
console.log(`${process.argv.includes('--check')?'Checked':'Generated'} 81 room/variant advice entries with encounter and handler provenance.`);
