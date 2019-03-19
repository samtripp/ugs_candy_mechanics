import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChocolateComponent } from './load-chocolate.component';

describe('LoadChocolateComponent', () => {
  let component: LoadChocolateComponent;
  let fixture: ComponentFixture<LoadChocolateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadChocolateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChocolateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
