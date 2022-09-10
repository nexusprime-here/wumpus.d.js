import { Client, ClientOptions, Guild } from "discord.js";
import { CollectionManager } from "../managers/CollectionManager";
import { logger } from "../utils";
import Command from "./Command";
import Event from "./Event";

const TEST_GUILD = function() {
    const TEST_GUILD = process.env.TEST_GUILD;

    if(!TEST_GUILD) {
        logger.warn('TEST_GUILD var not specified in .env');
    }

    return TEST_GUILD;
}();

export default class Bot<Ready extends boolean = boolean> extends Client<Ready> {
    public commands = new CollectionManager<Command>();
    public events = new CollectionManager<Event<any>>();
    // public components = new CollectionManager<Component>();

    public testGuild?: Guild;

    constructor(options: ClientOptions) {
        super(options);
    }

    public async login(token?: string | undefined): Promise<string> {
        const promise = await super.login(token);

        if(TEST_GUILD) this.testGuild = this.guilds.cache.get(TEST_GUILD);

        return promise;
    }
}