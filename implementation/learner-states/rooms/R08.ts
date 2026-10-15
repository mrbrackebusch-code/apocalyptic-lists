// R08 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R08, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    if (allyMoves.length > 0) {
        allyMoves[allyMoves.length - 1] = "Strike"
        apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
    }
})
