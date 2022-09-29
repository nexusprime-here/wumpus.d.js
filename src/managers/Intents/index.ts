import { GatewayIntentsString, IntentsBitField } from 'discord.js';
import { WumpusClient } from '../../client';
import { Logger } from '../../utils';

export class Intent {
    name: string;
    events: string[];
    require?: Intent[];

    constructor(obj: Intent) {
        this.name = obj.name;
        this.events = obj.events;
        this.require = obj.require;
    }
}

import * as data from './data';

export class IntentsManager {
    private static client: WumpusClient;
    private static usedIntents: string[] = [];

    constructor(client: WumpusClient) {
        IntentsManager.client = client;
    }
    
    static pushByEvent(selectedEvent: string) {
        const walkIn = (data: Intent[], isRequire: boolean = false) => {
            for(const intent of data) {
                if(!isRequire && !intent.events.includes(selectedEvent)) continue; 
                if(this.usedIntents.find(i => i === intent.name)) continue;
                
                Logger.debug('Intent loaded: ' + intent.name);

                if(intent.require) walkIn(intent.require, true);

                this.usedIntents.push(intent.name);
                
                this.client.options.intents = 0;
                this.client.options.intents += IntentsBitField.resolve(<GatewayIntentsString>intent.name);
            }
        }

        walkIn(Object.values(data));
    }
}