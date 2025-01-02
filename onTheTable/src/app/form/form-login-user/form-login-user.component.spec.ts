import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoginUserComponent } from './form-login-user.component';

describe('FormLoginUserComponent', () => {
  let component: FormLoginUserComponent;
  let fixture: ComponentFixture<FormLoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoginUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
