const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('dotenv').config()

// template format
const loggerFormat = [
    // use timestamp
    timestamp(),
    printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    })
]

// create new logger
const logger = createLogger({ 
    // set format
    format: combine(...loggerFormat),
    // set transports
    transports: [
        // write to error.log file on error()
        new transports.File({ filename: process.env.LOGGER_PATH + 'error.log', level: 'error'})
    ],
    exceptionHandlers: [
        // write to exceptions.log file on app uncaught exception
        new transports.File({ filename: process.env.LOGGER_PATH + 'exceptions.log' })
    ],
    // on error, do not exit app
    exitOnError: false
})
// allow log to Console only when it's not production
if (process.env.NODE_ENV !== 'production') {
    // apply color to level and message , add color format at top of formats array - because push() not work
    loggerFormat.unshift(format.colorize({ all: true }))
    // add Console transport
    logger.add(new transports.Console({ 
        // all level above 'silly' can log to console
        level: 'silly',
        // format with color setuped
        format: combine(...loggerFormat)
    }));
}

module.exports = logger


