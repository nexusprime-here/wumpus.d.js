import '../../'

const Ping = new WumpusCommand({
    name: 'ping',
    description: 'Envia pong!',
    test: true,
    run({ interaction }) {
        interaction.reply('Pong!');
    }
})

module.exports = Ping;