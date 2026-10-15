// R01 isolated REFERENCE only. Not runtime starter or accepted-program cache.
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
