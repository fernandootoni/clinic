import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTablePhoneToVarchar1689638119879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE patients ALTER COLUMN phone TYPE varchar");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE patients ALTER COLUMN phone TYPE integer");

    }

}
