import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { WorkflowManagerService } from '../../services/workflow-manager.service';

@Component({
  selector: 'app-load-chocolate',
  templateUrl: './load-chocolate.component.html',
  styleUrls: ['./load-chocolate.component.scss']
})
export class LoadChocolateComponent implements OnInit, OnDestroy {

  constructor(private workflowManager:WorkflowManagerService) { }

  ngOnInit() {

    let _video = document.getElementById('video');

    let _step3 = document.getElementById('step-3');
    let _step4 = document.getElementById('step-4');

    _video.onended = function() {
      _step3.classList.remove("show");
      _step4.classList.add("show");
    }

    _video.addEventListener('click', function(e) {
      e.preventDefault();
      _step3.classList.remove("show");
      _step4.classList.add("show");
    });

  }

  ngOnDestroy() {
  }

  getName() : string {
    return this.workflowManager.getName();
  }
}
