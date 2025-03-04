ServerEvents.recipes(event => {
    // 齿轮 板 铸模
    event.remove({output: 'tconstruct:gear_cast'})
    event.remove({output: 'tconstruct:plate_cast'})
    event.remove({input: 'tconstruct:gear_cast', not: {type: "minecraft:crafting_shaped"}})
    event.remove({input: 'tconstruct:plate_cast', not: {type: "minecraft:crafting_shaped"}})
    event.remove({output: '#tconstruct:casts/single_use/gear'})
    event.remove({input: '#tconstruct:casts/single_use/gear'})
    event.remove({output: '#tconstruct:casts/single_use/plate'})
    event.remove({input: '#tconstruct:casts/single_use/plate'})
})