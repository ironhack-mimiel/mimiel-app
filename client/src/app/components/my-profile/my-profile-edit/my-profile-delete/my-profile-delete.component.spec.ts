import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileDeleteComponent } from './my-profile-delete.component';

describe('MyProfileDeleteComponent', () => {
  let component: MyProfileDeleteComponent;
  let fixture: ComponentFixture<MyProfileDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
