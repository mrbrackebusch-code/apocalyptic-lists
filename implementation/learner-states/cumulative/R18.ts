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

apocalypse.onInteract(apocTypes.Room.R09, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    ourMoves.shift()
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})

apocalypse.onInteract(apocTypes.Room.R10, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    enemyMoves.pop()
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})

apocalypse.onInteract(apocTypes.Room.R11, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    if (enemies.length > 0) {
        let removedEnemy: Sprite = enemies.shift()
        apocalypse.setRoster(enemies)
        apocalypse.banish(removedEnemy)
    }
})

apocalypse.onInteract(apocTypes.Room.R12, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let shieldIndex = enemyMoves.indexOf("Shield")
    if (shieldIndex >= 0) {
        enemyMoves[shieldIndex] = "Wait"
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})

apocalypse.onInteract(apocTypes.Room.R13, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    for (let enemy of enemies) {
        apocalypse.hold(enemy)
    }
})

apocalypse.onInteract(apocTypes.Room.R14, apocTypes.Station.Primary, function () {
    let ourPowers: number[] = apocalypse.values(apocTypes.Side.Ally)
    let savedPower = ourPowers[0]
    ourPowers[0] = ourPowers[3]
    ourPowers[3] = savedPower
    apocalypse.setValues(apocTypes.Side.Ally, ourPowers)
})

apocalypse.onInteract(apocTypes.Room.R14, apocTypes.Station.Secondary, function () {
    let rolledPowers: number[] = apocalypse.values(apocTypes.Side.Ally)
    rolledPowers[0] = randint(4, 9)
    apocalypse.setValues(apocTypes.Side.Ally, rolledPowers)
})

apocalypse.onInteract(apocTypes.Room.R15, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let index = 0; index <= enemyMoves.length - 1; index++) {
        if (enemyMoves[index] == "Shield") {
            enemyMoves[index] = "Wait"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})

apocalypse.onInteract(apocTypes.Room.R16, apocTypes.Station.Primary, function () {
    let reserveMoves: string[] = apocalypse.sourceMoves()
    let ourMoves: string[] = []
    ourMoves = []
    for (let move of reserveMoves) {
        if (move == "Attack") {
            ourMoves.push("Shield")
        } else {
            ourMoves.push("Attack")
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})

apocalypse.onInteract(apocTypes.Room.R17, apocTypes.Station.Primary, function () {
    let reserveMoves: string[] = apocalypse.sourceMoves()
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    if (reserveMoves.length > 0) {
        let reserveMove: string = reserveMoves.pop()
        apocalypse.setSourceMoves(reserveMoves)
        ourMoves.push(reserveMove)
        apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
    }
})

apocalypse.onInteract(apocTypes.Room.R18, apocTypes.Station.Primary, function () {
    let enemyPowers: number[] = apocalypse.values(apocTypes.Side.Enemy)
    let ourPowers: number[] = apocalypse.values(apocTypes.Side.Ally)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemyPowers.length) {
        let stolenPower: number = enemyPowers.removeAt(markedIndex)
        apocalypse.setValues(apocTypes.Side.Enemy, enemyPowers)
        ourPowers.push(stolenPower)
        apocalypse.setValues(apocTypes.Side.Ally, ourPowers)
    }
})
