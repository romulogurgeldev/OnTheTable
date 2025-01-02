import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCadFoodComponent } from './forms-cad-food.component';

describe('FormsCadFoodComponent', () => {
  let component: FormsCadFoodComponent;
  let fixture: ComponentFixture<FormsCadFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsCadFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsCadFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
