// @ts-ignore
global.rootDir = __dirname;

import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router';
import { config } from './config';
// import { Cron } from './cron';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const { PORT } = config;
app.listen(PORT, async () => {
    console.log(`Server has started!!!! On port ${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connected');
            // Cron();
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
