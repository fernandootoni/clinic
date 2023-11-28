export interface CreateAppointmentDTO {
  patient_id?: string
  psychologist_id?: string
  supervisor_id?: string
  done?: boolean
  done_description?: string
  duration?: number
}