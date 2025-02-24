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
})