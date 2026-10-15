// R19 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R19, apocTypes.Station.Primary, function () {
    let hazardRoster: Sprite[] = apocalypse.roster()
    if (hazardRoster.length > 0) {
        let randomIndex = randint(0, hazardRoster.length - 1)
        let selected: Sprite = hazardRoster[randomIndex]
        apocalypse.hold(selected)
    }
})
