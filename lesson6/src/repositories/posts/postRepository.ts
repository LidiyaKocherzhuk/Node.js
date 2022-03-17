import { getManager, UpdateResult } from 'typeorm';

import { PostEntity } from '../../entity/postEntity';
import { IPostRepository } from './postRepositoryInterface';

class PostRepository implements IPostRepository {
    public async getPostsByUserId(id:number): Promise<PostEntity[]> {
        return getManager().getRepository(PostEntity)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id })
            .leftJoin('UserEntity', 'user', 'user.id = post.userId')
            .getMany();
    }

    public async updatePostByUserId(userId: number, text: string): Promise<UpdateResult> {
        return getManager().getRepository(PostEntity)
            .update({ userId }, { text });
    }
}

export const postRepository = new PostRepository();
