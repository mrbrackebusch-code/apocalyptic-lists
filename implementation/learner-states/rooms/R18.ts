// R18 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R18, apocTypes.Station.Primary, function () {
    let enemyPowers: number[] = apocalypse.values(apocTypes.Side.Enemy)
    let ourPowers: number[] = apocalypse.values(apocTypes.Side.Ally)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemyPowers.length) {
        let stolenPower: number = enemyPowers.removeAt(markedIndex)
        apocalypse.setValues(apocTypes.Side.Enemy, enemyPowers)
        ourPowers.push(stolenPower)
        apocalypse.setValues(apocTypes.Side.Ally, ourPowers)
    }
})
