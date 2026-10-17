// R09 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R09, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    ourMoves.shift()
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
