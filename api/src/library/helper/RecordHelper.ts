import { AppError } from "../../config/errors/AppError"
import { User } from "../entities/User"

export class RecordHelper {
  defineDone(doneDescription?: string): boolean {
    if(doneDescription === 'Ok' ) 
      return true

    else if(doneDescription === 'Patient canceled') 
      return true

    if(doneDescription === 'Psychologist canceled') 
      return false

    else 
      throw new AppError("Invalid description")
  }

  defineRole(user: User, psychologistId: string, supervisorId: string): string {
    const { id, access_level } = user
    if(access_level! > 1) {
      return 'admin'
    } else {
      if(id === psychologistId) {
        return 'psychologist'
      } else if(id === supervisorId) {
        return 'supervisor'
      } else {
        throw new AppError("You cannot access here")
      }
    }
  }

  defineDescription(description: string): string {
    if(!description || description === 'Ok') {
      return 'Ok'
    } else 
    if(description === 'Patient canceled') {
      return 'Patient canceled'
    } else 
    if(description === 'Psychologist canceled') {
      return 'Psychologist canceled'
    } else {
      throw new AppError('Invalid done description')
    }
  }
}