import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadCategoriaComponent } from './forms-cad-categoria.component';

describe('FormsCadCategoriaComponent', () => {
  let component: FormsCadCategoriaComponent;
  let fixture: ComponentFixture<FormsCadCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
