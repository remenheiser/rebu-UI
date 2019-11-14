import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpotsComponent } from './user-spots.component';

describe('UserSpotsComponent', () => {
  let component: UserSpotsComponent;
  let fixture: ComponentFixture<UserSpotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSpotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
