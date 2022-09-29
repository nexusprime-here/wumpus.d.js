import limitLength from "../utils/decorators/limitLength";
import { APIApplicationCommandOption, CommandInteraction } from "discord.js";
import { WumpusClient } from "../client";

interface CommandHandlerOptions {
    interaction: CommandInteraction;
    client: WumpusClient<true>;
}

export class Command {
    @limitLength({ max: 32 })
    name: string;

    @limitLength({ max: 100 })
    description: string;

    options?: APIApplicationCommandOption[] = [];
    test?: boolean = false;
    run: (options: CommandHandlerOptions) => any;

    register(client: WumpusClient<true>) {
        const commandsAplication = client.application.commands;
        const testGuildId = client.testGuild?.id;

        commandsAplication.create({
            name: this.name,
            description: this.description,
            options: this.options
        }, this.test ? testGuildId : undefined);
    }

    constructor(obj: Command) {
        this.name = obj.name;
        this.description = obj.description;
        if(obj.options) this.options = obj.options;
        if(obj.test) this.test = obj.test;
        this.run = obj.run;
    }
}