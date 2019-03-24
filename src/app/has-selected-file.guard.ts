import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WorkflowManager } from './workflow-manager';

@Injectable({
  providedIn: 'root'
})
export class HasSelectedFileGuard implements CanActivate {

  constructor(private workflowManager:WorkflowManager, private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.workflowManager.getFile() == null || this.workflowManager.getFile() == '') {
      this.router.navigate(['select-file']);
      return false;
    }

    return true;
  }
}
