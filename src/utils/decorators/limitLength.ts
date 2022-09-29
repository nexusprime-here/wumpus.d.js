import { Logger } from "../";

export default function limitLength({ min = 1, max }: { min?: number, max: number}) {
    return (target: any, propertyKey: string) => {
        let value = target[propertyKey];

        Object.defineProperty(target, propertyKey, {
            get() {
                return value
            },
            set(v) {
                if(v.length < min) {
                    Logger.error(`${propertyKey} of ${target.constructor.name} doesn't have enough characters`)
                    process.exit();
                }
                else if(v.length >= max) {
                    Logger.error(`${propertyKey} of ${target.constructor.name} has many characters`)
                    process.exit();
                }
                else value = v;
            },
        })
    };
}