import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTableComponent } from './done-table.component';

describe('DoneTableComponent', () => {
  let component: DoneTableComponent;
  let fixture: ComponentFixture<DoneTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoneTableComponent]
    });
    fixture = TestBed.createComponent(DoneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
