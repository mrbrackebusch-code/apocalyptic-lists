// R18 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R18, apocTypes.Station.Primary, function () {
    let enemyValues: number[] = apocalypse.values(apocTypes.Side.Enemy)
    let allyValues: number[] = apocalypse.values(apocTypes.Side.Ally)
    let marked = apocalypse.markedIndex()
    if (marked >= 0 && marked < enemyValues.length) {
        let stolen: number = enemyValues.removeAt(marked)
        apocalypse.setValues(apocTypes.Side.Enemy, enemyValues)
        allyValues.push(stolen)
        apocalypse.setValues(apocTypes.Side.Ally, allyValues)
    }
})
