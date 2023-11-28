import { AppointmentRecord } from "./AppointmentRecord";

export interface RecordsUnverified {
  appointmentsUnverifiedAsPsy: AppointmentRecord[]
  appointmentsUnverifiedAsSup: AppointmentRecord[]
}