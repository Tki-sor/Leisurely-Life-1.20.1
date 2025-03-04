ServerEvents.recipes(event => {
    // 锻造工厂
    let hammer_factory = (output, input, time, eut) => {
        event.recipes.gtceu.hammer_factory("hammer_factory_" + getIncNum())
            .EUt(eut)
            .duration(time)
            .itemInputs(input)
            .itemOutputs(output)
    }

    // 沙砾
    hammer_factory('1x exdeorum:compressed_gravel', '1x exdeorum:compressed_diorite', 3 * 20, 12)
    hammer_factory('1x exdeorum:compressed_gravel', '1x exdeorum:compressed_cobblestone', 3 * 20, 12)
    hammer_factory('1x exdeorum:compressed_gravel', '1x exdeorum:compressed_andesite', 3 * 20, 12)
    hammer_factory('1x exdeorum:compressed_gravel', '1x exdeorum:compressed_granite', 3 * 20, 12)

    // 沙子
    hammer_factory('1x exdeorum:compressed_sand', '1x exdeorum:compressed_gravel', 3 * 20, 12)

    // 尘土
    hammer_factory('1x exdeorum:compressed_dust', '1x exdeorum:compressed_sand', 3 * 20, 12)
    hammer_factory('1x exdeorum:compressed_dust', '1x exdeorum:compressed_red_sand', 3 * 20, 12)

    // 粉碎下界岩
    hammer_factory('1x exdeorum:compressed_crushed_netherrack', '1x exdeorum:compressed_netherrack', 3 * 20, 12)

    // 粉碎末地石
    hammer_factory('1x exdeorum:compressed_crushed_end_stone', '1x exdeorum:compressed_end_stone', 3 * 20, 12)

    // 粉碎黑石
    hammer_factory('1x exdeorum:compressed_crushed_deepslate', '1x exdeorum:compressed_cobbled_deepslate', 3 * 20, 12)

    // 粉碎深板岩
    hammer_factory('1x exdeorum:compressed_crushed_blackstone', '1x exdeorum:compressed_blackstone', 3 * 20, 12)

    event.recipes.gtceu.martial_morality_eye("martial_morality_eye_" + getIncNum())
        .inputFluids('gtceu:steam 64000')
        .itemInputs('64x minecraft:cobblestone', '64x #forge:ingots/gold')
        .duration(240 * 20)
        .chancedOutput('64x minecraft:raw_gold', 1000, 0)
        .chancedOutput('64x gtceu:raw_pyrite', 1000, 0)
        .chancedOutput('64x gtceu:raw_chalcopyrite', 1000, 0)
        .chancedOutput('64x gtceu:raw_silver', 1000, 0)
        .chancedOutput('64x gtceu:raw_cassiterite', 1000, 0)
        .chancedOutput('64x gtceu:raw_galena', 1000, 0)
        .chancedOutput('64x gtceu:raw_calcite', 1000, 0)
        .chancedOutput('64x gtceu:raw_redstone', 1000, 0)
        .chancedOutput('64x gtceu:raw_bauxite', 1000, 0)
        .chancedOutput('64x minecraft:raw_copper', 1000, 0)
        .chancedOutput('64x gtceu:raw_pyrolusite', 1000, 0)
        .chancedOutput('64x gtceu:raw_nickel', 1000, 0)
        .chancedOutput('64x gtceu:raw_diamond', 1000, 0)
        .chancedOutput('64x gtceu:raw_emerald', 1000, 0)
        .chancedOutput('64x minecraft:ancient_debris', 1000, 0)
        .chancedOutput('64x gtceu:raw_sulfur', 1000, 0)
        .chancedOutput('64x gtceu:raw_cobalt', 1000, 0)
        .chancedOutput('64x gtceu:raw_platinum', 1000, 0)


    // 屠宰场
    event.recipes.gtceu.slaughter_house("slaughter_house" + getIncNum())
        .inputFluids('gtceu:lubricant 1')
        .EUt(480)
        .duration(60)

    // 虚空采矿厂
    let end = [
        '20x gtceu:raw_scheelite',
        '30x gtceu:raw_tungstate',
        '30x gtceu:raw_tungstate',
        '30x gtceu:raw_pitchblende',
        '15x gtca:raw_red_zircon',
        '15x gtca:raw_green_fuchsite',
        '15x gtca:raw_red_fuchsite',
        '15x gtca:raw_fayalite',
        '15x gtceu:raw_aluminium',
        '20x gtceu:raw_lithium',
        '10x gtceu:raw_palladium',
        '10x gtceu:raw_platinum',
        '30x gtceu:raw_plutonium',
        '10x gtceu:raw_cooperite',
        '40x gtceu:raw_ilmenite',
        '40x gtceu:raw_bauxite',
        '30x minecraft:raw_gold'
    ]
    end.sort((a, b) => {
        // 提取数字部分
        let numA = parseInt(a.split('x')[0]);
        let numB = parseInt(b.split('x')[0]);

        // 如果数字部分相同，按照字母部分排序
        if (numA === numB) {
            return b.localeCompare(a); // 字母部分降序
        }

        // 否则按数字降序
        return numB - numA;
    });


    let overworld = [
        '80x minecraft:raw_iron',
        '80x minecraft:raw_copper',
        '30x minecraft:raw_gold',
        '40x gtceu:raw_lead',
        '5x gtceu:raw_molybdenum',
        '40x gtceu:raw_silver',
        '80x gtceu:raw_tin',
        '60x gtceu:raw_almandine',
        '80x gtceu:raw_asbestos',
        '120x gtceu:raw_hematite',
        '120x gtceu:raw_goethite',
        '40x gtceu:raw_calcite',
        '50x gtceu:raw_cassiterite',
        '80x gtceu:raw_cassiterite_sand',
        '50x gtceu:raw_chalcopyrite',
        '60x gtceu:raw_cinnabar',
        '160x gtceu:raw_coal',
        '40x gtceu:raw_cobaltite',
        '40x gtceu:raw_diamond',
        '40x gtceu:raw_galena',
        '40x gtceu:raw_garnierite',
        '60x gtceu:raw_green_sapphire',
        '20x gtceu:raw_grossular',
        '40x gtceu:raw_bauxite',
        '40x gtceu:raw_lazurite',
        '80x gtceu:raw_magnetite',
        '5x gtceu:raw_molybdenite',
        '5x gtceu:raw_powellite',
        '80x gtceu:raw_pyrite',
        '20x gtceu:raw_pyrolusite',
        '60x gtceu:raw_pyrope',
        '50x gtceu:raw_rock_salt',
        '60x gtceu:raw_ruby',
        '50x gtceu:raw_salt',
        '60x gtceu:raw_sapphire',
        '40x gtceu:raw_sodalite',
        '20x gtceu:raw_tantalite',
        '20x gtceu:raw_spessartine',
        '5x gtceu:raw_wulfenite',
        '120x gtceu:raw_yellow_limonite',
        '40x gtceu:raw_graphite',
        '50x gtceu:raw_realgar',
        '40x gtceu:raw_pentlandite',
        '50x gtceu:raw_spodumene',
        '50x gtceu:raw_lepidolite',
        '40x gtceu:raw_glauconite_sand',
        '120x gtceu:raw_malachite',
        '20x gtceu:raw_mica',
        '40x gtceu:raw_talc',
        '40x gtceu:raw_soapstone',
        '20x gtceu:raw_kyanite',
        '40x gtceu:raw_pyrochlore',
        '20x gtceu:raw_olivine',
        '40x gtceu:raw_opal',
        '40x gtceu:raw_amethyst',
        '40x gtceu:raw_lapis',
        '40x gtceu:raw_apatite',
        '40x gtceu:raw_tricalcium_phosphate',
        '40x gtceu:raw_red_garnet',
        '40x gtceu:raw_yellow_garnet',
        '30x gtceu:raw_vanadium_magnetite',
        '20x gtceu:raw_pollucite',
        '20x gtceu:raw_bentonite',
        '80x gtceu:raw_fullers_earth',
        '40x gtceu:raw_trona',
        '80x gtceu:raw_gypsum',
        '60x gtceu:raw_zeolite',
        '60x gtceu:raw_redstone',
        '40x gtceu:raw_diatomite',
        '80x gtceu:raw_granitic_mineral_sand',
        '80x gtceu:raw_garnet_sand',
        '80x gtceu:raw_basaltic_mineral_sand',
        '40x gtceu:raw_wollastonite',
        '60x gtceu:raw_kaolinite',
        '40x gtceu:raw_dolomite'
    ]
    overworld.sort((a, b) => {
        // 提取数字部分
        let numA = parseInt(a.split('x')[0]);
        let numB = parseInt(b.split('x')[0]);

        // 如果数字部分相同，按照字母部分排序
        if (numA === numB) {
            return b.localeCompare(a); // 字母部分降序
        }

        // 否则按数字降序
        return numB - numA;
    });

    let nether = [
        '80x minecraft:raw_copper',
        '30x minecraft:raw_gold',
        '30x gtceu:raw_beryllium',
        '5x gtceu:raw_molybdenum',
        '30x gtceu:raw_neodymium',
        '100x gtceu:raw_sulfur',
        '30x gtceu:raw_hematite',
        '70x gtceu:raw_blue_topaz',
        '30x gtceu:raw_goethite',
        '60x gtceu:raw_cinnabar',
        '30x gtceu:raw_emerald',
        '20x gtceu:raw_grossular',
        '5x gtceu:raw_molybdenite',
        '5x gtceu:raw_powellite',
        '100x gtceu:raw_pyrite',
        '20x gtceu:raw_pyrolusite',
        '60x gtceu:raw_ruby',
        '40x gtceu:raw_saltpeter',
        '20x gtceu:raw_tantalite',
        '100x gtceu:raw_sphalerite',
        '70x gtceu:raw_stibnite',
        '70x gtceu:raw_tetrahedrite',
        '70x gtceu:raw_topaz',
        '30x gtceu:raw_wulfenite',
        '30x gtceu:raw_yellow_limonite',
        '80x gtceu:raw_nether_quartz',
        '40x gtceu:raw_certus_quartz',
        '80x gtceu:raw_quartzite',
        '70x gtceu:raw_bornite',
        '70x gtceu:raw_chalcocite',
        '30x gtceu:raw_bastnasite',
        '40x gtceu:raw_barite',
        '40x gtceu:raw_alunite',
        '30x gtceu:raw_monazite',
        '60x gtceu:raw_redstone',
        '40x gtceu:raw_electrotine',
        '40x gtceu:raw_diatomite'
    ]
    nether.sort((a, b) => {
        // 提取数字部分
        let numA = parseInt(a.split('x')[0]);
        let numB = parseInt(b.split('x')[0]);

        // 如果数字部分相同，按照字母部分排序
        if (numA === numB) {
            return b.localeCompare(a); // 字母部分降序
        }

        // 否则按数字降序
        return numB - numA;
    });

    event.recipes.gtceu.void_miner("void_miner_overworld" + getIncNum())
        .EUt(480)
        .duration(40)
        .notConsumable('minecraft:dirt')
        .itemOutputs(
            overworld
        )
    event.recipes.gtceu.void_miner("void_miner_end" + getIncNum())
        .EUt(480)
        .duration(40)
        .notConsumable('minecraft:end_stone')
        .itemOutputs(
            end
        )
    event.recipes.gtceu.void_miner("void_miner_nether" + getIncNum())
        .EUt(480)
        .duration(40)
        .notConsumable('minecraft:netherrack')
        .itemOutputs(
            nether
        )
    let fuild_ore = [
        ['gtceu:drilling_fluid 1250', 0.5],
        ['gtceu:lubricant 5', 0.75]
    ]
    fuild_ore.forEach(f => {
        event.recipes.gtceu.void_miner("void_miner_overworld" + getIncNum())
            .EUt(480)
            .duration(40 * f[1])
            .notConsumable('minecraft:dirt')
            .inputFluids(f[0])
            .itemOutputs(
                overworld
            )
        event.recipes.gtceu.void_miner("void_miner_end" + getIncNum())
            .EUt(480)
            .duration(40 * f[1])
            .notConsumable('minecraft:end_stone')
            .inputFluids(f[0])
            .itemOutputs(
                end
            )
        event.recipes.gtceu.void_miner("void_miner_nether" + getIncNum())
            .EUt(480)
            .duration(40 * f[1])
            .notConsumable('minecraft:netherrack')
            .inputFluids(f[0])
            .itemOutputs(
                nether
            )
    })

    // 虚空集气室
    event.recipes.gtceu.void_gas_collection_chamber("gtceu:void_gas_collection_chamber" + getIncNum())
        .EUt(960)
        .notConsumable("minecraft:dirt")
        .outputFluids('gtceu:air 500')
        .duration(10 * 20)
    event.recipes.gtceu.void_gas_collection_chamber("gtceu:void_gas_collection_chamber" + getIncNum())
        .EUt(3840)
        .notConsumable("minecraft:dirt")
        .notConsumable('gtceu:vacuum_freezer')
        .outputFluids('gtceu:liquid_air 500')
        .duration(10 * 20)
    event.recipes.gtceu.void_gas_collection_chamber("gtceu:void_gas_collection_chamber" + getIncNum())
        .EUt(960)
        .notConsumable('minecraft:netherrack')
        .outputFluids('gtceu:nether_air 250')
        .duration(10 * 20)
    event.recipes.gtceu.void_gas_collection_chamber("gtceu:void_gas_collection_chamber" + getIncNum())
        .EUt(3840)
        .notConsumable('minecraft:netherrack')
        .notConsumable('gtceu:vacuum_freezer')
        .outputFluids('gtceu:liquid_nether_air 250')
        .duration(10 * 20)
    event.recipes.gtceu.void_gas_collection_chamber("gtceu:void_gas_collection_chamber" + getIncNum())
        .EUt(960)
        .notConsumable('minecraft:end_stone')
        .outputFluids('gtceu:ender_air 125')
        .duration(10 * 20)
    event.recipes.gtceu.void_gas_collection_chamber("gtceu:void_gas_collection_chamber" + getIncNum())
        .EUt(3840)
        .notConsumable('minecraft:end_stone')
        .notConsumable('gtceu:vacuum_freezer')
        .outputFluids('gtceu:liquid_ender_air 125')
        .duration(10 * 20)

    // 量子操纵者
    event.recipes.gtceu.quantum_force_transformer('platinum_qft' + getIncNum())
        .EUt(1920)
        .duration(240 * 20)
        .itemInputs('128x gtceu:platinum_group_sludge_dust')
        .inputFluids('gtceu:oxygen 61000')
        .itemOutputs('21x gtceu:platinum_dust', '12x gtceu:palladium_dust', '5x gtceu:tiny_palladium_dust', '18x gtceu:silicon_dioxide_dust', '27x gtceu:gold_dust', '7x gtceu:ruthenium_dust', '7x gtceu:rhodium_dust', '3x gtceu:iridium_dust', '3x gtceu:osmium_dust')

    // 检测终端
    event.shapeless('llrcore:testing_terminal', ['gtceu:terminal'])
    event.shapeless('gtceu:terminal', ['llrcore:testing_terminal'])

    // 蒸汽高炉
    event.forEachRecipe({ type: "gtceu:primitive_blast_furnace" }, r => {
        let gtItemCAP = $ItemRecipeCapability.CAP
        /**
         * @type {Internal.GTRecipe}
         */
        let original = r.getOriginalRecipe()
        let inputs = original.inputs.get(gtItemCAP).stream().map(content => content.getContent()).toArray()
        let outputs = original.outputs.get(gtItemCAP).stream().map(content => content.getContent()).toArray()
        let duration = original.duration

        event.recipes.gtceu.steam_blast_furnace("steam_blast_furnace" + getIncNum())
            .EUt(8)
            .duration(duration / 2)
            .input(gtItemCAP, inputs)
            .output(gtItemCAP, outputs)
    })

    // event.forEachRecipe({type: "gtceu:assembler", output: /^gtceu:[^:_]+v_voltage_coil$/}, r => {
    //     let gtItemCAP = $ItemRecipeCapability.CAP
    //     /**
    //      * @type {Internal.GTRecipe}
    //      */
    //     let original = r.getOriginalRecipe()
    //     // let eu = original.getTickInputContents(gtEuCAP).stream().map(content => content.getContent()).mapToLong(o => $EURecipeCapability.CAP.of(o)).sum()
    //     let eu = $GTRecipeHelper.getInputEUt(original)
    //     let inputs = original.inputs.get(gtItemCAP).stream().map(content => content.getContent()).toArray()
    //     let outputs = original.outputs.get(gtItemCAP).stream().map(content => content.getContent()).toArray()
    //     let duration = original.duration

    //     event.remove({output: r.getOriginalRecipeResult().id})
    //     event.recipes.gtceu.assembler("assembler" + getIncNum())
    //         .EUt(eu/4)
    //         .duration(duration / 2)
    //         .input(gtItemCAP, inputs)
    //         .output(gtItemCAP, outputs)
    // })
    // event.recipes.gtceu.steam_blast_furnace("steam_blast_furnace" + getIncNum())
    //     .EUt(8)
    //     .duration(10 * 20)
    //     .itemInputs('minecraft:iron_ingot', )
    //     .itemOutputs('gtceu:steel_ingot')
})