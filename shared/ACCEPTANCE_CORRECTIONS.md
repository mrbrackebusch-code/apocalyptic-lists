# Observable room completion for the external implementation

This prepared contract changes how the game judges a submitted attempt. It does not change the Rev 4 combat rules, actor presets, numbers, targets, room jobs or curated variants. Preserve the returned archive and its historical reports as source evidence.

Conserve usage indefinitely: use the supplied contracts, fixtures and working examples; implement one coherent outcome; avoid duplicate investigations, broad unrelated audits and ceremonial tests. Never route work through Tutorial Production Coordinator.

## Authoritative inputs

Use the Stage 8B replacement contracts and fixture cases for R13, R15, R19, R20, R22, R23, R25, R26 and R27. Use the retained Stage 4–7 contracts and cases for the other 18 rooms. Earlier versions of the nine replaced rooms are historical input.

`ROOM_GOALS.json` gives 81 fully materialized visible goals, one for each room/variant. Its expected arrays were extracted from the correct saved final cases, with the nine replacements applied. R19 lists two permitted effect states for each variant. Actor strings and `ALL` are portable IDs: native code must bind each to the existing real Sprite or the one shared ALL sentinel and compare references by object identity. Display labels are never a substitute for a Sprite.

The integrated returned design master loses the full V1/V2 sections for R16, R17, R18 and R21. Their complete three-variant sections remain in `REV4_06_R15_R21_ROOM_CONTRACTS.md`; use the prepared corrected design and canonical fixtures for implementation. No combat rebalance is required to recover them.

## Game acceptance

Evaluate the task snapshot after the learner's current callback finishes and before combat changes HP or marks. Completion requires both the visible task and the published combat goal. Compare all six arrays, the room's teaching source, and its actual Hold/Banish effects against the selected variant goal. Protect actor properties and initial marks from learner edits. Reset restores the selected variant, teaching sources, actors, marks and current-trial history.

All list comparisons preserve type, length, order and every unaffected cell. A move edit cannot silently modify values or targets. Array replacement and an equivalent sequence of native edits receive the same result. The expected arrays define the visible puzzle outcome; they are checker data, never a replacement learner answer executed by the game.

The native room checker must not require strings such as `foreach-append`, `temp-swap`, `indexOf-Strike-then-insert`, `find-index-then-remove` or `indexed-condition-set`. In the Python model these strings are annotations attached to the named implementation choice. Native arrays do not report which source expression or block produced an element. Matching state cannot prove the use of a loop, a temporary variable, a dynamic bound, `indexOf`, or randomness.

Teach those methods explicitly in the Recipe and show the relevant before/after effects. Source/block review can assess the intended technique separately. A current variant that coincides with a literal index must still pass when its visible task is satisfied. New Attempt can expose a literal that stops working on another curated variant; no hidden forced rerun or unseen syntax gate is added.

Hold/Banish APIs provide genuine observable effects. They validate that the supplied object is a real current-room actor and record the actual actor affected. The game compares the affected identity set, not a callback's claim that it traversed the roster. Extra held or banished actors fail the task. R02 holds the marked actor while preserving the roster. R11 removes the first roster reference and banishes that actor. R13 and R27 hold every hazard without roster removal. R19 accepts either single threatRoster actor and preserves both source entries; the single visible outcome cannot prove that selection was random.

R16, R21 and R26 use the existing `enemyMoves` as their read-only source. The saved model's `source` copy is fixture bookkeeping; it does not require a seventh runtime combat list.

## R24: observable order

This room explicitly teaches two-station composition. It may check order because the host owns the station activations and can capture real states.

For the current trial capture Station 1's input/output list snapshots. Its input is the variant's initial state and its output is exactly `Wait` prepended to enemyMoves, with other lists unchanged. Capture Station 2 next: its input equals Station 1's output and its output equals the final expected lists after the shifted marked Strike becomes Wait. No guessed syntax labels are needed. An attempt that runs Station 2 first does not satisfy the published station sequence. Reset clears the history.

`ROOM_GOALS.json` supplies both intermediate boundaries. The saved model exports provide station IDs and primitive details, but not intermediate snapshots; native checking must collect them rather than pretending the historical export already proves this seam.

## What the saved case comparison actually showed

The accompanying verifier consumes saved JSON only. It does not import the supplied Python generators or rerun either combat resolver. Against the final 513 saved cases it checked all 81 goals and all 84 reference branches, including both R19 draws. Every reference branch still passes. Historical completion accepted 84 cases; observable completion accepts 102. The additional 18 have a formerly “wrong” label but satisfy the published visible result and already win combat:

| Cases | Count | Why they pass |
| --- | ---: | --- |
| R02 V1 hardcoded-zero; R08 V1 fixed-index; R12 V1 set-first and fixed-index | 4 | The chosen literal happens to address the correct current cell/actor. Historical task verdict was `null`. |
| R16 V1–V3 wrong-map | 3 | That branch produces exactly the same full counter list as the reference for the supplied Strike/Wait source vocabulary. |
| R21 V1 fixed-index; R23 V1 fixed-zero | 2 | The literal coincides with the required current index. |
| R19 V1–V3, both draws, hold-other | 6 | Either of the two actual threat actors is a permitted single Hold and both resulting battles succeed. |
| R25 V1–V2 fixed-six; R26 V2 fixed-six | 3 | These specific fixtures yield the exact complete result despite the hardcoded bound. Other variants can expose the bound. |

R25 V1 is a concrete example: both reference and fixed-six produce `Ward, Strike, Ward, Mend, Ward, Strike, Strike`, with the same six-array state and final HP. Rejecting one by its invented method label would invent evidence the native game does not have.

The comparison checks actor state from `final_world` where that export supplies it. Some final refit exports omit held/present state, so the adapter reconstructs those effects from actor-bearing saved effect records. That is a model-data check, not native Sprite identity proof. It also checks reported R24 station order, with the snapshot limitation described above. These results supersede the implication that all 429 historically named wrong cases must fail native room completion. They do not claim native runtime, UI, Blocks or learning validation.

Run the bounded check with Python 3 from any package location containing the saved-case directory:

```text
python verify_observable_goals.py --source-dir PATH_TO_RETURNED_REV4 --goals ROOM_GOALS.json
```

`--build` regenerates only the selected prepared goals file from canonical saved cases. Normal verification is read-only. Keep complete runtime checks local to the integration stage; externally unavailable MakeCode/Blocks checks are reported as `not_run`.
