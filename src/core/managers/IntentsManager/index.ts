import { GatewayIntentsString, IntentsBitField } from 'discord.js';
import { Logger } from '../../utils';
import data from './data.json';

export class IntentsManager {
    static intents: number = 1;
    private static usedIntents: string[] = [];
    
    static pushIntentsByEvent(selectedEvent: string) {
        for(const [intent, events] of Object.entries(data)) {
            if(events.includes(selectedEvent)) {
                Logger.debug('Intent loaded: ' + intent);

                if(this.usedIntents.find(i => i === intent)) {
                    continue;
                } else {
                    this.usedIntents.push(intent);
                    this.intents += IntentsBitField.resolve(<GatewayIntentsString>intent);
                }
            } else {
                continue;
            }
        }
    }
}