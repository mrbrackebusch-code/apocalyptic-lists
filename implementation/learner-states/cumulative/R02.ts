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
