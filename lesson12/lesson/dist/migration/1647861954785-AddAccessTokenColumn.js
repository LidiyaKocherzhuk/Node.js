"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAccessTokenColumn1647861954785 = void 0;
class AddAccessTokenColumn1647861954785 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(250) NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE Tokens DROP COLUMN accessToken');
    }
}
exports.AddAccessTokenColumn1647861954785 = AddAccessTokenColumn1647861954785;
//# sourceMappingURL=1647861954785-AddAccessTokenColumn.js.map