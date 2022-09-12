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
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const structures_1 = require("../structures");
const utils_1 = require("../utils");
class default_1 {
    async preload() {
        let { bot, rootPath } = structures_1.Handler;
        utils_1.Logger.debug('CommandsHandler: On');
        const dirpath = (0, path_1.join)(rootPath, 'commands');
        bot.on('commandBuild', (command) => {
            utils_1.Logger.debug(`CommandsHandler: ${command.name} loaded`);
            bot.commands.create(command);
        });
        for (let fileName of (0, fs_1.readdirSync)(dirpath)) {
            const packagedCommand = await Promise.resolve().then(() => __importStar(require((0, path_1.join)(dirpath, fileName))));
            const command = (0, utils_1.unpack)(packagedCommand);
            if (!command)
                continue;
            utils_1.Logger.debug(`CommandsHandler: ${command.name} loaded`);
            bot.commands.create(command);
        }
        bot.on('interactionCreate', async (interaction) => {
            if (interaction.type !== discord_js_1.InteractionType.ApplicationCommand)
                return;
            const command = bot.commands.cache.get(interaction.commandName);
            try {
                await command.run({ interaction, bot });
            }
            catch (err) {
                utils_1.Logger.error('Command failed', err);
            }
        });
    }
    async load(global = false) {
        let { bot } = structures_1.Handler;
        for (let command of bot.commands.cache.values()) {
            if (command.test)
                await bot.testGuild?.commands.create({
                    name: command.name,
                    description: command.description,
                    options: command.options,
                });
            else {
                if (!global)
                    return;
                await bot.application?.commands.create({
                    name: command.name,
                    description: command.description,
                    options: command.options,
                });
            }
        }
    }
}
exports.default = default_1;
