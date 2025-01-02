import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupomDescontoComponent } from './cupom-desconto.component';

describe('CupomDescontoComponent', () => {
  let component: CupomDescontoComponent;
  let fixture: ComponentFixture<CupomDescontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupomDescontoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupomDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
