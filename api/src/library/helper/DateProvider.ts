import { AppError } from "../../config/errors/AppError";
import { Appointment } from "../entities/Appointment";

export class DateProvider {
  formatToTimeZone(date: Date): Date {
    const dateReceived = date.toISOString()

    const [ actualDate, time ] = dateReceived.split("T")
    var [ hour, minutes, seconds ] = time.split(":")

    const adjustedHour = (parseInt(hour) - 3 + 24) % 24;
    hour = adjustedHour.toString().padStart(2, "0");
    
    return new Date(`${actualDate}T${hour}:${minutes}:${seconds}`)
  }

  getCurrentWeekOfMonth(date: any) {
    const firstDayOfMonth:any = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek:any = 0; // Segunda-feira (0 - Domingo, 1 - Segunda, ..., 6 - Sábado)

    const daysDiff = Math.floor((date - firstDayOfMonth) / (24 * 60 * 60 * 1000));

    const fullWeeks = Math.floor((daysDiff + firstDayOfMonth.getDay() - firstDayOfWeek) / 7);

    const currentWeek = fullWeeks;

    return currentWeek;
  }

  SelectedDayOfCurrentWeek(date: Date, day: string) {
    let selectedDay = this.getDayNumber(day)

    let currentWeek = this.getCurrentWeekOfMonth(date)
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = 0;

    const daysUntilFirstDayOfWeek = (firstDayOfWeek - firstDayOfMonth.getDay() + 7) % 7

    if(firstDayOfMonth.getDay() === firstDayOfWeek) {
      currentWeek += 1
    }

    const startDate = new Date(firstDayOfMonth)
    const diaCorreto = 1 + daysUntilFirstDayOfWeek + (currentWeek - 1) * 7 + selectedDay
    
    startDate.setDate(diaCorreto)

    return startDate;
  }

  getDayNumber(day: string): any {
    const dayMap: { [key: string]: number} = {
      'Domingo': 0,
      'Segunda': 1,
      'Terca': 2,
      'Quarta': 3,
      'Quinta': 4,
      'Sexta': 5,
      'Sabado': 6,
    };
  
    return dayMap[day] || 0; // Se o dia não for encontrado, retorna 0 (domingo) por padrão
  }

  time(date: Date): string {
    const hour = date.getHours() -3
    const minutes = date.getMinutes()

    return `${hour}:${minutes}`
  }

  validateTimestamp(date: string) {
    const newDate = new Date(date)
    const minYearPossible = new Date().getFullYear() - 1
    const maxYearPossible = new Date().getFullYear() + 1

    if(isNaN(newDate.getDay()))
      throw new AppError("Invalid data")

    if(newDate.getFullYear() < minYearPossible || newDate.getFullYear() > maxYearPossible)
      throw new AppError(`Year ${newDate.getFullYear()} is out of range, please insert a year between ${minYearPossible} and ${maxYearPossible}`)

    return newDate
  }

  verifyDisponibility(allAppointments: Appointment[], appointmentToBeCreated: Appointment): boolean {
    const { hour, minute, duration } = appointmentToBeCreated
    if(!hour || minute === undefined || !duration) {
      throw new AppError("Something went wrong while verifying disponibility")
    }
    const newAppointmenStartMoment = hour * 60 + minute
    const newAppointmentEndMoment = newAppointmenStartMoment + duration

    let appointmentCannotBeCreated = false

    for(const appointment of allAppointments) {
      const appointmentStartMoment = appointment.hour! * 60 + appointment.minute!
      const appointmentEndMoment = appointment.hour! * 60 + appointment.minute! + appointment.duration!

      if(
        (newAppointmenStartMoment >= appointmentStartMoment && newAppointmenStartMoment < appointmentEndMoment) ||
        (newAppointmentEndMoment > appointmentStartMoment && newAppointmentEndMoment <= appointmentEndMoment)
      ) {
        appointmentCannotBeCreated = true
        break
      }
    }
    
    if(appointmentCannotBeCreated) 
      return false
        else return true
  }
}