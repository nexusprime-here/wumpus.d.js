import limitLength from "../utils/decorators/limitLength";
import { APIApplicationCommandOption, CommandInteraction } from "discord.js";
import { bot } from "..";
import Bot from "./Bot";

interface CommandHandlerOptions {
    interaction: CommandInteraction;
    bot: Bot<true>;
}

export default class Command {
    @limitLength({ max: 32 })
    name: string;

    @limitLength({ max: 100 })
    description: string;

    options?: APIApplicationCommandOption[] = [];
    test?: boolean = false;
    run: (options: CommandHandlerOptions) => any;

    static build(command: Command) {
        bot.emit('commandBuild', command);
    }

    constructor(obj: Command) {
        this.name = obj.name;
        this.description = obj.description;
        if(obj.options) this.options = obj.options;
        if(obj.test) this.test = obj.test;
        this.run = obj.run;
    }
}