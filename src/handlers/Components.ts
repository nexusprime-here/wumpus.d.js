import { WumpusClient } from "../client";
import { Logger } from "../utils";
import { BaseHandler } from "./BaseHandler";
import { join as joinPath } from 'path';
import { readdirSync } from "fs";
import callsites from 'v8-callsites';

export const ComponentsHandler = new class extends BaseHandler {
    run(client: WumpusClient<true>) {
        Logger.debug('ComponentsHandler: On');

        const dirpath = joinPath(client.rootPath, 'components');

        for(let fileName of readdirSync(dirpath)) {
            
        }
    }
}