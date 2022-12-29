import EnvVar from '../structures/EnvVar';
import { ConfigManager } from "../managers";
import dotenv from 'dotenv';
import { Awaitable, Client, ClientEvents, ClientOptions } from "discord.js";
import path from 'path';
import _ from 'lodash';
import { Logger } from '../utils';

export class WumpusClient<Ready extends boolean = boolean> extends Client<Ready> {
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

    constructor(options?: ClientOptions) {
        let rootPath = process.cwd();
        const config = new ConfigManager();
        
        const clientOptions = options ?? config.client;

        if (path.basename(rootPath)) {
            rootPath.substring(0, rootPath.lastIndexOf("/"));
        }
        dotenv.config({ path: path.join(rootPath, '.env') });

        super(clientOptions);
        
        this.config = config;
    }

    public async run(token?: string): Promise<void> {
        if(!token) {
            token = EnvVar.get('TOKEN', { throwError: true });
        }

        super.login(token);
        await this.waitReady();

        Logger.ready(`Bot logged as ${this.user?.tag}`);
    }
    
    public waitReady(): Promise<this> {
        return new Promise(resolve => {
            if (this.connected) return resolve(this);

            this.once('ready', () => resolve(this));
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

    client.run();
}