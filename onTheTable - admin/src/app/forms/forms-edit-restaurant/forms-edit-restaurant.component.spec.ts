import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditRestaurantComponent } from './forms-edit-restaurant.component';

describe('FormsEditRestaurantComponent', () => {
  let component: FormsEditRestaurantComponent;
  let fixture: ComponentFixture<FormsEditRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
