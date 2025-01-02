import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditLoginComponent } from './forms-edit-login.component';

describe('FormsEditLoginComponent', () => {
  let component: FormsEditLoginComponent;
  let fixture: ComponentFixture<FormsEditLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
