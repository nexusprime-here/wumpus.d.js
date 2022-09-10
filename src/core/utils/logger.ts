import Pino from 'pino';

export const logger = Pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

export default logger;