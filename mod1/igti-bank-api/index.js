import express from "express"
import winston from "winston";
import swaggerUi from "swagger-ui-express";

import { readFile, writeFile } from 'fs/promises'

import AccountRouter from "./routes/account.route.js";
import { swaggerDocument } from "./docs.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
})

global.fileName = "accounts.json";
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: 'igti-bank-api.log'
        })
    ],
    format: combine(
        label({ label: 'igti-bank-api' }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/account", AccountRouter);

app.listen(3001, async () => {
    try {
        await readFile(global.fileName);

    } catch (err) {
        try {
            writeFile(global.fileName, JSON.stringify({
                nextId: 1,
                accounts: []
            }));

            logger.info("File Created.");

        } catch (err) {
            logger.error(err);

        }
    }

    logger.info("bank-api started")
})