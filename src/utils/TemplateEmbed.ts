import Discord from 'discord.js';
import { EmbedConfig } from "../managers";

export class TemplateEmbed extends Discord.EmbedBuilder {
    constructor(public defaultEmbed: EmbedConfig) {
        const { emoji, separator, title } = defaultEmbed;

        super();

        if (emoji) {
            if (separator) {
                this.setTitle(emoji + separator + title);
            } else {
                this.setTitle(emoji + ' ' + title);
            }
        } else {
            this.setTitle(title);
        }
        this.setColor(defaultEmbed.color);
        this.setFooter(defaultEmbed?.footer ?? null);
        this.setFields(...defaultEmbed.fields)
        this.setImage(defaultEmbed?.image ?? null);
        this.setThumbnail(defaultEmbed?.thumbnail ?? null);
    }
}