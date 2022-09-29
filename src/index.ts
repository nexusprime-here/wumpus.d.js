import { Command, Event } from './structures';
import { WumpusClient } from './client';
import { EnvVar, Logger } from './utils';

declare global {
    var WuCommand: typeof Command;
    var WuEvent: typeof Event;
}
global.WuCommand = Command;
global.WuEvent = Event;

const client = new WumpusClient();

client.once('ready', () => {
    Logger.ready(`Bot logged as ${client.user?.tag}`);
});

client.login(EnvVar('TOKEN', true));