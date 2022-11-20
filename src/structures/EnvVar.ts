import { Logger } from "../utils";

export default class EnvVar {
    static get(name: string, options: {throwError: boolean} = { throwError: false }) {
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

    private constructor() {};
}