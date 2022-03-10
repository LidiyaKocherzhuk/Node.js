import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { UserEntity } from './entity/userEntity';
import { PostEntity } from './entity/postEntity';
import { CommentEntity } from './entity/commentEntity';
// import { CommentEntity } from './entity/commentEntity';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/posts', async (req: Request, res: Response) => {
    try {
        const users = await getManager().getRepository(PostEntity).find({ relations: ['comments'] });
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const users = await getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', { id: +req.params.id })
            .getOne();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const createUser = await getManager().getRepository(UserEntity).save(req.body);
        res.json(createUser);
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
        res.json(updateUser);
    } catch (err) {
        res.json(err);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deleteUser = await getManager().getRepository(UserEntity)
            .softDelete({ id: Number(req.params.id) });
        res.json(deleteUser);
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
        res.json(posts);
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
        res.json(update);
    } catch (err) {
        res.json(err);
    }
});

app.get('/comments/:userId', async (req, res) => {
    try {
        const comments = await getManager().getRepository(CommentEntity)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +req.params.userId })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    } catch (err) {
        console.log(err);
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
