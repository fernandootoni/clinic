interface UpdateAppointmentRecordDTO {
  record_id?: string
  psychologist_id?: string
  supervisor_id?: string
  appointment_date?: string
  duration?: number
  done?: boolean
  psychologist_done?: boolean
  supervisor_done?: boolean
  done_description?: string
  done_date?: string
  verified?: boolean
  verified_by?: string
  verified_date?: string
}

export { UpdateAppointmentRecordDTO }