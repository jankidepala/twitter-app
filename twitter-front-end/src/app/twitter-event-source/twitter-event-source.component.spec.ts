import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterEventSourceComponent } from './twitter-event-source.component';

describe('TwitterEventSourceComponent', () => {
  let component: TwitterEventSourceComponent;
  let fixture: ComponentFixture<TwitterEventSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterEventSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterEventSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
