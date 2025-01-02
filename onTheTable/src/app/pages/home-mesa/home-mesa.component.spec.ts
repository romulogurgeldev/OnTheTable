import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMesaComponent } from './home-mesa.component';

describe('HomeMesaComponent', () => {
  let component: HomeMesaComponent;
  let fixture: ComponentFixture<HomeMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
