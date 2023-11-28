import { TestBed } from '@angular/core/testing';

import { AppointmentRecordService } from './appointment-record.service';

describe('AppointmentRecordService', () => {
  let service: AppointmentRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
