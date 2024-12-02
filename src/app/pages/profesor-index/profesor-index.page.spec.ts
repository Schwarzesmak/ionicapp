import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorIndexPage } from './profesor-index.page';

describe('ProfesorIndexPage', () => {
  let component: ProfesorIndexPage;
  let fixture: ComponentFixture<ProfesorIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
