/**
 * @type {import('../../typings')}
 */
module.exports = new WuEvent({
    name: 'eitaa',
    type: 'messageCreate',
    run({ client }, message) {
        message.reply('foi?')
    }
})