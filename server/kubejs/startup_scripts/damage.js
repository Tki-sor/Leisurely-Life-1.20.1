
ItemEvents.modification(event => {
    let itemList = [
        // {item: 'exdeorum:stone_hammer', maxDamage: 64},
        // {item: 'exdeorum:iron_hammer', maxDamage: 176},
        // {item: "exdeorum:diamond_hammer", maxDamage: 1024},
        // {item: "exdeorum:netherite_hammer", maxDamage: 1536}
    ]

    itemList.forEach(itemObj => {
        event.modify(itemObj.item, item => {
            item.maxDamage = itemObj.maxDamage
        })
    })

})