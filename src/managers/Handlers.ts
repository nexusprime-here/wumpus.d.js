import { existsSync, readdirSync } from "fs";
import path from "path";
import { Logger } from "../utils";
import type { WumpusClient } from "../client";
import Command from "../structures/Command";
import Event from "../structures/Event";
import { ConfigManager } from "./Config";

type Options = { targetPath: string, handlers: ConfigManager['handlers'], client: WumpusClient }
export class HandlersManager {
    static client: WumpusClient<boolean>;

    static start({ targetPath, handlers, client }: Options) {
        this.client = client;
        const { commands, events } = handlers;

        if (commands) client.waitReady().then(() => {
            const dirPath = path.join(targetPath, 'commands');
            if (!existsSync(dirPath)) return;
            
            let count = 0;
            for (const fileName of readdirSync(dirPath)) {
                HandlersManager.loadCommandFile(path.join(dirPath, fileName));

                count++;
            }

            Logger.debug(`${count} commands are loaded`);
        })
        
        if (events) {
            const dirPath = path.join(targetPath, 'events');
            if (!existsSync(dirPath)) return;
    
            let count = 0;
            for (const fileName of readdirSync(dirPath)) {
                HandlersManager.loadEventFile(path.join(dirPath, fileName));

                count++;
            }
            
            Logger.debug(`${count} events are loaded`);
        }
    }

    static async loadCommandFile(commandPath: string) {
        const commandFile = await import(commandPath);
        
        for (const [_, value] of Object.entries(commandFile)) {
            if (!(value instanceof Command)) continue;

            const { data, run } = value;

            Command.cache.set(data.name, { data, run });
            Command.register({ 
                command: { data, run },
                client: this.client
            })

            return value;
        }
    }

    static async loadEventFile(eventPath: string) {
        const eventFile = await import(eventPath);

        for (const [_, value] of Object.entries(eventFile)) {
            if (!(value instanceof Event)) continue;
        
            const { data, run } = value;

            this.client[data.once ? 'once' : 'on'](
                <any>data.type,
                (...args: any) => run({ client: this.client }, ...args)
            );

            return value;
        }
    }
}