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
