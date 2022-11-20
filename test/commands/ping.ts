import { WumpusCommand } from '../../';

export default WumpusCommand.build({
    name: 'ping',
    description: 'Envia pong!',
    options: [],
    test: true,
    async run({ interaction }) {
        interaction.reply('Pong oi');
    }
})