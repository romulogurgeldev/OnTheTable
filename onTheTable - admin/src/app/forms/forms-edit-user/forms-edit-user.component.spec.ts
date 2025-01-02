import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEditUserComponent } from './forms-edit-user.component';

describe('FormsEditUserComponent', () => {
  let component: FormsEditUserComponent;
  let fixture: ComponentFixture<FormsEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsEditUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
