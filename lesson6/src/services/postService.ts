import { UpdateResult } from 'typeorm';

import { postRepository } from '../repositories/posts/postRepository';
import { PostEntity } from '../entity/postEntity';

class PostService {
    public async getPostsByUserId(id: number): Promise<PostEntity[]> {
        return postRepository.getPostsByUserId(id);
    }

    public async updatePostByUserId(userId: number, text: string): Promise<UpdateResult> {
        return postRepository.updatePostByUserId(userId, text);
    }
}

export const postService = new PostService();
