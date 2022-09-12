import Bot from "./Bot";

export default class Handler {
    static set(obj: Omit<typeof Handler, 'set' | 'prototype'>) {
        Object.assign(this, obj);
    }
    
    static bot: Bot;
    static rootPath: string;

    declare preload: () => any
    declare load: () => any
}