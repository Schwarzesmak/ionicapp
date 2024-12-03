import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerAsistenciaProfesorPage } from './ver-asistencia-profesor.page';

describe('VerAsistenciaProfesorPage', () => {
  let component: VerAsistenciaProfesorPage;
  let fixture: ComponentFixture<VerAsistenciaProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAsistenciaProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
