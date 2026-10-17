// R11 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R11, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    if (enemies.length > 0) {
        let removedEnemy: Sprite = enemies.shift()
        apocalypse.setRoster(enemies)
        apocalypse.banish(removedEnemy)
    }
})
