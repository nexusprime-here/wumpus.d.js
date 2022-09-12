"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
const IntentsManager_1 = require("../managers/IntentsManager");
const structures_1 = require("../structures");
class default_1 {
    async preload() {
        let { bot, rootPath } = structures_1.Handler;
        utils_1.Logger.debug('EventsHandler: On');
        const dirpath = (0, path_1.join)(rootPath, 'events');
        bot.on('eventBuild', (event) => {
            registerEvent(event);
        });
        for (let fileName of (0, fs_1.readdirSync)(dirpath)) {
            const packagedEvent = await Promise.resolve().then(() => __importStar(require((0, path_1.join)(dirpath, fileName))));
            const event = (0, utils_1.unpack)(packagedEvent);
            if (!event)
                continue;
            registerEvent(event);
        }
        function registerEvent(event) {
            IntentsManager_1.IntentsManager.pushIntentsByEvent(event.type);
            utils_1.Logger.debug(`EventsHandler: ${event.name} loaded`);
            try {
                bot.events.create(event);
                bot[event.once ? 'once' : 'on'](event.type, (...args) => event.run({ bot }, ...args));
            }
            catch (err) {
                utils_1.Logger.error('Event failed', err);
            }
        }
    }
    load() { }
}
exports.default = default_1;
