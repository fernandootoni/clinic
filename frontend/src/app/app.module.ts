import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserFormComponent } from './component/register-user-form/register-user-form.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ReportComponent } from './pages/report/report.component';
import { AllUsersComponent } from './pages/user/all-users/all-users.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { PatientDashboardComponent } from './pages/patient/patient-dashboard/patient-dashboard.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { DoneTableComponent } from './component/done-table/done-table.component';
import { PerfilComponent } from './pages/user/perfil/perfil.component';
import { CreateComponent } from './pages/user/create/create.component';
import { CreatePatientComponent } from './pages/patient/create-patient/create-patient.component';
import { RegisterPatientFormComponent } from './component/register-patient-form/register-patient-form.component';
import { WeeklyScheduleComponent } from './component/weekly-schedule/weekly-schedule.component';
import { AppointmentBoxComponent } from './component/appointment-box/appointment-box.component';
import { CreateRecordModule } from './component/create-record/create-record.module';
import { VerifyTableComponent } from './component/verify-table/verify-table.component';
import { AppointmentCreateComponent } from './pages/appointment-create/appointment-create.component';
import { RegisterAppointmentFormComponent } from './component/register-appointment-form/register-appointment-form.component';
import { UserUpdateComponent } from './pages/user/user-update/user-update.component';
import { UpdateUserFormComponent } from './component/update-user-form/update-user-form.component';
import { RecordDetailsComponent } from './pages/record-details/record-details.component';
import { UpdateRecordComponent } from './pages/update-record/update-record.component';
import { UpdateRecordFormComponent } from './component/update-record-form/update-record-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterUserFormComponent,
    LoginFormComponent,
    AllUsersComponent,
    UserDashboardComponent,
    ReportComponent,
    PatientDashboardComponent,
    VerifyComponent,
    DoneTableComponent,
    PerfilComponent,
    CreateComponent,
    CreatePatientComponent,
    RegisterPatientFormComponent,
    WeeklyScheduleComponent,
    AppointmentBoxComponent,
    VerifyTableComponent,
    AppointmentCreateComponent,
    RegisterAppointmentFormComponent,
    UserUpdateComponent,
    UpdateUserFormComponent,
    RecordDetailsComponent,
    UpdateRecordComponent,
    UpdateRecordFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CreateRecordModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
