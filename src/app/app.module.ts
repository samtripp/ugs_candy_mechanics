import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectFileComponent } from './components/select-file/select-file.component';
import { LoadChocolateComponent } from './components/load-chocolate/load-chocolate.component';
import { ChocolatePrintingComponent } from './components/chocolate-printing/chocolate-printing.component';
import { ChocolateFinishedComponent } from './components/chocolate-finished/chocolate-finished.component';
import { StaffComponent } from './components/staff/staff.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectFileComponent,
    LoadChocolateComponent,
    ChocolatePrintingComponent,
    ChocolateFinishedComponent,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
