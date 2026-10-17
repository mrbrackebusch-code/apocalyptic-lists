// R26 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R26, apocTypes.Station.Primary, function () {
    let reserveMoves: string[] = apocalypse.sourceMoves()
    let ourMoves: string[] = []
    ourMoves = []
    let seenAttack = false
    let didHeal = false
    seenAttack = false
    didHeal = false
    for (let move of reserveMoves) {
        if (move == "Attack") {
            seenAttack = true
            ourMoves.push("Shield")
        } else if (seenAttack && !didHeal) {
            ourMoves.push("Heal")
            didHeal = true
        } else {
            ourMoves.push("Attack")
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, ourMoves)
})
