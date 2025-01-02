import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadCepComponent } from './forms-cad-cep.component';

describe('FormsCadCepComponent', () => {
  let component: FormsCadCepComponent;
  let fixture: ComponentFixture<FormsCadCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadCepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
