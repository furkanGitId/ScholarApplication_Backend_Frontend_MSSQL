import { TestBed } from '@angular/core/testing';

import { AlertHelper } from './alert-helper';

describe('AlertHelper', () => {
  let service: AlertHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
