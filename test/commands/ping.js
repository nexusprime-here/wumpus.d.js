/**
 * @type {import('../../typings')}
 */
const Ping = new WuCommand({
    name: 'ping',
    description: 'Envia pong!',
    test: true,
    run({ interaction }) {
        interaction.reply('Pong!');
    }
})

module.exports = Ping;