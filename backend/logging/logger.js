const winston = require("winston");

function logFormatter(params) {
  return `${params.timestamp} [${params.level}]: ${params.message}`;
}

function createLogger() {
  winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "cyan",
  });

  return winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "nodejs-library-api" },
    transports: [
      new winston.transports.Console({
        // filename: "logs/error.log",
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.printf(logFormatter),
        ),
      }),
      new winston.transport.defaultMaxListeners({
        filename: "logs/error.log",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.printf(logFormatter),
        ),
      }),
    ],
  });
}

module.exports = {
  logFormatter,
  logger: createLogger(),
};
