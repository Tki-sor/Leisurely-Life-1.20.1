ServerEvents.recipes(event => {
    // 导管粘合胚料
    event.remove({ output: 'enderio:conduit_binder_composite' })
    event.shaped('16x enderio:conduit_binder_composite', [
        ['#minecraft:sand', '#forge:dusts/copper', '#forge:gravel'],
        ['#forge:dusts/invar', '#forge:dusts/porcelain', '#forge:dusts/lead'],
        ['#minecraft:sand', '#forge:dusts/electrum', '#forge:gravel']
    ])

    // 破损的刷怪笼
    event.recipes.gtceu.assembler('enderio:broken_spawner' + getIncNum())
        .EUt(480)
        .duration(60 * 20)
        .itemInputs('4x enderio:z_logic_controller', '12x enderio:dark_steel_bars', '2x minecraft:nether_star', '2x gtceu:hv_sensor', '2x #gtceu:circuits/hv', '2x gtceu:hv_electric_motor')
        .itemOutputs('enderio:broken_spawner')
})