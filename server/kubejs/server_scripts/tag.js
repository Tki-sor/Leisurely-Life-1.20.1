ServerEvents.tags("fluid", event => {
    event.add('forge:honey', ['growthcraft_apiary:honey_fluid_source'])
    
})

ServerEvents.tags("item", event => {
    // event.add('forge:dusts/coal', ['gtceu:charcoal_dust', 'gtceu:carbon_dust'])
    event.add('forge:ingots/red_alloy', ['botania:manasteel_ingot'])
    // event.add('forge:plates/rubber', ['gtceu:styrene_butadiene_rubber_plate', 'gtceu:silicone_rubber_plate'])
    event.add('forge:sawdust', ['createdieselgenerators:wood_chip', 'exdeorum:wood_chippings', 'excompressum:wood_chippings'])
    // event.add('createlowheated:burner_starters', ['tconstruct:flint_and_brick'])

    event.remove("forge:rods/iron", ["createaddition:iron_rod"])
    Ingredient.of('@exdeorum').itemIds.forEach(item => {
        let regex = /^(?!.*porcelain).*crucible/
        if (regex.test(item)) {
            event.remove('excompressum:wooden_crucibles', item)
        }
    })
    event.remove('forge:dusts/wood', ['thermal:sawdust'])
    event.remove("forge:ingots/steel", ['createmetallurgy:steel_ingot'])

    event.add('minecraft:tools', ['llrcore:cobble_breaker'])
    event.add('forge:tools/pickaxes', ['llrcore:cobble_breaker'])
    event.add('forge:dusts/nether_quartz', ['thermal:quartz_dust', 'mekanism:dust_quartz', 'enderio:powdered_quartz'])

    event.remove('forge:gems/certus_quartz', ['ae2:charged_certus_quartz_crystal'])
    event.remove('forge:glowstone', ['thermal:glowstone'])
})