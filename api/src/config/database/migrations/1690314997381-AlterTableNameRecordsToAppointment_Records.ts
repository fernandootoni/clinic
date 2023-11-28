import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableNameRecordsToAppointmentRecords1690314997381 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("records", "appointments_records");
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("appointments_records", "records");
    }
}