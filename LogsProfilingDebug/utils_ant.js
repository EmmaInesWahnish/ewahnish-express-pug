import winston from 'winston';
import logConfiguration from './src/js/gralLogger.js'
const { combine, timestamp, json } = winston.format;
import config from './src/configurations/dotenvConfig.js'

const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
});
const warnFilter = winston.format((info, opts) => {
    return info.level === 'warn' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});

const httpFilter = winston.format((info, opts) => {
    return info.level === 'http' ? info : false;
});
const verboseFilter = winston.format((info, opts) => {
    return info.level === 'verbose' ? info : false;
});

const debugFilter = winston.format((info, opts) => {
    return info.level === 'debug' ? info : false;
});

export const gralLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp(), json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({filename:'combined.log'}),
        new winston.transports.File({ 
            level: 'warn', 
            filename: 'warn.log',
            format: combine(warnFilter(),timestamp(),json())
        }),
        new winston.transports.File({ 
            level: 'error', 
            filename: 'error.log',
            format: combine(errorFilter(), timestamp(), json())
        })
    ]
});

export const logger = () => (req, res, next) => {
    req.logger = gralLogger;
    next();
}