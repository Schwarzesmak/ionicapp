import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerAsignaturasPage } from './ver-asignaturas.page';

describe('VerAsignaturasPage', () => {
  let component: VerAsignaturasPage;
  let fixture: ComponentFixture<VerAsignaturasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
