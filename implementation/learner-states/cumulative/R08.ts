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

apocalypse.onInteract(apocTypes.Room.R03, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemyMoves.length) {
        enemyMoves[markedIndex] = "Wait"
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})

apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    ourMoves.push("Attack")
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})

apocalypse.onInteract(apocTypes.Room.R05, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    ourMoves.insertAt(apocalypse.markedIndex(), "Shield")
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})

apocalypse.onInteract(apocTypes.Room.R06, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    enemyMoves.unshift("Wait")
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})

apocalypse.onInteract(apocTypes.Room.R07, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemyMoves.length) {
        enemyMoves.removeAt(markedIndex)
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})

apocalypse.onInteract(apocTypes.Room.R08, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    if (ourMoves.length > 0) {
        ourMoves[ourMoves.length - 1] = "Attack"
        apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
    }
})
