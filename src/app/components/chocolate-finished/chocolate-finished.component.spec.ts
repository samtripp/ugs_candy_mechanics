import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolateFinishedComponent } from './chocolate-finished.component';

describe('ChocolateFinishedComponent', () => {
  let component: ChocolateFinishedComponent;
  let fixture: ComponentFixture<ChocolateFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChocolateFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChocolateFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
