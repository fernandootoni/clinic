import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteRecords1689952890162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("records")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
