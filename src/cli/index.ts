#!/usr/bin/env node

import chalk from "chalk";
import { Logger } from "../utils";

const args = process.argv.slice(2);

switch(args[0]) {
    case 'dev':
    case 'start':
    case 'tools': 
        require(`./${args[0]}`)
        break;

    case undefined:
        const packageJson = require('../../package.json');

        console.log(`${packageJson.name}@${packageJson.version}`);

        Object.entries({
            'start': 'run bot',
            'dev': 'run bot on devmode',
            'tools': 'some subcommands for bot'
        }).forEach(([k, v]) => console.log(`   ${chalk.blue(k)}: ${v}`));

        break;
    
    default:
        Logger.error(`Command ${args[0]} not found`);
}