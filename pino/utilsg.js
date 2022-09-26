import pino from 'pino';

const streams = [
    {level:'debug', stream:process.stdout},
    {level:'error',stream:pino.destination('./pinoerrors.log')}
]

export const debugLogger = pino({},pino.multistream(streams))

export const logger = () => (req, res, next) => {
    req.logger = debugLogger;
    next();
}