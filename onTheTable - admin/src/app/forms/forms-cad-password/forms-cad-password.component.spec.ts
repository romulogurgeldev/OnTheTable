import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadPasswordComponent } from './forms-cad-password.component';

describe('FormsCadPasswordComponent', () => {
  let component: FormsCadPasswordComponent;
  let fixture: ComponentFixture<FormsCadPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
