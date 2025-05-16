import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const transports = [
    new winston.transports.Console({
        format: combine(colorize(), logFormat),
        level: "debug",
    }),

    new DailyRotateFile({
        filename: "logs/application-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        maxSize: "20m",
        maxFiles: "14d",
        format: combine(logFormat),
        level: "info",
    }),
];

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true })
    ),
    transports,
});

export default logger;
