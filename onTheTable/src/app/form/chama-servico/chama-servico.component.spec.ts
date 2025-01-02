import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamaServicoComponent } from './chama-servico.component';

describe('ChamaServicoComponent', () => {
  let component: ChamaServicoComponent;
  let fixture: ComponentFixture<ChamaServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamaServicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamaServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
