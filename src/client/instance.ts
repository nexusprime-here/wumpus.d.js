#!/usr/bin/env node

import { WumpusClient } from ".";
import EnvVar from "../structures/EnvVar";
import { Logger } from "../utils";

const TOKEN = EnvVar.get('TOKEN', { throwError: true });

declare global { var client: WumpusClient }
global.client = new WumpusClient();

client.once('ready', async () => {
    Logger.ready(`Bot logged as ${client.user?.tag}`);
});

client.login(TOKEN);