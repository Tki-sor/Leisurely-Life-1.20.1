
// let $RealisticTorchBlock = Java.loadClass('com.chaosthedude.realistictorches.blocks.RealisticTorchBlock')

// BlockEvents.rightClicked(event => {
//     let burntime = event.getBlock().getBlockState().getValue($RealisticTorchBlock.getBurnTime())
//     event.player.displayClientMessage(`剩余燃烧时间 ${burntime} 分钟`, true)

// })

PlayerEvents.loggedIn(event => {
    event.player.sendSystemMessage(`欢迎游玩遗忘之海整合包，当前为§c开发版§f，不代表最终品质。`)
})



ItemEvents.foodEaten("minecraft:apple", event => {
    event.player.give('growthcraft_apples:apple_seeds')
})

BlockEvents.broken(event => {
})

ServerEvents.loaded(event => {
    if (!event.server.persistentData.getBoolean("tweakRules")) {
        event.server.gameRules.set("keepInventory", true)
        event.server.gameRules.set("doInsomnia", false)
        event.server.persistentData.putBoolean("tweakRules", true)
    }

})

// let a = 0
// PlayerEvents.tick(event => {
//     event.player.sendSystemMessage(a)
//     a++
// })

let $FluidTags = Java.loadClass("net.minecraft.tags.FluidTags")
BlockEvents.rightClicked("exdeorum:stone_barrel", event => {
    let block = event.getBlock()
    let pos = block.getPos()
    let blockEntity = block.getEntity()
    let tank = blockEntity.getTank()
    let level = event.getLevel()

    let hasFullWater = (tank.getFluid().getFluid().is($FluidTags.WATER) && tank.getFluidAmount() >= 250)

    // if (hasFullWater) {
    //     block.setEntityData({
    //         tank: {
    //             FluidName: "minecraft:water",
    //             Amount: block.getEntityData().getCompound("tank").getInt("Amount") - 250
    //         }
    //     })
    //     block.entity.markUpdated()
    // }



    // event.level.runCommandSilent(`summon minecraft:blaze ${pos.x} ${pos.y+1} ${pos.z}`)
})