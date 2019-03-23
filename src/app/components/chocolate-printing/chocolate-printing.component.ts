import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

import { StatusService } from '../../services/status.service';
import { WorkflowManager } from '../../workflow-manager';
import { Status } from '../../model/status';
import { StateEnum } from '../../model/state-enum';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-chocolate-printing',
  templateUrl: './chocolate-printing.component.html',
  styleUrls: ['./chocolate-printing.component.scss']
})
export class ChocolatePrintingComponent implements OnInit, OnDestroy {
  private routeSubscription:ISubscription;
  private statusSubscription:ISubscription;

  private file:string;
  private name:string;
  private status:Status;
  private progress:number;

  constructor(private route: ActivatedRoute, private router: Router, private workflowManager:WorkflowManager, private statusService:StatusService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.file = params['file'];
      this.name = FileUtils.convertFilename(this.file);
    });

    this.status = new Status();
    this.statusSubscription = this.statusService.getStatus()
      .subscribe(data => {
        this.status = data;
        if(this.status.state == StateEnum.RUN) {
          this.progress = Math.round(this.status.completedRowCount/this.status.rowCount * 100);
        }
      });

    this.workflowManager.start(this.file);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
    this.statusSubscription.unsubscribe()
  }

  isSending() : boolean {
    return this.workflowManager.isSending();
  }

  isHoming() : boolean {
    return this.workflowManager.isHoming();
  }

  isMovingToOrigin() : boolean {
    return this.workflowManager.isMovingToOrigin();
  }

  isEjecting() : boolean {
    return this.workflowManager.isEjecting();
  }
}
