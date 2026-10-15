# AL-IMPLEMENTATION-1.0 — shared implementation contract

2026-10-12. Conserve usage indefinitely: use these agreed seams and the supplied
fixtures, implement substantial complete outputs, and own ordinary repairs.
The owner transports packages to separate ChatGPT chats. The local game lead
integrates all returns directly. No coordinator, external messaging, publication,
art generation or art acquisition is part of these assignments.

## Authority and scope

Owner directions → this contract and ACCEPTANCE_CORRECTIONS.md → normalized
ROOM_DATA.json/ROOM_GOALS.json and final room source → retained references.
Rev4 combat is settled; resolve documentation ambiguity against its executable
fixtures without changing their HP, targets or moves. All nine refits are already
merged into the 81 starting configurations. Historical Rev2.1 and older versions
of refitted rooms are not implementation inputs. See INPUT_VERIFICATION.json for
the arithmetic checks actually run. No native compilation is claimed yet.

Target: retained MakeCode Arcade 4.0.14 / PXT 12.2.34, Static TypeScript namespaces,
device dependency only. Node `.mjs` is a separate build/tool environment. Use
ordinary typed arrays, classes/enums and native Arcade APIs. No runtime imports,
DOM, browser storage, React, async/await or npm engine. Native compile and editable
Blocks decompilation will be checked locally on return; external checks must say
not_run when unavailable. Do not infer a fresh public target version.

`contracts.ts` is a lead-owned source input copied unchanged to
`games/apocalyptic-lists/implementation/contracts.ts` on integration. It declares
exact shared types. Consumers may add private helpers inside their owned files;
do not redeclare shared classes, enum values or Sprite kinds. Public room numbers
and variants are **1-based**; array indices are **0-based**.

## Frozen ownership and seams

All paths below are relative to `games/apocalyptic-lists/`.

| Owner | Files / namespaces | Public signatures |
|---|---|---|
| Lead | `implementation/contracts.ts`, this contract | `apocTypes` types |
| Package 01 | `implementation/supplied-world/combat.ts` / `apocCombat` | `cloneTrial(value: apocTypes.TrialSnapshot): apocTypes.TrialSnapshot`; `validate(value: apocTypes.TrialSnapshot, allTarget: Sprite): string[]`; `resolve(value: apocTypes.TrialSnapshot, allTarget: Sprite): apocTypes.BattleResult` |
| Package 01 | `implementation/supplied-world/rooms.ts` / `apocRooms` | `spec(room: apocTypes.Room, variant: number): apocTypes.RoomSpec` |
| Package 01 | `implementation/supplied-world/goals.ts` / `apocGoals` | `assess(spec: apocTypes.RoomSpec, before: apocTypes.TrialSnapshot, after: apocTypes.TrialSnapshot, records: apocTypes.StationRecord[]): apocTypes.GoalResult` |
| Package 02 | `implementation/supplied-world/world.ts` / `apocWorld` | `start(): void`; `register(room: apocTypes.Room, station: apocTypes.Station, handler: () => void): void`; `readMoves(side: apocTypes.Side): string[]`; `readValues(side: apocTypes.Side): number[]`; `readTargets(side: apocTypes.Side): Sprite[]`; `readRoster(): Sprite[]`; `readSourceMoves(): string[]`; `writeMoves(side: apocTypes.Side, list: string[]): void`; `writeValues(side: apocTypes.Side, list: number[]): void`; `writeTargets(side: apocTypes.Side, list: Sprite[]): void`; `writeRoster(list: Sprite[]): void`; `writeSourceMoves(list: string[]): void`; `hold(actor: Sprite): void`; `banish(actor: Sprite): void`; `markedIndex(): number`; `numberHint(): number` |
| Package 02 | `implementation/learner-api.ts` / `apocalypse` | Native block wrappers below; delegate, never solve |
| Package 02 | `implementation/supplied-world/save.ts` / `apocSave` | `load(): apocTypes.Progress`; `store(value: apocTypes.Progress): void`; `clear(): void` |
| Package 02 | `implementation/supplied-world/art.ts` / `apocArt` | `actor(artKey: string, side: apocTypes.Side): Image` (24×24); `observer(): Image` (12×12); `station(kind: apocTypes.Station): Image` (16×16) |
| Package 02 | `implementation/supplied-world/view.ts` / `apocView` | Internal to Package02; renderer consumes snapshots/trace without changing outcome |
| Package 02 | `implementation/config.ts`, `implementation/bootstrap.ts` | One screen configuration, one supplied startup |
| Package 03 | `implementation/main.ts`, `implementation/learner-states/**`, `copy/**`, `tools/build.mjs`, `tools/build-recipes.mjs`, `tools/verify-learner-states.mjs`, `implementation/LEARNER_STATE_CATALOG.json` | Native reference learner programs, Recipes and deterministic assembly |

`spec` returns a fresh mutable object, deep-copying arrays/marks. Invalid room or
variant returns null and caller displays a setup error. `artKey` initially equals
actor ID; art mapping can later change independently of mechanics. `editableLists`
is an explicit whitelist; at most two combat dimension TYPES (move/value/target)
are editable per room, including both sides as specified. The roster/source are
teaching inputs, not new combat streams. R16/R26 sourceMoves mirrors the disclosed
read-only enemy move source; R17 is the writable reserve. R19's roster is two real
threat actors, not a predetermined random choice. Never use `metadata` as an
automatic learner result. In R24 the second station's marker is the authored
post-prepend index from ROOM_DATA.metadata, even if pressed first; wrong order
therefore has its actual wrong consequence. R14 exposes both marked swap cells
0 and 3 in the display, with the primary API marker 0.

## Learner API — exact blocks and semantics

Namespace `apocalypse`, native category name `Apocalyptic Lists`, color `#735AA6`.
These are supplied APIs. Learner reference programs use only these + native list,
variable, condition, arithmetic and loop blocks. Native list operations stay
learner-authored; do not introduce a custom insert/reverse/sort/solve block.

| Exported signature | Stable block ID | Block text |
|---|---|---|
| `onInteract(room: apocTypes.Room, station: apocTypes.Station, handler: () => void): void` | `al_on_interact` | `on room $room station $station` |
| `moves(side: apocTypes.Side): string[]` | `al_moves` | `$side move list` |
| `values(side: apocTypes.Side): number[]` | `al_values` | `$side value list` |
| `targets(side: apocTypes.Side): Sprite[]` | `al_targets` | `$side target list` |
| `roster(): Sprite[]` | `al_roster` | `hazard roster` |
| `sourceMoves(): string[]` | `al_source_moves` | `source move list` |
| `setMoves(side: apocTypes.Side, list: string[]): void` | `al_set_moves` | `use $list as $side move list` |
| `setValues(side: apocTypes.Side, list: number[]): void` | `al_set_values` | `use $list as $side value list` |
| `setTargets(side: apocTypes.Side, list: Sprite[]): void` | `al_set_targets` | `use $list as $side target list` |
| `setRoster(list: Sprite[]): void` | `al_set_roster` | `use $list as hazard roster` |
| `setSourceMoves(list: string[]): void` | `al_set_source_moves` | `use $list as reserve move list` |
| `hold(actor: Sprite): void` | `al_hold` | `hold $actor` |
| `banish(actor: Sprite): void` | `al_banish` | `banish $actor` |
| `markedIndex(): number` | `al_marked_index` | `marked index` |
| `numberHint(): number` | `al_number_hint` | `shown leading Wait count` |

`onInteract` registers/replaces exactly one current callback per room+station;
registration never invokes it. Extra unregistered stations cannot affect a room.
All getters return **detached array copies** of the current callback draft,
preserving actual Sprite references. All setters copy and replace precisely that
one draft list. Learners therefore get → native operations → explicit setter.
Constructing a new array (R01/R16/R26) also requires submitting it. A numeric or
Sprite transfer stages both setters in one invocation; no intermediate state is
graded. No zipper/padding/companion edits. One callback may read its earlier
staged submission. Roster edits never hold/banish actors automatically.

Physical A at the active station → make draft from current trial → invoke current
callback → validate permitted changes → atomically commit exact submitted state
and a StationRecord. Changes to held/present come only from accepted hold/banish
calls in that invocation. Hold suppresses all owned later casts; Banish sets world
presence false. Neither changes HP or other target references. Reject unknown,
other-room, ALL_TARGET or unavailable actor identity. Known dead actors can remain
referenced by lists, but are never eligible targets/casters. Read access does not
imply write permission. Wrong edits in an authorized list remain wrong and visible.

Callbacks are synchronous and non-yielding: no pause, fibers, controller binding
or game loop inside them. World has one busy guard and an invocation generation;
Run/Reset/travel cannot change that draft mid-call. Repeated station presses
invoke current code again on the current trial, unless playback/menu is active.
If handler missing, commit nothing, show `Open Rxx` cue; do not fabricate a result.
Out-of-context getters return empty arrays / index -1 / count 0; setters/effects
commit nothing. Over-capacity, invalid value (integer0..9), bad type/identity or
unauthorized edits reject the whole invocation visibly and preserve prior trial.
Missing lengths, unknown move strings, zero values and dead exact targets are
combat fizzles, not correction opportunities. Keep noncombat roster/source <=10.

## Battle, trace and observable completion

`cloneTrial` deep-copies owned arrays, actors and effect provenance; preserves
Sprite identity exactly. `resolve` never changes its input, Sprite state or UI.
It resolves the frozen submitted snapshot once and returns trace + final actors.
The single shared ALL_TARGET is supplied explicitly to both validation/resolution.
Do not allocate sentinel lookalikes or compare display labels. One noncombat
Sprite exists per world lifetime; its kind is `SpriteKind.ApocTargetMarker`.

Implement the exact rules in COMBAT_RULES.md and the supplied Python model. At
index i: pre-half status → ally Venom tick → status → ally action → status →
enemy Venom tick → status → enemy action → status. Loss/required-survivor loss
precedes enemy elimination. Max length of six lists sets pass length, <=10.
`survive_pass` does not end early merely because all enemies are absent. Check
starting/final loss even for N=0; the Python reference's empty-loop fallthrough
must not count an already-dead party as surviving. This boundary does not alter
any of the 513 authored fixture results.

Trace kinds must include `cursor`, `skip`, `action`, `damage`, `heal`, `ward-set`,
`ward-consumed`, `venom-set`, `venom-cleared`, `venom-tick`, `empower-set`,
`empower-used`, `leech`, `result`. Cursor carries current side/index/phase reason;
action carries caster/move. A target mutation carries target, hp when changed,
amount and mark where applicable. Result carries status in reason. Additional
private diagnostic kinds are allowed; Package02 ignores unknown kinds safely.
Emit action targeting as per-target events when several recipients need showing.
Damage/mark events identify the original Sprite references from the input.
Never add damage to actor potency stats. Marks derive from PowerSource references
to frozen numeric arrays, including nested bonus provenance. Round ALL base power
up before adding Empower. Freeze array inputs for the entire trace/playback.

`assess` checks only visible list relationships/actor state/real station records,
per ROOM_GOALS.json. Combat victory AND met visible objective earns completion.
Do not use choice labels, fake method witnesses, AST/source checks or a remembered
accepted program. Equivalent native programs with the same observable result can
pass; reference code and instruction still teach the intended native operation.
Wrong/partial combat wins with an unmet visible task remain incomplete. Do not
silently expose a hidden canonical answer to the runtime.

## World, controls, save and art seam

Screen 480×360, Arcade default 16-color palette. Package02 alone declares
`userconfig.ARCADE_SCREEN_WIDTH=480`, `ARCADE_SCREEN_HEIGHT=360` in config.ts.
It owns `SpriteKind.ApocActor`, `ApocObserver`, `ApocStation`, `ApocTargetMarker`
declarations in world.ts, initialized before creating any dependent Sprite.
ALL_TARGET is invisible/noncolliding/noncombat. Real actor Sprite identities
survive a trial and its playback; reset/new attempt can replace actors only after
clearing all prior arrays, queues, records and draft references together.

World creates three/four party portraits and 1..4 enemies from RoomSpec. Primitive
labeled placeholder art is sufficient for the initial return. All art factories
return fresh mutable images, no startup, controllers, persistence or combat.
Portraits 24×24, observer12×12, station16×16; centered anchors; collision belongs
to station proximity/world, not decorative portrait pixels. Final sourced monster
art is a later input via artKey; mechanics must work with these placeholders.

Show six mirrored columns and ten indexed rows simultaneously:
`enemy value | enemy move | enemy target | ally target | ally move | ally value`.
Keep full lists, lengths, missing-cell distinction, actor HP/maxHP, ability/trait,
markers, roster/reserve when used, and current task visible. Use concise labels
with a persistent readable legend; do not hide the teaching target behind paging
or hover. Display before/after changes and one-pass cursor playback. The list
area stays fixed while the observer moves in a compact, clearly marked station
area. Prove a proposed pixel layout in code; do not declare it tested from prose.

D-pad moves observer with short uncluttered distances; A invokes near marked
station, Run, Reset or unlocked Exit. B opens an accessible menu exposing those
same actions plus Retry, New Attempt, room select and Open Rxx cue. No timers,
precision maneuvers or danger while editing. Blink/color also have text/icon cues.
Retry/Reset restore the same authored variant, no learner reference solution.
New Attempt selects a different one of three variants, never immediate repeat.
R19's learner uses native random list retrieval; both candidates are fair. Run
never calls the learner automatically: it freezes current trial, assesses visible
task state, resolves and replays, then awards or offers a clear retry. Completion
unlocks next room/exit. All 27 rooms must remain distinct usable configurations.

Save one game-specific numeric key `al.progress.v1`:
`[1, highestUnlocked, resumeRoom, completedMask]`. Mask uses bits0..26. Validate
exact length, integers, version, bounds, resume<=highest; derive earned unlocks
consistently from bits. Missing/corrupt defaults visibly and safely; unknown future
version must not be overwritten silently. Save on earned completion and room
travel, not every frame. Trial Reset/Retry never clears earned progress. Explicit
progress reset clears this game's key only. Store no sprites, handlers, draft
lists, reference code or accepted-program cache. Resuming executes current code.

## Assembly and independent development

Package03 builds runtime in this order:
contracts.ts, config.ts, supplied-world/rooms.ts, combat.ts, goals.ts, art.ts,
save.ts, view.ts, world.ts, learner-api.ts, main.ts, bootstrap.ts.
`main.ts` registers learner callbacks; bootstrap makes the single start call
after main. APIs may register before world setup; no Sprite dependence at register.
Builder emits explicit pxt.json files, canonical supplied customts, blank starter,
27 Recipe resources and manifests. Reference solutions stay separate. Recipes
attach as overlays to the existing project; first-launch template semantics must
not overwrite current project/code. There is no assumed simulator-to-Recipe API.

All three assignments can start using this contract. If another package's code
is absent, use owned temporary **test** adapters outside runtime, declare the
boundary not_run, and still finish your files. Do not ship replacement peers or
make the owner shuttle drafts between chats. If a native constraint demands a
contract change, return the smallest precise proposed change + impacted callers
and continue independent work. The lead resolves it before integrating consumers.

Return complete files at exact destinations, a filled RETURN.json and succinct
checks/limits. Tools run in a chat sandbox can verify arithmetic/source/build
behavior; only the retained local toolchain establishes native Arcade/Blocks/UI.
