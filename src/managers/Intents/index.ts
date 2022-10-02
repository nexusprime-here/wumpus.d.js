// import { GatewayIntentsString, IntentsBitField } from 'discord.js';
// import { WumpusClient } from '../../client';

// export class Intent {
//     name: GatewayIntentsString;
//     events: string[];
//     require?: Intent[];

//     constructor(obj: Intent) {
//         this.name = obj.name;
//         this.events = obj.events;
//         this.require = obj.require;
//     }
// }

// import * as data from './data';

// export class IntentsManager {
//     private static usedIntents: string[] = [];
//     private static clientIntent: IntentsBitField

//     constructor(intents: WumpusClient['options']['intents']) {
//         IntentsManager.clientIntent = <IntentsBitField>intents;
//         IntentsManager.clientIntent = new IntentsBitField();
//     }
    
//     static pushByEvent(selectedEvent: string) {

//         const walk = (data: Intent[]) => {
//             for(const {name, events, require} of data) {
//                 if(events.includes(selectedEvent)) continue;
//                 if(this.usedIntents.includes(name)) continue;

//                 this.clientIntent.add(name);

//                 if(require) {
//                     walk(require);
//                 }
//             }
//         }

//         walk(Object.values(data));
//     }
// }