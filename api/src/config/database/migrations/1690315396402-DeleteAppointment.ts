import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteAppointment1690315396402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments_records", true);
        await queryRunner.dropTable("appointments");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
