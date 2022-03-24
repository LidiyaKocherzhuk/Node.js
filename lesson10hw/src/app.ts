import express from 'express';
import { createConnection } from 'typeorm';

import { apiRouter } from './router/apiRouter';
import { config } from './config/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(apiRouter);

const { PORT } = config;
app.listen(PORT, async () => {
    console.log('Server has started!!!!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connected');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
