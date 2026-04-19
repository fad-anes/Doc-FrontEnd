import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofileDoctorComponent } from './pofile-doctor.component';

describe('PofileDoctorComponent', () => {
  let component: PofileDoctorComponent;
  let fixture: ComponentFixture<PofileDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PofileDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PofileDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
