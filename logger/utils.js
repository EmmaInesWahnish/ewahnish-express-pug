import winston from 'winston';

export const debugLogger = winston.createLogger({
    transports:[
        new winston.transports.File({level:'debug', filename:'debug.log'}),
        new winston.transports.File({level:'error', filename:'error.log'})
    ]
});

export const logger = () => (req, res, next) => {
    req.logger = debugLogger;
    next();
}