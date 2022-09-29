import { WumpusClient } from "../client";

export abstract class BaseHandler {
    run({}: { client: WumpusClient, path: string }): any {
        throw new Error('Handler not implemented');
    }
}