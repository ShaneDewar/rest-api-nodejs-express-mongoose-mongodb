const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winson json custom"

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: CATEGORY }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss', }),
        prettyPrint(),
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.Console()],
});

module.exports = logger;