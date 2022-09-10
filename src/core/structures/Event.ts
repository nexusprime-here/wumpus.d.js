import limitLength from "../utils/decorators/limitLength";
import { ClientEvents } from "discord.js";
import Bot from "./Bot";
import { bot } from "..";

interface EventHandlerOptions {
    bot: Bot<true>
}

export default class Event<K extends keyof ClientEvents> {
    @limitLength({ max: 32 })
    public name: string;

    type: K;

    @limitLength({ max: 100 })
    description: string;

    once?: boolean = false;
    run: (options: EventHandlerOptions, ...args: ClientEvents[K]) => any;

    static build<K extends keyof ClientEvents>(event: Event<K>) {
        bot.emit('eventBuild', event)
    }

    constructor(obj: Event<K>) {
        this.name = obj.name;
        this.description = obj.description;
        this.type = obj.type;
        if(typeof obj.once === 'boolean') {
            this.once = obj.once;
        }
        this.run = obj.run;
    }
}