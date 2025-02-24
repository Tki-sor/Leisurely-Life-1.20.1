
ServerEvents.recipes(event => {
    event.remove({ id: "thermal:bronze_dust_4" })
    // event.remove({ type: 'minecraft:crafting_shapeless', output: '#forge:nuggets' })
    event.remove({ type: 'smelting', output: '#forge:nuggets' })
    Ingredient.of('@exdeorum').itemIds.forEach(item => {
        let regex = /^(?!.*porcelain).*crucible/
        if (regex.test(item)) {
            event.remove({ output: item })
        }
    })
    event.remove({ output: 'exdeorum:wooden_hammer' })
    event.remove({ output: 'exdeorum:compressed_wooden_hammer' })
    Ingredient.of('@excompressum').itemIds.forEach(item => {
        let regex = /compressed.*hammer/
        if (regex.test(item)) {
            event.remove({ output: item })
        }
    })
    event.remove({ output: '#excompressum:heavy_sieves' })
    event.remove({ mod: "utilitarian" })
    event.remove({ output: 'thermal:sawdust_block' })
    event.remove({ output: 'thermal:sawdust' })

    event.remove({id: /^thermal:parts\/.*_gear$/})
})

ServerEvents.tags("item", event => {
    event.remove('exdeorum:hammers', "exdeorum:wooden_hammer")
    event.remove('forge:ingots', [
        'minecraft:honeycomb',
        'minecraft:clay_ball'
    ])
    event.remove('exdeorum:compressed_hammers', ['exdeorum:compressed_wooden_hammer'])
    let removeAll = [
        // 'excompressum:compressed_hammers',
        // 'excompressum:hammers',
        'balm:ingots',
        'balm:iron_ingots',
        'balm:gems',
        'balm:emeralds',
        'balm:diamonds',
        'balm:gold_nuggets',
        'balm:nuggets',
        'balm:wooden_rods',
        'balm:iron_nuggets'
    ]
    removeAll.forEach(remove => event.removeAll(remove))

})