import { container } from 'tsyringe'
import "reflect-metadata";

import { IUsersRepository } from '../../../common/interface/repositories/IUsersRepository'
import { UsersRepository } from '../../../library/repositories/UsersRepository'
import { IPatientRepository } from '../../../common/interface/repositories/IPatientRepository';
import { PatientRepository } from '../../../library/repositories/PatientRepository';
import { IAppointmentRepository } from '../../../common/interface/repositories/IAppointmentRepository';
import { AppointmentRepository } from '../../../library/repositories/AppointmentRepository';
import { IAppointmentRecordRepository } from '../../../common/interface/repositories/IAppointmentRecordRepository';
import { AppointmentRecordRepository } from '../../../library/repositories/AppointmentRecordRepository';

container.registerSingleton<IUsersRepository>( 
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IPatientRepository>(
  "PatientRepository",
  PatientRepository
)

container.registerSingleton<IAppointmentRepository>(
  "AppointmentRepository",
  AppointmentRepository
)

container.registerSingleton<IAppointmentRecordRepository>(
  "AppointmentRecordRepository",
  AppointmentRecordRepository
)