import { Router } from "express";
import { PatientController } from "../endpoints/patient/PatientController";
import { admin } from "../middlewares/AccessLevel";
import { PatientValidator } from "../library/validators/PatientValidator";

const patientRoutes = Router()
const patientController = new PatientController()
const validator = new PatientValidator()

patientRoutes.post(
  '/', 
  validator.basicFields(),
  admin, 
  patientController.create
)
patientRoutes.get('/enabled', patientController.getEnabled)
patientRoutes.get('/:id', patientController.listPatient)
patientRoutes.patch('/:id', admin, patientController.toggleEnabled)
patientRoutes.get('/', patientController.list)

export { patientRoutes }