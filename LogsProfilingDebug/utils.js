import winston from 'winston';
import logConfiguration from './src/js/gralLogger.js'

export const gralLogger = winston.createLogger(logConfiguration)

//*Middleware to use with routes*/
export const logger = () => (req, res, next) => {
    req.logger = gralLogger;
    next();
}