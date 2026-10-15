// R26 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R26, apocTypes.Station.Primary, function () {
    let sourceMoves: string[] = apocalypse.sourceMoves()
    let allyMoves: string[] = []
    allyMoves = []
    let seenAttack = false
    let didHeal = false
    seenAttack = false
    didHeal = false
    for (let move of sourceMoves) {
        if (move == "Strike") {
            seenAttack = true
            allyMoves.push("Ward")
        } else if (seenAttack && !didHeal) {
            allyMoves.push("Mend")
            didHeal = true
        } else {
            allyMoves.push("Strike")
        }
    }
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})
