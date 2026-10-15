# Maintain Apocalyptic Lists

The native Arcade tutorial starts directly from FIRST.md, or from the README.md introduction. All 27 Recipes and their directory carry the current supplied runtime, preserve the current learner program, and have no starter template. FIRST and README alone install a blank template.

Canonical supplied code is under implementation/. npm build recreates FIRST, README, the full Recipe route and the supplied runtime together. Learner references are under implementation/learner-states/ and are never installed as hidden solutions. Copy is under copy/, shared contracts/data under shared/, and actual instruction/gameplay media under assets/.

With Node.js, run npm run build to rebuild the project, Recipes and manifests; npm run check:learners verifies current reference algorithms against all three authored configurations. npm run check compares generated artifacts without writing. Source changes need actual Arcade compile, editable native Blocks and affected gameplay/media checks before a new release.

Tested editor: Arcade4.1.25 / PXT13.1.23. The older4.0.14 baseline is historical, not an unrun compatibility claim. Palette is applied in supplied config.ts as well as pxt.json because tutorial transport does not inherit package palette.

Conserve usage indefinitely: reuse coherent working methods and sufficient evidence, keep repairs together, and preserve complete quality.
