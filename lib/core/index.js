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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = require("path");
const ROOT_PATH = process.cwd();
dotenv_1.default.config({ path: (0, path_1.join)(ROOT_PATH, '.env') });
const handlers = __importStar(require("./handlers"));
const utils_1 = require("./utils");
const IntentsManager_1 = require("./managers/IntentsManager");
const structures_1 = require("./structures");
exports.bot = new structures_1.Bot({ intents: [] });
const TOKEN = (0, utils_1.envVar)('TOKEN', true);
structures_1.Handler.set({ bot: exports.bot, rootPath: ROOT_PATH });
(async function () {
    let handlersCache = [];
    for (let handlerName of Object.keys(handlers)) {
        let dirExist = (0, fs_1.existsSync)((0, path_1.join)(ROOT_PATH, handlerName));
        if (!dirExist)
            continue;
        let handler = new handlers[handlerName];
        await handler.preload();
        handlersCache.push(handler);
    }
    exports.bot.once('ready', () => {
        handlersCache.forEach(h => h.load());
        utils_1.Logger.ready(`Bot logged as ${exports.bot.user?.tag}\n`);
    });
    exports.bot.options.intents = IntentsManager_1.IntentsManager.intents;
    exports.bot.login(TOKEN);
})();
