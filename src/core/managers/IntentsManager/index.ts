import { GatewayIntentsString, IntentsBitField } from 'discord.js';
import Intent from '../../structures/Intent';
import { Logger } from '../../utils';
import * as data from './data';

export class IntentsManager {
    static intents: number = 0;
    private static usedIntents: string[] = [];
    
    static pushIntentsByEvent(selectedEvent: string) {
        const walkIn = (data: Intent[], isRequire: boolean = false) => {
            for(const intent of data) {
                if(isRequire || intent.events.includes(selectedEvent)) {
                    if(this.usedIntents.find(i => i === intent.name)) {
                        continue;
                    } else {
                        Logger.debug('Intent loaded: ' + intent.name);

                        if(intent.require) {
                            walkIn(intent.require, true);
                        }

                        this.usedIntents.push(intent.name);
                        this.intents += IntentsBitField.resolve(<GatewayIntentsString>intent.name);
                    }
                } else {
                    continue;
                }
            }
        }

        walkIn(Object.values(data))
    }
}