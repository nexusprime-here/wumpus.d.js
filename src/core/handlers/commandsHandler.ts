import { InteractionType } from "discord.js";
import { readdirSync } from "fs";
import { join as joinPath } from "path";

import Handler from "../structures/Handler";
import { Package, logger, unpack } from "../utils";
import Command from "../structures/Command";

export default new Handler({
    async run(bot, rootPath) {
        logger.info('CommandHandler: On');
        const dirpath = joinPath(rootPath, 'commands');

        bot.on('commandBuild', (command: Command) => {
            logger.info(`CommandHandler: ${command.name} loaded`);

            bot.commands.create(command);
        });

        for(let fileName of readdirSync(dirpath)) {
            const PackagedCommand: Package<Command> = await import(joinPath(dirpath, fileName));
            const file = unpack(PackagedCommand);
            if(!file) continue;

            logger.info(`CommandHandler: ${file.name} loaded`);

            bot.commands.create(file);
        }

        bot.once('ready', async () => {
            for(let command of bot.commands.cache.values()) {
                let commandsCache = await bot.application?.commands.fetch();
                let hasCommand = !!commandsCache?.find(c => c.name === command.name);
    
                if(hasCommand) continue;
    
                registerCommand(command);
            }
        });

        bot.on('interactionCreate', async interaction => {
            if(interaction.type !== InteractionType.ApplicationCommand) return;

            const command = <Command>bot.commands.cache.get(interaction.commandName);

            try {
                await command.run({ interaction, bot });
            } catch (err) {
                logger.error(err);
            }
        });

        
        function registerCommand(command: Command) {
            if(command.test) return bot.testGuild?.commands.create({
                name: command.name,
                description: command.description,
                options: command.options,
            });
            else return bot.application?.commands.create({
                name: command.name,
                description: command.description,
                options: command.options,
            });
        }
    }
})