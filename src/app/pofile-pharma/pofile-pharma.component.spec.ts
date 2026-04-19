import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PofilePharmaComponent } from './pofile-pharma.component';

describe('PofilePharmaComponent', () => {
  let component: PofilePharmaComponent;
  let fixture: ComponentFixture<PofilePharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PofilePharmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PofilePharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
