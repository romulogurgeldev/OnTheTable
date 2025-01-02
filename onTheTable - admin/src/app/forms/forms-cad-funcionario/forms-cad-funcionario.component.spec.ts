import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadFuncionarioComponent } from './forms-cad-funcionario.component';

describe('FormsCadFuncionarioComponent', () => {
  let component: FormsCadFuncionarioComponent;
  let fixture: ComponentFixture<FormsCadFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
