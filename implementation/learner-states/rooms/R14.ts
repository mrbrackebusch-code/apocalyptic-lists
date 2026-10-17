// R14 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R14, apocTypes.Station.Primary, function () {
    let ourPowers: number[] = apocalypse.values(apocTypes.Side.Ally)
    let savedPower = ourPowers[0]
    ourPowers[0] = ourPowers[3]
    ourPowers[3] = savedPower
    apocalypse.setValues(apocTypes.Side.Ally, ourPowers)
})

apocalypse.onInteract(apocTypes.Room.R14, apocTypes.Station.Secondary, function () {
    let rolledPowers: number[] = apocalypse.values(apocTypes.Side.Ally)
    rolledPowers[0] = randint(4, 9)
    apocalypse.setValues(apocTypes.Side.Ally, rolledPowers)
})
