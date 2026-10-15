// CUMULATIVE INSTRUCTIONAL REFERENCE ONLY; never automatically install as learner code.
// World progress belongs to supplied world settings; behavior belongs to the currently edited program.

apocalypse.onInteract(apocTypes.Room.R01, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = []
    allyMoves = []
    for (let i = 0; i <= apocalypse.numberHint() - 1; i++) {
        allyMoves.push("Wait")
    }
    allyMoves.push("Ward")
    allyMoves.push("Mend")
    allyMoves.push("Strike")
    allyMoves.push("Strike")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})

apocalypse.onInteract(apocTypes.Room.R02, apocTypes.Station.Primary, function () {
    let hazardRoster: Sprite[] = apocalypse.roster()
    let marked = apocalypse.markedIndex()
    if (marked >= 0 && marked < hazardRoster.length) {
        let selected: Sprite = hazardRoster[marked]
        apocalypse.hold(selected)
    }
})

apocalypse.onInteract(apocTypes.Room.R03, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let marked = apocalypse.markedIndex()
    if (marked >= 0 && marked < enemyMoves.length) {
        enemyMoves[marked] = "Wait"
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})

apocalypse.onInteract(apocTypes.Room.R04, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    allyMoves.push("Strike")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})

apocalypse.onInteract(apocTypes.Room.R05, apocTypes.Station.Primary, function () {
    let allyMoves: string[] = apocalypse.moves(apocTypes.Side.Ally)
    allyMoves.insertAt(apocalypse.markedIndex(), "Ward")
    apocalypse.setMoves(apocTypes.Side.Ally, allyMoves)
})

apocalypse.onInteract(apocTypes.Room.R06, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    enemyMoves.unshift("Wait")
    apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
})

apocalypse.onInteract(apocTypes.Room.R07, apocTypes.Station.Primary, function () {
    let enemyMoves: string[] = apocalypse.moves(apocTypes.Side.Enemy)
    let marked = apocalypse.markedIndex()
    if (marked >= 0 && marked < enemyMoves.length) {
        enemyMoves.removeAt(marked)
        apocalypse.setMoves(apocTypes.Side.Enemy, enemyMoves)
    }
})
