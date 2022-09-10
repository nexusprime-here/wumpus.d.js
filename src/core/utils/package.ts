export type Package<T extends Object> =
    | { default: T | {} } 
    | { [key: string]: T }

export function isPackaged<T extends { name: string }>(obj: T | Package<T>): obj is Package<T> {
    return !(<T>obj).name;
}

export function unpack<T extends Object>(pkg: Package<T>): T | null {
    if('default' in pkg) {
        if(Object.keys(pkg.default).length === 0) return null;
        else return <T>pkg.default;
    } else {
        let keys = Object.entries(pkg);

        if(keys.length === 1) {
            let [_, value] = keys[0];

            return value;
        } else {
            return null;
        }
    }
}