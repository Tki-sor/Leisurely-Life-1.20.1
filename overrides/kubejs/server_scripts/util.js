// priority: 999999

const colorList = [
    'white',
    'orange',
    'magenta',
    'light_blue',
    'yellow',
    'lime',
    'pink',
    'gray',
    'light_gray',
    'cyan',
    'purple',
    'blue',
    'brown',
    'green',
    'red',
    'black'
]

// 直接定义为对象
const ores = {
    iron: { item: '', tag: '' },
    gold: { item: '', tag: '' },
    diamond: { item: '', tag: '' },
    copper: { item: '', tag: '' },
    tin: { item: '', tag: '' },
    silver: { item: '', tag: '' },
    lead: { item: '', tag: '' },
    nickel: { item: '', tag: '' },
    lithium: { item: '', tag: '' },
    aluminium: { item: '', tag: '' },
    zinc: { item: 'gtceu:crushed_sphalerite_ore', tag: '#forge:crushed_ores/sphalerite' },
    cobalt: { item: '', tag: '' },
    // 硫
    sulfur: { item: '', tag: '' },
    // 绿宝石
    emerald: { item: '', tag: '' },
    diamond: { item: '', tag: '' },
    // 蓝宝石
    sapphire: { item: '', tag: '' },
    // 红宝石
    ruby: { item: '', tag: '' },
    // 青金石
    lapis: { item: '', tag: '' },
    redstone: { item: '', tag: '' }
};

// 动态生成 item 和 tag
Object.keys(ores).forEach(oreType => {
    const ore = ores[oreType];

    // 只有当 item 为空时才生成
    if (!ore.item) {
        ore.item = `gtceu:crushed_${oreType}_ore`;
    }

    // 只有当 tag 为空时才生成
    if (!ore.tag) {
        ore.tag = `#forge:crushed_ores/${oreType}`;
    }
})

const ingots = {
    iron: { item: 'minecraft:iron_ingot', tag: '' },
    gold: { item: 'minecraft:gold_ingot', tag: '' },
    diamond: { item: 'minecraft:diamond', tag: '#forge:gems/diamond' },
    copper: { item: '', tag: '' },
    tin: { item: '', tag: '' },
    silver: { item: '', tag: '' },
    lead: { item: '', tag: '' },
    nickel: { item: '', tag: '' },
    lithium: { item: '', tag: '' },
    aluminium: { item: '', tag: '' },
    zinc: { item: '', tag: '' },
    cobalt: { item: '', tag: '' }
}

Object.keys(ingots).forEach(ingotType => {
    const ingot = ingots[ingotType];

    // 只有当 item 为空时才生成
    if (!ingot.item) {
        ingot.item = `gtceu:${ingotType}_ingot`;
    }

    // 只有当 tag 为空时才生成
    if (!ingot.tag) {
        ingot.tag = `#forge:ingots/${ingotType}`;
    }
})

function ris(itemName) {
    return itemName.replace(/_ingot$/, "")
}
let incNum = 0
function getIncNum() {
    incNum++
    return incNum
}

const rubbers_fluid = [
    Fluid.of('gtceu:rubber', 288),
    Fluid.of('gtceu:styrene_butadiene_rubber', 72),
    Fluid.of('gtceu:silicone_rubber', 144)
]