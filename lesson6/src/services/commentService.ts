import { IComment } from '../entity/commentEntity';
import { commentRepository } from '../repositories/comments/commentRepository';

class CommentService {
    public async createComment(comment: IComment): Promise<IComment> {
        return commentRepository.createComment(comment);
    }

    public async getCommentsByUserId(id: number): Promise<IComment[] | undefined> {
        return commentRepository.getCommentsByUserId(id);
    }
}

export const commentService = new CommentService();
