import chalk from "chalk";
import { ChildProcess, spawn } from "child_process";
import path from "path";
import readline from "readline";
import { Logger } from "../utils";
import { ConfigManager } from "../managers";

const config = new ConfigManager(process.cwd());

// Configuring input
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

// Clears the console and displays usage tips
function logTips() {
	console.clear();
	console.log(`${chalk.blue(">>")} You are running on dev mode`);

	const tips = {
		R: "Reload",
		"Ctrl+C": "Stop process",
	};

	Object.entries(tips).forEach(([key, value]) => {
		console.log(`   ${key}: ${chalk.blue(value)}`);
	});

	console.log("");
}
logTips();

// Starts the client process
let clientProcess = startClientProcess();

// Defines the behavior when keys are pressed
process.stdin.on("keypress", async (ch, key) => {
	readline.clearLine(process.stdout, 0);
	readline.cursorTo(process.stdout, 0);

	if (key.ctrl && key.name === "c") {
		await stopClientProcess(clientProcess);
		process.exit(0);
	} else if (key.name === "r") {
		process.stdout.write(`${chalk.blue(">>")} Restarting...`);

		await stopClientProcess(clientProcess);
		clientProcess = startClientProcess();

		logTips();
	}
});

function startClientProcess(): ChildProcess {
	const clientProcess = spawn(
		config.allowTypeScript ? "ts-node" : "node",
		[path.join(__dirname, "../client/dev")],
		{
			stdio: "inherit",
		}
	);

	clientProcess.stderr?.on("data", (data) => {
		Logger.error(undefined, data);
	});

	[clientProcess.stdout, clientProcess.stdin].forEach((stream) => {
		stream?.on("data", (data) => {
			process.stdout.write(data);
		});
	});

	clientProcess.on("exit", () => {
		process.stdout.write(`\n${chalk.yellow("!")} Exited`);
	});

	return clientProcess;
}

async function stopClientProcess(clientProcess: ChildProcess): Promise<void> {
	return new Promise<void>((resolve) => {
		clientProcess.on("exit", () => {
			resolve();
		});
		clientProcess.kill();
	});
}
