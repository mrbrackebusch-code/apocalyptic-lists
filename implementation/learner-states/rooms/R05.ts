// R05 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R05, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    ourMoves.insertAt(apocalypse.markedIndex(), "Shield")
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
