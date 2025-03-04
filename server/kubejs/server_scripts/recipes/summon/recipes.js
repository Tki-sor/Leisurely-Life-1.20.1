ServerEvents.recipes(event => {
    // 召唤祭坛
    event.shaped('summoningrituals:altar', [
        " b ",
        "aca",
        " d "
    ], {
        a: '#forge:plates/gold',
        b: 'minecraft:wither_skeleton_skull',
        c: 'minecraft:enchanting_table',
        d: '#minecraft:planks'
    })

    // 蜜蜂
    event.recipes.summoningrituals
        .altar('#minecraft:flowers')
        .input('botania:mana_diamond')
        .input('#forge:dusts/sugar')
        .input('minecraft:grass')
        .input('#minecraft:saplings')
        .mobOutput('minecraft:bee')
        .recipeTime(300)
        .dayTime('day')
        .weather('clear')

    // 烈焰人
    event.recipes.summoningrituals
        .altar('minecraft:blaze_powder')
        .input('minecraft:blaze_rod')
        .input('minecraft:blaze_rod')
        .input('minecraft:blaze_rod')
        .input('minecraft:blaze_rod')
        .mobOutput('minecraft:blaze')
        .recipeTime(200)
        .weather('clear')
})