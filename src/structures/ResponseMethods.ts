import Discord from 'discord.js';
import { TemplateEmbed } from '../utils';
import { ConfigManager } from '../managers';

export default class ResponseMethods<Cached extends Discord.CacheType = Discord.CacheType> {
    private static interaction: Discord.ChatInputCommandInteraction;
    private static config: ConfigManager;

    replyError(
        data: string | Discord.EmbedData,
        options: { ephemeral: boolean } = { ephemeral: false }
    ): Promise<Discord.InteractionResponse<Discord.BooleanCache<Cached>>> {
        const { config, interaction } = ResponseMethods;

        let embed;
        if (typeof data === 'string') {
            embed = new TemplateEmbed(config.embeds.error)
                .setDescription(data);
        } else {
            embed = new Discord.EmbedBuilder(data);
        }

        return interaction.reply({
            embeds: new Array(embed),
            ephemeral: options.ephemeral
        });
    }

    replyWarn(
        data: string | Discord.EmbedData,
        options: { ephemeral: boolean } = { ephemeral: false }
    ): Promise<Discord.InteractionResponse<Discord.BooleanCache<Cached>>> {
        const { config, interaction } = ResponseMethods;

        let embed;
        if (typeof data === 'string') {
            embed = new TemplateEmbed(config.embeds.warn)
                .setDescription(data);
        } else {
            embed = new Discord.EmbedBuilder(data);
        }

        return interaction.reply({
            embeds: new Array(embed),
            ephemeral: options.ephemeral
        });
    }

    replyInfo(
        data: string | Discord.EmbedData,
        options: { ephemeral: boolean } = { ephemeral: false }
    ): Promise<Discord.InteractionResponse<Discord.BooleanCache<Cached>>> {
        const { config, interaction } = ResponseMethods;

        let embed;
        if (typeof data === 'string') {
            embed = new TemplateEmbed(config.embeds.info)
                .setDescription(data);
        } else {
            embed = new Discord.EmbedBuilder(data);
        }

        return interaction.reply({
            embeds: new Array(embed),
            ephemeral: options.ephemeral
        });
    }

    static instance: ResponseMethods;
    static get(interaction: Discord.ChatInputCommandInteraction, config: ConfigManager) {
        if (!this.instance) {
            this.interaction = interaction;
            ResponseMethods.config = config;
            this.instance = new ResponseMethods();
        }

        return this.instance;
    }

    private constructor() { }
}