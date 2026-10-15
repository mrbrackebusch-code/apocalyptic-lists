// R25 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R25, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let i = 0; i <= allyMoves.length - 1; i++) {
        if (allyMoves[i] == "Wait" && enemyMoves[i] == "Strike") {
            allyMoves[i] = "Ward"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
