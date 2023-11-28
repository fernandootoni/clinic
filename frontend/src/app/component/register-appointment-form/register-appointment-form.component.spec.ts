import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAppointmentFormComponent } from './register-appointment-form.component';

describe('RegisterAppointmentFormComponent', () => {
  let component: RegisterAppointmentFormComponent;
  let fixture: ComponentFixture<RegisterAppointmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAppointmentFormComponent]
    });
    fixture = TestBed.createComponent(RegisterAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
