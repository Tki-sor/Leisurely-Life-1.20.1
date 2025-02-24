ServerEvents.tags("item", event => {
    event.add('gtceu:circuits/ulv', 'mekanism:basic_control_circuit')
    event.add('gtceu:circuits/lv', 'mekanism:advanced_control_circuit')
    // event.add('gtceu:circuits/mv', 'mekanism:elite_control_circuit')
    // event.add('gtceu:circuits/hv', 'mekanism:ultimate_control_circuit')
    
})

ServerEvents.tags("fluid", event => {
    event.remove('forge:sulfuric_acid', ['mekanism:sulfuric_acid', "mekanism:flowing_sulfuric_acid"])
    event.remove('forge:sulfur_trioxide', ["mekanism:sulfur_trioxide","mekanism:flowing_sulfur_trioxide"])
    event.remove('forge:oxygen', ["mekanism:oxygen","mekanism:flowing_oxygen"])
    event.remove('forge:sulfur_dioxide', ["mekanism:sulfur_dioxide","mekanism:flowing_sulfur_dioxide"])

})
