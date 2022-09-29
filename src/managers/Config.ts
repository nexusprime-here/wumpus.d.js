import { existsSync } from "fs";
import path from "path";

export class ConfigManager {
    handlers: {
        commands: boolean,
        events: boolean,
        // components: boolean
    } = {
        commands: true,
        events: true
    }
    typescript: boolean = false;

    constructor(...paths: string[]) {
        const selectedPath = path.join(...paths);

        if(existsSync(selectedPath)) {
            let configFile: ConfigManager = require(path.join(...paths));
            
            Object.assign(this, configFile);
        }
    }
}