import { readdirSync } from "fs";
import { join as joinPath } from "path";

import { logger, Package, unpack } from "../utils";
import { IntentsManager } from "../managers/IntentsManager";
import Handler from "../structures/Handler";
import Event from "../structures/Event";

export default new Handler({
    async run(bot, rootPath) {
        logger.info('EventsHandler: On');
        const dirpath = joinPath(rootPath, 'events');
        
        bot.on('eventBuild', (event: Event<any>) => {
            registerEvent(event);
        });

        for(let fileName of readdirSync(dirpath)) {
            const PackagedEvent: Package<Event<any>> = await import(joinPath(dirpath, fileName));
            const file = unpack(PackagedEvent);
            if(!file) continue;
            
            registerEvent(file);
        }
        
        function registerEvent(event: Event<any>) {
            IntentsManager.pushIntentsByEvent(event.type);
            
            logger.info(`EventHandler: ${event.name} loaded`);

            try {
                bot.events.create(event);

                bot[event.once ? 'once' : 'on'](event.type, (...args) => event.run({ bot }, ...args));
            } catch(err) {
                logger.error(err);
            }
        }
    },
})