WuEvent.build({
    name: 'testando',
    description: 'evento para teste',
    type: 'messageReactionAdd',
    run(options, message) {
        console.log(message)
    },
})