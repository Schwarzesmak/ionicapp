import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaQRPage } from './asistencia-qr.page';

describe('AsistenciaQRPage', () => {
  let component: AsistenciaQRPage;
  let fixture: ComponentFixture<AsistenciaQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
