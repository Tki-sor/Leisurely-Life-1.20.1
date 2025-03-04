
ServerEvents.recipes(event => {
    let { botania } = event.recipes

    // 魔力钢锭
    event.replaceInput({id: 'botania:mana_infusion/manasteel'}, '#forge:ingots/iron', '#forge:ingots/steel')

    // 活石
    event.replaceInput({id:'botania:pure_daisy/livingrock'}, 'minecraft:stone', 'minecraft:polished_diorite')
})