import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadNomeComponent } from './cad-nome.component';

describe('CadNomeComponent', () => {
  let component: CadNomeComponent;
  let fixture: ComponentFixture<CadNomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadNomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
