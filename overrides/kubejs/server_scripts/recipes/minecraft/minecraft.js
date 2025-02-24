
ServerEvents.recipes(event => {
    // let { createmetallurgy } = event.recipes
    // 木板
    event.forEachRecipe(
        {
            output: "#minecraft:planks",
            type: "create:cutting",
            input: "#minecraft:logs"
        }, recipe => {
            if (recipe.getOriginalRecipeIngredients().length > 1) return
            event.remove({ output: `${recipe.getOriginalRecipeResult().getId()}`, type: "create:cutting", input: `${recipe.getOriginalRecipeIngredients()[0].getFirst().getItem().getId()}` })
            event.recipes.create.cutting([Item.of(`${recipe.getOriginalRecipeResult().getId()}`, 3)],
                recipe.getOriginalRecipeIngredients())
        })

    // 木台阶
    Ingredient.of('#minecraft:wooden_slabs').itemIds.forEach(id => {
        // 提取出木头的种类
        const woodType = id.split(':')[1].split('_slab')[0]
        // 提取出是哪个mod的
        const mod = id.split(':')[0]
        event.remove({ input: `${mod}:${woodType}_planks`, output: id, id: /minecraft/i, type: 'crafting_shaped' })
        event.shaped(Item.of(id, 3), [
            'AAA'
        ], {
            A: `${mod}:${woodType}_planks`
        })
        event.recipes.create.cutting([Item.of(id, 2)], [`${mod}:${woodType}_planks`])

    })

    // 玻璃
    event.remove({ output: 'minecraft:glass', type: "smelting" })
    // createmetallurgy.melting(Fluid.of('gtceu:glass', 144), 'gtceu:glass_dust', 12 * 20, 'lowheated')
    // createmetallurgy.melting(Fluid.of('gtceu:glass', 144), 'minecraft:glass', 6 * 20, 'lowheated')
    // createmetallurgy.casting_in_basin('minecraft:glass', Fluid.of('gtceu:glass', 144), 6 * 20)

    // 高炉
    event.replaceInput({ output: 'minecraft:blast_furnace' }, '#forge:ingots/iron', '#forge:ingots/andesite_alloy')

    // 岩浆块
    event.custom({
        "type": "exdeorum:barrel_mixing",
        "fluid": "minecraft:lava",
        "fluid_amount": 1000,
        "ingredient": {
            "item": "minecraft:netherrack"
        },
        "result": "minecraft:magma_block"
    })

    // 床
    colorList.forEach(color => {
        event.remove({ output: `minecraft:${color}_bed` })
    })
    colorList.forEach(color => {
        event.shaped(Item.of(`minecraft:${color}_bed`, 1), [
            "AAA",
            "BBB",
            "CDC"
        ], {
            A: `minecraft:${color}_carpet`,
            B: '#minecraft:wooden_slabs',
            C: '#minecraft:wooden_fences',
            D: '#forge:tools/mallets'
        })
    })

    // 地毯
    colorList.forEach(color => {
        event.remove({ id: `minecraft:${color}_carpet` })
    })
    colorList.forEach(color => {
        event.shaped(Item.of(`minecraft:${color}_carpet`, 1), [
            "AA"
        ], {
            A: `minecraft:${color}_wool`
        })

        event.shaped(Item.of(`minecraft:${color}_carpet`, 3), [
            "AAB"
        ], {
            A: `minecraft:${color}_wool`,
            B: '#forge:tools/saws'
        })
    })

    // 染料
    colorList.forEach(color => {
        // 输出color对应的染料，输入color+1对应的染料
        if (colorList.indexOf(color) == colorList.length - 1) {
            event.recipes.botania.mana_infusion(`minecraft:${color}_dye`, `minecraft:${colorList[0]}_dye`, 500)
        } else {
            event.recipes.botania.mana_infusion(`minecraft:${color}_dye`, `minecraft:${colorList[colorList.indexOf(color) + 1]}_dye`, 500)
        }
    })

    // 黏土
    event.shapeless('4x minecraft:clay_ball', ['minecraft:clay'])
    event.shaped('minecraft:clay', [
        'AA',
        'AA'
    ], {
        A: 'minecraft:clay_ball'
    })

    // 木漏斗
    event.remove({ output: "woodenhopper:wooden_hopper" })
    event.shaped("woodenhopper:wooden_hopper", [
        "A A",
        "A A",
        " A "
    ], {
        A: '#minecraft:planks'
    })
    // 活塞
    event.remove({ type: 'gtceu:assembler', output: 'minecraft:piston' })
    event.remove({ type: 'minecraft:crafting_shaped', output: 'minecraft:piston' })
    event.shaped('minecraft:piston', [
        'AAA',
        'BCB',
        'BDB'
    ], {
        A: '#minecraft:planks',
        B: 'minecraft:cobblestone',
        C: '#forge:small_gears/iron',
        D: '#forge:plates/red_alloy'
    })

    // 剪刀
    event.remove({ output: 'minecraft:shears' })
    event.shaped('minecraft:shears', [' a', 'a '], {
        a: '#forge:plates/iron'
    })

    // 木桶
    event.remove({ output: 'minecraft:barrel' })
    event.shaped('minecraft:barrel', [
        'aba',
        'a a',
        'aba'
    ], {
        a: 'gtceu:treated_wood_planks',
        b: 'gtceu:treated_wood_slab'
    })

    // 箱子
    event.remove({ output: 'minecraft:chest' })
    event.shaped('minecraft:chest', [
        'TWT',
        'WFW',
        'TWT'
    ], {
        T: '#forge:treated_wood',
        W: '#minecraft:planks',
        F: '#forge:gems/flint'
    })

    // 下界岩
    event.recipes.gtceu.rock_breaker('minecraft:netherrack_1')
        .EUt(16)
        .duration(1 * 20)
        .notConsumable('minecraft:netherrack')
        .addDataString("fluidA", "minecraft:lava")
        .addDataString("fluidB", "exdeorum:witch_water")
        .itemOutputs('minecraft:netherrack')

    // 末地石
    event.recipes.gtceu.rock_breaker('minecraft:end_stone_1')
        .EUt(30)
        .duration(2 * 20)
        .notConsumable('minecraft:end_stone')
        .addDataString("fluidA", "minecraft:lava")
        .addDataString("fluidB", "tconstruct:molten_enderium")
        .itemOutputs('minecraft:end_stone')

    // 沙子
    event.recipes.gtceu.rock_breaker('minecraft:sand_1')
        .EUt(7)
        .duration(0.6 * 20)
        .notConsumable('minecraft:sand')
        .addDataString("fluidA", "tconstruct:molten_ender")
        .addDataString("fluidB", "exdeorum:witch_water")
        .itemOutputs('minecraft:sand')
})