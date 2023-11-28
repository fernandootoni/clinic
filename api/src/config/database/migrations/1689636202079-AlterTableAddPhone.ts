import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableAddPhone1689636202079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "patients",
            new TableColumn({
                name: "phone",
                type: "integer"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("patients", "phone")
    }

}
