import Discord from "discord.js";
import _ from "lodash";
import { Logger } from "../utils";
import type { CamelCase } from "type-fest";

// TODO: File not loading

export class IntentManager {
	// TODO: Check if has missing important events or intents
	private static intentMap = this.createIntentMap({
		guildCreate: ["Guilds"],
		guildUpdate: ["Guilds"],
		guildDelete: ["Guilds"],
		roleCreate: ["Guilds"],
		roleUpdate: ["Guilds"],
		roleDelete: ["Guilds"],
		channelCreate: ["Guilds"],
		channelUpdate: ["Guilds"],
		channelDelete: ["Guilds"],
		threadCreate: ["Guilds"],
		threadUpdate: ["Guilds"],
		threadDelete: ["Guilds"],
		threadListSync: ["Guilds"],
		threadMemberUpdate: ["Guilds"],
		threadMembersUpdate: ["Guilds", "GuildMessages"],
		stageInstanceCreate: ["Guilds"],
		stageInstanceUpdate: ["Guilds"],
		stageInstanceDelete: ["Guilds"],
		guildBanAdd: ["GuildModeration"],
		guildBanRemove: ["GuildModeration"],
		emojiUpdate: ["GuildEmojisAndStickers"],
		stickerUpdate: ["GuildEmojisAndStickers"],
		guildIntegrationsUpdate: ["GuildIntegrations"],
		interactionCreate: ["GuildIntegrations"],
		webhookUpdate: ["GuildWebhooks"],
		inviteCreate: ["GuildInvites"],
		inviteDelete: ["GuildInvites"],
		voiceStateUpdate: ["GuildVoiceStates"],
		presenceUpdate: ["GuildPresences"],
		messageCreate: [
			"Guilds",
			"GuildMessages",
			"DirectMessages",
			"MessageContent",
		],
		messageUpdate: [
			"Guilds",
			"GuildMessages",
			"DirectMessages",
			"MessageContent",
		],
		messageDelete: ["Guilds", "GuildMessages", "DirectMessages"],
		messageDeleteBulk: ["Guilds", "GuildMessages", "DirectMessages"],
		messageReactionAdd: [
			"Guilds",
			"GuildMessageReactions",
			"DirectMessageReactions",
		],
		messageReactionRemove: [
			"Guilds",
			"GuildMessageReactions",
			"DirectMessageReactions",
		],
		messageReactionRemoveAll: [
			"Guilds",
			"GuildMessageReactions",
			"DirectMessageReactions",
		],
		messageReactionRemoveEmoji: [
			"Guilds",
			"GuildMessageReactions",
			"DirectMessageReactions",
		],
		guildMessageCreate: ["Guilds", "GuildMessages", "MessageContent"],
		guildMessageUpdate: ["Guilds", "GuildMessages", "MessageContent"],
		guildMessageDelete: ["Guilds", "GuildMessages"],
		guildMessageDeleteBulk: ["Guilds", "GuildMessages"],
		guildMessageReactionAdd: ["Guilds", "GuildMessageReactions"],
		guildMessageReactionRemove: ["Guilds", "GuildMessageReactions"],
		guildMessageReactionRemoveAll: ["Guilds", "GuildMessageReactions"],
		guildMessageReactionRemoveEmoji: ["Guilds", "GuildMessageReactions"],
		directMessageDelete: ["DirectMessages"],
		directMessageDeleteBulk: ["DirectMessages"],
		directMessageReactionAdd: ["DirectMessageReactions"],
		directMessageReactionRemove: ["DirectMessageReactions"],
		directMessageReactionRemoveAll: ["DirectMessageReactions"],
		directMessageReactionRemoveEmoji: ["DirectMessageReactions"],
		typingStart: ["Guilds", "GuildMessageTyping", "DirectMessageTyping"],
		guildTypingStart: ["Guilds", "GuildMessageTyping"],
		directTypingStart: ["DirectMessageTyping"],
		channelPinsUpdate: ["Guilds", "DirectMessages"],
		guildChannelPinsUpdate: ["Guilds"],
		directChannelPinsUpdate: ["DirectMessages"],
		guildScheduledEventCreate: ["GuildScheduledEvents"],
		guildScheduledEventUpdate: ["GuildScheduledEvents"],
		guildScheduledEventDelete: ["GuildScheduledEvents"],
		guildScheduledEventUserAdd: ["GuildScheduledEvents"],
		guildScheduledEventUserRemove: ["GuildScheduledEvents"],
		autoModerationRuleCreate: ["AutoModerationConfiguration"],
		autoModerationRuleUpdate: ["AutoModerationConfiguration"],
		autoModerationRuleDelete: ["AutoModerationConfiguration"],
		autoModerationActionExecution: ["AutoModerationExecution"],
	});

	static cache: Array<CreateIntentMapObj> = [];

	static getIntent() {
		Logger.debug(`Intents Loaded: [ ${this.cache.join(", ")} ]`);

		const mergedIntents = IntentManager.mergeIntents(
			this.intentMap,
			this.cache
		);
		const intents = new Discord.IntentsBitField(mergedIntents);

		return intents;
	}

	static createIntentMap(obj: {
		[key in CreateIntentMapObj]?: Array<Discord.GatewayIntentsString>;
	}) {
		return obj;
	}

	static mergeIntents(
		intentMap: { [key: string]: string[] },
		usedEvents: string[]
	) {
		const mergedIntents: string[] = [];

		for (const event of usedEvents) {
			if (intentMap[event]) {
				for (const intent of intentMap[event]) {
					if (!mergedIntents.includes(intent)) {
						mergedIntents.push(intent);
					}
				}
			}
		}

		return mergedIntents as Array<Discord.GatewayIntentsString>;
	}

	static addEvent(event: DiscordEvents, scope: string) {
		const translatedEvent =
			scope === "all"
				? event
				: (_.camelCase(`${scope}-${event}`) as CreateIntentMapObj);

		!this.cache.find((e) => event === e) && this.cache.push(translatedEvent);
	}
}

console.log("TESTANDOOOO");
console.log("TESTANDOOOO");
console.log("TESTANDOOOO");

type DiscordEvents = keyof Discord.ClientEvents;
export type ScopedDiscordEvents = Extract<
	DiscordEvents,
	`${"message" | "typingStart" | "channelPinsUpdate"}${string}`
>;

type CreateIntentMapObj =
	| DiscordEvents
	| CamelCase<`Guild_${ScopedDiscordEvents}` | `Direct_${ScopedDiscordEvents}`>;
