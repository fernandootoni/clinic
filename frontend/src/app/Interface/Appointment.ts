export interface Appointment {
  id: string,
  patient_id: string,
  psychologist_id: string,
  supervisor_id: string,
  patient_name: string
  psychologist_name: string
  supervisor_name: string,
  day: string
  hour: number
  minute: number,
  duration: 80
  repeats: boolean,
  enable: boolean
  created_at: Date
}