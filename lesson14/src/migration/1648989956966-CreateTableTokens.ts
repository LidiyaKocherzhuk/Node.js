import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTokens1648989956966 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tokens');
    }
}
