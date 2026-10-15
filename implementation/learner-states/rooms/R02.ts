// R02 isolated REFERENCE only. Not runtime starter or accepted-program cache.
apocalypse.onInteract(apocTypes.Room.R02, apocTypes.Station.Primary, function () {
    let hazardRoster: Sprite[] = apocalypse.roster()
    let marked = apocalypse.markedIndex()
    if (marked >= 0 && marked < hazardRoster.length) {
        let selected: Sprite = hazardRoster[marked]
        apocalypse.hold(selected)
    }
})
