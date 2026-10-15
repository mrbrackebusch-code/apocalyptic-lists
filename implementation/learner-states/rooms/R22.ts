// R22 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R22, apocTypes.Station.Primary, function () {
    let enemyTargets: Sprite[] = apocalypse.targets(apocTypes.Side.Enemy)
    let marked = apocalypse.markedIndex()
    if (marked >= 0 && marked < enemyTargets.length) {
        let selected: Sprite = enemyTargets.removeAt(marked)
        enemyTargets.unshift(selected)
        apocalypse.setTargets(apocTypes.Side.Enemy, enemyTargets)
    }
})
