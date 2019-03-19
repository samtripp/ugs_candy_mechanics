import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectFileComponent } from './components/select-file/select-file.component';
import { StaffComponent } from './components/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: '/select-file', pathMatch: 'full' },
  { path: 'select-file', component: SelectFileComponent },
  { path: 'staff', component: StaffComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
