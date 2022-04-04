import { Column, Entity } from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { config } from '../config';

export interface IUser extends ICommonFields{
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
}

@Entity('users', { database: config.MYSQL_DATABASE_NAME })
export class UserEntity extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        password: string;
}
