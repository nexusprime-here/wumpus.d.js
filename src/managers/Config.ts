import { existsSync } from "fs";
import path from "path";
import { WumpusClient } from "../client";

export class ConfigManager {
    handlers: {
        commands: boolean,
        events: boolean
    } = {
        commands: true,
        events: true
    }
    intents: WumpusClient['options']['intents'] = [];
    targetDir: string = './';

    constructor(...paths: string[]) {
        const selectedPath = path.join(...paths);

        if(existsSync(selectedPath)) {
            let configFile: ConfigManager = require(path.join(...paths));
            
            Object.assign(this, configFile);
        }
    }
}