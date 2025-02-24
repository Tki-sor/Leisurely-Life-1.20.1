
const $PropertyKey = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey')
const $OreProperty = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.OreProperty')
const $FluidPipeProperties = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidPipeProperties')
const $WireProperties = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.WireProperties')
const $ToolStats = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.ToolProperty')

GTCEuStartupEvents.registry('gtceu:material', event => {
    /**
     * GT元素材料com.gregtechceu.gtceu.common.data.materials.ElementMaterials
     */
    /**
     * event.create('material_name')
     * 方法来自com.gregtechceu.gtceu.api.data.chemical.material.Material
     * cableProperties(电压, 电阻, 电容, 是否超导, ^临界温度)
     */

    // 安山合金
    event.create('andesite_alloy')
        .ingot().dust()
        .color('0xa7ad9f').iconSet(GTMaterialIconSet.SHINY)
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .cableProperties(GTValues.V[GTValues.ULV], 1, 4, false)

    // 瓷
    event.create('porcelain')
        .ingot().dust()
        .color('0xdee8fb').iconSet(GTMaterialIconSet.SHINY)

    // 门瑞欧合金
    event.create('menril_alloy')
        .ingot().dust()
        .color('0x96a1d6').iconSet(GTMaterialIconSet.SHINY)
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .cableProperties(GTValues.V[GTValues.MV], 1, 2, false)

    // 充能合金锭
    event.create('energetic_alloy')
        .ingot().dust()
        .liquid()
        .components("1x redstone", "1x glowstone", "1x gold")
        .color('0xffcd59').iconSet(GTMaterialIconSet.BRIGHT)
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .cableProperties(GTValues.V[GTValues.LV], 2, 0, true)

    // 导电合金锭
    event.create('conductive_alloy')
        .ingot().dust()
        .liquid()
        .color('0xdab0aa').iconSet(GTMaterialIconSet.BRIGHT)
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .cableProperties(GTValues.V[GTValues.LV], 2, 2, true)

    // 脉冲合金锭
    event.create('pulsating_alloy')
        .ingot().dust()
        .liquid()
        .color('0x74c886').iconSet(GTMaterialIconSet.BRIGHT)
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .cableProperties(GTValues.V[GTValues.MV], 2, 0, true)
    
    


    // event.create('signalum')
    // .ingot()
    // .components('4x redstone', '1x silver', '3x copper')
    // .color(0xf04518).iconSet(GTMaterialIconSet.SHINY)
    // .flags(GTMaterialFlags.GENERATE_ROD,GTMaterialFlags.GENERATE_GEAR,GTMaterialFlags.GENERATE_SMALL_GEAR,GTMaterialFlags.GENERATE_BOLT_SCREW)

    // event.create('lumium')
    // .ingot()
    // .components('1x calcium', '2x fluorine', '1x silver', '1x tin')
    // .color(0xfce574).iconSet(GTMaterialIconSet.SHINY)
    // .flags(GTMaterialFlags.GENERATE_ROD,GTMaterialFlags.GENERATE_GEAR,GTMaterialFlags.GENERATE_SMALL_GEAR,GTMaterialFlags.GENERATE_BOLT_SCREW)

    // event.create('enderium')
    // // .cableProperties(GTValues.V[GTValues.ULV], 1, 0, true)
    // .ingot()
    // .components('1x ender_pearl', '1x silver', '1x coal')
    // .color(0x179eb0).iconSet(GTMaterialIconSet.BRIGHT)
    // .flags(GTMaterialFlags.GENERATE_ROD,GTMaterialFlags.GENERATE_GEAR,GTMaterialFlags.GENERATE_SMALL_GEAR,GTMaterialFlags.GENERATE_BOLT_SCREW)

    // GTMaterials.Wood.setProperty($PropertyKey.WIRE, new $WireProperties(GTValues.V[GTValues.ULV], 1, 0, true))
})
