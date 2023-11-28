interface IAppointmentDTO {
  id?: string
  patient_id?: string 
  psychologist_id?: string
  supervisor_id?: string
  patient_name?: string
  psychologist_name?: string
  supervisor_name?: string
  day?: string
  hour?: number
  minute?: number
  duration?: number
  repeats?: boolean
}

export { IAppointmentDTO }