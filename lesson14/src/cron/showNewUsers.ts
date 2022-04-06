import cron from 'node-cron';

import { EmailActionEnum } from '../constans';
import { emailService, userService } from '../services';
import { IUser } from '../entity';

export const showNewUsers = () => {
    cron.schedule('*/10 * * * * *', async () => {
        const users = await userService.getNewUsers();

        const promises = users.map((user: IUser) => emailService.sendMail(
            user.email,
            EmailActionEnum.WELCOME,
            { userName: user.firstName },
        ));

        await Promise.all(promises);
    });
};
