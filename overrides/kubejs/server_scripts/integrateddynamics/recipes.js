
ServerEvents.recipes(event => {
    // 门瑞欧结晶碎片 -> 门瑞欧合金板
    event.replaceInput({}, 'integrateddynamics:crystalized_menril_chunk', '#forge:plates/menril_alloy')

    // 门山岩 -> 门瑞欧结晶块
    event.replaceInput({}, 'integratedscripting:mendesite', '#forge:storage_blocks/menril_alloy')

    // 门瑞欧玻璃 -> 玻璃
    event.replaceInput({}, 'integratedterminals:menril_glass', 'minecraft:glass')

    // 门瑞欧合金锭
    event.recipes.gtceu.alloy_smelter('gtceu:menril_alloy_ingot_1')
        .EUt(24)
        .itemInputs('#forge:ingots/red_alloy', 'integrateddynamics:crystalized_menril_block')
        .itemOutputs('gtceu:menril_alloy_ingot')
        .duration(7.5 * 20)

    // 门瑞欧
    event.remove({ type: "integrateddynamics:drying_basin" })
    event.remove({ type: "integrateddynamics:mechanical_drying_basin" })
    event.remove({ output: 'integrateddynamics:crystalized_menril_chunk' })
    event.remove({ output: 'integrateddynamics:crystalized_menril_block' })
    event.recipes.gtceu.extractor('integrateddynamics:crystalized_menril_chunk_1')
        .EUt(12)
        .itemInputs('integrateddynamics:menril_planks')
        .itemOutputs('integrateddynamics:crystalized_menril_chunk')
        .duration(5 * 20)
    // 门瑞欧块
    event.recipes.gtceu.compressor("integrateddynamics:crystalized_menril_block_1")
        .EUt(12)
        .itemInputs('9x integrateddynamics:crystalized_menril_chunk')
        .itemOutputs('integrateddynamics:crystalized_menril_block')
        .duration(5 * 20)
    // 逻辑线缆
    event.remove({ output: 'integrateddynamics:cable' })
    event.recipes.gtceu.wiremill('integrateddynamics:cable_1')
        .EUt(18)
        .itemInputs('3x gtceu:menril_alloy_ingot')
        .itemOutputs('2x integrateddynamics:cable')
        .circuit(3)
        .duration(14.5 * 20)
    
    
})