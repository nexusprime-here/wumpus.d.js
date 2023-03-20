const { WumpusCommand } = require('../../');

module.exports = WumpusCommand.build({
    name: 'test',
    description: 'Testing the bot',
    options: [],
    run({ interaction }) {
        interaction.replyInfo('Tested 😳👍');
    }
})