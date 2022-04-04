"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const entity_1 = require("../../entity");
dayjs_1.default.extend(utc_1.default);
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async getUsersPagination(searchObject, page, skip, take) {
        const [responseData, itemCount] = await (0, typeorm_1.getManager)()
            .getRepository(entity_1.UserEntity)
            .findAndCount({
            where: searchObject, skip, take,
        });
        return {
            page,
            perPage: take,
            itemCount,
            data: responseData,
        };
    }
    async getUserById(id) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }
    async getUserByEmail(email) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }
    async getUserByParams(findUser) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity).findOne(findUser);
    }
    async getNewUsers() {
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', {
            date: (0, dayjs_1.default)().utc().startOf('day').format(),
        })
            .getMany();
    }
    async createUser(user) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity).save(user);
    }
    async updateUserPass(user) {
        const { password, id } = user;
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity)
            .update({ id }, {
            password,
        });
    }
    async deleteUser(id) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.UserEntity)
            .softDelete({ id });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(entity_1.UserEntity)
], UserRepository);
exports.userRepository = new UserRepository();
//# sourceMappingURL=userRepository.js.map