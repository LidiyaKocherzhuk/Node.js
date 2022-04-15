import { userService, messageService } from '../services';

class MessageController {
    async saveMessage(io: any, socket: any, message:any, email:string): Promise<void> {
        try {
            const user = await userService.getUserByParams(email);
            await messageService.saveMessage(message, user);
            console.log(user);
            socket.join(message.roomNum);
            io.to(message.roomNum).emit('return:message', { message, user });
        } catch (err) {
            console.log(err);
        }
    }
}
export const messageController = new MessageController();
