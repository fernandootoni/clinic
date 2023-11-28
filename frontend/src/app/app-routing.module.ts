import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ReportComponent } from './pages/report/report.component';
import { AllUsersComponent } from './pages/user/all-users/all-users.component';
import { PatientDashboardComponent } from './pages/patient/patient-dashboard/patient-dashboard.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { PerfilComponent } from './pages/user/perfil/perfil.component';
import { CreateComponent } from './pages/user/create/create.component';
import { CreatePatientComponent } from './pages/patient/create-patient/create-patient.component';
import { AppointmentCreateComponent } from './pages/appointment-create/appointment-create.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { RecordDetailsComponent } from './pages/record-details/record-details.component';
import { UpdateRecordComponent } from './pages/update-record/update-record.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'allusers', component: AllUsersComponent },
  { path: 'dashboard/:id', component: UserDashboardComponent },
  { path: 'patient/dashboard/:id', component: PatientDashboardComponent },
  { path: 'report/:id', component: ReportComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'user/create', component: CreateComponent },
  { path: 'user/update/:id', component: UserUpdateComponent },
  { path: 'user/:id', component: PerfilComponent },
  { path: 'patient/create', component: CreatePatientComponent },
  { path: 'appointment/create', component: AppointmentCreateComponent },
  { path: 'record/details/:id', component: RecordDetailsComponent },
  { path: 'record/update/:id', component: UpdateRecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
