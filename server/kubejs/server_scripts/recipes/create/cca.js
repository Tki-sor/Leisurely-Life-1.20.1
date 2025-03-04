ServerEvents.recipes(event => {
    // 杆
    event.remove({type:"createaddition:rolling" ,output: '#forge:rods'})

    // 通量发电机
    event.replaceInput({output: 'createaddition:alternator'}, '#forge:plates/iron', '#forge:plates/bronze')

})