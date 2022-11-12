import { ApplicationCommandOptionData, Client, CommandInteraction, LocalizationMap, Permissions } from "discord.js";
import { WumpusClient } from "../client";
import { client } from "../client/instance";
import { CacheManager } from "../managers";
import { Logger } from "../utils";

export declare class CommandData {
    name: string;
    name_localizations?: LocalizationMap;
    description: string;
    description_localizations?: LocalizationMap;
    options: ApplicationCommandOptionData[];
    default_permission?: boolean;
    default_member_permissions?: Permissions | null;
    dm_permission?: boolean;
    test?: boolean;
}

export class Command {
    private static cache = new Map<string, Command>();
    static {
        client.on('interactionCreate', interaction => {
            if(!interaction.isChatInputCommand()) return;

            const foundCommand = this.cache.get(interaction.commandName);

            try {
                foundCommand!.run({
                    interaction,
                    bot: client
                });
            } catch(err) {
                console.error(`Comando deu errado: ${err}`);
            }
        })
    }

    public data: CommandData;
    public run: (options: {
        interaction: CommandInteraction;
        bot: WumpusClient<true>;
    }) => Promise<any>;

    static register(command: Command) {
        const commandsAplication = (client as Client<true>).application.commands;
        const testGuildId = client.testGuild?.id;

        commandsAplication.create(
            command.data,
            command.data.test 
                ? testGuildId 
                : undefined
        );

        Logger.debug(`Command ${command.data.name} loaded`);
    }
    static async build(command: Command['data'] & { run: Command['run'] }) {
        const { run, ...data } = command;

        const newCommand = new this(data, run);

        const isActive = !CacheManager.has || await client.cache.events.get(command.name);
        if(isActive === false) return;

        this.cache.set(newCommand.data.name, newCommand);
        Command.register(newCommand);
    }

    constructor(data: Command['data'], run: Command['run']) {
        this.data = data;
        this.run = run;
    }
}