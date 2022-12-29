import path from "path";
import { HandlersManager } from "../managers";
import { WumpusClient } from ".";
import EnvVar from "../structures/EnvVar";
import Command from '../structures/Command';
import type { Guild } from "discord.js";

export class DevelopmentClient extends WumpusClient {
    /**
     * Guild for test slash commands /
     * Servidor para testar comandos de barra
     */
    public testGuild?: Guild;
    
    /**
     * Path of the folder where it was run /
     * Caminho da pasta onde foi executado
     */
    public targetPath: string;

    constructor() {
        super();

        EnvVar.set('NODE_ENV', 'development');

        this.targetPath = path.resolve(process.cwd(), this.config.targetDir);

        HandlersManager.watch({
            client: this,
            handlers: this.config.handlers,
            targetPath: this.targetPath
        });

        this.waitReady().then(() => {
            const testGuild = EnvVar.get('TEST_GUILD');
            
            if (testGuild) {
                this.testGuild = this.guilds.cache.get(testGuild);
            }

            if (this.config.handlers.commands) {
                Command.listen(this);
            }
        });
    }
}

if (require.main === module) {
    const client = new DevelopmentClient();

    client.run();
}