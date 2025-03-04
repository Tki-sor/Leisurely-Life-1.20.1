
ServerEvents.recipes(event => {
    // 怪物风扇
    event.remove({output: 'mob_grinding_utils:fan'})
    event.shaped('mob_grinding_utils:fan', [
        'dbd',
        'aca',
        'ddd'
    ], {
        a: '#gtceu:circuits/ulv',
        b: 'gtceu:copper_single_wire',
        c: 'create:propeller',
        d: '#forge:plates/wrought_iron'
    })
})