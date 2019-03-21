import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPrintingComponent } from './start-printing.component';

describe('StartPrintingComponent', () => {
  let component: StartPrintingComponent;
  let fixture: ComponentFixture<StartPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
