import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordContainerComponent } from './create-record-container.component';

describe('CreateRecordContainerComponent', () => {
  let component: CreateRecordContainerComponent;
  let fixture: ComponentFixture<CreateRecordContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecordContainerComponent]
    });
    fixture = TestBed.createComponent(CreateRecordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
