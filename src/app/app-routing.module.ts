import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectFileComponent } from './components/select-file/select-file.component';
import { StaffComponent } from './components/staff/staff.component';
import { LoadChocolateComponent } from './components/load-chocolate/load-chocolate.component';
import { StartPrintingComponent } from './components/start-printing/start-printing.component';
import { ChocolatePrintingComponent } from './components/chocolate-printing/chocolate-printing.component';
import { ChocolateFinishedComponent } from './components/chocolate-finished/chocolate-finished.component';

const routes: Routes = [
  { path: '', redirectTo: '/select-file', pathMatch: 'full' },
  { path: 'select-file', component: SelectFileComponent },
  { path: 'load-chocolate/:file', component: LoadChocolateComponent },
  { path: 'start-printing/:file', component: StartPrintingComponent },
  { path: 'chocolate-printing/:file', component: ChocolatePrintingComponent },
  { path: 'chocolate-finished/:file', component: ChocolateFinishedComponent },
  { path: 'staff', component: StaffComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
