# Apocalyptic Lists — instructional source lineage

The selected teaching excerpts are real retained passages in the incoming Package 03 (`references/human/`). They motivate the **sequence of explanations** and not the game's custom operations. All combat fixtures, public before/after states, station interactions, actor hold/banish, and 480×360 media plans are new game adaptations governed by frozen `common/` inputs. Do not present game-specific commands as direct quotations of the course.

| Retained source | Selected original span | Used for | Distinction |
| --- | --- | --- | --- |
| `MCA-CSINTRO2-ARRAYS-INTRO`, `arcade-arrays-intro.md` | source lines 1–104 | R01–R10 introductions, 0-based cells, type, `length − 1`, `push` and random retrieval | Actual lesson works with numeric arrays; this game uses moves, values and actor references |
| `MCA-CSINTRO2-ARRAYS-STRING`, `arcade-arrays-strings-excerpts.md` | source lines 30–32, 74–106 | script-to-list teaching arc, indexed loop refactor, dynamic bound, `for ... of`, reverse | Original example was a princess dialogue script; enemy/ally scripts and stations are adaptations |
| `MCA-CSINTRO2-ARRAYS-SPRITES`, `arcade-arrays-sprites-excerpts.md` | retained foreach and random-selection variation | R02/R11/R13/R19/R22/R27 real Sprite identity, loop over every object, choose one object | Original lesson manipulates asteroid sprites, not Hold/Banish or combat target arrays |
| `1C-074/string-arrays.md`, `ap-csp-string-arrays-excerpts.md` | retained array operation reference and traversal questions | R05–R07/R12/R17/R18/R21/R23 operation semantics, changed lengths, index-based and value-based traversal | AP pseudocode may be 1-based, but MakeCode Arcade reference code here is **0-based**. AP does not prescribe this game's parallel traversal. |

## Precise adaptation gaps

The selected passages do **not** teach `indexOf` search-by-value as a complete worked lesson, the exact `shift`, `pop` and `removeAt` get-and-remove forms, combat list alignment, callback station order, per-list `set*` commit semantics or real-actor Hold/Banish; these are explicit room-specific adaptations. R25's paired inspection of two lists is **not** claimed as AP exam-required parallel traversal. The references teach a dynamic-length loop, but the native runtime can assess only the visible arrays/effects. Fixed-index and dynamically-derived correct results are therefore state-equivalent in some fixtures, by design.

## How scaffold support fades

R01–R08 offer worked concrete operations → R09–R14 guided retrieval, search and object effects → R15–R23 short guided/low-support combinations → R24–R27 independent multi-step combinations. The specific prerequisite and source spans for each of the 27 constructions are recorded in `copy/ROOM_TEACHING_MAP.json`. These sources presuppose students already know events, conditions and variables; they do not establish a complete beginner course in those prerequisites.

## Reused donor engineering pattern (not a teaching source)

`references/donors/farm-build.mjs` demonstrates explicit project assembly and a blank learner main. `farm-build-recipes.mjs` demonstrates separate canonical authoring and generated hints/media; `farm-build-states.mjs` demonstrates deterministic cumulative learner states; `farm-B01.ts` demonstrates native callback reference registration. This implementation adapts their working *separation of concerns*, replacing all Farm APIs/data/file order with the Apocalyptic Lists contract. The donor itself is not proof of Apocalyptic Lists behavior. Completed game-specific receipts retained in the authoring project now establish actual native compilation/decompilation (`validation/native-tutorial/RESULTS.json`), native same-project Recipe continuity and hints (`validation/tutorial-delivery/candidate/RESULTS.json`), and the 54 verified instructional media bindings (`generated/tutorial/MEDIA_BINDINGS.json`). These are engineering and informed editorial records, without human learner or classroom claims.
