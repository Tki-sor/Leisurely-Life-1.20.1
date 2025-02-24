// priority: 0

ServerEvents.recipes(event => {
    // 料理乐事盘子
    event.remove({output: "cuisinedelight:plate"})
    event.shaped('5x cuisinedelight:plate', [
        "A A",
        "AAA"
    ], {
        A: '#minecraft:wooden_slabs'
    })
})
