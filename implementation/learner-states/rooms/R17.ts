// R17 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R17, apocTypes.Station.Primary, function () {
    let sourceMoves: string[] = apocalypse.sourceMoves()
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    if (sourceMoves.length > 0) {
        let removed: string = sourceMoves.pop()
        apocalypse.setSourceMoves(sourceMoves)
        allyMoves.push(removed)
        apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
    }
})
