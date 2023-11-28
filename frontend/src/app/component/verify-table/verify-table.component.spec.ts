import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTableComponent } from './verify-table.component';

describe('VerifyTableComponent', () => {
  let component: VerifyTableComponent;
  let fixture: ComponentFixture<VerifyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyTableComponent]
    });
    fixture = TestBed.createComponent(VerifyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
