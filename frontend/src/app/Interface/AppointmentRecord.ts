export interface AppointmentRecord {
  id: string,
  appointment_id: string,
  patient_id: string,
  psychologist_id: string,
  supervisor_id: string,
  patient_name: string,
  psychologist_name: string,
  supervisor_name: string,
  appointment_date: string,
  duration: number,
  done: boolean,
  psychologist_done: boolean,
  supervisor_done: boolean,
  done_description: string,
  done_date: string,
  verified: boolean,
  verified_by: string,
  verified_date: string,
  created_at: Date
  formatted_created_at?: string
  formatted?: boolean
  dayName?: string
}