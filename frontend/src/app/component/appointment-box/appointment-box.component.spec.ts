import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBoxComponent } from './appointment-box.component';

describe('AppointmentBoxComponent', () => {
  let component: AppointmentBoxComponent;
  let fixture: ComponentFixture<AppointmentBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentBoxComponent]
    });
    fixture = TestBed.createComponent(AppointmentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
