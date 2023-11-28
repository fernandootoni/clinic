import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAppointmentAddColumnMinutes1689957042908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "appointments",
            new TableColumn({
                name: "minute",
                type: "integer",
                default: 0
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
