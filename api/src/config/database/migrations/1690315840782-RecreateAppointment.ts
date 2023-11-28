import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RecreateAppointment1690315840782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "patient_id",
                        type: "uuid"
                    },
                    {
                        name: "psychologist_id",
                        type: "uuid"
                    },
                    {
                        name: "supervisor_id",
                        type: "uuid"
                    },
                    {
                        name: "patient_name",
                        type: "varchar"
                    },
                    {
                        name: "psychologist_name",
                        type: "varchar"
                    },
                    {
                        name: "supervisor_name",
                        type: "varchar"
                    },
                    {
                        name: "day",
                        type: "varchar"
                    },
                    {
                        name: "hour",
                        type: "int"
                    },
                    {
                        name: "minute",
                        type: "int"
                    },
                    {
                        name: "duration",
                        type: "int"
                    },
                    {
                        name: "done",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "repeats",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "enabled",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKPatient",
                        referencedTableName: "patients",
                        referencedColumnNames: ["id"],
                        columnNames: ["patient_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKPsychologist",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["psychologist_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKSupervisor",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["supervisor_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }

}
