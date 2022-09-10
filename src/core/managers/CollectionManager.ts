import { Collection } from "discord.js";

export class CollectionManager<T extends { name: string }> {
    cache = new Collection<string, T>();
    create(command: T) {
        this.cache.set(command.name, command);
    }
}