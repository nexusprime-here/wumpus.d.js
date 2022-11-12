import { ClientEvents } from "discord.js";
import { WumpusClient } from "../client";
import { client } from "../client/instance";

export declare class EventData<Type extends keyof ClientEvents> {
    name: string
    type: Type;
    once?: boolean;
}

export class Event<Type extends keyof ClientEvents> {
    public data: EventData<Type>;
    public run: (
        options: { client: WumpusClient }, 
        ...args: ClientEvents[Type]
    ) => Promise<any>
    
    static register(event: Event<any>) {
        client[event.data.once ? 'once' : 'on'](
            <any>event.data.type, 
            (...args: any) => event.run({ client }, ...args)
        );
    }
    static build<T extends keyof ClientEvents>(event: EventData<T> & { run: Event<T>['run'] }) {
        const { run, ...data } = event;

        const newEvent = new this(data, run);

        Event.register(newEvent)
    }

    constructor(eventData: EventData<Type>, run: Event<Type>['run']) {
        this.data = eventData;
        this.run = run;
    }
}