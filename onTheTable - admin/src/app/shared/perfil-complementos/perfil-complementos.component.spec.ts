import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComplementosComponent } from './perfil-complementos.component';

describe('PerfilComplementosComponent', () => {
  let component: PerfilComplementosComponent;
  let fixture: ComponentFixture<PerfilComplementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComplementosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
