import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserRemoveRoleAddAccess1690815119284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: "access_level",
                type: "integer",
                isNullable: true,
                default: 0
            })
        )

        await queryRunner.dropColumn("users", "role")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
