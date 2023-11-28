import { NextFunction, Request, Response, request } from "express";
import { AppError } from "../../config/errors/AppError";

interface Schema {
  [key: string]: {
    required: boolean
    type: string
    defaultValue?: string | number | boolean,
    enum?: string[]
  }
}

const schema: Schema = {
  patient_id: {
    required: true,
    type: "string"
  },
  psychologist_id: {
    required: true,
    type: "string"
  },
  supervisor_id: {
    required: true,
    type: "string"
  },
  day: {
    required: true,
    type: "string"
  },
  hour: {
    required: true,
    type: "number"
  },
  minute: {
    required: false,
    type: "number"
  },
  duration: {
    required: true,
    type: "number"
  },
  repeats: {
    required: false,
    type: "boolean",
    defaultValue: true
  }
}

class AppointmentValidator {
  basicFields() {
    const validation = (request: Request, response: Response, next: NextFunction) => {
      const { appointment } = request.body
      const errors: string[] = []
      const appointmentDataVerified: any = {}

      Object.keys(schema).forEach(attribute => {
        const itemSchema = schema[attribute]
        let appointmentAttribute = appointment[attribute]

        if(itemSchema.required && !appointmentAttribute) {
          errors.push(`Field ${attribute} - Is required`)
          return
        }

        if(typeof appointmentAttribute != itemSchema.type && itemSchema.required){
          errors.push(`Field ${attribute} must be of type ${itemSchema.type}`)
          return
        }

        appointmentAttribute = appointmentAttribute || itemSchema.defaultValue

        appointmentDataVerified[attribute] = appointmentAttribute
      })

      if(errors.length != 0) {
        throw new AppError(`${errors.join(', ')}`)
      }

      request.body.appointment = appointmentDataVerified

      return next()
    }

    return validation
  }
}

export { AppointmentValidator }