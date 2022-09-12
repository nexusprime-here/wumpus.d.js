import { readdirSync } from "fs";
import { join as joinPath } from "path";

import { Logger, Package, unpack } from "../utils";
import Handler from "../structures/Handler";
import Event from "../structures/Event";

export default class implements Handler {
    async preload() {
        let { bot, rootPath } = Handler;
        
        Logger.debug('EventsHandler: On');
        const dirpath = joinPath(rootPath, 'events');
        
        bot.on('eventBuild', (event: Event<any>) => {
            registerEvent(event);
        });

        for(let fileName of readdirSync(dirpath)) {
            const packagedEvent: Package<Event<any>> = await import(joinPath(dirpath, fileName));
            const event = unpack(packagedEvent);
            if(!event) continue;
            
            registerEvent(event);
        }
        
        function registerEvent(event: Event<any>) {
            Logger.debug(`EventsHandler: ${event.name} loaded`);

            try {
                bot.events.create(event);

                bot[event.once ? 'once' : 'on'](event.type, (...args) => event.run({ bot }, ...args));
            } catch(err: any) {
                Logger.error('Event failed', err);
            }
        }
    }
    load() {}
}