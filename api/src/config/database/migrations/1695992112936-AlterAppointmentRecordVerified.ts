import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterAppointmentRecordVerified1695992112936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "appointment_records",
            new TableColumn({
                name: "psychologist_done",
                type: "boolean",
                default: false
            }),
        )

        await queryRunner.addColumn(
            "appointment_records",
            new TableColumn({
                name: "supervisor_done",
                type: "boolean",
                default: false
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
