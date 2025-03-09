// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded startup scripts)')
StartupEvents.registry("fluid", event => {
    event.create("soul").color(0xEE82EE)
})
StartupEvents.registry("item", event => {
    let addMesh = (mesh) => {
        event.create(`createsifter:${mesh}_mesh`, "createsifter:mesh")
            .parentModel("createsifter:block/meshes/mesh")
            .texture("mesh", `createsifter:item/${mesh}_mesh`)
    }
    let meshList = [
        "flint",
        "wrought_iron",
        "steel",
        "stainless_steel"
    ]

    meshList.forEach(mesh => {
        addMesh(mesh)
    })

    // event.create("advanced_mesh","createsifter:advanced_mesh")

})

StartupEvents.registry("block", event => {
    event.create('enriched_redstone_block')
})

const $EntityTravelToDimensionEvent = Java.loadClass("net.minecraftforge.event.entity.EntityTravelToDimensionEvent")
const $PortalSpawnEvent = Java.loadClass("net.minecraftforge.event.level.BlockEvent$PortalSpawnEvent")

NativeEvents.onEvent($PortalSpawnEvent, event => {
    event.setCanceled(true)
})

const $ItemTooltipEvent = Java.loadClass("net.minecraftforge.event.entity.player.ItemTooltipEvent")
const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
const $Component = Java.loadClass("net.minecraft.network.chat.Component")


NativeEvents.onEvent($ItemTooltipEvent,
    /**
     * @param {Internal.ItemTooltipEvent} event
     */
    event => {
        let stack = event.getItemStack()
        let registryName = $BuiltInRegistries.ITEM.getKey(stack.getItem())
        let item = registryName.toString()
        if (item == 'tiab:time_in_a_bottle') {
            // event.getToolTip().clear()
            // event.getToolTip().add($Component.literal("qwq"))

            let tooltipSize = event.getToolTip().size();
            if (tooltipSize > 0) {
                event.getToolTip().remove(tooltipSize - 1); // 删除最后一行
            }
        }

    })
