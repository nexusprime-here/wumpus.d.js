import chalk from "chalk";
import { stdout } from "process";

export class Logger {
	static warn(message: string) {
		let log = chalk.black.bgYellow(`[WARN ${getTime()}]`);
		log += chalk.yellow(" >> ");
		log += message;

		stdout.write(log + "\n");

		return true;
	}
	static error(message: string | undefined, stack?: string) {
		let log = chalk.black.bgRed(`[ERROR ${getTime()}]`);
		log += chalk.red(" >> ");
		log += message ? message : "Error message not specified";

		if (stack) log += `\n${stack}\n\n`;

		stdout.write(log + "\n");
	}
	static info(message: string, config: { time: boolean } = { time: true }) {
		let log = chalk.black.bgBlue(`[INFO${config.time ? ` ${getTime()}` : ""}]`);
		log += chalk.blue(" >> ");
		log += message;

		stdout.write(log + "\n");

		return true;
	}
	static ready(message: string) {
		let log = chalk.black.bgGreen(`[READY]`);
		log += chalk.green(" >> ");
		log += message;

		stdout.write(log + "\n");

		return true;
	}
	static debug(message: string) {
		let log = chalk.black.bgYellow(`[DEBUG ${getTime()}]`);
		log += chalk.yellow(" >> ");
		log += message;

		stdout.write(log + "\n");

		return true;
	}

	private constructor() {}
}

export default Logger;

/* Function */
function getTime() {
	const date = new Date();

	function transformTwoDigitsLen(digits: number) {
		return ("0" + digits).slice(-2);
	}

	const hours = transformTwoDigitsLen(date.getHours());
	const minutes = transformTwoDigitsLen(date.getMinutes());
	const seconds = transformTwoDigitsLen(date.getSeconds());

	return `${hours}:${minutes}:${seconds}`;
}
