import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarAsignaturasPage } from './generar-asignaturas.page';

describe('GenerarAsignaturasPage', () => {
  let component: GenerarAsignaturasPage;
  let fixture: ComponentFixture<GenerarAsignaturasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarAsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
