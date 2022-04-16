import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import { Server } from 'socket.io';
import * as http from 'http';

import { loginController, roomController, messageController } from './controllers';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connect: any[] = [];

io.on('connection', async (socket) => {
    console.log(socket.id);
    connect.push(...connect, { id: socket.id });

    socket.on('disconnect', () => {
        connect.splice(connect.indexOf(socket.id), 1);
        console.log(`disconnect ${socket.id}`);
    });

    socket.on('login', async (data: any) => {
        const { userName, email } = data;
        await loginController.createUser({ userName, email, roomId: 1 });
        await loginController.getUserWithMessages(io, socket, email);

        socket.on('join_room', async (room) => {
            await roomController.createRoom(io, room.id, email);
            await roomController.responseDataFromDb(io, socket, room.id, email);
        });

        socket.on('send:data', async (message) => {
            await messageController.saveMessage(io, socket, message, email);
        });
    });
});

const PORT = 5900;
server.listen(PORT, async () => {
    console.log(`Server has started!!!! On port ${PORT}`);

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
