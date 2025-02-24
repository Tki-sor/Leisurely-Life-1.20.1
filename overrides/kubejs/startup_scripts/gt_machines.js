// priority: 0



GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    // sieve in exnihilo
    // event.create("steam_sieve")
    //     .category("gfs")
    //     .setEUIO("in")
    //     .setMaxIOSize(2, 9, 0, 0) // ItemI, ItemO, FluidI, FluidO
    //     .setSlotOverlay(false, false, GuiTextures.SOLIDIFIER_OVERLAY)
    //     .setProgressBar(GuiTextures.PROGRESS_BAR_SIFT, FillDirection.UP_TO_DOWN)
    //     .setSound(GTSoundEntries.ELECTROLYZER);

    // event.create("sieve_factory")
    //     .category("llr")
    //     .setEUIO("in")
    //     .setMaxIOSize(2, 30, 1, 0) // ItemI, ItemO, FluidI, FluidO
    //     .setSlotOverlay(false, false, GuiTextures.SOLIDIFIER_OVERLAY)
    //     .setProgressBar(GuiTextures.PROGRESS_BAR_SIFT, FillDirection.UP_TO_DOWN)
    //     .setSound(GTSoundEntries.ELECTROLYZER);

    // event.create("hammer_factory")
    //     .category("llr")
    //     .setEUIO("in")
    //     .setMaxIOSize(1, 4, 0, 0) // ItemI, ItemO, FluidI, FluidO
    //     .setSlotOverlay(false, false, GuiTextures.SOLIDIFIER_OVERLAY)
    //     .setProgressBar(GuiTextures.PROGRESS_BAR_SIFT, FillDirection.UP_TO_DOWN)
    //     .setSound(GTSoundEntries.ELECTROLYZER);

    // inscriber in ae
    // event.create("inscriber")
    //     .category("gfs")
    //     .setEUIO("in")
    //     .setMaxIOSize(3, 1, 1, 0)
    //     .setSlotOverlay(false, false, GuiTextures.SOLIDIFIER_OVERLAY)
    //     .setProgressBar(GuiTextures.PROGRESS_BAR_COMPRESS, FillDirection.LEFT_TO_RIGHT)
    //     .setSound(GTSoundEntries.COMPRESSOR);
});


// GTCEuStartupEvents.registry("gtceu:machine", event => {

//     event.create("sifter_factory", 'multiblock')
//         .machine(holder => new $CoilWorkableElectricMultiblockMachine(holder))
//         .tooltips(
//             Component.literal('§7原始时代的最高技术'),
//             Component.literal("§6自带36并行"),
//             Component.literal("使用少量能量获取远高于正常筛子的速度"),
//             Component.literal("具有更高的概率获得产物"),
//             Component.literal("需要消耗少量的水来维持工作"),
            
//         )
//         .tooltipBuilder($LLRMachines.LLR_ADD)
//         .rotationState(RotationState.NON_Y_AXIS)
//         .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
//         .recipeTypes(["sieve_factory"])
//         .recipeModifiers((machine,recipe) => $LLRRecipeModifiers.accurateParallel(machine,recipe,36).andThen($ModifierFunction.builder().durationMultiplier(20 /recipe.duration).build()))
//         .pattern(definition => FactoryBlockPattern.start()
//             .aisle("xxxxx", "xxxxx", "ooooo", "xxxxx", "xxxxx")
//             .aisle("fxxxf", "x   x", "ovvvo", "x###x", "x   x")
//             .aisle("fxxxf", "x   x", "ovvvo", "x###x", "x   x")
//             .aisle("fxxxf", "x   x", "ovvvo", "x###x", "x   x")
//             .aisle("fxxxf", "x   x", "ovvvo", "x###x", "x   x")
//             .aisle("xxxxx", "xx@xx", "ooooo", "xxxxx", "xxxxx")
//             .where("x", Predicates.blocks('gtceu:ulv_machine_casing'))
//             .where("v", Predicates.blocks('gtceu:steel_frame'))
//             .where("o", Predicates.heatingCoils())
//             .where("f", Predicates.blocks('gtceu:ulv_machine_casing')
//                 .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setExactLimit(2))
//                 .or(Predicates.abilities(PartAbility.IMPORT_ITEMS))
//                 .or(Predicates.abilities(PartAbility.EXPORT_ITEMS))
//                 .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS))
//                 // .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setExactLimit(2))
//             )
//             // .where("m", Predicates.blocks('gtceu:iv_parallel_hatch')
//             //     .or(Predicates.blocks('gtceu:ulv_machine_casing')))
//             .where("#", Predicates.any())
//             .where(" ", Predicates.air())
//             .where("@", Predicates.controller(Predicates.blocks(definition.get())))
//             .build())
//         .workableCasingRenderer(
//             "gtceu:block/casings/solid/machine_casing_inert_ptfe",
//             'gtceu:block/multiblock/generator/large_steam_turbine',
//             false
//         )

    
// });

// GTCEuStartupEvents.registry("gtceu:machine", event => {
//     // 锻造工厂
//     event.create("hammer_factory", 'multiblock')
//         // .machine(holder => new $CoilWorkableElectricMultiblockMachine(holder))
//         .tooltips(
//             Component.literal('§7原始时代的最高技术'),
//             Component.literal("§6自带9并行"),
//             Component.literal("使用少量能量获取远高于正常锻造锤的速度"),
//             Component.literal("依靠重力进行锻造"),
//         )
//         .tooltipBuilder($LLRMachines.LLR_ADD)
//         .rotationState(RotationState.NON_Y_AXIS)
//         .appearanceBlock(GTBlocks.CASING_STEEL_SOLID)
//         .recipeTypes(["hammer_factory"])
//         .recipeModifiers((machine,recipe) => $LLRRecipeModifiers.accurateParallel(machine,recipe,9).andThen($ModifierFunction.builder().durationMultiplier(100 /recipe.duration).build()))
//         .pattern(definition => FactoryBlockPattern.start()
//             .aisle("###f###", "###x###", "###x###", "###x###", "###x###", "###x###", "###x###")
//             .aisle("#  o  #", "#     #", "#     #", "#     #", "#     #", "#     #", "#  x  #")
//             .aisle("# ooo #", "#     #", "# ooo #", "#     #", "#     #", "#     #", "#  x  #")
//             .aisle("fooooof", "x     x", "x ooo x", "x  v  x", "x  v  x", "x  v  x", "xxxxxxx")
//             .aisle("# ooo #", "#     #", "# ooo #", "#     #", "#     #", "#     #", "#  x  #")
//             .aisle("#  o  #", "#     #", "#     #", "#     #", "#     #", "#     #", "#  x  #")
//             .aisle("###@###", "###x###", "###x###", "###x###", "###x###", "###x###", "###x###")
//             .where("x", Predicates.blocks('gtceu:lv_machine_casing'))
//             .where("v", Predicates.blocks('gtceu:steel_frame'))
//             .where("o", Predicates.blocks('gtceu:steel_block'))
//             .where("f", Predicates.abilities(PartAbility.INPUT_ENERGY).setExactLimit(1)
//                 .or(Predicates.abilities(PartAbility.IMPORT_ITEMS))
//                 .or(Predicates.abilities(PartAbility.EXPORT_ITEMS))
//                 // .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setExactLimit(2))
//             )
//             // .where("m", Predicates.blocks('gtceu:iv_parallel_hatch')
//             //     .or(Predicates.blocks('gtceu:ulv_machine_casing')))
//             .where("#", Predicates.any())
//             .where(" ", Predicates.air())
//             .where("@", Predicates.controller(Predicates.blocks(definition.get())))
//             .build())
//         .workableCasingRenderer(
//             "gtceu:block/casings/voltage/ulv/bottom",
//             'gtceu:block/multiblock/generator/large_steam_turbine',
//             false
//         )
// })