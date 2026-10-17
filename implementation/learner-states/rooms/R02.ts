// R02 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R02, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    let markedIndex = apocalypse.markedIndex()
    if (markedIndex >= 0 && markedIndex < enemies.length) {
        let enemyToFreeze: Sprite = enemies[markedIndex]
        apocalypse.hold(enemyToFreeze)
    }
})
