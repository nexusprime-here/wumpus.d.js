import { ApplicationCommandOptionData, Client, CommandInteraction, LocalizationMap, Permissions } from "discord.js";
import type { WumpusClient } from "../client";
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

export interface ICommand extends CommandData { run: Command['run'] }

export default class Command {
    private static cache = new Map<string, Command>();
    static {
        client.on('interactionCreate', async interaction => {
            if(!interaction.isChatInputCommand()) return;
        
            const foundCommand = this.cache.get(interaction.commandName);
        
            try {
                await foundCommand!.run({
                    interaction,
                    bot: client
                })
            } catch(err) {
                Logger.error('CommandExecution: ', <Error>err);
            }
        })
    }

    public data!: CommandData;
    public run!: (options: {
        interaction: CommandInteraction;
        bot: WumpusClient<true>;
    }) => Promise<any>;

    private static register(command: Command) {
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
    static async build(command: ICommand) {
        const { run, ...data } = command;

        this.cache.set(data.name, { data, run });
        client.waitReady().then(() => Command.register({ data, run }));
    }
}