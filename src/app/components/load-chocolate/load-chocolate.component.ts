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

    let _btnNo = document.getElementById('btn-no');
    let _help = document.getElementById('help');
    let _staffBtnContainer = document.getElementById('staff-btn-container');

    _video.onended = function() {
      _step3.classList.remove("show");
      _step4.classList.add("show");
    }

    _video.addEventListener('click', function(e) {
      e.preventDefault();
      _step3.classList.remove("show");
      _step4.classList.add("show");
    });

    _btnNo.addEventListener('click', showHelp);

    function showHelp(e) {
      e.preventDefault();
      _help.classList.add('show');
      _staffBtnContainer.classList.add('show');
    }

  }

  ngOnDestroy() {
  }

  getName() : string {
    return this.workflowManager.getName();
  }
}
