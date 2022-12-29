import chalk from "chalk";
import { stdout } from "process";

export class Logger {
    private static _cached_time?: string = undefined;
    static set time(time: string) {
        this._cached_time = time
    }
    static get time() {
        if(!this._cached_time) {
            return getTime();
        } else {
            const time = this._cached_time

            this._cached_time = undefined;

            return time;
        }
    }
    
    static warn(message: string) {
        let log = chalk.black.bgYellow(`[WARN ${this.time}]`);
        log += chalk.yellow(' >> ');
        log += message;

        stdout.write(log + '\n');

        return true;
    }
    static error(message: string | undefined, stack?: string) {
        let log = chalk.black.bgRed(`[ERROR ${this.time}]`);
        log += chalk.red(' >> ');
        log += message ? message : 'Error message not specified';

        if(stack) log += `\n${stack}\n\n`;

        stdout.write(log);
    }
    static info(message: string, config: { time: boolean } = { time: true }) {
        let log = chalk.black.bgBlue(
            `[INFO${config.time ? ` ${this.time}` : ''}]`
        );
        log += chalk.blue(' >> ');
        log += message;
        
        stdout.write(log + '\n');

        return true;
    }
    static ready(message: string) {
        let log = chalk.black.bgGreen(`[READY]`);
        log += chalk.green(' >> ');
        log += message;

        stdout.write(log + '\n');

        return true;
    }
    static debug(message: string) {
        const isDebug = process.env.NODE_ENV === 'development';
        if(!isDebug) return;
        
        let log = chalk.black.bgYellow(`[DEBUG ${this.time}]`);
        log += chalk.yellow(' >> ');
        log += message;

        stdout.write(log + '\n');

        return true;
    }

    static from(log: string) {
        let isStyledLog = /\[[A-Z]{4,}( [0-9]{2}:[0-9]{2}:[0-9]{2})?\] >>/g.test(log);
        
        if(isStyledLog) {
            let [logName, message] = log.split(' >> ');
            logName = logName.replace('[', '')
            logName = logName.replace(']', '')
            logName = logName.split(' ')[0];
            logName = logName.toLowerCase();
        
            this.time = getTime();

            if(logName in this) {
                this[<'warn' | 'error' | 'info' | 'debug'>logName](message)
            }
        } else {
            this.info(log);
        }
    }

    private constructor() {}
}

export default Logger;


/* Function */
function getTime() {
    const date = new Date();

    function transformTwoDigitsLen(digits: number) {
        return ('0' + digits).slice(-2);
    }
    
    const hours = transformTwoDigitsLen(date.getHours());
    const minutes = transformTwoDigitsLen(date.getMinutes());
    const seconds = transformTwoDigitsLen(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
}