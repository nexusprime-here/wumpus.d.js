import { existsSync } from 'fs';
import path from 'path';
import { WumpusClient } from '../client';
import { CommandsHandler, EventsHandler } from '../handlers';

export class HandlerManager {
    public commands = CommandsHandler;
    public events = EventsHandler;
    
    constructor(obj: { client: WumpusClient, path: string, config: any }) {
        const { client, config } = obj;

        for(let handlerName of <(keyof HandlerManager)[]>Object.keys(config)) {
            if(!config[handlerName] || !existsDir(handlerName)) continue;

            this[handlerName].run(obj);
        }

        function existsDir(handlerName: string) {
            return existsSync(path.join(client.rootPath, handlerName));
        }
    }
}