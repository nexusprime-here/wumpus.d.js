import D from "discord.js";
import path from "path";
import _ from "lodash";
import { ConfigManager, IntentManager } from "../managers";
import EnvVarManager from "../managers/EnvVar";
import { Logger } from "../utils";

export class WumpusClient<
	Ready extends boolean = boolean
> extends D.Client<Ready> {
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

	constructor() {
		let rootPath = process.cwd();
		const config = new ConfigManager();

		if (path.basename(rootPath)) {
			rootPath.substring(0, rootPath.lastIndexOf("/"));
		}
		EnvVarManager.config(rootPath);

		super(config.client);

		this.config = config;
	}

	public async run(token?: string): Promise<void> {
		if (!token) {
			token = EnvVarManager.get("TOKEN", { throwError: true });
		}

		super.login(token);
		await this.waitReady();

		Logger.ready(`Bot logged as ${this.user?.tag}`);
	}

	public waitReady(): Promise<this> {
		return new Promise((resolve) => {
			if (this.connected) return resolve(this);

			this.once("ready", () => resolve(this));
		});
	}
}

if (require.main === module) {
	const client = new WumpusClient();

	client.run();
}
