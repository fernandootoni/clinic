import { NextFunction, Request, Response } from "express"
import { AppError } from "../../config/errors/AppError"

interface Schema {
  [key: string]: {
    required: boolean
    type: string
    defaultValue?: string | number | boolean,
    enum?: string[]
  }
}

const schema: Schema = {
  name: {
    required: true,
    type: "string"
  },
  responsible: {
    required: true,
    type: "string"
  },
  phone: {
    required: true,
    type: "string"
  }
}

class PatientValidator {
  basicFields() {
    const validation = (request: Request, response: Response, next: NextFunction) => {
      const { patient } = request.body
      const errors: string[] = []
      const patientVerified: any = {}

      Object.keys(schema).forEach(attribute => {
        const itemSchema = schema[attribute]
        let patientAttribute = patient[attribute]

        if(itemSchema.required && !patientAttribute) {
          errors.push(`Field ${attribute} - Is required`)
          return
        }

        if(typeof patientAttribute != itemSchema.type && itemSchema.required){
          errors.push(`Field ${attribute} must be of type ${itemSchema.type}`)
          return
        }

        patientAttribute = patientAttribute || itemSchema.defaultValue

        patientVerified[attribute] = patientAttribute
      })

      if(errors.length != 0) {
        throw new AppError(`${errors.join(', ')}`)
      }

      request.body.patient = patientVerified

      return next()
    }

    return validation
  }
}

export { PatientValidator }