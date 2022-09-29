import callsites from 'v8-callsites';
import { HandlerManager } from '../managers';

export abstract class Component {
    declare name: string;
    declare description: string;
    declare version: string | number;
    protected path;
    
    public useSubCommand: boolean = false;

    public handlers: { commands: boolean, events: boolean } = {
        commands: true,
        events: true
    }

    constructor() {
        this.path = this.callerPath();

        new HandlerManager({
            client: Component.client,
            config: this.handlers,
            path: this.path
        })
    }

    private callerPath() {
        let stack = callsites(
            2,
            this.callerPath
        );
    
        return stack[stack.length-1].getFileName();
    };
}

