# Apocalyptic Lists

### @explicitHints true

## Your code runs the room

Move the panda with the arrow keys. The chamber holds ten moment pads, read from top to bottom: allies act first at each moment, then enemies. A move icon, power number and target portrait show what each side will do. A Wait is a real move that does nothing; an empty move space means the move list has no entry there.

Use the simulator's expand button to see the chamber at full size. Walk beside a moment and press **A** to select it; press **B** there to watch that action. Watching lets you inspect the consequence without changing your lists or completing the room. Selection does not change the marked position supplied to your code.

Walk to the glowing physical altar and read its **Altar job** reminder. **B** beside the altar explains the list operation; **A** runs your current code for that altar. The room supplies the characters and battle rules. Your Blocks must do the altar's list work.

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

## Change a list, then release time

Each team has three independent lists: moves, powers and targets. Changing one does not carry the other two along. An inserted move pushes later moves toward later moments; a removed move pulls them toward earlier moments. Their powers and targets stay in place. In code, the first entry has index **0**; the chamber shows positions as moments rather than a numbered table.

An altar gives your code a copy of the requested list. Edit that copy, then put it into the matching **use … as … list** block. The pieces move to show the submitted change. A target or roster entry refers to an actual Sprite, which you can recognize by its portrait and name.

When your altar work is ready, walk to the **Release time** crystal at the top and press **A**. The plan plays from top to bottom, using your edited lists. Watch the outcome at the bottom. Completing the list task and winning the room opens the bottom **Exit** gate; walk there and press **A** to continue.

For help with the current setup, press **B** in open space, choose **Altar help + room strategy**, and press **A**. Turn pages with **Left / Right** for the operation explanation and the exact strategy for the setup you are playing; **B** returns. Reading help does not run your code. The native lightbulb hint also contains the complete Blocks program for comparison.

The hourglass changes animation speed when you press **A** beside it; walking speed stays the same. Set it before releasing time. From the B menu, **Retry this setup** starts the same setup again, **Try another setup** changes its arrangement, and **Revisit an unlocked room** returns to an earned room. 

The editor saves your program. Completed rooms, unlocks, the last room you travelled to and animation speed are remembered for this same MakeCode project in this browser. Open your saved project to resume; starting a new tutorial or project starts separate progress. If your code restarts, unfinished in-room list edits reset to the starting lists. Use your altar code again to make those changes.

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
