import { Router } from 'express'

import { userRoutes } from './user.routes'
import { authRoutes } from './auth.routes'
import { patientRoutes } from './patient.routes'
import { appointmentRoutes } from './appointment.routes'
import { appointmentRecordRoutes } from './appointmentRecord.routes'

const router = Router()

router.use("/patient", patientRoutes)
router.use("/user", userRoutes)
router.use("/auth", authRoutes)
router.use("/appointment", appointmentRoutes)
router.use("/appointmentrecord", appointmentRecordRoutes)

export { router }