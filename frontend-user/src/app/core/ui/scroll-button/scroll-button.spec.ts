import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollButton } from './scroll-button';

describe('ScrollButton', () => {
  let component: ScrollButton;
  let fixture: ComponentFixture<ScrollButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
