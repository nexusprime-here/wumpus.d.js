import type D from "discord.js";
import { EmbedBuilder } from "discord.js";
import { TemplateEmbed } from "../utils";
import { ConfigManager } from "../managers";

/**
 * FIXME: Response Methods não está injetando no interaction
 * TODO: Ver outra maneira de injetar métodos no interaction
 */

export default class ResponseMethods<Cached extends D.CacheType = D.CacheType> {
	private static interaction: D.ChatInputCommandInteraction;
	private static config: ConfigManager;

	ephemeralReply = false;

	replyError(
		data: string | D.EmbedData,
		options: { ephemeral: boolean } = { ephemeral: this.ephemeralReply }
	): Promise<D.InteractionResponse<D.BooleanCache<Cached>>> {
		const { config, interaction } = ResponseMethods;

		let embed;
		if (typeof data === "string") {
			embed = new TemplateEmbed(config.embeds.error).setDescription(data);
		} else {
			embed = new EmbedBuilder(data);
		}

		return interaction.reply({
			embeds: new Array(embed),
			ephemeral: options.ephemeral,
		});
	}

	replyWarn(
		data: string | D.EmbedData,
		options: { ephemeral: boolean } = { ephemeral: this.ephemeralReply }
	): Promise<D.InteractionResponse<D.BooleanCache<Cached>>> {
		const { config, interaction } = ResponseMethods;

		let embed;
		if (typeof data === "string") {
			embed = new TemplateEmbed(config.embeds.warn).setDescription(data);
		} else {
			embed = new EmbedBuilder(data);
		}

		return interaction.reply({
			embeds: new Array(embed),
			ephemeral: options.ephemeral,
		});
	}

	replySuccess(
		data: string | D.EmbedData,
		options: { ephemeral: boolean } = { ephemeral: this.ephemeralReply }
	): Promise<D.InteractionResponse<D.BooleanCache<Cached>>> {
		const { config, interaction } = ResponseMethods;

		let embed;
		if (typeof data === "string") {
			embed = new TemplateEmbed(config.embeds.info).setDescription(data);
		} else {
			embed = new EmbedBuilder(data);
		}

		return interaction.reply({
			embeds: new Array(embed),
			ephemeral: options.ephemeral,
		});
	}

	static instance: ResponseMethods;
	static get(
		interaction: D.ChatInputCommandInteraction,
		config: ConfigManager
	) {
		if (!this.instance) {
			this.interaction = interaction;
			ResponseMethods.config = config;
			this.instance = new ResponseMethods();
		}

		return this.instance;
	}

	private constructor() {}
}
