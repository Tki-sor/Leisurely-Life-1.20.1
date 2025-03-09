// priority: 10000

ServerEvents.recipes(event => {
    event.remove({output: 'create:electron_tube'})
    event.replaceInput({}, 'create:electron_tube', '#gtceu:circuits/ulv')
    event.replaceOutput({}, '#forge:sawdust', 'gtceu:wood_dust')
    event.replaceInput({}, '#forge:sawdust', 'gtceu:wood_dust')

    event.replaceInput({}, 'ae2:certus_quartz_crystal', '#forge:gems/certus_quartz')
    event.replaceOutput({}, 'ae2:certus_quartz_crystal', 'gtceu:certus_quartz_gem')
})