"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableActionToken1648994471266 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableActionToken1648994471266 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'actionToken',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'actionToken',
                    type: 'varchar(250)',
                    isNullable: false,
                },
                {
                    name: 'type',
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
        await queryRunner.dropTable('actionToken');
    }
}
exports.CreateTableActionToken1648994471266 = CreateTableActionToken1648994471266;
//# sourceMappingURL=1648994471266-CreateTableActionToken.js.map