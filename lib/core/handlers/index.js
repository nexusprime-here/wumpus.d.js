"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.commands = void 0;
var CommandsHandler_1 = require("./CommandsHandler");
Object.defineProperty(exports, "commands", { enumerable: true, get: function () { return __importDefault(CommandsHandler_1).default; } });
var EventsHandler_1 = require("./EventsHandler");
Object.defineProperty(exports, "events", { enumerable: true, get: function () { return __importDefault(EventsHandler_1).default; } });
