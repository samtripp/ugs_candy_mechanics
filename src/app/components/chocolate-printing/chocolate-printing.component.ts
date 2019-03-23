import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatusService } from '../../services/status.service';
import { MachineService } from '../../services/machine.service';
import { FilesService } from '../../services/files.service';
import { WorkflowManager } from '../../workflow-manager';
import { Status } from '../../model/status';
import { StateEnum } from '../../model/state-enum';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-chocolate-printing',
  templateUrl: './chocolate-printing.component.html',
  styleUrls: ['./chocolate-printing.component.scss']
})
export class ChocolatePrintingComponent implements OnInit {
  private sub:any;
  private file:string;
  private name:string;
  private status:Status;
  private progress:number;

  constructor(private route: ActivatedRoute, private router: Router, private workflowManager:WorkflowManager, private statusService:StatusService, private machineService:MachineService, private filesService:FilesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.file = params['file'];
      this.name = FileUtils.convertFilename(this.file);
    });
    this.workflowManager.start(this.file);
    this.status = new Status();
    this.statusService.getStatus()
      .subscribe(data => {
        this.status = data;
        this.progress = Math.round(this.status.completedRowCount/this.status.rowCount * 100);
      });
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
