import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertErroComponent } from './alert-erro.component';

describe('AlertErroComponent', () => {
  let component: AlertErroComponent;
  let fixture: ComponentFixture<AlertErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
