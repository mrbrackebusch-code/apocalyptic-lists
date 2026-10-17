// R01 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R01, apocTypes.Station.Primary, function () {
    let ourMoves: string[] = []
    ourMoves = []
    for (let index = 0; index <= apocalypse.numberHint() - 1; index++) {
        ourMoves.push("Wait")
    }
    ourMoves.push("Shield")
    ourMoves.push("Heal")
    ourMoves.push("Attack")
    ourMoves.push("Attack")
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
