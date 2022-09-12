"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const limitLength_1 = __importDefault(require("../utils/decorators/limitLength"));
const __1 = require("..");
class Command {
    constructor(obj) {
        this.options = [];
        this.test = false;
        this.name = obj.name;
        this.description = obj.description;
        if (obj.options)
            this.options = obj.options;
        if (obj.test)
            this.test = obj.test;
        this.run = obj.run;
    }
    static build(commandObj) {
        __1.bot.emit('commandBuild', new this(commandObj));
    }
}
__decorate([
    (0, limitLength_1.default)({ max: 32 }),
    __metadata("design:type", String)
], Command.prototype, "name", void 0);
__decorate([
    (0, limitLength_1.default)({ max: 100 }),
    __metadata("design:type", String)
], Command.prototype, "description", void 0);
exports.default = Command;
