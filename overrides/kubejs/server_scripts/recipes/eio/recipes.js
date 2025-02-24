ServerEvents.recipes(event => {
    // 导管粘合胚料
    event.remove({output: 'enderio:conduit_binder_composite'})
    event.shaped('enderio:conduit_binder_composite', [
        ['#minecraft:sand', '#forge:dusts/copper', '#forge:gravel'],
        ['#forge:dusts/invar', '#forge:dusts/porcelain', '#forge:dusts/lead'],
        ['#minecraft:sand', '#forge:dusts/electrum', '#forge:gravel']
    ])
})