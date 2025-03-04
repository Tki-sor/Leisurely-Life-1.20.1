
ServerEvents.recipes(event => {
    const { create } = event.recipes
    let plateMap = [
        ['gtceu:iron_plate', 'minecraft:iron_ingot'],
    ]
    event.remove({ type: "create:pressing" })

    plateMap.forEach(plate => {
        create.sequenced_assembly([plate[0]], 
            Item.of(plate[1], 2),
            [
                create.pressing(plate[1], [plate[1]])
            ]
        )
        .transitionalItem(plate[1])
        .loops(3)
        // create.pressing(plate[0], [plate[1], plate[1]])
    })
})