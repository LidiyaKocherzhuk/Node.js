import { Column, Entity, OneToMany } from 'typeorm';
import { CommonFields } from './commonFields';
import { PostEntity } from './postEntity';
import { CommentEntity } from './commentEntity';

export interface IUser {
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
}

@Entity('users', { database: 'lessFive' })
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

    @OneToMany(() => PostEntity, (post) => post.user)
        posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
        comments: CommentEntity[];
}
