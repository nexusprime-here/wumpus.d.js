import { GatewayIntentsString, IntentsBitField } from 'discord.js';
import data from './data.json';

export class IntentsManager {
    static intents: number = 1;

    static pushIntentsByEvent(selectedEvent: string) {
        for(const [intent, events] of Object.entries(data)) {
            if(events.includes(selectedEvent)) {
                this.intents += IntentsBitField.resolve(<GatewayIntentsString>intent);
            } else {
                continue;
            }
        }
    }
}