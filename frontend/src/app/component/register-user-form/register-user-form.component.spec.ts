import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserFormComponent } from './register-user-form.component';

describe('RegisterUserFormComponent', () => {
  let component: RegisterUserFormComponent;
  let fixture: ComponentFixture<RegisterUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterUserFormComponent]
    });
    fixture = TestBed.createComponent(RegisterUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
