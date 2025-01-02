import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPromocaoComponent } from './cad-promocao.component';

describe('CadPromocaoComponent', () => {
  let component: CadPromocaoComponent;
  let fixture: ComponentFixture<CadPromocaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadPromocaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadPromocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
