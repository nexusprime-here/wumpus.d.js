import { watch } from 'chokidar';
import path from "path";
import { HandlersManager } from "../managers";
import type { WumpusClient } from ".";
import { Logger } from '../utils';

export default function developerMode(client: WumpusClient) {
    const commandDirPath = path.join(client.targetPath, 'commands');
    
    const watcher = watch(commandDirPath, { 
        interval: 3000, 
        ignoreInitial: true 
    });

    watcher.on('all', async (event, f) => {
        if(event === 'change') {
            Logger.warn(`Reloading some commands...`);

            delete require.cache[require.resolve(f)];
            await HandlersManager.loadCommandFile(f);
        } else if(['add', 'addDir'].includes(event)) {
            Logger.warn('Loading new commands...');
            
            await HandlersManager.loadCommandFile(f);
        }
    });
}