import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbreProdutoComponent } from './abre-produto.component';

describe('AbreProdutoComponent', () => {
  let component: AbreProdutoComponent;
  let fixture: ComponentFixture<AbreProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbreProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbreProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
