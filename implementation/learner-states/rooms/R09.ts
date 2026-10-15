// R09 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R09, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    allyMoves.shift()
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
