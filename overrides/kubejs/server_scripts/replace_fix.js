// priority: 10000

ServerEvents.recipes(event => {
    event.remove({output: 'create:electron_tube'})
    event.replaceInput({}, 'create:electron_tube', '#gtceu:circuits/ulv')
    event.replaceOutput({}, '#forge:sawdust', 'gtceu:wood_dust')
    event.replaceInput({}, '#forge:sawdust', 'gtceu:wood_dust')
})