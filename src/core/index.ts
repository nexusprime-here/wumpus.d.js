import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join as joinPath } from 'path';

const ROOT_PATH = process.cwd();
dotenv.config({ path: joinPath(ROOT_PATH, '.env') });

import * as handlers from './handlers';
import { Logger, envVar } from './utils';
import { IntentsManager } from './managers/IntentsManager';
import { Handler, Bot } from './structures';

export const bot = new Bot({ intents: [] });

const TOKEN = envVar('TOKEN', true);

Handler.set({ bot, rootPath: ROOT_PATH });

(async function() {
    let handlersCache: any[] = [];

    for (let handlerName of <(keyof typeof handlers)[]>Object.keys(handlers)) {
        let dirExist = existsSync(joinPath(ROOT_PATH, handlerName));
        if(!dirExist) continue;
    
        let handler = new handlers[handlerName];
        await handler.preload();

        handlersCache.push(handler);
    }
    
    bot.once('ready', () => {
        handlersCache.forEach(h => h.load());

        Logger.ready(`Bot logged as ${bot.user?.tag}\n`);
    });
    
    bot.options.intents = IntentsManager.intents;

    bot.login(TOKEN);
})();