
ServerEvents.recipes(event => {
    let { create } = event.recipes

})

ServerEvents.recipes(event => {
    // let { createmetallurgy } = event.recipes
    function add_tic(input, amount, output, temperature, time) {
        event.custom({
            "type": "tconstruct:melting",
            "ingredient": {
                "item": input
            },
            "result": {
                "amount": amount,
                "fluid": output
            },
            "temperature": temperature,
            "time": time
        })
    }

    {
        // 锌
        let rest = "sphalerite"
        let fluid = "gtceu:zinc"
        let tic_time = 8

        let crushed_ore = `gtceu:crushed_${rest}_ore`
        let purified_ore = `gtceu:purified_${rest}_ore`
        let refined_ore = `gtceu:refined_${rest}_ore`
        let pure_dust = `gtceu:pure_${rest}_dust`
        let impure_dust = `gtceu:impure_${rest}_dust`

        add_tic(crushed_ore, 144, fluid, 800, tic_time * 4)
        add_tic(purified_ore, 144, fluid, 800, tic_time * 4)
        add_tic(refined_ore, 144, fluid, 800, tic_time * 4)
        add_tic(pure_dust, 144, fluid, 800, tic_time * 4)
        add_tic(impure_dust, 144, fluid, 800, tic_time * 4)
    }

    // 材料 时间 匠魂时间
    let meltings = [
        ['minecraft:iron', 10, 15],
        ['gtceu:brass', 8, 12],
        ['minecraft:gold', 8, 12],
        ['minecraft:copper', 10, 14],
        ['gtceu:bronze', 8, 12],
        ['gtceu:tin', 6, 10],
        // ['gtceu:zinc', 6, 10],
        [ris(ingots.cobalt.item), 12, 18],
        [ris(ingots.silver.item), 8, 12],
        [ris(ingots.lead.item), 10, 15],
    ]
    event.remove({ type: "createmetallurgy:casting_in_basin" })
    event.remove({ type: "createmetallurgy:alloying" })
    event.remove({ type: "createmetallurgy:melting" })
    event.remove({ type: "createmetallurgy:casting_in_table" })

    // 铸模(锭)
    event.remove({ output: '#forge:graphite_molds' })
    meltings.forEach(melting => {
        let ingot = ""
        let dust = ""
        let nugget = ""
        let time = melting[1]
        let fluid = melting[0]

        let rest = melting[0].slice(melting[0].indexOf(':') + 1)
        let crushed_ore = `gtceu:crushed_${rest}_ore`
        let purified_ore = `gtceu:purified_${rest}_ore`
        let refined_ore = `gtceu:refined_${rest}_ore`
        let pure_dust = `gtceu:pure_${rest}_dust`
        let impure_dust = `gtceu:impure_${rest}_dust`
        if (melting[0].startsWith("gtceu")) {
            ingot = melting[0] + "_ingot"
            dust = melting[0] + "_dust"
            nugget = melting[0] + "_nugget"
        } else {
            // let prefix = melting[0].slice(melting[0].indexOf(':'))
            ingot = melting[0] + "_ingot"

            dust = `gtceu:${rest}_dust`
            fluid = `gtceu:${rest}`

            nugget = melting[0] + "_nugget"
            if (Ingredient.of(`#forge:nuggets/${rest}`).test(nugget)) {
                nugget = melting[0] + "_nugget"
            } else {
                nugget = `gtceu:${rest}_nugget`
            }
        }

        // tic3
        let tic_time = melting[2]
        add_tic(crushed_ore, 144, fluid, 800, tic_time * 4)
        add_tic(purified_ore, 144, fluid, 800, tic_time * 4)
        add_tic(refined_ore, 144, fluid, 800, tic_time * 4)
        add_tic(pure_dust, 144, fluid, 800, tic_time * 4)
        add_tic(impure_dust, 144, fluid, 800, tic_time * 4)
    })
})