import { AppointmentRecord } from "./AppointmentRecord"

export interface MonthRecord {
  psyRecords: AppointmentRecord[]
  supRecords: AppointmentRecord[]
  salaryAsPsy: number
  salaryAsSup: number
  totalSalary: number
}