import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { CommentEntity, PostEntity, UserEntity } from './entity';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await getManager().getRepository(UserEntity).find({ relations: ['comments'] });
        res.json(users);
    } catch (err) {
        res.status(200).json(err);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const users = await getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', { id: +req.params.id })
            .getOne();
        res.status(200).json(users);
    } catch (err) {
        res.json(err);
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const createUser = await getManager().getRepository(UserEntity).save(req.body);
        res.status(200).json(createUser);
    } catch (err) {
        res.json(err);
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const { password, email } = req.body;
        const updateUser = await getManager().getRepository(UserEntity)
            .update({ id: Number(req.params.id) }, {
                password,
                email,
            });
        res.status(200).json(updateUser);
    } catch (err) {
        res.json(err);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        await getManager().getRepository(UserEntity)
            .softDelete({ id: Number(req.params.id) });
        res.status(204);
    } catch (err) {
        res.json(err);
    }
});

// *********** //
app.get('/posts/:userId', async (req, res) => {
    try {
        const posts = await getManager().getRepository(PostEntity)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +req.params.userId })
            .leftJoin('UserEntity', 'user', 'user.id = post.userId')
            .getMany();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.patch('/posts/:userId', async (req, res) => {
    try {
        const { text } = req.body;
        const update = await getManager().getRepository(PostEntity)
            .update({ userId: Number(req.params.userId) }, { text });
        res.status(200).json(update);
    } catch (err) {
        res.json(err);
    }
});

app.get('/comments/:userId', async (req, res) => {
    try {
        const comments = await getManager().getRepository(CommentEntity)
            .createQueryBuilder('comments')
            .where('comments.authorId = :id', { id: +req.params.userId })
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('comments.post', 'post')
            .getMany();
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.patch('/comments/action', async (req:Request, res:Response) => {
    try {
        const { commentId, like, dislike } = req.body;
        const updateLikeDislike = await getManager().getRepository(CommentEntity)
            .update({ authorId: commentId }, { like, dislike });
        res.status(200).json(updateLikeDislike);
    } catch (err) {
        res.json(err);
    }
});

app.listen(3200, async () => {
    console.log('Server has started!!!!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connected');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
