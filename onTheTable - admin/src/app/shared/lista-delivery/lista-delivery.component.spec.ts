import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeliveryComponent } from './lista-delivery.component';

describe('ListaDeliveryComponent', () => {
  let component: ListaDeliveryComponent;
  let fixture: ComponentFixture<ListaDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
