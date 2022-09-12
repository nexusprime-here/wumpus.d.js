"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static warn(message) {
        console.log(chalk_1.default.black.bgYellow(`[WARN ${getTime()}]`) + chalk_1.default.yellow(' >>'), message);
        return true;
    }
    static error(message, error) {
        console.log(chalk_1.default.black.bgRed(`[ERROR ${getTime()}]`) + chalk_1.default.red(' >>'), message);
        if (error)
            console.log(error);
        return true;
    }
    static info(message) {
        console.log(chalk_1.default.black.bgBlue(`[INFO ${getTime()}]`) + chalk_1.default.blue(' >>'), message);
        return true;
    }
    static ready(message) {
        console.log(chalk_1.default.black.bgGreen(`[READY]`) + chalk_1.default.green(' >>'), message);
        return true;
    }
    static debug(message) {
        const debug = process.argv.includes('--debug');
        if (!debug)
            return;
        console.log(chalk_1.default.black.bgYellow(`[DEBUG ${getTime()}]`) + chalk_1.default.yellow(' >>'), message);
        return true;
    }
    constructor() { }
}
exports.Logger = Logger;
exports.default = Logger;
/* Function */
function getTime() {
    const date = new Date();
    function transformTwoDigitsLen(digits) {
        return ('0' + digits).slice(-2);
    }
    const hours = transformTwoDigitsLen(date.getHours());
    const minutes = transformTwoDigitsLen(date.getMinutes());
    const seconds = transformTwoDigitsLen(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}
