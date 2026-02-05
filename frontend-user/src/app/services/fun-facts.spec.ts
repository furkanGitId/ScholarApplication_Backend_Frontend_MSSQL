import { TestBed } from '@angular/core/testing';

import { FunFactsService } from './fun-facts';

describe('FunFactsService', () => {
  let service: FunFactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunFactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
