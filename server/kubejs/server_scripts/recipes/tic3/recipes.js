ServerEvents.recipes(event => {
    // 焦黑砖
    event.smelting('tconstruct:seared_brick', 'tconstruct:grout')

    //冶炼炉
    event.remove({ output: 'tconstruct:smeltery_controller' })
    event.shaped('tconstruct:smeltery_controller', [
        'aba',
        'b b',
        'aba'
    ], {
        a: 'tconstruct:seared_brick',
        b: 'tconstruct:seared_bricks'
    })

    // 焦黑排液孔
    event.remove({input: 'tconstruct:seared_drain'})
    event.remove({output: 'tconstruct:seared_drain'})
    event.shaped('tconstruct:seared_drain', [
        'a a',
        'a a',
        'a a'
    ], {
        a: 'tconstruct:seared_brick'
    })

    // 焦黑储罐
    event.remove({output: 'tconstruct:seared_fuel_tank'})
    event.shaped('tconstruct:seared_fuel_tank', [
        ' a ',
        'a a',
        ' a '
    ], {
        a: 'tconstruct:seared_bricks'
    })
})