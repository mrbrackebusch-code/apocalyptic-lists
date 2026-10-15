// R15 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R15, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let i = 0; i <= enemyMoves.length - 1; i++) {
        if (enemyMoves[i] == "Ward") {
            enemyMoves[i] = "Wait"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})
