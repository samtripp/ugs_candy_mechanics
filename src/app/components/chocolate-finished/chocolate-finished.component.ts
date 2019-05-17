import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

import { FileUtils } from '../../file-utils';
import { WorkflowManagerService } from '../../services/workflow-manager.service';

@Component({
  selector: 'app-chocolate-finished',
  templateUrl: './chocolate-finished.component.html',
  styleUrls: ['./chocolate-finished.component.scss']
})
export class ChocolateFinishedComponent implements OnInit, OnDestroy {
  
  constructor(private router: Router, private workflowManager:WorkflowManagerService) { }

  

  ngOnInit() {

    let $this = this;

    let _video = document.getElementById('video');

    _video.onended = function() {
      $this.router.navigate(['/select-file']);
    }

  }

  ngOnDestroy() {
  }

  getName() : string {
    return this.workflowManager.getName();
  }
}
