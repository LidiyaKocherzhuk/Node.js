import { UpdateResult } from 'typeorm';
import { PostEntity } from '../../entity/postEntity';

export interface IPostRepository {
    getPostsByUserId(id:number): Promise<PostEntity[]>;
    updatePostByUserId(userId: number, text: string): Promise<UpdateResult>;
}
