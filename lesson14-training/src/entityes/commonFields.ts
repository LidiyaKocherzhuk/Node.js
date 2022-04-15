import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { config } from '../config';

export interface ICommonFields{
    id: number;
    createdAt: string;
    deletedAt: string;
}

@Entity('okten', { database: config.MYSQL_DATABASE_NAME })
export class CommonFieldsEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn()
        createdAt: string;

    @DeleteDateColumn()
        deletedAt: string;
}
