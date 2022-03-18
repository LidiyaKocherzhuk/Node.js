import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { UserEntity } from './userEntity';
import { CommentEntity } from './commentEntity';

export interface IPost {
    title: string;
    text: string;
    userId: number;
}

@Entity('posts', { database: 'okten' })
export class PostEntity extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.post)
        comments: CommentEntity[];
}
