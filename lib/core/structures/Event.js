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
class Event {
    constructor(obj) {
        /**
         * If is true, the event will be listened just one time /
         * Se for true, o evento será ouvido apenas uma vez
         */
        this.once = false;
        this.name = obj.name;
        this.type = obj.type;
        if (typeof obj.once === 'boolean')
            this.once = obj.once;
        this.run = obj.run;
    }
    /**
     * Function to create the event /
     * Função para criar o evento
     */
    static build(eventObj) {
        __1.bot.emit('eventBuild', new this(eventObj));
    }
}
__decorate([
    (0, limitLength_1.default)({ max: 32 }),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
exports.default = Event;
