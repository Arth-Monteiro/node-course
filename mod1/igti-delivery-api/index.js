import express from "express";
import winston from "winston";

import { readFile, writeFile } from 'fs/promises';

import OrderRouter from './routes/order.route.js';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
})

global.fileName = "pedidos.json";
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: 'igti-delivery-api.log'
        })
    ],
    format: combine(
        label({ label: 'igti-delivery-api' }),
        timestamp(),
        myFormat
    )
});

const app = express();

app.use(express.json());

app.use("/order", OrderRouter);

app.listen(3001, async () => {
    try {
        await readFile(global.fileName);

    } catch (err) {
        try {
            writeFile(global.fileName, JSON.stringify({
                nextId: 1,
                pedidos: []
            }));

            logger.info("File Created.");

        } catch (err) {
            logger.error(err);

        }
    }

    logger.info("delivery-api started")
})