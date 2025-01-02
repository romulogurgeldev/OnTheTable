import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadComplementoComponent } from './forms-cad-complemento.component';

describe('FormsCadComplementoComponent', () => {
  let component: FormsCadComplementoComponent;
  let fixture: ComponentFixture<FormsCadComplementoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadComplementoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadComplementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
