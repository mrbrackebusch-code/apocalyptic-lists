// R14 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R14, apocTypes.Station.Primary, function () {
    let allyValues: number[] = apocalypse.values(apocTypes.Side.Ally)
    let savedNumber = allyValues[0]
    allyValues[0] = allyValues[3]
    allyValues[3] = savedNumber
    apocalypse.setValues(apocTypes.Side.Ally, allyValues)
})
