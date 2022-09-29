import dotenv from 'dotenv';
import { Awaitable, Client, ClientEvents, ClientOptions, Guild } from "discord.js";
import { CacheManager, ConfigManager, IntentsManager, HandlerManager } from "../managers";
import { EnvVar } from "../utils";
import path from 'path';

const ROOT_PATH = process.cwd();

dotenv.config({ path: path.join(ROOT_PATH, '.env') });

const TEST_GUILD = EnvVar('TEST_GUILD');

export class WumpusClient<Ready extends boolean = boolean> extends Client<Ready> {
    /**
     * Path of the folder where it was run /
     * Caminho da pasta onde foi executado
     */
    public rootPath = ROOT_PATH;

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
    public config = new ConfigManager(this.rootPath, 'wumpus.config.json');

    /**
     * Active or disable commands and events /
     * Ativa ou desativa comandos e eventos
     */
    public cache = new CacheManager(this.rootPath);

    /**
     * Folders that will have the exported files /
     * Pastas que terão os arquivos exportados
     */
    public handlers: HandlerManager;

    constructor(options: ClientOptions = { intents: [] }) {
        super(options);

        new IntentsManager(this);
        this.handlers = new HandlerManager({
            client: this,
            path: this.rootPath,
            config: this.config.handlers
        });
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

        IntentsManager.pushByEvent(<string>event);

        return bot;
    }
    
    public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
    public once<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, listener: (...args: any[]) => Awaitable<void>): this;
    public once(event: unknown, listener: unknown): this {
        let bot = super.on(<string>event, <any>listener);
    
        IntentsManager.pushByEvent(<string>event);
    
        return bot;
    }
}