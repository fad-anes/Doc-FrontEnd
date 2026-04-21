import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalTestsComponent } from './doctor-medical-tests.component';

describe('DoctorMedicalTestsComponent', () => {
  let component: DoctorMedicalTestsComponent;
  let fixture: ComponentFixture<DoctorMedicalTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMedicalTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
