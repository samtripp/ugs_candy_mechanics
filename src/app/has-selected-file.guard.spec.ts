import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { HasSelectedFileGuard } from './has-selected-file.guard';

describe('HasSelectedFileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasSelectedFileGuard],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    });
  });

  it('should ...', inject([HasSelectedFileGuard], (guard: HasSelectedFileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
