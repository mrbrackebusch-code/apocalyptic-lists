// R15 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R15, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let index = 0; index <= enemyMoves.length - 1; index++) {
        if (enemyMoves[index] == "Shield") {
            enemyMoves[index] = "Wait"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})
