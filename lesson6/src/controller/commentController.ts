import { Request, Response } from 'express';

import { IComment } from '../entity/commentEntity';
import { commentService } from '../services/commentService';

class CommentController {
    public async createComment(req:Request, res:Response): Promise<Response<IComment>> {
        try {
            const comment = await commentService.createComment(req.body);
            return res.status(200).json(comment);
        } catch (err) {
            return res.json(err);
        }
    }

    public async getCommentsByUserId(req:Request, res:Response):
        Promise<Response<IComment[] | undefined>> {
        try {
            const comments = await commentService.getCommentsByUserId(+req.params.userId);
            return res.status(200).json(comments);
        } catch (err) {
            console.log(err);
            return res.json(err);
        }
    }
}

export const commentController = new CommentController();
