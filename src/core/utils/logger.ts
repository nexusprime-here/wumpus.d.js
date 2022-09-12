import chalk from "chalk";

export class Logger {
    static warn(message: string) {
        console.log(chalk.black.bgYellow(`[WARN ${getTime()}]`) + chalk.yellow(' >>'), message);

        return true;
    }
    static error(message: string, error?: Error) {
        console.log(chalk.black.bgRed(`[ERROR ${getTime()}]`) + chalk.red(' >>'), message);
        if(error) console.log(error);

        return true;
    }
    static info(message: string) {
        console.log(chalk.black.bgBlue(`[INFO ${getTime()}]`) + chalk.blue(' >>'), message);

        return true;
    }
    static ready(message: string) {
        console.log(chalk.black.bgGreen(`[READY]`) + chalk.green(' >>'), message);

        return true;
    }
    static debug(message: string) {
        const debug = process.argv.includes('--debug');
        
        if(!debug) return;
        
        console.log(chalk.black.bgYellow(`[DEBUG ${getTime()}]`) + chalk.yellow(' >>'), message);
        
        return true;
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