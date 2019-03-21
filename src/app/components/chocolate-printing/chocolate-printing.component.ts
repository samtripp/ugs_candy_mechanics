import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatusService } from '../../services/status.service';
import { MachineService } from '../../services/machine.service'
import { FilesService } from '../../services/files.service'
import { Status } from '../../model/status';
import { StateEnum } from '../../model/state-enum';

@Component({
  selector: 'app-chocolate-printing',
  templateUrl: './chocolate-printing.component.html',
  styleUrls: ['./chocolate-printing.component.scss']
})
export class ChocolatePrintingComponent implements OnInit {
  private isHoming:boolean;
  private isSendingFile:boolean;
  private sub:any;

  private file:string;
  private status:Status;
  private progress:number;

  constructor(private route: ActivatedRoute, private router: Router, private statusService:StatusService, private machineService:MachineService, private filesService:FilesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.file = params['file'];
    });

    this.isSendingFile = false;
    this.isHoming = false;
    this.status = new Status();
    this.statusService.getStatus()
      .subscribe(data => {
        this.status = data;
        this.progress = Math.round(this.status.completedRowCount/this.status.rowCount * 100);

        if(this.isSendingFile && this.status.state == StateEnum.IDLE) {
          this.isSendingFile=false;
          console.log("Finished!");
          this.router.navigate(['/chocolate-finished', this.file], { relativeTo: this.route });
        } else if (!this.isSendingFile && this.status.state == StateEnum.RUN) {
          this.isSendingFile=true;
        }
      });

    console.log("Starting homing");
    this.isHoming = true;
    this.machineService.homeMachine()
      .subscribe(() => {
        console.log("Homing finished");
        this.isHoming=false;
        this.machineService.resetToZero().subscribe(() => {
          this.startSendingFile();
        });
      },
      error => {
        if(error.status==412) {
          console.log("Couldn't perform homing as it isn't activated on the server");
          this.startSendingFile();
        } else {
          console.log("An unknown error has occured when trying to perform homing", error);
        }
        this.isHoming=false;
      });

  }

  startSendingFile():void {
    this.filesService.openWorkspaceFile(this.file).subscribe(() => {
      this.filesService.send().subscribe();
    });
  }
}
