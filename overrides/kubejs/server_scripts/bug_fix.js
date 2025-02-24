// priority: 9999

ServerEvents.recipes(event => {
    // 锤修复
    let fix = [
        "exdeorum:compressed_hammer/gravel",
        "exdeorum:compressed_hammer/sand",
        "exdeorum:compressed_hammer/dust",
        "exdeorum:compressed_hammer/crushed_deepslate",
        "exdeorum:compressed_hammer/crushed_netherrack",
        "exdeorum:compressed_hammer/crushed_blackstone",
        "exdeorum:compressed_hammer/crushed_end_stone",
        "exdeorum:compressed_hammer/red_sand"
    ]
    fix.forEach(f => {
        event.remove({id: f})
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": {
            "tag": "exdeorum:compressed/blackstone"
        },
        "result": 'exdeorum:compressed_crushed_blackstone',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": [
            {
                "tag": "exdeorum:compressed/deepslate"
            },
            {
                "tag": "exdeorum:compressed/cobbled_deepslate"
            }
        ],
        "result": 'exdeorum:compressed_crushed_deepslate',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": {
            "tag": "exdeorum:compressed/end_stone"
        },
        "result": 'exdeorum:compressed_crushed_end_stone',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": {
            "tag": "exdeorum:compressed/netherrack"
        },
        "result": 'exdeorum:compressed_crushed_netherrack',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": {
            "tag": "exdeorum:compressed/sands"
        },
        "result": 'exdeorum:compressed_dust',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": [
            {
                "tag": "exdeorum:compressed/cobblestone"
            },
            {
                "tag": "exdeorum:compressed/diorite"
            },
            {
                "tag": "exdeorum:compressed/granite"
            },
            {
                "tag": "exdeorum:compressed/andesite"
            }
        ],
        "result": 'exdeorum:compressed_gravel',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": {
            "tag": "exdeorum:compressed/gravel"
        },
        "result": 'exdeorum:compressed_sand',
        "result_amount": 1.0
    })
    event.custom({
        "type": "exdeorum:compressed_hammer",
        "ingredient": {
            "tag": "exdeorum:compressed/crushed_netherrack"
        },
        "result": 'exdeorum:compressed_red_sand',
        "result_amount": 1.0
    })
})