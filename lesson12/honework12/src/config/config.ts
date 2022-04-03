import dotenv from 'dotenv';

dotenv.config();
export const config = {
    PORT: process.env.PORT || 5000,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 12214,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 12214,
    SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY || 12214,

    MAX_AGE_ACCESS_TOKEN: process.env.MAX_AGE_ACCESS_TOKEN,
    MAX_AGE_REFRESH_TOKEN: process.env.MAX_AGE_REFRESH_TOKEN,
    MAX_AGE_ACTION_TOKEN: process.env.MAX_AGE_ACTION_TOKEN,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    FRONTEND_URL: process.env.FRONTEND_URL,
};
