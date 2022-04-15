import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { config } from '../config';
import { CommonFields, ICommonFields } from './commonFields';
import { RoomEntity } from './roomEntity';
import { MessageEntity } from './messageEntity';

export interface IUser extends ICommonFields {
    userName: string;
    email: string;
    roomId: number;
}

@Entity('users', { database: config.MYSQL_DATABASE_NAME })
export class UserEntity extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        userName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        email: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        roomId: number;

    @ManyToOne(() => RoomEntity)
    @JoinColumn({ name: 'roomId' })
        room: RoomEntity;

    @OneToMany(() => MessageEntity, (message) => message.user)
        messages: MessageEntity[];
}
