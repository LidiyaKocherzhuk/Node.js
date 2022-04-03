import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFields, ICommonFields } from './commonFields';
import { UserEntity } from './userEntity';
import { ActionTokenType } from '../constans';

export interface IActionToken extends ICommonFields {
    actionToken: string;
    type: ActionTokenType;
    userId: number;
}
export interface IActionTokenToSave {
    actionToken: string;
    type: ActionTokenType;
    userId: number;
}

@Entity('actionToken', { database: config.MYSQL_DATABASE_NAME })
export class ActionTokenEntity extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        type: ActionTokenType;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;
}
