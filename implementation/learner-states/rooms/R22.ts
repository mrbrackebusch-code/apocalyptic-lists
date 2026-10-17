// R22 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R22, apocTypes.Station.Primary, function () {
    let enemyTargets: Sprite[] = apocalypse.targets(apocTypes.Side.Enemy)
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemyTargets.length) {
        let movedTarget: Sprite = enemyTargets.removeAt(markedIndex)
        enemyTargets.unshift(movedTarget)
        apocalypse.setTargets(apocTypes.Side.Enemy, enemyTargets)
    }
})
