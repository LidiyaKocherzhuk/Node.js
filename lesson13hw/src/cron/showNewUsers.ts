import cron from 'node-cron';
import { userService } from '../services';

export const showNewUsers = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Runn');
        const users = await userService.getNewUsers();
        console.log(users);
    });
};
