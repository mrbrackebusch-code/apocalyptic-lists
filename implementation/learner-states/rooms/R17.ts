// R17 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R17, apocTypes.Station.Primary, function () {
    let reserveMoves: string[] = apocalypse.sourceMoves()
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    if (reserveMoves.length > 0) {
        let reserveMove: string = reserveMoves.pop()
        apocalypse.setSourceMoves(reserveMoves)
        ourMoves.push(reserveMove)
        apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
    }
})
