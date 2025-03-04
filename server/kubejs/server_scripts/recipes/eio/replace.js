// priority: 9000

ServerEvents.recipes(event => {
    // 红石合金块
    event.remove({ output: '#forge:storage_blocks/red_alloy' })
    // 红石合金锭 -> 红色合金锭
    event.remove({ output: 'enderio:redstone_alloy_ingot' })
    event.replaceInput({}, '#forge:ingots/redstone_alloy', '#forge:ingots/red_alloy')
})