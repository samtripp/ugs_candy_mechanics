import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { MachineService } from './machine.service';

describe('MachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: MachineService = TestBed.get(MachineService);
    expect(service).toBeTruthy();
  });
});
