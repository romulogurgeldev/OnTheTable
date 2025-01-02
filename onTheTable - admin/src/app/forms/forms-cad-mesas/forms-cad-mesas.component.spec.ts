import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadMesasComponent } from './forms-cad-mesas.component';

describe('FormsCadMesasComponent', () => {
  let component: FormsCadMesasComponent;
  let fixture: ComponentFixture<FormsCadMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadMesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
