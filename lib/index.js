#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./core/structures/Command"));
const Event_1 = __importDefault(require("./core/structures/Event"));
global.WuCommand = Command_1.default;
global.WuEvent = Event_1.default;
require("./core");
