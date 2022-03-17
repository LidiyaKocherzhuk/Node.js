import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { UserEntity } from './userEntity';
import { PostEntity } from './postEntity';
import { config } from '../config/config';

export interface IComment {
    text: string;
    like: number;
    dislike: number;
    authorId?: number;
    postId?: number;
}

@Entity('comments', { database: config.MYSQL_DATABASE_NAME })
export class CommentEntity extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        like: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        dislike: number;

    @Column({
        type: 'int',
    })
        authorId?: number;

    @Column({
        type: 'int',
    })
        postId?: number;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user: UserEntity;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: PostEntity;
}
