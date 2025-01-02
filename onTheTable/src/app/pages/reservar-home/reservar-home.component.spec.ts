import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarHomeComponent } from './reservar-home.component';

describe('ReservarHomeComponent', () => {
  let component: ReservarHomeComponent;
  let fixture: ComponentFixture<ReservarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservarHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
