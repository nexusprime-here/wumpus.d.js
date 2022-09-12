import limitLength from "../utils/decorators/limitLength";
import { ClientEvents } from "discord.js";
import Bot from "./Bot";
import { bot } from "..";

interface EventHandlerOptions {
    bot: Bot<true>
}

export default class Event<K extends keyof ClientEvents> {
    /**
     * Event identification name /
     * Nome de identificação do evento
     */
    @limitLength({ max: 32 })
    public name: string;

    /**
     * Event that will be listened /
     * Evento que será ouvido
     */
    type: K;

    /**
     * If is true, the event will be listened just one time /
     * Se for true, o evento será ouvido apenas uma vez
     */
    once: boolean = false;

    /**
     * The function that will executed when event called /
     * A função que será executada quando o evento for chamado
     */
    run: (options: EventHandlerOptions, ...args: ClientEvents[K]) => any;

    /**
     * Function to create the event /
     * Função para criar o evento
     */
    static build<K extends keyof ClientEvents>(eventObj: Event<K>) {
        bot.emit('eventBuild', new this(eventObj));
    }

    constructor(obj: Event<K>) {
        this.name = obj.name;
        this.type = obj.type;
        if(typeof obj.once === 'boolean') this.once = obj.once;
        this.run = obj.run;
    }
}