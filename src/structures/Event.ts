import { ClientEvents } from "discord.js";
import { WumpusClient } from "../client";

export declare class EventData<Type extends keyof ClientEvents> {
    name: string
    type: Type;
    once?: boolean;
}
/** WARNING: some property types won't work without Event.Build */
export interface IEvent<T extends keyof ClientEvents> extends EventData<T> { run: Event<T>['run'] }

export default class Event<Type extends keyof ClientEvents> {
    public data!: EventData<Type>;
    public run!: (
        options: { client: WumpusClient }, 
        ...args: ClientEvents[Type]
    ) => Promise<any>
    
    private static register(event: Event<any>) {
        client[event.data.once ? 'once' : 'on'](
            <any>event.data.type, 
            (...args: any) => event.run({ client }, ...args)
        );
    }
    static build<T extends keyof ClientEvents>(event: IEvent<T>) {
        const { run, ...data } = event;

        Event.register({ run, data });
    }
}