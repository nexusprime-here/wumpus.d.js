import { WumpusCommand } from '../../';

module.exports = WumpusCommand.build({
    name: 'bot',
    description: 'teste',
    options: [],
    test: true,
    async run({ interaction }) {
        interaction.reply('o bot ta on pae');
    }
})