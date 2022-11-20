import { Logger } from "../utils";

const args = process.argv.slice(2);

switch(args[0]) {
    case 'dev':
    case 'start': 
        require(`./${args[0]}`)
        break;
    
    default:
        Logger.error(`Command ${args[0]} not found`);
}