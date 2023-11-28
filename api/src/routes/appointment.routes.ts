import { Router } from "express";

import { AppointmentController } from "../endpoints/appointment/AppointmentController";
import { ensureAuthenticate } from "../middlewares/EnsureAuthenticate";
import { admin } from "../middlewares/AccessLevel";
import { AppointmentValidator } from "../library/validators/AppointmentValidator";

const appointmentRoutes = Router()
const appointmentController = new AppointmentController()
const validator = new AppointmentValidator()

appointmentRoutes.use(ensureAuthenticate)

appointmentRoutes.get('/enable', appointmentController.listEnable)
appointmentRoutes.get('/:id/user', appointmentController.listByUser)
appointmentRoutes.get('/:id/supervisor', appointmentController.listBySupervisor)
appointmentRoutes.get('/:id/psychologist', appointmentController.listByPsychologist)
appointmentRoutes.get('/:id/patient', appointmentController.listByPatient)
appointmentRoutes.get('/:id', appointmentController.listAppointment)
appointmentRoutes.get('/', appointmentController.listAll)
appointmentRoutes.patch('/:id/enable', admin, appointmentController.toggleEnable)
appointmentRoutes.post('/', admin, validator.basicFields(),  appointmentController.create)

export { appointmentRoutes }