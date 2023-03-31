import { IntentManager, ScopedDiscordEvents } from "../managers";
import type { ClientEvents } from "discord.js";
import type { WumpusClient } from "../client";

export default class Event<Type extends keyof ClientEvents> {
	public data!: EventData<Type>;
	public run!: (
		ctx: { client: WumpusClient },
		...args: ClientEvents[Type]
	) => Promise<unknown>;
	static build<T extends keyof ClientEvents>(event: IEvent<T>) {
		const { run, ...data } = event;

		IntentManager.addEvent(data.type, (data as any).scope);

		return new this(run, data as any);
	}

	private constructor(run: Event<Type>["run"], data: Event<Type>["data"]) {
		this.data = data;
		this.run = run;
	}
}

type ScopedEventData<Type extends keyof ClientEvents> = {
	name: string;
	type: Type;
	once?: boolean;
	scope: "guild" | "direct" | "all";
};
type NotScopedEventData<Type extends keyof ClientEvents> = {
	name: string;
	type: Type;
	once?: boolean;
};
export type EventData<Type extends keyof ClientEvents> =
	Type extends ScopedDiscordEvents
		? ScopedEventData<Type>
		: NotScopedEventData<Type>;

export type IEvent<T extends keyof ClientEvents> = EventData<T> & {
	run: Event<T>["run"];
};
