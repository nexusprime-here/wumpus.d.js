import { InteractionType } from "discord.js";
import { readdirSync } from "fs";
import { join as joinPath } from "path";
import { WumpusClient } from "../client";
import { CacheManager } from "../managers";
import { Command } from "../structures";
import { Package, Logger, unpack } from "../utils";
import { BaseHandler } from "./BaseHandler";

export const CommandsHandler = new class extends BaseHandler {
    private commands = new Map<string, Command>();

    async run({ client, path }: { client: WumpusClient, path: string }) {
        const dirpath = joinPath(path, 'commands');
    
        for(let fileName of readdirSync(dirpath)) {
            const packagedCommand: Package<Command> = await import(joinPath(dirpath, fileName));

            const command = unpack(packagedCommand);
            if(!command) continue;
            
            const isActive = !CacheManager.has || await client.cache.events.get(command.name);
            if(isActive === false) continue;
    
            Logger.debug(`CommandsHandler: ${command.name} loaded`);
    
            this.commands.set(command.name, command);
            client.waitReady().then(client => command.register(client));
        }

        client.on('interactionCreate', async interaction => {
            if(interaction.type !== InteractionType.ApplicationCommand) return;

            const command = <Command>this.commands.get(interaction.commandName);

            try {
                await command.run({ interaction, client });
            } catch (err: any) {
                Logger.error('Command failed', err);
            }
        });
    }
}