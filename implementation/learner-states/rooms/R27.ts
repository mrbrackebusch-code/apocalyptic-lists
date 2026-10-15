// R27 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R27, apocTypes.Station.Primary, function () {
    let hazardRoster: Sprite[] = apocalypse.roster()
    for (let actor of hazardRoster) {
        apocalypse.hold(actor)
    }
})

apocalypse.onInteract(apocTypes.Room.R27, apocTypes.Station.Secondary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let i = 0; i <= enemyMoves.length - 1; i++) {
        if (enemyMoves[i] == "Ward") {
            enemyMoves[i] = "Wait"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})
