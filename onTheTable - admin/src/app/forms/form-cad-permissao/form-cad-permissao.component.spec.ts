import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadPermissaoComponent } from './form-cad-permissao.component';

describe('FormCadPermissaoComponent', () => {
  let component: FormCadPermissaoComponent;
  let fixture: ComponentFixture<FormCadPermissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCadPermissaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadPermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
