import { readdirSync } from "fs";
import { join as joinPath } from "path";
import { WumpusClient } from "../client";
import { CacheManager } from "../managers";
import { Event } from "../structures";

import { Logger, Package, unpack } from "../utils";
import { BaseHandler } from "./BaseHandler";

export const EventsHandler = new class extends BaseHandler {
    async run({ client, path }: { client: WumpusClient, path: string }) {
        const dirpath = joinPath(path, 'events');

        for(let fileName of readdirSync(dirpath)) {
            const packagedEvent: Package<Event> = await import(joinPath(dirpath, fileName));

            const event = unpack(packagedEvent);
            if(!event) continue;
            
            const isActive = !CacheManager.has || await client.cache.events.get(event.name);
            if(isActive === false) continue;
            
            Logger.debug(`EventsHandler: ${event.name} loaded`);

            event.register(client);
        }
    }
}