

ServerEvents.recipes(event => {
    //安山合金
    event.remove({ id: "create:crafting/materials/andesite_alloy_from_block" })
    event.replaceInput({}, 'create:andesite_alloy', 'gtceu:andesite_alloy_ingot')
    event.replaceOutput({}, 'create:andesite_alloy', 'gtceu:andesite_alloy_ingot')
    event.replaceInput({}, "create:andesite_alloy_block", "gtceu:andesite_alloy_block")
    event.replaceOutput({}, "create:andesite_alloy_block", "gtceu:andesite_alloy_block")
    event.remove({ output: 'gtceu:andesite_alloy_ingot', type: "crafting_shaped" })
    event.remove({ output: 'gtceu:andesite_alloy_ingot', type: "create:mixing" })
    event.shapeless('4x gtceu:andesite_alloy_dust',
        ['gtceu:porcelain_dust', 'gtceu:zinc_dust', 'gtceu:andesite_dust']
    )
    event.smelting('gtceu:andesite_alloy_ingot', 'gtceu:andesite_alloy_dust')
    event.blasting('gtceu:andesite_alloy_ingot', 'gtceu:andesite_alloy_dust')


    // 机壳
    event.remove({ output: '#create:casing' })
    event.shaped("create:andesite_casing", [['#forge:plates/andesite_alloy'], ['#minecraft:planks']])
    event.shaped("create:brass_casing", [['#forge:plates/brass'], ['#forge:treated_wood']])
    event.shaped("create:railway_casing", [['#forge:plates/steel'], ["create:brass_casing"]])
    event.shaped("create:copper_casing", [['#forge:plates/copper'], ['#forge:treated_wood']])

    // 传动杆
    event.remove({ output: 'create:shaft' })
    event.shaped(Item.of('create:shaft', 2), [
        "A",
        "B"
    ], {
        A: '#forge:tools/saws',
        B: '#forge:ingots/andesite_alloy'
    })
    event.shapeless('create:shaft', ['#forge:ingots/andesite_alloy'])
    event.recipes.create.cutting(['2x create:shaft'], ['create:andesite_alloy'])

    // 齿轮
    event.remove({ output: 'create:cogwheel' })
    // event.shaped('create:cogwheel', [
    //     "A",
    //     "B",
    //     "C"
    // ], {
    //     A: '#forge:tools/hammers',
    //     B: 'create:shaft',
    //     C: '#forge:gears/wood'
    // })
    event.shaped('create:cogwheel', [
        "B",
        "C"
    ], {
        B: 'create:shaft',
        C: '#forge:gears/wood'
    })

    // 传送带
    event.remove({ output: 'create:belt_connector' })
    event.shaped('create:belt_connector', [
        "AAA",
        "AAA"
    ], {
        A: '#forge:foils/rubber'
    })
    event.shaped('create:belt_connector', [
        "ABA"
    ], {
        A: '#forge:plates/rubber',
        B: 'botania:manaweave_cloth'
    })
    event.shaped('create:belt_connector', [
        "AAA",
        "AAA"
    ], {
        A: '#forge:plates/rubber'
    })
    event.recipes.create.mixing('create:belt_connector', '9x gtceu:sticky_resin').heated()

    // 水车
    event.remove({ output: 'create:water_wheel' })
    event.shaped('create:water_wheel', [
        " A ",
        "CBC",
        " F "
    ], {
        A: 'create:shaft',
        B: 'create:andesite_casing',
        C: '#minecraft:planks',
        F: '#forge:rings/iron'
    })

    // 动力辊压机
    event.remove({ output: 'create:mechanical_press' })
    event.shaped('create:mechanical_press', [
        ['', 'create:shaft', ''],
        ['#forge:gears/iron', 'create:andesite_casing', '#forge:springs/iron'],
        ['', '#forge:double_plates/wrought_iron', '']
    ])

    // 动力搅拌器
    event.remove({ output: 'create:mechanical_mixer' })
    event.shaped('create:mechanical_mixer', [
        ['', 'create:cogwheel', ''],
        ['#forge:gears/iron', 'create:andesite_casing', '#forge:springs/iron'],
        ['', 'create:whisk', '']
    ])

    // 搅拌器
    event.remove({ output: 'create:whisk' })
    event.shaped('create:whisk', [
        " A ",
        "CBC",
        "CCC"
    ], {
        A: '#forge:tools/hammers',
        B: 'create:shaft',
        C: '#forge:plates/andesite_alloy'
    })

    // 溜槽
    event.remove({ output: 'create:chute' })
    event.shaped('create:chute', [
        "A A",
        "A A"
    ], {
        A: '#forge:plates/iron',
        // B: '#forge:tools/hammers'
    })

    // 工作盆
    event.remove({ id: 'create:crafting/kinetics/basin' })
    event.shaped('create:basin', [
        "A A",
        "AAA"
    ], {
        A: '#forge:plates/andesite_alloy'
    })

    // 手摇曲柄
    event.remove({ output: 'create:hand_crank' })
    event.shaped('create:hand_crank', [
        "A  ",
        "BBB",
        "  C"
    ], {
        A: 'create:cogwheel',
        B: '#minecraft:planks',
        C: 'create:shaft'
    })

    // 置物台
    event.remove({ output: 'create:depot' })
    event.shaped('create:depot', [['gtceu:andesite_alloy_plate'], ['create:andesite_casing']])

    // 扳手
    event.replaceInput({ output: 'create:wrench' }, '#forge:plates/gold', '#forge:plates/brass')

    // 动力锯
    event.remove({ output: 'create:mechanical_saw' })
    event.shaped('create:mechanical_saw', [
        " C ",
        "DBA",
        " C "
    ], {
        A: 'gtceu:iron_buzz_saw_blade',
        B: 'create:andesite_casing',
        C: 'create:shaft',
        D: '#forge:gears/iron'
    })

    // 动力泵
    event.replaceInput({ output: 'create:mechanical_pump' }, 'create:cogwheel', '#forge:gears/iron')

    // 动力筛子
    event.replaceInput({ output: "createsifter:sifter" }, 'create:andesite_casing', 'create:brass_casing')

    // 鼓风机
    event.remove({ output: 'create:encased_fan' })
    event.shaped('create:encased_fan', [
        "ABA",
        " C ",
        "ADA"
    ], {
        A: '#forge:plates/steel',
        B: 'create:shaft',
        C: 'create:andesite_casing',
        D: '#forge:rotors/iron'
    })

    // 动力钻头
    event.remove({ output: 'create:mechanical_drill' })
    event.shaped('create:mechanical_drill', [
        ' A ',
        'BCB',
        ' D '
    ], {
        A: 'gtceu:iron_drill_head',
        B: '#forge:plates/steel',
        C: 'create:andesite_casing',
        D: 'create:shaft'
    })

    // 动力臂
    event.remove({ output: 'create:mechanical_arm' })
    event.shaped('create:mechanical_arm', [
        'AAA',
        'B C'
    ], {
        A: '#forge:plates/brass',
        B: 'gtceu:lv_robot_arm',
        C: 'create:brass_casing'
    })

    // 石磨 锤配方
    event.remove({ id: 'create:milling/gravel' })
    event.recipes.create.milling(['minecraft:sand'], 'minecraft:gravel')
    event.recipes.create.milling(['exdeorum:dust'], 'minecraft:sand')

    // 粉碎轮
    event.remove({ output: 'create:crushing_wheel' })
    event.shaped('create:crushing_wheel', [
        'aba',
        'bcb',
        'aba'
    ], {
        a: '#forge:plates/wrought_iron',
        b: '#forge:double_plates/andesite_alloy',
        c: 'create:shaft'
    })

    // 大齿轮
    event.remove({ output: 'create:large_cogwheel' })
    event.shaped('create:large_cogwheel', [
        'aba',
        'cdc',
        'aca'
    ], {
        a: '#forge:screws/steel',
        b: 'create:shaft',
        c: '#minecraft:planks',
        d: '#forge:gears/wood'
    })
    // event.recipes.gtceu.assembler('create:large_cogwheel_1')
    //     .EUt(30)
    //     .duration(5 * 20)
    //     .itemInputs('16x #minecraft:planks', 'create:shaft', '4x #forge:screws/steel')
    //     .itemOutputs('create:large_cogwheel')

    // 转速控制器
    event.remove({ output: 'create:rotation_speed_controller' })
    event.recipes.gtceu.assembler('create:rotation_speed_controller' + getIncNum())
        .EUt(30)
        .duration(5 * 20)
        .itemInputs('#gtceu:circuits/ulv', 'create:brass_casing', 'gtceu:bronze_gear', 'create:shaft')
        .itemOutputs('create:rotation_speed_controller')
        
})