"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentsManager = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../../utils");
const data_json_1 = __importDefault(require("./data.json"));
class IntentsManager {
    static pushIntentsByEvent(selectedEvent) {
        for (const [intent, events] of Object.entries(data_json_1.default)) {
            if (events.includes(selectedEvent)) {
                utils_1.Logger.debug('Intent loaded: ' + intent);
                if (this.usedIntents.find(i => i === intent)) {
                    continue;
                }
                else {
                    this.usedIntents.push(intent);
                    this.intents += discord_js_1.IntentsBitField.resolve(intent);
                }
            }
            else {
                continue;
            }
        }
    }
}
exports.IntentsManager = IntentsManager;
IntentsManager.intents = 1;
IntentsManager.usedIntents = [];
