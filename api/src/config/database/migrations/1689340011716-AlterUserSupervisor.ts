import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserSupervisor1689340011716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "supervisorhourlywage",
                type: "int"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "supervisorhourlywage")
    }

}
