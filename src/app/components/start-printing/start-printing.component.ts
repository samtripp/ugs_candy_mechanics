import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

import { WorkflowManagerService } from '../../services/workflow-manager.service';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-start-printing',
  templateUrl: './start-printing.component.html',
  styleUrls: ['./start-printing.component.scss']
})
export class StartPrintingComponent implements OnInit, OnDestroy {
  private routeSubscription:ISubscription;

  constructor(private router: Router, private workflowManager:WorkflowManagerService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getName() : string {
    return this.workflowManager.getName();
  }

  startPrinting() {
    this.router.navigate(['/chocolate-printing']);
  }
}
