// R24 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R24, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    enemyMoves.unshift("Wait")
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})

apocalypse.onInteract(apocTypes.Room.R24, apocTypes.Station.Secondary, function () {
    let shiftedMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < shiftedMoves.length) {
        shiftedMoves[markedIndex] = "Wait"
        apocalypse.setMoves(apocTypes.Side.Enemy, shiftedMoves)
    }
})
