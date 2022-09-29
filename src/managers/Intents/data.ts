import { Intent } from ".";

export const MessageContent = new Intent({
    name: 'MessageContent',
    events: [
        "messageCreate",
        "messageUpdate",
        "messageDelete",
        "messageDeleteBulk"
    ]
})

export const Guilds = new Intent({
    name: 'Guilds',
    events: [
        "guildCreate",
        "guildUpdate",
        "guildDelete",
        "roleCreate",
        "roleUpdate",
        "roleDelete",
        "channelCreate",
        "channelUpdate",
        "channelDelete",
        "channelPinsUpdate",
        "threadCreate",
        "threadUpdate",
        "threadDelete",
        "threadListSync",
        "threadMemberUpdate",
        "threadMembersUpdate",
        "stageInstanceCreate",
        "stageInstanceUpdate",
        "stageInstanceDelete"
    ]
});

export const GuildMembers = new Intent({
    name: 'GuildMembers',
    events: [
        "guildMemberAdd",
        "guildMemberUpdate",
        "guildMemberRemove",
        "threadMembersUpdate"
    ],
    require: [Guilds]
});

export const GuildWebhooks = new Intent({
    name: 'GuildWebhooks',
    events: [
        "webhookUpdate"
    ],
    require: [Guilds]
});

export const GuildIntegrations = new Intent({
    name: 'GuildIntegrations',
    events: [
        "guildIntegrationsUpdate",
        "integrationCreate",
        "integrationUpdate",
        "integrationDelete"
    ],
    require: [Guilds]
});

export const GuildEmojisAndStickers = new Intent({
    name: 'GuildEmojisAndStickers',
    events: [
        "guildEmojisUpdate",
        "guildStickersUpdate"
    ],
    require: [Guilds]
});

export const GuildBans = new Intent({
    name: 'GuildBans',
    events: [
        "guildBanAdd",
        "guildBanRemove"
    ],
    require: [Guilds]
});

export const GuildInvites = new Intent({
    name: 'GuildInvites',
    events: [
        "inviteCreate",
        "inviteDelete"
    ],
    require: [Guilds]
});

export const GuildVoiceStates = new Intent({
    name: 'GuildVoiceStates',
    events: [
        "voiceStateUpdate"
    ],
    require: [Guilds]
});

export const GuildPresences = new Intent({
    name: 'GuildPresences',
    events: [
        "presenceUpdate"
    ],
    require: [Guilds]
});

export const GuildMessages = new Intent({
    name: 'GuildMessages',
    events: [
        "messageCreate",
        "messageUpdate",
        "messageDelete",
        "messageDeleteBulk"
    ],
    require: [Guilds, MessageContent]
});

export const GuildMessageReactions = new Intent({
    name: 'GuildMessageReactions',
    events: [
        "messageReactionAdd",
        "messageReactionRemove",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji"
    ],
    require: [Guilds]
});

export const GuildMessageTyping = new Intent({
    name: 'GuildMessageTyping',
    events: [
        "typingStart"
    ],
    require: [Guilds]
});

export const GuildScheduledEvents = new Intent({
    name: 'GuildScheduledEvents',
    events: [
        "guildScheduledEventCreate",
        "guildScheduledEventUpdate",
        "guildScheduledEventDelete",
        "guildScheduledEventUserAdd",
        "guildScheduledEventUserRemove"
    ],
    require: [Guilds]
});

export const DirectMessages = new Intent({
    name: 'DirectMessages',
    events: [
        "messageCreate",
        "messageUpdate",
        "messageDelete",
        "channelPinsUpdate"
    ],
    require: [MessageContent]
});

export const DirectMessageReactions = new Intent({
    name: 'DirectMessageReactions',
    events: [
        "messageReactionAdd",
        "messageReactionRemove",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji"
    ],
    require: [DirectMessages]
});

export const DirectMessageTyping = new Intent({
    name: 'DirectMessageTyping',
    events: [
        "typingStart"
    ],
    require: [DirectMessages]
});

export const AutoModerationConfiguration = new Intent({
    name: 'AutoModerationConfiguration',
    events: [
        "autoModerationRuleCreate",
        "autoModerationRuleUpdate",
        "autoModerationRuleDelete"
    ]
});

export const AutoModerationExecution = new Intent({
    name: 'AutoModerationExecution',
    events: [
        "autoModerationActionExecution"
    ]
});