import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RecreatAppointmentRecord1690973708707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointment_records",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
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
                        name: "appointment_date",
                        type: "timestamp"
                    },
                    {
                        name: "done",
                        type: "boolean"
                    },
                    {
                        name: "appointment_id",
                        type: "uuid"
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
                        name: "duration",
                        type: "int"
                    },
                    {
                        name: "done_description",
                        type: "varchar",
                        default: null
                    },
                    {
                        name: "done_date",
                        type: "timestamp"
                    },
                    {
                        name: "verified",
                        type: "boolean",
                        default: false,
                        isNullable: true
                    },
                    {
                        name: "verified_by",
                        type: "varchar",
                        default: null,
                        isNullable: true
                    },
                    {
                        name: "verified_date",
                        type: "timestamp",
                        default: null,
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKAppointment",
                        referencedTableName: "appointments",
                        referencedColumnNames: ["id"],
                        columnNames: ["appointment_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
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
    }
}
