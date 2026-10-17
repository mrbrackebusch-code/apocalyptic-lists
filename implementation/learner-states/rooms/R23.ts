// R23 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R23, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let shieldIndex = enemyMoves.indexOf("Shield")
    if (shieldIndex >= 0) {
        enemyMoves.removeAt(shieldIndex)
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})
