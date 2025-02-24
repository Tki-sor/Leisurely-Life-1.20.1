// priority: 0

ServerEvents.recipes(event => {
    // 无中生有 锤子
    event.remove({ output: '#exdeorum:hammers' })
    event.shaped('exdeorum:stone_hammer', [
        ' SH',
        ' TS',
        'T  '], {
        S: '#forge:cobblestone',
        T: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })
    event.shaped('exdeorum:iron_hammer', [
        ' SH',
        ' TS',
        'T  '], {
        S: '#forge:plates/iron',
        T: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })
    event.shaped('exdeorum:diamond_hammer', [
        ' SH',
        ' TS',
        'T  '], {
        S: '#forge:gems/diamond',
        T: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })


    // 筛子
    event.remove({ output: 'exdeorum:oak_sieve' })
    event.shaped('exdeorum:oak_sieve', [
        'WHW',
        'WMW',
        'S S'
    ], {
        W: '#minecraft:planks',
        M: '#minecraft:wooden_slabs',
        S: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })
    event.remove({ output: 'exdeorum:oak_compressed_sieve' })
    event.shaped('exdeorum:oak_compressed_sieve', [
        'WHW',
        'WMW',
        'S S'
    ], {
        W: '#minecraft:oak_logs',
        M: '#minecraft:wooden_slabs',
        S: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })
    let sieveList = [
        'exdeorum:spruce_sieve', 'exdeorum:birch_sieve', 'exdeorum:jungle_sieve', 'exdeorum:acacia_sieve', 'exdeorum:dark_oak_sieve', 'exdeorum:mangrove_sieve', 'exdeorum:cherry_sieve', 'exdeorum:bamboo_sieve', 'exdeorum:crimson_sieve', 'exdeorum:warped_sieve']
    sieveList.forEach(sieve => {
        let type = sieve.match(/:(.*?)_sieve/)[1]
        let plank = `minecraft:${type}_planks`
        let slab = `minecraft:${type}_slab`
        event.remove({ output: sieve })
        event.shaped(sieve, [
            'WHW',
            'WMW',
            'S S'
        ], {
            W: plank,
            M: slab,
            S: '#forge:rods/wooden',
            H: '#forge:tools/mallets'
        })

    })

    // 压缩筛子
    let comSieveList = [
        'exdeorum:spruce_sieve', 'exdeorum:birch_sieve', 'exdeorum:jungle_sieve', 'exdeorum:acacia_sieve', 'exdeorum:dark_oak_sieve', 'exdeorum:mangrove_sieve', 'exdeorum:cherry_sieve'
    ]
    comSieveList.forEach(sieve => {
        let type = sieve.match(/:(.*?)_sieve/)[1]
        let comSieve = `exdeorum:${type}_compressed_sieve`
        let log = `minecraft:${type}_log`
        let slab = `minecraft:${type}_slab`
        event.remove({ output: comSieve })
        event.shaped(comSieve, [
            'WHW',
            'WMW',
            'S S'
        ], {
            W: log,
            M: slab,
            S: '#forge:rods/wooden',
            H: '#forge:tools/mallets'
        })
    })
    event.remove({ output: 'exdeorum:bamboo_compressed_sieve' })
    event.remove({ output: 'exdeorum:warped_compressed_sieve' })
    event.remove({ output: 'exdeorum:crimson_compressed_sieve' })
    event.shaped('exdeorum:bamboo_compressed_sieve', [
        'WHW',
        'WMW',
        'S S'
    ], {
        W: '#minecraft:bamboo_blocks',
        M: 'minecraft:bamboo_slab',
        S: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })
    event.shaped('exdeorum:warped_compressed_sieve', [
        'WHW',
        'WMW',
        'S S'
    ], {
        W: '#minecraft:warped_stems',
        M: 'minecraft:warped_slab',
        S: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })
    event.shaped('exdeorum:crimson_compressed_sieve', [
        'WHW',
        'WMW',
        'S S'
    ], {
        W: '#minecraft:crimson_stems',
        M: 'minecraft:crimson_slab',
        S: '#forge:rods/wooden',
        H: '#forge:tools/mallets'
    })


    // 锻铁筛网
    event.replaceInput({ output: "exdeorum:iron_mesh" }, "minecraft:iron_ingot", '#forge:ingots/wrought_iron')

    // 陶瓷桶
    event.replaceOutput({ output: 'exdeorum:porcelain_bucket' }, 'exdeorum:porcelain_bucket', 'ceramicbucket:ceramic_bucket')
    event.remove({ output: 'ceramicbucket:unfired_clay_bucket' })
    event.remove({ input: 'ceramicbucket:unfired_clay_bucket' })

    // 木屑
    event.remove({ id: 'exdeorum:hammer/wood_chippings' })
    event.remove({ id: 'excompressum:hammer/logs' })
    event.custom({
        "type": "exdeorum:hammer",
        "ingredient": [
            {
                "tag": "minecraft:logs"
            }
        ],
        "result": 'gtceu:wood_dust',
        "result_amount": {
            "type": "minecraft:uniform",
            "max": 4.0,
            "min": 1.0
        }
    })

    // 瓷土
    event.remove({ output: 'exdeorum:porcelain_clay_ball' })
    event.shapeless('exdeorum:porcelain_clay_ball', ['#forge:ingots/clay', 'gtceu:wood_dust', 'minecraft:bone_meal'])

    // 沙砾
    event.custom({
        "type": "exdeorum:hammer",
        "ingredient": {
            "item": 'minecraft:tuff'
        },
        "result": 'minecraft:gravel',
        "result_amount": 1.0
    })
})

ServerEvents.recipes(event => {
    // exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=none]', 10)

    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=smouldering]', 3)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=fading]', 6)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=kindled]', 10)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=seething]', 15)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=smouldering,upgraded=true]', 3)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=fading,upgraded=true]', 6)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=kindled,upgraded=true]', 10)
    exdeorum.setCrucibleHeatValueForState('moreburners:electric_burner[blaze=seething,upgraded=true]', 15)
})