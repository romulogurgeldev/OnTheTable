import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordCodeComponent } from './forget-password-code.component';

describe('ForgetPasswordCodeComponent', () => {
  let component: ForgetPasswordCodeComponent;
  let fixture: ComponentFixture<ForgetPasswordCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
