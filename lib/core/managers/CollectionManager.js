"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionManager = void 0;
const discord_js_1 = require("discord.js");
class CollectionManager {
    constructor() {
        this.cache = new discord_js_1.Collection();
    }
    create(command) {
        this.cache.set(command.name, command);
    }
}
exports.CollectionManager = CollectionManager;
