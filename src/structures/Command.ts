import Discord from "discord.js";
import type { WumpusClient } from "../client";
import { Logger } from "../utils";
import ResponseMethods from "./ResponseMethods";

interface ModifiedCommandInteraction<Cached extends Discord.CacheType = Discord.CacheType>
    extends Discord.CommandInteraction<Cached>, ResponseMethods { }

interface ICommand extends CommandData { run: Command['run'] }

export declare class CommandData {
    name: string;
    name_localizations?: Discord.LocalizationMap;
    description: string;
    description_localizations?: Discord.LocalizationMap;
    options: Discord.ApplicationCommandOptionData[];
    default_permission?: boolean;
    default_member_permissions?: Discord.Permissions | null;
    dm_permission?: boolean;
}

export default class Command {
    static cache = new Map<string, Command>();

    public data: CommandData;
    public run: (options: {
        interaction: ModifiedCommandInteraction;
        bot: WumpusClient<true>;
    }) => Promise<any>;

    static listen(client: WumpusClient, cache: Map<string, Command> = Command.cache) {
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const foundCommand = cache.get(interaction.commandName);
            if (!foundCommand) {
                Logger.error(`CommandExecution: The command ${interaction.commandName} not found on cache`);

                return;
            }

            try {
                const responseMethods = ResponseMethods.get(interaction, client.config);
                Object.assign(interaction, responseMethods);

                await foundCommand.run({
                    interaction: <ModifiedCommandInteraction>interaction,
                    bot: client
                });
            } catch (err: any) {
                Logger.error(`CommandExecution: ${err.message}`, err.stack);
            }
        });

    }
    static register({ client, command, guild }: {
        command: Command, client: WumpusClient, guild?: Discord.Guild
    }) {
        const commandsAplication = (client as Discord.Client<true>).application.commands;

        commandsAplication.create(
            command.data,
            guild?.id
        );
    }
    static build(command: ICommand) {
        const { run, ...data } = command;

        return new this(run, data);
    }

    private constructor(run: Command['run'], data: Command['data']) {
        this.data = data;
        this.run = run;
    }
}