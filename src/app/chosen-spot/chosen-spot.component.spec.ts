import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenSpotComponent } from './chosen-spot.component';

describe('ChosenSpotComponent', () => {
  let component: ChosenSpotComponent;
  let fixture: ComponentFixture<ChosenSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
