import { AppointmentRecord } from "../entities/AppointmentRecord"

class Income {
  asPsychologist(records: AppointmentRecord[], wage: number) {
    let minutesWorked = 0

    records.map(record => { 
      minutesWorked += record.duration! 
    })

    const hours = minutesWorked / 60

    const income = (hours * wage)

    return income
  }

  asSupervisor(records: AppointmentRecord[], wage: number) {
    let minutesWorked = 0

    records.map(record => { 
      minutesWorked += record.duration! 
    })

    const hours = minutesWorked / 60

    const income = (hours * wage)

    return income
  }
}

export { Income }