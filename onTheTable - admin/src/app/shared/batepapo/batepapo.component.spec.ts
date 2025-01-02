import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatepapoComponent } from './batepapo.component';

describe('BatepapoComponent', () => {
  let component: BatepapoComponent;
  let fixture: ComponentFixture<BatepapoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatepapoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatepapoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
