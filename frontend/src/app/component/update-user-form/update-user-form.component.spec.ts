import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserFormComponent } from './update-user-form.component';

describe('UpdateUserFormComponent', () => {
  let component: UpdateUserFormComponent;
  let fixture: ComponentFixture<UpdateUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUserFormComponent]
    });
    fixture = TestBed.createComponent(UpdateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
