import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarRestauranteComponent } from './cadastrar-restaurante.component';

describe('CadastrarRestauranteComponent', () => {
  let component: CadastrarRestauranteComponent;
  let fixture: ComponentFixture<CadastrarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
