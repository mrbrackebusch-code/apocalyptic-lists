// R21 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R21, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    let found = enemyMoves.indexOf("Strike")
    if (found >= 0 && found <= allyMoves.length) {
        allyMoves.insertAt(found, "Ward")
        apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
    }
})
