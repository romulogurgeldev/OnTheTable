import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadPessoalComponent } from './forms-cad-pessoal.component';

describe('FormsCadPessoalComponent', () => {
  let component: FormsCadPessoalComponent;
  let fixture: ComponentFixture<FormsCadPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadPessoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
