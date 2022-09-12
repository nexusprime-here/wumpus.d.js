export default class Intent {
    name: string;
    events: string[];
    require?: Intent[];

    constructor(obj: Intent) {
        this.name = obj.name;
        this.events = obj.events;
        this.require = obj.require;
    }
}
console.log(Intent)