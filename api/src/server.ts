import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import { AppError } from './config/errors/AppError';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import swaggerFile from './swagger.json'

import createdConnection from "./config/database"
import "./config/shared/container"

createdConnection().then(() => console.log("Database Connected"))

const app = express();
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:4200'}))

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error - ${err.message}`
    })
  }
)

app.listen(9999, () => {
  console.log("Server is running")
});