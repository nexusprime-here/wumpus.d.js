import { APIEmbedField, ColorResolvable, EmbedAuthorData, EmbedFooterData, IntentsBitField, RestOrArray } from "discord.js";
import { existsSync } from "fs";
import path from "path";
import { WumpusClient } from "../client";

export type EmbedConfig = {
    title: string,
    emoji?: `:${string}:` | `<a:${string}:${number}>` | `<:${string}:${number}>`,
    separator?: string,
    author?: EmbedAuthorData,
    color: ColorResolvable,
    fields?: RestOrArray<APIEmbedField>,
    footer?: EmbedFooterData,
    image?: string,
    thumbnail?: string
    showAuthor?: boolean,
}

export class ConfigManager {
    handlers: {
        commands: boolean,
        events: boolean
    } = {
            commands: true,
            events: true
        }
    client: WumpusClient['options'] = { intents: new IntentsBitField(['Guilds']) }

    private _targetDir: string = process.cwd();
    get targetDir() {
        return this._targetDir;
    }
    set targetDir(targetDir) {
        this._targetDir = path.join(process.cwd(), targetDir);
    }

    allowTypeScript: boolean = false;
    buildDir: string = path.join(this.targetDir, 'build');
    embeds: {
        [key in 'error' | 'warn' | 'info']: EmbedConfig
    } = {
            error: {
                emoji: ':x:',
                separator: ' | ',
                title: 'Error',
                color: 'Red'
            },
            warn: {
                emoji: ':warning:',
                separator: ' | ',
                title: 'Warn',
                color: 'Yellow'
            },
            info: {
                separator: ' | ',
                title: 'Info',
                color: 'NotQuiteBlack'
            }
        }

    constructor(selectedPath = path.join(process.cwd(), 'wumpus.config.js')) {
        if (existsSync(selectedPath)) {
            let configFile: ConfigManager = require(selectedPath);

            const configEntries = Object.entries(configFile) as [keyof ConfigManager, any][];
            for (const [configName, config] of configEntries) {
                if(typeof config === 'object') {
                    (<object>this[configName]) = {
                        ...<object>configFile[configName],
                        ...<object>this[configName]
                    }
                } else {
                    Object.assign(this[configName], config);
                }
            }
        }
    }
}

export interface WumpusConfig extends Pick<ConfigManager, keyof ConfigManager> { }