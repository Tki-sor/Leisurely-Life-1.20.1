// priority: 1000

const tic = {
    /**
     * 融化
     * 
     * @param {Internal.JsonElement} output 将Fluid.of().toJson()即可，流体
     * @param {Internal.JsonElement} input ..反正toJson() 
     * @param {number} time 时间，单位是1/4秒
     * @param {number} temperature 温度
     */
    melting: function(output, input, time, temperature) {
    },

    /**
     * 铸件台
     * 
     * @param {string} output 物品id
     * @param {Internal.JsonElement} input 将Fluid.of().toJson()即可，流体
     * @param {Internal.JsonElement} multi_use tag，但去掉#
     * @param {number} time 时间，单位游戏刻
     */
    casting_table: function(output, input, multi_use, time) {
    },

    /**
     * 铸造盆
     * 
     * @param {string} output 物品id
     * @param {Internal.JsonElement} input 将Fluid.of().toJson()即可，流体
     * @param {number} time 时间，单位游戏刻
     */
    casting_basin: function(output, input, time) {
    }
}

ServerEvents.recipes(event => {
    tic.melting = function(output, input, time, temperature) {
        event.custom({
            "type": "tconstruct:melting",
            "ingredient": input,
            "result": output,
            "temperature": temperature,
            "time": time
        })
    }

    tic.casting_table = function(output, input, multi_use, time) {
        event.custom({
            "type": "tconstruct:casting_table",
            "cast": {
              "tag": multi_use
            },
            "cooling_time": time,
            "fluid": input,
            "result": output
          })
    }

    tic.casting_basin = function(output, input, time) {
        event.custom({
            "type": "tconstruct:casting_basin",
            "cooling_time": time,
            "fluid": input,
            "result": output
          })
    }
})
