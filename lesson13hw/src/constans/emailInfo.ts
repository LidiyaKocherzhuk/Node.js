import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'september 2021@',
        templateName: 'welcome',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'september 2021@',
        templateName: 'accountBlocked',
    },
    [EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'dont worry, update your pass',
        templateName: 'forgotPassword',
    },
};
