import dotenv from 'dotenv';

dotenv.config();
export const config = {
    PORT: process.env.PORT,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,

    MAX_AGE_ACCESS_TOKEN: process.env.MAX_AGE_ACCESS_TOKEN,
    MAX_AGE_REFRESH_TOKEN: process.env.MAX_AGE_REFRESH_TOKEN,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
};
