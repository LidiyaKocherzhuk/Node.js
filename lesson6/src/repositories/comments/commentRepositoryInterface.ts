import { IComment } from '../../entity/commentEntity';

export interface ICommentRepository{
    createComment(comment: IComment): Promise<IComment>;
    getCommentsByUserId(id: number): Promise<IComment[] | undefined>;
}
