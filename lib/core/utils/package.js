"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpack = exports.isPackaged = void 0;
function isPackaged(obj) {
    return !obj.name;
}
exports.isPackaged = isPackaged;
function unpack(pkg) {
    if ('default' in pkg) {
        if (Object.keys(pkg.default).length === 0)
            return null;
        else
            return pkg.default;
    }
    else {
        let keys = Object.entries(pkg);
        if (keys.length === 1) {
            let [_, value] = keys[0];
            return value;
        }
        else {
            return null;
        }
    }
}
exports.unpack = unpack;
