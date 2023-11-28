import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyScheduleComponent } from './weekly-schedule.component';

describe('WeeklyScheduleComponent', () => {
  let component: WeeklyScheduleComponent;
  let fixture: ComponentFixture<WeeklyScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyScheduleComponent]
    });
    fixture = TestBed.createComponent(WeeklyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
