import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogadoHeaderComponent } from './logado-header.component';

describe('LogadoHeaderComponent', () => {
  let component: LogadoHeaderComponent;
  let fixture: ComponentFixture<LogadoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogadoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogadoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
