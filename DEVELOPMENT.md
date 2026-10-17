# Maintain Apocalyptic Lists

The native Arcade tutorial starts directly from FIRST.md, or from the README.md introduction. FIRST and README install the supplied runtime and a blank starter. All 27 Recipes and their directory preserve the existing runtime and current learner program; they contain no runtime or starter template. Reinstalling tutorial.custom.ts during every Recipe transition caused overlapping package reload/typecheck errors.

Canonical supplied code is under implementation/. npm build recreates FIRST, README, the full Recipe route and the supplied runtime together. Learner references are under implementation/learner-states/ and are never installed as hidden solutions. Copy is under copy/, shared contracts/data under shared/, and actual instruction/gameplay media under assets/.

With Node.js, run npm run build to rebuild the project, Recipes and manifests; npm run check:learners verifies current reference algorithms against all three authored configurations. npm run check compares generated artifacts without writing. Source changes need actual Arcade compile, editable native Blocks and affected gameplay/media checks before a new release.

Tested editor: Arcade4.1.25 / PXT13.1.23. The older4.0.14 baseline is historical, not an unrun compatibility claim. Palette is applied in supplied config.ts as well as pxt.json because tutorial transport does not inherit package palette.

Conserve usage indefinitely: reuse coherent working methods and sufficient evidence, keep repairs together, and preserve complete quality.

The frozen return under shared/ records historical design inputs. In particular, shared/contracts.ts is historical; implementation/contracts.ts is the authoritative current runtime contract. Numeric enum values and internal block/function IDs remain stable while their learner-facing labels are clearer.
