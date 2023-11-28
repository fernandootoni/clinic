import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordTableComponent } from './create-record-table.component';

describe('CreateRecordTableComponent', () => {
  let component: CreateRecordTableComponent;
  let fixture: ComponentFixture<CreateRecordTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecordTableComponent]
    });
    fixture = TestBed.createComponent(CreateRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
