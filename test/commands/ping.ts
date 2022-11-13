import { Command } from '../../';

Command.build({
    name: 'ping',
    description: 'Envia pong!',
    options: [],
    test: true,
    async run({ interaction }) {
        interaction.editReply('Pong!');
    }
})