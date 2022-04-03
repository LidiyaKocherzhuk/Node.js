"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
global.rootDir = __dirname;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const router_1 = require("./router");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(router_1.apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
        message: err.message,
        data: err.data,
    });
});
const { PORT } = config_1.config;
app.listen(PORT, async () => {
    console.log('Server has started!!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('database connected');
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
//# sourceMappingURL=app.js.map