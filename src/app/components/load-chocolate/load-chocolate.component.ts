import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { WorkflowManager } from '../../workflow-manager';

@Component({
  selector: 'app-load-chocolate',
  templateUrl: './load-chocolate.component.html',
  styleUrls: ['./load-chocolate.component.scss']
})
export class LoadChocolateComponent implements OnInit, OnDestroy {

  constructor(private workflowManager:WorkflowManager) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getName() : string {
    return this.workflowManager.getName();
  }
}
