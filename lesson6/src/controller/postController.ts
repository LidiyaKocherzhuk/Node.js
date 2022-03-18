import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { PostEntity } from '../entity/postEntity';
import { postService } from '../services/postService';

class PostController {
    public async getPostsByUserId(req: Request, res: Response):
        Promise<Response<PostEntity[] | undefined>> {
        try {
            const posts = await postService.getPostsByUserId(+req.params.userId);
            return res.status(200).json(posts);
        } catch (err) {
            return res.json(err);
        }
    }

    public async updatePostByUserId(req: Request, res: Response): Promise<Response<UpdateResult>> {
        try {
            const post = postService.updatePostByUserId(+req.params.userId, req.body.text);
            return res.status(200).status(201).json(post);
        } catch (err) {
            return res.json(err);
        }
    }
}

export const postController = new PostController();
