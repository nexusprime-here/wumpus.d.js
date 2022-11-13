import { Event } from '../../';

Event.build({
    name: 'oi',
    type: 'messageCreate',
    async run(options, message) {
        message.react('👀')
    },
})