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
    event.recipes.create.mechanical_crafting('llrcore:martial_morality_eye',[
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
})