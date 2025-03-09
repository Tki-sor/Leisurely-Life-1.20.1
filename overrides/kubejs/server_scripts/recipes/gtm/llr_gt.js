ServerEvents.recipes(event => {
    // 筛子工厂
    event.shaped('llrcore:sifter_factory', [
        ['gtceu:tin_single_cable', 'gtceu:item_filter', 'gtceu:tin_single_cable'],
        ['gtceu:lv_electric_piston', 'gtceu:lv_machine_hull', 'gtceu:lv_electric_piston'],
        ['gtceu:lv_electric_motor', '#gtceu:circuits/lv', 'gtceu:lv_electric_motor']
    ])

    // 锻造工厂
    event.shaped('llrcore:hammer_factory', [
        ['gtceu:tin_single_cable', 'gtceu:lv_electric_motor', 'gtceu:tin_single_cable'],
        ['gtceu:lv_robot_arm', 'gtceu:lv_machine_hull', 'gtceu:lv_robot_arm'],
        ['gtceu:lv_electric_piston', '#gtceu:circuits/lv', 'gtceu:lv_electric_piston']
    ])

    // 武德之眼
    event.recipes.create.mechanical_crafting('llrcore:martial_morality_eye', [
        'ooxxxxxoo',
        'oabcccbao',
        'xabdcdbax',
        'xcbdcdbcx',
        'xcccecccx',
        'xcbdcdbcx',
        'xabdcdbax',
        'oabcccbao',
        'ooxxxxxoo'
    ], {
        o: 'gtceu:bronze_machine_casing',
        x: 'gtceu:lv_machine_casing',
        e: 'gtceu:hp_steam_rock_crusher',
        c: 'create:mechanical_drill',
        a: 'gtceu:lp_steam_rock_crusher',
        b: '#gtceu:circuits/ulv',
        d: 'create:shaft'
    })

    // 虚空采矿场 I
    event.recipes.gtceu.assembler('llrcore:void_miner_1' + getIncNum())
        .EUt(480)
        .duration(60 * 20)
        .itemInputs('gtceu:hv_miner', '4x gtceu:ultimet_frame', '4x #forge:plates/ultimet', '4x gtceu:hv_electric_motor', '4x gtceu:hv_sensor', '16x #forge:screws/stainless_steel')
        .itemOutputs('llrcore:void_miner_1')

    // 屠宰场
    event.shaped('llrcore:slaughter_house', [
        'aba',
        'bcb',
        'ddd'
    ], {
        a: 'gtceu:mv_robot_arm',
        b: '#gtceu:circuits/mv',
        c: 'gtceu:mv_machine_hull',
        d: 'darkutils:damage_plate_player'
    })

    // 量子操纵者
    event.recipes.gtceu.assembler('llrcore:quantum_force_transformer' + getIncNum())
        .EUt(480)
        .duration(640 * 20)
        .itemInputs('64x #forge:plates/stainless_steel', '32x #gtceu:circuits/hv', '16x gtceu:hv_electric_pump', '16x gtceu:hv_field_generator', '64x ae2:singularity', '16x gtceu:hv_electric_motor', '16x gtceu:mercury_barium_calcium_cuprate_hex_wire')
        .itemOutputs('llrcore:quantum_force_transformer')

    // 虚空集气室
    event.recipes.gtceu.assembler('llrcore:void_gas_collection_chamber' + getIncNum())
        .EUt(480)
        .duration(120 * 20)
        .itemInputs('8x gtceu:fluid_filter', '4x gtceu:hv_electric_pump', '4x #gtceu:electric_pistons', '16x gtceu:plascrete', '4x #gtceu:circuits/hv', '16x #forge:plates/kanthal')
        .itemOutputs('llrcore:void_gas_collection_chamber')

    // 燃料精炼厂
    event.shaped('llrcore:fuel_refining_factory', [
        'aba',
        'cdc',
        'aba'
    ], {
        a: '#forge:storage_blocks/black_steel',
        b: '#forge:frames/black_steel',
        c: 'gtceu:mv_electric_pump', 
        d: 'gtceu:mv_electric_motor'
    })

    // 蒸汽高炉
    event.shaped('llrcore:steam_blast_furnace', [
        'aba',
        'cdc',
        "aea"
    ], {
        a: '#forge:plates/bronze',
        b: '#gtceu:circuits/ulv',
        c: 'create:mechanical_pump',
        d: 'gtceu:primitive_blast_furnace',
        e: 'gtceu:bronze_gearbox'
    })
})
