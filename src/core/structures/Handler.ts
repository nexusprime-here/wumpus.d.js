import Bot from "./Bot";

export default class Handler {
    declare run: (bot: Bot, path: string) => any;

    constructor(obj: Handler) {
        Object.assign(this, obj);
    }
}