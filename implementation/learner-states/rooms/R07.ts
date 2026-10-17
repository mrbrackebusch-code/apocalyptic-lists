// R07 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R07, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemyMoves.length) {
        enemyMoves.removeAt(markedIndex)
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})
