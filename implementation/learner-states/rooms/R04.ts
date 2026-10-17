// R04 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    ourMoves.push("Attack")
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
