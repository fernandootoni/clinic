import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableNamePacientToPatient1689626263262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("pacients", "patients");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("patients", "pacients");
    }

}
