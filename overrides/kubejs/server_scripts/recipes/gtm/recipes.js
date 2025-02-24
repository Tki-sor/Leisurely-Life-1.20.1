
ServerEvents.recipes(event => {
    let { gtceu } = event.recipes

    // 等级 材料 线缆材料
    let xv = [
        ['lv', 'steel', 'tin'],
        ['mv', 'aluminium', 'copper'],
        ['hv', 'stainless_steel', 'gold'],
        ['ev', 'titanium', 'aluminium']
    ]

    // 防腐木
    event.shaped('8x gtceu:treated_wood_planks', [
        'AAA',
        'ABA',
        'AAA'
    ], {
        A: '#minecraft:planks',
        B: Item.of('ceramicbucket:ceramic_bucket', '{Fluid:{Amount:1000,FluidName:"gtceu:creosote"}}').strongNBT()
    })
    event.recipes.create.filling('gtceu:treated_wood_planks', [Fluid.of("gtceu:creosote", 100), '#minecraft:planks'])
    event.recipes.create.mixing('gtceu:treated_wood_planks', [Fluid.of("gtceu:creosote", 100), '#minecraft:planks'])

    // 安山岩粉
    event.shapeless('gtceu:andesite_dust', ['minecraft:andesite', '#forge:tools/mortars'])
    // 瓷砖/粉
    event.smelting('gtceu:porcelain_ingot', 'exdeorum:porcelain_clay_ball')
    event.blasting('gtceu:porcelain_ingot', 'exdeorum:porcelain_clay_ball')
    event.shapeless('gtceu:porcelain_dust', ['gtceu:porcelain_ingot', '#forge:tools/mortars'])

    // 锻铁
    event.smelting('gtceu:wrought_iron_ingot', '#forge:ingots/iron')
    event.blasting('gtceu:wrought_iron_ingot', '#forge:ingots/iron')
    let wrought_ingot = [
        [Fluid.of('gtceu:wrought_iron', 144).toJson(), 'gtceu:wrought_iron_ingot', 15, 800],
        [Fluid.of('gtceu:wrought_iron', 16).toJson(), 'gtceu:wrought_iron_nugget', 2, 800],
        [Fluid.of('gtceu:wrought_iron', 144).toJson(), 'gtceu:wrought_iron_dust', 15, 800],
        [Fluid.of('gtceu:wrought_iron', 1296).toJson(), 'gtceu:wrought_iron_block', 45, 800],
    ]
    wrought_ingot.forEach((item) => {
        tic.melting(item[0], Item.of(item[1]).toJson(), item[2] * 4, item[3])
    })
    tic.casting_table(wrought_ingot[0][1], wrought_ingot[0][0], 'tconstruct:casts/multi_use/ingot', 3 * 20)
    tic.casting_table(wrought_ingot[1][1], wrought_ingot[1][0], 'tconstruct:casts/multi_use/nugget', 10)
    tic.casting_basin(wrought_ingot[3][1], wrought_ingot[3][0], 9 * 20)

    // 焦炉
    event.remove({ output: 'gtceu:coke_oven' })
    event.shaped('gtceu:coke_oven', [
        'AAA',
        'A A',
        'AAA'
    ], {
        A: 'gtceu:coke_oven_bricks'
    })

    // 压缩焦黏土
    event.remove({ id: "gtceu:macerator/macerate_compressed_coke_clay" })
    event.remove({ output: 'gtceu:compressed_coke_clay' })
    event.shaped('5x gtceu:compressed_coke_clay', [
        'AAA',
        'BCB',
        'BBB'
    ], {
        A: '#forge:ingots/clay',
        B: '#minecraft:sand',
        C: 'gtceu:brick_wooden_form'
    })

    // 覆膜印刷电路基板
    event.remove({ output: 'gtceu:resin_circuit_board' })
    event.remove({ output: 'gtceu:resin_printed_circuit_board' })
    event.shaped('gtceu:resin_printed_circuit_board', [
        'AAA',
        'BCB'
    ], {
        A: 'gtceu:copper_single_wire',
        B: 'gtceu:sticky_resin',
        C: 'gtceu:wood_plate'
    })

    // 电阻
    event.remove({ output: 'gtceu:resistor' })
    event.shaped('2x gtceu:resistor', [
        'ABA',
        'CDC',
        ' B '
    ], {
        A: 'gtceu:sticky_resin',
        B: '#forge:plates/paper',
        C: '#forge:fine_wires/copper',
        D: '#forge:dusts/coal'
    })
    event.shaped('2x gtceu:resistor', [
        'ABA',
        'CDC',
        ' B '
    ], {
        A: 'gtceu:sticky_resin',
        B: '#forge:plates/paper',
        C: 'gtceu:copper_single_wire',
        D: '#forge:dusts/coal'
    })

    // 酚醛树脂印刷电路基板
    event.remove({ output: 'gtceu:phenolic_printed_circuit_board' })
    event.remove({ output: 'gtceu:phenolic_circuit_board' })
    gtceu.assembler('gt:phenolic_printed_circuit_board_1')
        .EUt(30)
        .itemInputs('#forge:dusts/wood', '4x gtceu:silver_single_wire')
        .inputFluids('gtceu:glue 50')
        .itemOutputs('gtceu:phenolic_printed_circuit_board')
        .circuit(1)
        .duration(7.5 * 20)
    
    // ulv机器方块
    event.remove({ input: 'gtceu:ulv_machine_casing' })
    event.remove({ output: 'gtceu:ulv_machine_casing' })
    event.shaped('gtceu:ulv_machine_casing', [
        ' a ',
        'a a',
        ' a '
    ], {
        a: '#forge:plates/tin_alloy'
    })

    // ulv机器外壳
    event.remove({output: 'gtceu:ulv_machine_hull'})
    event.shaped('gtceu:ulv_machine_hull', [
        'aaa',
        'C C',
        'aaa'
    ], {
        a: '#forge:plates/tin_alloy',
        C: 'gtceu:red_alloy_single_cable'
    })

    // lv机器方块
    event.remove({ input: 'gtceu:lv_machine_casing' })
    event.remove({ output: 'gtceu:lv_machine_casing' })
    event.shaped('gtceu:lv_machine_casing', [
        ' a ',
        'a a',
        ' a '
    ], {
        a: '#forge:plates/wrought_iron'
    })

    // lv机器外壳
    event.remove({ output: 'gtceu:lv_machine_hull' })
    event.shaped('gtceu:lv_machine_hull', [
        'ABA',
        'C C',
        'ABA'
    ], {
        A: '#forge:plates/wrought_iron',
        B: '#forge:plates/steel',
        C: 'gtceu:tin_single_cable'
    })

    // xv传送带
    xv.forEach(level => {
        event.remove({ output: `gtceu:${level[0]}_conveyor_module` })
        event.shaped(`gtceu:${level[0]}_conveyor_module`, [
            'ABA'
        ], {
            A: `gtceu:${level[0]}_electric_motor`,
            B: 'create:belt_connector'
        })
    })

    // xv机械臂
    xv.forEach(level => {
        event.remove({ output: `gtceu:${level[0]}_robot_arm` })
        event.shaped(`gtceu:${level[0]}_robot_arm`, [
            'AAA',
            'BCB',
            'D  '
        ], {
            A: `gtceu:${level[2]}_single_cable`,
            B: `gtceu:${level[0]}_electric_motor`,
            C: `gtceu:${level[1]}_rod`,
            D: `gtceu:${level[0]}_electric_piston`
        })
    })

    // 蒸汽固体燃料锅炉
    event.remove({ output: 'gtceu:lp_steam_solid_boiler' })
    event.remove({ output: 'gtceu:hp_steam_solid_boiler' })
    event.shaped('gtceu:lp_steam_solid_boiler', [
        'AAA',
        'ABA',
        'CDC'
    ], {
        A: '#forge:plates/bronze',
        B: 'gtceu:steam_machine_casing',
        C: '#forge:storage_blocks/brick',
        D: 'minecraft:furnace'
    })
    event.shaped('gtceu:hp_steam_solid_boiler', [
        'AAA',
        'ABA',
        'ACA'
    ], {
        A: '#forge:plates/wrought_iron',
        B: 'gtceu:lp_steam_solid_boiler',
        C: 'gtceu:tin_alloy_small_fluid_pipe'
    })

    // 木齿轮
    event.replaceInput({ output: 'gtceu:wood_gear' }, 'gtceu:wood_plate', '#minecraft:planks')

    // 真空管
    event.shaped('gtceu:vacuum_tube', [
        ['gtceu:glass_tube'],
        ['mekanism:basic_control_circuit'],
        ['#forge:bolts/steel']
    ])

    // 硫
    event.recipes.gtceu.primitive_blast_furnace('gtceu:sulfur_dust_x0')
        .itemInputs('minecraft:coal')
        .itemOutputs('gtceu:coke_gem', Item.of('gtceu:tiny_sulfur_dust'))
        .duration(35 * 20)


    // 花岗岩粉
    event.shapeless('gtceu:small_granite_dust', ['minecraft:granite', '#forge:tools/mortars'])

    // 闪长岩粉
    event.shapeless('gtceu:small_diorite_dust', ['minecraft:diorite', '#forge:tools/mortars'])

    // 深板岩粉
    event.shapeless('gtceu:small_deepslate_dust', ['minecraft:cobbled_deepslate', '#forge:tools/mortars'])


    // 塑料印刷电路基板
    event.remove({ output: 'gtceu:plastic_printed_circuit_board' })
    event.recipes.gtceu.chemical_reactor('gtceu:plastic_printed_circuit_board_1')
        .EUt(30)
        .duration(30 * 20)
        .itemInputs('gtceu:plastic_circuit_board', '6x #forge:foils/copper')
        .itemOutputs('gtceu:plastic_printed_circuit_board')

    // 切割机（MV）
    event.replaceInput({output: 'gtceu:mv_cutter'}, 'gtceu:vanadium_steel_buzz_saw_blade', 'gtceu:steel_buzz_saw_blade')

    // 锡铁合金粉
    event.shapeless('gtceu:tin_alloy_dust', ['#forge:dusts/tin', '#forge:dusts/iron'])

})
