// R16 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R16, apocTypes.Station.Primary, function () {
    let sourceMoves: string[] = apocalypse.sourceMoves()
    let allyMoves: string[] = []
    allyMoves = []
    for (let move of sourceMoves) {
        if (move == "Strike") {
            allyMoves.push("Ward")
        } else {
            allyMoves.push("Strike")
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
