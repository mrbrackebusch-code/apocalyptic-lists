// R23 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R23, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let found = enemyMoves.indexOf("Ward")
    if (found >= 0) {
        enemyMoves.removeAt(found)
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})
