"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CollectionManager_1 = require("../managers/CollectionManager");
const IntentsManager_1 = require("../managers/IntentsManager");
const utils_1 = require("../utils");
const TEST_GUILD = (0, utils_1.envVar)('TEST_GUILD');
class Bot extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new CollectionManager_1.CollectionManager();
        this.events = new CollectionManager_1.CollectionManager();
    }
    async login(token) {
        const promise = await super.login(token);
        if (TEST_GUILD)
            this.testGuild = this.guilds.cache.get(TEST_GUILD);
        return promise;
    }
    on(event, listener) {
        let bot = super.on(event, listener);
        IntentsManager_1.IntentsManager.pushIntentsByEvent(event);
        return bot;
    }
    once(event, listener) {
        let bot = super.on(event, listener);
        IntentsManager_1.IntentsManager.pushIntentsByEvent(event);
        return bot;
    }
}
exports.default = Bot;
