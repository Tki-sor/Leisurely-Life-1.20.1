ServerEvents.recipes(event => {
    event.recipes.botania.terra_plate('llrcore:cobble_breaker', [
        'botania:manasteel_ingot', 'botania:quartz_lavender', '2x minecraft:amethyst_shard', 'botania:lens_mine'
    ], 1000)
    event.recipes.botania.terra_plate('llrcore:cobble_smasher', [
        'botania:manasteel_ingot', 'botania:quartz_lavender', '2x minecraft:amethyst_shard', 'botania:lens_damage'
    ], 1000)
})