// R21 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R21, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    let attackIndex = enemyMoves.indexOf("Attack")
    if (attackIndex >= 0 && attackIndex <= ourMoves.length) {
        ourMoves.insertAt(attackIndex, "Shield")
        apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
    }
})
