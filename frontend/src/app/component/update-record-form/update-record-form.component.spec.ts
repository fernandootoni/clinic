import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecordFormComponent } from './update-record-form.component';

describe('UpdateRecordFormComponent', () => {
  let component: UpdateRecordFormComponent;
  let fixture: ComponentFixture<UpdateRecordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRecordFormComponent]
    });
    fixture = TestBed.createComponent(UpdateRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
