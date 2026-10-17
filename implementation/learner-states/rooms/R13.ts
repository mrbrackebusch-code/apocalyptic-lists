// R13 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R13, apocTypes.Station.Primary, function () {
    let enemies: Sprite[] = apocalypse.roster()
    for (let enemy of enemies) {
        apocalypse.hold(enemy)
    }
})
