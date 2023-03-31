#!/usr/bin/env node

import { Logger } from "../utils";

const args = process.argv.slice(2);

switch (args[0]) {
  case "start":
    require(`./${args[0]}`);
    break;

  case undefined:
    Logger.error("No arguments writed");
    break;

  default:
    Logger.error(`Command ${args[0]} not found`);
}
