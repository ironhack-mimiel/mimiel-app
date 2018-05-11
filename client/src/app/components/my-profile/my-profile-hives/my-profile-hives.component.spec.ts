import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileHivesComponent } from './my-profile-hives.component';

describe('MyProfileHivesComponent', () => {
  let component: MyProfileHivesComponent;
  let fixture: ComponentFixture<MyProfileHivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileHivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileHivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
