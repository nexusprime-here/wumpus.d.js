#!/usr/bin/env node

import { WumpusClient } from ".";
import { EnvVar } from "../structures";
import { Logger } from "../utils";

const TOKEN = EnvVar.get('TOKEN', { throwError: true });

export const client = new WumpusClient();

client.once('ready', async () => {
    Logger.ready(`Bot logged as ${client.user?.tag}`);
});

client.login(TOKEN);