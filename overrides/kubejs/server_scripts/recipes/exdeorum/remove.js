ServerEvents.recipes(event => {
    let comBlock = ['excompressum:compressed_end_stone', 'excompressum:compressed_diorite', 'excompressum:compressed_andesite', 'excompressum:compressed_granite', 'excompressum:compressed_crushed_diorite', 'excompressum:compressed_crushed_andesite', 'excompressum:compressed_crushed_granite', 'excompressum:compressed_dust', 'excompressum:compressed_cobblestone', 'excompressum:compressed_gravel', 'excompressum:compressed_sand', 'excompressum:compressed_dirt', 'excompressum:compressed_flint', 'excompressum:compressed_crushed_netherrack', 'excompressum:compressed_crushed_end_stone', 'excompressum:compressed_soul_sand', 'excompressum:compressed_netherrack']
    comBlock.forEach(block => {
        event.remove({output: block})
    })

    let sieves = ['exdeorum:golden_mesh', 'exdeorum:diamond_mesh', 'exdeorum:netherite_mesh']
    sieves.forEach(sieve => {
        event.remove({output: sieve})
    })
})