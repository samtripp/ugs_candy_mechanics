import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectFileComponent } from './components/select-file/select-file.component';
import { StaffComponent } from './components/staff/staff.component';
import { LoadChocolateComponent } from './components/load-chocolate/load-chocolate.component';
import { StartPrintingComponent } from './components/start-printing/start-printing.component';
import { ChocolatePrintingComponent } from './components/chocolate-printing/chocolate-printing.component';
import { ChocolateFinishedComponent } from './components/chocolate-finished/chocolate-finished.component';
import { HasSelectedFileGuard } from './has-selected-file.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/select-file',
    pathMatch: 'full'
  },
  {
    path: 'select-file',
    component: SelectFileComponent
  },
  {
    path: 'load-chocolate',
    component: LoadChocolateComponent,
    canActivate: [HasSelectedFileGuard]
  },
  {
    path: 'start-printing',
    component: StartPrintingComponent,
    canActivate: [HasSelectedFileGuard]
  },
  {
    path: 'chocolate-printing',
    component: ChocolatePrintingComponent,
    canActivate: [HasSelectedFileGuard]
  },
  {
    path: 'chocolate-finished',
    component: ChocolateFinishedComponent,
    canActivate: [HasSelectedFileGuard]
  },
  {
    path: 'staff',
    component: StaffComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
