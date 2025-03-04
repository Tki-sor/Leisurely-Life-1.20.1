
let $WailaClientRegistration;
let $WailaBlockAccessor;
let $RealisticTorchBlock
if (Platform.isClientEnvironment()) {
    $WailaClientRegistration = Java.loadClass('snownee.jade.impl.WailaClientRegistration');
    $WailaBlockAccessor = Java.loadClass('snownee.jade.api.BlockAccessor');
}

StartupEvents.postInit(event => {
    if (!Platform.isClientEnvironment()) return;

    $WailaClientRegistration.INSTANCE.addTooltipCollectedCallback(0, (tooltip, accessor) => {
        if (!(accessor instanceof $WailaBlockAccessor)) return;
        if (accessor.getBlockEntity() == null) return;
        if (accessor.getBlockEntity().getCurrentMana == null || accessor.getBlockEntity().getMaxMana == null) return;
        let addToTooltip = comp => tooltip['add(net.minecraft.network.chat.Component)'](comp);
        let mana = accessor.getBlockEntity().getCurrentMana();
        let cap = accessor.getBlockEntity().getMaxMana();
        addToTooltip(Text.aqua(`${Text.translate('jade.tooltip.mana').getString()}: ${mana}/${cap}`));
    });

    $WailaClientRegistration.INSTANCE.addTooltipCollectedCallback(0, (tooltip, accessor) => {
        if (!(accessor instanceof $WailaBlockAccessor)) return;
        if (accessor.getBlockEntity() == null) return;
        let blockEntity = accessor.getBlockEntity();
        if (blockEntity.getMana == null || blockEntity.getMaxMana == null || blockEntity.getBindingPos == null) return;
        let addToTooltip = comp => tooltip['add(net.minecraft.network.chat.Component)'](comp);
        let pos = blockEntity.getBindingPos();
        let mana = blockEntity.getMana();
        let cap = blockEntity.getMaxMana();
        addToTooltip(
            Text.aqua(
                `${pos == null
                    ? Text.translate('jade.tooltip.notbound').getString()
                    : `${Text.translate('jade.tooltip.boundto').getString()} ${pos.x} ${pos.y} ${pos.z}`
                }`
            )
        );
        addToTooltip(Text.aqua(`${Text.translate('jade.tooltip.mana').getString()}: ${mana}/${cap}`));
    });

    $WailaClientRegistration.INSTANCE.addTooltipCollectedCallback(0, (tooltip, accessor) => {
        if (!(accessor instanceof $WailaBlockAccessor)) return;
        if (accessor.block.id != 'botania:runic_altar') return;
        let addToTooltip = comp => tooltip['add(net.minecraft.network.chat.Component)'](comp);
        let mana = accessor.getBlockEntity().getCurrentMana();
        let cap = accessor.getBlockEntity().manaToGet;
        addToTooltip(Text.aqua(`${Text.translate('jade.tooltip.mana').getString()}: ${mana}/${cap}`));
    });

    $WailaClientRegistration.INSTANCE.addTooltipCollectedCallback(0, (tooltip, accessor) => {
        if (!(accessor instanceof $WailaBlockAccessor)) return;
        if (accessor.block.id != 'vinery:calendar') return;
        let addToTooltip = comp => tooltip['add(net.minecraft.network.chat.Component)'](comp);
        let time = Client.player.level.getDayTime();

        // 计算天数（整数部分）
        let day = Math.floor(time / 24000);

        // 计算剩余的时间（一天中的时间）
        let timeOfDay = time % 24000;

        // 计算小时（取余后计算）
        let hour = Math.floor(timeOfDay / 1000);

        // 计算剩余的刻数用于分钟的计算
        let minute = Math.floor((timeOfDay % 1000) / 1000 * 60);

        // 显示在提示中
        addToTooltip(Text.aqua(`${Text.translate('jade.tooltip.time').getString()}: ${day} 天 ${hour} 小时 ${minute} 分钟`));
    })

});
