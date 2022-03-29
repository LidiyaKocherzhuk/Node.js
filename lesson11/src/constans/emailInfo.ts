import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'september 2021@',
        html: 'hello my friend',
    },
    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'september 2021@',
        html: 'your account was blocked',
    },
};
