LootJS.modifiers(event => {
    event.addEntityLootModifier("minecraft:wither")
    .randomChance(0.5)
    .addLoot('minecraft:netherite_upgrade_smithing_template')
})