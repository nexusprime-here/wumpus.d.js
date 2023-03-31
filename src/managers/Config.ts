import type D from "discord.js";
import { existsSync } from "fs";
import path from "path";

export type EmbedConfig = {
	title: string;
	emoji?: `:${string}:` | `<a:${string}:${number}>` | `<:${string}:${number}>`;
	separator?: string;
	author?: D.EmbedAuthorData;
	color: D.ColorResolvable;
	fields?: D.RestOrArray<D.APIEmbedField>;
	footer?: D.EmbedFooterData;
	image?: string;
	thumbnail?: string;
	showAuthor?: boolean;
};

export class ConfigManager {
	handlers: {
		commands: boolean;
		events: boolean;
	} = {
		commands: true,
		events: true,
	};
	client: D.ClientOptions = { intents: [] };

	private _targetDir: string = process.cwd();
	get targetDir() {
		return this._targetDir;
	}
	set targetDir(targetDir) {
		this._targetDir = path.join(process.cwd(), targetDir);
	}

	allowTypeScript: boolean = false;
	buildDir: string = path.join(this.targetDir, "build");
	embeds: {
		[key in "error" | "warn" | "info"]: EmbedConfig;
	} = {
		error: {
			emoji: ":x:",
			separator: " | ",
			title: "Error",
			color: "Red",
		},
		warn: {
			emoji: ":warning:",
			separator: " | ",
			title: "Warn",
			color: "Yellow",
		},
		info: {
			separator: " | ",
			title: "Info",
			color: "NotQuiteBlack",
		},
	};

	testGuild?: string;

	constructor(selectedPath = path.join(process.cwd(), "wumpus.config.js")) {
		if (!existsSync(selectedPath)) return;

		let configFile: ConfigManager = require(selectedPath);

		const keysOfConfigFile = Object.keys(configFile) as Array<
			keyof ConfigManager
		>;

		// Overwrite props of config
		keysOfConfigFile.forEach((key) => {
			if (this.hasOwnProperty(key)) {
				let prop = this?.[key];

				if (typeof prop === "object") {
					Object.assign(prop, configFile[key]);
				} else {
					(prop as unknown) = configFile[key];
				}
			}
		});
	}
}

export interface WumpusConfig
	extends Pick<ConfigManager, keyof ConfigManager> {}
