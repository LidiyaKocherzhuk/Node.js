import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFields, ICommonFields } from './commonFields';
import { RoomEntity } from './roomEntity';
import { UserEntity } from './userEntity';

export interface IMessage extends ICommonFields {
    message: string;
    roomId: number;
    userId: number;
}

@Entity('messages', { database: config.MYSQL_DATABASE_NAME })
export class MessageEntity extends CommonFields implements IMessage {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        message: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        roomId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @ManyToOne(() => RoomEntity)
    @JoinColumn({ name: 'roomId' })
        room: RoomEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;
}
