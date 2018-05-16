import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBeekeeperComponent } from './home-beekeeper.component';

describe('HomeBeekeeperComponent', () => {
  let component: HomeBeekeeperComponent;
  let fixture: ComponentFixture<HomeBeekeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBeekeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBeekeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
