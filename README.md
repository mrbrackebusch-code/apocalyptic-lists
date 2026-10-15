# Apocalyptic Lists

### @explicitHints true

## Your code runs the room

You can see both teams' moves, values and targets. Build and edit lists to change what happens when the battle runs. The room supplies the characters and battle rules; your Blocks control the list work at each station.

Use the simulator's expand button to play at full size. Move the small observer with the arrow keys. Walk to a labeled station and press **A** to use it. Press **B** to open the menu; use **↑ / ↓** to choose and **A** to confirm. Use **Run the plan** after your station work to watch the current lists play out.

Start with **R01**. Its allied move list is empty. [Open R01](#recipe:https://github.com/mrbrackebusch-code/apocalyptic-lists/recipes/r01) to build the first script. Keep this project as you continue: Recipe links add instructions around your own editable code.

#### ~ tutorialhint

```blocks
// CUMULATIVE INSTRUCTIONAL REFERENCE ONLY; never automatically install as learner code.
// World progress belongs to supplied world settings; behavior belongs to the currently edited program.

apocalypse.onInteract(apocTypes.Room.R01, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = []
    allyMoves = []
    for (let i = 0; i <= apocalypse.numberHint() - 1; i++) {
        allyMoves.push("Wait")
    }
    allyMoves.push("Ward")
    allyMoves.push("Mend")
    allyMoves.push("Strike")
    allyMoves.push("Strike")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
```

## Read a list, change a list

The six visible columns are independent lists. On the left are enemy values, moves and targets; on the right are allied targets, moves and values. Each column shows its current length. Row labels are indices: the first cell is **0**. A dash marks a cell beyond that list's length; it is different from an actual `Wait` move.

A station gives your code a copy of the list. Make the changes you need, then use the matching **use … as … list** block to submit that copy. The room highlights changed cells so you can compare what your code did. A target or roster entry refers to a real Sprite; the actor's displayed name helps you recognize it.

After both the task and the battle succeed, the **Exit** gate opens the next room. The B menu also offers **Retry this setup** for a fresh attempt, **Try another setup** for a changed setup, and **Revisit an unlocked room** for replay. Your earned rooms are saved; your current program remains responsible for their behavior.

If you need a complete program to compare with, use the native lightbulb hint. In later rooms, try planning the operation before opening it.

[Recipe directory](#recipe:https://github.com/mrbrackebusch-code/apocalyptic-lists/recipes/directory)

#### ~ tutorialhint

```blocks
// CUMULATIVE INSTRUCTIONAL REFERENCE ONLY; never automatically install as learner code.
// World progress belongs to supplied world settings; behavior belongs to the currently edited program.

apocalypse.onInteract(apocTypes.Room.R01, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = []
    allyMoves = []
    for (let i = 0; i <= apocalypse.numberHint() - 1; i++) {
        allyMoves.push("Wait")
    }
    allyMoves.push("Ward")
    allyMoves.push("Mend")
    allyMoves.push("Strike")
    allyMoves.push("Strike")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
```

```template
// Add your room events here.
```

```customts
// SUPPLIED SOURCE contracts.ts
// AL-IMPLEMENTATION-1.0 — frozen lead-owned runtime types, 2026-10-12.
// Conserve usage. PXT Static TypeScript, no modules, no startup or learner solution.
namespace apocTypes {
    export enum Side { Ally = 0, Enemy = 1 }
    export enum Station { Primary = 1, Secondary = 2 }
    export enum Room {
        R01 = 1, R02 = 2, R03 = 3, R04 = 4, R05 = 5, R06 = 6, R07 = 7,
        R08 = 8, R09 = 9, R10 = 10, R11 = 11, R12 = 12, R13 = 13, R14 = 14,
        R15 = 15, R16 = 16, R17 = 17, R18 = 18, R19 = 19, R20 = 20, R21 = 21,
        R22 = 22, R23 = 23, R24 = 24, R25 = 25, R26 = 26, R27 = 27
    }
    export class PowerSource {
        constructor() {}
        side: Side = Side.Ally
        index: number = 0
        isAll: boolean = false
        bonus: PowerSource = null
    }
    export class ActorSpec {
        constructor() {}
        id: string = ""
        artKey: string = ""
        side: Side = Side.Ally
        hp: number = 1
        maxHP: number = 1
        ability: string = "Strike"
        trait: string = "Plain"
        present: boolean = true
        held: boolean = false
        ward: PowerSource = null
        venom: PowerSource = null
        empower: PowerSource = null
    }
    export class ActorState {
        constructor() {}
        id: string = ""
        sprite: Sprite = null
        side: Side = Side.Ally
        hp: number = 1
        maxHP: number = 1
        ability: string = "Strike"
        trait: string = "Plain"
        present: boolean = true
        held: boolean = false
        ward: PowerSource = null
        venom: PowerSource = null
        empower: PowerSource = null
    }
    export class CombatLists {
        constructor() {}
        allyMoves: string[] = []
        allyValues: number[] = []
        allyTargets: Sprite[] = []
        enemyMoves: string[] = []
        enemyValues: number[] = []
        enemyTargets: Sprite[] = []
    }
    // Build-time actor-ID transport; never substitute these strings for Sprite identity in combat.
    export class BattleSpec {
        constructor() {}
        actors: ActorSpec[] = []
        allyMoves: string[] = []
        allyValues: number[] = []
        allyTargetIDs: string[] = []
        enemyMoves: string[] = []
        enemyValues: number[] = []
        enemyTargetIDs: string[] = []
        goal: string = "defeat_all"
        requiredIDs: string[] = []
    }
    export class RoomSpec {
        constructor() {}
        room: Room = Room.R01
        variant: number = 1 // public variant is 1..3
        instruction: string = ""
        battle: BattleSpec = null
        rosterIDs: string[] = []
        sourceMoves: string[] = []
        editableLists: string[] = [] // six constant names plus roster/sourceMoves
        allowHold: boolean = false
        allowBanish: boolean = false
        twoStations: boolean = false
        primaryIndex: number = -1
        secondaryIndex: number = -1
        numberHint: number = 0 // R01 disclosed count of leading Wait cells
    }
    export class TrialSnapshot {
        constructor() {}
        lists: CombatLists = null
        actors: ActorState[] = []
        roster: Sprite[] = []
        sourceMoves: string[] = []
        goal: string = "defeat_all"
        requiredIDs: string[] = []
    }
    export class EffectEvent {
        constructor() {}
        kind: string = "" // hold | banish; actual accepted world call
        actor: Sprite = null
    }
    export class StationRecord {
        constructor() {}
        station: Station = Station.Primary
        before: TrialSnapshot = null
        after: TrialSnapshot = null
        effects: EffectEvent[] = []
        error: string = "" // empty for committed callback
    }
    export class TraceEvent {
        constructor() {}
        kind: string = ""
        side: Side = Side.Ally
        index: number = -1
        actor: Sprite = null // source/caster, null if none
        target: Sprite = null // affected actor, null if none
        amount: number = 0
        hp: number = -1 // target HP after this event, -1 if unchanged
        mark: PowerSource = null
        move: string = ""
        reason: string = ""
    }
    export class BattleResult {
        constructor() {}
        status: string = "incomplete" // victory | defeat | incomplete | invalid
        finalActors: ActorState[] = []
        trace: TraceEvent[] = []
        errors: string[] = []
    }
    export class GoalResult {
        constructor() {}
        met: boolean = false
        messages: string[] = []
    }
    export class Progress {
        constructor() {}
        schemaVersion: number = 1
        highestUnlocked: number = 1
        resumeRoom: number = 1
        completedMask: number = 0
    }
}

// SUPPLIED SOURCE config.ts
// Package02 is the sole screen-size owner.
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 480
    export const ARCADE_SCREEN_HEIGHT = 360
}
// Tutorial customts does not inherit pxt.json's palette. Apply the same native
// palette explicitly so first launch, Recipes and project builds match.
image.setPalette(hex`000000f4e7cfbb5149d98c86d58b4be0c06d3d756a7a9c54415b9182c4c0a174ac676a732429419d7556674533151321`)

// SUPPLIED SOURCE supplied-world/rooms.ts
// AUTO-GENERATED by tools/generate-room-data.mjs from implementation/encounters.json
// DO NOT HAND EDIT. Native MakeCode Arcade TypeScript, no runtime parsing/imports.
// Actor preset keys are private; every call constructs a fresh mutable ActorSpec.
namespace apocRooms {
    function mark(side: apocTypes.Side, index: number, all: boolean, bonus: apocTypes.PowerSource): apocTypes.PowerSource {
        const v = new apocTypes.PowerSource(); v.side = side; v.index = index; v.isAll = all; v.bonus = bonus; return v;
    }
    function actor(id: string, side: apocTypes.Side, hp: number, maxHP: number, ability: string, trait: string): apocTypes.ActorSpec {
        const a = new apocTypes.ActorSpec();
        a.id = id; a.artKey = id; a.side = side; a.hp = hp; a.maxHP = maxHP;
        a.ability = ability; a.trait = trait; return a;
    }
    function actorPreset(key: number): apocTypes.ActorSpec {
        switch (key) {
            case 1: return actor("A-Blade", apocTypes.Side.Ally, 5, 5, "Strike", "Leech"); // A-Blade
            case 2: return actor("A-Guardian", apocTypes.Side.Ally, 5, 5, "Ward", "Steadfast"); // A-Guardian
            case 3: return actor("A-Medic", apocTypes.Side.Ally, 3, 6, "Mend", "Cleanser"); // A-Medic
            case 4: return actor("E-Raider", apocTypes.Side.Enemy, 8, 8, "Strike", "Plain"); // E-Raider
            case 5: return actor("E-Decoy", apocTypes.Side.Enemy, 2, 2, "Venom", "Plain"); // E-Decoy
            case 6: return actor("A-Medic", apocTypes.Side.Ally, 4, 6, "Mend", "Cleanser"); // A-Medic
            case 7: return actor("E-Raider", apocTypes.Side.Enemy, 10, 10, "Strike", "Plain"); // E-Raider
            case 8: return actor("A-Medic", apocTypes.Side.Ally, 2, 6, "Mend", "Cleanser"); // A-Medic
            case 9: return actor("E-Raider", apocTypes.Side.Enemy, 12, 12, "Strike", "Plain"); // E-Raider
            case 10: return actor("E-Wisp", apocTypes.Side.Enemy, 5, 5, "Flurry", "Plain"); // E-Wisp
            case 11: return actor("E-Shaman", apocTypes.Side.Enemy, 4, 4, "Ward", "Plain"); // E-Shaman
            case 12: return actor("E-Raider", apocTypes.Side.Enemy, 9, 9, "Strike", "Plain"); // E-Raider
            case 13: return actor("E-Wisp", apocTypes.Side.Enemy, 3, 3, "Venom", "Plain"); // E-Wisp
            case 14: return actor("A-Medic", apocTypes.Side.Ally, 3, 3, "Mend", "Cleanser"); // A-Medic
            case 15: return actor("E-Boss", apocTypes.Side.Enemy, 8, 8, "Strike", "Plain"); // E-Boss
            case 16: return actor("E-Decoy", apocTypes.Side.Enemy, 1, 1, "Venom", "Plain"); // E-Decoy
            case 17: return actor("A-Medic", apocTypes.Side.Ally, 3, 5, "Mend", "Cleanser"); // A-Medic
            case 18: return actor("E-Boss", apocTypes.Side.Enemy, 5, 5, "Strike", "Plain"); // E-Boss
            case 19: return actor("E-Boss", apocTypes.Side.Enemy, 6, 6, "Strike", "Plain"); // E-Boss
            case 20: return actor("A-Medic", apocTypes.Side.Ally, 5, 5, "Mend", "Cleanser"); // A-Medic
            case 21: return actor("E-Wisp", apocTypes.Side.Enemy, 4, 4, "Flurry", "Plain"); // E-Wisp
            case 22: return actor("E-Shaman", apocTypes.Side.Enemy, 5, 5, "Ward", "Plain"); // E-Shaman
            case 23: return actor("A-Ranger", apocTypes.Side.Ally, 5, 5, "Flurry", "Steadfast"); // A-Ranger
            case 24: return actor("A-Harvester", apocTypes.Side.Ally, 3, 5, "Reap", "Leech"); // A-Harvester
            case 25: return actor("E-Plague", apocTypes.Side.Enemy, 5, 5, "Venom", "Plain"); // E-Plague
            case 26: return actor("A-Blade", apocTypes.Side.Ally, 2, 5, "Strike", "Leech"); // A-Blade
            case 27: return actor("E-Small", apocTypes.Side.Enemy, 2, 2, "Flurry", "Plain"); // E-Small
            case 28: return actor("E-Boss", apocTypes.Side.Enemy, 10, 10, "Strike", "Plain"); // E-Boss
            case 29: return actor("E-Boss", apocTypes.Side.Enemy, 12, 12, "Strike", "Plain"); // E-Boss
            case 30: return actor("A-Venomist", apocTypes.Side.Ally, 5, 5, "Venom", "Steadfast"); // A-Venomist
            case 31: return actor("A-Medic", apocTypes.Side.Ally, 2, 5, "Mend", "Cleanser"); // A-Medic
            case 32: return actor("E-Raider", apocTypes.Side.Enemy, 5, 5, "Strike", "Plain"); // E-Raider
            case 33: return actor("E-Wisp", apocTypes.Side.Enemy, 6, 6, "Flurry", "Plain"); // E-Wisp
            case 34: return actor("E-Raider", apocTypes.Side.Enemy, 6, 6, "Strike", "Plain"); // E-Raider
            case 35: return actor("E-Shaman", apocTypes.Side.Enemy, 6, 6, "Ward", "Plain"); // E-Shaman
            case 36: return actor("A-Medic", apocTypes.Side.Ally, 4, 4, "Mend", "Cleanser"); // A-Medic
            case 37: return actor("E-Raider", apocTypes.Side.Enemy, 18, 18, "Strike", "Plain"); // E-Raider
            case 38: return actor("E-Raider", apocTypes.Side.Enemy, 24, 24, "Strike", "Plain"); // E-Raider
            case 39: return actor("A-Reaper", apocTypes.Side.Ally, 5, 5, "Reap", "Piercer"); // A-Reaper
            case 40: return actor("E-Raider", apocTypes.Side.Enemy, 14, 14, "Strike", "Plain"); // E-Raider
            case 41: return actor("E-Raider", apocTypes.Side.Enemy, 16, 16, "Strike", "Plain"); // E-Raider
            case 42: return actor("E-Raider", apocTypes.Side.Enemy, 32, 32, "Strike", "Plain"); // E-Raider
            case 43: return actor("A-Medic", apocTypes.Side.Ally, 2, 4, "Mend", "Cleanser"); // A-Medic
            case 44: return actor("E-Plague", apocTypes.Side.Enemy, 4, 4, "Venom", "Plain"); // E-Plague
            case 45: return actor("A-Executioner", apocTypes.Side.Ally, 5, 5, "Reap", "Steadfast"); // A-Executioner
            case 46: return actor("A-Ranger", apocTypes.Side.Ally, 4, 4, "Flurry", "Leech"); // A-Ranger
            case 47: return actor("E-Wisp", apocTypes.Side.Enemy, 2, 2, "Flurry", "Plain"); // E-Wisp
            case 48: return actor("A-Enchanter", apocTypes.Side.Ally, 5, 5, "Empower", "Steadfast"); // A-Enchanter
            case 49: return actor("E-Wisp", apocTypes.Side.Enemy, 7, 7, "Flurry", "Plain"); // E-Wisp
            case 50: return actor("A-Medic", apocTypes.Side.Ally, 4, 5, "Mend", "Cleanser"); // A-Medic
            case 51: return actor("E-Raider", apocTypes.Side.Enemy, 11, 11, "Strike", "Plain"); // E-Raider
            case 52: return actor("E-King", apocTypes.Side.Enemy, 20, 20, "Ward", "Plain"); // E-King
            case 53: { const a = actor("E-Raider", apocTypes.Side.Enemy, 6, 6, "Strike", "Plain"); // E-Raider
                a.ward = mark(apocTypes.Side.Enemy, 0, false, null);
                return a; }
        }
        return null;
    }
    function roomGroup0(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 1: { // R01-V1
                s.instruction = "Create an entire allied move list, including any visible leading Wait cells, in Ward→Mend→Strike→Strike order.";
                b.allyMoves = [];
                b.allyValues = [4, 3, 4, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Decoy", "E-Decoy", "E-Raider", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(5)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 2: { // R01-V2
                s.instruction = "Create an entire allied move list, including any visible leading Wait cells, in Ward→Mend→Strike→Strike order.";
                b.allyMoves = [];
                b.allyValues = [1, 3, 3, 5, 1];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Decoy", "E-Decoy", "E-Raider", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                b.actors.push(actorPreset(5)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 1;
                return s;
            }
            case 3: { // R01-V3
                s.instruction = "Create an entire allied move list, including any visible leading Wait cells, in Ward→Mend→Strike→Strike order.";
                b.allyMoves = [];
                b.allyValues = [1, 1, 5, 3, 6, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Decoy", "E-Decoy", "E-Raider", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(8)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                b.actors.push(actorPreset(5)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 2;
                return s;
            }
            case 4: { // R02-V1
                s.instruction = "Hold the marked attacking Sprite at roster index 0.";
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Shaman", "E-Raider", "E-Wisp"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = ["E-Raider", "E-Shaman", "E-Wisp"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 0; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 5: { // R02-V2
                s.instruction = "Hold the marked attacking Sprite at roster index 1.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Flurry", "Wait", "Wait"];
                b.enemyValues = [1, 5, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Shaman", "E-Raider", "E-Wisp"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = ["E-Shaman", "E-Wisp", "E-Raider"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 6: { // R02-V3
                s.instruction = "Hold the marked attacking Sprite at roster index 1.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = ["E-Wisp", "E-Raider", "E-Shaman"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 7: { // R03-V1
                s.instruction = "Target selector highlights enemy move index 0; replace Strike with Wait.";
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Wisp", "E-Raider", "E-Wisp"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(8)); // A-Medic
                b.actors.push(actorPreset(12)); // E-Raider
                b.actors.push(actorPreset(13)); // E-Wisp
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 0; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 8: { // R03-V2
                s.instruction = "Target selector highlights enemy move index 1; replace Strike with Wait.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Wisp", "E-Raider", "E-Wisp"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(8)); // A-Medic
                b.actors.push(actorPreset(12)); // E-Raider
                b.actors.push(actorPreset(13)); // E-Wisp
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 9: { // R03-V3
                s.instruction = "Target selector highlights enemy move index 2; replace Strike with Wait.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Wisp", "E-Raider", "E-Wisp"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(8)); // A-Medic
                b.actors.push(actorPreset(12)); // E-Raider
                b.actors.push(actorPreset(13)); // E-Wisp
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 2; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup1(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 10: { // R04-V1
                s.instruction = "Append supplied Strike to complete the last damage row; preset final power is 3.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait"];
                b.allyValues = [1, 3, 1, 1, 3];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 11: { // R04-V2
                s.instruction = "Append supplied Strike to complete the last damage row; preset final power is 4.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Wait"];
                b.allyValues = [1, 1, 3, 1, 1, 4];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 12: { // R04-V3
                s.instruction = "Append supplied Strike to complete the last damage row; preset final power is 5.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Wait"];
                b.allyValues = [1, 1, 1, 3, 1, 1, 5];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 13: { // R05-V1
                s.instruction = "Insert the supplied Ward at index 1 just before the second incoming hit.";
                b.allyMoves = ["Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [2, 6, 2, 2, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Decoy", "E-Decoy", "E-Boss", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(14)); // A-Medic
                b.actors.push(actorPreset(15)); // E-Boss
                b.actors.push(actorPreset(16)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 14: { // R05-V2
                s.instruction = "Insert the supplied Ward at index 2 just before the second incoming hit.";
                b.allyMoves = ["Wait", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Decoy", "E-Decoy", "E-Boss", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(14)); // A-Medic
                b.actors.push(actorPreset(15)); // E-Boss
                b.actors.push(actorPreset(16)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 2; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 15: { // R05-V3
                s.instruction = "Insert the supplied Ward at index 3 just before the second incoming hit.";
                b.allyMoves = ["Wait", "Wait", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Decoy", "E-Decoy", "E-Boss", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(14)); // A-Medic
                b.actors.push(actorPreset(15)); // E-Boss
                b.actors.push(actorPreset(16)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 3; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 16: { // R06-V1
                s.instruction = "Prepend supplied Wait at enemyMoves index zero; enemy first Strike must move to the protected row.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 6, 1, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 17: { // R06-V2
                s.instruction = "Prepend supplied Wait at enemyMoves index zero; enemy first Strike must move to the protected row.";
                b.allyMoves = ["Wait", "Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [1, 6, 2, 1, 3];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 18: { // R06-V3
                s.instruction = "Prepend supplied Wait at enemyMoves index zero; enemy first Strike must move to the protected row.";
                b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Mend", "Strike"];
                b.allyValues = [1, 6, 1, 2, 1, 3];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup2(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 19: { // R07-V1
                s.instruction = "Remove marked enemy Ward at index 0 and discard the returned string.";
                b.allyMoves = ["Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [2, 3, 3, 2];
                b.enemyMoves = ["Ward", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [4, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(17)); // A-Medic
                b.actors.push(actorPreset(18)); // E-Boss
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 0; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 20: { // R07-V2
                s.instruction = "Remove marked enemy Ward at index 1 and discard the returned string.";
                b.allyMoves = ["Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Ward", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 5, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(17)); // A-Medic
                b.actors.push(actorPreset(19)); // E-Boss
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 21: { // R07-V3
                s.instruction = "Remove marked enemy Ward at index 2 and discard the returned string.";
                b.allyMoves = ["Wait", "Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 6, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(17)); // A-Medic
                b.actors.push(actorPreset(19)); // E-Boss
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 2; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 22: { // R08-V1
                s.instruction = "Compute allyMoves.length - 1 and set that existing last element to the supplied Strike. Do not append.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Wait"];
                b.allyValues = [1, 3, 1, 1, 3];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 23: { // R08-V2
                s.instruction = "Compute allyMoves.length - 1 and set that existing last element to the supplied Strike. Do not append.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Wait", "Wait"];
                b.allyValues = [1, 1, 3, 1, 1, 4];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 24: { // R08-V3
                s.instruction = "Compute allyMoves.length - 1 and set that existing last element to the supplied Strike. Do not append.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 3, 1, 1, 5];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 25: { // R09-V1
                s.instruction = "Remove the first existing allyMoves element, a real Wait; preserve the independent allyValues and target streams.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [4, 1, 3, 2, 2];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 26: { // R09-V2
                s.instruction = "Remove the first existing allyMoves element, a real Wait; preserve the independent allyValues and target streams.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike", "Wait"];
                b.allyValues = [6, 1, 3, 3, 2, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 27: { // R09-V3
                s.instruction = "Remove the first existing allyMoves element, a real Wait; preserve the independent allyValues and target streams.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike", "Wait", "Wait"];
                b.allyValues = [4, 1, 3, 4, 2, 1, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(3)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup3(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 28: { // R10-V1
                s.instruction = "Remove the final enemyMoves entry so the lethal cast is absent, not replaced with Wait; survive the published one pass.";
                b.allyMoves = ["Ward", "Mend", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Strike"];
                b.enemyValues = [1, 1, 5, 3];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 29: { // R10-V2
                s.instruction = "Remove the final enemyMoves entry so the lethal cast is absent, not replaced with Wait; survive the published one pass.";
                b.allyMoves = ["Ward", "Mend", "Wait", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait", "Strike"];
                b.enemyValues = [1, 1, 1, 5, 4];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 30: { // R10-V3
                s.instruction = "Remove the final enemyMoves entry so the lethal cast is absent, not replaced with Wait; survive the published one pass.";
                b.allyMoves = ["Ward", "Mend", "Wait", "Wait", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 1, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait", "Wait", "Strike"];
                b.enemyValues = [1, 1, 1, 1, 5, 5];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 31: { // R11-V1
                s.instruction = "Get-and-remove FIRST actual Sprite from hazardRoster, then give the returned reference to the banish station.";
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 8];
                b.enemyMoves = ["Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Wisp", "ALL"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(21)); // E-Wisp
                b.actors.push(actorPreset(22)); // E-Shaman
                s.rosterIDs = ["E-Raider", "E-Wisp", "E-Shaman"];
                s.sourceMoves = [];
                s.editableLists = ["roster"];
                s.allowHold = false; s.allowBanish = true;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 32: { // R11-V2
                s.instruction = "Get-and-remove FIRST actual Sprite from hazardRoster, then give the returned reference to the banish station.";
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 8];
                b.enemyMoves = ["Flurry", "Wait", "Wait"];
                b.enemyValues = [6, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Wisp", "ALL"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(21)); // E-Wisp
                b.actors.push(actorPreset(22)); // E-Shaman
                s.rosterIDs = ["E-Wisp", "E-Raider", "E-Shaman"];
                s.sourceMoves = [];
                s.editableLists = ["roster"];
                s.allowHold = false; s.allowBanish = true;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 33: { // R11-V3
                s.instruction = "Get-and-remove FIRST actual Sprite from hazardRoster, then give the returned reference to the banish station.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 8];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Wisp", "ALL"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(21)); // E-Wisp
                b.actors.push(actorPreset(22)); // E-Shaman
                s.rosterIDs = ["E-Raider", "E-Shaman", "E-Wisp"];
                s.sourceMoves = [];
                s.editableLists = ["roster"];
                s.allowHold = false; s.allowBanish = true;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 34: { // R12-V1
                s.instruction = "Find indexOf(\"Ward\") in enemyMoves and set the existing element at that index to Wait.";
                b.allyMoves = ["Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [2, 3, 3, 2];
                b.enemyMoves = ["Ward", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [4, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(17)); // A-Medic
                b.actors.push(actorPreset(18)); // E-Boss
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 35: { // R12-V2
                s.instruction = "Find indexOf(\"Ward\") in enemyMoves and set the existing element at that index to Wait.";
                b.allyMoves = ["Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Ward", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 5, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(17)); // A-Medic
                b.actors.push(actorPreset(19)); // E-Boss
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 36: { // R12-V3
                s.instruction = "Find indexOf(\"Ward\") in enemyMoves and set the existing element at that index to Wait.";
                b.allyMoves = ["Wait", "Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 6, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(17)); // A-Medic
                b.actors.push(actorPreset(19)); // E-Boss
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup4(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 37: { // R13-V1
                s.instruction = "For each real Sprite in hazardRoster, submit the Sprite to hold station; every actor would otherwise act.";
                b.allyMoves = ["Strike", "Reap", "Strike", "Flurry", "Reap", "Strike"];
                b.allyValues = [2, 1, 2, 9, 2, 2];
                b.enemyMoves = ["Strike", "Flurry", "Venom", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 4, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Plague", "ALL", "E-Plague", "E-Wisp"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Harvester"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(23)); // A-Ranger
                b.actors.push(actorPreset(24)); // A-Harvester
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(25)); // E-Plague
                s.rosterIDs = ["E-Raider", "E-Wisp", "E-Plague"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 38: { // R13-V2
                s.instruction = "For each real Sprite in hazardRoster, submit the Sprite to hold station; every actor would otherwise act.";
                b.allyMoves = ["Strike", "Reap", "Strike", "Flurry", "Reap", "Strike"];
                b.allyValues = [2, 1, 2, 9, 2, 2];
                b.enemyMoves = ["Venom", "Strike", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 2, 4, 1, 1, 1];
                b.allyTargetIDs = ["A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Plague", "ALL", "E-Plague", "E-Wisp"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Harvester"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(23)); // A-Ranger
                b.actors.push(actorPreset(24)); // A-Harvester
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(25)); // E-Plague
                s.rosterIDs = ["E-Plague", "E-Raider", "E-Wisp"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 39: { // R13-V3
                s.instruction = "For each real Sprite in hazardRoster, submit the Sprite to hold station; every actor would otherwise act.";
                b.allyMoves = ["Strike", "Reap", "Strike", "Flurry", "Reap", "Strike"];
                b.allyValues = [2, 1, 2, 9, 2, 2];
                b.enemyMoves = ["Flurry", "Venom", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 3, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Plague", "ALL", "E-Plague", "E-Wisp"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Harvester"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(23)); // A-Ranger
                b.actors.push(actorPreset(24)); // A-Harvester
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(25)); // E-Plague
                s.rosterIDs = ["E-Wisp", "E-Plague", "E-Raider"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 40: { // R14-V1
                s.instruction = "Use a temporary number to exchange allyValues[0] and allyValues[3], preserving both original values.";
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike"];
                b.allyValues = [4, 1, 2, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Blade", "A-Medic", "A-Blade", "A-Blade"];
                b.enemyTargetIDs = ["E-Small", "E-Boss", "E-Boss", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Blade"];
                b.actors.push(actorPreset(26)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(27)); // E-Small
                b.actors.push(actorPreset(15)); // E-Boss
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyValues"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 0; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 41: { // R14-V2
                s.instruction = "Use a temporary number to exchange allyValues[0] and allyValues[3], preserving both original values.";
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike"];
                b.allyValues = [5, 1, 2, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Blade", "A-Medic", "A-Blade", "A-Blade"];
                b.enemyTargetIDs = ["E-Small", "E-Boss", "E-Boss", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Blade"];
                b.actors.push(actorPreset(26)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(27)); // E-Small
                b.actors.push(actorPreset(28)); // E-Boss
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyValues"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 0; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 42: { // R14-V3
                s.instruction = "Use a temporary number to exchange allyValues[0] and allyValues[3], preserving both original values.";
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike"];
                b.allyValues = [6, 1, 2, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Blade", "A-Medic", "A-Blade", "A-Blade"];
                b.enemyTargetIDs = ["E-Small", "E-Boss", "E-Boss", "E-Boss"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Blade"];
                b.actors.push(actorPreset(26)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(27)); // E-Small
                b.actors.push(actorPreset(29)); // E-Boss
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyValues"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 0; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 43: { // R15-V1
                s.instruction = "Traverse enemyMoves by index, setting EACH Ward to Wait, leaving all non-Wards untouched.";
                b.allyMoves = ["Venom", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [2, 2, 1, 3, 2];
                b.enemyMoves = ["Ward", "Strike", "Ward", "Flurry", "Wait"];
                b.enemyValues = [9, 1, 9, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Wisp", "E-Wisp", "E-Shaman"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(30)); // A-Venomist
                b.actors.push(actorPreset(31)); // A-Medic
                b.actors.push(actorPreset(32)); // E-Raider
                b.actors.push(actorPreset(33)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 44: { // R15-V2
                s.instruction = "Traverse enemyMoves by index, setting EACH Ward to Wait, leaving all non-Wards untouched.";
                b.allyMoves = ["Venom", "Wait", "Mend", "Wait", "Strike", "Strike"];
                b.allyValues = [2, 1, 3, 1, 2, 2];
                b.enemyMoves = ["Wait", "Ward", "Strike", "Ward", "Flurry", "Wait"];
                b.enemyValues = [1, 9, 1, 9, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Wisp", "E-Wisp", "E-Shaman"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(30)); // A-Venomist
                b.actors.push(actorPreset(31)); // A-Medic
                b.actors.push(actorPreset(34)); // E-Raider
                b.actors.push(actorPreset(21)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 45: { // R15-V3
                s.instruction = "Traverse enemyMoves by index, setting EACH Ward to Wait, leaving all non-Wards untouched.";
                b.allyMoves = ["Venom", "Wait", "Mend", "Strike", "Wait", "Strike", "Strike"];
                b.allyValues = [2, 1, 1, 2, 1, 3, 3];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Strike", "Ward", "Flurry", "Wait"];
                b.enemyValues = [1, 1, 9, 1, 9, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Wisp", "E-Wisp", "E-Shaman"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(30)); // A-Venomist
                b.actors.push(actorPreset(31)); // A-Medic
                b.actors.push(actorPreset(32)); // E-Raider
                b.actors.push(actorPreset(33)); // E-Wisp
                b.actors.push(actorPreset(35)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup5(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 46: { // R16-V1
                s.instruction = "Begin with EMPTY allyMoves. For each entry in read-only enemyMoves, append Ward for Strike or Strike for Wait, preserving source order.";
                b.allyMoves = [];
                b.allyValues = [3, 3, 3, 3, 3];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(36)); // A-Medic
                b.actors.push(actorPreset(37)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 47: { // R16-V2
                s.instruction = "Begin with EMPTY allyMoves. For each entry in read-only enemyMoves, append Ward for Strike or Strike for Wait, preserving source order.";
                b.allyMoves = [];
                b.allyValues = [3, 3, 3, 3, 3, 3];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(36)); // A-Medic
                b.actors.push(actorPreset(38)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 48: { // R16-V3
                s.instruction = "Begin with EMPTY allyMoves. For each entry in read-only enemyMoves, append Ward for Strike or Strike for Wait, preserving source order.";
                b.allyMoves = [];
                b.allyValues = [3, 3, 3, 3, 3, 3];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(36)); // A-Medic
                b.actors.push(actorPreset(38)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 49: { // R17-V1
                s.instruction = "Get-and-remove last from reserveMoves, and APPEND exactly the returned allied ability to allyMoves. The last reserved ability may change between setups.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait"];
                b.allyValues = [2, 2, 2, 1, 5];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(39)); // A-Reaper
                b.actors.push(actorPreset(40)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Wait", "Strike"];
                s.editableLists = ["allyMoves", "sourceMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 50: { // R17-V2
                s.instruction = "Get-and-remove last from reserveMoves, and APPEND exactly the returned allied ability to allyMoves. The last reserved ability may change between setups.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait"];
                b.allyValues = [2, 2, 2, 1, 6];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(39)); // A-Reaper
                b.actors.push(actorPreset(41)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Mend", "Wait", "Strike"];
                s.editableLists = ["allyMoves", "sourceMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 51: { // R17-V3
                s.instruction = "Get-and-remove last from reserveMoves, and APPEND exactly the returned allied ability to allyMoves. The last reserved ability may change between setups.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait"];
                b.allyValues = [2, 2, 2, 1, 7];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(39)); // A-Reaper
                b.actors.push(actorPreset(42)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Ward", "Mend", "Wait", "Reap"];
                s.editableLists = ["allyMoves", "sourceMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 52: { // R18-V1
                s.instruction = "Get-and-remove the marked enemyValues number, then append that very returned number to allyValues.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [2, 2, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 5, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyValues", "allyValues"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 2; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 53: { // R18-V2
                s.instruction = "Get-and-remove the marked enemyValues number, then append that very returned number to allyValues.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 2, 2, 1, 1];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 6, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(40)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyValues", "allyValues"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 3; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 54: { // R18-V3
                s.instruction = "Get-and-remove the marked enemyValues number, then append that very returned number to allyValues.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 1, 2, 2, 1, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 7, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(41)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyValues", "allyValues"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 4; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup6(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 55: { // R19-V1
                s.instruction = "Get random Sprite from the two-entry threatRoster; HOLD returned real actor without removing it. Both possible draws must survive.";
                b.allyMoves = ["Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [5, 2, 3, 2];
                b.enemyMoves = ["Strike", "Flurry", "Venom", "Wait"];
                b.enemyValues = [2, 2, 3, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(43)); // A-Medic
                b.actors.push(actorPreset(32)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(44)); // E-Plague
                s.rosterIDs = ["E-Raider", "E-Wisp"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 56: { // R19-V2
                s.instruction = "Get random Sprite from the two-entry threatRoster; HOLD returned real actor without removing it. Both possible draws must survive.";
                b.allyMoves = ["Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [5, 2, 3, 2];
                b.enemyMoves = ["Flurry", "Strike", "Venom", "Wait"];
                b.enemyValues = [2, 2, 3, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(43)); // A-Medic
                b.actors.push(actorPreset(32)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(44)); // E-Plague
                s.rosterIDs = ["E-Wisp", "E-Raider"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 57: { // R19-V3
                s.instruction = "Get random Sprite from the two-entry threatRoster; HOLD returned real actor without removing it. Both possible draws must survive.";
                b.allyMoves = ["Wait", "Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [1, 5, 2, 3, 2];
                b.enemyMoves = ["Wait", "Strike", "Flurry", "Venom", "Wait"];
                b.enemyValues = [1, 2, 2, 3, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "survive_pass"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(43)); // A-Medic
                b.actors.push(actorPreset(32)); // E-Raider
                b.actors.push(actorPreset(10)); // E-Wisp
                b.actors.push(actorPreset(44)); // E-Plague
                s.rosterIDs = ["E-Wisp", "E-Raider"];
                s.sourceMoves = [];
                s.editableLists = [];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 58: { // R20-V1
                s.instruction = "Reverse the entire existing enemyMoves list IN PLACE. Leave enemyValues and enemyTargets unchanged.";
                b.allyMoves = ["Wait", "Strike", "Flurry", "Reap", "Strike", "Reap"];
                b.allyValues = [1, 2, 2, 2, 1, 9];
                b.enemyMoves = ["Strike", "Flurry", "Wait", "Ward", "Wait", "Wait"];
                b.enemyValues = [4, 4, 2, 3, 3, 3];
                b.allyTargetIDs = ["A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp", "ALL"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Ranger"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(45)); // A-Executioner
                b.actors.push(actorPreset(46)); // A-Ranger
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(47)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 59: { // R20-V2
                s.instruction = "Reverse the entire existing enemyMoves list IN PLACE. Leave enemyValues and enemyTargets unchanged.";
                b.allyMoves = ["Wait", "Strike", "Flurry", "Reap", "Strike", "Reap"];
                b.allyValues = [1, 2, 2, 2, 1, 9];
                b.enemyMoves = ["Flurry", "Strike", "Wait", "Ward", "Wait", "Wait"];
                b.enemyValues = [4, 4, 4, 3, 3, 3];
                b.allyTargetIDs = ["A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp", "ALL"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Ranger"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(45)); // A-Executioner
                b.actors.push(actorPreset(46)); // A-Ranger
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(47)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 60: { // R20-V3
                s.instruction = "Reverse the entire existing enemyMoves list IN PLACE. Leave enemyValues and enemyTargets unchanged.";
                b.allyMoves = ["Wait", "Strike", "Flurry", "Reap", "Strike", "Reap"];
                b.allyValues = [1, 3, 2, 2, 1, 9];
                b.enemyMoves = ["Strike", "Flurry", "Wait", "Ward", "Wait", "Wait"];
                b.enemyValues = [4, 4, 2, 3, 3, 3];
                b.allyTargetIDs = ["A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp", "ALL"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Ranger"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(45)); // A-Executioner
                b.actors.push(actorPreset(46)); // A-Ranger
                b.actors.push(actorPreset(7)); // E-Raider
                b.actors.push(actorPreset(47)); // E-Wisp
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 61: { // R21-V1
                s.instruction = "Find indexOf(Strike) in enemyMoves and insert the one supplied Ward into allyMoves at that computed index.";
                b.allyMoves = ["Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Decoy", "E-Raider", "E-Raider", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(14)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(5)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 62: { // R21-V2
                s.instruction = "Find indexOf(Strike) in enemyMoves and insert the one supplied Ward into allyMoves at that computed index.";
                b.allyMoves = ["Wait", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Decoy", "E-Raider", "E-Raider", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(14)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(5)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 63: { // R21-V3
                s.instruction = "Find indexOf(Strike) in enemyMoves and insert the one supplied Ward into allyMoves at that computed index.";
                b.allyMoves = ["Wait", "Wait", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Decoy", "E-Raider", "E-Raider", "E-Decoy"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(14)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(5)); // E-Decoy
                s.rosterIDs = [];
                s.sourceMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup7(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 64: { // R22-V1
                s.instruction = "Get-and-remove the marked E-Raider Sprite from enemyTargets and prepend the SAME Sprite reference to enemyTargets; other five streams must not move.";
                b.allyMoves = ["Strike", "Empower", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [4, 2, 2, 2, 2, 3];
                b.enemyMoves = ["Strike", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Blade", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Shaman", "E-Raider", "E-Wisp", "E-Shaman", "E-Shaman", "E-Shaman"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(48)); // A-Enchanter
                b.actors.push(actorPreset(31)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(22)); // E-Shaman
                b.actors.push(actorPreset(49)); // E-Wisp
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyTargets"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 65: { // R22-V2
                s.instruction = "Get-and-remove the marked E-Raider Sprite from enemyTargets and prepend the SAME Sprite reference to enemyTargets; other five streams must not move.";
                b.allyMoves = ["Strike", "Empower", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [5, 2, 2, 2, 2, 3];
                b.enemyMoves = ["Strike", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 2, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Blade", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Shaman", "E-Wisp", "E-Raider", "E-Shaman", "E-Shaman", "E-Shaman"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(48)); // A-Enchanter
                b.actors.push(actorPreset(31)); // A-Medic
                b.actors.push(actorPreset(12)); // E-Raider
                b.actors.push(actorPreset(22)); // E-Shaman
                b.actors.push(actorPreset(49)); // E-Wisp
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyTargets"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 2; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 66: { // R22-V3
                s.instruction = "Get-and-remove the marked E-Raider Sprite from enemyTargets and prepend the SAME Sprite reference to enemyTargets; other five streams must not move.";
                b.allyMoves = ["Strike", "Empower", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [5, 2, 2, 2, 2, 3];
                b.enemyMoves = ["Strike", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 3, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Blade", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Shaman", "E-Wisp", "E-Shaman", "E-Raider", "E-Shaman", "E-Shaman"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(48)); // A-Enchanter
                b.actors.push(actorPreset(31)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                b.actors.push(actorPreset(22)); // E-Shaman
                b.actors.push(actorPreset(49)); // E-Wisp
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyTargets"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = 3; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 67: { // R23-V1
                s.instruction = "Find indexOf(Ward) in enemyMoves, removeAt that computed index and DISCARD the returned string. Do not change enemyValues or either target list.";
                b.allyMoves = ["Ward", "Mend", "Strike", "Strike", "Strike"];
                b.allyValues = [3, 2, 2, 2, 2];
                b.enemyMoves = ["Ward", "Strike", "Wait", "Strike", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Shaman", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(50)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(11)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 68: { // R23-V2
                s.instruction = "Find indexOf(Ward) in enemyMoves, removeAt that computed index and DISCARD the returned string. Do not change enemyValues or either target list.";
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 5, 2, 2, 3, 2];
                b.enemyMoves = ["Wait", "Ward", "Strike", "Wait", "Strike", "Wait"];
                b.enemyValues = [1, 4, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Shaman", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(50)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(22)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 69: { // R23-V3
                s.instruction = "Find indexOf(Ward) in enemyMoves, removeAt that computed index and DISCARD the returned string. Do not change enemyValues or either target list.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 1, 7, 2, 2, 4, 2];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Strike", "Wait", "Strike", "Wait"];
                b.enemyValues = [1, 1, 5, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Shaman", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(50)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                b.actors.push(actorPreset(35)); // E-Shaman
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 70: { // R24-V1
                s.instruction = "Use Station 1 to PREPEND supplied Wait to enemyMoves; THEN Station 2 SETS the shifted enemy Strike at index (old index+1) to Wait. Reverse-order and single-station play must fail.";
                b.allyMoves = ["Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 2, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(12)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = true;
                s.primaryIndex = -1; s.secondaryIndex = 1; s.numberHint = 0;
                return s;
            }
            case 71: { // R24-V2
                s.instruction = "Use Station 1 to PREPEND supplied Wait to enemyMoves; THEN Station 2 SETS the shifted enemy Strike at index (old index+1) to Wait. Reverse-order and single-station play must fail.";
                b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 2, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 5, 5, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(7)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = true;
                s.primaryIndex = -1; s.secondaryIndex = 2; s.numberHint = 0;
                return s;
            }
            case 72: { // R24-V3
                s.instruction = "Use Station 1 to PREPEND supplied Wait to enemyMoves; THEN Station 2 SETS the shifted enemy Strike at index (old index+1) to Wait. Reverse-order and single-station play must fail.";
                b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 1, 1, 2, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 6, 6, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(51)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = true;
                s.primaryIndex = -1; s.secondaryIndex = 3; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    function roomGroup8(s: apocTypes.RoomSpec, key: number): apocTypes.RoomSpec {
        const b = s.battle;
        switch (key) {
            case 73: { // R25-V1
                s.instruction = "Loop from i=0 to allyMoves.length-1; IF allyMoves[i] is Wait AND enemyMoves[i] is Strike, set allyMoves[i] to Ward. Leave harmless Wait fillers and existing Strikes unchanged.";
                b.allyMoves = ["Wait", "Strike", "Wait", "Mend", "Wait", "Strike", "Strike"];
                b.allyValues = [6, 4, 6, 4, 6, 4, 4];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [4, 1, 4, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(38)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 74: { // R25-V2
                s.instruction = "Loop from i=0 to allyMoves.length-1; IF allyMoves[i] is Wait AND enemyMoves[i] is Strike, set allyMoves[i] to Ward. Leave harmless Wait fillers and existing Strikes unchanged.";
                b.allyMoves = ["Wait", "Wait", "Strike", "Wait", "Mend", "Wait", "Strike", "Strike"];
                b.allyValues = [1, 6, 4, 6, 4, 6, 4, 4];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 4, 1, 4, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(38)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 75: { // R25-V3
                s.instruction = "Loop from i=0 to allyMoves.length-1; IF allyMoves[i] is Wait AND enemyMoves[i] is Strike, set allyMoves[i] to Ward. Leave harmless Wait fillers and existing Strikes unchanged.";
                b.allyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Mend", "Wait", "Strike", "Strike"];
                b.allyValues = [1, 1, 6, 4, 6, 4, 6, 4, 4];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 4, 1, 4, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(20)); // A-Medic
                b.actors.push(actorPreset(38)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = [];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 76: { // R26-V1
                s.instruction = "Build allyMoves by traversing all enemy moves: Ward for a Strike, Mend for the first opening after an attack, and Strike for remaining openings.";
                b.allyMoves = [];
                b.allyValues = [2, 2, 2, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(4)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 77: { // R26-V2
                s.instruction = "Build allyMoves by traversing all enemy moves: Ward for a Strike, Mend for the first opening after an attack, and Strike for remaining openings.";
                b.allyMoves = [];
                b.allyValues = [2, 2, 2, 2, 2, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(9)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 78: { // R26-V3
                s.instruction = "Build allyMoves by traversing all enemy moves: Ward for a Strike, Mend for the first opening after an attack, and Strike for remaining openings.";
                b.allyMoves = [];
                b.allyValues = [2, 2, 2, 2, 2, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(2)); // A-Guardian
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(41)); // E-Raider
                s.rosterIDs = [];
                s.sourceMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                s.editableLists = ["allyMoves"];
                s.allowHold = false; s.allowBanish = false;
                s.twoStations = false;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 79: { // R27-V1
                s.instruction = "Foreach REAL Sprite in hazardRoster, hold that actor; independently traverse enemyMoves by index and set EVERY Ward to Wait. Finish with two visible cleanup attacks.";
                b.allyMoves = ["Mend", "Strike", "Strike", "Strike", "Strike", "Strike", "Flurry", "Strike"];
                b.allyValues = [1, 2, 2, 2, 2, 2, 8, 3];
                b.enemyMoves = ["Ward", "Strike", "Wait", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 3, 1, 2, 6, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-King", "E-King", "E-King", "E-King", "E-King", "E-King", "E-Raider", "E-Wisp"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(23)); // A-Ranger
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(52)); // E-King
                b.actors.push(actorPreset(53)); // E-Raider
                b.actors.push(actorPreset(33)); // E-Wisp
                s.rosterIDs = ["E-Raider", "E-Wisp"];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = true;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 80: { // R27-V2
                s.instruction = "Foreach REAL Sprite in hazardRoster, hold that actor; independently traverse enemyMoves by index and set EVERY Ward to Wait. Finish with two visible cleanup attacks.";
                b.allyMoves = ["Mend", "Strike", "Strike", "Strike", "Strike", "Strike", "Flurry", "Strike"];
                b.allyValues = [1, 2, 2, 2, 2, 2, 8, 3];
                b.enemyMoves = ["Strike", "Ward", "Wait", "Flurry", "Ward", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 2, 1, 6, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-King", "E-King", "E-King", "E-King", "E-King", "E-King", "E-Raider", "E-Wisp"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(23)); // A-Ranger
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(52)); // E-King
                b.actors.push(actorPreset(53)); // E-Raider
                b.actors.push(actorPreset(33)); // E-Wisp
                s.rosterIDs = ["E-Wisp", "E-Raider"];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = true;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
            case 81: { // R27-V3
                s.instruction = "Foreach REAL Sprite in hazardRoster, hold that actor; independently traverse enemyMoves by index and set EVERY Ward to Wait. Finish with two visible cleanup attacks.";
                b.allyMoves = ["Mend", "Strike", "Strike", "Strike", "Strike", "Strike", "Flurry", "Strike"];
                b.allyValues = [1, 2, 2, 2, 2, 2, 8, 3];
                b.enemyMoves = ["Ward", "Strike", "Wait", "Flurry", "Ward", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 3, 1, 6, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-King", "E-King", "E-King", "E-King", "E-King", "E-King", "E-Raider", "E-Wisp"];
                b.goal = "defeat_all"; b.requiredIDs = ["A-Medic"];
                b.actors.push(actorPreset(1)); // A-Blade
                b.actors.push(actorPreset(23)); // A-Ranger
                b.actors.push(actorPreset(6)); // A-Medic
                b.actors.push(actorPreset(52)); // E-King
                b.actors.push(actorPreset(53)); // E-Raider
                b.actors.push(actorPreset(33)); // E-Wisp
                s.rosterIDs = ["E-Raider", "E-Wisp"];
                s.sourceMoves = [];
                s.editableLists = ["enemyMoves"];
                s.allowHold = true; s.allowBanish = false;
                s.twoStations = true;
                s.primaryIndex = -1; s.secondaryIndex = -1; s.numberHint = 0;
                return s;
            }
        }
        return null;
    }
    export function spec(room: apocTypes.Room, variant: number): apocTypes.RoomSpec {
        if (room < 1 || room > 27 || variant < 1 || variant > 3 ||
            room !== Math.floor(room) || variant !== Math.floor(variant)) return null;
        const s = new apocTypes.RoomSpec();
        s.battle = new apocTypes.BattleSpec(); s.battle.actors = [];
        s.room = room; s.variant = variant;
        const key = (room - 1) * 3 + variant;
        if (room <= 3) return roomGroup0(s, key);
        if (room <= 6) return roomGroup1(s, key);
        if (room <= 9) return roomGroup2(s, key);
        if (room <= 12) return roomGroup3(s, key);
        if (room <= 15) return roomGroup4(s, key);
        if (room <= 18) return roomGroup5(s, key);
        if (room <= 21) return roomGroup6(s, key);
        if (room <= 24) return roomGroup7(s, key);
        if (room <= 27) return roomGroup8(s, key);
        return null;
    }
}

// SUPPLIED SOURCE supplied-world/combat.ts
// AL-IMPLEMENTATION-1.0. No Sprite construction, mutation, side effects or frame scheduling.
namespace apocCombat {
    function copyStrings(a: string[]): string[] { return a ? a.slice() : []; }
    function copyNumbers(a: number[]): number[] { return a ? a.slice() : []; }
    function copySprites(a: Sprite[]): Sprite[] { return a ? a.slice() : []; }
    function copyPower(p: apocTypes.PowerSource): apocTypes.PowerSource {
        if (!p) return null;
        const q = new apocTypes.PowerSource();
        q.side = p.side; q.index = p.index; q.isAll = p.isAll;
        q.bonus = copyPower(p.bonus);
        return q;
    }
    function copyActor(a: apocTypes.ActorState): apocTypes.ActorState {
        const b = new apocTypes.ActorState();
        b.id = a.id; b.sprite = a.sprite; b.side = a.side;
        b.hp = a.hp; b.maxHP = a.maxHP; b.ability = a.ability;
        b.trait = a.trait; b.present = a.present; b.held = a.held;
        b.ward = copyPower(a.ward); b.venom = copyPower(a.venom);
        b.empower = copyPower(a.empower);
        return b;
    }
    function copyLists(a: apocTypes.CombatLists): apocTypes.CombatLists {
        const b = new apocTypes.CombatLists();
        b.allyMoves = copyStrings(a.allyMoves);
        b.allyValues = copyNumbers(a.allyValues);
        b.allyTargets = copySprites(a.allyTargets);
        b.enemyMoves = copyStrings(a.enemyMoves);
        b.enemyValues = copyNumbers(a.enemyValues);
        b.enemyTargets = copySprites(a.enemyTargets);
        return b;
    }
    export function cloneTrial(value: apocTypes.TrialSnapshot): apocTypes.TrialSnapshot {
        if (!value) return null;
        const t = new apocTypes.TrialSnapshot();
        t.lists = value.lists ? copyLists(value.lists) : null;
        t.actors = [];
        if (value.actors) for (let i = 0; i < value.actors.length; i++) {
            if (value.actors[i]) t.actors.push(copyActor(value.actors[i]));
            else t.actors.push(null);
        }
        t.roster = copySprites(value.roster); t.sourceMoves = copyStrings(value.sourceMoves);
        t.goal = value.goal; t.requiredIDs = copyStrings(value.requiredIDs);
        return t;
    }
    function validMove(m: string): boolean {
        return m === "Strike" || m === "Flurry" || m === "Mend" ||
            m === "Ward" || m === "Venom" || m === "Reap" || m === "Empower";
    }
    function validTrait(m: string): boolean {
        return m === "Plain" || m === "Piercer" || m === "Cleanser" || m === "Steadfast" || m === "Leech";
    }
    // Disallow NaN and infinities as invalid authored numbers (Infinity - Infinity is NaN).
    function integer(v: number): boolean {
        return typeof v === "number" && v - v === 0 && v === Math.floor(v) && v >= 0;
    }
    function validPower(p: apocTypes.PowerSource, t: apocTypes.TrialSnapshot, depth: number): boolean {
        if (!p) return true;
        if (depth > 12 || (p.side !== apocTypes.Side.Ally && p.side !== apocTypes.Side.Enemy)) return false;
        const values = p.side === apocTypes.Side.Ally ? t.lists.allyValues : t.lists.enemyValues;
        return integer(p.index) && p.index < values.length && typeof p.isAll === "boolean" &&
            validPower(p.bonus, t, depth + 1);
    }
    function markHasOwner(t: apocTypes.TrialSnapshot, p: apocTypes.PowerSource, move: string): boolean {
        if (!p) return true;
        let found = false;
        for (let i = 0; i < t.actors.length; i++) {
            const a = t.actors[i];
            if (a && a.side === p.side && a.ability === move) found = true;
        }
        return found && (!p.bonus || markHasOwner(t, p.bonus, "Empower"));
    }
    // Keep every list statically typed. Reading .length through an `any` cell
    // emits a PXT interface lookup, but native Array objects are not interfaces.
    function validateStrings(a: string[], name: string, e: string[]): void {
        if (!a || !Array.isArray(a)) { e.push(name + " must be an array"); return; }
        if (a.length > 10) e.push(name + " capacity");
        for (let i = 0; i < a.length; i++) if (typeof a[i] !== "string") e.push(name + " invalid move type at " + i);
    }
    function validateNumbers(a: number[], name: string, e: string[]): void {
        if (!a || !Array.isArray(a)) { e.push(name + " must be an array"); return; }
        if (a.length > 10) e.push(name + " capacity");
        for (let i = 0; i < a.length; i++) if (!integer(a[i]) || a[i] > 9) e.push(name + " invalid number at " + i);
    }
    function validateTargets(a: Sprite[], name: string, e: string[]): void {
        if (!a || !Array.isArray(a)) { e.push(name + " must be an array"); return; }
        if (a.length > 10) e.push(name + " capacity");
    }
    export function validate(value: apocTypes.TrialSnapshot, allTarget: Sprite): string[] {
        const e: string[] = [];
        if (!value || !value.lists || !value.actors || !value.roster || !value.sourceMoves || !value.requiredIDs) {
            e.push("missing trial fields"); return e;
        }
        if (!Array.isArray(value.actors) || !Array.isArray(value.roster) ||
            !Array.isArray(value.sourceMoves) || !Array.isArray(value.requiredIDs)) {
            e.push("invalid snapshot collection type"); return e;
        }
        const l = value.lists;
        validateStrings(l.allyMoves, "allyMoves", e);
        validateNumbers(l.allyValues, "allyValues", e);
        validateTargets(l.allyTargets, "allyTargets", e);
        validateStrings(l.enemyMoves, "enemyMoves", e);
        validateNumbers(l.enemyValues, "enemyValues", e);
        validateTargets(l.enemyTargets, "enemyTargets", e);
        if (e.length) return e;
        if (value.actors.length < 4 || value.actors.length > 8) e.push("invalid actor count");
        if (value.roster.length > 10 || value.sourceMoves.length > 10) e.push("teaching list capacity");
        for (let i = 0; i < value.sourceMoves.length; i++) if (typeof value.sourceMoves[i] !== "string") e.push("source move type");
        if (!allTarget || typeof allTarget !== "object") e.push("missing or invalid ALL_TARGET identity");
        let allies = 0; let enemies = 0;
        for (let i = 0; i < value.actors.length; i++) {
            const a = value.actors[i];
            if (!a || typeof a.id !== "string" || a.id.length === 0 ||
                !a.sprite || typeof a.sprite !== "object" || a.sprite === allTarget) {
                e.push("invalid actor/identity at " + i); continue;
            }
            if (a.side === apocTypes.Side.Ally) allies++;
            else if (a.side === apocTypes.Side.Enemy) enemies++;
            else e.push("invalid side: " + a.id);
            if (!integer(a.hp) || !integer(a.maxHP) || a.maxHP < 1 || a.hp > a.maxHP) e.push("invalid HP: " + a.id);
            if (!validMove(a.ability)) e.push("invalid ability: " + a.id);
            if (!validTrait(a.trait) || (a.side === apocTypes.Side.Ally && a.trait === "Plain")) e.push("invalid trait: " + a.id);
            if (typeof a.present !== "boolean" || typeof a.held !== "boolean") e.push("invalid actor flags: " + a.id);
            if (!validPower(a.ward, value, 0) || !validPower(a.venom, value, 0) || !validPower(a.empower, value, 0) ||
                !markHasOwner(value, a.ward, "Ward") || !markHasOwner(value, a.venom, "Venom") ||
                !markHasOwner(value, a.empower, "Empower")) e.push("invalid mark: " + a.id);
            for (let j = 0; j < i; j++) {
                const b = value.actors[j];
                if (b && (b.id === a.id || b.sprite === a.sprite)) e.push("duplicate actor identity: " + a.id);
                if (b && b.side === a.side && b.ability === a.ability) e.push("duplicate side ability: " + a.ability);
            }
        }
        if (allies < 3 || allies > 4 || enemies < 1 || enemies > 4) e.push("invalid team size");
        if (value.goal !== "defeat_all" && value.goal !== "survive_pass") e.push("unknown battle goal");
        for (let i = 0; i < value.requiredIDs.length; i++) {
            let present = false;
            for (let j = 0; j < value.actors.length; j++) if (value.actors[j] && value.actors[j].id === value.requiredIDs[i] && value.actors[j].side === apocTypes.Side.Ally) present = true;
            if (!present) e.push("unknown required ally: " + value.requiredIDs[i]);
        }
        for (let k = 0; k < 2; k++) {
            const targets = k === 0 ? l.allyTargets : l.enemyTargets;
            for (let i = 0; i < targets.length; i++) {
                let found = targets[i] === allTarget;
                for (let j = 0; j < value.actors.length; j++) if (value.actors[j] && targets[i] === value.actors[j].sprite) found = true;
                if (!found) e.push("foreign target at " + k + ":" + i);
            }
        }
        for (let i = 0; i < value.roster.length; i++) {
            let found = false;
            for (let j = 0; j < value.actors.length; j++) if (value.actors[j] && value.roster[i] === value.actors[j].sprite) found = true;
            if (!found) e.push("foreign roster actor at " + i);
        }
        return e;
    }
    function makeEvent(out: apocTypes.BattleResult, kind: string, side: apocTypes.Side, index: number,
                       actor: Sprite, target: Sprite, amount: number, hp: number,
                       mark: apocTypes.PowerSource, move: string, reason: string): void {
        const x = new apocTypes.TraceEvent();
        x.kind = kind; x.side = side; x.index = index; x.actor = actor; x.target = target;
        x.amount = amount; x.hp = hp; x.mark = copyPower(mark); x.move = move; x.reason = reason;
        out.trace.push(x);
    }
    function actorAt(t: apocTypes.TrialSnapshot, sprite: Sprite): apocTypes.ActorState {
        for (let j = 0; j < t.actors.length; j++) if (t.actors[j].sprite === sprite) return t.actors[j];
        return null;
    }
    function actorByID(t: apocTypes.TrialSnapshot, id: string): apocTypes.ActorState {
        for (let j = 0; j < t.actors.length; j++) if (t.actors[j].id === id) return t.actors[j];
        return null;
    }
    function power(t: apocTypes.TrialSnapshot, p: apocTypes.PowerSource): number {
        if (!p) return 0;
        const v = p.side === apocTypes.Side.Ally ? t.lists.allyValues[p.index] : t.lists.enemyValues[p.index];
        return (p.isAll ? Math.idiv(v + 1, 2) : v) + power(t, p.bonus);
    }
    function source(side: apocTypes.Side, index: number, all: boolean,
                    bonus: apocTypes.PowerSource): apocTypes.PowerSource {
        const p = new apocTypes.PowerSource();
        p.side = side; p.index = index; p.isAll = all; p.bonus = copyPower(bonus);
        return p;
    }
    function outcome(t: apocTypes.TrialSnapshot): string {
        let allies = 0; let enemies = 0;
        for (let j = 0; j < t.actors.length; j++) {
            const a = t.actors[j];
            if (a.hp > 0 && a.present) {
                if (a.side === apocTypes.Side.Ally) allies++; else enemies++;
            }
        }
        if (!allies) return "defeat";
        for (let i = 0; i < t.requiredIDs.length; i++) {
            const a = actorByID(t, t.requiredIDs[i]);
            if (!a || !a.present || a.hp <= 0) return "defeat";
        }
        if (t.goal === "defeat_all" && enemies === 0) return "victory";
        return "";
    }
    function finish(out: apocTypes.BattleResult, status: string, side: apocTypes.Side, index: number, why: string): void {
        out.status = status;
        makeEvent(out, "result", side, index, null, null, 0, -1, null, "", status + ":" + why);
    }
    function boundary(t: apocTypes.TrialSnapshot, out: apocTypes.BattleResult,
                      side: apocTypes.Side, index: number, phase: string): boolean {
        makeEvent(out, "cursor", side, index, null, null, 0, -1, null, "", phase);
        const status = outcome(t);
        if (status) { finish(out, status, side, index, phase); return true; }
        return false;
    }
    function hit(t: apocTypes.TrialSnapshot, out: apocTypes.BattleResult, target: apocTypes.ActorState,
                 damage: number, caster: apocTypes.ActorState, side: apocTypes.Side,
                 index: number, move: string, tick: boolean): void {
        if (damage <= 0 || target.hp <= 0 || !target.present) return;
        if (target.ward && (tick || caster.trait !== "Piercer")) {
            const blocked = Math.min(damage, power(t, target.ward));
            damage -= blocked;
            makeEvent(out, "ward-consumed", side, index, caster.sprite, target.sprite,
                      blocked, -1, target.ward, move, "one damage instance");
            target.ward = null;
        }
        if (damage > 0) {
            const actual = Math.min(damage, target.hp);
            target.hp -= actual;
            makeEvent(out, "damage", side, index, caster.sprite, target.sprite,
                      actual, target.hp, null, move, tick ? "venom" : "direct");
            if (!tick && caster.trait === "Leech" && caster.hp > 0 && caster.present && actual > 0) {
                const before = caster.hp;
                caster.hp = Math.min(caster.maxHP, caster.hp + 1);
                makeEvent(out, "leech", side, index, caster.sprite, caster.sprite,
                          caster.hp - before, caster.hp, null, move, "direct hit healed caster");
            }
        }
    }
    function venom(t: apocTypes.TrialSnapshot, out: apocTypes.BattleResult,
                   side: apocTypes.Side, index: number): void {
        for (let i = 0; i < t.actors.length; i++) {
            const a = t.actors[i];
            if (a.side !== side || !a.present || a.hp <= 0 || !a.venom || a.trait === "Steadfast") continue;
            const p = a.venom;
            const potency = power(t, p);
            let caster: apocTypes.ActorState = null;
            for (let j = 0; j < t.actors.length; j++) {
                const c = t.actors[j];
                if (c.side === p.side && c.ability === "Venom") { caster = c; break; }
            }
            // Mark provenance outlives its caster; validation guarantees the original unique owner.
            if (!caster) continue;
            makeEvent(out, "venom-tick", side, index, caster.sprite, a.sprite,
                      potency, -1, p, "Venom", "start of afflicted half-turn");
            hit(t, out, a, potency, caster, side, index, "Venom", true);
        }
    }
    function action(t: apocTypes.TrialSnapshot, out: apocTypes.BattleResult,
                    side: apocTypes.Side, index: number, allTarget: Sprite): void {
        const moves = side === apocTypes.Side.Ally ? t.lists.allyMoves : t.lists.enemyMoves;
        const values = side === apocTypes.Side.Ally ? t.lists.allyValues : t.lists.enemyValues;
        let reason = "";
        if (index >= moves.length) reason = "no move entry";
        else if (moves[index] === "Wait") reason = "Wait";
        else if (!validMove(moves[index])) reason = "unknown move";
        else if (index >= values.length) reason = "no numeric entry";
        else if (values[index] === 0) reason = "zero power";
        let caster: apocTypes.ActorState = null;
        const move = index < moves.length ? moves[index] : "";
        if (!reason) {
            for (let i = 0; i < t.actors.length; i++) {
                const a = t.actors[i];
                if (a.side === side && a.ability === move) { caster = a; break; }
            }
            if (!caster) reason = "move lacks unique owner";
            else if (!caster.present || caster.hp <= 0 || caster.held) reason = "owner inactive";
        }
        const helpful = move === "Mend" || move === "Ward" || move === "Empower";
        const targetSide = helpful ? side : (side === apocTypes.Side.Ally ? apocTypes.Side.Enemy : apocTypes.Side.Ally);
        const targetList = targetSide === apocTypes.Side.Ally ? t.lists.allyTargets : t.lists.enemyTargets;
        let targetSprite: Sprite = null;
        let isAll = false;
        const chosen: apocTypes.ActorState[] = [];
        if (!reason) {
            if (index >= targetList.length) reason = "missing target entry";
            else {
                targetSprite = targetList[index]; isAll = targetSprite === allTarget;
                if (isAll) {
                    for (let i = 0; i < t.actors.length; i++) {
                        const a = t.actors[i];
                        if (a.side === targetSide && a.present && a.hp > 0) chosen.push(a);
                    }
                } else {
                    const a = actorAt(t, targetSprite);
                    if (!a) reason = "unknown Sprite reference";
                    else if (a.side !== targetSide) reason = "wrong side Sprite reference";
                    else if (a.present && a.hp > 0) chosen.push(a);
                }
                if (!reason && chosen.length === 0) reason = "no living eligible target";
            }
        }
        if (reason) {
            // Retain a known attempted target identity for the world's fizzle animation.
            makeEvent(out, "skip", side, index, caster ? caster.sprite : null,
                      targetSprite, 0, -1, null, move, reason);
            return;
        }
        let potency = isAll ? Math.idiv(values[index] + 1, 2) : values[index];
        let bonus: apocTypes.PowerSource = null;
        if (caster.empower && move !== "Empower") {
            bonus = copyPower(caster.empower);
            potency += power(t, bonus);
            makeEvent(out, "empower-used", side, index, caster.sprite, caster.sprite,
                      power(t, bonus), -1, bonus, move, "next eligible cast");
            caster.empower = null;
        }
        const mark = source(side, index, isAll, bonus);
        for (let j = 0; j < chosen.length; j++) {
            const target = chosen[j];
            makeEvent(out, "action", side, index, caster.sprite, target.sprite,
                      potency, -1, null, move, isAll ? "ALL recipient" : "exact target");
            if (!target.present || target.hp <= 0) continue;
            if (move === "Strike") hit(t, out, target, 2 * potency, caster, side, index, move, false);
            else if (move === "Flurry") {
                for (let k = 0; k < potency && target.hp > 0; k++) hit(t, out, target, 1, caster, side, index, move, false);
            } else if (move === "Reap") {
                hit(t, out, target, potency * (target.maxHP - target.hp), caster, side, index, move, false);
            } else if (move === "Mend") {
                const before = target.hp;
                target.hp = Math.min(target.maxHP, target.hp + potency);
                makeEvent(out, "heal", side, index, caster.sprite, target.sprite,
                          target.hp - before, target.hp, null, move, "no resurrection");
                if (caster.trait === "Cleanser" && target.venom) {
                    makeEvent(out, "venom-cleared", side, index, caster.sprite, target.sprite,
                              0, -1, target.venom, move, "Cleanser Mend");
                    target.venom = null;
                }
            } else if (move === "Ward") {
                target.ward = copyPower(mark);
                makeEvent(out, "ward-set", side, index, caster.sprite, target.sprite,
                          power(t, mark), -1, mark, move, "mark replaced");
            } else if (move === "Venom") {
                target.venom = copyPower(mark);
                makeEvent(out, "venom-set", side, index, caster.sprite, target.sprite,
                          power(t, mark), -1, mark, move, "mark replaced");
            } else if (move === "Empower") {
                target.empower = source(side, index, isAll, null);
                makeEvent(out, "empower-set", side, index, caster.sprite, target.sprite,
                          power(t, target.empower), -1, target.empower, move, "mark replaced");
            }
        }
    }
    export function resolve(value: apocTypes.TrialSnapshot, allTarget: Sprite): apocTypes.BattleResult {
        const out = new apocTypes.BattleResult();
        out.trace = [];
        out.errors = validate(value, allTarget);
        if (out.errors.length > 0) {
            out.finalActors = [];
            finish(out, "invalid", apocTypes.Side.Ally, -1, "validation"); return out;
        }
        const t = cloneTrial(value);
        out.finalActors = t.actors;
        const l = t.lists;
        // MakeCode Math.max takes exactly two arguments (unlike JavaScript varargs).
        // Keep independent lengths: short/missing companion cells deliberately fizzle.
        let count = Math.max(l.allyMoves.length, l.allyValues.length);
        count = Math.max(count, l.allyTargets.length);
        count = Math.max(count, l.enemyMoves.length);
        count = Math.max(count, l.enemyValues.length);
        count = Math.max(count, l.enemyTargets.length);
        if (boundary(t, out, apocTypes.Side.Ally, 0, "pass entry")) return out;
        for (let i = 0; i < count; i++) {
            if (boundary(t, out, apocTypes.Side.Ally, i, "before ally half-turn")) return out;
            venom(t, out, apocTypes.Side.Ally, i);
            if (boundary(t, out, apocTypes.Side.Ally, i, "after ally venom")) return out;
            action(t, out, apocTypes.Side.Ally, i, allTarget);
            if (boundary(t, out, apocTypes.Side.Ally, i, "after ally action")) return out;
            if (boundary(t, out, apocTypes.Side.Enemy, i, "before enemy half-turn")) return out;
            venom(t, out, apocTypes.Side.Enemy, i);
            if (boundary(t, out, apocTypes.Side.Enemy, i, "after enemy venom")) return out;
            action(t, out, apocTypes.Side.Enemy, i, allTarget);
            if (boundary(t, out, apocTypes.Side.Enemy, i, "after enemy action")) return out;
        }
        if (boundary(t, out, apocTypes.Side.Ally, count, "pass exit")) return out;
        finish(out, t.goal === "survive_pass" ? "victory" : "incomplete", apocTypes.Side.Ally, count, "pass finished");
        return out;
    }
}

// SUPPLIED SOURCE supplied-world/goals.ts
// Generated expected() below is literal puzzle data, never executed as learner code.
// The checker judges real arrays, actor identities and station snapshots only.
namespace apocGoals {
    class Expect {
        constructor() {}
        lists: apocTypes.BattleSpec = null;
        rosterIDs: string[] = [];
        sourceMoves: string[] = [];
        heldChoices: string[][] = [];
        banishedChoices: string[][] = [];
        histBefore: apocTypes.BattleSpec[] = [];
        histAfter: apocTypes.BattleSpec[] = [];
    }
    function sameStrings(a: string[], b: string[]): boolean {
        if (!a || !b || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
        return true;
    }
    function sameNumbers(a: number[], b: number[]): boolean {
        if (!a || !b || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
        return true;
    }
    function samePower(a: apocTypes.PowerSource, b: apocTypes.PowerSource, depth: number): boolean {
        if (!a || !b) return a === b;
        if (depth > 12) return false;
        return a.side === b.side && a.index === b.index && a.isAll === b.isAll &&
            samePower(a.bonus, b.bonus, depth + 1);
    }
    function stateFor(t: apocTypes.TrialSnapshot, id: string): apocTypes.ActorState {
        if (!t || !t.actors) return null;
        for (let i = 0; i < t.actors.length; i++) if (t.actors[i] && t.actors[i].id === id) return t.actors[i];
        return null;
    }
    function specFor(s: apocTypes.RoomSpec, id: string): apocTypes.ActorSpec {
        if (!s || !s.battle || !s.battle.actors) return null;
        for (let i = 0; i < s.battle.actors.length; i++) if (s.battle.actors[i] && s.battle.actors[i].id === id) return s.battle.actors[i];
        return null;
    }
    function isReal(t: apocTypes.TrialSnapshot, s: Sprite): boolean {
        if (!t || !t.actors) return false;
        for (let i = 0; i < t.actors.length; i++) if (t.actors[i] && t.actors[i].sprite === s) return true;
        return false;
    }
    function sentinel(t: apocTypes.TrialSnapshot, known: apocTypes.BattleSpec): Sprite {
        if (!t || !t.lists || !known) return null;
        const actual: Sprite[][] = [t.lists.allyTargets, t.lists.enemyTargets];
        const ids: string[][] = [known.allyTargetIDs, known.enemyTargetIDs];
        for (let k = 0; k < 2; k++) {
            if (!actual[k] || !Array.isArray(actual[k]) || !ids[k]) return null;
            for (let i = 0; i < ids[k].length && i < actual[k].length; i++) {
            if (ids[k][i] === "ALL" && !isReal(t, actual[k][i])) return actual[k][i];
            }
        }
        return null;
    }
    function matchingTarget(t: apocTypes.TrialSnapshot, sprite: Sprite, id: string,
                            allTarget: Sprite): boolean {
        if (id === "ALL") return !!allTarget && sprite === allTarget;
        const actor = stateFor(t, id);
        return !!actor && sprite === actor.sprite;
    }
    function matchingTargets(t: apocTypes.TrialSnapshot, a: Sprite[], ids: string[],
                             allTarget: Sprite): boolean {
        if (!a || !ids || a.length !== ids.length) return false;
        for (let i = 0; i < a.length; i++) if (!matchingTarget(t, a[i], ids[i], allTarget)) return false;
        return true;
    }
    function matchingLists(t: apocTypes.TrialSnapshot, expected: apocTypes.BattleSpec,
                           allTarget: Sprite): boolean {
        if (!t || !t.lists || !expected) return false;
        const l = t.lists;
        return sameStrings(l.allyMoves, expected.allyMoves) &&
            sameNumbers(l.allyValues, expected.allyValues) &&
            matchingTargets(t, l.allyTargets, expected.allyTargetIDs, allTarget) &&
            sameStrings(l.enemyMoves, expected.enemyMoves) &&
            sameNumbers(l.enemyValues, expected.enemyValues) &&
            matchingTargets(t, l.enemyTargets, expected.enemyTargetIDs, allTarget);
    }
    function matchingRoster(t: apocTypes.TrialSnapshot, ids: string[]): boolean {
        if (!t || !t.roster || !ids || t.roster.length !== ids.length) return false;
        for (let i = 0; i < ids.length; i++) if (!matchingTarget(t, t.roster[i], ids[i], null)) return false;
        return true;
    }
    function contains(a: string[], item: string): boolean {
        for (let i = 0; i < a.length; i++) if (a[i] === item) return true;
        return false;
    }
    function matchingActors(s: apocTypes.RoomSpec, before: apocTypes.TrialSnapshot,
                            after: apocTypes.TrialSnapshot, held: string[], banished: string[]): boolean {
        if (!s.battle || !before.actors || !after.actors ||
            before.actors.length !== s.battle.actors.length || after.actors.length !== before.actors.length) return false;
        for (let i = 0; i < before.actors.length; i++) {
            const b = before.actors[i];
            if (!b) return false;
            const a = stateFor(after, b.id);
            const base = specFor(s, b.id);
            // Actor order is the room's stable display/iteration order, not a learner list.
            if (!a || !base || !b.sprite || a.sprite !== b.sprite ||
                b.id !== s.battle.actors[i].id || after.actors[i] !== a) return false;
            if (b.side !== base.side || b.ability !== base.ability || b.trait !== base.trait ||
                b.maxHP !== base.maxHP || b.hp !== base.hp || b.present !== base.present ||
                b.held !== base.held || !samePower(b.ward, base.ward, 0) ||
                !samePower(b.venom, base.venom, 0) || !samePower(b.empower, base.empower, 0)) return false;
            if (a.side !== b.side || a.ability !== b.ability || a.trait !== b.trait ||
                a.hp !== b.hp || a.maxHP !== b.maxHP ||
                !samePower(a.ward, b.ward, 0) || !samePower(a.venom, b.venom, 0) ||
                !samePower(a.empower, b.empower, 0)) return false;
            // Hold and Banish may only turn flags on/off in their intended direction.
            if (a.held !== (b.held || contains(held, b.id))) return false;
            if (a.present !== (b.present && !contains(banished, b.id))) return false;
        }
        // No extra or duplicated actor references by id/sprite.
        for (let i = 0; i < after.actors.length; i++) {
            const a = after.actors[i];
            if (!a || !stateFor(before, a.id)) return false;
            for (let j = 0; j < i; j++) if (after.actors[j].id === a.id || after.actors[j].sprite === a.sprite) return false;
        }
        return true;
    }
    function snapshotAncillary(a: apocTypes.TrialSnapshot, b: apocTypes.TrialSnapshot): boolean {
        if (!a || !b || !a.actors || !b.actors || !a.roster || !b.roster ||
            a.goal !== b.goal || !sameStrings(a.requiredIDs, b.requiredIDs) ||
            a.actors.length !== b.actors.length || a.roster.length !== b.roster.length ||
            !sameStrings(a.sourceMoves, b.sourceMoves)) return false;
        for (let i = 0; i < a.roster.length; i++) if (a.roster[i] !== b.roster[i]) return false;
        for (let i = 0; i < a.actors.length; i++) {
            const x = a.actors[i], y = b.actors[i];
            if (!x || !y || x.id !== y.id || x.sprite !== y.sprite ||
                x.hp !== y.hp || x.maxHP !== y.maxHP || x.ability !== y.ability ||
                x.trait !== y.trait || x.side !== y.side || x.held !== y.held || x.present !== y.present ||
                !samePower(x.ward, y.ward, 0) || !samePower(x.venom, y.venom, 0) ||
                !samePower(x.empower, y.empower, 0)) return false;
        }
        return true;
    }
    function historyR24(records: apocTypes.StationRecord[], before: apocTypes.TrialSnapshot,
                        after: apocTypes.TrialSnapshot, e: Expect, allTarget: Sprite): boolean {
        if (!records || records.length !== 2 || e.histBefore.length !== 2 || e.histAfter.length !== 2) return false;
        for (let i = 0; i < 2; i++) {
            const r = records[i];
            if (!r || r.station !== i + 1 || r.error || !r.before || !r.after ||
                (r.effects && r.effects.length > 0)) return false;
            if (!matchingLists(r.before, e.histBefore[i], allTarget) ||
                !matchingLists(r.after, e.histAfter[i], allTarget) ||
                !snapshotAncillary(r.before, r.after)) return false;
            if (i === 0) {
                if (!matchingLists(before, e.histBefore[0], allTarget) || !snapshotAncillary(before, r.before)) return false;
            } else {
                if (!matchingLists(records[0].after, e.histBefore[1], allTarget) ||
                    !snapshotAncillary(records[0].after, r.before)) return false;
            }
        }
        return matchingLists(after, e.histAfter[1], allTarget) && snapshotAncillary(records[1].after, after);
    }
    export function assess(spec: apocTypes.RoomSpec, before: apocTypes.TrialSnapshot,
                           after: apocTypes.TrialSnapshot, records: apocTypes.StationRecord[]): apocTypes.GoalResult {
        const out = new apocTypes.GoalResult(); out.met = false; out.messages = [];
        if (!spec || !spec.battle || !before || !after || !before.lists || !after.lists) {
            out.messages.push("Missing room or snapshots"); return out;
        }
        const e = expected(spec.room, spec.variant);
        if (!e) { out.messages.push("Unknown room/variant goal"); return out; }
        const target = sentinel(before, spec.battle);
        if (!matchingLists(before, spec.battle, target) ||
            !matchingRoster(before, spec.rosterIDs) || !sameStrings(before.sourceMoves, spec.sourceMoves) ||
            before.goal !== spec.battle.goal || !sameStrings(before.requiredIDs, spec.battle.requiredIDs)) {
            out.messages.push("Initial snapshot does not match authored room"); return out;
        }
        if (!matchingLists(after, e.lists, target) || !matchingRoster(after, e.rosterIDs) ||
            !sameStrings(after.sourceMoves, e.sourceMoves) ||
            after.goal !== before.goal || !sameStrings(after.requiredIDs, before.requiredIDs)) {
            out.messages.push("Visible lists or sources do not match the task"); return out;
        }
        let goodEffects = false;
        for (let i = 0; i < e.heldChoices.length; i++) {
            if (matchingActors(spec, before, after, e.heldChoices[i], e.banishedChoices[i])) goodEffects = true;
        }
        if (!goodEffects) { out.messages.push("Actor effects or protected properties differ"); return out; }
        if (spec.room === apocTypes.Room.R24 && !historyR24(records, before, after, e, target)) {
            out.messages.push("Required Primary then Secondary station states not observed"); return out;
        }
        out.met = true; out.messages.push("Visible objective met"); return out;
    }
    // BEGIN DETERMINISTIC GENERATED GOALS
    function expectedGroup0(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 1: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [4, 3, 4, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Decoy", "E-Decoy", "E-Raider", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 2: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 3, 3, 5, 1];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Decoy", "E-Decoy", "E-Raider", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 3: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 1, 5, 3, 6, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Decoy", "E-Decoy", "E-Raider", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 4: {
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Shaman", "E-Raider", "E-Wisp"];
                e.rosterIDs = ["E-Raider", "E-Shaman", "E-Wisp"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Raider"]); e.banishedChoices.push([]);
                return e;
            }
            case 5: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Flurry", "Wait", "Wait"];
                b.enemyValues = [1, 5, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Shaman", "E-Raider", "E-Wisp"];
                e.rosterIDs = ["E-Shaman", "E-Wisp", "E-Raider"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 6: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp"];
                e.rosterIDs = ["E-Wisp", "E-Raider", "E-Shaman"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Raider"]); e.banishedChoices.push([]);
                return e;
            }
            case 7: {
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Wisp", "E-Raider", "E-Wisp"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 8: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Wisp", "E-Raider", "E-Wisp"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 9: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Wisp", "E-Raider", "E-Wisp"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup1(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 10: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 3, 1, 1, 3];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 11: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 1, 3, 1, 1, 4];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 12: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 1, 1, 3, 1, 1, 5];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 13: {
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [2, 6, 2, 2, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Decoy", "E-Decoy", "E-Boss", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 14: {
                b.allyMoves = ["Wait", "Strike", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Decoy", "E-Decoy", "E-Boss", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 15: {
                b.allyMoves = ["Wait", "Wait", "Strike", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Decoy", "E-Decoy", "E-Boss", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 16: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 6, 1, 2, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 17: {
                b.allyMoves = ["Wait", "Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [1, 6, 2, 1, 3];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 18: {
                b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Mend", "Strike"];
                b.allyValues = [1, 6, 1, 2, 1, 3];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup2(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 19: {
                b.allyMoves = ["Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [4, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 20: {
                b.allyMoves = ["Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 5, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 21: {
                b.allyMoves = ["Wait", "Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 6, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 22: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 3, 1, 1, 3];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 23: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 1, 3, 1, 1, 4];
                b.enemyMoves = ["Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 24: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 1, 1, 3, 1, 1, 5];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 25: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [4, 1, 3, 2, 2];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 26: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Strike", "Wait"];
                b.allyValues = [6, 1, 3, 3, 2, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 27: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Strike", "Wait", "Wait"];
                b.allyValues = [4, 1, 3, 4, 2, 1, 1];
                b.enemyMoves = ["Strike", "Strike", "Wait", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup3(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 28: {
                b.allyMoves = ["Ward", "Mend", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 5, 3];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 29: {
                b.allyMoves = ["Ward", "Mend", "Wait", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 5, 4];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 30: {
                b.allyMoves = ["Ward", "Mend", "Wait", "Wait", "Wait", "Wait"];
                b.allyValues = [1, 1, 1, 1, 1, 1];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 5, 5];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 31: {
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 8];
                b.enemyMoves = ["Strike", "Wait", "Wait"];
                b.enemyValues = [3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Wisp", "ALL"];
                e.rosterIDs = ["E-Wisp", "E-Shaman"]; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push(["E-Raider"]);
                return e;
            }
            case 32: {
                b.allyMoves = ["Ward", "Mend", "Strike"];
                b.allyValues = [1, 2, 8];
                b.enemyMoves = ["Flurry", "Wait", "Wait"];
                b.enemyValues = [6, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Wisp", "ALL"];
                e.rosterIDs = ["E-Raider", "E-Shaman"]; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push(["E-Wisp"]);
                return e;
            }
            case 33: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 8];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Wisp", "ALL"];
                e.rosterIDs = ["E-Shaman", "E-Wisp"]; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push(["E-Raider"]);
                return e;
            }
            case 34: {
                b.allyMoves = ["Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [4, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 35: {
                b.allyMoves = ["Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 5, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 36: {
                b.allyMoves = ["Wait", "Wait", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 3, 3, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 6, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Boss", "E-Shaman", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup4(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 37: {
                b.allyMoves = ["Strike", "Reap", "Strike", "Flurry", "Reap", "Strike"];
                b.allyValues = [2, 1, 2, 9, 2, 2];
                b.enemyMoves = ["Strike", "Flurry", "Venom", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 4, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Plague", "ALL", "E-Plague", "E-Wisp"];
                e.rosterIDs = ["E-Raider", "E-Wisp", "E-Plague"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Plague", "E-Raider", "E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 38: {
                b.allyMoves = ["Strike", "Reap", "Strike", "Flurry", "Reap", "Strike"];
                b.allyValues = [2, 1, 2, 9, 2, 2];
                b.enemyMoves = ["Venom", "Strike", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 2, 4, 1, 1, 1];
                b.allyTargetIDs = ["A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Plague", "ALL", "E-Plague", "E-Wisp"];
                e.rosterIDs = ["E-Plague", "E-Raider", "E-Wisp"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Plague", "E-Raider", "E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 39: {
                b.allyMoves = ["Strike", "Reap", "Strike", "Flurry", "Reap", "Strike"];
                b.allyValues = [2, 1, 2, 9, 2, 2];
                b.enemyMoves = ["Flurry", "Venom", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 3, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester", "A-Harvester"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Plague", "ALL", "E-Plague", "E-Wisp"];
                e.rosterIDs = ["E-Wisp", "E-Plague", "E-Raider"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Plague", "E-Raider", "E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 40: {
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 4];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Blade", "A-Medic", "A-Blade", "A-Blade"];
                b.enemyTargetIDs = ["E-Small", "E-Boss", "E-Boss", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 41: {
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 5];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Blade", "A-Medic", "A-Blade", "A-Blade"];
                b.enemyTargetIDs = ["E-Small", "E-Boss", "E-Boss", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 42: {
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike"];
                b.allyValues = [1, 1, 2, 6];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Blade", "A-Medic", "A-Blade", "A-Blade"];
                b.enemyTargetIDs = ["E-Small", "E-Boss", "E-Boss", "E-Boss"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 43: {
                b.allyMoves = ["Venom", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [2, 2, 1, 3, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Flurry", "Wait"];
                b.enemyValues = [9, 1, 9, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Wisp", "E-Wisp", "E-Shaman"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 44: {
                b.allyMoves = ["Venom", "Wait", "Mend", "Wait", "Strike", "Strike"];
                b.allyValues = [2, 1, 3, 1, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Flurry", "Wait"];
                b.enemyValues = [1, 9, 1, 9, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Wisp", "E-Wisp", "E-Shaman"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 45: {
                b.allyMoves = ["Venom", "Wait", "Mend", "Strike", "Wait", "Strike", "Strike"];
                b.allyValues = [2, 1, 1, 2, 1, 3, 3];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Flurry", "Wait"];
                b.enemyValues = [1, 1, 9, 1, 9, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Wisp", "E-Wisp", "E-Shaman"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup5(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 46: {
                b.allyMoves = ["Ward", "Strike", "Ward", "Strike", "Strike"];
                b.allyValues = [3, 3, 3, 3, 3];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 47: {
                b.allyMoves = ["Strike", "Ward", "Strike", "Ward", "Strike", "Strike"];
                b.allyValues = [3, 3, 3, 3, 3, 3];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 48: {
                b.allyMoves = ["Ward", "Strike", "Strike", "Ward", "Strike", "Strike"];
                b.allyValues = [3, 3, 3, 3, 3, 3];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 49: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [2, 2, 2, 1, 5];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 50: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [2, 2, 2, 1, 6];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Mend", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 51: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Reap"];
                b.allyValues = [2, 2, 2, 1, 7];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Ward", "Mend", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 52: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [2, 2, 1, 1, 5];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 53: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 2, 2, 1, 1, 6];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 54: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Wait", "Strike"];
                b.allyValues = [1, 1, 2, 2, 1, 1, 7];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup6(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 55: {
                b.allyMoves = ["Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [5, 2, 3, 2];
                b.enemyMoves = ["Strike", "Flurry", "Venom", "Wait"];
                b.enemyValues = [2, 2, 3, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = ["E-Raider", "E-Wisp"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Raider"]); e.banishedChoices.push([]);
                e.heldChoices.push(["E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 56: {
                b.allyMoves = ["Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [5, 2, 3, 2];
                b.enemyMoves = ["Flurry", "Strike", "Venom", "Wait"];
                b.enemyValues = [2, 2, 3, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = ["E-Wisp", "E-Raider"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Wisp"]); e.banishedChoices.push([]);
                e.heldChoices.push(["E-Raider"]); e.banishedChoices.push([]);
                return e;
            }
            case 57: {
                b.allyMoves = ["Wait", "Ward", "Strike", "Mend", "Strike"];
                b.allyValues = [1, 5, 2, 3, 2];
                b.enemyMoves = ["Wait", "Strike", "Flurry", "Venom", "Wait"];
                b.enemyValues = [1, 2, 2, 3, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = ["E-Wisp", "E-Raider"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Wisp"]); e.banishedChoices.push([]);
                e.heldChoices.push(["E-Raider"]); e.banishedChoices.push([]);
                return e;
            }
            case 58: {
                b.allyMoves = ["Wait", "Strike", "Flurry", "Reap", "Strike", "Reap"];
                b.allyValues = [1, 2, 2, 2, 1, 9];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Wait", "Flurry", "Strike"];
                b.enemyValues = [4, 4, 2, 3, 3, 3];
                b.allyTargetIDs = ["A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp", "ALL"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 59: {
                b.allyMoves = ["Wait", "Strike", "Flurry", "Reap", "Strike", "Reap"];
                b.allyValues = [1, 2, 2, 2, 1, 9];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Wait", "Strike", "Flurry"];
                b.enemyValues = [4, 4, 4, 3, 3, 3];
                b.allyTargetIDs = ["A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp", "ALL"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 60: {
                b.allyMoves = ["Wait", "Strike", "Flurry", "Reap", "Strike", "Reap"];
                b.allyValues = [1, 3, 2, 2, 1, 9];
                b.enemyMoves = ["Wait", "Wait", "Ward", "Wait", "Flurry", "Strike"];
                b.enemyValues = [4, 4, 2, 3, 3, 3];
                b.allyTargetIDs = ["A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger", "A-Ranger"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Shaman", "E-Raider", "E-Wisp", "ALL"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 61: {
                b.allyMoves = ["Strike", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Decoy", "E-Raider", "E-Raider", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 62: {
                b.allyMoves = ["Wait", "Strike", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Decoy", "E-Raider", "E-Raider", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 63: {
                b.allyMoves = ["Wait", "Wait", "Strike", "Ward", "Mend", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 6, 2, 2, 1];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 1, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Decoy", "E-Raider", "E-Raider", "E-Decoy"];
                e.rosterIDs = []; e.sourceMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expectedGroup7(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 64: {
                b.allyMoves = ["Strike", "Empower", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [4, 2, 2, 2, 2, 3];
                b.enemyMoves = ["Strike", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Blade", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Shaman", "E-Wisp", "E-Shaman", "E-Shaman", "E-Shaman"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 65: {
                b.allyMoves = ["Strike", "Empower", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [5, 2, 2, 2, 2, 3];
                b.enemyMoves = ["Strike", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 2, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Blade", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Shaman", "E-Wisp", "E-Shaman", "E-Shaman", "E-Shaman"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 66: {
                b.allyMoves = ["Strike", "Empower", "Strike", "Mend", "Strike", "Strike"];
                b.allyValues = [5, 2, 2, 2, 2, 3];
                b.enemyMoves = ["Strike", "Ward", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 3, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Blade", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Shaman", "E-Wisp", "E-Shaman", "E-Shaman", "E-Shaman"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 67: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Strike", "Strike"];
                b.allyValues = [3, 2, 2, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait"];
                b.enemyValues = [3, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Shaman", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 68: {
                b.allyMoves = ["Wait", "Ward", "Mend", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 5, 2, 2, 3, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait"];
                b.enemyValues = [1, 4, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Shaman", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 69: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Mend", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 1, 7, 2, 2, 4, 2];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Strike", "Wait"];
                b.enemyValues = [1, 1, 5, 3, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Shaman", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 70: {
                b.allyMoves = ["Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 2, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [4, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 2, 2, 2];
                  b.enemyMoves = ["Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [4, 4, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histBefore.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [4, 4, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histAfter.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [4, 4, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histBefore.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait"];
                  b.enemyValues = [4, 4, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histAfter.push(b); }
                return e;
            }
            case 71: {
                b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 1, 2, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 5, 5, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 5, 5, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histBefore.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 5, 5, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histAfter.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 5, 5, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histBefore.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 5, 5, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histAfter.push(b); }
                return e;
            }
            case 72: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [1, 1, 1, 2, 2, 2];
                b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [1, 1, 6, 6, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 1, 6, 6, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histBefore.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 1, 6, 6, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histAfter.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 1, 6, 6, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histBefore.push(b); }
                { const b = new apocTypes.BattleSpec();
                  b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Strike", "Strike"];
                  b.allyValues = [1, 1, 1, 2, 2, 2];
                  b.enemyMoves = ["Wait", "Wait", "Wait", "Wait", "Wait", "Wait", "Wait"];
                  b.enemyValues = [1, 1, 6, 6, 1, 1];
                  b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                  b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                  e.histAfter.push(b); }
                return e;
            }
        }
        return null;
    }
    function expectedGroup8(e: Expect, key: number): Expect {
        const b = e.lists;
        switch (key) {
            case 73: {
                b.allyMoves = ["Ward", "Strike", "Ward", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [6, 4, 6, 4, 6, 4, 4];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [4, 1, 4, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 74: {
                b.allyMoves = ["Wait", "Ward", "Strike", "Ward", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 6, 4, 6, 4, 6, 4, 4];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 4, 1, 4, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 75: {
                b.allyMoves = ["Wait", "Wait", "Ward", "Strike", "Ward", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [1, 1, 6, 4, 6, 4, 6, 4, 4];
                b.enemyMoves = ["Wait", "Wait", "Strike", "Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 1, 4, 1, 4, 1, 4, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = [];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 76: {
                b.allyMoves = ["Ward", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [2, 2, 2, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Strike", "Wait", "Strike", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 77: {
                b.allyMoves = ["Strike", "Ward", "Mend", "Ward", "Strike", "Strike"];
                b.allyValues = [2, 2, 2, 2, 2, 2];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                b.enemyValues = [1, 2, 1, 2, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Wait", "Strike", "Wait", "Strike", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 78: {
                b.allyMoves = ["Ward", "Mend", "Strike", "Ward", "Strike", "Strike", "Strike"];
                b.allyValues = [2, 2, 2, 2, 2, 2, 2];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 1, 1, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider", "E-Raider"];
                e.rosterIDs = []; e.sourceMoves = ["Strike", "Wait", "Wait", "Strike", "Wait", "Wait", "Wait"];
                e.heldChoices.push([]); e.banishedChoices.push([]);
                return e;
            }
            case 79: {
                b.allyMoves = ["Mend", "Strike", "Strike", "Strike", "Strike", "Strike", "Flurry", "Strike"];
                b.allyValues = [1, 2, 2, 2, 2, 2, 8, 3];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Wait", "Flurry", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 3, 1, 2, 6, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-King", "E-King", "E-King", "E-King", "E-King", "E-King", "E-Raider", "E-Wisp"];
                e.rosterIDs = ["E-Raider", "E-Wisp"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Raider", "E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 80: {
                b.allyMoves = ["Mend", "Strike", "Strike", "Strike", "Strike", "Strike", "Flurry", "Strike"];
                b.allyValues = [1, 2, 2, 2, 2, 2, 8, 3];
                b.enemyMoves = ["Strike", "Wait", "Wait", "Flurry", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [3, 2, 1, 6, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-King", "E-King", "E-King", "E-King", "E-King", "E-King", "E-Raider", "E-Wisp"];
                e.rosterIDs = ["E-Wisp", "E-Raider"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Raider", "E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
            case 81: {
                b.allyMoves = ["Mend", "Strike", "Strike", "Strike", "Strike", "Strike", "Flurry", "Strike"];
                b.allyValues = [1, 2, 2, 2, 2, 2, 8, 3];
                b.enemyMoves = ["Wait", "Strike", "Wait", "Flurry", "Wait", "Wait", "Wait", "Wait"];
                b.enemyValues = [2, 3, 1, 6, 2, 1, 1, 1];
                b.allyTargetIDs = ["A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic", "A-Medic"];
                b.enemyTargetIDs = ["E-King", "E-King", "E-King", "E-King", "E-King", "E-King", "E-Raider", "E-Wisp"];
                e.rosterIDs = ["E-Raider", "E-Wisp"]; e.sourceMoves = [];
                e.heldChoices.push(["E-Raider", "E-Wisp"]); e.banishedChoices.push([]);
                return e;
            }
        }
        return null;
    }
    function expected(room: apocTypes.Room, variant: number): Expect {
        if (room < 1 || room > 27 || variant < 1 || variant > 3 ||
            room !== Math.floor(room) || variant !== Math.floor(variant)) return null;
        const e = new Expect(); e.lists = new apocTypes.BattleSpec();
        const key = (room - 1) * 3 + variant;
        if (room <= 3) return expectedGroup0(e, key);
        if (room <= 6) return expectedGroup1(e, key);
        if (room <= 9) return expectedGroup2(e, key);
        if (room <= 12) return expectedGroup3(e, key);
        if (room <= 15) return expectedGroup4(e, key);
        if (room <= 18) return expectedGroup5(e, key);
        if (room <= 21) return expectedGroup6(e, key);
        if (room <= 24) return expectedGroup7(e, key);
        if (room <= 27) return expectedGroup8(e, key);
        return null;
    }
}

// SUPPLIED SOURCE supplied-world/art.ts
// GENERATED by tools/import-utumno.py build. Conserve usage.
// Palette: implementation/palette.json. Factories return fresh mutable native Images.
// Supplied art provenance + honest inspection scope: docs/ART_CATALOG.md.
namespace apocArt {
    export function actor(artKey: string, side: apocTypes.Side): Image {
        if (artKey == "A-Blade") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . . . . . . b b b b b b . . . . .
        . . . . . . . . . . . . b b . b b b b b . . . .
        . . . . . . . . . . . . . . . . . b b b b . . .
        . . . . . . . . . . . . . . . . . . . b b f f .
        . . . . . . . . . . . . . . . b b . b b b f f .
        . . . . . . . . . . . . . b b b b b b f f f f .
        . . . . . . . . . . . . b b b b b b b f f f f .
        . . . . . . . . . . . b b b b b b b b f f f f .
        . . . . . . . b b b b b b b b b b b b b f f f .
        . . . . . . b b b b b b b b b b b b b b f f f .
        . . . . b . b b b b b b b b b f b b b b f f . .
        . . . . b b b b b b b b b b f f f b b b b f . .
        . . . b b b b b b b b b f f f f f f f b b f . .
        . . . b b b b b 1 b b b f f f f f f b b f f . .
        . . 1 f b b b 1 b b b b f f f . f f b f f . . .
        . . 1 1 1 1 b 1 b f b b f f . . . . . . . . . .
        . . 1 1 1 b b b f f b b f f . . . . . . . . . .
        . b 1 b 2 b b f f f b b f . . . . . . . . . . .
        . b 2 2 b b f f f b b f f . . . . . . . . . . .
        . . b b b f f f b b b f . . . . . . . . . . . .
        . . . . . . . . f f f . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Guardian") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . b 1 . . . . . . . . . . . .
        . . . . . . . . . b 1 2 b . . . . . . . . . . .
        . . . . b . . . . b 1 b b . . . b b b . . . . .
        . . . b b b b . b b b b b b . b 9 b b . . . . .
        . . b b b b b b b b b b b b b b b b b . . . . .
        . . b b 1 9 b f b b b b b 1 b b b b b b . . . .
        . . b b f b b b f b b 1 b b b b b 9 b f . . . .
        . . . b b f b b b b 9 f b b b b b f f b . . . .
        . . . b 1 b f f b b b f b f b . b 1 9 b . . . .
        . . b 9 b . . . . b f b b b . . . b 9 b b . . .
        . . b 1 b . . . . f b b f f . . . b b b b . . .
        . b 1 1 f . . . . . b f b b b . . b f b b b . .
        . b 1 f b b . . . b b b f b b b f f b b b b . .
        . b b 1 b b b f b 9 b b f f b b b b b b b b f .
        . b b b b b b b b b b b f f b b 1 b b b b b f .
        . b 1 1 b b b b 1 9 b b f f f b f b 9 b b b . .
        . b b 9 b b b b 1 b b b f f f b b b 1 b b b . .
        . b 1 b b b b b 9 b b b f f f b b b 1 b b b . .
        . . f f b f f b b b b b f . f f b b 1 b b b . .
        . . . . f f f b f b b b . . . f b b 9 b b b . .
        . . . . . . f b b f b b . . . . f b b f . . . .
        . . . . . . . f f f f f . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Medic") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . f f f f f . . . . . . . . . .
        . . . . . . . f 2 4 4 4 2 2 e f . . . . . . . .
        . . . . . . f 2 2 4 5 4 4 2 2 e f . . . . . . .
        . . . . . f 2 2 4 2 2 4 4 2 4 2 2 e . . . . . .
        . . . . f e 2 4 2 2 4 2 2 2 2 2 2 e f . . . . .
        . . . . 2 2 2 2 2 2 2 2 2 2 4 2 2 2 2 f . . . .
        . . . . 2 2 2 2 2 2 2 e e 2 2 4 2 2 2 e . . . .
        . . . f 2 2 2 2 2 e 2 2 2 2 2 e 2 2 2 2 f . . .
        . . . f 2 2 2 e e f e e e 2 e 2 e 2 2 4 e f . .
        . . f e 2 f e e f e e f 2 e f e 2 2 2 2 5 e . .
        . . 2 2 2 2 f 2 f f f 2 e e 2 2 f f e 4 e 2 f .
        . f 2 2 2 f 2 2 2 2 f 2 2 4 4 2 2 2 f f 2 f . .
        . . f f . . f e 2 2 2 f . 2 2 f e 2 2 f . . . .
        . . . . . . . f e 2 2 f . f f . f f 2 2 . . . .
        . . . . . . . . . . f . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Ranger") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . f f . . . . . . . . . . . . . . . . f f . .
        . . d d e f . . . . . . . . . . . . f e d d . .
        . . f b d e . . . . . . . . . . . . e d b f . .
        . . . f d d e f . . . . . . . . f e d d f . . .
        . . . f d d e f . . . . f . . . f e d d f . . .
        . . . f d d e f f f b . f f . f f d d d f . . .
        . . . f b b d e f f d f f f . f e d b b f . . .
        . . . . d d b b f b d b d b f e b b d d . . . .
        . . . f d f d d e b f 8 b b f b d d f d f . . .
        . . f f e d d d b b f f 1 b f d d d b e f f . .
        . . . . f b b b e b b f c b f e b d f f . . . .
        . . . . f b e f f e b f f e f e e b . . . . . .
        . . . . . f f f f e b b f e f f e f . . . . . .
        . . . . . f f f f e b d d e f f e f . . . . . .
        . . . . . . . . . f f f f f . . f . . . . . . .
        . . . . . . . . . f e f f f . . . . . . . . . .
        . . . . . . . . . . . f . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . f f f f f f f f f f f f . . . . . .
        . . . . . . f f f f f f f f f f f f . . . . . .
        . . . . . . . . . . . f f f . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Harvester") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . f f f . . . . . . . . . . . . .
        . . . . . . . f b f f f . . . . . . . . . . . .
        . . . . . . . b 1 3 b f . . . . . . . . . . . .
        . . . . . . . f 3 3 3 b f . . . . . . . . . . .
        . . . . . . . f 3 3 d b f . . . . . . . . . . .
        . . . . . . f 3 3 3 3 3 3 f . . . . . . . . . .
        . . . . . f 1 d 3 3 3 3 3 3 . . . . . . . . . .
        . . . . . f 1 1 3 1 1 1 3 3 . . . . . . . . . .
        . . . . . 1 3 3 3 3 3 3 3 1 f . f 7 f . . . . .
        . . . . . 1 3 3 d 3 3 d 3 1 f . . f 7 f . . . .
        . . . f 1 3 e 3 e 3 3 3 e 3 d f . . 7 7 . . . .
        . . . f 3 d f 1 d 3 3 e f d 3 f . . 7 6 . . . .
        . . f 3 e . . 1 3 3 3 6 f e 3 f f f 7 f . . . .
        . . f 3 f . . 7 3 7 7 6 f 3 e f 7 7 6 f . . . .
        . . . . . . f 7 7 7 7 6 f 3 f f 7 7 . . . . . .
        . . . . . . f 7 7 7 7 6 . f f f 7 7 . . . . . .
        . . . . . f 7 7 7 7 7 6 . . f 7 7 6 f . . . . .
        . . . . . f 7 7 7 7 7 6 . . f 7 7 6 f f f . . .
        . . . . . f 7 7 7 7 7 7 f f 7 7 7 6 f f f . . .
        . . . . . . f 7 7 7 7 7 7 7 7 7 7 f f f f . . .
        . . . . . . f 7 7 7 7 7 7 7 6 6 f f f f f . . .
        . . . . . . . . f f f f f f f f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Reaper") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . 8 8 . . . . . . . . . .
        . . 8 1 1 8 . . . . . 8 a 8 8 . . . . . . . . .
        . . . 1 8 8 . . . . 8 a 1 1 8 . . . . . . . . .
        . . 8 a 1 8 . . . . 8 a 1 a 8 8 . . . . . . . .
        . . 8 1 a . . . . . 8 1 1 1 8 8 . . . . . . . .
        . . . 8 a . . . . 8 a 8 8 8 a 8 a 8 . . . . . .
        . . . 8 a . . . 8 8 a 8 8 8 a 8 8 8 8 . . . . .
        . . . 8 a . . . a 8 8 a a a 8 8 8 8 8 . . . . .
        . . . 8 1 8 8 a a 8 8 a a a a 8 8 a a 8 8 . . .
        . . . a a 8 a a a 8 a 8 8 8 8 a 8 a 8 8 8 . . .
        . . . 8 1 8 a a 8 8 8 8 a 8 8 8 8 8 8 a 8 . . .
        . . . 8 1 8 a a 8 8 8 8 a 8 8 8 8 8 8 a 8 8 . .
        . . . 8 1 8 a 8 8 8 8 a a 8 a 8 . 8 8 8 8 . . .
        . . . 8 1 8 8 8 8 . 8 a a 8 a 8 . 8 8 8 8 . . .
        . . . . 8 8 8 8 8 . 8 a a a a 8 . . 8 . . . . .
        . . . . 8 8 8 8 8 . 8 8 8 a a 8 . . . . . . . .
        . . . . 8 8 8 8 . . 8 8 8 a a a 8 . . . . . . .
        . . . . 8 8 . . . . 8 8 8 a 8 a 8 8 8 8 8 . . .
        . . . . 8 8 . . . 8 8 a 8 a 8 a 8 8 8 8 8 . . .
        . . . . . a 8 . 8 . 8 8 8 8 8 8 8 8 8 8 8 . . .
        . . . . . a 8 8 . . a a 8 8 8 a 8 8 8 8 . . . .
        . . . . . 8 . . . 8 8 8 8 . 8 8 8 8 8 . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Executioner") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . b b . . . . . . . . . . . .
        . . . . . . . . . b 1 2 b . . . . . . . . . . .
        . . . . b . . . . b 1 b b . . . b b b . . . . .
        . . . b b b f . b b b b b b . b b b b . . . . .
        . . b b 1 b f b b b b b b b b b b b b . . . . .
        . . b b 1 b b b b 1 b b b b b b b b b b . . . .
        . . b b f b b b b b b b b b b b b b b f . . . .
        . . . b b f f b b b b b b b b f b f f b . . . .
        . . . f f b f b b b b b b b b . f b b . . . . .
        . . f f f . . . . f f b b f . . . b b f . . . .
        . . b 1 b . . . . b b f f b . . . f f b b . . .
        . b 1 b f . . . . . b f f b b . . f f b b b . .
        . b 1 b b f . . . b 9 b f b b b f f b b b b . .
        . b 1 b b f f f b 1 b b f f b 1 b f b b b b f .
        . b 1 b b f f b b 1 b f f f f b 1 b b b b b f .
        . b 1 b b b f b b b b f f f f b f b 1 b b e f .
        . b 1 b b b f b 1 b b f f f f f b b 1 b d b f .
        . b 1 b b b f b 1 b b f f f f f f b 1 b b b f .
        . . b b b f f b 1 b b f f f f f f b 1 b b b f .
        . . f f f f f b 1 b b f f f f f f b b b e b . .
        . . . . . . f b 1 b b f f f f f f f f f f . . .
        . . . . . . . f f f f f . . . f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Enchanter") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . f f f f f . . . . . .
        . . . . . . . . . . . f f a 6 a 6 6 a a . . . .
        . . . . . . . . . . . f a a 6 6 6 a 6 6 f . . .
        . . . . f . . f 6 f f 6 a 9 9 9 9 6 a a f f . .
        . . . . 6 f f f f 6 f 6 6 9 a a 9 9 6 b a f . .
        . . . . f b b 6 f f f a 6 a a a 2 a 6 b f f . .
        . f f f b b . f 6 f f 6 6 9 9 9 a 6 6 a f f . .
        . . b 6 f f f f f f f 6 6 a 9 9 6 a 6 6 a f . .
        . . . . . . f 6 f f f a a 6 6 a 6 6 a 6 f f . .
        . . . . . . f b 6 f f f 6 6 6 6 a 6 a a f f . .
        . . . f 6 6 b f 6 b b f 6 f 6 6 a 6 f f f f f .
        . . f 6 f f f f a 1 b f 6 f f f f f f f f f f .
        . . 6 f . . f 6 f b c 6 f f f f c f f f f f f .
        . . b f . . 6 f f b f b f f f f f f f 6 f f . .
        . . f 6 . . f f f b f f f f f 6 f f f 6 . . . .
        . . . . . . . . f . f f . 6 f 6 f f . f f . . .
        . . . . . . . . . . f f . 6 f f b f . f f . . .
        . . . . . . f . . f b . . b f f 6 f . f f . . .
        . . . . . . f b 6 f f . . 6 f f 6 f . . f . . .
        . . . . . . . f f . . . . 6 f f 6 6 . . . . . .
        . . . . . . . . . . . . . . f . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Venomist") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . e e d . . . . . . . . . . . . . . . . . . .
        . . d d d . . . . e d d . . . . . . . b b b b .
        . . b d d . . . b d d d d . . . . . . b b b b .
        . e b . . . . . b d b d b . . . . . . d d b . .
        . e b . . . . . . b e b d . . . . . . d d d . .
        . . b b b . 6 6 . . e e d d . . 6 6 6 e d d . .
        . . e d d b 6 6 b b e b b b b b d b b e e e . .
        . . . e e e 6 b b b e b 6 6 d d d b d b d d . .
        . . . . . d d e b b e b 6 6 b d d d d . e . . .
        . . . . . . . e e e e e 6 6 b b b . . . e . . .
        . . . . . . . d b b b b 6 b . . . . . . . . . .
        . . . . . . b e b b b e 6 b . . . . . . . . . .
        . . . . . . b b e d d d 6 b . . . . . . . . . .
        . . . . . d b d . . . . b b . . . f f . . . . .
        . . . . . e b d . . . . d e d d f f f . . . . .
        . . . . . d e . . . . . f d b b b f f . . . . .
        . . . . . b d e . . . f f e b b b f f . . . . .
        . . . . . . b e . . f f f f b b b f f . . . . .
        . . . . . . . d . f f f f f d d d f . . . . . .
        . . . . . . . e e f f f f f b e d . . . . . . .
        . . . . . f f f f f . . . f f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Raider") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . f f f . . . . . . . . . . .
        . . . . . . . . f d 3 3 3 f . . . . . . . . . .
        . . . . . . f f e d 3 3 3 d f f f . . . . . . .
        . . . . . . f d d f 3 f f d e d f . . . . . . .
        . . . . . . . f d 3 1 3 3 d e f . . . . . . . .
        . . . . . . . . f d 3 d 2 e f . . . . . . . . .
        . . . . . . . . b e d e e e b . . . . . . . . .
        . . . . . . . f f b e e e b f f . . . . . . . .
        . . . . . . f d f b f f f b f d d . . . . . . .
        . . . . . . f d b f b b b f b d e f . . . . . .
        . . . . . f e e f f b b b f f e e b f . . . . .
        . . . f f b e e e e f f f e e f e b f . . . . .
        . . f d e d f . f b 2 2 e b b . f d e f . . . .
        . . f e e f . f f f b b b f f f f e e f . . . .
        . . . . . . . f f f b b b f f f . f . . . . . .
        . . . . . . . f f f f f f b f f f f f f . . . .
        . . . . . . . f d b b b b f e f f f f f f . . .
        . . . . . . . f 3 e f f f e 3 e f f f f f . . .
        . . . . . . f e e e f f f e e e f f f f . . . .
        . . . . . . f e e f f f f e e e f f . . . . . .
        . . . . . . 2 2 e f f f . f e 2 2 . . . . . . .
        . . . . . . f f f f . . . . f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Decoy") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . f f f . . . . . . . . . . .
        . . . . . . . . . f e e c f . . . . . . . . . .
        . . . . . . f . . e d e e e . . f . . . . . . .
        . . . . . f 2 2 c e e e e 2 c 2 2 f . . . . . .
        . . . . . f 2 2 2 2 e c 2 2 2 e 2 f . . . . . .
        . . . . . . f 2 e e e c e 5 e e f . . . . . . .
        . . . . . . . f 2 2 2 2 2 e f f . . . . . . . .
        . . . . . . . f f e 2 2 e 2 f e f f . . . . . .
        . . . . . f e f c b 1 b b 2 c e e e e . . . . .
        . . . . . f e e f f 2 2 2 f f e c e 2 f . . . .
        . . . . f e 2 c e c f f f e e b 2 e 2 f . . . .
        . . f f e 2 2 e f f e f e f f e f f e e f . . .
        . f b 1 2 2 e f f e f e f e e f . f e e f . . .
        . f 2 e e e f . f 2 c f c f 2 f . . f e 2 f . .
        . . f f . . . f f b b b b b b c f . f 2 1 f . .
        . . . . . . . f b b c b c b c f f . . f f . . .
        . . . . . . . f c c f b f f f e f f f . . . . .
        . . . . . . . f e 2 e f f 2 2 e f f f f f . . .
        . . . . . . . f 2 2 e f f f 2 e f f f f f f . .
        . . . . . . . f 2 2 f f f f e e f f f f f . . .
        . . . . . . f 1 2 e f . . f b e 1 f f . . . . .
        . . . . . . f f f f . . . . f f f f . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Plague") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . f f f . . . . .
        . . . . . . . . . . . . . . f d e e e e f . . .
        . . . . . . . . . . . . . f 5 e e f e e 5 f . .
        . . . . . . . . . . . . . . f e f . . f e d . .
        . . . . . . . . . . . . . . . 5 d f . . e e . .
        . . . . . . . . . . . . . . . 5 f . . . 5 d f .
        . . . . . . . . . . . . . . . f . . . . 5 d f .
        . . . . . . . . . . . . . . . . . . . . d e f .
        . . . . . . . f 7 f . e e . . . . . . f e e . .
        . . . . . f . f f e f f f f . . . . f 5 e f . .
        . . . . . f e f 7 f e . f f . . . f d e f f . .
        . . . f f . f f f f f f f f . f f 4 f e f . . .
        . . d 5 d e . . f f f f 5 d 5 5 e e f f f f f .
        . . d 5 e e f f f 5 5 d 5 e d e e e f f f f f .
        . f f e e d d d 5 d d e e e e e f f f 7 f . . .
        . f f e d f 7 d 4 e e e e f f 7 f f f 7 . . . .
        . f f f e d d e e e e e e e f 7 f f f 5 . . . .
        . . . . f f e e e f f f . 4 f f e f f 7 . . . .
        . . . f e d d e f d f . . e f f 7 f f 7 . . . .
        . . . f e e e e 4 e f . . 7 f f 7 f . f . . . .
        . . f e f f e e e f . . . e f f e 7 . . . . . .
        . . . . f f f f f . . . . . f . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Boss") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . 6 . . . . . . . . . . . . . . . 6 6 6 6 6 . .
        . . 2 2 6 6 6 6 6 6 . . . . 6 2 2 2 2 2 2 . . .
        . . . 2 2 2 2 2 6 2 . . . 6 6 6 6 2 2 2 . . . .
        . . . 2 2 6 2 2 7 7 6 . . 6 2 2 2 2 6 2 . . . .
        . . 2 2 6 2 7 7 7 7 6 . . 6 2 2 2 2 2 2 . . . .
        . . 6 2 2 2 7 6 6 6 7 6 7 6 2 2 2 2 2 2 6 . . .
        . . . 2 2 7 7 6 7 7 6 6 7 . 6 2 2 2 2 . . . . .
        . . . . 2 7 7 6 2 7 7 6 6 7 6 2 2 2 . . . . . .
        . . . . 1 1 7 1 . 2 7 7 7 6 7 7 7 . . . . . . .
        . . . . b 7 7 7 6 7 6 7 7 6 6 7 7 7 . . . . . .
        . . . . . 7 7 7 2 6 6 7 7 6 6 6 6 6 7 7 . . . .
        . . . . . 6 2 7 7 7 6 7 7 6 6 6 6 6 6 7 . . . .
        . . . . 6 6 7 7 7 7 6 7 7 7 6 6 6 . 1 7 7 . . .
        . . 6 6 6 6 1 6 7 7 6 7 7 7 6 6 7 f f 1 7 . . .
        . . . 6 1 . . . 6 . 6 6 7 7 6 7 6 7 6 f 6 . . .
        . 1 . 1 1 . . . . 6 6 6 7 7 6 7 6 6 6 6 6 f . .
        . . . 1 . . . . 6 7 6 6 7 7 7 6 7 6 6 6 f f . .
        . . . . . . . 6 6 6 6 6 f 7 7 6 6 7 6 f f . . .
        . . . . . . . 6 6 6 6 f f f f 6 6 6 7 f f . . .
        . . . . . . 6 6 6 6 f f f f f f 6 6 6 6 f f . .
        . . . . . 6 6 6 6 6 f f f . . f f 6 6 6 6 f . .
        . . . . f f f f f f f . . . . f f f f f f . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-King") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . d 3 3 3 3 . . . . . . . . . . .
        . . . . . . . . 3 3 3 3 d d . . . . . . . . . .
        . . . . 3 3 3 3 2 3 3 d 2 d d 3 3 . . . . . . .
        . . . . . . e 1 3 3 1 3 3 d e . . . . . . . . .
        . . . 2 . . . . 2 2 2 1 d d e . . . . 2 . . . .
        . . . . . . 2 2 e e e e e 2 e 2 2 . . . . . . .
        . . . 2 2 2 2 2 2 2 2 2 2 2 2 e 2 e . . . . . .
        . . . . 2 2 e f 2 2 2 2 2 2 e e 2 2 2 2 . . . .
        . . . e 2 2 e e 2 e 2 2 e 2 2 e e e 2 . . . . .
        . . . 2 e 2 e . 2 2 2 2 2 2 e . e 2 2 2 . . . .
        . . . b b b e . 2 e 2 e 2 2 . . f b b f . . . .
        . . . b b b . . 2 2 2 2 2 e 2 . f f b d . . . .
        . . 3 b f f . 2 2 d 4 d e 2 2 e f d 3 d f . . .
        . . d d f . 2 e 2 e 2 2 2 e e 2 f e d f f . . .
        . . . e . 2 e 2 e 2 e 2 2 e e 2 2 f f f f . . .
        . . . . . 2 2 e e f 2 2 f e e 2 2 f f f f . . .
        . . . . . 2 3 3 e f 2 f f f e 3 2 f f f f . . .
        . . . . . . 2 2 f f f f f f f 2 2 f f f f . . .
        . . . . . . 2 2 f f f f f f f 2 2 f f f f . . .
        . . . . . . 2 2 f f f f f f f 2 2 f f f . . . .
        . . . . . 2 2 2 f f f f f f f 2 2 2 f f . . . .
        . . . . . . f f . . . . f f f f f f . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Wisp") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . 9 9 9 . . . . . . . .
        . . . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 . . .
        . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . .
        . . . . . 9 9 9 9 9 9 9 9 9 9 . . . . . . . . .
        . . . . . . 9 9 9 9 9 9 9 . . . . . . . . . . .
        . . . . . . . . . . 9 9 9 9 . . . . . 9 9 9 9 .
        . . . . . . . . . . 9 9 9 9 9 9 . . . . . . . .
        . . . . . . . . 9 9 9 9 . . . . . . . . . . . .
        . . . . . . . . . . . 9 9 9 9 9 . . . . . . . .
        . . . . . . . . . . . . 9 9 9 9 9 9 9 . . . . .
        . . 9 9 9 9 . . . . . . 9 9 9 9 . . . . . . . .
        . . . . . . . . . . . 9 9 . . . . . . . . . . .
        . . . . . . . . 9 9 9 9 9 . . . . . . . . . . .
        . . . . . . . . c c c c c . 9 9 9 9 9 9 9 9 . .
        . . . . . . . . . . . c c . . . . . . . . . . .
        . . . . . . . . . . . . c . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . c . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Small") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . e e e e . . . . . . . . . .
        . . . . . . . . . e e e e e e e e 3 3 3 . . . .
        . . . . . . . e e e 2 e e e e e e e f f e f . .
        . . . . . . . e e e e 2 2 e e e e f f f e f . .
        . . . . . . . e 2 e e e e e e e e f f f f d f .
        . . . 2 . e e e e e e e e e e e e f f f f e f .
        . . . 2 2 e e 2 e 2 e e e e e e e f f f f e f .
        . . . d 2 e 2 2 e e e e e e e e e f f f 3 f f .
        . . . e 2 e 3 2 e e e e e e e e f f f . 3 f . .
        . . e e e e e e e e e f f e e e f . . . d f . .
        . . e e e 1 e f f e f e f f d f f . . 3 e f . .
        . f e e e e f f f f f f f f f f . . . 3 d . . .
        . f f 1 f e f 3 3 f f . . . . . 3 d e f f . . .
        . . f f f f f f f f . . . . . . f f f f . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Shaman") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . f . . . . . . . . . . . .
        . . . . . . . . . . f f . f f . . . . . . . . .
        . . . . . . . . . . f f f f f . . . . . . . . .
        . . . . . . . . . . f 8 8 8 f c . . . . . . . .
        . . . . . . . . . . c c c f 8 c c . . . . . . .
        . . . . . . . . . f f f f b c f f . . . . . . .
        . . . . . . . . f 4 b b b b e 8 4 f . . . . . .
        . . . . . . . . f e b b 2 f 8 c e 4 f . . . . .
        . . . . . . . f e 8 f f 4 e 4 e f e 4 . . . . .
        . . . . . . . 4 e e e e e e e f . e e f . . . .
        . . . . . f f e e e e e e e e f . f e f . . . .
        . . . . f e 8 e e f e 4 e e 4 f . f 8 f . . . .
        . . . . f e f . . . 5 5 5 5 4 4 f 4 4 . . . . .
        . . . . . f . . . f 5 5 5 5 4 4 f e e . . . . .
        . . . . . . . . f 1 5 4 4 5 4 4 f . . . . . . .
        . . . . . . . . f 1 1 5 4 4 4 4 f . . . . . . .
        . . . . . . . . f 1 1 1 4 4 4 4 f . . . . . . .
        . . . . . . . . f 4 9 9 9 4 4 4 e f f f . . . .
        . . . . . . . . f e e f f f e e e f f f . . . .
        . . . . . . . . f f c f f f f 8 c f f . . . . .
        . . . . . . . f e 4 e f f . f e 4 f f . . . . .
        . . . . . . . f f f f f . . f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "bat") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . f f . . . . . . . . . . . . . . . . f f . .
        . . d d e f . . . . . . . . . . . . f e d d . .
        . . f b d e . . . . . . . . . . . . e d b f . .
        . . . f d d e f . . . . . . . . f e d d f . . .
        . . . f d d e f . . . . f . . . f e d d f . . .
        . . . f d d e f f f b . f f . f f d d d f . . .
        . . . f b b d e f f d f f f . f e d b b f . . .
        . . . . d d b b f b d b d b f e b b d d . . . .
        . . . f d f d d e b f 8 b b f b d d f d f . . .
        . . f f e d d d b b f f 1 b f d d d b e f f . .
        . . . . f b b b e b b f c b f e b d f f . . . .
        . . . . f b e f f e b f f e f e e b . . . . . .
        . . . . . f f f f e b b f e f f e f . . . . . .
        . . . . . f f f f e b d d e f f e f . . . . . .
        . . . . . . . . . f f f f f . . f . . . . . . .
        . . . . . . . . . f e f f f . . . . . . . . . .
        . . . . . . . . . . . f . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . f f f f f f f f f f f f . . . . . .
        . . . . . . f f f f f f f f f f f f . . . . . .
        . . . . . . . . . . . f f f . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "wolf") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . . . . . . b b b b b b . . . . .
        . . . . . . . . . . . . b b . b b b b b . . . .
        . . . . . . . . . . . . . . . . . b b b b . . .
        . . . . . . . . . . . . . . . . . . . b b f f .
        . . . . . . . . . . . . . . . b b . b b b f f .
        . . . . . . . . . . . . . b b b b b b f f f f .
        . . . . . . . . . . . . b b b b b b b f f f f .
        . . . . . . . . . . . b b b b b b b b f f f f .
        . . . . . . . b b b b b b b b b b b b b f f f .
        . . . . . . b b b b b b b b b b b b b b f f f .
        . . . . b . b b b b b b b b b f b b b b f f . .
        . . . . b b b b b b b b b b f f f b b b b f . .
        . . . b b b b b b b b b f f f f f f f b b f . .
        . . . b b b b b 1 b b b f f f f f f b b f f . .
        . . 1 f b b b 1 b b b b f f f . f f b f f . . .
        . . 1 1 1 1 b 1 b f b b f f . . . . . . . . . .
        . . 1 1 1 b b b f f b b f f . . . . . . . . . .
        . b 1 b 2 b b f f f b b f . . . . . . . . . . .
        . b 2 2 b b f f f b b f f . . . . . . . . . . .
        . . b b b f f f b b b f . . . . . . . . . . . .
        . . . . . . . . f f f . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "jelly") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . f f f f f . . . . . . . . . .
        . . . . . . . f 2 4 4 4 2 2 e f . . . . . . . .
        . . . . . . f 2 2 4 5 4 4 2 2 e f . . . . . . .
        . . . . . f 2 2 4 2 2 4 4 2 4 2 2 e . . . . . .
        . . . . f e 2 4 2 2 4 2 2 2 2 2 2 e f . . . . .
        . . . . 2 2 2 2 2 2 2 2 2 2 4 2 2 2 2 f . . . .
        . . . . 2 2 2 2 2 2 2 e e 2 2 4 2 2 2 e . . . .
        . . . f 2 2 2 2 2 e 2 2 2 2 2 e 2 2 2 2 f . . .
        . . . f 2 2 2 e e f e e e 2 e 2 e 2 2 4 e f . .
        . . f e 2 f e e f e e f 2 e f e 2 2 2 2 5 e . .
        . . 2 2 2 2 f 2 f f f 2 e e 2 2 f f e 4 e 2 f .
        . f 2 2 2 f 2 2 2 2 f 2 2 4 4 2 2 2 f f 2 f . .
        . . f f . . f e 2 2 2 f . 2 2 f e 2 2 f . . . .
        . . . . . . . f e 2 2 f . f f . f f 2 2 . . . .
        . . . . . . . . . . f . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "skeleton") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . f f f . . . . . . . . . . . . .
        . . . . . . . . 1 b b f . . . . . . . . . . . .
        . . . . . . . f 1 9 b f . . . . . . . . . . . .
        . . . . . . . f 1 1 9 9 f . . . . . . . . . . .
        . . . . . . . f 1 1 b . f . . . . . . . . . . .
        . . . . . . . . 1 b f 1 9 f . . . . . . . . . .
        . . . . . . . . f f 1 b 1 1 f . . . . . . . . .
        . . . . . . . . . f c c c c b f f . . . . . . .
        . . . . . . . . f b 1 c 1 1 9 1 b f . . . . . .
        . . . . . . . f 1 b c c f c b b b f . . . . . .
        . . . . . . f 9 b f 1 c 1 1 b f 9 1 f . . . . .
        . . . . . f 1 b . . f 1 1 1 b . f 1 f . . . . .
        . . . . f 1 1 f . f 1 1 b b f . f 1 f . . . . .
        . . . . . f f . f 1 b b b b f f 1 f . . . . . .
        . . . . . . . . f 1 b f 1 b f f 1 f . . . . . .
        . . . . . . . . f 1 b f 1 9 f . f . . . . . . .
        . . . . . . . . 1 1 f . f 1 9 . . . . . . . . .
        . . . . . . . . 1 1 f . f 1 9 f f . . . . . . .
        . . . . . . . . f 1 b f f f 1 f f f . . . . . .
        . . . . . . . . f 1 f f f f f f f f . . . . . .
        . . . . . . . f 1 f f f f 1 1 f . . . . . . . .
        . . . . . . . . f . f f f f f . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "lich") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . f f . . . . . . . . . .
        . . f 1 1 f . . . . . f b f f . . . . . . . . .
        . . . 1 f f . . . . f b 1 1 f . . . . . . . . .
        . . f b 1 f . . . . f b 1 b f f . . . . . . . .
        . . f 1 b . . . . . f 1 1 1 f f . . . . . . . .
        . . . f b . . . . f b f f f b f b f . . . . . .
        . . . f b . . . f f b f f f b f f f f . . . . .
        . . . f b . . . b f f b b b f f f f f . . . . .
        . . . f 1 f f b b f f b b b b f f b b f f . . .
        . . . b b f b b b f b f f f f b f b f f f . . .
        . . . f 1 f b b f f f f b f f f f f f b f . . .
        . . . f 1 f b b f f f f b f f f f f f b f f . .
        . . . f 1 f b f f f f b b f b f . f f f f . . .
        . . . f 1 f f f f . f b b f b f . f f f f . . .
        . . . . f f f f f . f b b b b f . . f . . . . .
        . . . . f f f f f . f f f b b f . . . . . . . .
        . . . . f f f f . . f f f b b b f . . . . . . .
        . . . . f f . . . . f f f b f b f f f f f . . .
        . . . . f f . . . f f b f b f b f f f f f . . .
        . . . . . b f . f . f f f f f f f f f f f . . .
        . . . . . b f f . . b b f f f b f f f f . . . .
        . . . . . f . . . f f f f . f f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "zombie") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . d . . . . . . . . . .
        . . . . . . . b b d d d b . . . . . . . . . . .
        . . . . . . . . b d d 2 d b . . . . . . . . . .
        . . . . . . . . d d d d d b . . . . . . . . . .
        . . . . . . . . d f f d f b . 1 . . . . . . . .
        . . . . . . . . d d d 1 1 b 1 1 . . . . . . . .
        . . . . . . . . d 2 2 1 2 1 1 . . . . . . . . .
        . . . . . . . . d 4 d d 4 d e . . . . . . . . .
        . . . . . . . e 7 d d b b e . . . . . . . . . .
        . . . . . . 7 7 d 7 7 e e d . . . . . . . . . .
        . . . . . 7 7 e 4 d 7 e e 4 d 4 . . . . . . . .
        . . . . . 7 e b 4 b b 7 f b d b . . . . . . . .
        . . . . . 7 e e d 4 b e f . f 2 2 . . . . . . .
        . . . . . e 7 e d b b e f f f b 2 f f . . . . .
        . . . . . e 7 e d d b 7 e f f f f f f f . . . .
        . . . . 7 d b e 7 e e 7 e f f f f f f . . . . .
        . . . . . d b e f e b b f f f f f f f . . . . .
        . . . . . d d e f f d d f f f f f . . . . . . .
        . . . . . d d f f f f d d f f . . . . . . . . .
        . . . . f d e d f f f b b f . . . . . . . . . .
        . . . . f d b d f . f d b f . . . . . . . . . .
        . . . . . f f f . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "ogre") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . f f f . . . . . . . . . . .
        . . . . . . . . . f 3 1 3 3 . . . . . . . . . .
        . . . . . . . . . f 3 3 3 3 . . . . . . . . . .
        . . . . . . . . f 3 3 3 3 3 f . . . . . . . . .
        . . . . . . . . 3 3 2 2 3 3 d f . . . . . . . .
        . . . . . f 3 3 3 2 2 2 2 d d 3 f f . . . . . .
        . . . . f 3 3 3 e 3 3 3 3 e 3 3 3 3 f . . . . .
        . . . f 3 3 3 d 3 e e e e d e d 3 3 3 f . . . .
        . . f 3 3 3 e e 3 3 3 3 3 3 3 d d 3 3 3 3 . . .
        . . f d d e f f e 3 3 3 3 3 3 e f d d d 3 f . .
        . . f 3 3 f f e d 3 3 3 3 3 d d f . f 3 3 f . .
        . . . 3 3 e f e 3 3 3 3 3 3 3 d f . f 3 3 f . .
        . . . . f 3 3 d d d 3 3 3 3 d d f f d d f . . .
        . . . . f d d d e e d d d d e e f d 3 e f . . .
        . . . . . f e 4 4 e 2 2 2 2 e 4 4 f e f f . . .
        . . . . . f 4 4 d 5 4 2 2 2 4 4 4 f f f f . . .
        . . . . . e 4 d 4 4 4 5 5 4 4 d e f f f f . . .
        . . . . . 4 e 4 5 4 4 5 4 5 d 4 f f f f f . . .
        . . . . . f e 3 4 d e 4 5 e 3 4 3 f f f . . . .
        . . . . . e d 3 d e f f f e 3 d f f f . . . . .
        . . . . . d 3 3 d f . . . f d d 3 3 f . . . . .
        . . . . . f f f f f . . . f f f f f . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "troll") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . 7 . 7 7 2 . . . . . . . . . . . . .
        . . . . 2 7 2 7 2 2 e e 2 7 . . . . . . . . . .
        . . . . . 7 7 7 2 2 7 2 e 7 7 7 . . . . . . . .
        . . . . e 7 2 2 2 7 7 e e e 7 7 7 7 7 . . . . .
        . . . . 7 7 7 7 7 7 e 7 e 2 7 7 7 7 7 . . . . .
        . . . . e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . . .
        . . . . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . . .
        . . . . . 7 7 . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . .
        . . . . . 7 7 . . 7 7 7 7 7 7 7 7 7 7 7 7 . . .
        . . . . . 7 7 . . . 7 7 7 7 7 7 7 . . 7 7 . . .
        . . . . . 7 7 7 . . 7 7 7 7 7 7 7 . . 7 7 f . .
        . . . . . . 7 7 . . 7 7 7 7 7 7 7 . . 7 7 f . .
        . . . . . 7 7 7 . . 7 7 7 . 7 7 7 f f 7 7 f . .
        . . . . 7 7 7 7 . . 7 7 7 . 7 7 7 f f 7 7 f . .
        . . . 7 7 7 . . . 7 7 7 7 f 7 7 7 f f 7 7 7 . .
        . . 7 7 7 . . . 7 7 7 7 7 f f 7 7 f f f 5 5 . .
        . . 7 7 7 . . . 7 7 7 7 7 f f 7 7 7 f f 5 5 . .
        . 7 7 7 . . . . 7 7 7 f f f f 7 7 7 f f 5 5 . .
        . 5 5 . . . . . 7 7 f f f f f 7 7 7 f f 5 5 . .
        . 5 5 . . . f f 7 7 f f f f f 7 7 7 7 . 5 5 . .
        . . 5 . . . f 7 7 7 f f f f f 7 7 7 7 . 5 . . .
        . . . . . . f f f f f . . . f f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "stone-golem") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . b 1 . . . . . . . . . . . .
        . . . . . . . . . b 1 2 b . . . . . . . . . . .
        . . . . b . . . . b 1 b b . . . b b b . . . . .
        . . . b b b b . b b b b b b . b 9 b b . . . . .
        . . b b b b b b b b b b b b b b b b b . . . . .
        . . b b 1 9 b f b b b b b 1 b b b b b b . . . .
        . . b b f b b b f b b 1 b b b b b 9 b f . . . .
        . . . b b f b b b b 9 f b b b b b f f b . . . .
        . . . b 1 b f f b b b f b f b . b 1 9 b . . . .
        . . b 9 b . . . . b f b b b . . . b 9 b b . . .
        . . b 1 b . . . . f b b f f . . . b b b b . . .
        . b 1 1 f . . . . . b f b b b . . b f b b b . .
        . b 1 f b b . . . b b b f b b b f f b b b b . .
        . b b 1 b b b f b 9 b b f f b b b b b b b b f .
        . b b b b b b b b b b b f f b b 1 b b b b b f .
        . b 1 1 b b b b 1 9 b b f f f b f b 9 b b b . .
        . b b 9 b b b b 1 b b b f f f b b b 1 b b b . .
        . b 1 b b b b b 9 b b b f f f b b b 1 b b b . .
        . . f f b f f b b b b b f . f f b b 1 b b b . .
        . . . . f f f b f b b b . . . f b b 9 b b b . .
        . . . . . . f b b f b b . . . . f b b f . . . .
        . . . . . . . f f f f f . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "iron-golem") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . b b . . . . . . . . . . . .
        . . . . . . . . . b 1 2 b . . . . . . . . . . .
        . . . . b . . . . b 1 b b . . . b b b . . . . .
        . . . b b b f . b b b b b b . b b b b . . . . .
        . . b b 1 b f b b b b b b b b b b b b . . . . .
        . . b b 1 b b b b 1 b b b b b b b b b b . . . .
        . . b b f b b b b b b b b b b b b b b f . . . .
        . . . b b f f b b b b b b b b f b f f b . . . .
        . . . f f b f b b b b b b b b . f b b . . . . .
        . . f f f . . . . f f b b f . . . b b f . . . .
        . . b 1 b . . . . b b f f b . . . f f b b . . .
        . b 1 b f . . . . . b f f b b . . f f b b b . .
        . b 1 b b f . . . b 9 b f b b b f f b b b b . .
        . b 1 b b f f f b 1 b b f f b 1 b f b b b b f .
        . b 1 b b f f b b 1 b f f f f b 1 b b b b b f .
        . b 1 b b b f b b b b f f f f b f b 1 b b e f .
        . b 1 b b b f b 1 b b f f f f f b b 1 b d b f .
        . b 1 b b b f b 1 b b f f f f f f b 1 b b b f .
        . . b b b f f b 1 b b f f f f f f b 1 b b b f .
        . . f f f f f b 1 b b f f f f f f b b b e b . .
        . . . . . . f b 1 b b f f f f f f f f f f . . .
        . . . . . . . f f f f f . . . f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "naga") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . f f f . . . . . . . . . . . . .
        . . . . . . . f b f f f . . . . . . . . . . . .
        . . . . . . . b 1 3 b f . . . . . . . . . . . .
        . . . . . . . f 3 3 3 b f . . . . . . . . . . .
        . . . . . . . f 3 3 d b f . . . . . . . . . . .
        . . . . . . f 3 3 3 3 3 3 f . . . . . . . . . .
        . . . . . f 1 d 3 3 3 3 3 3 . . . . . . . . . .
        . . . . . f 1 1 3 1 1 1 3 3 . . . . . . . . . .
        . . . . . 1 3 3 3 3 3 3 3 1 f . f 7 f . . . . .
        . . . . . 1 3 3 d 3 3 d 3 1 f . . f 7 f . . . .
        . . . f 1 3 e 3 e 3 3 3 e 3 d f . . 7 7 . . . .
        . . . f 3 d f 1 d 3 3 e f d 3 f . . 7 6 . . . .
        . . f 3 e . . 1 3 3 3 6 f e 3 f f f 7 f . . . .
        . . f 3 f . . 7 3 7 7 6 f 3 e f 7 7 6 f . . . .
        . . . . . . f 7 7 7 7 6 f 3 f f 7 7 . . . . . .
        . . . . . . f 7 7 7 7 6 . f f f 7 7 . . . . . .
        . . . . . f 7 7 7 7 7 6 . . f 7 7 6 f . . . . .
        . . . . . f 7 7 7 7 7 6 . . f 7 7 6 f f f . . .
        . . . . . f 7 7 7 7 7 7 f f 7 7 7 6 f f f . . .
        . . . . . . f 7 7 7 7 7 7 7 7 7 7 f f f f . . .
        . . . . . . f 7 7 7 7 7 7 7 6 6 f f f f f . . .
        . . . . . . . . f f f f f f f f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "minotaur") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . 1 1 1 . . e 2 2 2 2 . . . . . . . . .
        . . . . 1 1 b b 1 e 5 2 2 2 2 2 1 1 . . . . . .
        . . . 3 1 3 3 3 b e 5 5 2 2 2 1 1 1 1 1 . . . .
        . . 3 3 3 1 3 3 e 2 2 2 2 2 e e b b 1 1 . . . .
        . . 3 3 3 3 3 d e f 2 2 2 e e e 3 3 b 1 . . . .
        . . 3 3 3 3 3 3 3 e 2 2 e e 3 3 3 3 1 b . . . .
        . . 3 3 3 3 3 3 3 3 e e 3 3 3 3 3 3 3 3 . . . .
        . . . 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . . . .
        . . . d 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 . . . .
        . . . . . 3 3 3 3 3 3 3 3 3 3 d 3 3 3 3 . . . .
        . . . . . . . d d d d d 3 3 3 3 3 3 3 3 f . . .
        . . . . . . . e e 2 d d 3 3 3 3 3 3 3 d f . . .
        . . . . . . . 2 2 2 e e e d 3 3 3 3 d f f . . .
        . . . . . . . 2 2 e 2 e e 2 d d d d d f . . . .
        . . . . . . e 2 e e e e 2 2 2 2 e f f f . . . .
        . . . . . . e 2 e e f f e 2 2 2 2 f f f . . . .
        . . . . . . e e e f f f e e 2 2 f f f f . . . .
        . . . . . . . e e f f f f e e e f f . . . . . .
        . . . . . . . b e f f f f e e e f f . . . . . .
        . . . . . . . 1 9 f f f f f e f f f . . . . . .
        . . . . . . . f f f f f f f 1 f f f . . . . . .
        . . . . . . . . . . . . . . f f f f . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "orb-spider") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . f f f f f . . . . . .
        . . . . . . . . . . . f f a 6 a 6 6 a a . . . .
        . . . . . . . . . . . f a a 6 6 6 a 6 6 f . . .
        . . . . f . . f 6 f f 6 a 9 9 9 9 6 a a f f . .
        . . . . 6 f f f f 6 f 6 6 9 a a 9 9 6 b a f . .
        . . . . f b b 6 f f f a 6 a a a 2 a 6 b f f . .
        . f f f b b . f 6 f f 6 6 9 9 9 a 6 6 a f f . .
        . . b 6 f f f f f f f 6 6 a 9 9 6 a 6 6 a f . .
        . . . . . . f 6 f f f a a 6 6 a 6 6 a 6 f f . .
        . . . . . . f b 6 f f f 6 6 6 6 a 6 a a f f . .
        . . . f 6 6 b f 6 b b f 6 f 6 6 a 6 f f f f f .
        . . f 6 f f f f a 1 b f 6 f f f f f f f f f f .
        . . 6 f . . f 6 f b c 6 f f f f c f f f f f f .
        . . b f . . 6 f f b f b f f f f f f f 6 f f . .
        . . f 6 . . f f f b f f f f f 6 f f f 6 . . . .
        . . . . . . . . f . f f . 6 f 6 f f . f f . . .
        . . . . . . . . . . f f . 6 f f b f . f f . . .
        . . . . . . f . . f b . . b f f 6 f . f f . . .
        . . . . . . f b 6 f f . . 6 f f 6 f . . f . . .
        . . . . . . . f f . . . . 6 f f 6 6 . . . . . .
        . . . . . . . . . . . . . . f . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "earth-elemental") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . e e d . . . . . . . . . . . . . . . . . . .
        . . d d d . . . . e d d . . . . . . . b b b b .
        . . b d d . . . b d d d d . . . . . . b b b b .
        . e b . . . . . b d b d b . . . . . . d d b . .
        . e b . . . . . . b e b d . . . . . . d d d . .
        . . b b b . 6 6 . . e e d d . . 6 6 6 e d d . .
        . . e d d b 6 6 b b e b b b b b d b b e e e . .
        . . . e e e 6 b b b e b 6 6 d d d b d b d d . .
        . . . . . d d e b b e b 6 6 b d d d d . e . . .
        . . . . . . . e e e e e 6 6 b b b . . . e . . .
        . . . . . . . d b b b b 6 b . . . . . . . . . .
        . . . . . . b e b b b e 6 b . . . . . . . . . .
        . . . . . . b b e d d d 6 b . . . . . . . . . .
        . . . . . d b d . . . . b b . . . f f . . . . .
        . . . . . e b d . . . . d e d d f f f . . . . .
        . . . . . d e . . . . . f d b b b f f . . . . .
        . . . . . b d e . . . f f e b b b f f . . . . .
        . . . . . . b e . . f f f f b b b f f . . . . .
        . . . . . . . d . f f f f f d d d f . . . . . .
        . . . . . . . e e f f f f f b e d . . . . . . .
        . . . . . f f f f f . . . f f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "elf-knight") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . f f f f . . . . . . . . . .
        . . . . . . . . . f 1 3 3 1 1 . . . . . . . . .
        . . . . . . . . f f 1 1 1 1 1 . . . . . . . . .
        . . . . . . . . f f 1 1 3 1 1 . . . . . . . . .
        . . . . . . . . . f 1 3 3 1 1 . . . . . . . . .
        . . . . . . f f 1 1 1 f f 1 1 1 1 f . . . . . .
        . . . . . . 1 1 b b b b f 1 b b 9 1 f . . . . .
        . . . . . f 9 b b b b b b b f b b 9 1 f . . . .
        . . . . . . f b b b b f b b b f b f f . . . . .
        . . . . . . b 1 f f f b b f f b b b f . . . . .
        . . . . . f b b f f b b f b f f f b b b . . . .
        . . . f f b b f . f f b b f b . f b b f . . . .
        . . f b b b f . f b b b f b f b b b f f . . . .
        . . f b b f . . f b f b b f 1 b f f f . . . . .
        . . . f f . . . f b b b f b 1 f f f f f . . . .
        . . . . . . . . f b b b f b 1 f f f f f f . . .
        . . . . . . . . b b b f f b b b f f f f f . . .
        . . . . . . . . b 1 b f f b b b f f f f . . . .
        . . . . . . . . b 1 b f f b b b f f f f . . . .
        . . . . . . . f b b f f f f b b 1 f f . . . . .
        . . . . . . f 1 b b f f f f b b b f . . . . . .
        . . . . . . . f f f f . . . f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "dwarf") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . f 1 f f . . . . . . . . .
        . . . . . . . . . . . 1 b b b f f . . . . . . .
        . . . . . . . . . . f 1 b b b 1 f . . . . . . .
        . . . . . . . . . f 1 b b 1 b f . . . . . . . .
        . . . . . . . . . . f e e b b b . . . . . . . .
        . . . . . . . . . f 1 3 3 b b b f . . . . . . .
        . . . . . . . . f b 4 4 4 b b 1 b b b . . . . .
        . . . . . . . . 1 f 4 4 b b 1 b b b b f . . . .
        . . . . . . . . 1 b 4 4 f b b b 1 b b b f . . .
        . . . . . 1 1 f 1 b 1 1 b b b b b b b b b f . .
        . . . . f 2 b b b b 1 b b b b b b b 1 b b f . .
        . . . f b f b b b b b b 1 b b b 1 b b f f f . .
        . . . f 1 f b b f 4 4 f b b b 1 b b b f f f . .
        . . . . f 2 b f b 4 5 b 5 4 b 1 1 b b f f f . .
        . . . f 2 2 f . b b f b b b b f b f f f f f f .
        . . . f 2 f . . b b b b b b b b f f f f f f f .
        . . . f 2 f . f 1 b 1 f b b b b f f f f f f . .
        . f 1 2 2 f . f 5 4 2 f f 2 5 4 f f f f f . . .
        . f 1 1 1 b f 2 4 2 2 f f 2 2 5 f f f . . . . .
        . f b 1 1 b 2 2 2 2 2 f f 2 2 2 2 f f . . . . .
        . . f f f f f f f f f f f f f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "angel") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . f f . . . . . . . . . . .
        . . . . f 1 1 f . . f 5 5 5 5 . f 1 1 f . . . .
        . . . . 1 9 1 9 f f 5 3 3 5 5 f 9 1 9 1 . . . .
        . . . f 1 1 1 1 1 f 5 3 3 5 4 1 1 1 1 1 1 f . .
        . . f 1 b b b b b b 4 3 3 4 b b b b b b 9 f . .
        . . f 9 1 1 1 b b 1 1 2 2 1 1 b b 1 1 1 9 1 . .
        . . 1 1 9 1 b 9 b 1 1 2 2 1 1 b 9 b 1 9 9 1 f .
        . . 1 1 9 1 9 b b 1 1 2 2 1 1 b b 9 1 9 1 1 f .
        . . 1 9 1 1 b b b b 2 2 2 2 b b b b 1 1 9 1 f .
        . . 1 1 1 b b b f b 1 2 2 1 b f b b b 1 1 9 f .
        . . 9 1 d 5 b f f c 4 5 5 4 b f f b b b 1 9 f .
        . . 9 1 d 5 5 f f b 1 5 5 1 b f f f b b 1 1 f .
        . f 9 1 f f f f 9 b 1 2 2 1 b b 9 f 5 5 1 1 f .
        . f 1 1 f . . f b b 1 2 2 1 b b 9 f 5 d 1 1 f .
        . f 1 f . . . f f 1 1 2 2 1 c b b f f 9 1 1 f .
        . f 1 f . . . f b 1 1 2 1 1 b b b f f 1 9 1 . .
        . . f . . . . f 9 1 1 2 1 1 b 9 f . . f 1 1 . .
        . . . . . . . f b b c 2 1 1 b b f . f f 1 1 f .
        . . . . . . f 9 9 c c f f c b b f f f f 1 f f .
        . . . . . . f f f . . . . c b b f f f f f . . .
        . . . . . . . . . . . . . b b 9 b f f f . . . .
        . . . . . . . . . . . . . . f f f f . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "elf-archer") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . 7 . 1 . . . . . . . . . .
        . . . . . . . . 7 . 7 7 7 7 . . . . . . . . . .
        . . . . . . . . . 7 7 7 7 1 . . . . . . . . . .
        . . . . . . . . . 1 1 1 1 1 . . . . . . . . . .
        . . . . . . . . . 1 1 3 1 1 . e . . . . . . . .
        . . . . . . . . . 1 3 3 1 1 4 . e . . . . . . .
        . . . . . . . . 7 1 f f 1 1 e . . . . . . . . .
        . . . . . . . 7 f 1 f f 1 7 7 . . . . . . . . .
        . . . . . . . 7 6 f f 7 7 f 7 . . . . . . . . .
        . . . . . . . c . 6 7 7 f 6 8 7 . . . . . . . .
        . . . . . . 8 c . . f f 6 . c c . . . . . . . .
        . . . . 3 6 6 . . f 6 6 6 3 6 . . . . . . . . .
        . . . . 3 . . . . 6 f f f 3 . . . . . . . . . .
        . . . . . . . . 6 6 f 6 6 6 . . . . . . . . . .
        . . . . . . . . 6 6 6 6 6 6 . . . . . . . . . .
        . . . . . . . . f f . . e f . . . . . . . . . .
        . . . . . . . e f f . . . e f f f f f f . . . .
        . . . . . . . e f f . . . f f f f f f f . . . .
        . . . . . . . e e f . f f f e f f f f . . . . .
        . . . . . . . e e f f f f f e e f f f . . . . .
        . . . . . . e e f f f f f f e e e f f . . . . .
        . . . . . . f f f f f f f f f f f . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "mummy") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . f . . . . . . . . . . .
        . . . . . . . . . f f 3 f . . . . . . . . . . .
        . . . . . . . . . b 3 f . . . . . . . . . . . .
        . . . . . . . . . d b d f . f . . . . . . . . .
        . . . . . . . . f d 3 3 f 3 f . . . . . . . . .
        . . . . . . . f f b e f . f . . . . . . . . . .
        . . . . . . f 3 b 3 3 3 f . . . . . . . . . . .
        . . . . . f b d b b b 3 e f 3 f . . . . . . . .
        . . . . . f d b b 3 3 3 3 3 f . . . . . . . . .
        . . . . . f 3 d b 3 d d d f . . . . . . . . . .
        . . . . . 3 d b b 3 d b d f . . . . . . . . . .
        . . . . . 3 d b 3 d b f 3 3 . . . . . . . . . .
        . . . . . d d b 3 d b f 3 d . . . . . . . . . .
        . . . . f b f d d b d f 3 b . . . . . . . . . .
        . . . . f d f b d b 3 f b 3 f . . . . . . . . .
        . . . . f f f d 3 f b f f b f f f f f . . . . .
        . . . . . 3 f 3 3 3 3 f f f f f f f f . . . . .
        . . . . . f f d 3 d d f f 3 f f f f . . . . . .
        . . . . . . f 3 d f f d f f f f f . . . . . . .
        . . . . . . f d 3 f f d b f f f . . . . . . . .
        . . . . . f b b d f f b d f f . . . . . . . . .
        . . . . . f f f f . f f f f . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "scythe-reaper") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . f . . . . . . . . . . . . .
        . . . . . . . . . f c b b c f . . . . . . . . .
        . . . . . . . . . f c b b c c . . . . . . . . .
        . f f . . . . . f f 9 f 9 c f . . . . . . . . .
        . f 2 f . . . . f f b 9 b c c . . . . . . . . .
        . . f 2 9 f . . f b f 1 f c b f . . . . . . . .
        . . . f 1 1 . . f b c f c c c f f . . . . . . .
        . . . f 9 2 f . f c c c c c c c c f . . . . . .
        . . . . f b 2 2 2 f b f b b f f c c c c f . . .
        . . . . f 9 f 2 2 f f f f b b f f f f f c f . .
        . . . . . f b b f 2 2 f b b f f f b b f f f . .
        . . . . . f b f f f f 2 2 f f f f 9 f f f . . .
        . . f f c c f f f f f f b 2 f 1 b c c f f f . .
        . . f c f f f f f f f b b 2 9 b f c c f . . . .
        . . f f f f f f . f b f f f f 2 2 2 c c f f . .
        . . f . f . f . f f 1 f f f b f 2 2 f f f f . .
        . . . . . . . . f 9 1 f f f f f f f 2 f f f f .
        . . . . . . . . f b 1 f . f f 1 9 f f 2 2 3 . .
        . . . . . . . . . f 9 f f f f f b b 3 3 2 2 . .
        . . . . . f 3 1 1 1 1 1 1 1 1 1 3 3 b f . . . .
        . . . . f f f f 3 3 3 3 1 1 1 3 f f b 9 f f f .
        . . . . . . . f f f f f f f f f f f f f . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "executioner") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . f f f . . . . f f f f . . . . . .
        . . . . . f e b b b e . . 3 f 1 1 3 3 3 . . . .
        . . . . f e b d d f f f f f f f f 1 3 3 f . . .
        . . . f b d f . . b 1 b b b b f b e 1 3 3 f . .
        . . f e d f . . f 1 b b b b b f f d e 1 3 f . .
        . . e f f f . f f 2 f f f f b f . . d e 3 3 . .
        . f f . 1 1 f f f f b b f 1 b f . . f d 3 3 . .
        . . . . 1 1 1 f f 1 1 b 1 b b f f f . f 1 3 . .
        . . . f 1 f b b f b f f b b b f f f f 1 d e f .
        . . . f 1 f f f b b b b b b b f f f 1 1 f d f .
        . . . f b f . . . f f e f b f f f f 1 f f f f .
        . . f 1 f f . . . f b f f b f 1 f 1 b f f f . .
        . f f 1 f f . . . f 1 f f f . b 1 b . . f e . .
        . f f 1 f . . . . f 1 f f f . f b f . . b e . .
        . . 1 1 b b d d f 1 1 f f f . . f 3 f d f . . .
        . . 3 3 e e b b d 1 b d b e f . . f 3 e . . . .
        . . 3 3 f f e e e 1 b e e f . . f f 3 3 . . . .
        . . f 3 3 1 f f f b f f f f b d e e 3 f . . . .
        . . . f 3 1 f f 1 b f f f e e e f 1 3 f . . . .
        . . . f f 3 1 f f 1 3 1 f f 1 1 3 3 f f f f . .
        . . f f f f 3 3 3 3 1 1 1 3 3 3 3 f f f f . . .
        . . . . f f f f f f f f f f f f f f f . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "wizard") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . a a a . . . . . . . . . . . .
        . . . . . . . . 8 a a . . . . . . . . . . . . .
        . . . . . . a a a a a a a a a . . . . . . . . .
        . . . . . . . 8 a a a 8 c . . . . . . . . . . .
        . . . . . . . . . 3 1 e . . . . . . . . . . . .
        . . . . . . . . . 1 3 3 . . . . . . . . . . . .
        . . . . . . . . . a a a 8 8 . . . . . . . . . .
        . . . . . . . . a a a a a a a . . . . . . . . .
        . . . . . . . . a a a a 8 a a . . . . . . . . .
        . . . . . . a a 8 a 8 a 1 1 a 8 . . . . . . . .
        . . . . 3 d a 8 . a c c 2 2 2 8 . . . . . . . .
        . . . . 3 d 8 . . a c c 2 3 d . . . . . . . . .
        . . . . . . . . . 8 8 c 2 3 d . . . . . . . . .
        . . . . . . . . . a a a 8 8 . . . . . . . . . .
        . . . . . . . . 8 a a a 8 8 f f f f . . . . . .
        . . . . . . . . 8 8 a a a a a f f f f . . . . .
        . . . . . . . . 8 c a a a 8 a f f f f f . . . .
        . . . . . . . . 8 c a a a 8 a f f f f . . . . .
        . . . . . . . . 8 8 8 a a 8 8 f f f . . . . . .
        . . . . . . . 8 c a c a a a c a f f . . . . . .
        . . . . . . . . 2 8 c 8 c 2 2 . . . . . . . . .
        . . . . . . . 2 2 . . . . 2 2 . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        if (artKey == "elf-mage") return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . 1 1 1 1 . . . . . . . . . .
        . . . . . . . . . 1 1 1 3 1 1 . . . . . . . . .
        . . . . . . . . 1 1 2 1 2 1 1 . . . . . 3 . . .
        . . . . . . . . . 1 1 1 d 1 1 . . . . . 3 . . .
        . . . . . . . . . 1 1 3 b 1 1 . 2 2 2 e e . . .
        . . . . . . . 2 2 1 1 2 2 1 1 2 2 2 2 e e . . .
        . . . . . . 2 2 2 1 2 2 2 1 2 2 2 2 2 e e . . .
        . . . . 2 2 2 2 e e 2 2 2 2 2 2 2 2 e e e . . .
        . . 3 2 2 2 2 2 e e 2 2 2 2 2 2 2 2 e e . . . .
        . . d 2 2 2 2 e e 2 2 2 2 e e e 2 2 e e f . . .
        . . . . 2 2 2 e . 2 2 2 2 e 2 f e 2 e e f f . .
        . . . . 2 e e . . e 2 2 e e e f f 2 e f f f . .
        . . . . . e . . . 2 e e e 2 2 f f f e f f . . .
        . . . . . e . . . 2 e 2 2 2 e f f f f f f . . .
        . . . . . . . . . 2 e 2 2 2 e f f f f f . . . .
        . . . . . . . . 2 2 2 2 2 2 2 e f f f f . . . .
        . . . . . . . . 2 2 2 2 2 2 2 e f f f . . . . .
        . . . . . . . 2 2 2 2 2 2 2 2 e f f f . . . . .
        . . . . . . . 2 2 2 2 2 2 2 e e e f . . . . . .
        . . . . . . f 2 2 2 2 2 2 2 e e e f . . . . . .
        . . . . . . f f 2 2 2 2 2 2 e f f . . . . . . .
        . . . . . . . . . f f f f f f . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . b . . . . . . .
        . . . . . . . . . . . . . b b b b b b . . . . .
        . . . . . . . . . . . . b b . b b b b b . . . .
        . . . . . . . . . . . . . . . . . b b b b . . .
        . . . . . . . . . . . . . . . . . . . b b f f .
        . . . . . . . . . . . . . . . b b . b b b f f .
        . . . . . . . . . . . . . b b b b b b f f f f .
        . . . . . . . . . . . . b b b b b b b f f f f .
        . . . . . . . . . . . b b b b b b b b f f f f .
        . . . . . . . b b b b b b b b b b b b b f f f .
        . . . . . . b b b b b b b b b b b b b b f f f .
        . . . . b . b b b b b b b b b f b b b b f f . .
        . . . . b b b b b b b b b b f f f b b b b f . .
        . . . b b b b b b b b b f f f f f f f b b f . .
        . . . b b b b b 1 b b b f f f f f f b b f f . .
        . . 1 f b b b 1 b b b b f f f . f f b f f . . .
        . . 1 1 1 1 b 1 b f b b f f . . . . . . . . . .
        . . 1 1 1 b b b f f b b f f . . . . . . . . . .
        . b 1 b 2 b b f f f b b f . . . . . . . . . . .
        . b 2 2 b b f f f b b f f . . . . . . . . . . .
        . . b b b f f f b b b f . . . . . . . . . . . .
        . . . . . . . . f f f . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . .
    `;
    }
    export function portrait(artKey: string, side: apocTypes.Side): Image {
        if (artKey == "A-Blade") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b b b . . . .
        . . . . . . . . b . b b b . . .
        . . . . . . . . . . . . b b . .
        . . . . . . . . . . b . b b f .
        . . . . . . . . . b b b b f f .
        . . . . . . b b b b b b b f f .
        . . . . b b b b b b b b b f f .
        . . . b b b b b b b b b b f f .
        . . . b b b b b b f f f b b f .
        . . f b b 1 b b f f f f b f . .
        . . 1 1 b 1 f b f . . . . . . .
        . 1 1 b b f b b f . . . . . . .
        . 2 2 b f f b f f . . . . . . .
        . f f f . f b f . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Guardian") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . b b b . . . . . . .
        . . . b . . b b b . b b . . . .
        . . b b b b b f b b b b b . . .
        . . b b b f b b b b b b b . . .
        . . b f b b b 1 b b b 9 b . . .
        . . 9 b . . b b b b . b b . . .
        . f 1 b . . f b f b . b b b . .
        . b 1 f . . f f b b . b 1 b . .
        . b b b b . b b f b b b 1 b f .
        . b 1 b b b b b f f f b b b f .
        . 9 9 b b b b b f f b b 1 b b .
        . 1 b b f b b b f f b b b b b .
        . . . f f b b b . . b b b b . .
        . . . . . b b f . . . f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Medic") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . f 2 2 2 f . . . . . .
        . . . . . 2 4 4 2 2 e . . . . .
        . . . . 2 4 2 2 2 4 2 e . . . .
        . . . f 2 2 2 4 2 2 2 2 f . . .
        . . . 2 2 2 2 e 2 2 4 2 e . . .
        . . f 2 e e f f 2 e 2 2 4 e . .
        . . 2 2 2 f e e f f f 2 2 2 e .
        . 2 2 2 f 2 2 f 2 4 2 2 f 2 f .
        . f f . . 2 2 e f 2 f 2 f . . .
        . . . . . f f e . . . . f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Ranger") return img`
        . . . . . . . . . . . . . . . .
        . d d f . . . . . . . . f d d .
        . . b d f . . . . . . . d b . .
        . . f d d . . . . . . e d f . .
        . . f f f . . f f . . f f f . .
        . . f b d f f f d . f d b f . .
        . . f d b e b b f f b d d f . .
        . . f e d b b b f f d d e f . .
        . . . f b f e f b f e b . . . .
        . . . . e f e f b f f f . . . .
        . . . . f . f f f . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . f f f f f f f f . . . .
        . . . . . . f f f f . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Harvester") return img`
        . . . . . . . . . . . . . . . .
        . . . . . f b b . . . . . . . .
        . . . . . b 3 b . . . . . . . .
        . . . . . f 1 3 f . . . . . . .
        . . . . . f 3 e f . . . . . . .
        . . . . f 1 3 1 3 f . . . . . .
        . . . . 1 3 d 3 3 3 . 7 f . . .
        . . . f 3 1 1 3 3 3 f . 7 f . .
        . . 1 3 f 3 3 3 f d f . 7 f . .
        . . 3 f . 7 3 7 f 3 f 7 6 . . .
        . . . . . 7 7 7 f 3 f 7 . . . .
        . . . . f 7 7 7 . . 7 6 f . . .
        . . . . f 7 7 7 f f 7 6 f f . .
        . . . . . 7 7 7 7 7 7 f f f . .
        . . . . . f 7 6 7 6 f f f f . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Reaper") return img`
        . . . . . . . . . . . . . . . .
        . 8 8 . . . . a a 8 . . . . . .
        . 8 8 8 . . 8 1 1 8 . . . . . .
        . 1 1 8 . . 8 8 a 8 . . . . . .
        . 8 8 . . . 8 1 a 8 8 . . . . .
        . . a . . 8 8 8 a 8 8 8 . . . .
        . . 1 8 a 8 8 8 a a 8 a 8 . . .
        . 8 1 8 a 8 8 a a a 8 8 8 8 . .
        . . 1 8 8 8 8 8 8 8 . 8 8 8 . .
        . . 1 8 8 . 8 8 8 a . 8 8 . . .
        . . 8 8 8 . 8 8 a a . 8 . . . .
        . . 8 8 8 . 8 a a a 8 . . . . .
        . . 8 8 . 8 8 8 a 8 8 8 8 8 . .
        . . . a . . 8 8 8 8 8 8 8 . . .
        . . . a 8 8 a 8 8 8 a 8 . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Executioner") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . b b b . . . . . . .
        . . . b . . b b b . b b . . . .
        . . b b f b f f b b b b b . . .
        . . b b b b b b b b b b b . . .
        . . b f b b 1 b b b b b f . . .
        . . b f . . 1 b b b . f b . . .
        . b 1 f . . b f f b . f b b . .
        . b b f . . b f f b . f 1 b . .
        . b b b f . 1 b f b b f 1 b f .
        . b b b f b b f f f f b b b b .
        . b b b f b b f f f b b b d b .
        . b b b f b b f f f f b b b b .
        . . f f f b b f f f f b b e f .
        . . . . . b b f . . f f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Enchanter") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . f a f f f . . .
        . . . . . . . f 6 6 6 a 6 f . .
        . . . f . 6 f a 6 9 9 6 a f . .
        . f . f f 6 f 6 a a 2 9 6 f f .
        . f 6 f 6 f f 6 6 9 9 a 6 a f .
        . . . . . f f f 6 6 a 6 6 f f .
        . . . f f b f f 6 6 6 6 a f f .
        . f f . . f b f 6 f f f f f f .
        . f f . f f b f f f f f 6 f . .
        . . f . . 6 f f f f 6 f 6 . . .
        . . . . . . f f f f f f f f . .
        . . . . . 6 f . f f f f . f . .
        . . . . . . . . . 6 . f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "A-Venomist") return img`
        . . . . . . . . . . . . . . . .
        . b b d . . e d . . . . . b b .
        . d d . . . d d d . . . d b b .
        . b . . . . d d b . . . . d b .
        . e b . 6 6 . e d . 6 6 . d . .
        . e d d 6 6 b b b b d b e e d .
        . . e d 6 b b b 6 e d b d b . .
        . . . e . e e e 6 . b . . e . .
        . . . . b e b e 6 b . . . . . .
        . . . . b b d d 6 b . . . . . .
        . . . . b d . . d b f f f . . .
        . . . . e . . . f b b f f . . .
        . . . . b e f f f d b f . . . .
        . . . . . d f f f e d f . . . .
        . . . e d b f . f e d . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Raider") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . f 3 3 . . . . . . .
        . . . . . f d 3 3 d f f . . . .
        . . . . . d f 3 f d d f . . . .
        . . . . . . 2 2 d e . . . . . .
        . . . . . f b e e b f . . . . .
        . . . . . d b f f b d f . . . .
        . . . . f e b f f b e e . . . .
        . . d d b f e 1 2 e . b e . . .
        . . d e f f f b b f f e e . . .
        . . . . . f f b b f f . . . . .
        . . . . . f b b b f f f f f . .
        . . . . . e e f f e e f f f . .
        . . . . . e f f f e e f . . . .
        . . . . f e f . . f e f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Decoy") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . f . . . . . . . .
        . . . . f . e e e . f . . . . .
        . . . . 2 c e e 2 c 2 . . . . .
        . . . . f e e c 5 e f . . . . .
        . . . . . f e 2 2 f f . . . . .
        . . . . e c b b 2 c e e . . . .
        . . . f 2 e c f e e 2 2 f . . .
        . . f e 2 f f f f f f e e . . .
        . f e e f f 2 f f 2 . f e f . .
        . . f . . f b b b b f f 2 f . .
        . . . . . c c b f f f f . . . .
        . . . . . 2 2 f f 2 f f f f . .
        . . . . . 2 2 f f e f f f . . .
        . . . . f f f . . f f . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Plague") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . f d f . . .
        . . . . . . . . . 5 e f e 5 . .
        . . . . . . . . . f e . f e f .
        . . . . . . . . . . f f . 4 e .
        . . . . . . . f . . . . . d f .
        . . . . . 7 f f f . . . f e f .
        . . . f f 7 f f 7 . . . 5 f . .
        . . d 5 . f f 7 d f 5 e f f f .
        . f 5 e e f 5 e 5 d e e f f f .
        . 4 e e 5 5 d d e e e f 7 f . .
        . e f e f e e e e f 7 f 5 . . .
        . . f e d f d . f f f f 7 . . .
        . . f e e 4 e . f f f f f . . .
        . . f e e e . . . 7 . f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Boss") return img`
        . . . . . . . . . . . . . . . .
        . 6 6 . . . . 1 . 1 6 6 2 2 2 .
        . . 2 2 2 2 2 . . 6 6 2 2 2 . .
        . . 2 2 2 2 7 6 . 6 2 2 6 2 . .
        . . 6 2 7 7 7 7 . 6 2 2 2 6 . .
        . . . 2 7 6 7 7 6 7 2 2 . . . .
        . . . 1 7 1 2 7 7 6 7 2 . . . .
        . . . . 7 7 6 6 7 6 6 6 7 . . .
        . . . 6 7 7 7 6 7 7 6 6 . 7 . .
        . . 6 6 6 6 7 6 7 7 6 f f 1 1 .
        . 1 6 1 . . . 6 7 7 7 6 6 f 6 .
        . . 1 . . . 7 6 7 7 6 6 6 6 f .
        . . . . . 6 6 6 f f 6 6 7 f . .
        . . . . . 6 6 f f f f 6 6 6 f .
        . . . 9 f 6 6 f . . f 6 6 f 9 .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-King") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . 3 3 3 . . . . . . .
        . . . 3 3 3 3 3 2 d 3 3 . . . .
        . . . . . 1 3 1 3 d . . . . . .
        . . . 2 . 2 d d 2 e 2 . 2 . . .
        . . . 2 2 f 2 2 2 2 e e 2 . . .
        . . 2 2 e e e 2 e 2 e 2 2 2 . .
        . . . 3 e . 2 e e e . f b . . .
        . . b b f 2 2 2 d 2 f f d f . .
        . . 3 f 2 e e 2 2 e 2 e d f . .
        . . e . 2 2 2 e 2 e 2 f f f . .
        . . . . 2 3 f 2 f f 3 f f f . .
        . . . . 2 2 f f f f 2 2 f f . .
        . . . . 2 2 f f f f 2 2 f f . .
        . . . . 2 2 f f f f 2 2 f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Wisp") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 9 9 9 9 9 . . . .
        . . 9 9 9 9 9 9 9 9 9 9 9 9 9 .
        . . . . 9 9 9 9 . . . . . . . .
        . . . . . . . 9 9 . . . 9 9 9 .
        . . . 9 9 9 9 9 . . . . . . . .
        . . . . . . . . 9 9 . . . . . .
        . 9 9 9 . . . . 9 9 9 . . . . .
        . . . . . . 9 9 . . . . . . . .
        . . . . . c c c . 9 9 9 9 9 . .
        . . . . . . . . c . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Small") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . e e e e e 3 3 . . .
        . . . . . e e e e e e e f 3 . .
        . . . . e 2 e e e e e f f 3 f .
        . . 2 e e e e e e e e f f d f .
        . . d e 3 e e e e e e f f d f .
        . . e e e e e e e e f f . e . .
        . e e 1 e f f e f d f . 3 f . .
        . e e f f d f f . . . 3 e f . .
        . f f f . f . . . . f f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "E-Shaman") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . f . f . . . . . .
        . . . . . . . f f f . . . . . .
        . . . . . . f 8 8 f . . . . . .
        . . . . . . f c f f c . . . . .
        . . . . . . f b 2 f e 4 . . . .
        . . . . . f e f 4 4 f e f . . .
        . . . . . 4 f 4 4 e . f e . . .
        . . . e 8 f f e 5 4 f 4 8 . . .
        . . . f . . 5 5 5 5 f e f . . .
        . . . . . . 1 4 4 4 f . . . . .
        . . . . . . 1 1 4 4 f . . . . .
        . . . . . . e f f e e f f . . .
        . . . . . . 8 f f f c f f . . .
        . . . . . 4 e f . f e f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "bat") return img`
        . . . . . . . . . . . . . . . .
        . d d f . . . . . . . . f d d .
        . . b d f . . . . . . . d b . .
        . . f d d . . . . . . e d f . .
        . . f f f . . f f . . f f f . .
        . . f b d f f f d . f d b f . .
        . . f d b e b b f f b d d f . .
        . . f e d b b b f f d d e f . .
        . . . f b f e f b f e b . . . .
        . . . . e f e f b f f f . . . .
        . . . . f . f f f . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . f f f f f f f f . . . .
        . . . . . . f f f f . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "wolf") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b b b . . . .
        . . . . . . . . b . b b b . . .
        . . . . . . . . . . . . b b . .
        . . . . . . . . . . b . b b f .
        . . . . . . . . . b b b b f f .
        . . . . . . b b b b b b b f f .
        . . . . b b b b b b b b b f f .
        . . . b b b b b b b b b b f f .
        . . . b b b b b b f f f b b f .
        . . f b b 1 b b f f f f b f . .
        . . 1 1 b 1 f b f . . . . . . .
        . 1 1 b b f b b f . . . . . . .
        . 2 2 b f f b f f . . . . . . .
        . f f f . f b f . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "jelly") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . f 2 2 2 f . . . . . .
        . . . . . 2 4 4 2 2 e . . . . .
        . . . . 2 4 2 2 2 4 2 e . . . .
        . . . f 2 2 2 4 2 2 2 2 f . . .
        . . . 2 2 2 2 e 2 2 4 2 e . . .
        . . f 2 e e f f 2 e 2 2 4 e . .
        . . 2 2 2 f e e f f f 2 2 2 e .
        . 2 2 2 f 2 2 f 2 4 2 2 f 2 f .
        . f f . . 2 2 e f 2 f 2 f . . .
        . . . . . f f e . . . . f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "skeleton") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . f f . . . . . . . .
        . . . . . 1 1 b . . . . . . . .
        . . . . . b b 1 f . . . . . . .
        . . . . . f 1 f 9 . . . . . . .
        . . . . . . . c c b b f . . . .
        . . . . . f f 1 1 9 b b . . . .
        . . . . f b b 1 1 b f 9 f . . .
        . . . . 1 f . f 1 b f f f . . .
        . . . . f . f b b f . 1 . . . .
        . . . . . . f b 1 f . 1 . . . .
        . . . . . f 1 f f 9 f . . . . .
        . . . . . f 1 f f 1 f f . . . .
        . . . . . f f f f f 1 f . . . .
        . . . . . f f f f f . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "lich") return img`
        . . . . . . . . . . . . . . . .
        . f f . . . . b b f . . . . . .
        . f f f . . f 1 1 f . . . . . .
        . 1 1 f . . f f b f . . . . . .
        . f f . . . f 1 b f f . . . . .
        . . b . . f f f b f f f . . . .
        . . 1 f b f f f b b f b f . . .
        . f 1 f b f f b b b f f f f . .
        . . 1 f f f f f f f . f f f . .
        . . 1 f f . f f f b . f f . . .
        . . f f f . f f b b . f . . . .
        . . f f f . f b b b f . . . . .
        . . f f . f f f b f f f f f . .
        . . . b . . f f f f f f f . . .
        . . . b f f b f f f b f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "zombie") return img`
        . . . . . . . . . . . . . . . .
        . . . . d d . . d . . . . . . .
        . . . . . d d d b . . . . . . .
        . . . . . 2 d d f . . . . . . .
        . . . . . d d d d 1 . . . . . .
        . . . . . . d d b b . . . . . .
        . . . . . 7 d d e . . . . . . .
        . . . . 7 2 b 7 2 d . . . . . .
        . . . . e 2 d e f b d . . . . .
        . . . 7 7 e b e f f b f f . . .
        . . . 7 e e 2 e f f f f f . . .
        . . . d b f e d f f f f . . . .
        . . . d d f f 2 f f f . . . . .
        . . . d e f f d b . . . . . . .
        . . . f 2 f . f f . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "ogre") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . 3 1 f . . . . . . .
        . . . . . f 3 3 3 . . . . . . .
        . . . . . 3 3 3 3 f . . . . . .
        . . . . f 2 2 2 3 e . . . . . .
        . . 3 3 d e e e d e 3 3 f . . .
        . 3 3 3 e 3 3 3 3 3 d 3 3 f . .
        . 3 3 f e d d 3 d d f f 3 d . .
        . . d 3 e 3 3 3 3 3 f e 3 f . .
        . . f d d e d f d e f 3 e . . .
        . . . f 4 e 2 2 2 e 4 e f . . .
        . . . e d 4 4 4 4 4 e f f f . .
        . . . f 3 d e f e 3 3 f f . . .
        . . . e 3 e f f e 3 f f . . . .
        . . . d d f . . f e d f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "troll") return img`
        . . . . . . . . . . . . . . . .
        . . . . 7 7 7 e e . . . . . . .
        . . . . 2 7 2 7 e 7 7 . . . . .
        . . . e 7 2 7 7 e e 7 7 7 . . .
        . . . 7 e 7 7 e e 7 7 7 7 7 . .
        . . . . 7 . 7 7 7 7 7 7 7 7 . .
        . . . . 7 . 7 7 7 7 7 . 7 7 . .
        . . . . 7 . . 7 7 7 7 . . 7 7 .
        . . . . 7 7 . 7 7 7 7 . f 7 7 .
        . . . 7 7 7 . 7 7 . 7 f f 7 7 .
        . . 7 7 . . 7 7 7 f 7 7 f 7 7 .
        . 7 7 7 . . 7 7 7 f 7 7 f f f .
        . . . . . . 7 f f f 7 7 f f . .
        . . . . . f 7 f f f 7 7 7 . . .
        . . . . f 7 7 f . f 7 7 f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "stone-golem") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . b b b . . . . . . .
        . . . b . . b b b . b b . . . .
        . . b b b b b f b b b b b . . .
        . . b b b f b b b b b b b . . .
        . . b f b b b 1 b b b 9 b . . .
        . . 9 b . . b b b b . b b . . .
        . f 1 b . . f b f b . b b b . .
        . b 1 f . . f f b b . b 1 b . .
        . b b b b . b b f b b b 1 b f .
        . b 1 b b b b b f f f b b b f .
        . 9 9 b b b b b f f b b 1 b b .
        . 1 b b f b b b f f b b b b b .
        . . . f f b b b . . b b b b . .
        . . . . . b b f . . . f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "iron-golem") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . b b b . . . . . . .
        . . . b . . b b b . b b . . . .
        . . b b f b f f b b b b b . . .
        . . b b b b b b b b b b b . . .
        . . b f b b 1 b b b b b f . . .
        . . b f . . 1 b b b . f b . . .
        . b 1 f . . b f f b . f b b . .
        . b b f . . b f f b . f 1 b . .
        . b b b f . 1 b f b b f 1 b f .
        . b b b f b b f f f f b b b b .
        . b b b f b b f f f b b b d b .
        . b b b f b b f f f f b b b b .
        . . f f f b b f f f f b b e f .
        . . . . . b b f . . f f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "naga") return img`
        . . . . . . . . . . . . . . . .
        . . . . . f b b . . . . . . . .
        . . . . . b 3 b . . . . . . . .
        . . . . . f 1 3 f . . . . . . .
        . . . . . f 3 e f . . . . . . .
        . . . . f 1 3 1 3 f . . . . . .
        . . . . 1 3 d 3 3 3 . 7 f . . .
        . . . f 3 1 1 3 3 3 f . 7 f . .
        . . 1 3 f 3 3 3 f d f . 7 f . .
        . . 3 f . 7 3 7 f 3 f 7 6 . . .
        . . . . . 7 7 7 f 3 f 7 . . . .
        . . . . f 7 7 7 . . 7 6 f . . .
        . . . . f 7 7 7 f f 7 6 f f . .
        . . . . . 7 7 7 7 7 7 f f f . .
        . . . . . f 7 6 7 6 f f f f . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "minotaur") return img`
        . . . . . . . . . . . . . . . .
        . . . . 1 1 1 2 2 2 . . . . . .
        . . . 1 3 3 b 5 2 5 1 1 1 . . .
        . . 3 3 1 3 2 2 2 e e b 1 1 . .
        . . 3 3 3 3 2 2 e e 3 3 3 b . .
        . . 3 3 3 3 3 3 3 3 3 3 3 3 . .
        . . . 3 3 3 3 3 3 3 3 3 3 3 . .
        . . . . . 3 3 3 d d 3 3 3 d . .
        . . . . . e 2 2 d 3 3 3 d f . .
        . . . . . 2 2 2 e 2 d d d f . .
        . . . . . 2 e e 2 2 2 f f . . .
        . . . . . e e f e 2 2 f f . . .
        . . . . . b f f f e e f . . . .
        . . . . . 1 f f f e f f . . . .
        . . . . . . . . . 9 9 f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "orb-spider") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . f a f f f . . .
        . . . . . . . f 6 6 6 a 6 f . .
        . . . f . 6 f a 6 9 9 6 a f . .
        . f . f f 6 f 6 a a 2 9 6 f f .
        . f 6 f 6 f f 6 6 9 9 a 6 a f .
        . . . . . f f f 6 6 a 6 6 f f .
        . . . f f b f f 6 6 6 6 a f f .
        . f f . . f b f 6 f f f f f f .
        . f f . f f b f f f f f 6 f . .
        . . f . . 6 f f f f 6 f 6 . . .
        . . . . . . f f f f f f f f . .
        . . . . . 6 f . f f f f . f . .
        . . . . . . . . . 6 . f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "earth-elemental") return img`
        . . . . . . . . . . . . . . . .
        . b b d . . e d . . . . . b b .
        . d d . . . d d d . . . d b b .
        . b . . . . d d b . . . . d b .
        . e b . 6 6 . e d . 6 6 . d . .
        . e d d 6 6 b b b b d b e e d .
        . . e d 6 b b b 6 e d b d b . .
        . . . e . e e e 6 . b . . e . .
        . . . . b e b e 6 b . . . . . .
        . . . . b b d d 6 b . . . . . .
        . . . . b d . . d b f f f . . .
        . . . . e . . . f b b f f . . .
        . . . . b e f f f d b f . . . .
        . . . . . d f f f e d f . . . .
        . . . e d b f . f e d . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "elf-knight") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . 1 1 1 . . . . . .
        . . . . . . f 1 1 1 . . . . . .
        . . . . . . f 1 3 1 . . . . . .
        . . . . . . f 1 d 1 f f . . . .
        . . . . 1 b b b b b b b 1 . . .
        . . . . f b b b b b f b f . . .
        . . . . f 1 b b b b f b b . . .
        . . f b b f f b b b f b b f . .
        . . b b f . b f b f b b f . . .
        . . . f . . b b f b f f f f . .
        . . . . . . b b f b b f f f . .
        . . . . . . 1 b f b b f f f . .
        . . . . . f b f f f b f f . . .
        . . . . . b b f . f b b . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "dwarf") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . 1 . . . . . . .
        . . . . . . . f b b 1 . . . . .
        . . . . . . . 5 5 4 f . . . . .
        . . . . . . . 3 1 b f . . . . .
        . . . . . . f 4 b b 1 f . . . .
        . . . . . f f 4 f 1 1 b b . . .
        . . . . f b 1 4 1 b b 1 b b . .
        . . f 1 b b 1 b b b b b b f . .
        . . f b b f 4 4 b b b b f f . .
        . . . 2 f f 4 4 b f b b f f f .
        . . f 2 . f b f b b f f f f f .
        . f 2 2 . b b f b b b f f f . .
        . 1 1 1 f 5 2 2 2 2 4 f f . . .
        . f 1 b 2 e e f f e e f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "angel") return img`
        . . . . . . . . . . . . . . . .
        . . . . f . . f 5 f . f . . . .
        . . . 1 1 f f 5 5 5 f 1 1 . . .
        . . f 1 1 1 f 3 3 4 1 1 1 1 . .
        . . 1 1 b 9 b b b b 9 b 1 1 f .
        . f 1 9 b b 1 1 1 1 b 9 9 1 1 .
        . f 9 1 b b b 2 2 b b b 1 9 1 .
        . f 1 1 b f b 1 1 b f b 1 1 1 .
        . 1 1 1 5 b b 1 1 b b f 5 1 1 .
        . 9 1 f . b b 1 1 b b f d 1 9 .
        . 1 f . . f 1 2 1 c b f 9 1 1 .
        . f . . . 9 1 2 1 b 9 . f 1 f .
        . . . . . 9 c f f b b f f 1 f .
        . . . . . f . . f b b f f f . .
        . . . . . . . . . c b f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "elf-archer") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . 7 1 7 . . . . . .
        . . . . . . 7 7 7 . . . . . . .
        . . . . . 1 2 2 1 1 e . . . . .
        . . . . . . 1 3 1 . e . . . . .
        . . . . . . 1 f 1 7 . . . . . .
        . . . . . 6 7 7 7 7 . . . . . .
        . . . . 8 c 6 f 6 c . . . . . .
        . . . 3 6 . 6 6 6 3 . . . . . .
        . . . . . . 6 f 6 . . . . . . .
        . . . . . . f . e f . . . . . .
        . . . . . e . . . f f f f . . .
        . . . . . e . . . e f f f . . .
        . . . . . e f f f e f f f . . .
        . . . . e e f f f f e f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "mummy") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . b f . . . . . . . .
        . . . . . f 3 3 f 3 . . . . . .
        . . . . . f b f f . . . . . . .
        . . . . f 3 d e . f . . . . . .
        . . . . d b 3 3 3 f . . . . . .
        . . . . d b b d f . . . . . . .
        . . . f 3 d 3 f e . . . . . . .
        . . . d f d b f b . . . . . . .
        . . . 3 f b f f d f f f . . . .
        . . . f f 3 3 f f f f f . . . .
        . . . . f d f 3 f f f . . . . .
        . . . . f 3 f d f f . . . . . .
        . . . f d f f d f . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "scythe-reaper") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . f c f . . . . . . .
        . . . . . . f c b c . . . . . .
        . f . . . f f f c f . . . . . .
        . f 2 f . . c 9 f c f . . . . .
        . . f 9 2 f c c c c c f . . . .
        . . . f f 2 f f b f f c c f . .
        . . . f 1 b 2 f 1 b f b f f . .
        . . f f b f f f 2 f f b c c . .
        . f c f f f f b b 9 b c f . . .
        . . f f f . f b f f 2 2 c f f .
        . . . . . f 9 f f f f f f f f .
        . . . . . . f f f f f b 3 2 f .
        . . . . 3 1 1 1 1 1 1 3 f . . .
        . . . f f f b b f f f 1 b f f .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "executioner") return img`
        . . . . . . . . . . . . . . . .
        . . . . f e e . . 3 3 3 f . . .
        . . . f b d f f f f f 1 3 f . .
        . . f b f . b b b b f e 3 3 . .
        . f b f . f f 1 f b f f e 3 . .
        . f . 1 1 f 1 b 1 b f f f 1 f .
        . . f 1 f f b b b b f f 1 d e .
        . . f b f f f f f b f f b f e .
        . f 1 f f . . b b f 1 1 . . . .
        . e 1 f . . f b f . f f . b f .
        . f 1 b d f 1 f f . . 3 d f . .
        . f 3 f e e 1 e f . . f 3 . . .
        . . f 3 f 1 b f f e e 1 f . . .
        . . f f 3 f 1 1 f 1 1 3 f f f .
        . . f f f 3 f f 1 3 f f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "wizard") return img`
        . . . . . . . . . . . . . . . .
        . . . . . 8 a . . . . . . . . .
        . . . . a a a a a a . . . . . .
        . . . . . . 3 e . . . . . . . .
        . . . . . . a 8 . . . . . . . .
        . . . . . a a a a a . . . . . .
        . . . . . a a a 8 a 8 . . . . .
        . . . d a . a c 2 2 8 . . . . .
        . . . . . . 8 c 2 d . . . . . .
        . . . . . . a a 8 . . . . . . .
        . . . . . 8 8 a a a f f f . . .
        . . . . . 8 c a a a f f f . . .
        . . . . . 8 8 a a 8 f f . . . .
        . . . . . c 8 8 8 c 8 . . . . .
        . . . . . 2 . . . 2 . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (artKey == "elf-mage") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . 1 3 1 . . . . . . .
        . . . . . 1 2 2 1 1 . . . . . .
        . . . . . . 1 3 1 . . 2 2 d . .
        . . . . 2 2 1 2 1 2 2 2 e . . .
        . . . 2 2 2 2 2 2 2 2 2 e . . .
        . 3 2 2 2 2 2 2 2 e 2 2 e . . .
        . . 2 2 e e 2 2 e e 2 2 e f . .
        . . . e . 2 e 2 e e f e f f . .
        . . . . . 2 e e 2 e f f f . . .
        . . . . . 2 e e 2 e f f f . . .
        . . . . . 2 2 e 2 e f f . . . .
        . . . . 2 2 2 2 2 2 e f . . . .
        . . . . 2 2 2 2 2 2 e . . . . .
        . . . . f f 2 2 2 f . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b b b . . . .
        . . . . . . . . b . b b b . . .
        . . . . . . . . . . . . b b . .
        . . . . . . . . . . b . b b f .
        . . . . . . . . . b b b b f f .
        . . . . . . b b b b b b b f f .
        . . . . b b b b b b b b b f f .
        . . . b b b b b b b b b b f f .
        . . . b b b b b b f f f b b f .
        . . f b b 1 b b f f f f b f . .
        . . 1 1 b 1 f b f . . . . . . .
        . 1 1 b b f b b f . . . . . . .
        . 2 2 b f f b f f . . . . . . .
        . f f f . f b f . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    }
    export function observer(): Image {
        return img`
        . . . . . 9 9 . . . . .
        . . . . 9 9 9 9 . . . .
        . . . 9 f f 9 f f . . .
        . . . 9 f f 9 f f . . .
        . . . . 9 9 9 9 . . . .
        . . . 6 6 6 6 6 6 . . .
        . . . 6 6 6 6 6 6 . . .
        . . . 1 6 6 6 6 6 1 . .
        . . . 1 6 6 6 6 6 1 . .
        . . . 1 6 6 6 6 6 . 1 .
        . . 1 . . . . . . . 1 .
        . . 1 . . . . . . . 1 .
    `;
    }
    export function station(kind: apocTypes.Station): Image {
        if (kind == apocTypes.Station.Secondary) return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . a f . . . . . . .
        . . . . . . a 8 a f . . . . . .
        . . . . . 8 a a a a f . . . . .
        . . . . f 8 8 a a a 8 . . . . .
        . . . . f 8 8 a a 8 a . . . . .
        . . . . f 8 8 8 8 8 8 . . . . .
        . . . . 8 8 8 8 8 8 8 f . . . .
        . . . f a a a a 8 a a a . . . .
        . . . f 8 8 8 8 a a 8 8 . . . .
        . . . 8 8 8 a a a a 8 8 f . . .
        . . f 8 8 a 8 8 8 8 8 8 8 f . .
        . 8 8 8 8 8 8 8 8 8 8 8 8 f f .
        . 8 8 8 8 8 8 8 8 8 8 8 8 8 f .
        . 8 8 8 8 8 8 8 c c c c c c f .
        . . . . . . . . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . 1 f f 1 . . . . . .
        . . . . . . 1 f f 1 . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . f f f f f f . . . . .
        . . . . f b b 1 1 b b f . . . .
        . . . . f b 1 b b 1 b f . . . .
        . . . . f b 1 9 9 1 b f . . . .
        . . . f b b 1 b b 1 b b f . . .
        . . 1 1 1 1 1 9 b 1 1 9 1 b . .
        . . 1 1 1 1 1 1 1 1 1 1 9 b . .
        . . 1 b b b b b b b b b b b . .
        . . . . . . . . . . . . . . . .
    `;
    }
    export function move(move: string): Image {
        if (move == "Strike") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . 1 1 .
        . . . . . . . . . . . . 1 . 1 .
        . . . . . . . . . . . 1 . 1 . .
        . . . . . . . . . . 1 . 1 . . .
        . . . . . . . . . 1 . 1 . . . .
        . . . . . . . . 1 . 1 . . . . .
        . . . . . . . 1 . 1 . . . . . .
        . . 1 . . . 1 . 1 . . . . . . .
        . . 1 1 . 1 . 1 . . . . . . . .
        . . . 1 1 . 1 . . . . . . . . .
        . . . . 1 1 . . . . . . . . . .
        . . . 1 . 1 1 . . . . . . . . .
        . 1 1 . . . . 1 . . . . . . . .
        . . 1 . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (move == "Flurry") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . 1 . . . . . .
        . . . . . . 1 1 . . . . . . . .
        . . . . . . 1 . 1 . . . . . . .
        . . . . . 1 . 1 1 . . . . . . .
        . 1 1 . 1 . 1 . . . . . . . . 1
        . . 1 1 . 1 . . . . . . 1 1 . .
        . . 1 1 1 . . . . . . . 1 . 1 .
        . 1 1 1 1 1 . . . . . 1 . 1 1 .
        . 1 1 . . 1 . 1 1 . 1 . 1 . . .
        1 . . . . . . . 1 1 . 1 . . . .
        . . . . . . . . 1 1 1 . . . . .
        . . . . . . . 1 1 1 1 1 . . . .
        . . . . . . . 1 1 . . 1 . . . .
        . . . . . . 1 . . . . . . . . .
    `;
        if (move == "Mend") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 6 6 6 6 6 6 . . . . .
        . . . . . 6 1 1 1 1 6 . . . . .
        . . . . . 6 7 7 7 7 6 . . . . .
        . . 6 6 6 6 7 7 7 7 6 6 6 6 . .
        . . 6 1 1 1 7 7 7 7 7 7 7 6 . .
        . . 6 7 7 7 7 7 7 7 7 7 7 6 . .
        . . 6 7 7 7 7 7 7 7 7 7 7 6 . .
        . . 6 7 7 7 7 7 7 7 7 7 7 6 . .
        . . 6 6 6 6 7 7 7 7 6 6 6 6 . .
        . . . . . 6 7 7 7 7 6 . . . . .
        . . . . . 6 7 7 7 7 6 . . . . .
        . . . . . 6 6 6 6 6 6 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (move == "Ward") return img`
        . . . . . . . . . . . . . . . .
        . . . . 1 1 1 1 1 1 1 1 . . . .
        . . . 1 . . . . . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . 1 . 1 1 1 . . . . 1 . . .
        . . . . 1 1 1 1 . . 1 1 . . . .
        . . . . 1 1 . 1 . . 1 1 . . . .
        . . . . . 1 . 1 . . 1 . . . . .
        . . . . . 1 1 . . 1 1 . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (move == "Venom") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . 6 . . . . . . .
        . . . . . . . 6 6 6 . . . . . .
        . . . . . . . 6 7 7 . . . . . .
        . . . . . . 6 6 7 6 6 . . . . .
        . . . . . 6 6 7 7 6 6 6 . . . .
        . . . . . 6 6 7 6 6 6 6 . . . .
        . . . . 6 6 7 7 6 6 6 6 6 . . .
        . . . . 6 6 1 6 6 6 1 6 6 . . .
        . . . . 6 6 6 6 6 6 6 6 6 . . .
        . . . . 6 6 6 6 6 6 6 6 6 . . .
        . . . . 6 6 6 6 6 6 6 6 6 . . .
        . . . . 6 6 6 7 7 7 6 6 6 . . .
        . . . . . 6 6 6 6 6 6 6 . . . .
        . . . . . . 6 6 6 6 6 . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (move == "Reap") return img`
        . . . . . . . . . . . . . . . .
        . . . . . 1 1 1 1 1 . . . . . .
        . . . 1 1 . 1 1 1 1 1 1 . . . .
        . . . 1 . 1 1 1 1 1 1 1 . . . .
        . . 1 1 . 1 1 1 1 1 1 1 1 . . .
        . . 1 1 . . 1 1 1 . . 1 1 . . .
        . . 1 1 . . 1 1 1 . . 1 1 . . .
        . . 1 1 . . 1 1 1 . . 1 1 . . .
        . . . 1 1 1 1 1 1 1 1 1 . . . .
        . . . 1 1 1 . 1 . 1 1 1 . . . .
        . . . 1 . 1 . . . 1 . 1 . . . .
        . . . . . 1 1 1 1 1 . . . . . .
        . . . . 1 . . 1 . . 1 . . . . .
        . . . . . 1 . 1 . 1 . . . . . .
        . . . . . . 1 1 1 . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (move == "Empower") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . 5 . . . . . . . .
        . . . . . . . 5 . . . . . . . .
        . . . . . . 5 5 5 . . . . . . .
        . . . . . . 5 1 5 . . . . . . .
        . . . . . 5 1 1 1 5 . . . . . .
        5 5 5 5 5 1 5 1 5 1 5 5 5 5 5 .
        . 5 5 5 5 5 5 1 5 5 5 5 5 5 . .
        . . . 5 5 5 5 1 5 5 5 5 . . . .
        . . . . 5 5 5 1 5 5 5 . . . . .
        . . . . 5 5 5 5 5 5 5 . . . . .
        . . . . 5 5 5 5 5 5 5 . . . . .
        . . . 5 5 5 5 . 5 5 5 5 . . . .
        . . . 5 5 . . . . . 5 5 . . . .
        . . . 5 . . . . . . . 5 . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (move == "Wait") return img`
        . . . . . . . . . . . . . . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . . 9 . 1 1 1 1 . 9 . . . .
        . . . . . 9 1 1 1 1 9 . . . . .
        . . . . . . 9 . . 9 . . . . . .
        . . . . . . . 9 9 . . . . . . .
        . . . . . . . 9 9 . . . . . . .
        . . . . . . 9 . . 9 . . . . . .
        . . . . . 9 . . . . 9 . . . . .
        . . . . 9 . 5 5 5 5 . 9 . . . .
        . . . . 9 . 5 5 5 5 . 9 . . . .
        . . . . 9 . 5 5 5 5 . 9 . . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . 5 5 5 5 5 5 5 5 5 5 . . .
        . . . . . . . . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . 2 . . . . . . . .
        . . . . . . 2 . 2 . . . . . . .
        . . . . . 2 . . . 2 . . . . . .
        . . . . 2 1 1 1 1 1 2 2 . . . .
        . . . 2 . 1 . . . . 1 . 2 . . .
        . . 2 . . . . . . . 1 . . 2 . .
        . 2 . . . . . . 1 1 . . . . 2 .
        . . 2 . . . . 1 . . . . . 2 . .
        . . . 2 . . . 1 . . . . 2 . . .
        . . . . 2 . . . . . . 2 . . . .
        . . . . 2 . . 5 . . 2 . . . . .
        . . . . . 2 . . . 2 . . . . . .
        . . . . . . 2 . 2 . . . . . . .
        . . . . . . . 2 . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    }
    export function trait(trait: string): Image {
        if (trait == "Plain") return img`
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . 1 b . . . . .
        . . . . b b b b . . . .
        . . . . b b b b . . . .
        . . . . . b b . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
    `;
        if (trait == "Leech") return img`
        . . . . . . . . . . . .
        . . . . . . 2 . . . . .
        . . . . . 2 2 2 . . . .
        . . . . . 2 2 2 . . . .
        . . . . 2 3 2 1 1 1 1 .
        . . . 2 2 3 2 1 1 1 . .
        . . . 2 3 2 2 2 1 1 . .
        . . 2 2 3 2 2 2 1 2 . .
        . . 2 2 2 2 2 2 1 2 2 .
        . . 2 2 2 2 2 2 2 2 . .
        . . . 2 2 2 2 2 2 . . .
        . . . . 2 2 2 2 . . . .
    `;
        if (trait == "Cleanser") return img`
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . 7 7 7 . . . . .
        . . . . 7 7 7 . . . . .
        . . 1 1 1 1 1 1 1 . . .
        . . 1 1 1 1 1 1 1 . . .
        . . 1 1 1 1 1 1 1 9 . .
        . . . . 7 7 7 . . 9 9 .
        . . . . 7 7 7 . 9 9 9 .
        . . . . 7 7 7 . 9 9 9 9
        . . . . . . . 9 9 9 9 .
        . . . . . . . . 9 9 9 .
    `;
        if (trait == "Steadfast") return img`
        . . . . . . . . . . . .
        . 6 6 6 6 6 6 6 6 6 6 .
        . 6 9 9 9 9 9 9 9 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 6 9 9 1 1 6 9 6 6 .
        . . 6 6 6 1 1 9 6 6 . .
        . . . . 6 6 9 6 6 . . .
        . . . . . 6 6 6 . . . .
        . . . . . . 6 . . . . .
    `;
        if (trait == "Piercer") return img`
        . . . . . . . . . . . .
        . . . . . . . . . . 5 5
        . . . . . . 5 5 5 5 5 5
        . . . . . . 5 1 1 1 5 .
        . . . . . . 1 1 1 5 5 .
        . . . . . 1 1 1 . 5 5 .
        . . . . . 1 1 . . . . .
        . 4 . . 1 1 . . . . . .
        . . 4 1 1 1 . . . . . .
        . . 1 4 1 . . . . . . .
        . 1 1 1 4 . . . . . . .
        . . 1 . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . 1 b . . . . .
        . . . . b b b b . . . .
        . . . . b b b b . . . .
        . . . . . b b . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
    `;
    }
    export function targetAll(): Image {
        return img`
        . . . . . . . . . . . . . . . .
        . . 1 1 1 . . . . . 1 1 1 . . .
        . 1 1 1 1 1 . . . 1 1 1 1 1 . .
        . 1 1 1 1 1 . . . 1 1 1 1 1 . .
        . 1 1 1 1 1 . . . 1 1 1 1 1 . .
        . . 1 1 1 . . . . . 1 1 1 . . .
        9 9 9 9 9 9 9 . 9 9 9 9 9 9 9 .
        9 9 9 9 9 9 5 5 5 9 9 9 9 9 9 .
        9 9 9 9 5 5 1 1 1 5 5 9 9 9 9 .
        . . . . . 1 1 1 1 1 . . . . . .
        . . . . . 1 1 1 1 1 . . . . . .
        . . . . . 1 1 1 1 1 . . . . . .
        . . . . . . 1 1 1 . . . . . . .
        . . . . 9 9 9 9 9 9 9 . . . . .
        . . . . 9 9 9 9 9 9 9 . . . . .
        . . . . 9 9 9 9 9 9 9 . . . . .
    `;
    }
    export function digit(value: number): Image {
        if (value == 0) return img`
        . . . . . .
        . 1 1 1 . .
        5 5 e 5 5 .
        5 5 e 5 5 e
        5 5 e 5 5 e
        5 5 e 5 5 e
        5 5 e 5 5 e
        . 5 5 5 e e
        . . e e e .
    `;
        if (value == 1) return img`
        . . . . . .
        . . 1 . . .
        . 5 5 e . .
        . . 5 e . .
        . . 5 e . .
        . . 5 e . .
        . . 5 e . .
        . 5 5 5 . .
        . . e e e .
    `;
        if (value == 2) return img`
        . . . . . .
        . 1 1 1 . .
        5 5 e 5 5 .
        . e e 5 5 e
        . . 5 5 e e
        . 5 5 e e .
        5 5 e e . .
        5 5 5 5 5 .
        . e e e e e
    `;
        if (value == 3) return img`
        . . . . . .
        1 1 1 1 . .
        . e e 5 5 .
        . . . 5 5 e
        . 5 5 5 e e
        . . e 5 5 .
        . . . 5 5 e
        5 5 5 5 e e
        . e e e e .
    `;
        if (value == 4) return img`
        . . . . . .
        . . . 1 . .
        . . 5 5 e .
        . 5 . 5 e .
        5 5 e 5 e .
        5 5 5 5 5 .
        . e e 5 e e
        . . . 5 e .
        . . . . e .
    `;
        if (value == 5) return img`
        . . . . . .
        1 1 1 1 1 .
        5 5 e e e e
        5 5 e . . .
        5 5 5 5 . .
        . e e 5 5 .
        . . . 5 5 e
        5 5 5 5 e e
        . e e e e .
    `;
        if (value == 6) return img`
        . . . . . .
        . 1 1 1 . .
        5 5 e e e .
        5 5 e . . .
        5 5 5 5 . .
        5 5 e 5 5 .
        5 5 e 5 5 e
        . 5 5 5 e e
        . . e e e .
    `;
        if (value == 7) return img`
        . . . . . .
        1 1 1 1 1 .
        . e e 5 5 e
        . . 5 5 e e
        . . 5 5 e .
        . 5 5 e e .
        . 5 5 e . .
        . 5 5 e . .
        . . e e . .
    `;
        if (value == 8) return img`
        . . . . . .
        . 1 1 1 . .
        5 5 e 5 5 .
        5 5 e 5 5 e
        . 5 5 5 e e
        5 5 e 5 5 .
        5 5 e 5 5 e
        . 5 5 5 e e
        . . e e e .
    `;
        if (value == 9) return img`
        . . . . . .
        . 1 1 1 . .
        5 5 e 5 5 .
        5 5 e 5 5 e
        . 5 5 5 5 e
        . . e 5 5 e
        . . . 5 5 e
        . 5 5 5 e e
        . . e e e .
    `;
        return img`
        . . . . . .
        . 1 1 1 . .
        5 5 e 5 5 .
        5 5 e 5 5 e
        5 5 e 5 5 e
        5 5 e 5 5 e
        5 5 e 5 5 e
        . 5 5 5 e e
        . . e e e .
    `;
    }
    export function terrain(theme: string): Image {
        if (theme == "altar") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . f b b b b b b . . . . .
        . . . f b b b b b b b b . . . .
        . . . f b b b b b b b b . . . .
        . . . f b b b b b b b b . . . .
        . . f b b b b b b b b b b . . .
        . f 1 1 1 1 1 1 1 1 1 1 9 b . .
        . 1 b b b b b b b b b b b b f .
        . 1 1 1 1 1 1 1 1 1 9 9 9 9 f .
        . f f f f f f f f f f f f f f .
        . . . . . . . . . . . . . . . .
    `;
        if (theme == "blade-altar") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . 1 f f 1 . . . . . .
        . . . . . . 1 f f 1 . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . f f f f f f . . . . .
        . . . . f b b 1 1 b b f . . . .
        . . . . f b 1 b b 1 b f . . . .
        . . . . f b 1 9 9 1 b f . . . .
        . . . f b b 1 b b 1 b b f . . .
        . . 1 1 1 1 1 9 b 1 1 9 1 b . .
        . . 1 1 1 1 1 1 1 1 1 1 9 b . .
        . . 1 b b b b b b b b b b b . .
        . . . . . . . . . . . . . . . .
    `;
        if (theme == "arcane-altar") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . a f . . . . . . .
        . . . . . . a 8 a f . . . . . .
        . . . . . 8 a a a a f . . . . .
        . . . . f 8 8 a a a 8 . . . . .
        . . . . f 8 8 a a 8 a . . . . .
        . . . . f 8 8 8 8 8 8 . . . . .
        . . . . 8 8 8 8 8 8 8 f . . . .
        . . . f a a a a 8 a a a . . . .
        . . . f 8 8 8 8 a a 8 8 . . . .
        . . . 8 8 8 a a a a 8 8 f . . .
        . . f 8 8 a 8 8 8 8 8 8 8 f . .
        . 8 8 8 8 8 8 8 8 8 8 8 8 f f .
        . 8 8 8 8 8 8 8 8 8 8 8 8 8 f .
        . 8 8 8 8 8 8 8 c c c c c c f .
        . . . . . . . . . . . . . . . .
    `;
        if (theme == "healing-altar") return img`
        . . . . . . . . . . . . . . . .
        . . . . 1 1 1 1 1 1 1 f . . . .
        . . . . . 1 1 1 1 1 f . . . . .
        . . . . f f 1 1 1 f 1 . . . . .
        . . . . . 1 f 1 1 1 f . . . . .
        . . . . . . . 1 f . . . . . . .
        . . . f 1 1 9 1 1 1 1 9 . . . .
        . . f 1 1 1 1 1 1 1 1 1 9 . . .
        . . f b 9 1 1 1 1 1 b 1 1 . . .
        . . . f 1 1 1 b 9 b b 9 . . . .
        . . f 9 1 1 1 b b 1 b b b . . .
        . f 1 1 1 1 1 1 1 1 1 1 1 b . .
        . 9 1 9 9 b b b b b b b b b f .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 f .
        . f f f f f f f f f f f f f f .
        . . . . . . . . . . . . . . . .
    `;
        if (theme == "fountain") return img`
        . . . . . . . . . . . . . . . .
        . . . . . f f f f f f . . . . .
        . . . . f b f b b f b f . . . .
        . . . . b b b b b b b b . . . .
        . . . . b f f f f f f b . . . .
        . . . . . . b f f b . . . . . .
        . . . . . . b f f b . . . . . .
        . . . . f f b b b b f f . . . .
        . . f b b b 9 9 9 9 b b b b . .
        . 1 b 6 9 9 1 9 1 1 9 9 9 b b .
        . b 9 9 9 9 9 9 9 9 1 9 9 9 b .
        . b 6 9 9 9 9 9 9 9 6 6 6 6 b .
        . b b b 1 b 6 9 6 6 b 1 b b b .
        . . b b b b 1 b 9 b b b b b . .
        . . . f f f b b b b f f . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (theme == "chest") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . 4 2 2 4 2 4 4 2 2 5 e 4 . .
        . 5 e 4 4 2 5 e 2 2 2 4 e 4 . .
        . 4 4 4 4 4 4 4 4 4 4 e 2 4 . .
        . 4 2 4 2 2 4 2 2 4 5 e e 4 f .
        . 4 5 5 5 4 4 4 5 5 4 e e 4 f .
        . 4 2 2 4 4 4 4 2 4 5 e e e f .
        . 4 2 2 2 2 4 2 2 2 5 e e f f .
        . 4 4 4 4 4 4 4 4 4 4 e f f . .
        . f f f f f f f f f f f f . . .
        . . . . . . . . . . . . . . . .
    `;
        if (theme == "stairs") return img`
        . . . . . . . . . . . . . . . .
        . b b b b b b b b b b b b b b .
        . b b c b b b b b b b b b c b .
        . b b b f b c b c c c b b c b .
        . b b b f f b c c b c c c f b .
        . b b b f f f f f f c b f f b .
        . b b b b b b f f f f f f f b .
        . b b b b b b c f f f f f f b .
        . b b b b b b f c f c f f f b .
        . b b b b b b b b c f f f f b .
        . b b b b b b b b c f c f f b .
        . b b b b b b b b b b b f f b .
        . b b b b b b b b b b b f f b .
        . b b b b b b b b b b b b b b .
        . b b b b b b b b b b b b b b .
        . . . . . . . . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . f b b b b b b . . . . .
        . . . f b b b b b b b b . . . .
        . . . f b b b b b b b b . . . .
        . . . f b b b b b b b b . . . .
        . . f b b b b b b b b b b . . .
        . f 1 1 1 1 1 1 1 1 1 1 9 b . .
        . 1 b b b b b b b b b b b b f .
        . 1 1 1 1 1 1 1 1 1 9 9 9 9 f .
        . f f f f f f f f f f f f f f .
        . . . . . . . . . . . . . . . .
    `;
    }
    export function status(status: string): Image {
        if (status == "ward" || status == "Ward") return img`
        . . . . . . . . . . . .
        . 6 6 6 6 6 6 6 6 6 6 .
        . 6 9 9 9 9 9 9 9 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 9 6 6 1 1 6 6 9 6 .
        . 6 6 9 9 1 1 6 9 6 6 .
        . . 6 6 6 1 1 9 6 6 . .
        . . . . 6 6 9 6 6 . . .
        . . . . . 6 6 6 . . . .
        . . . . . . 6 . . . . .
    `;
        if (status == "venom" || status == "Venom") return img`
        . . . . . . . . . . . .
        . . . . . . 6 . . . . .
        . . . . . 6 6 6 . . . .
        . . . . . 6 7 7 . . . .
        . . . . 6 6 7 6 6 . . .
        . . . 6 6 7 7 6 6 6 . .
        . . . 6 6 7 6 6 6 6 . .
        . . 6 6 7 7 6 6 6 6 6 .
        . . 6 6 1 7 7 7 1 6 6 .
        . . . 6 6 6 6 6 6 6 . .
        . . . . 6 6 6 6 6 . . .
        . . . . . . . . . . . .
    `;
        if (status == "empower" || status == "Empower") return img`
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . 5 5 . . . . .
        . . . . . 5 5 . . . . .
        . 5 5 5 1 5 5 1 5 5 5 .
        . . . 5 5 5 5 5 5 . . .
        . . . . 5 5 5 5 . . . .
        . . . . 5 5 5 5 . . . .
        . . . 5 5 5 5 5 5 . . .
        . . . 5 . . . . 5 . . .
        . . . . . . . . . . . .
    `;
        if (status == "Hold" || status == "hold") return img`
        . 1 1 1 1 1 1 1 1 1 . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . . 5 5 5 . 5 5 5 . . .
        . e e e e e e e e e . .
    `;
        if (status == "Banish" || status == "banish") return img`
        . . . . a a a a . . . .
        . . . a a a a a . . . .
        . . . a . . . . a . . .
        . a a . . . . 1 1 a a .
        . a a . . . 1 1 1 a a .
        . a a . . 1 1 1 1 a a .
        . a a . . 1 1 . 1 a a .
        . a a . 1 1 . . . a a .
        . a a 1 1 1 . . a a a .
        . . 1 1 . . . . a . . .
        . . . a a a a a . . . .
        . . . . a a a a . . . .
    `;
        return img`
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . 1 b . . . . .
        . . . . b b b b . . . .
        . . . . b b b b . . . .
        . . . . . b b . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . . . . . . . . .
    `;
    }
    export function operation(name: string): Image {
        if (name == "Hold" || name == "hold") return img`
        . . . . . . . . . . . . . . . .
        . . . 1 1 1 1 1 1 1 1 1 1 . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . . 5 5 5 . . 5 5 5 . . . .
        . . . e e e e e e e e e e . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "Banish" || name == "banish") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . a a a a . . . . . .
        . . . . . a a a a a a . . . . .
        . . . . a a . . . . a a . . . .
        . . . a a . . 1 1 1 1 1 a . . .
        . . a a a . . . . 1 1 1 a a . .
        . . a a . . . . 1 1 1 1 a a . .
        . . a a . . . 1 1 1 . 1 a a . .
        . . a a . . . 1 1 . . 1 a a . .
        . . a a . . 1 1 . . . . a a . .
        . . a a a 1 1 1 . . . a a a . .
        . . . a 1 1 1 . . . . a a . . .
        . . . 1 1 1 . . . . a a . . . .
        . . . . 1 a a a a a a . . . . .
        . . . . . . a a a a . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "create") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "get") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . 1 . . . .
        . 9 9 9 9 9 . . . . 1 1 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 1 .
        . . . . . . . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "set") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . 1 . . . .
        . 9 9 9 9 9 . . . . 1 1 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 1 .
        . . . . . . . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "append") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . 5 5 5 5 5 5 5 5 .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "insert") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "prepend") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . 5 5 5 5 5 5 5 5 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "remove") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . 2 .
        . . . . . . . . . 2 . . . 2 2 2
        . . . . . . . . 2 2 2 . 2 2 2 .
        . 9 9 9 9 9 . . . 2 2 2 2 2 . .
        . 9 9 9 9 9 . . . . 2 2 2 . . .
        . . . . . . . . . 2 2 2 2 2 . .
        . . . . . . . . 2 2 2 . 2 2 2 .
        . . . . . . . . . 2 . . . 2 2 2
        . 9 9 9 9 9 . . . . . . . . 2 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "length") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . 5 5 . . . . .
        . . . . . . . . 5 5 5 5 . . . .
        . . . . . . . 5 5 . . 5 5 . . .
        . . . . . . . 5 5 . . 5 5 . . .
        . 9 9 9 9 9 . . 5 5 5 5 . . . .
        . 9 9 9 9 9 . . . 5 5 . 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 . .
        . . . . . . . . . . . . . 1 1 .
        . 9 9 9 9 9 . . . . . . . 1 1 1
        . 9 9 9 9 9 . . . . . . . . 1 .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "foreach") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . 5 5 5 5 5 5 5 .
        . . . . . . . . 5 5 5 5 5 5 5 .
        . . . . . . . . . . . . . 5 5 .
        . . . . . . . . . . . . . 5 5 .
        . 9 9 9 9 9 . . . . . . . 5 5 .
        . 9 9 9 9 9 . . . . . . . 5 5 .
        . . . . . . . . 1 . . . . 5 5 .
        . . . . . . . . 1 . . . . 5 5 .
        . . . . . . . . 1 5 5 5 5 5 5 .
        . 9 9 9 9 9 . . 1 5 5 5 5 5 5 .
        . 9 9 9 9 9 . . 1 . . . . . . .
        . . . . . . . . 1 . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "swap") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . 1 . . . .
        . 9 9 9 9 9 . . . . 1 1 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 1 .
        . . . . . . . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 5 5 5 5 5 5 5 5 .
        . . . . . . . 5 5 5 5 5 5 5 5 .
        . 9 9 9 9 9 . 5 5 5 . . . . . .
        . 9 9 9 9 9 . . 5 5 5 . . . . .
        . . . . . . . . . 5 5 5 . . . .
        . . . . . . . . . . 5 . . . . .
    `;
        if (name == "find") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . 5 5 . . . . .
        . . . . . . . . 5 5 5 5 . . . .
        . . . . . . . 5 5 . . 5 5 . . .
        . . . . . . . 5 5 . . 5 5 . . .
        . 9 9 9 9 9 . . 5 5 5 5 . . . .
        . 9 9 9 9 9 . . . 5 5 . 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 . .
        . . . . . . . . . . . . . 1 1 .
        . 9 9 9 9 9 . . . . . . . 1 1 1
        . 9 9 9 9 9 . . . . . . . . 1 .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "reverse") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . a a a a a a a a
        . . . . . . . . a a a a a a a a
        . . . . . . . . . . . . . . a a
        . . . . . . . . . . . . . . a a
        . 9 9 9 9 9 . . . . . . . . a a
        . 9 9 9 9 9 . . . . . . . . a a
        . . . . . . . . . . . . . . a a
        . . . . . . . . a a a a a a a a
        . . . . . . . . a a a a a a a a
        . 9 9 9 9 9 . . a a a . . . . .
        . 9 9 9 9 9 . . . a a a . . . .
        . . . . . . . . . . a a a . . .
        . . . . . . . . . . . a . . . .
    `;
        if (name == "transfer") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . 1 . . . .
        . 9 9 9 9 9 . . . . 1 1 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 1 .
        . . . . . . . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . 5 5 5 5 5 5 5 5 .
        . . . . . . . 5 5 5 5 5 5 5 5 .
        . 9 9 9 9 9 . 5 5 5 . . . . . .
        . 9 9 9 9 9 . . 5 5 5 . . . . .
        . . . . . . . . . 5 5 5 . . . .
        . . . . . . . . . . 5 . . . . .
    `;
        if (name == "build") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . 7 7 7 . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "order") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . a a a a a a a a
        . . . . . . . . a a a a a a a a
        . . . . . . . . . . . . . . a a
        . . . . . . . . . . . . . . a a
        . 9 9 9 9 9 . . . . . . . . a a
        . 9 9 9 9 9 . . . . . . . . a a
        . . . . . . . . . . . . . . a a
        . . . . . . . . a a a a a a a a
        . . . . . . . . a a a a a a a a
        . 9 9 9 9 9 . . a a a . . . . .
        . 9 9 9 9 9 . . . a a a . . . .
        . . . . . . . . . . a a a . . .
        . . . . . . . . . . . a . . . .
    `;
        if (name == "run") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . 7 . . . . . . .
        . 9 9 9 9 9 . . 7 7 . . . . . .
        . . . . . . . . 7 7 7 . . . . .
        . . . . . . . . 7 7 7 7 . . . .
        . . . . . . . . 7 7 7 7 7 7 . .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 .
        . 9 9 9 9 9 . . 7 7 7 7 7 7 7 7
        . . . . . . . . 7 7 7 7 7 7 7 .
        . . . . . . . . 7 7 7 7 7 7 . .
        . . . . . . . . 7 7 7 7 . . . .
        . 9 9 9 9 9 . . 7 7 7 . . . . .
        . 9 9 9 9 9 . . 7 7 . . . . . .
        . . . . . . . . 7 . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "reset") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 1 . . . . . . . . . .
        . 9 9 9 9 1 1 1 . 5 5 5 . . . .
        . . . . . 1 1 1 1 1 1 5 5 . . .
        . . . . . 1 1 1 1 . . . 5 . . .
        . . . . . 1 1 1 . . . . . . . .
        . 9 9 9 9 1 5 5 . . . . . . . .
        . 9 9 9 9 9 5 5 . . . . . . . .
        . . . . . . 5 5 . . . . . . . .
        . . . . . . . 5 5 . . . 5 5 . .
        . . . . . . . . 5 5 5 5 5 . . .
        . 9 9 9 9 9 . . . 5 5 5 . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
        if (name == "exit") return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . 9 9 9 9 9 9 9 . .
        . 9 9 9 9 9 . 9 . . . . . 9 . .
        . 9 9 9 9 9 . 9 . . . . . 9 . .
        . . . . . . . 9 . . . . 1 9 . .
        . . . . . . . 9 . . . 1 1 1 . .
        . . . . . . . 9 . . . . 1 1 1 .
        . 9 9 9 9 9 . 9 . . . . . 1 1 1
        . 9 9 9 9 9 . 9 1 1 1 1 1 1 1 1
        . . . . . . . 9 1 1 1 1 1 1 1 1
        . . . . . . . 9 . . . . . 9 . .
        . . . . . . . 9 . . . . . 9 . .
        . 9 9 9 9 9 . 9 . . . . . 9 . .
        . 9 9 9 9 9 . 9 . . . . . 9 . .
        . . . . . . . 9 9 9 9 9 9 9 . .
        . . . . . . . . . . . . . . . .
    `;
        return img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . 1 . . . .
        . 9 9 9 9 9 . . . . 1 1 1 . . .
        . . . . . . . . . . . 1 1 1 . .
        . . . . . . . . . . . . 1 1 1 .
        . . . . . . . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . 1 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . 9 9 9 9 9 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    }
}

// SUPPLIED SOURCE supplied-world/save.ts
// Only one game-specific record; does not persist code, actors or drafts.
namespace apocSave {
    const KEY = "al.progress.v1"
    let recovery = ""
    let future = false

    export function notice(): string { return recovery }
    export function isFuture(): boolean { return future }

    function fresh(): apocTypes.Progress {
        return new apocTypes.Progress()
    }
    function integer(n: number): boolean { return n == Math.floor(n) && n >= 0 }
    function earnedCeiling(mask: number): number {
        let top = 1
        for (let room = 1; room <= 26; room++) {
            if ((mask & (1 << (room - 1))) == 0) break
            top = room + 1
        }
        return top
    }
    function consistent(mask: number, highest: number): boolean {
        const expected = (1 << (highest - 1)) - 1
        if (highest == 27) return mask == expected || mask == (expected | (1 << 26))
        return mask == expected
    }
    export function load(): apocTypes.Progress {
        recovery = ""
        future = false
        const data = settings.readNumberArray(KEY)
        if (!data) return fresh()
        if (data.length > 0 && integer(data[0]) && data[0] > 1) {
            future = true
            recovery = "Save uses a newer version; not overwritten"
            return fresh()
        }
        if (data.length != 4 || data[0] != 1 || !integer(data[1]) || !integer(data[2]) || !integer(data[3]) ||
            data[1] < 1 || data[1] > 27 || data[2] < 1 || data[2] > data[1] || data[3] >= (1 << 27) ||
            data[1] != earnedCeiling(data[3]) || !consistent(data[3], data[1])) {
            recovery = "Save invalid; temporary start at R01"
            return fresh()
        }
        let result = fresh()
        result.highestUnlocked = data[1]
        result.resumeRoom = data[2]
        result.completedMask = data[3]
        return result
    }
    export function store(value: apocTypes.Progress): void {
        if (future || !value) return
        if (value.schemaVersion != 1 || !integer(value.highestUnlocked) || !integer(value.resumeRoom) ||
            !integer(value.completedMask) || value.highestUnlocked != earnedCeiling(value.completedMask) ||
            value.resumeRoom < 1 || value.resumeRoom > value.highestUnlocked || value.completedMask >= (1 << 27) ||
            !consistent(value.completedMask, value.highestUnlocked)) return
        settings.writeNumberArray(KEY, [1, value.highestUnlocked, value.resumeRoom, value.completedMask])
    }
    export function clear(): void {
        settings.remove(KEY)
        future = false
        recovery = "Progress erased; R01 ready"
    }
}

// SUPPLIED SOURCE supplied-world/view.ts
// Icon-first fixed 480x360 view. Read-only rendering, all six streams visible.
namespace apocView {
    const X = [26, 76, 148, 242, 336, 410]
    const W = [46, 68, 90, 90, 70, 45]
    const TOP = 125
    const STEP = 17
    const JOBS = ["Write plan", "Hold threat", "Rewrite", "Append", "Insert Ward", "Delay", "Remove Ward", "Repair last", "Remove first", "Remove last", "Banish first", "Find Ward", "Hold hazards", "Swap power", "Clear Wards", "Build counters", "Use reserve", "Steal power", "Hold one", "Reverse", "Find defense", "Move target", "Find + remove", "Delay", "Repair gaps", "Build recovery", "Hold hazards"]
    const OPS = ["create", "get", "set", "append", "insert", "prepend", "remove", "length", "remove", "remove", "remove", "find", "foreach", "swap", "foreach", "build", "transfer", "transfer", "get", "reverse", "find", "transfer", "find", "order", "foreach", "build", "foreach"]
    const MENU = ["Use first station", "Use second station", "Run the plan", "Reset this attempt", "Retry this setup", "Try another setup", "Continue through the gate", "Revisit an unlocked room", "Which Recipe do I open?", "Reset saved progress"]
    const MOVES = ["Strike", "Flurry", "Mend", "Ward", "Venom", "Reap", "Empower", "Wait"]
    const TRAITS = ["Plain", "Piercer", "Cleanser", "Steadfast", "Leech"]
    let spriteCache: Sprite[] = []
    let iconCache: Image[] = []
    let moveImages: Image[] = []
    let smallMoves: Image[] = []
    let traitImages: Image[] = []
    let markImages: Image[] = []
    let digits: Image[] = []
    let allImage: Image = null
    let unknownImage: Image = null
    let ready = false
    function init(): void {
        if (ready) return
        ready = true
        for (let i = 0; i < MOVES.length; i++) {
            moveImages.push(apocArt.move(MOVES[i]))
            smallMoves.push(resize(moveImages[i], 12))
        }
        for (let i = 0; i < TRAITS.length; i++) traitImages.push(apocArt.trait(TRAITS[i]))
        const marks = ["Ward", "Venom", "Empower", "Hold"]
        for (let i = 0; i < marks.length; i++) markImages.push(resize(apocArt.status(marks[i]), 8))
        for (let i = 0; i < 10; i++) digits.push(apocArt.digit(i))
        allImage = apocArt.targetAll()
        unknownImage = apocArt.move("?")
    }
    function text(s: string, x: number, y: number, color: number): void { screen.print(s, x, y, color, image.font5) }
    function resize(source: Image, size: number): Image {
        const result = image.create(size, size)
        for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) result.setPixel(x, y, source.getPixel(Math.idiv(x * source.width, size), Math.idiv(y * source.height, size)))
        return result
    }
    function fit(s: string, n: number): string { return !s ? "" : s.length <= n ? s : s.substr(0, n - 2) + ".." }
    function shortName(id: string): string { return id.substr(0, 2) == "A-" || id.substr(0, 2) == "E-" ? id.substr(2) : id }
    function number(n: number, x: number, y: number): void {
        const value = "" + Math.max(0, Math.floor(n))
        const left = x - Math.idiv(value.length * 7 - 1, 2)
        for (let i = 0; i < value.length; i++) screen.drawTransparentImage(digits[parseInt(value.charAt(i))], left + i * 7, y)
    }
    function actorFor(sprite: Sprite, state: apocTypes.TrialSnapshot): apocTypes.ActorState {
        if (state && sprite) for (let i = 0; i < state.actors.length; i++) if (state.actors[i].sprite == sprite) return state.actors[i]
        return null
    }
    function name(sprite: Sprite, state: apocTypes.TrialSnapshot): string {
        if (sprite == apocWorld.uiSentinel()) return "ALL"
        const a = actorFor(sprite, state)
        return a ? shortName(a.id) : "?"
    }
    function icon(sprite: Sprite, state: apocTypes.TrialSnapshot): Image {
        if (sprite == apocWorld.uiSentinel()) return allImage
        for (let i = 0; i < spriteCache.length; i++) if (spriteCache[i] == sprite) return iconCache[i]
        if (spriteCache.length > 12) { spriteCache = []; iconCache = [] }
        const a = actorFor(sprite, state)
        const pic = a ? apocArt.portrait(a.id, a.side) : image.create(16, 16)
        spriteCache.push(sprite); iconCache.push(pic)
        return pic
    }
    function move(s: string): Image { const at = MOVES.indexOf(s); return at >= 0 ? moveImages[at] : unknownImage }
    function card(a: apocTypes.ActorState, x: number, y: number): void {
        const ev = apocWorld.uiEvent()
        const focus = apocWorld.uiPlaying() && ev && (ev.actor == a.sprite || ev.target == a.sprite)
        const edge = !a.present || a.hp <= 0 ? 11 : a.held ? 10 : a.side == apocTypes.Side.Ally ? 9 : 2
        screen.fillRect(x, y, 116, 30, focus ? 8 : 12)
        screen.drawRect(x, y, 116, 30, focus ? 5 : edge)
        screen.drawTransparentImage(a.sprite.image, x + 1, y + 2)
        if (!a.present || a.hp <= 0) {
            screen.drawLine(x + 3, y + 3, x + 22, y + 23, 2)
            screen.drawLine(x + 22, y + 3, x + 3, y + 23, 2)
        }
        text(shortName(a.id), x + 27, y + 2, 1)
        const ability = MOVES.indexOf(a.ability)
        if (ability >= 0) screen.drawTransparentImage(smallMoves[ability], x + 27, y + 17)
        text("" + a.hp + "/" + a.maxHP, x + 27, y + 10, a.hp <= 0 ? 2 : 1)
        text(a.trait, x + 58, y + 10, 11)
        screen.fillRect(x + 43, y + 18, 45, 3, 15)
        screen.fillRect(x + 43, y + 18, Math.idiv(45 * a.hp, a.maxHP), 3, edge)
        const trait = TRAITS.indexOf(a.trait)
        if (trait >= 0) screen.drawTransparentImage(traitImages[trait], x + 99, y + 17)
        let markX = x + 43
        if (a.ward) { screen.drawTransparentImage(markImages[0], markX, y + 21); markX += 10 }
        if (a.venom) { screen.drawTransparentImage(markImages[1], markX, y + 21); markX += 10 }
        if (a.empower) { screen.drawTransparentImage(markImages[2], markX, y + 21); markX += 10 }
        if (a.held) screen.drawTransparentImage(markImages[3], markX, y + 21)
    }
    function party(state: apocTypes.TrialSnapshot): void {
        let a = 0, e = 0
        for (let i = 0; i < state.actors.length; i++) {
            const actor = state.actors[i]
            if (actor.side == apocTypes.Side.Ally) { card(actor, 3 + a * 119, 15); a++ }
            else { card(actor, 3 + e * 119, 47); e++ }
        }
    }
    function wraps(s: string, y: number): void {
        let rest = s
        for (let row = 0; row < 2 && rest.length; row++) {
            let cut = Math.min(rest.length, 77)
            if (cut < rest.length) { let at = cut; while (at > cut - 18 && rest.charAt(at) != " ") at--; if (at > cut - 18) cut = at }
            text(rest.substr(0, cut), 7, y + row * 7, 1)
            rest = rest.substr(cut)
            while (rest.charAt(0) == " ") rest = rest.substr(1)
        }
    }
    function objective(): string {
        const r = apocWorld.uiRoom(), s = apocWorld.uiSpec()
        const tasks = ["", "Hold the marked monster in the roster. Keep the roster intact.", "Change the marked enemy Strike to Wait. Keep every other cell.", "Append Strike to allyMoves. Its final power and target are already waiting.", "", "Prepend Wait to enemyMoves. Delay the first attack until your Ward is ready.", "Remove the marked Ward from enemyMoves. Later moves shift left.", "Use length - 1 to change the last allyMoves entry to Strike.", "Remove the first allyMoves entry. Your opening Ward must arrive sooner.", "Remove the last enemyMoves entry. An absent cell is different from Wait.", "Remove the first roster Sprite, then banish that exact monster.", "Find Ward in enemyMoves; replace it with Wait at the found index.", "Hold every monster in the roster. Keep the roster and combat lists.", "Swap allyValues[0] and allyValues[3]. Save the strong hit for the boss.", "Visit every enemyMoves index. Replace Ward with Wait; preserve other moves.", "Build allyMoves from the source: Ward for Strike; Strike for Wait.", "Pop the last reserve move; append that returned move to allyMoves.", "Remove the marked enemyValues number; append that number to allyValues.", "Pick one roster monster at random and hold it. Keep both roster entries.", "Reverse enemyMoves. Values and targets stay where they are.", "Find enemy Strike; insert Ward into allyMoves at that same index.", "Remove the marked enemyTargets Sprite; prepend that same Sprite to that list.", "Find Ward in enemyMoves; remove it at the found index.", "First Delay prepends Wait. Then Rewrite changes the shifted marked Strike to Wait.", "Visit allyMoves: where Wait faces enemy Strike, change only that Wait to Ward.", "Build Ward for Strike; Mend at the first opening after a Strike; Strike otherwise.", "Hold both hazards first. At the second station, change every enemy Ward to Wait."]
        if (r == 1) return "Build Ward, Mend, Strike, Strike in allyMoves. Leading Waits: " + s.numberHint
        if (r == 5) return "Insert Ward at marked index " + s.primaryIndex + ". Watch only the move list shift."
        return tasks[r - 1]
    }
    function legend(state: apocTypes.TrialSnapshot): void {
        let seen: string[] = []
        const lists = [state.lists.allyMoves, state.lists.enemyMoves]
        for (let s = 0; s < 2; s++) for (let i = 0; i < lists[s].length; i++) if (seen.indexOf(lists[s][i]) < 0 && MOVES.indexOf(lists[s][i]) >= 0) seen.push(lists[s][i])
        for (let i = 0; i < state.actors.length; i++) if (seen.indexOf(state.actors[i].ability) < 0) seen.push(state.actors[i].ability)
        for (let i = 0; i < seen.length && i < 8; i++) { const x = 4 + i * 59; screen.drawTransparentImage(move(seen[i]), x, 96); text(seen[i], x + 17, 102, 1) }
    }
    function length(s: apocTypes.TrialSnapshot, c: number): number {
        const l = s.lists
        return c == 0 ? l.enemyValues.length : c == 1 ? l.enemyMoves.length : c == 2 ? l.enemyTargets.length : c == 3 ? l.allyTargets.length : c == 4 ? l.allyMoves.length : l.allyValues.length
    }
    function at(s: apocTypes.TrialSnapshot, c: number, i: number): string {
        if (i >= length(s, c)) return ""
        const l = s.lists
        return c == 0 ? "" + l.enemyValues[i] : c == 1 ? l.enemyMoves[i] : c == 2 ? name(l.enemyTargets[i], s) : c == 3 ? name(l.allyTargets[i], s) : c == 4 ? l.allyMoves[i] : "" + l.allyValues[i]
    }
    function columns(s: apocTypes.TrialSnapshot, actors: apocTypes.TrialSnapshot): void {
        const records = apocWorld.uiRecords(), ev = apocWorld.uiEvent(), spec = apocWorld.uiSpec(), room = apocWorld.uiRoom()
        const before = records.length ? records[records.length - 1].before : apocWorld.uiInitial()
        const headers = ["enemy", "enemyMoves", "enemyTargets", "allyTargets", "allyMoves", "ally"]
        for (let c = 0; c < 6; c++) {
            text(headers[c], X[c], 113, c < 3 ? 3 : 9)
            if (c == 0 || c == 5) text("Values", X[c], 119, c < 3 ? 3 : 9)
            text("" + length(s, c), X[c] + W[c] - 5, 119, 11)
        }
        for (let r = 0; r < 10; r++) {
            const y = TOP + r * STEP
            number(r, 9, y + 4)
            const marked = room == 14 ? r == 0 || r == 3 : (room != 2 && spec.primaryIndex == r) || spec.secondaryIndex == r
            for (let c = 0; c < 6; c++) {
                const changed = before && ((r < length(before, c)) != (r < length(s, c)) || at(before, c, r) != at(s, c, r))
                let bg = changed ? 14 : r % 2 == 0 ? 12 : 15
                if (apocWorld.uiPlaying() && ev && ev.index == r) bg = ev.side == apocTypes.Side.Ally ? 8 : 14
                screen.fillRect(X[c] - 2, y, W[c], STEP - 1, bg)
                if (changed) screen.fillRect(X[c] - 2, y + 3, 2, STEP - 7, 5)
                if (marked) screen.drawRect(X[c] - 2, y, W[c], STEP - 1, 5)
                if (r >= length(s, c)) { text("-", X[c] + Math.idiv(W[c], 2) - 3, y + 6, 11); continue }
                const value = at(s, c, r)
                if (c == 0 || c == 5) number(parseInt(value), X[c] + 19, y + 4)
                else if (c == 1 || c == 4) { screen.drawTransparentImage(move(value), X[c], y); text(fit(value, 9), X[c] + 18, y + 6, 1) }
                else {
                    const ref = c == 2 ? s.lists.enemyTargets[r] : s.lists.allyTargets[r]
                    screen.drawTransparentImage(icon(ref, s), X[c], y); text(value, X[c] + 18, y + 6, 1)
                    const actor = actorFor(ref, actors)
                    if (actor && (!actor.present || actor.hp <= 0)) screen.drawLine(X[c] + 1, y + 1, X[c] + 15, y + 15, 2)
                    else if (actor && actor.held) screen.drawRect(X[c], y, 16, 16, 10)
                }
            }
        }
    }
    function sources(s: apocTypes.TrialSnapshot): void {
        if (s.roster.length) {
            text("ROSTER", 6, 299, 9)
            for (let i = 0; i < s.roster.length; i++) {
                const x = 52 + i * 43
                screen.drawTransparentImage(icon(s.roster[i], s), x + 9, 298); text("" + i, x, 305, 1)
                if (apocWorld.uiRoom() == 2 && i == apocWorld.uiSpec().primaryIndex) screen.drawRect(x + 7, 297, 20, 18, 5)
                const actor = actorFor(s.roster[i], s)
                if (actor && actor.held) screen.drawRect(x + 8, 298, 18, 16, 10)
            }
        } else if (s.sourceMoves.length) {
            text(apocWorld.uiRoom() == 17 ? "RESERVE" : "SOURCE", 5, 299, 9); text(apocWorld.uiRoom() == 17 ? "edit" : "read", 5, 307, 11)
            for (let i = 0; i < s.sourceMoves.length; i++) { const x = 52 + i * 38; text("" + i, x, 305, 1); screen.drawTransparentImage(move(s.sourceMoves[i]), x + 8, 298) }
        } else text("Notch = edited; outline = marked. Dash = missing. D-pad walk; A use; B menu.", 6, 304, 11)
    }
    function eventText(): string {
        const ev = apocWorld.uiEvent(), s = apocWorld.uiDisplay()
        if (!ev || !apocWorld.uiPlaying()) return apocWorld.uiNotice()
        if (ev.kind == "action") return name(ev.actor, s) + " uses " + ev.move + " on " + name(ev.target, s)
        if (ev.kind == "damage") return name(ev.target, s) + " takes " + ev.amount + ". HP: " + ev.hp
        if (ev.kind == "heal") return name(ev.target, s) + " recovers. HP: " + ev.hp
        if (ev.kind == "skip") return "Index " + ev.index + ": " + ev.reason
        if (ev.kind == "ward-consumed") return name(ev.target, s) + "'s Ward absorbs a hit."
        if (ev.kind == "venom-tick") return name(ev.target, s) + " takes Poison damage."
        if (ev.kind == "empower-used") return name(ev.actor, s) + " uses the stored Empower bonus."
        return "Playing index " + ev.index + " - A finishes this preview"
    }
    export function stationLabel(i: number): string { return i == 0 ? JOBS[apocWorld.uiRoom() - 1] : i == 1 ? (apocWorld.uiRoom() == 24 ? "Rewrite" : "Clear Wards") : i == 2 ? "Run" : i == 3 ? "Reset" : "Exit" }
    export function stationIcon(i: number): string { return i == 0 ? OPS[apocWorld.uiRoom() - 1] : i == 1 ? "set" : i == 2 ? "run" : i == 3 ? "reset" : "exit" }
    function stations(): void {
        const positions = [70, 150, 230, 310, 390], spec = apocWorld.uiSpec(), observer = apocWorld.uiObserverX()
        const suggested = apocWorld.uiSuggestedStation()
        for (let i = 0; i < 5; i++) {
            if (i == 1 && !spec.twoStations) continue
            const near = Math.abs(observer - positions[i]) <= 28
            if (i == suggested && control.millis() % 900 < 450) {
                screen.fillRect(positions[i] - 35, 325, 70, 8, 8)
                text("v", positions[i] - 2, 334, 5)
            }
            const label = stationLabel(i)
            text(label, positions[i] - Math.idiv(label.length * 6, 2), 326, i == suggested || near ? 5 : 1)
        }
    }
    function menu(): void {
        screen.fillRect(72, 37, 336, 274, 15); screen.drawRect(72, 37, 336, 274, 5)
        if (apocWorld.uiEraseConfirm()) { text("Reset saved expedition progress?", 103, 111, 2); text("A confirm    B keep progress", 116, 147, 1); return }
        if (apocWorld.uiPicking()) { text("Revisit an unlocked room", 113, 68, 9); number(apocWorld.uiPickRoom(), 240, 118); text("Left/Right choose. A travel. B back.", 95, 164, 1); return }
        text("EXPEDITION MENU    A choose   B close", 94, 47, 9)
        const room = apocWorld.uiRoom(), spec = apocWorld.uiSpec(), p = apocWorld.uiProgress()
        for (let i = 0; i < MENU.length; i++) {
            const y = 66 + i * 21
            const locked = (i == 1 && !spec.twoStations) || (i == 6 && (p.completedMask & (1 << (room - 1))) == 0)
            if (i == apocWorld.uiMenuIndex()) screen.fillRect(82, y - 2, 316, 17, 8)
            text((i == apocWorld.uiMenuIndex() ? "> " : "  ") + MENU[i] + (locked ? " [locked]" : ""), 88, y, locked ? 11 : 1)
        }
        text("Run plays once. Reset keeps earned progress.", 91, 286, 11)
    }
    export function draw(): void {
        init(); screen.fill(15)
        const spec = apocWorld.uiSpec(), state = apocWorld.uiTrial()
        if (!spec || !state) { text("Preparing the expedition...", 160, 150, 1); return }
        const actors = apocWorld.uiDisplay() || state, p = apocWorld.uiProgress(), r = apocWorld.uiRoom()
        const room = r < 10 ? "0" + r : "" + r
        text("APOCALYPTIC LISTS", 5, 3, 5); text("R" + room + " / 27   SETUP " + apocWorld.uiVariant(), 173, 3, 1); text("OPEN RECIPE R" + room, 367, 3, 9)
        party(actors); wraps(objective(), 79); legend(state); columns(state, actors); sources(state)
        text(fit(eventText(), 77), 6, 319, apocWorld.uiPlaying() ? 5 : 9); stations()
        if (r == 27 && (p.completedMask & (1 << 26)) != 0 && !apocWorld.uiPlaying()) { screen.fillRect(82, 81, 316, 29, 8); text("ALL 27 ROOMS CLEARED. THE EXPEDITION SURVIVED!", 96, 86, 5); text("B opens the map to revisit your list powers.", 107, 99, 1) }
        if (apocWorld.uiMenu() || apocWorld.uiPicking() || apocWorld.uiEraseConfirm()) menu()
    }
}

// SUPPLIED SOURCE supplied-world/world.ts
// Apocalyptic Lists world owner: current learner callbacks, Sprite-bound trials,
// atomically committed drafts, controller flow, frozen combat playback and progress.
namespace SpriteKind {
    export const ApocActor = SpriteKind.create()
    export const ApocObserver = SpriteKind.create()
    export const ApocStation = SpriteKind.create()
    export const ApocTargetMarker = SpriteKind.create()
}
namespace apocWorld {
    const LIMIT = 10
    const TRACK_X = [70, 150, 230, 310, 390]
    let begun = false
    let busy = false
    let invoking = false
    let generation = 0
    let playing = false
    let lastTick = 0
    let tracePos = 0
    let selectedRoom = 1
    let selectedVariant = 1
    let progress: apocTypes.Progress = null
    let roomSpec: apocTypes.RoomSpec = null
    let initial: apocTypes.TrialSnapshot = null
    let trial: apocTypes.TrialSnapshot = null
    let display: apocTypes.TrialSnapshot = null
    let draft: apocTypes.TrialSnapshot = null
    let actors: Sprite[] = []
    let observer: Sprite = null
    let props: Sprite[] = []
    let allTarget: Sprite = null
    let handlers: (() => void)[] = []
    let staged: string[] = []
    let effectDraft: apocTypes.EffectEvent[] = []
    let records: apocTypes.StationRecord[] = []
    let callError = ""
    let activeStation = apocTypes.Station.Primary
    let recent = "Walk to a labeled station, press A; B opens menu"
    let recentEvent: apocTypes.TraceEvent = null
    let result: apocTypes.BattleResult = null
    let goal: apocTypes.GoalResult = null
    let menu = false
    let menuIndex = 0
    let roomPicker = false
    let pickerRoom = 1
    let lastAction = ""
    let resultingVictory = false
    let eraseConfirm = false
    let observerLockX = 70
    let motionLocked = false

    function copyStrings(a: string[]): string[] { let b: string[] = []; if (a) for (let i = 0; i < a.length; i++) b.push(a[i]); return b }
    function copyNumbers(a: number[]): number[] { let b: number[] = []; if (a) for (let i = 0; i < a.length; i++) b.push(a[i]); return b }
    function copySprites(a: Sprite[]): Sprite[] { let b: Sprite[] = []; if (a) for (let i = 0; i < a.length; i++) b.push(a[i]); return b }
    function active(): boolean { return invoking && busy && draft != null }
    function indexFor(room: apocTypes.Room, station: apocTypes.Station): number {
        if (room < 1 || room > 27 || (station != 1 && station != 2)) return -1
        return (room - 1) * 2 + station - 1
    }
    export function register(room: apocTypes.Room, station: apocTypes.Station, handler: () => void): void {
        const id = indexFor(room, station)
        if (id < 0) return
        while (handlers.length <= id) handlers.push(null)
        handlers[id] = handler // replaces current code; never invokes/caches a prior solution
    }
    function findActor(sprite: Sprite): apocTypes.ActorState {
        if (!trial || !sprite || sprite == allTarget) return null
        for (let i = 0; i < trial.actors.length; i++) if (trial.actors[i].sprite == sprite) return trial.actors[i]
        return null
    }
    function spriteFor(id: string): Sprite {
        if (id == "ALL" || id == "ALL_TARGET") return allTarget
        if (!trial) return null
        for (let i = 0; i < trial.actors.length; i++) if (trial.actors[i].id == id) return trial.actors[i].sprite
        return null
    }
    function permitted(name: string): boolean {
        if (!roomSpec) return false
        if (selectedRoom == 24) return name == "enemyMoves" // both stations, different ordered transformations
        if (selectedRoom == 27) return activeStation == apocTypes.Station.Secondary && name == "enemyMoves"
        for (let i = 0; i < roomSpec.editableLists.length; i++) if (roomSpec.editableLists[i] == name) return true
        return false
    }
    function allowedEffect(kind: string): boolean {
        if (!roomSpec) return false
        if (selectedRoom == 27) return activeStation == apocTypes.Station.Primary && kind == "hold"
        return kind == "hold" ? roomSpec.allowHold : roomSpec.allowBanish
    }
    function markStaged(name: string): void {
        for (let i = 0; i < staged.length; i++) if (staged[i] == name) return
        staged.push(name)
    }
    function reject(message: string): void { if (active() && !callError) callError = message }
    export function readMoves(side: apocTypes.Side): string[] {
        if (!active()) return []
        if (side == apocTypes.Side.Ally) return copyStrings(draft.lists.allyMoves)
        if (side == apocTypes.Side.Enemy) return copyStrings(draft.lists.enemyMoves)
        return []
    }
    export function readValues(side: apocTypes.Side): number[] {
        if (!active()) return []
        if (side == apocTypes.Side.Ally) return copyNumbers(draft.lists.allyValues)
        if (side == apocTypes.Side.Enemy) return copyNumbers(draft.lists.enemyValues)
        return []
    }
    export function readTargets(side: apocTypes.Side): Sprite[] {
        if (!active()) return []
        if (side == apocTypes.Side.Ally) return copySprites(draft.lists.allyTargets)
        if (side == apocTypes.Side.Enemy) return copySprites(draft.lists.enemyTargets)
        return []
    }
    export function readRoster(): Sprite[] { return active() ? copySprites(draft.roster) : [] }
    export function readSourceMoves(): string[] { return active() ? copyStrings(draft.sourceMoves) : [] }
    export function markedIndex(): number {
        if (!active() || !roomSpec) return -1
        return activeStation == apocTypes.Station.Primary ? roomSpec.primaryIndex : roomSpec.secondaryIndex
    }
    export function numberHint(): number { return active() && roomSpec ? roomSpec.numberHint : 0 }
    export function writeMoves(side: apocTypes.Side, list: string[]): void {
        if (!active()) return
        if (!list) { reject("Missing move array"); return }
        if (side == apocTypes.Side.Ally) { draft.lists.allyMoves = copyStrings(list); markStaged("allyMoves") }
        else if (side == apocTypes.Side.Enemy) { draft.lists.enemyMoves = copyStrings(list); markStaged("enemyMoves") }
        else reject("Unknown move side")
    }
    export function writeValues(side: apocTypes.Side, list: number[]): void {
        if (!active()) return
        if (!list) { reject("Missing value array"); return }
        if (side == apocTypes.Side.Ally) { draft.lists.allyValues = copyNumbers(list); markStaged("allyValues") }
        else if (side == apocTypes.Side.Enemy) { draft.lists.enemyValues = copyNumbers(list); markStaged("enemyValues") }
        else reject("Unknown value side")
    }
    export function writeTargets(side: apocTypes.Side, list: Sprite[]): void {
        if (!active()) return
        if (!list) { reject("Missing target array"); return }
        if (side == apocTypes.Side.Ally) { draft.lists.allyTargets = copySprites(list); markStaged("allyTargets") }
        else if (side == apocTypes.Side.Enemy) { draft.lists.enemyTargets = copySprites(list); markStaged("enemyTargets") }
        else reject("Unknown target side")
    }
    export function writeRoster(list: Sprite[]): void {
        if (!active()) return
        if (!list) { reject("Missing roster array"); return }
        draft.roster = copySprites(list)
        markStaged("roster")
    }
    export function writeSourceMoves(list: string[]): void {
        if (!active()) return
        if (!list) { reject("Missing reserve array"); return }
        draft.sourceMoves = copyStrings(list)
        markStaged("sourceMoves")
    }
    function effect(kind: string, actor: Sprite): void {
        if (!active()) return
        if (!allowedEffect(kind)) { reject(kind + " not allowed here"); return }
        const original = findActor(actor)
        if (!original || !original.present || original.hp <= 0) { reject("Not a current available actor Sprite"); return }
        for (let i = 0; i < draft.actors.length; i++) {
            if (draft.actors[i].sprite == actor) {
                if (kind == "hold") draft.actors[i].held = true
                else draft.actors[i].present = false
                let e = new apocTypes.EffectEvent()
                e.kind = kind
                e.actor = actor
                effectDraft.push(e)
                return
            }
        }
        reject("Effect actor missing")
    }
    export function hold(actor: Sprite): void { effect("hold", actor) }
    export function banish(actor: Sprite): void { effect("banish", actor) }

    function validStrings(a: string[]): boolean {
        if (!a || a.length > LIMIT) return false
        for (let i = 0; i < a.length; i++) if (typeof a[i] != "string") return false
        return true // unknown move names are intentional combat fizzles
    }
    function validValues(a: number[]): boolean {
        if (!a || a.length > LIMIT) return false
        for (let i = 0; i < a.length; i++) if (typeof a[i] != "number" || a[i] < 0 || a[i] > 9 || a[i] != Math.floor(a[i])) return false
        return true
    }
    function validSprites(a: Sprite[], allowAll: boolean): boolean {
        if (!a || a.length > LIMIT) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] == allTarget && allowAll) continue
            if (!findActor(a[i])) return false
        }
        return true
    }
    function same(a: any[], b: any[]): boolean {
        if (!a || !b || a.length != b.length) return false
        for (let i = 0; i < a.length; i++) if (a[i] != b[i]) return false
        return true
    }
    function edited(name: string): boolean {
        return name == "allyMoves" ? !same(trial.lists.allyMoves, draft.lists.allyMoves) :
            name == "enemyMoves" ? !same(trial.lists.enemyMoves, draft.lists.enemyMoves) :
            name == "allyValues" ? !same(trial.lists.allyValues, draft.lists.allyValues) :
            name == "enemyValues" ? !same(trial.lists.enemyValues, draft.lists.enemyValues) :
            name == "allyTargets" ? !same(trial.lists.allyTargets, draft.lists.allyTargets) :
            name == "enemyTargets" ? !same(trial.lists.enemyTargets, draft.lists.enemyTargets) :
            name == "roster" ? !same(trial.roster, draft.roster) : !same(trial.sourceMoves, draft.sourceMoves)
    }
    function validateDraft(): string {
        if (callError) return callError
        const names = ["allyMoves", "allyValues", "allyTargets", "enemyMoves", "enemyValues", "enemyTargets", "roster", "sourceMoves"]
        for (let i = 0; i < staged.length; i++) if (!permitted(staged[i])) return "Cannot write " + staged[i] + " at this station"
        for (let i = 0; i < names.length; i++) if (edited(names[i]) && !permitted(names[i])) return "Unauthorized " + names[i]
        const l = draft.lists
        if (!validStrings(l.allyMoves) || !validStrings(l.enemyMoves) || !validStrings(draft.sourceMoves)) return "Move/source must be <=10 strings"
        if (!validValues(l.allyValues) || !validValues(l.enemyValues)) return "Values must be integer 0..9 (<=10)"
        if (!validSprites(l.allyTargets, true) || !validSprites(l.enemyTargets, true)) return "Unknown target Sprite or >10 targets"
        if (!validSprites(draft.roster, false)) return "Roster must contain current Sprite references"
        return ""
    }
    function canVisitStation(station: apocTypes.Station): boolean {
        return !!roomSpec && (station == apocTypes.Station.Primary || (station == apocTypes.Station.Secondary && roomSpec.twoStations))
    }
    function interact(station: apocTypes.Station): void {
        if (busy || playing || menu || !trial) return
        if (!canVisitStation(station)) { recent = "No secondary station in R" + roomLabel(); return }
        const slot = indexFor(selectedRoom, station)
        if (slot < 0 || slot >= handlers.length || !handlers[slot]) {
            recent = "No current handler. Open R" + roomLabel() + " Recipe and add the block"
            return
        }
        busy = true
        const callGeneration = generation
        activeStation = station
        draft = apocCombat.cloneTrial(trial)
        staged = []
        effectDraft = []
        callError = ""
        invoking = true
        // The learner callback is required by contract to be synchronous/non-yielding.
        handlers[slot]()
        invoking = false
        if (callGeneration != generation) callError = "Trial changed during callback"
        const bad = validateDraft()
        if (bad) {
            recent = "Rejected: " + bad + "; previous lists kept"
        } else {
            let record = new apocTypes.StationRecord()
            record.station = station
            record.before = apocCombat.cloneTrial(trial)
            record.after = apocCombat.cloneTrial(draft)
            record.effects = effectDraft.slice()
            records.push(record)
            trial = apocCombat.cloneTrial(draft)
            display = apocCombat.cloneTrial(trial)
            // A fresh accepted edit supersedes the previous battle visualization.
            recentEvent = null
            lastAction = apocView.stationLabel(station == apocTypes.Station.Primary ? 0 : 1)
            result = null
            goal = null
            resultingVictory = false
            recent = selectedRoom == 24 && station == apocTypes.Station.Primary ? "The list shifted. Use Rewrite next, then Run." :
                selectedRoom == 27 && station == apocTypes.Station.Primary ? "Hazards held. Use Clear Wards next, then Run." :
                "Plan changed. Follow the glowing Run station to see the result."
        }
        draft = null
        effectDraft = []
        staged = []
        busy = false
    }
    function destroyActors(): void {
        // Remove every reference path before destroying any old Sprite.
        draft = null
        trial = null
        display = null
        initial = null
        roomSpec = null
        recentEvent = null
        result = null
        goal = null
        records = []
        effectDraft = []
        staged = []
        for (let i = 0; i < actors.length; i++) sprites.destroy(actors[i])
        actors = []
    }
    function build(room: number, variant: number): void {
        if (busy || playing) return
        generation++
        destroyActors()
        selectedRoom = room
        selectedVariant = variant
        roomSpec = apocRooms.spec(room, variant)
        if (!roomSpec || !roomSpec.battle) { recent = "Missing curated room setup R" + room; return }
        trial = new apocTypes.TrialSnapshot()
        trial.lists = new apocTypes.CombatLists()
        trial.actors = []
        const battle = roomSpec.battle
        for (let i = 0; i < battle.actors.length; i++) {
            const source = battle.actors[i]
            let sprite = sprites.create(apocArt.actor(source.artKey, source.side), SpriteKind.ApocActor)
            sprite.setFlag(SpriteFlag.Invisible, true)
            sprite.setFlag(SpriteFlag.Ghost, true)
            sprite.setPosition(0, 0)
            actors.push(sprite)
            let state = new apocTypes.ActorState()
            state.id = source.id; state.sprite = sprite; state.side = source.side
            state.hp = source.hp; state.maxHP = source.maxHP
            state.ability = source.ability; state.trait = source.trait
            state.present = source.present; state.held = source.held
            state.ward = source.ward; state.venom = source.venom; state.empower = source.empower
            trial.actors.push(state)
        }
        trial.lists.allyMoves = copyStrings(battle.allyMoves)
        trial.lists.allyValues = copyNumbers(battle.allyValues)
        trial.lists.enemyMoves = copyStrings(battle.enemyMoves)
        trial.lists.enemyValues = copyNumbers(battle.enemyValues)
        trial.lists.allyTargets = []
        trial.lists.enemyTargets = []
        trial.roster = []
        for (let i = 0; i < battle.allyTargetIDs.length; i++) trial.lists.allyTargets.push(spriteFor(battle.allyTargetIDs[i]))
        for (let i = 0; i < battle.enemyTargetIDs.length; i++) trial.lists.enemyTargets.push(spriteFor(battle.enemyTargetIDs[i]))
        for (let i = 0; i < roomSpec.rosterIDs.length; i++) trial.roster.push(spriteFor(roomSpec.rosterIDs[i]))
        trial.sourceMoves = copyStrings(roomSpec.sourceMoves)
        trial.goal = battle.goal
        trial.requiredIDs = copyStrings(battle.requiredIDs)
        if (props.length > 1) props[1].setFlag(SpriteFlag.Invisible, !roomSpec.twoStations)
        for (let i = 0; i < props.length; i++) props[i].setImage(apocArt.operation(apocView.stationIcon(i)))
        if (observer) observer.setPosition(TRACK_X[0], 353)
        initial = apocCombat.cloneTrial(trial)
        display = apocCombat.cloneTrial(trial)
        lastAction = ""
        recent = "Open Recipe R" + roomLabel() + ". Use the glowing station, then Run. B opens the menu."
        menu = false
        roomPicker = false
        playing = false
        eraseConfirm = false
    }
    function roomLabel(): string { return selectedRoom < 10 ? "0" + selectedRoom : "" + selectedRoom }
    function reset(): void { if (!busy && !playing) build(selectedRoom, selectedVariant) }
    function nextVariant(): void {
        if (!busy && !playing) build(selectedRoom, selectedVariant % 3 + 1)
    }
    function travel(to: number): void {
        if (busy || playing || !progress || to < 1 || to > progress.highestUnlocked) return
        build(to, 1)
        progress.resumeRoom = to
        apocSave.store(progress)
    }
    function doneWithTrace(): void {
        if (!playing) return
        playing = false
        if (result && result.finalActors && display) display.actors = result.finalActors.slice()
        if (resultingVictory) {
            const bit = 1 << (selectedRoom - 1)
            progress.completedMask |= bit
            // Unlock only the contiguous path actually earned, never grant skipped rooms.
            if (selectedRoom == progress.highestUnlocked && selectedRoom < 27) progress.highestUnlocked = selectedRoom + 1
            apocSave.store(progress)
            recent = selectedRoom == 27 ? "The expedition survived! All 27 list powers restored. B to revisit." : "Plan worked! The gate is open. Walk to Exit, or choose Continue in B."
        } else if (!result || result.status != "victory") {
            // A lost battle must remain visible even when the list task is also unfinished.
            recent = result ? "Battle " + result.status + ": Retry or Reset" : "Battle did not resolve"
        } else {
            recent = "Battle won. Finish the list task: " + (goal && goal.messages.length > 0 ? goal.messages[0] : "check the changed lists")
        }
    }
    function applyTrace(e: apocTypes.TraceEvent): void {
        if (!e || !display) return
        recentEvent = e
        if (e.target) {
            for (let i = 0; i < display.actors.length; i++) {
                const actor = display.actors[i]
                if (actor.sprite != e.target) continue
                if (e.hp >= 0) actor.hp = e.hp
                if (e.kind == "ward-set") actor.ward = e.mark
                else if (e.kind == "ward-consumed") actor.ward = null
                else if (e.kind == "venom-set") actor.venom = e.mark
                else if (e.kind == "venom-cleared") actor.venom = null
                else if (e.kind == "empower-set") actor.empower = e.mark
                else if (e.kind == "empower-used") actor.empower = null
                break
            }
        }
    }
    function skipTrace(): void {
        if (!playing || !result) return
        while (tracePos < result.trace.length) applyTrace(result.trace[tracePos++])
        doneWithTrace()
    }
    function run(): void {
        if (busy || playing || menu || !trial || !roomSpec) return
        busy = true
        // Do not leave an old cursor/mark on screen if validation rejects this run.
        recentEvent = null
        const frozen = apocCombat.cloneTrial(trial)
        const messages = apocCombat.validate(frozen, allTarget)
        goal = apocGoals.assess(roomSpec, apocCombat.cloneTrial(initial), apocCombat.cloneTrial(frozen), records.slice())
        if (messages.length > 0) {
            result = new apocTypes.BattleResult()
            result.status = "invalid"
            result.errors = messages.slice()
            recent = "Invalid combat: " + messages[0]
            display = apocCombat.cloneTrial(trial)
            busy = false
            return
        }
        result = apocCombat.resolve(frozen, allTarget) // exactly once; no learner handler
        resultingVictory = result.status == "victory" && goal.met
        tracePos = 0
        display = apocCombat.cloneTrial(frozen)
        recentEvent = null
        playing = true
        observerLockX = observer ? observer.x : TRACK_X[0]
        lastTick = control.millis()
        recent = "Watch your plan play once. A finishes the preview."
        busy = false
        if (!result.trace || result.trace.length == 0) doneWithTrace()
    }
    function useAction(n: number): void {
        if (busy || playing || eraseConfirm) return
        if (n == 0) interact(apocTypes.Station.Primary)
        else if (n == 1) interact(apocTypes.Station.Secondary)
        else if (n == 2) run()
        else if (n == 3 || n == 4) reset()
        else if (n == 5) nextVariant()
        else if (n == 6) {
            const completed = progress && (progress.completedMask & (1 << (selectedRoom - 1))) != 0
            if (completed && selectedRoom < 27) travel(selectedRoom + 1)
            else recent = selectedRoom == 27 && completed ? "The End - replay any earned room from B" : "EXIT locked: finish task AND win"
        } else if (n == 7) { roomPicker = true; pickerRoom = selectedRoom; observerLockX = observer ? observer.x : TRACK_X[0] }
        else if (n == 8) recent = "Open R" + roomLabel() + " Recipe in the SAME project; edit current handler"
        else if (n == 9) {
            eraseConfirm = true
            observerLockX = observer ? observer.x : TRACK_X[0]
            recent = "ERASE game progress? A confirm, B cancel"
        }
    }
    function stationAction(): void {
        if (!observer) return
        let nearest = 0
        let distance = 999
        for (let i = 0; i < TRACK_X.length; i++) {
            const delta = Math.abs(observer.x - TRACK_X[i])
            if (delta < distance) { nearest = i; distance = delta }
        }
        if (distance > 28) { recent = "Move near a labeled object (or press B)"; return }
        useAction(nearest == 0 ? 0 : nearest == 1 ? 1 : nearest == 2 ? 2 : nearest == 3 ? 3 : 6)
    }
    function menuUp(delta: number): void {
        if (roomPicker) { pickerRoom += delta; if (pickerRoom < 1) pickerRoom = 1; if (pickerRoom > progress.highestUnlocked) pickerRoom = progress.highestUnlocked }
        else if (menu) { menuIndex += delta; if (menuIndex < 0) menuIndex = 9; if (menuIndex > 9) menuIndex = 0 }
    }
    export function start(): void {
        if (begun) return
        begun = true
        progress = apocSave.load()
        allTarget = sprites.create(image.create(1, 1), SpriteKind.ApocTargetMarker)
        allTarget.setFlag(SpriteFlag.Invisible, true)
        allTarget.setFlag(SpriteFlag.Ghost, true)
        observer = sprites.create(apocArt.observer(), SpriteKind.ApocObserver)
        observer.setPosition(TRACK_X[0], 353)
        controller.moveSprite(observer, 105, 0)
        for (let i = 0; i < TRACK_X.length; i++) {
            let station = sprites.create(apocArt.station(i == 1 ? apocTypes.Station.Secondary : apocTypes.Station.Primary), SpriteKind.ApocStation)
            station.setPosition(TRACK_X[i], 341)
            station.setFlag(SpriteFlag.Ghost, true)
            props.push(station)
        }
        build(progress.resumeRoom, 1)
        if (apocSave.notice()) recent = apocSave.notice()
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (busy) return
            if (eraseConfirm) {
                eraseConfirm = false
                apocSave.clear()
                progress = apocSave.load()
                build(1, 1)
                recent = "Only Apocalyptic Lists progress was erased"
                return
            }
            if (playing) { skipTrace(); return }
            if (roomPicker) { roomPicker = false; menu = false; travel(pickerRoom); return }
            if (menu) {
                const selected = menuIndex
                menu = false
                useAction(selected)
                return
            }
            stationAction()
        })
        controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
            if (busy) return
            if (eraseConfirm) { eraseConfirm = false; recent = "Progress erase canceled"; return }
            if (playing) { skipTrace(); return }
            if (roomPicker) { roomPicker = false; return }
            menu = !menu
            if (menu) { menuIndex = 0; observerLockX = observer ? observer.x : TRACK_X[0] }
        })
        controller.up.onEvent(ControllerButtonEvent.Pressed, function () { menuUp(-1) })
        controller.down.onEvent(ControllerButtonEvent.Pressed, function () { menuUp(1) })
        controller.left.onEvent(ControllerButtonEvent.Pressed, function () { if (roomPicker) menuUp(-1) })
        controller.right.onEvent(ControllerButtonEvent.Pressed, function () { if (roomPicker) menuUp(1) })
        game.onUpdate(function () {
            if (observer) {
                const lock = menu || roomPicker || playing || busy || eraseConfirm
                if (lock != motionLocked) {
                    motionLocked = lock
                    controller.moveSprite(observer, lock ? 0 : 105, 0)
                }
                if (observer.x < 45) observer.x = 45
                if (observer.x > 435) observer.x = 435
                observer.y = 353
                observer.vy = 0
                if (menu || roomPicker || playing || busy || eraseConfirm) {
                    observer.vx = 0
                    observer.x = observerLockX
                }
            }
            if (playing && result && control.millis() - lastTick >= 180) {
                lastTick = control.millis()
                if (tracePos < result.trace.length) applyTrace(result.trace[tracePos++])
                if (tracePos >= result.trace.length) doneWithTrace()
            }
        })
        game.onPaint(function () { apocView.draw() })
    }
    // Read-only renderer bindings. Only apocWorld changes authoritative trial/progress.
    export function uiSpec(): apocTypes.RoomSpec { return roomSpec }
    export function uiInitial(): apocTypes.TrialSnapshot { return initial }
    export function uiTrial(): apocTypes.TrialSnapshot { return trial }
    export function uiDisplay(): apocTypes.TrialSnapshot { return display }
    export function uiRecords(): apocTypes.StationRecord[] { return records }
    export function uiResult(): apocTypes.BattleResult { return result }
    export function uiGoal(): apocTypes.GoalResult { return goal }
    export function uiProgress(): apocTypes.Progress { return progress }
    export function uiEvent(): apocTypes.TraceEvent { return recentEvent }
    export function uiNotice(): string { return recent }
    export function uiPlaying(): boolean { return playing }
    export function uiMenu(): boolean { return menu }
    export function uiEraseConfirm(): boolean { return eraseConfirm }
    export function uiMenuIndex(): number { return menuIndex }
    export function uiPicking(): boolean { return roomPicker }
    export function uiPickRoom(): number { return pickerRoom }
    export function uiRoom(): number { return selectedRoom }
    export function uiVariant(): number { return selectedVariant }
    export function uiSentinel(): Sprite { return allTarget }
    export function uiObserverX(): number { return observer ? observer.x : 70 }
    export function uiLastAction(): string { return lastAction }
    // Guide the physical interaction, without doing or grading the learner's edit.
    export function uiSuggestedStation(): number {
        if (playing) return -1
        if (result) return resultingVictory ? 4 : 3
        if (records.length == 0) return 0
        if (roomSpec && roomSpec.twoStations && records.length == 1 && records[0].station == apocTypes.Station.Primary) return 1
        return 2
    }
}

// SUPPLIED SOURCE learner-api.ts
//% color=#735AA6 block="Apocalyptic Lists" weight=85
namespace apocalypse {
    //% blockId=al_on_interact block="on room $room station $station" weight=100
    export function onInteract(room: apocTypes.Room, station: apocTypes.Station, handler: () => void): void {
        apocWorld.register(room, station, handler)
    }
    //% blockId=al_moves block="$side move list" weight=90
    export function moves(side: apocTypes.Side): string[] { return apocWorld.readMoves(side) }
    //% blockId=al_values block="$side value list" weight=89
    export function values(side: apocTypes.Side): number[] { return apocWorld.readValues(side) }
    //% blockId=al_targets block="$side target list" weight=88
    export function targets(side: apocTypes.Side): Sprite[] { return apocWorld.readTargets(side) }
    //% blockId=al_roster block="hazard roster" weight=87
    export function roster(): Sprite[] { return apocWorld.readRoster() }
    //% blockId=al_source_moves block="source move list" weight=86
    export function sourceMoves(): string[] { return apocWorld.readSourceMoves() }
    //% blockId=al_set_moves block="use $list as $side move list" weight=80
    export function setMoves(side: apocTypes.Side, list: string[]): void { apocWorld.writeMoves(side, list) }
    //% blockId=al_set_values block="use $list as $side value list" weight=79
    export function setValues(side: apocTypes.Side, list: number[]): void { apocWorld.writeValues(side, list) }
    //% blockId=al_set_targets block="use $list as $side target list" weight=78
    export function setTargets(side: apocTypes.Side, list: Sprite[]): void { apocWorld.writeTargets(side, list) }
    //% blockId=al_set_roster block="use $list as hazard roster" weight=77
    export function setRoster(list: Sprite[]): void { apocWorld.writeRoster(list) }
    //% blockId=al_set_source_moves block="use $list as reserve move list" weight=76
    export function setSourceMoves(list: string[]): void { apocWorld.writeSourceMoves(list) }
    //% blockId=al_hold block="hold $actor" weight=70
    export function hold(actor: Sprite): void { apocWorld.hold(actor) }
    //% blockId=al_banish block="banish $actor" weight=69
    export function banish(actor: Sprite): void { apocWorld.banish(actor) }
    //% blockId=al_marked_index block="marked index" weight=60
    export function markedIndex(): number { return apocWorld.markedIndex() }
    //% blockId=al_number_hint block="shown leading Wait count" weight=59
    export function numberHint(): number { return apocWorld.numberHint() }
}

// SUPPLIED SOURCE bootstrap.ts
// Loaded after learner main.ts: register current learner code before world startup.
apocWorld.start()
```
