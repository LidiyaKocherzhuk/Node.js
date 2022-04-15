import { Column, Entity, OneToMany } from 'typeorm';
import { config } from '../config';
import { CommonFields, ICommonFields } from './commonFields';
import { UserEntity } from './userEntity';
import { MessageEntity } from './messageEntity';

export interface IRoom extends ICommonFields{
    room: string;
}

@Entity('rooms', { database: config.MYSQL_DATABASE_NAME })
export class RoomEntity extends CommonFields implements IRoom {
    @Column({
        type: 'varchar',
        width: 250,
    })
        room: string;

    @OneToMany(() => UserEntity, (user) => user.room)
        users: UserEntity[];

    @OneToMany(() => MessageEntity, (message) => message.room)
        messages: MessageEntity[];
}
