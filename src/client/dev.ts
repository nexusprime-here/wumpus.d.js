import path from "path";
import { HandlersManager, IntentManager } from "../managers";
import { WumpusClient } from ".";
import EnvVarManager from "../managers/EnvVar";
import Command from "../structures/Command";
import type D from "discord.js";

export class DevelopmentClient extends WumpusClient {
	/**
	 * Guild for test slash commands /
	 * Servidor para testar comandos de barra
	 */
	public testGuild?: D.Guild;

	/**
	 * Path of the folder where it was run /
	 * Caminho da pasta onde foi executado
	 */
	public targetPath: string;

	constructor() {
		super();

		EnvVarManager.set("NODE_ENV", "development");

		this.targetPath = path.resolve(process.cwd(), this.config.targetDir);

		this.waitReady().then(() => {
			if (this.config.testGuild) {
				this.testGuild = this.guilds.cache.get(this.config.testGuild);
			}

			if (this.config.handlers.commands) {
				Command.listen(this);
			}
		});
	}

	public async run(token?: string | undefined): Promise<void> {
		await HandlersManager.watch({
			client: this,
			handlers: this.config.handlers,
			targetPath: this.targetPath,
		});

		this.options.intents = IntentManager.getIntent();

		return super.run(token);
	}
}

if (require.main === module) {
	const client = new DevelopmentClient();

	client.run();
}
