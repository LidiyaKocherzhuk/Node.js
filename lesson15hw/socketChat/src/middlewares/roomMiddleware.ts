import { getManager } from 'typeorm';

import { RoomEntity } from '../entity';

class RoomMiddleware {
    async checkIsRoomExists(io:any, roomId: string) {
        const room = await getManager().getRepository(RoomEntity).findOne({ room: roomId });

        if (!room) {
            const createdRoom = await getManager().getRepository(RoomEntity).save({
                room: roomId,
            });
            return createdRoom.room;
        }
        return room.room;
    }
}

export const roomMiddleware = new RoomMiddleware();
