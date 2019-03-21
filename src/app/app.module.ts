import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnectComponent } from './components/connect/connect.component';
import { SelectFileComponent } from './components/select-file/select-file.component';
import { LoadChocolateComponent } from './components/load-chocolate/load-chocolate.component';
import { ChocolatePrintingComponent } from './components/chocolate-printing/chocolate-printing.component';
import { ChocolateFinishedComponent } from './components/chocolate-finished/chocolate-finished.component';
import { StaffComponent } from './components/staff/staff.component';
import { StartPrintingComponent } from './components/start-printing/start-printing.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectFileComponent,
    LoadChocolateComponent,
    ChocolatePrintingComponent,
    ChocolateFinishedComponent,
    StaffComponent,
    ConnectComponent,
    StartPrintingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
