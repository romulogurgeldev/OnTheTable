import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadLoginComponent } from './forms-cad-login.component';

describe('FormsCadLoginComponent', () => {
  let component: FormsCadLoginComponent;
  let fixture: ComponentFixture<FormsCadLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
