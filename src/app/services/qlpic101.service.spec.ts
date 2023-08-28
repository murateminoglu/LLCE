import { TestBed } from '@angular/core/testing';

import { Qlpic101Service } from './qlpic101.service';

describe('Qlpic101Service', () => {
  let service: Qlpic101Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Qlpic101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
