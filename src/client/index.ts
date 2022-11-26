import EnvVar from '../structures/EnvVar';
import Command from '../structures/Command';
import { ConfigManager, HandlersManager } from "../managers";
import { Logger } from '../utils'
import dotenv from 'dotenv';
import { Awaitable, Client, ClientEvents, ClientOptions, Guild } from "discord.js";
import path from 'path';
import _ from 'lodash';
import developerMode from './dev';

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

    constructor(options: ClientOptions = { intents: [] }) {
        const config = new ConfigManager(ROOT_PATH, 'wumpus.config.json');
        options.intents = config.intents;

        super(options);

        this.config = config;
        this.targetPath = path.resolve(ROOT_PATH, this.config.targetDir);

        HandlersManager.start({
            client: this,
            handlers: this.config.handlers,
            targetPath: this.targetPath
        });

        this.waitReady().then(() => {
            if(TEST_GUILD) {
                this.testGuild = this.guilds.cache.get(TEST_GUILD);
            }
            
            Command.listen(this);

            Logger.ready(`Bot logged as ${this.user?.tag}`);
        });
    }

    public async login(): Promise<string> {
        const TOKEN = EnvVar.get('TOKEN', { throwError: true });

        return super.login(TOKEN);
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

if(require.main === module) {
    const client = new WumpusClient();

    if (process.argv.includes('dev')) {
        process.env.NODE_ENV = "development";

        developerMode(client);
    } else {
        process.env.NODE_ENV = "production";
    }

    client.login();
}