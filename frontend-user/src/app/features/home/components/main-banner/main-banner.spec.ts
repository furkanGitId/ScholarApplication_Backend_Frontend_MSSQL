import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBanner } from './main-banner';

describe('MainBanner', () => {
  let component: MainBanner;
  let fixture: ComponentFixture<MainBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
