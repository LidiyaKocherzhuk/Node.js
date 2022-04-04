import cron from 'node-cron';

import { emailService, userService } from '../services';
import { EmailActionEnum } from '../constans';

export const showNewUsers = () => {
    cron.schedule('*/10 * * * * *', async () => {
        const users = await userService.getNewUsers();

        if (users) {
            await users.forEach((user) => emailService.sendMail(
                user.email,
                EmailActionEnum.WELCOME,
                {
                    userName: user.firstName,
                },
            ));
        }
    });
};
