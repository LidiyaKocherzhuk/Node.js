import { roomMiddleware } from '../middlewares/roomMiddleware';
import { userService, messageService } from '../services';

class RoomController {
    async createRoom(io: any, roomId: string, email:string) {
        try {
            const room = await roomMiddleware.checkIsRoomExists(io, roomId);

            const user = await userService.getUserByParams(email);
            if (user) {
                await userService.updateUser(user.id, Number(room));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async responseDataFromDb(io: any, socket: any, roomId: number, email: string) {
        try {
            const user = await userService.getUserByParams(email);
            const messages = await messageService.getMessagesByParams(roomId, user?.id);

            socket.join(roomId);
            socket.join(user?.id);

            io.to(user?.id).emit('message:get-all', { messages, user });
            socket.broadcast.to(roomId).emit('user_join_room', { message: `User ${user?.userName} joined room ${roomId}`, user });
        } catch (err) {
            console.log(err);
        }
    }
}

export const roomController = new RoomController();
