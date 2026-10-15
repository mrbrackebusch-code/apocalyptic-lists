# Rev4 combat — compact settled rules

Conserve usage. This is an implementation digest of the returned Rev4 contract,
including its loss-precedence correction. Detailed model source is in Package01;
the API/state/lifecycle authority is API_CONTRACT.md. No combat redesign is assigned.

## Lists, identity and targeting

Six constant arrays: allyMoves:string[], allyValues:number[], allyTargets:Sprite[],
enemyMoves:string[], enemyValues:number[], enemyTargets:Sprite[]. Each <=10 entries,
normal values integer0..9. They can have unequal lengths. One list edit changes
only that list, never associated cells. Teaching rosters/reserves are not combat
dimensions. There are 3..4 allied actors and 1..4 enemies; every actor owns one
unique ability within its own side. Same name across opposing sides is permitted.
Every allied actor has one visible trait; enemies may be Plain. HP and maxHP are
the only numeric actor stats.

Move string identifies the one owner: dead, held or absent owner skips, never
finds a substitute. Target polarity selects a shared target stream:

| Acting side | Helpful action | Harmful action |
|---|---|---|
| Ally | allyTargets[i] | enemyTargets[i] |
| Enemy | enemyTargets[i] | allyTargets[i] |

Every target is an exact current-room Sprite reference or the one shared
ALL_TARGET noncombat Sprite. No Self, random targeting, front foe or highest HP
rule. A dead exact target remains that target and fizzles. ALL chooses all living,
present actors on the selected side in stable display order. Held actors remain
valid targets. ALL always uses ceil(value/2) base per recipient, even one recipient.
Then add consumed Empower bonus; do not halve the bonus again.

Wait is a real inert move entry with no caster; ignore its value/target cells.
Missing move is visually distinct. Missing numeric cell, zero power, unknown move,
missing/wrong-side/dead target, or unavailable owner skips only that side's action;
the other side still proceeds. Cap/type errors can reject an interaction visibly,
without correcting its lists. Invalid unique-owner/setup data is a setup error.

## Actions

For valid action effective potency p = chosen base + eligible Empower bonus.

| Move | Polarity | Exact effect |
|---|---|---|
| Strike | Harmful | One hit of 2p per chosen target. |
| Flurry | Harmful | p distinct one-damage hits per chosen target; stop for dead target, no spillover. |
| Mend | Helpful | Heal p up to maxHP, never revive dead actor. |
| Ward | Helpful | Replace one mark; next positive damage instance is reduced by up to p, then mark consumed even if it absorbed only one damage. |
| Venom | Harmful | Replace one mark; p damage at start of each later afflicted-side half-turn, including the enemy half of this same row after allied Venom. No duration/stack count. |
| Reap | Harmful | One hit of p × (maxHP−currentHP) per target; full-HP target takes zero. |
| Empower | Helpful | Replace one mark on recipient. Add its p to recipient's next non-Empower action actually cast, then consume. Invalid turn or Empower cast does not consume the old mark. New Empower replaces old. |

Marks store PowerSource references to frozen original value cells and ALL flags,
with optional consumed Empower provenance for Ward/Venom. Derive p from those
references; no new numeric shield/poison/attack/charge stat. The source caster's
later death does not erase marks. Lists remain frozen throughout playback.

## Traits

| Trait | Exact effect |
|---|---|
| Piercer | Direct damaging instances ignore Ward and leave it present. Venom ticks are not piercing. |
| Cleanser | Mend removes Venom from recipients even at full HP. |
| Steadfast | Venom ticks do no damage; ineffective mark remains visible. |
| Leech | Each direct hit actually removing HP heals living caster1 capped at maxHP; not blocked hits or Venom ticks. |

Ward can block one poison tick and is consumed. A zero-damage Reap does not consume
Ward or trigger Leech. Flurry makes Ward/Leech instance behavior visible.

## Resolution and completion

N=max of six list lengths. Resolve each index once, no second turn/pass:

1. Check starting outcome, then ally Venom ticks in stable actor order; check outcome.
2. Resolve ally action completely, all targets/hits/traits; check outcome.
3. Check enemy-half outcome, then enemy Venom ticks; check outcome.
4. Resolve enemy action completely; check outcome, then next index.

Check outcome at pass entry and exit even when N=0. At every boundary loss of all present living allies OR any named required survivor
has precedence over enemy elimination. `defeat_all` wins when no living present
enemy remains and survivors are valid, then stops before another response.
`survive_pass` requires finishing the entire pass with an ally and all required
survivors alive; absence of enemies alone does not end it early. Remaining enemies
at end of defeat_all yield incomplete. No action queue or speed stat.

Room completion additionally requires its visible list/effect task. Assess before
combat alters HP/marks. A snapshot cannot prove native source syntax; use
ACCEPTANCE_CORRECTIONS.md. Hold(actualSprite) suppresses casting; Banish removes
presence; removing a roster reference alone does neither. All six list lengths,
identities and remaining cell order must remain visible and honest.
