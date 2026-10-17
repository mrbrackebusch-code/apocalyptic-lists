// R19 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R19, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    if (enemies.length > 0) {
        let randomIndex = randint(0, enemies.length - 1)
        let enemyToFreeze: Sprite = enemies[randomIndex]
        apocalypse.hold(enemyToFreeze)
    }
})
