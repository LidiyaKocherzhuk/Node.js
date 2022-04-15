import { getManager } from 'typeorm';

import { IMessage, MessageEntity, IUser } from '../entity';

class MessageService {
    saveMessage(message: any, user?:IUser): Promise<IMessage> {
        return getManager().getRepository(MessageEntity).save({
            message: message.message,
            userId: user?.id,
            roomId: user?.roomId,
        });
    }

    getMessagesByParams(roomId?: number, userId?: number) {
        return getManager().getRepository(MessageEntity).find({ where: { roomId, userId } });
    }
}

export const messageService = new MessageService();
