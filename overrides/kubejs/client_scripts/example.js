// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded client scripts)')

JEIEvents.hideItems(event => {
    
})


JEIEvents.information(event => {
    
    let honey_comb = [
        `
        通过击杀蜜蜂（minecraft:bee）来获得蜜蜂。\n
        当蜜蜂（growthcraft_apiary:bee）在蜂箱时，会生产空蜜蜂巢。\n
        当蜂箱内有空蜜蜂巢时，蜜蜂会将蜂巢填满，将其变为满蜜蜂巢。
        `
    ]
    event.addItem('growthcraft_apiary:bee', honey_comb)
    event.addItem('growthcraft_apiary:honey_comb_empty', honey_comb)
    event.addItem('growthcraft_apiary:honey_comb_full', honey_comb)
})

ItemEvents.tooltip(event => {
    event.add('mekanism:basic_control_circuit', [Component.translatable("item.gtceu.nand_chip.tooltip.1")])
    event.add('mekanism:advanced_control_circuit', [Component.translatable("item.gtceu.basic_electronic_circuit.tooltip.1")])
    event.add('mekanism:elite_control_circuit', [Component.translatable("item.gtceu.good_electronic_circuit.tooltip.1")])
    event.add('mekanism:ultimate_control_circuit', [Component.translatable("item.gtceu.advanced_integrated_circuit.tooltip.1")])
})