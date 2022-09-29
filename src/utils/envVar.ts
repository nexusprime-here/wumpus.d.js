import Logger from "./Logger";

export function EnvVar(name: string, finishProcess: boolean = false) {
    let envVar = process.env[name];

    if(!envVar) {
        if(finishProcess) {
            Logger.error(`Missing ${name} var in .env`);
            process.exit();
        }
        else Logger.warn(`${name} var not specified in .env`);
    }

    return <string>envVar;
}