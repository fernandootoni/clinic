export interface appointmentCreateDTO {
  psychologist_id: string
  supervisor_id: string
  patient_id: string
  hour: number
  minute: number
  duration: number
  day: string
}