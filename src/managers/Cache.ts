import { existsSync, mkdirSync } from "fs";
import Keyv from "keyv";
import KeyvFile from "keyv-file";
import path from "path";

export class CacheManager {
    static has: boolean = false;
    static rootPath: string;
    
    private Table = class extends Keyv {
        constructor(tableName: string) {
            super();

            CacheManager.has = true;

            let cachePath = path.join(CacheManager.rootPath, 'cache');
            if(!existsSync(cachePath)) mkdirSync(cachePath);

            const targetDirPath = cachePath;

            this.opts.store = new KeyvFile({
                filename: path.join(targetDirPath, `${tableName}.settings.json`)
            });
        }
    }
    
    private _commands: any;
    public get commands() {
        if(!this._commands) {
            this._commands = new this.Table('commands');
        }

        return this._commands;
    };

    private _events: any;
    public get events() {
        if(!this._events) {
            this._events = new this.Table('events');
        }

        return this._events;
    };
    
    constructor(rootPath: string) {
        CacheManager.rootPath = rootPath;
    }
}