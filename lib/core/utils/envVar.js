"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVar = void 0;
const Logger_1 = __importDefault(require("./Logger"));
function envVar(VarName, finishProcess = false) {
    let envVar = process.env[VarName];
    if (!envVar) {
        if (finishProcess) {
            Logger_1.default.error(`Missing ${envVar} var in .env`);
            process.exit();
        }
        else
            Logger_1.default.warn(`${envVar} var not specified in .env`);
    }
    return envVar;
}
exports.envVar = envVar;
