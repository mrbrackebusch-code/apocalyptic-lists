// R04 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    allyMoves.push("Strike")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
