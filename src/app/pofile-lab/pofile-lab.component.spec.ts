import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofileLabComponent } from './pofile-lab.component';

describe('PofileLabComponent', () => {
  let component: PofileLabComponent;
  let fixture: ComponentFixture<PofileLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PofileLabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PofileLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
