import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenVideosComponent } from './chosen-videos.component';

describe('ChosenVideosComponent', () => {
  let component: ChosenVideosComponent;
  let fixture: ComponentFixture<ChosenVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
