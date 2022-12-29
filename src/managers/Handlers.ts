import { existsSync, readdirSync } from "fs";
import path from "path";
import { Logger } from "../utils";
import type { WumpusClient } from "../client";
import Command from "../structures/Command";
import Event from "../structures/Event";
import { ConfigManager } from "./Config";
import { watch } from "chokidar";

type Options = { targetPath: string, handlers: ConfigManager['handlers'], client: WumpusClient }
export class HandlersManager {
    static client: WumpusClient<boolean>;

    static watch({ targetPath, handlers, client }: Options) {
        this.client = client;
        const { commands, events } = handlers;

        if (commands) client.waitReady().then(() => {
            const dirPath = path.join(targetPath, 'commands');
            if (!existsSync(dirPath)) return;
            
            let count = 0;
            for (const fileName of readdirSync(dirPath)) (async () => {
                const { data, run } = <Command>await HandlersManager.loadFile({
                    type: 'command',
                    path: path.join(dirPath, fileName)
                });

                Command.register({
                    command: { data, run },
                    client: this.client
                });

                count++;
            })();

            Logger.debug(`${count} commands are loaded`);

            const commandWatcher = watch(dirPath, {
                interval: 3000,
                ignoreInitial: true
            });
            
            commandWatcher.on('all', async (event, f) => {
                if (event === 'change') {
                    Logger.warn(`Reloading some commands...`);

                    delete require.cache[require.resolve(f)];
                    await HandlersManager.loadFile({
                        type: 'command',
                        path: f
                    });
                } else if (['add', 'addDir'].includes(event)) {
                    Logger.warn('Loading new commands...');

                    await HandlersManager.loadFile({
                        type: 'command',
                        path: f
                    });
                }
            });
        })
        
        if (events) {
            const dirPath = path.join(targetPath, 'events');
            if (!existsSync(dirPath)) return;
    
            let count = 0;
            for (const fileName of readdirSync(dirPath)) {
                HandlersManager.loadFile({
                    type: 'event',
                    path: path.join(dirPath, fileName)
                });

                count++;
            }
            
            Logger.debug(`${count} events are loaded`);

            const eventWatcher = watch(dirPath, {
                interval: 3000,
                ignoreInitial: true
            })

            eventWatcher.on('all', async (event, f) => {
                if (event === 'change') {
                    Logger.warn(`Reloading some events...`);

                    delete require.cache[require.resolve(f)];
                    await HandlersManager.loadFile({
                        type: 'event',
                        path: f
                    });
                } else if (['add', 'addDir'].includes(event)) {
                    Logger.warn('Loading new events...');

                    await HandlersManager.loadFile({
                        type: 'event',
                        path: f
                    });
                }
            });
        }
    }

    static async loadFile({ path, type }: { path: string, type: 'event' | 'command' }) {
        const file = await import(path);

        for (const [_, value] of <[string, Command | Event<any>][]>Object.entries(file)) {
            if (type === 'command') {
                if (!(value instanceof Command)) continue;
                
                const { data, run } = value;
                
                Command.cache.set(data.name, { data, run });
            }
            else if (type === 'event') {
                if (!(value instanceof Event)) continue;

                const { data, run } = value;

                this.client[data.once ? 'once' : 'on'](
                    <any>data.type,
                    (...args: any) => run({ client: this.client }, ...args)
                );
            };

            return value;
        }
    }
}