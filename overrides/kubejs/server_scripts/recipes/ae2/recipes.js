
ServerEvents.recipes(event => {
    // me控制器
    event.remove({ output: 'ae2:controller' })
    event.recipes.gtceu.assembler('ae2:controller_1')
        .EUt(120)
        .duration(30 * 20)
        .itemInputs('gtceu:mv_emitter', '6x ae2:engineering_processor', '#gtceu:circuits/mv', '4x #forge:plates/aluminium', '4x #forge:gems/fluix')
        .inputFluids('gtceu:soldering_alloy 1440')
        .itemOutputs('ae2:controller')

    // 逻辑处理器
    event.remove({ output: 'ae2:logic_processor' })
    event.recipes.gtceu.circuit_assembler('ae2:logic_processor_1')
        .EUt(30)
        .duration(15 * 20)
        .itemInputs('gtceu:ram_chip', 'gtceu:ulpic_chip', 'gtceu:plastic_printed_circuit_board', '2x #gtceu:resistors', '2x #gtceu:capacitors', '4x gtceu:fine_gold_wire')
        .itemOutputs('4x ae2:logic_processor')

    // 运算处理器
    event.remove({ output: 'ae2:calculation_processor' })
    event.recipes.gtceu.circuit_assembler('ae2:calculation_processor_1')
        .EUt(30)
        .duration(15 * 20)
        .itemInputs('gtceu:ram_chip', 'gtceu:cpu_chip', 'gtceu:plastic_printed_circuit_board', '2x #gtceu:resistors', '2x #gtceu:transistors', '2x gtceu:fine_gold_wire')
        .itemOutputs('4x ae2:calculation_processor')

    // 工程处理器
    event.remove({ output: 'ae2:engineering_processor' })
    event.recipes.gtceu.circuit_assembler('ae2:engineering_processor_1')
        .EUt(30)
        .duration(15 * 20)
        .itemInputs('gtceu:ram_chip', 'gtceu:ilc_chip', 'gtceu:plastic_printed_circuit_board', '4x #gtceu:resistors', '4x #gtceu:transistors', '2x gtceu:fine_gold_wire')
        .itemOutputs('2x ae2:engineering_processor')

    // 破坏核心
    event.replaceInput({ output: 'ae2:annihilation_core' }, '#forge:gems/quartz', '#gtceu:circuits/ulv')

    // 成型核心
    event.replaceInput({ output: 'ae2:formation_core' }, '#forge:gems/certus_quartz', '#gtceu:circuits/ulv')
    event.replaceInput({ output: 'ae2:formation_core' }, '#forge:dusts/fluix', '#forge:dusts/certus_quartz')

    // 合成单元
    event.remove({ output: 'ae2:crafting_unit' })
    event.shaped('ae2:crafting_unit', [
        'aba',
        'cdc',
        'aea'
    ], {
        a: '#forge:plates/aluminium',
        b: 'ae2:calculation_processor',
        c: 'ae2:fluix_glass_cable',
        d: '#gtceu:circuits/mv',
        e: 'ae2:logic_processor'
    })

    // 包层线缆
    rubbers_fluid.forEach(r => {
        event.recipes.gtceu.assembler('ae2:fluix_covered_cable' + getIncNum())
            .EUt(7)
            .duration(5 * 20)
            .itemInputs('ae2:fluix_glass_cable')
            .inputFluids(r)
            .itemOutputs('ae2:fluix_covered_cable')
    })

    // 福鲁伊克斯水晶
    event.recipes.gtceu.mixer('ae2:fluix_crystal' + getIncNum())
        .EUt(16)
        .duration(1 * 20)
        .itemInputs('ae2:charged_certus_quartz_crystal', '#forge:dusts/redstone', '#forge:gems/quartz')
        .inputFluids('minecraft:water 500')
        .itemOutputs('2x ae2:fluix_crystal')
    event.recipes.gtceu.mixer('ae2:fluix_crystal' + getIncNum())
        .EUt(16)
        .duration(1 * 20)
        .itemInputs('ae2:charged_certus_quartz_crystal', '#forge:dusts/fluix')
        .inputFluids('minecraft:water 500')
        .itemOutputs('2x ae2:fluix_crystal')

    // 福鲁伊克斯粉
    event.recipes.gtceu.macerator('ae2:fluix_dust' + getIncNum())
        .EUt(2)
        .duration(20 * 20)
        .itemInputs('ae2:fluix_crystal')
        .itemOutputs('ae2:fluix_dust')

    // 充能赛特斯石英水晶
    event.recipes.gtceu.circuit_assembler('ae2:charged_certus_quartz_crystal' + getIncNum())
        .EUt(60)
        .duration(1 * 20)
        .itemInputs('#forge:gems/certus_quartz')
        .itemOutputs('ae2:charged_certus_quartz_crystal')

})