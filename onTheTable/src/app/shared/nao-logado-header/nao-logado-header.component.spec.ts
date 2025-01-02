import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoLogadoHeaderComponent } from './nao-logado-header.component';

describe('NaoLogadoHeaderComponent', () => {
  let component: NaoLogadoHeaderComponent;
  let fixture: ComponentFixture<NaoLogadoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaoLogadoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaoLogadoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
