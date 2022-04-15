import { userService, messageService } from '../services';

class LoginController {
    async createUser(data: any): Promise<void> {
        try {
            const user = await userService.getUserByParams(data.email);

            if (!user) {
                await userService.createUser(data);
                return;
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    async getUserWithMessages(io: any, socket: any, email: string) {
        try {
            const user = await userService.getUserByParams(email);
            const messages = await messageService.getMessagesByParams(1, user?.id);

            socket.join(user?.id);

            io.to(user?.id).emit('message:get-all', { messages, user });
        } catch (err) {
            console.log(err);
        }
    }
}

export const loginController = new LoginController();
