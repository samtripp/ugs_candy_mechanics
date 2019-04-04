import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

import { StatusService } from '../../services/status.service';
import { FilesService } from '../../services/files.service';
import { WorkflowManager } from '../../workflow-manager';
import { FileUtils } from '../../file-utils';
import { Status } from '../../model/status';
import { StateEnum } from '../../model/state-enum';

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss']
})
export class SelectFileComponent implements OnInit, OnDestroy {
  private statusSubscription:ISubscription;
  private status:Status;
  private fileList:string[];

  constructor(private router: Router, private filesService:FilesService, private workflowManager:WorkflowManager, private statusService:StatusService) { }

  ngOnInit() {
    this.filesService.getWorkspaceFiles().subscribe(fileList => {
      this.fileList = fileList;
    });

    this.status = new Status();
    this.statusSubscription = this.statusService.getStatus()
      .subscribe(data => {
        this.status = data;
      });
  }

  ngOnDestroy() {
  }

  selectFile(file:string) {
    this.workflowManager.setFile(file);
    this.router.navigate(['/load-chocolate']);
  }

  formatFilename(file:string) : string {
    return FileUtils.convertFilename(file);
  }

  isReady() : boolean {
    return this.status !== undefined && (this.status.state == StateEnum.IDLE || this.status.state == StateEnum.ALARM);
  }
}
