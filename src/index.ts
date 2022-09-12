#! /usr/bin/env node

import Command from './core/structures/Command';
import Event from './core/structures/Event';

declare global {
    var WuCommand: typeof Command;
    var WuEvent: typeof Event;
}

global.WuCommand = Command;
global.WuEvent = Event;

import './core'