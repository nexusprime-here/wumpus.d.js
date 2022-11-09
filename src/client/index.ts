import dotenv from 'dotenv';
import { Awaitable, Client, ClientEvents, ClientOptions, Guild } from "discord.js";
import { CacheManager, ConfigManager } from "../managers";
import path from 'path';
import _ from 'lodash';
import { existsSync, readdirSync } from 'fs';
import { EnvVar } from '../structures';

const ROOT_PATH = process.cwd();

dotenv.config({ path: path.join(ROOT_PATH, '.env') });

const TEST_GUILD = EnvVar.get('TEST_GUILD');

export class WumpusClient<Ready extends boolean = boolean> extends Client<Ready> {
    /**
     * Guild for test slash commands /
     * Servidor para testar comandos de barra
     */
    public testGuild?: Guild;
    
    /**
     * If client is connected /
     * Se o cliente está conectado
     */
    public connected: boolean = false;
    
    /**
     * Config of Framework /
     * Configuração do Framework
     */
    public config: ConfigManager;

    /**
     * Path of the folder where it was run /
     * Caminho da pasta onde foi executado
     */
    public targetPath: string;
    
    /**
     * Active or disable commands and events /
     * Ativa ou desativa comandos e eventos
     */
    public cache = new CacheManager(ROOT_PATH);

    constructor(options: ClientOptions = { intents: [] }) {
        const config = new ConfigManager(ROOT_PATH, 'wumpus.config.json');

        options.intents = config.intents;

        super(options);

        this.config = config;
        this.targetPath = path.resolve(ROOT_PATH, this.config.targetDir);

        for(const [ handlerName, on ] of Object.entries(config.handlers)) {
            if(!on) continue;

            const handlerPath = path.join(this.targetPath, handlerName);
            if(!existsSync(handlerPath)) continue;

            for(const fileName of readdirSync(handlerName)) {
                require(path.join(handlerPath, fileName));
            }
        }

        const loadFile = require(path.join(this.targetPath, 'load'));
        if(typeof loadFile === 'function') {
            loadFile(this);
        }
    }

    public async login(token?: string | undefined): Promise<string> {
        const promise = await super.login(token);

        if(TEST_GUILD) this.testGuild = this.guilds.cache.get(TEST_GUILD);

        return promise;
    }
    
    public waitReady(): Promise<this> {
        return new Promise(resolve => {
            if (this.connected) return resolve(this);

            this.once('ready', () => {
                return resolve(this);
            });
        });
    }

    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
    public on<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, listener: (...args: any[]) => Awaitable<void>): this;
    public on(event: unknown, listener: unknown): this {
        let bot = super.on(<string>event, <any>listener);

        return bot;
    }
    
    public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
    public once<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, listener: (...args: any[]) => Awaitable<void>): this;
    public once(event: unknown, listener: unknown): this {
        let bot = super.on(<string>event, <any>listener);
    
        return bot;
    }
}