import { getManager } from 'typeorm';

import { CommentEntity, IComment } from '../../entity/commentEntity';

class CommentRepository {
    public async createComment(comment: IComment): Promise<IComment> {
        return getManager().getRepository(CommentEntity).save(comment);
    }

    public async getCommentsByUserId(id: number): Promise<IComment[] | undefined> {
        return getManager().getRepository(CommentEntity)
            .createQueryBuilder('comments')
            .where('comments.authorId = :id', { id })
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('comments.post', 'post')
            .getMany();
    }
}

export const commentRepository = new CommentRepository();
