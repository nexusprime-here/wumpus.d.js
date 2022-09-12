"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
function limitLength({ min = 1, max }) {
    return (target, propertyKey) => {
        let value = target[propertyKey];
        Object.defineProperty(target, propertyKey, {
            get() {
                return value;
            },
            set(v) {
                if (v.length < min) {
                    __1.Logger.error(`${propertyKey} of ${target.constructor.name} doesn't have enough characters`);
                    process.exit();
                }
                else if (v.length >= max) {
                    __1.Logger.error(`${propertyKey} of ${target.constructor.name} has many characters`);
                    process.exit();
                }
                else
                    value = v;
            },
        });
    };
}
exports.default = limitLength;
