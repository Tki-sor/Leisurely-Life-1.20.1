ServerEvents.recipes(event => {
    event.replaceInput({}, '#forge:circuits/basic', '#gtceu:circuits/ulv')
    event.replaceInput({}, '#forge:circuits/advanced', '#gtceu:circuits/lv')
    event.replaceInput({}, '#forge:circuits/elite', '#gtceu:circuits/mv')
    event.replaceInput({}, '#forge:circuits/ultimate', '#gtceu:circuits/hv')
    event.replaceInput({ mod: 'mekanism', type: 'minecraft:crafting_shaped' }, '#forge:ingots/osmium', '#forge:ingots/steel')

    event.remove({ output: /^mekanism:.*_factory$/ })

    // 富集红石 灌注
    event.remove({ id: 'mekanism:infusion_conversion/redstone/from_enriched' })
    event.recipes.mekanism.infusion_conversion('#mekanism:enriched/redstone', '40x mekanism:redstone')

    // 富集钻石 灌注
    event.remove({ id: 'mekanism:infusion_conversion/diamond/from_enriched' })
    event.recipes.mekanism.infusion_conversion('#mekanism:enriched/diamond', '40x mekanism:diamond')

    // 富集碳 灌注
    event.remove({ id: "mekanism:infusion_conversion/carbon/from_enriched" })
    event.recipes.mekanism.infusion_conversion('#mekanism:enriched/carbon', '40x mekanism:carbon')

    // 基础控制电路
    event.remove({ id: 'mekanism:control_circuit/basic' })
    event.recipes.mekanism.metallurgic_infusing('2x mekanism:basic_control_circuit', 'gtceu:vacuum_tube', '160x mekanism:redstone')

    // 纸箱
    event.remove({ output: 'mekanism:cardboard_box' })
    event.shaped('mekanism:cardboard_box', [
        'aaa',
        'a a',
        'aaa'
    ], {
        a: 'gtceu:wood_dust'
    })

    // 灌注合金
    event.remove({ output: "mekanism:alloy_infused" })
    event.recipes.mekanism.metallurgic_infusing('mekanism:alloy_infused', '#forge:ingots/red_alloy', '160x mekanism:redstone')

    // 强化合金
    event.remove({ output: 'mekanism:alloy_reinforced' })
    event.recipes.mekanism.metallurgic_infusing('mekanism:alloy_reinforced', 'gtceu:menril_alloy_ingot', '80x mekanism:diamond')

    // 高级控制电路
    event.remove({ output: 'mekanism:advanced_control_circuit' })
    event.shaped('2x mekanism:advanced_control_circuit', [
        'aba',
        'cdc',
    ], {
        a: '#gtceu:resistors',
        b: '#gtceu:circuits/lv',
        c: 'gtceu:energetic_alloy_single_wire',
        d: 'gtceu:resin_printed_circuit_board'
    })

    // 精英控制电路
    event.remove({ output: 'mekanism:elite_control_circuit' })

    // 终极控制电路
    event.remove({ output: 'mekanism:ultimate_control_circuit' })

    // 基础流体储罐
    event.replaceInput({ output: 'mekanism:basic_fluid_tank' }, '#forge:ingots/iron', '#forge:plates/iron')

    // 高级流体储罐
    event.replaceInput({ output: 'mekanism:advanced_fluid_tank' }, '#forge:ingots/iron', '#forge:plates/steel')

    // 基础工厂安装器
    event.remove({ output: 'mekanism:basic_tier_installer' })
    event.shaped('mekanism:basic_tier_installer', [
        'aba',
        'cdc',
        'aba'
    ], {
        a: '#forge:ingots/red_alloy',
        b: '#gtceu:circuits/ulv',
        c: 'gtceu:tin_single_cable',
        d: 'gtceu:ulv_machine_hull'
    })

    // 热力发电机
    event.remove({ output: 'mekanismgenerators:heat_generator' })
    event.shaped('mekanismgenerators:heat_generator', [
        'aaa',
        'bcb',
        'ded'
    ], {
        a: '#forge:plates/tin_alloy',
        b: '#gtceu:circuits/ulv',
        c: 'gtceu:ulv_machine_hull',
        d: 'gtceu:tin_single_cable',
        e: 'minecraft:furnace'
    })

    // 风力发电机
    event.remove({ output: 'mekanismgenerators:wind_generator' }),
        event.shaped('mekanismgenerators:wind_generator', [
            ' a ',
            'bcb',
            'ded'
        ], {
            a: 'create:propeller',
            b: 'gtceu:tin_single_cable',
            c: '#gtceu:circuits/ulv',
            d: '#forge:plates/energetic_alloy',
            e: 'gtceu:lv_machine_hull'
        })

    // 冶金灌注机
    event.remove({ output: 'mekanism:metallurgic_infuser' })
    event.shaped('mekanism:metallurgic_infuser', [
        'aba',
        'cdc',
        'aba'
    ], {
        a: 'gtceu:tin_alloy_plate',
        b: 'minecraft:furnace',
        c: '#gtceu:circuits/ulv',
        d: 'gtceu:ulv_machine_hull'
    })

    // 钢制机壳
    event.remove({ output: 'mekanism:steel_casing' })
    event.shaped('mekanism:steel_casing', [
        'aba',
        'bcb',
        'aba'
    ], {
        a: 'gtceu:steel_plate',
        b: '#forge:glass',
        c: 'gtceu:ulv_machine_hull'
    })

    // 精密锯木机
    event.replaceInput({ output: 'mekanism:precision_sawmill' }, '#forge:alloys/advanced', 'gtceu:steel_buzz_saw_blade')

    // 电解核心
    event.replaceInput({ output: 'mekanism:electrolytic_core' }, '#forge:dusts/osmium', '#forge:dusts/coal')

    // 电动泵
    event.replaceInput({ output: 'mekanism:electric_pump' }, '#forge:ingots/osmium', '#forge:plates/bronze')

    // 锇锭
    event.remove({ id: 'mekanism:processing/osmium/ingot/from_dust_smelting' })
    event.remove({ id: 'mekanism:processing/osmium/ingot/from_dust_blasting' })
    event.remove({ id: 'mekanism:processing/osmium/storage_blocks/from_ingots' })

    // 能量立方
    event.remove({ output: 'mekanism:advanced_energy_cube' })
    event.remove({ output: 'mekanism:elite_energy_cube' })
    event.remove({ output: 'mekanism:ultimate_energy_cube' })

    // 化学品储罐
    event.remove({ output: 'mekanism:advanced_chemical_tank' })
    event.remove({ output: 'mekanism:elite_chemical_tank' })
    event.remove({ output: 'mekanism:ultimate_chemical_tank' })

    // 涡轮外壳
    event.remove({ output: 'mekanismgenerators:turbine_casing' })
    event.shaped('mekanismgenerators:turbine_casing', [
        ' a ',
        'aba',
        ' a '
    ], {
        a: '#forge:plates/steel',
        b: '#forge:ingots/steel'
    })

    // 涡轮外壳
    event.replaceInput({ output: 'mekanismgenerators:solar_panel' }, '#forge:ingots/osmium', '#forge:plates/steel')

    // 太阳能发电机
    event.replaceInput({ output: 'mekanismgenerators:solar_generator' }, '#forge:ingots/osmium', '#forge:plates/steel')

    // 燃气发电机
    event.replaceInput({ output: 'mekanismgenerators:gas_burning_generator' }, '#forge:ingots/osmium', '#forge:plates/steel')

    // 提纯仓
    event.remove({ output: 'mekanism:purification_chamber' })
    event.shaped('mekanism:purification_chamber', [
        'aba',
        'cdc',
        'aba'
    ], {
        a: 'mekanism:alloy_infused',
        b: '#gtceu:circuits/lv',
        c: '#forge:plates/steel',
        d: 'mekanism:enrichment_chamber'
    })

    // 速度升级
    event.replaceInput({ id: 'mekanism:upgrade/speed' }, '#forge:dusts/osmium', '#forge:dusts/bronze')

    // 原子合金
    event.replaceInput({}, '#forge:alloys/ultimate', 'gtceu:hv_robot_arm')

    // 原子合金
    event.remove({ output: 'mekanism:alloy_atomic' })
    event.recipes.gtceu.electric_blast_furnace('mekanism:alloy_atomic' + getIncNum())
        .EUt(640)
        .duration(60 * 20)
        .itemInputs('mekanism:alloy_reinforced', '8x gtceu:obsidian_dust')
        .itemOutputs('mekanism:alloy_atomic')

    // 强化黑曜石
    event.remove({ output: 'mekanism:ingot_refined_obsidian' })
    event.recipes.gtceu.electric_blast_furnace('mekanism:ingot_refined_obsidian' + getIncNum())
        .EUt(640)
        .duration(20 * 20)
        .itemInputs('#forge:ingots/stainless_steel', '4x gtceu:obsidian_dust')
        .itemOutputs('mekanism:ingot_refined_obsidian')
})
