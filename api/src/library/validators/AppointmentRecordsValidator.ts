import { NextFunction, Request, Response } from "express";
import { AppError } from "../../config/errors/AppError";

interface Schema {
  [key: string]: {
    required?: string;
    type?: string;
    enum?: string[];
  };
}

enum MonthsEnum {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12
}

const schema: Schema = {
  user_id: {
    required: "User id must be provided"
  },
  month: {
    type: "string",
    required: "Month must be provided",
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }
}

class Validator {
  getMonthRecord() {
    const validation = (request: Request, response: Response, next: NextFunction) => {
      let { params } = request
      const errors: string[] = []
  
      Object.keys(schema).forEach(item => {
        const itemSchema = schema[item]
        
        if(itemSchema.required && !params[item]) {
          errors.push(`Field ${item} - ${itemSchema.required}`)
        }
      })
  
      const monthName = params["month"]
      if(!schema["month"].enum?.includes(monthName))
        errors.push(`Month ${monthName} is not a valid`)
    
      if(errors.length > 0)
        throw new AppError(`${errors.join(',')}`)
  
      const monthNumber = MonthsEnum[monthName as keyof typeof MonthsEnum]
      
      request.body.month = monthNumber
      request.body.year = parseInt(request.params.year)
  
      return next()
    }
  
    return validation
  }
}



export { Validator }