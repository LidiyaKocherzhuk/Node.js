import dotenv from 'dotenv';

dotenv.config();
export const config = {
    PORT: process.env.PORT || 3200,
    MYSQL_DATABASE_NAME: process.env.okten,
    SECRET_ACCESS_KEY: process.env.secret_access_key,
    SECRET_REFRESH_KEY: process.env.secret_refresh_key,
};
