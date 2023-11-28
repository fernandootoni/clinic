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
  name: {
    required: true,
    type: "string"
  },
  email: {
    required: true,
    type: "string"
  },
  password: {
    required: true,
    type: "string"
  },
  hourlywage: {
    required: false,
    type: "number",
    defaultValue: 0
  },
  supervisorhourlywage: {
    required: false,
    type: "number",
    defaultValue: 0
  }
}

class UserValidator {
  basicFields() {
    const validation = (request: Request, response: Response, next: NextFunction) => {
      const { user } = request.body
      const errors: string[] = []
      const userDataVerified: any = {}

      Object.keys(schema).forEach(attribute => {
        const itemSchema = schema[attribute]
        let userAttribute = user[attribute]

        if(itemSchema.required && !userAttribute) {
          errors.push(`Field ${attribute} - Is required`)
          return
        }

        if(typeof userAttribute != itemSchema.type && itemSchema.required){
          errors.push(`Field ${attribute} must be of type ${itemSchema.type}`)
          return
        }

        userAttribute = userAttribute || itemSchema.defaultValue

        userDataVerified[attribute] = userAttribute
      })

      if(errors.length != 0) {
        throw new AppError(`${errors.join(', ')}`)
      }

      request.body.user = userDataVerified

      return next()
    }

    return validation
  }
}

export { UserValidator }