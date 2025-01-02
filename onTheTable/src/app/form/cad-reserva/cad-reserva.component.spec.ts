import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadReservaComponent } from './cad-reserva.component';

describe('CadReservaComponent', () => {
  let component: CadReservaComponent;
  let fixture: ComponentFixture<CadReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
