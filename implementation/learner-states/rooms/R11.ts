// R11 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R11, apocTypes.Station.Primary, function () {
    let hazardRoster: Sprite[] = apocalypse.roster()
    if (hazardRoster.length > 0) {
        let removed: Sprite = hazardRoster.shift()
        apocalypse.setRoster(hazardRoster)
        apocalypse.banish(removed)
    }
})
