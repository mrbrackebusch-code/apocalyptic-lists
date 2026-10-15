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
