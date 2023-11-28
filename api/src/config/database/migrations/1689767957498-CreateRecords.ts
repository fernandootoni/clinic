import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRecords1689767957498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "records",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
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
                        name: "date",
                        type: "varchar"
                    },
                    {
                        name: "duration",
                        type: "int"
                    },
                    {
                        name: "done",
                        type: "boolean"
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
        await queryRunner.dropTable("records")
    }

}
