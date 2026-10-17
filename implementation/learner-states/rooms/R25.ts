// R25 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R25, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    for (let index = 0; index <= ourMoves.length - 1; index++) {
        if (ourMoves[index] == "Wait" && enemyMoves[index] == "Attack") {
            ourMoves[index] = "Shield"
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
