import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileAddnewhoneyPicsComponent } from './my-profile-addnewhoney-pics.component';

describe('MyProfileAddnewhoneyPicsComponent', () => {
  let component: MyProfileAddnewhoneyPicsComponent;
  let fixture: ComponentFixture<MyProfileAddnewhoneyPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileAddnewhoneyPicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileAddnewhoneyPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
