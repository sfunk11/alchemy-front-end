import { TestBed } from '@angular/core/testing';

import { AuthResolveResolver } from './auth-resolve.resolver';

describe('AuthResolveResolver', () => {
  let resolver: AuthResolveResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthResolveResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
