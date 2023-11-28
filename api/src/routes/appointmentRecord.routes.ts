import { Router } from "express";

import { AppointmentRecordController } from "../endpoints/appointmentRecord/AppointmentRecordController";
import { Validator } from "../library/validators/AppointmentRecordsValidator";
import { ensureAuthenticate } from "../middlewares/EnsureAuthenticate";
import { admin } from "../middlewares/AccessLevel";

const appointmentRecordRoutes = Router()
const appointmentRecordController = new AppointmentRecordController()
const validator = new Validator()

appointmentRecordRoutes.get('/unverified', admin, appointmentRecordController.listUnverified)
appointmentRecordRoutes.get('/unverified/:id', ensureAuthenticate, appointmentRecordController.listUnverifiedByUser)
appointmentRecordRoutes.get('/:record_id', ensureAuthenticate, appointmentRecordController.listOne)
appointmentRecordRoutes.get('/:user_id/:month/:year', ensureAuthenticate, validator.getMonthRecord(), appointmentRecordController.getMonthRecord)
appointmentRecordRoutes.post('/verify/:record_id', admin, appointmentRecordController.verify)
appointmentRecordRoutes.post('/:appointment_id', ensureAuthenticate, appointmentRecordController.create)
appointmentRecordRoutes.put('/:record_id', admin, appointmentRecordController.update)

export { appointmentRecordRoutes }