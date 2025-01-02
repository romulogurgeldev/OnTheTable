import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadRestauranteComponent } from './forms-cad-restaurante.component';

describe('FormsCadRestauranteComponent', () => {
  let component: FormsCadRestauranteComponent;
  let fixture: ComponentFixture<FormsCadRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
