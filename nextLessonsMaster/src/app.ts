import express from 'express';

import { users } from './users';

const app = express();
console.log(users);

function a(num:number) {
    return num + 1;
}

a(2);

app.listen(3100, () => {
    console.log('Server has started');
});
