import { TestBed, async, inject } from '@angular/core/testing';

import { HasSelectedFileGuardGuard } from './has-selected-file.guard';

describe('HasSelectedFileGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasSelectedFileGuard]
    });
  });

  it('should ...', inject([HasSelectedFileGuard], (guard: HasSelectedFileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
