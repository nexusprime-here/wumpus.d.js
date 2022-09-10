#! /usr/bin/env node

const ROOT_PATH = process.cwd();

import dotenv from 'dotenv';
import { join as joinPath } from 'path';
dotenv.config({ path: joinPath(ROOT_PATH, '.env') });

import { existsSync } from 'fs';
import * as handlers from './handlers';
import { logger } from './utils';
import Bot from './structures/Bot';
import { IntentsManager } from './managers/IntentsManager';

const TOKEN = function() {
    const TOKEN = process.env.TOKEN;

    if(!TOKEN) {
        logger.error('Missing TOKEN var in .env');
        process.exit();
    }

    return TOKEN;
}();

export const bot = new Bot({ intents: [] });

bot.once('ready', () => {
    logger.info(`Bot logged as ${bot.user ? bot.user.tag : 'Anonymous#0000'}`);
});

(async function() {
    type HandlersKeys = (keyof typeof handlers)[];
    for (let handlerName of <HandlersKeys>Object.keys(handlers)) {
        let dirExist = existsSync(joinPath(ROOT_PATH, handlerName));
        if(!dirExist) continue;
    
        await handlers[handlerName].run(bot, ROOT_PATH);
    }

    bot.options.intents = IntentsManager.intents;

    bot.login(TOKEN);
})();