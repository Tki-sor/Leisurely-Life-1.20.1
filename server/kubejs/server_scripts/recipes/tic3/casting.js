ServerEvents.recipes(event => {
    // 玻璃
    tic.melting(Fluid.of('gtceu:glass', 144).toJson(), Item.of('gtceu:glass_dust').toJson(), 20, 800)
    tic.casting_basin('minecraft:glass', Fluid.of('gtceu:glass', 144).toJson(), 60)
})