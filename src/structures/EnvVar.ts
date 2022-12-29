import { Logger } from "../utils";

export default class EnvVar {
    static get(name: Uppercase<string>, options: {throwError: boolean} = { throwError: false }) {
        let envVar = <string>process.env[name];

        if(!envVar) {
            if(options.throwError) {
                Logger.error(`Missing ${name} var in .env`);
                process.exit();
            }
            else Logger.warn(`${name} var not specified in .env`);
        }

        return envVar;
    }

    static set(name: Uppercase<string>, value: string) {
        process.env[name] = value;
    }

    private constructor() {};
}