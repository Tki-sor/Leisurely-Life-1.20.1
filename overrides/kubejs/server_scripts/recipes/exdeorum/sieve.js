
/**
 * 为了和1.12.2对标，概率*9相当于1.12.2的1/9碎片
 */
ServerEvents.recipes(event => {
    // 移除已有的筛网配方
    event.remove({ type: "exdeorum:sieve" })
    event.remove({ type: "exdeorum:compressed_sieve" })
    event.remove({ type: "createsifter:sifting" })

    const sieveLevels = [
        "string",
        "flint",
        "wrought_iron",
        "steel",
        "stainless_steel"
    ]

    const registerSieveRecipes = (sieveList) => {
        const sieveData = new Map();

        // 按照等级顺序处理配方
        sieveLevels.forEach((currentLevel, index) => {
            // 获取当前等级的配置
            const currentConfig = sieveList.find(s => s.mesh === currentLevel);

            // 获取前一个等级的配置
            const prevLevel = sieveLevels[index - 1];
            const prevData = sieveData.get(prevLevel);

            // 初始化当前等级数据
            const currentData = {
                input: currentConfig?.input || (prevData?.input || []),
                output: []
            };

            // 继承前一级的输出（深拷贝）
            if (prevData) {
                currentData.output = JSON.parse(JSON.stringify(prevData.output));
            }

            // 合并/覆盖当前等级的配置
            if (currentConfig) {
                currentConfig.output.forEach(newOutput => {
                    // 标准化数据
                    newOutput.amount = newOutput.amount || 1;

                    // 查找已有输出
                    const existing = currentData.output.find(o => o.item === newOutput.item);

                    if (existing) {
                        // 覆盖已有条目
                        existing.amount = newOutput.amount;
                        existing.chance = newOutput.chance;
                    } else {
                        // 添加新条目
                        currentData.output.push({
                            item: newOutput.item,
                            amount: newOutput.amount,
                            chance: newOutput.chance
                        });
                    }
                });
            }

            sieveData.set(currentLevel, currentData);
        });

        // 注册所有配方
        sieveData.forEach((data, mesh) => {
            const outputArray = data.output.map(o =>
                Item.of(o.item, o.amount).withChance(o.chance)
            );

            data.input.forEach(ingredient => {
                // 注册 Create Sifter 配方
                event.recipes.createsifter.sifting(
                    outputArray,
                    [ingredient, `createsifter:${mesh}_mesh`]
                );

                // gtm 配方注册
                data.input.forEach(ingredient => {
                    const recipeId = `gt_sieve_${getIncNum()}_${mesh}`;
                    const recipe = event.recipes.gtceu.sieve_factory(recipeId)
                        .itemInputs(Item.of(ingredient, 1))
                        .notConsumable(`createsifter:${mesh}_mesh`)
                        .inputFluids(Fluid.of('minecraft:water', 5))
                        .EUt(12)
                        .duration(20);

                    // 添加概率输出
                    data.output.forEach(output => {
                        let chance = output.chance * 10000 * 1.2
                        recipe.chancedOutput(
                            Item.of(output.item, output.amount * 1),
                            Math.min(10000, chance),
                            0
                        );

                    });
                });


                // 注册 Ex Deorum 配方（仅支持前三个等级）
                const exDeorumMeshMap = {
                    string: "string",
                    flint: "flint",
                    wrought_iron: "iron"
                };

                if (exDeorumMeshMap[mesh]) {
                    data.output.forEach(o => {
                        event.custom({
                            type: "exdeorum:sieve",
                            ingredient: { item: ingredient },
                            mesh: `exdeorum:${exDeorumMeshMap[mesh]}_mesh`,
                            result: o.item,
                            result_amount: {
                                type: "minecraft:binomial",
                                n: o.amount,
                                p: o.chance
                            }
                        });
                    });
                }
            });
        });
    };


    /*
    let registerSieveRecipes = (sieveList) => {
        let sieveData = {}

        // 缓存output
        let sieveCache = []
        // 收集筛网配方数据
        sieveList.forEach(sieve => {
            let input = sieve.input
            // 如果当前筛网等级没有记录，则初始化
            let newArr = JSON.parse(JSON.stringify(sieveCache))
            if (!sieveData[sieve.mesh]) {
                sieveData[sieve.mesh] = {
                    input: input,
                    output: newArr
                }
            }

            // 添加输出物品
            sieve.output.forEach(output => {
                // 如果没有定义 amount，默认为 1
                if (!output.amount) {
                    output.amount = 1
                }

                let existingOutput = sieveData[sieve.mesh].output.find(o => o.item === output.item)
                if (existingOutput) {
                    // 如果已经存在，直接更新
                    existingOutput.amount = output.amount
                    existingOutput.chance = output.chance
                } else {
                    // 否则添加新输出
                    sieveData[sieve.mesh].output.push(output)
                }
            })

            sieveCache = sieveData[sieve.mesh].output
        })

        sieveLevels.forEach(level => {
            if (undefined == sieveData[sieveLevels[sieveLevels.indexOf(level) - 1]]) return
            if (!sieveData[level]) {
                sieveData[level] = {
                    input: sieveData[sieveLevels[sieveLevels.indexOf(level) - 1]].input,
                    output: sieveData[sieveLevels[sieveLevels.indexOf(level) - 1]].output
                }
            }
        })

        // 注册配方
        for (let mesh in sieveData) {
            let { input, output } = sieveData[mesh]

            let outputArray = output.map(o => Item.of(o.item, o.amount).withChance(o.chance))

            input.forEach(i => {
                // 注册 createsifter 的配方
                event.recipes.createsifter.sifting(outputArray, [i, `createsifter:${mesh}_mesh`])

                let meshL = [
                    "string",
                    "flint",
                    "wrought_iron"
                ]
                if (!meshL.includes(mesh)) return
                let m = mesh == "wrought_iron" ? "iron" : mesh
                // 注册 exdeorum 的配方
                output.forEach(o => {
                    event.custom({
                        type: 'exdeorum:sieve',
                        ingredient: {
                            item: i
                        },
                        mesh: `exdeorum:${m}_mesh`,
                        result: o.item,
                        result_amount: {
                            type: 'minecraft:binomial',
                            n: o.amount,
                            p: o.chance
                        }
                    })
                })
            })
        }
    }
        */

    // 泥土
    registerSieveRecipes([
        {
            mesh: "string",
            input: ['minecraft:dirt'],
            output: [
                { item: 'minecraft:oak_sapling', chance: 0.05 },
                { item: 'minecraft:spruce_sapling', chance: 0.05 },
                { item: 'minecraft:birch_sapling', chance: 0.05 },
                { item: 'minecraft:jungle_sapling', chance: 0.05 },
                { item: 'minecraft:acacia_sapling', chance: 0.05 },
                { item: 'minecraft:dark_oak_sapling', chance: 0.05 },
                { item: 'minecraft:cherry_sapling', chance: 0.05 },
                { item: 'integrateddynamics:menril_sapling', chance: 0.02 },
                { item: 'gtceu:rubber_sapling', chance: 0.01 },
                { item: 'minecraft:bamboo', chance: 0.03 },
                { item: 'exdeorum:grass_seeds', chance: 0.05 },
                { item: 'exdeorum:mycelium_spores', chance: 0.03 },
                { item: 'exdeorum:stone_pebble', amount: 3, chance: 0.7 },
                { item: 'exdeorum:diorite_pebble', chance: 0.5 },
                { item: 'exdeorum:granite_pebble', chance: 0.5 },
                { item: 'exdeorum:andesite_pebble', chance: 0.5 },
                { item: 'exdeorum:tuff_pebble', chance: 0.5 },
                { item: 'exdeorum:calcite_pebble', chance: 0.5 },
                { item: 'minecraft:sugar_cane', chance: 0.03 }
            ]
        },
        {
            mesh: "flint",
            input: ['minecraft:dirt'],
            output: [
                { item: 'exdeorum:grass_seeds', chance: 0.07 },
                { item: 'exdeorum:mycelium_spores', chance: 0.04 },
                { item: 'exdeorum:stone_pebble', amount: 3, chance: 0.8 },
                { item: 'exdeorum:diorite_pebble', chance: 0.55 },
                { item: 'exdeorum:granite_pebble', chance: 0.55 },
                { item: 'exdeorum:andesite_pebble', chance: 0.55 },
                { item: 'exdeorum:deepslate_pebble', chance: 0.3 },
                { item: 'exdeorum:basalt_pebble', chance: 0.3 },
                { item: 'exdeorum:blackstone_pebble', chance: 0.25 },
                { item: 'minecraft:sugar_cane', chance: 0.03 }
            ]
        },
        {
            mesh: "wrought_iron",
            input: ['minecraft:dirt'],
            output: [
                { item: 'exdeorum:grass_seeds', chance: 0.08 },
                { item: 'exdeorum:mycelium_spores', chance: 0.06 },
                { item: 'exdeorum:stone_pebble', amount: 3, chance: 0.9 },
                { item: 'exdeorum:diorite_pebble', chance: 0.6 },
                { item: 'exdeorum:granite_pebble', chance: 0.6 },
                { item: 'exdeorum:andesite_pebble', chance: 0.6 },
                { item: 'exdeorum:deepslate_pebble', chance: 0.4 },
                { item: 'exdeorum:basalt_pebble', chance: 0.4 },
                { item: 'exdeorum:blackstone_pebble', chance: 0.3 },
                { item: 'minecraft:sugar_cane', chance: 0.04 }
            ]
        },
        {
            mesh: "steel",
            input: ['minecraft:dirt'],
            output: [
                { item: 'exdeorum:grass_seeds', chance: 0.01 },
                { item: 'exdeorum:mycelium_spores', chance: 0.08 },
                { item: 'exdeorum:stone_pebble', amount: 3, chance: 0.1 },
                { item: 'exdeorum:diorite_pebble', chance: 0.7 },
                { item: 'exdeorum:granite_pebble', chance: 0.7 },
                { item: 'exdeorum:andesite_pebble', chance: 0.7 },
                { item: 'exdeorum:deepslate_pebble', chance: 0.7 },
                { item: 'exdeorum:basalt_pebble', chance: 0.5 },
                { item: 'exdeorum:blackstone_pebble', chance: 0.4 },
                { item: 'minecraft:sugar_cane', chance: 0.05 }
            ]
        }
    ])


    // 沙砾
    registerSieveRecipes([
        {
            mesh: "string",
            input: ["minecraft:gravel"],
            output: [
                { item: "minecraft:flint", chance: 0.8 },
                { item: "minecraft:coal", chance: 0.05 }
            ]
        },
        {
            mesh: "flint",
            input: ["minecraft:gravel"],
            output: [
                { item: "minecraft:flint", chance: 0.1 },
                { item: "minecraft:coal", chance: 0.07 },
                { item: ores.gold.item, chance: 0.02 },
                { item: ores.iron.item, chance: 0.05 },
                { item: ores.copper.item, chance: 0.05 },
                { item: ores.nickel.item, chance: 0.03 },
                { item: ores.lapis.item, chance: 0.02 },
                { item: 'minecraft:lapis_lazuli', chance: 0.02 }
            ]
        },
        {
            mesh: "wrought_iron",
            input: ["minecraft:gravel"],
            output: [
                { item: "minecraft:coal", chance: 0.1 },
                { item: "minecraft:diamond", chance: 0.005 },
                { item: "minecraft:emerald", chance: 0.005 },
                { item: 'gtceu:crushed_amethyst_ore', chance: 0.005 },
                { item: ores.gold.item, chance: 0.03 },
                { item: ores.iron.item, chance: 0.065 },
                { item: ores.copper.item, chance: 0.065 },
                { item: ores.nickel.item, chance: 0.04 },
                { item: ores.diamond.item, chance: 0.01 },
                { item: ores.emerald.item, chance: 0.01 },
                { item: ores.lapis.item, chance: 0.03 },
                { item: 'minecraft:lapis_lazuli', chance: 0.03 }
            ]
        },
        {
            mesh: "steel",
            input: ["minecraft:gravel"],
            output: [
                { item: "minecraft:coal", chance: 0.07 },
                { item: "minecraft:diamond", chance: 0.01 },
                { item: "minecraft:emerald", chance: 0.01 },
                { item: 'gtceu:crushed_amethyst_ore', chance: 0.01 },
                { item: ores.gold.item, chance: 0.025 },
                { item: ores.iron.item, chance: 0.08 },
                { item: ores.copper.item, chance: 0.08 },
                { item: ores.nickel.item, chance: 0.06 },
                { item: ores.diamond.item, chance: 0.02 },
                { item: ores.emerald.item, chance: 0.02 },
                { item: ores.sapphire.item, chance: 0.02 },
                { item: ores.ruby.item, chance: 0.02 },
                { item: ores.lapis.item, chance: 0.04 },
                { item: 'minecraft:lapis_lazuli', chance: 0.04 }
            ]
        }
    ])


    // 沙子
    registerSieveRecipes([
        {
            mesh: "flint",
            input: ["minecraft:sand"],
            output: [
                { item: ores.tin.item, chance: 0.03 },
                { item: ores.zinc.item, chance: 0.02 },
                { item: 'minecraft:amethyst_shard', chance: 0.02 },
                { item: 'gtceu:crushed_amethyst_ore', chance: 0.02 },
                { item: ores.iron.item, chance: 0.015 },
                { item: ores.copper.item, chance: 0.015 },
            ]
        },
        {
            mesh: "wrought_iron",
            input: ["minecraft:sand"],
            output: [
                { item: ores.tin.item, chance: 0.04 },
                { item: ores.zinc.item, chance: 0.03 },
                { item: ores.aluminium.item, chance: 0.035 },
                { item: 'minecraft:amethyst_shard', chance: 0.025 },
                { item: 'gtceu:crushed_amethyst_ore', chance: 0.03 },
                { item: ores.iron.item, chance: 0.02 },
                { item: ores.copper.item, chance: 0.02 },
                { item: ores.silver.item, chance: 0.035 },
                { item: 'gtceu:crushed_certus_quartz_ore', chance: 0.25 }
            ]
        },
        {
            mesh: "steel",
            input: ["minecraft:sand"],
            output: [
                { item: ores.tin.item, chance: 0.045 },
                { item: ores.zinc.item, chance: 0.04 },
                { item: ores.aluminium.item, chance: 0.055 },
                { item: 'gtceu:crushed_amethyst_ore', chance: 0.03 },
                { item: ores.iron.item, chance: 0.025 },
                { item: ores.copper.item, chance: 0.025 },
                { item: ores.silver.item, chance: 0.05 },
                { item: ores.diamond.item, chance: 0.005 },
                { item: ores.emerald.item, chance: 0.005 },
                { item: ores.sapphire.item, chance: 0.02 },
                { item: ores.ruby.item, chance: 0.02 },
                { item: 'gtceu:crushed_olivine_ore', chance: 0.01 },
                { item: 'gtceu:crushed_certus_quartz_ore', chance: 0.35 }
            ]
        }
    ])

    // 尘土
    registerSieveRecipes([
        {
            mesh: "string",
            input: ['exdeorum:dust'],
            output: [
                { item: 'minecraft:bone_meal', chance: 0.1 },
                { item: 'minecraft:gunpowder', chance: 0.05 }
            ]
        },
        {
            mesh: "flint",
            input: ['exdeorum:dust'],
            output: [
                { item: 'minecraft:bone_meal', chance: 0.08 },
                { item: 'minecraft:gunpowder', chance: 0.04 },
                { item: 'ae2:sky_dust', chance: 0.015 },
                { item: 'minecraft:redstone', chance: 0.05 },
                { item: 'minecraft:glowstone_dust', chance: 0.01 },
                { item: 'minecraft:lapis_lazuli', chance: 0.03 }
            ]
        },
        {
            mesh: "wrought_iron",
            input: ['exdeorum:dust'],
            output: [
                { item: 'minecraft:bone_meal', chance: 0.06 },
                { item: 'minecraft:gunpowder', chance: 0.03 },
                { item: 'ae2:sky_dust', chance: 0.02 },
                { item: 'minecraft:redstone', chance: 0.07 },
                { item: 'minecraft:glowstone_dust', chance: 0.02 },
                { item: 'minecraft:blaze_powder', chance: 0.01 },
                { item: 'minecraft:lapis_lazuli', chance: 0.04 },
                { item: 'gtceu:sulfur_dust', chance: 0.02 }
            ]
        },
        {
            mesh: "steel",
            input: ['exdeorum:dust'],
            output: [
                { item: 'minecraft:bone_meal', chance: 0.04 },
                { item: 'minecraft:gunpowder', chance: 0.02 },
                { item: 'ae2:sky_dust', chance: 0.025 },
                { item: 'minecraft:redstone', chance: 0.09 },
                { item: 'minecraft:glowstone_dust', chance: 0.03 },
                { item: 'minecraft:blaze_powder', chance: 0.015 },
                { item: 'minecraft:lapis_lazuli', chance: 0.06 },
                { item: 'gtceu:sulfur_dust', chance: 0.03 },
                { item: ores.redstone.item, chance: 0.02 }
            ]
        }
    ])

    // 灵魂沙
    registerSieveRecipes([
        {
            mesh: "string",
            input: ['minecraft:soul_sand'],
            output: [
                { item: 'minecraft:quartz', chance: 0.04 },
                { item: 'minecraft:blaze_powder', chance: 0.02 },
                { item: 'minecraft:glowstone_dust', chance: 0.02 },
                { item: ores.sapphire.item, chance: 0.02 },
                { item: ores.ruby.item, chance: 0.02 },
                { item: 'gtceu:crushed_nether_quartz_ore', chance: 0.03 }
            ]
        },
        {
            mesh: "flint",
            input: ['minecraft:soul_sand'],
            output: [
                { item: 'minecraft:quartz', chance: 0.05 },
                { item: 'minecraft:blaze_powder', chance: 0.03 },
                { item: 'minecraft:glowstone_dust', chance: 0.03 },
                { item: 'gtceu:crushed_nether_quartz_ore', chance: 0.045 }
            ]
        },
        {
            mesh: "wrought_iron",
            input: ['minecraft:soul_sand'],
            output: [
                { item: 'minecraft:quartz', chance: 0.065 },
                { item: 'minecraft:blaze_powder', chance: 0.045 },
                { item: 'minecraft:glowstone_dust', chance: 0.045 },
                { item: ores.sapphire.item, chance: 0.04 },
                { item: ores.ruby.item, chance: 0.04 },
                { item: 'gtceu:crushed_nether_quartz_ore', chance: 0.06 },
                { item: 'minecraft:lapis_lazuli', chance: 0.05 },
                { item: 'gtceu:crushed_pyrolusite_ore', chance: 0.05 }
            ]
        },
        {
            mesh: "steel",
            input: ['minecraft:soul_sand'],
            output: [
                { item: 'minecraft:quartz', chance: 0.08 },
                { item: 'minecraft:blaze_powder', chance: 0.035 },
                { item: 'minecraft:glowstone_dust', chance: 0.04 },
                { item: ores.sulfur.item, chance: 0.005 },
                { item: ores.sapphire.item, chance: 0.05 },
                { item: ores.ruby.item, chance: 0.05 },
                { item: 'gtceu:crushed_olivine_ore', chance: 0.02 },
                { item: 'gtceu:crushed_nether_quartz_ore', chance: 0.08 },
                { item: 'minecraft:lapis_lazuli', chance: 0.07 },
                { item: 'gtceu:crushed_pyrolusite_ore', chance: 0.06 },
                { item: 'gtceu:crushed_realgar_ore', chance: 0.06 }
            ]
        },
    ])

    // 粉碎下界岩
    registerSieveRecipes([
        {
            mesh: "flint",
            input: ['exdeorum:crushed_netherrack'],
            output: [
                { item: ores.gold.item, chance: 0.03 },
                { item: ores.cobalt.item, chance: 0.03 },
                { item: 'gtceu:crushed_pyrolusite_ore', chance: 0.02 }
            ]
        },
        {
            mesh: "wrought_iron",
            input: ['exdeorum:crushed_netherrack'],
            output: [
                { item: ores.gold.item, chance: 0.035 },
                { item: ores.cobalt.item, chance: 0.035 },
                { item: ores.sulfur.item, chance: 0.01 },
                { item: 'gtceu:crushed_chromite_ore', chance: 0.01 },
                { item: 'gtceu:crushed_bauxite_ore', chance: 0.01 },
                { item: 'gtceu:crushed_cobaltite_ore', chance: 0.01 },
                { item: 'gtceu:crushed_certus_quartz_ore', chance: 0.03 },
                { item: 'gtceu:crushed_nether_quartz_ore', chance: 0.02 },
                { item: 'gtceu:crushed_pyrolusite_ore', chance: 0.03 },
                { item: 'gtceu:crushed_tetrahedrite_ore', chance: 0.03 }
            ]
        },
        {
            mesh: "steel",
            input: ['exdeorum:crushed_netherrack'],
            output: [
                { item: ores.sulfur.item, chance: 0.02 },
                { item: 'gtceu:crushed_chromite_ore', chance: 0.02 },
                { item: 'gtceu:crushed_scheelite_ore', chance: 0.02 },
                { item: 'gtceu:crushed_bauxite_ore', chance: 0.02 },
                { item: 'gtceu:crushed_cobaltite_ore', chance: 0.02 },
                { item: 'gtceu:crushed_certus_quartz_ore', chance: 0.05 },
                { item: 'gtceu:crushed_nether_quartz_ore', chance: 0.04 },
                { item: 'gtceu:crushed_tetrahedrite_ore', chance: 0.04 }
            ]
        },
        {
            mesh: "stainless_steel",
            input: ['exdeorum:crushed_netherrack'],
            output: [
                { item: 'gtceu:crushed_neodymium_ore', chance: 0.03 },
                { item: 'gtceu:crushed_tantalite_ore', chance: 0.04 },
                { item: 'gtceu:crushed_molybdenite_ore', chance: 0.03 },
                { item: 'gtceu:crushed_blue_topaz_ore', chance: 0.02 },
                { item: 'gtceu:crushed_topaz_ore', chance: 0.02 }
            ]
        }
    ])

    // 粉碎末地石
    registerSieveRecipes([
        {
            mesh: "wrought_iron",
            input: ['exdeorum:crushed_end_stone'],
            output: [
                { item: ores.silver.item, chance: 0.05 },
                { item: ores.aluminium.item, chance: 0.06 },
                { item: ores.lead.item, chance: 0.04 },
                { item: ores.sulfur.item, chance: 0.04 },
                { item: ores.diamond.item, chance: 0.03 },
                { item: ores.emerald.item, chance: 0.03 },
                { item: ores.sapphire.item, chance: 0.03 },
                { item: ores.ruby.item, chance: 0.03 },
                { item: 'gtceu:crushed_bauxite_ore', chance: 0.03 },
                { item: 'gtceu:crushed_lepidolite_ore', chance: 0.03 }
            ]
        },
        {
            mesh: "steel",
            input: ['exdeorum:crushed_end_stone'],
            output: [
                { item: ores.silver.item, chance: 0.07 },
                { item: ores.aluminium.item, chance: 0.08 },
                { item: ores.lead.item, chance: 0.06 },
                { item: ores.sulfur.item, chance: 0.06 },
                { item: ores.diamond.item, chance: 0.05 },
                { item: ores.emerald.item, chance: 0.05 },
                { item: ores.sapphire.item, chance: 0.05 },
                { item: ores.ruby.item, chance: 0.05 },
                { item: 'gtceu:crushed_bauxite_ore', chance: 0.05 },
                { item: 'gtceu:crushed_lepidolite_ore', chance: 0.05 },
                { item: 'gtceu:crushed_stibnite_ore', chance: 0.03 }
            ]
        },
        {
            mesh: "stainless_steel",
            input: ['exdeorum:crushed_end_stone'],
            output: [
                { item: 'gtceu:crushed_neodymium_ore', chance: 0.02 },
                { item: 'gtceu:crushed_tantalite_ore', chance: 0.06 },
                { item: 'gtceu:crushed_molybdenite_ore', chance: 0.02 }
            ]
        }
    ])


})