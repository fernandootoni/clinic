import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAppointmentRemoveDone1689767260040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("appointments", "done")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "patients",
            new TableColumn({
                name: "done",
                type: "boolean"
            })
        )
    }

}
