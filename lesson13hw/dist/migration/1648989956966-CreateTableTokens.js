"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTokens1648989956966 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableTokens1648989956966 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'tokens',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'refreshToken',
                    type: 'varchar(250)',
                    isNullable: false,
                },
                {
                    name: 'accessToken',
                    type: 'varchar(250)',
                    isNullable: false,
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('tokens');
    }
}
exports.CreateTableTokens1648989956966 = CreateTableTokens1648989956966;
//# sourceMappingURL=1648989956966-CreateTableTokens.js.map