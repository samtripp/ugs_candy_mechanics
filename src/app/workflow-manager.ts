import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StatusService } from './services/status.service';
import { MachineService } from './services/machine.service';
import { FilesService } from './services/files.service';
import { Status } from './model/status';
import { StateEnum } from './model/state-enum';
import { FileUtils } from './file-utils';
import { environment } from '../environments/environment';

enum WorkflowStateEnum {
  WORKING = "WORKING",
  STARTING = "STARTING",
  HOMING = "HOMING",
  MOVE_TO_ORIGIN = "MOVE_TO_ORIGIN",
  SENDING = "SENDING",
  FINISHED = "FINISHED",
  EJECTING = "EJECTING",
  ABORTED = "ABORTED"
}

@Injectable({
  providedIn: 'root'
})
export class WorkflowManager {
  private file:string;
  private status:Status;
  private previousState: StateEnum;
  private workflowState: WorkflowStateEnum = WorkflowStateEnum.FINISHED;

  constructor(private router: Router, private statusService:StatusService, private machineService:MachineService, private filesService:FilesService) {
  }

  public setFile(file:string) {
    this.file = file;
  }

  public getFile() : string {
    return this.file;
  }

  public getName() : string {
    return FileUtils.convertFilename(this.file);
  }

  public start() : void {
    if(!this.isRunning()) {
      this.status = new Status();
      this.workflowState = WorkflowStateEnum.STARTING;
      this.previousState = StateEnum.UNKNOWN;

      this.statusService.getStatus()
        .subscribe(data => {
          this.status = data;

          // Check if the state has changed
          if(this.previousState != this.status.state) {
            this.previousState = this.status.state;

            // If we changed the state to IDLE
            if(this.status.state == StateEnum.IDLE) {
              this.onReadyForNextStep();
            }
          }
        });
    }
  }

  public stop() : void {
    this.filesService.cancel().subscribe(() => {
      this.workflowState = WorkflowStateEnum.ABORTED;
      this.previousState = StateEnum.UNKNOWN;
    });
  }

  public onReadyForNextStep() {
    console.log("Ready for next step");
    if(this.workflowState == WorkflowStateEnum.STARTING) {
      this.startHoming();
    } else if(this.workflowState == WorkflowStateEnum.HOMING) {
      this.moveToOrigin();
    } else if(this.workflowState == WorkflowStateEnum.MOVE_TO_ORIGIN) {
      this.sendFile();
    } else if (this.workflowState == WorkflowStateEnum.SENDING) {
      this.eject();
    } else if (this.workflowState == WorkflowStateEnum.EJECTING) {
      this.finishedSending();
    }
  }

  startHoming() {
    // Changing the state to let others know we are busy
    console.log(" - Started homing");
    this.workflowState = WorkflowStateEnum.WORKING;

    // Start homing
    this.machineService.homeMachine().subscribe(() => {
        this.workflowState = WorkflowStateEnum.HOMING;
      },
      (error) => {
        if(error.status == 412) {
          console.error(" - Homing is not activated on server");
          this.workflowState = WorkflowStateEnum.HOMING;
          this.previousState = StateEnum.UNKNOWN;
        } else {
          // TODO handle error
          console.error("Couldn't home machine!");
        }
      });
  }

  moveToOrigin() {
    // Changing the state to let others know we are busy
    console.log(" - Moving to origin");
    this.workflowState = WorkflowStateEnum.WORKING;

    this.machineService.sendCommands(environment.moveToOriginCommand).subscribe(() => {
      this.workflowState = WorkflowStateEnum.MOVE_TO_ORIGIN;
      this.previousState = StateEnum.UNKNOWN;
    },
    (error) => {
      console.error("Couldn't move to origin");
    });
  }

  sendFile() {
    // Changing the state to let others know we are busy
    console.log(" - Sending file");
    this.workflowState = WorkflowStateEnum.WORKING;

    this.filesService.openWorkspaceFile(this.file).subscribe(() => {
      this.filesService.send().subscribe(() => {
        this.workflowState = WorkflowStateEnum.SENDING;
      },
      (error) => {
        console.error("Couldn't send file!");
      });
    },
    (error) => {
      console.error("Couldn't set file!");
    });
  }

  eject() {
    // Changing the state to let others know we are busy
    console.log(" - Ejecting");
    this.workflowState = WorkflowStateEnum.WORKING;

    this.machineService.sendCommands(environment.ejectCommand).subscribe(() => {
      this.workflowState = WorkflowStateEnum.EJECTING;
      this.previousState = StateEnum.UNKNOWN;
    },
    (error) => {
      console.error("Couldn't eject");
    });
  }

  finishedSending() {
    console.log(" - Finished sending");
    this.workflowState = WorkflowStateEnum.FINISHED;
    this.router.navigate(['/chocolate-finished']);
  }

  isRunning() : boolean {
    return this.workflowState != WorkflowStateEnum.ABORTED && this.workflowState != WorkflowStateEnum.FINISHED;
  }

  isSending() : boolean {
    return this.workflowState == WorkflowStateEnum.SENDING;
  }

  isHoming() : boolean {
    return this.workflowState == WorkflowStateEnum.HOMING;
  }

  isMovingToOrigin() : boolean {
    return this.workflowState == WorkflowStateEnum.MOVE_TO_ORIGIN;
  }

  isEjecting() : boolean {
    return this.workflowState == WorkflowStateEnum.EJECTING;
  }
}
