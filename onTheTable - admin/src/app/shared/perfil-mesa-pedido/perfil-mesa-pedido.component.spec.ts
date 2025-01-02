import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMesaPedidoComponent } from './perfil-mesa-pedido.component';

describe('PerfilMesaPedidoComponent', () => {
  let component: PerfilMesaPedidoComponent;
  let fixture: ComponentFixture<PerfilMesaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilMesaPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMesaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
