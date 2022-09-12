import { InteractionType } from "discord.js";
import { readdirSync } from "fs";
import { join as joinPath } from "path";

import Event from "../structures/Event";
import Command from "../structures/Command";
import { Package, Logger, unpack } from "../utils";

export default class implements Handler {
    async preload() {
        let { bot, rootPath } = Handler;

        Logger.debug('CommandsHandler: On');
        const dirpath = joinPath(rootPath, 'commands');
    
        bot.on('commandBuild', (command: Command) => {
            Logger.debug(`CommandsHandler: ${command.name} loaded`);
    
            bot.commands.create(command);
        });
    
        for(let fileName of readdirSync(dirpath)) {
            const packagedCommand: Package<Command> = await import(joinPath(dirpath, fileName));
            const command = unpack(packagedCommand);
            if(!command) continue;
    
            Logger.debug(`CommandsHandler: ${command.name} loaded`);
    
            bot.commands.create(command);
        }

        bot.on('interactionCreate', async interaction => {
            if(interaction.type !== InteractionType.ApplicationCommand) return;

            const command = <Command>bot.commands.cache.get(interaction.commandName);

            try {
                await command.run({ interaction, bot });
            } catch (err: any) {
                Logger.error('Command failed', err);
            }
        });
    }
    async load(global: boolean = false) {
        let { bot } = Handler;
        for(let command of bot.commands.cache.values()) {
            if(command.test) await bot.testGuild?.commands.create({
                name: command.name,
                description: command.description,
                options: command.options,
            });
            else {
                if(!global) return;

                await bot.application?.commands.create({
                    name: command.name,
                    description: command.description,
                    options: command.options,
                });
            }
        }
    }
}