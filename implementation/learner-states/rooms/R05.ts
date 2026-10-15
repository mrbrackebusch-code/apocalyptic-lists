// R05 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R05, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    allyMoves.insertAt(apocalypse.markedIndex(), "Ward")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
