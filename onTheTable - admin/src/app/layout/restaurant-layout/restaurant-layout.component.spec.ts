import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantLayoutComponent } from './restaurant-layout.component';

describe('RestaurantLayoutComponent', () => {
  let component: RestaurantLayoutComponent;
  let fixture: ComponentFixture<RestaurantLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
