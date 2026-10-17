// R16 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R16, apocTypes.Station.Primary, function () {
    let reserveMoves: string[] = apocalypse.sourceMoves()
    let ourMoves: string[] = []
    ourMoves = []
    for (let move of reserveMoves) {
        if (move == "Attack") {
            ourMoves.push("Shield")
        } else {
            ourMoves.push("Attack")
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
