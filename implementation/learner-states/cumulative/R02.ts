// CUMULATIVE INSTRUCTIONAL REFERENCE ONLY; never automatically install as learner code.
// World progress belongs to supplied world settings; behavior belongs to the currently edited program.

apocalypse.onInteract(apocTypes.Room.R01, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = []
    ourMoves = []
    for (let index = 0; index <= apocalypse.numberHint() - 1; index++) {
        ourMoves.push("Wait")
    }
    ourMoves.push("Shield")
    ourMoves.push("Heal")
    ourMoves.push("Attack")
    ourMoves.push("Attack")
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})

apocalypse.onInteract(apocTypes.Room.R02, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemies.length) {
        let enemyToFreeze: Sprite = enemies[markedIndex]
        apocalypse.hold(enemyToFreeze)
    }
})
