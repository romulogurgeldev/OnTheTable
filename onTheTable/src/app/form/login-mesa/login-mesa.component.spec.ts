import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMesaComponent } from './login-mesa.component';

describe('LoginMesaComponent', () => {
  let component: LoginMesaComponent;
  let fixture: ComponentFixture<LoginMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
