import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChocolatePrintingComponent } from './chocolate-printing.component';

describe('ChocolatePrintingComponent', () => {
  let component: ChocolatePrintingComponent;
  let fixture: ComponentFixture<ChocolatePrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChocolatePrintingComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChocolatePrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
