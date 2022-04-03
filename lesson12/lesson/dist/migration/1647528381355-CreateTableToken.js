"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableToken1647528381355 = void 0;
class CreateTableToken1647528381355 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Tokens(
            id INT PRIMARY KEY AUTO_INCREMENT,
            refreshToken VARCHAR(250) NOT NULL,
            userId INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES Users(id),
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
    }
}
exports.CreateTableToken1647528381355 = CreateTableToken1647528381355;
//# sourceMappingURL=1647528381355-CreateTableToken.js.map