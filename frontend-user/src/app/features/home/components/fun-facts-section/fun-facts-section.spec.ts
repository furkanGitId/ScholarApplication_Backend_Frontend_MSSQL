import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunFactsSection } from './fun-facts-section';

describe('FunFactsSection', () => {
  let component: FunFactsSection;
  let fixture: ComponentFixture<FunFactsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunFactsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunFactsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
