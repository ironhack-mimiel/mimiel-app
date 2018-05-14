import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewhivePicsComponent } from './addnewhive-pics.component';

describe('AddnewhivePicsComponent', () => {
  let component: AddnewhivePicsComponent;
  let fixture: ComponentFixture<AddnewhivePicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewhivePicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewhivePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
