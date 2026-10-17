// R27 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R27, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    for (let enemy of enemies) {
        apocalypse.hold(enemy)
    }
})

apocalypse.onInteract(apocTypes.Room.R27, apocTypes.Station.Secondary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let index = 0; index <= enemyMoves.length - 1; index++) {
        if (enemyMoves[index] == "Shield") {
            enemyMoves[index] = "Wait"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})
