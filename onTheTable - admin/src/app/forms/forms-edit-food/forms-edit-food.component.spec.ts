import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditFoodComponent } from './forms-edit-food.component';

describe('FormsEditFoodComponent', () => {
  let component: FormsEditFoodComponent;
  let fixture: ComponentFixture<FormsEditFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
