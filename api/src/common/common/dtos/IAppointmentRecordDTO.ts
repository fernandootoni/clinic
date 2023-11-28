interface IAppointmentRecordDTO {
  userLoggedId?: string
  appointment_id?: string 
  patient_id?: string
  psychologist_id?: string
  supervisor_id?: string
  patient_name?: string
  psychologist_name?: string
  supervisor_name?: string
  appointment_date?: Date
  done?: boolean
  userRole?: string
  done_description?: string
  done_date?: Date
  duration?: number
}

export { IAppointmentRecordDTO }