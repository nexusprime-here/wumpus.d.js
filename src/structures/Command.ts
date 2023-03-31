import type D from "discord.js";
import type { WumpusClient } from "../client";
import { Logger } from "../utils";

interface ICommand extends CommandData {
	run: Command["run"];
}

export declare class CommandData {
	name: string;
	name_localizations?: D.LocalizationMap;
	description: string;
	description_localizations?: D.LocalizationMap;
	options: D.ApplicationCommandOptionData[];
	default_permission?: boolean;
	default_member_permissions?: D.Permissions | null;
	dm_permission?: boolean;
}

export default class Command {
	static cache = new Map<string, Command>();

	public data: CommandData;
	public run: (options: {
		interaction: D.ChatInputCommandInteraction;
		bot: WumpusClient<true>;
	}) => Promise<any>;

	static listen(
		client: WumpusClient,
		cache: Map<string, Command> = Command.cache
	) {
		client.on("interactionCreate", async (interaction: D.Interaction) => {
			if (!interaction.isChatInputCommand()) return;

			const foundCommand = cache.get(interaction.commandName);
			if (!foundCommand) {
				Logger.error(
					`CommandExecution: The command ${interaction.commandName} not found on cache`
				);

				return;
			}

			try {
				await foundCommand.run({
					interaction,
					bot: client,
				});
			} catch (err: any) {
				Logger.error(`CommandExecution: ${err.message}`, err.stack);
			}
		});
	}
	static register({
		client,
		command,
		guild,
	}: {
		command: Command;
		client: WumpusClient;
		guild?: D.Guild;
	}) {
		const commandsAplication = (client as D.Client<true>).application.commands;

		commandsAplication.create(command.data, guild?.id);
	}
	static build(command: ICommand) {
		const { run, ...data } = command;

		return new this(run, data);
	}

	private constructor(run: Command["run"], data: Command["data"]) {
		this.data = data;
		this.run = run;
	}
}
