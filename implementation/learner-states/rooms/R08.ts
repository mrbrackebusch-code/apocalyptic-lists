// R08 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R08, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    if (ourMoves.length > 0) {
        ourMoves[ourMoves.length - 1] = "Attack"
        apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
    }
})
