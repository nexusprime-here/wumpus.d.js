import Logger from "./Logger";


export function envVar(VarName: string, finishProcess: boolean = false) {
    let envVar = process.env[VarName];

    if(!envVar) {
        if(finishProcess) {
            Logger.error(`Missing ${envVar} var in .env`);
            process.exit();
        }
        else Logger.warn(`${envVar} var not specified in .env`);
    }

    return <string>envVar;
}