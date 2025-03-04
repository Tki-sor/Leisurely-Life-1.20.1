ServerEvents.recipes(event => {
    // 移除
    let re = ['createsifter:andesite_mesh', 'createsifter:zinc_mesh', 'createsifter:brass_mesh', 'createsifter:advanced_brass_mesh']
    re.forEach(mesh => {
        event.remove({ output: mesh })
    })

    // 线筛网
    event.remove({ output: 'createsifter:string_mesh' })
    event.shaped('createsifter:string_mesh', [
        "AAA",
        "ABA",
        "AAA"
    ], {
        A: 'minecraft:stick',
        B: 'exdeorum:string_mesh'
    })

    // 燧石筛网
    event.shaped('createsifter:flint_mesh', [
        "AAA",
        "ABA",
        "AAA"
    ], {
        A: 'minecraft:stick',
        B: 'exdeorum:flint_mesh'
    })
    event.shaped('createsifter:flint_mesh', [
        " A ",
        "ABA",
        " A "
    ], {
        A: '#forge:gems/flint',
        B: 'createsifter:string_mesh'
    })

    // 锻铁筛网
    event.shaped('createsifter:wrought_iron_mesh', [
        "AAA",
        "ABA",
        "AAA"
    ], {
        A: 'minecraft:stick',
        B: 'exdeorum:iron_mesh'
    })
    event.shaped('createsifter:wrought_iron_mesh', [
        " A ",
        "ABA",
        " A "
    ], {
        A: '#forge:ingots/wrought_iron',
        B: 'createsifter:flint_mesh'
    })

    // 钢筛网
    event.recipes.gtceu.assembler("create:steel_sieve_1")
        .EUt(30)
        .itemInputs('9x gtceu:steel_single_wire', '12x #forge:screws/steel', '8x minecraft:stick')
        .itemOutputs('createsifter:steel_mesh')
        .duration(7.5 * 20)
    
    // 不锈钢筛网
    event.recipes.gtceu.assembler("create:stainless_steel_sieve"+getIncNum())
        .EUt(120)
        .itemInputs('12x gtceu:kanthal_single_wire', '12x #forge:screws/stainless_steel', '8x minecraft:stick')
        .itemOutputs('createsifter:stainless_steel_mesh')
        .duration(15 * 20)
})