import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddEnable1690832687703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "enable",
                type: "boolean",
                default: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
