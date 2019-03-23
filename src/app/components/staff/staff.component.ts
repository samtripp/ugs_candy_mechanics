import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { StatusService } from '../../services/status.service';
import { MachineService } from '../../services/machine.service';
import { FilesService  } from '../../services/files.service';
import { Status } from '../../model/status';
import { StateEnum } from '../../model/state-enum';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
  private status:Status;
  private statusSubscription:ISubscription;

  constructor(private statusService:StatusService, private machineService:MachineService, private filesService:FilesService) { }

  ngOnInit() {
     this.status = new Status();
      this.statusSubscription = this.statusService.getStatus()
        .subscribe(data => {
          this.status = data;
        });
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

  isIdle() : boolean {
    return this.status.state == StateEnum.IDLE;
  }

  disconnect() {
    this.machineService.disconnect().subscribe();
  }

  resetMachine() {
      this.machineService.softReset().subscribe();
  }

  stopSending() {
    this.filesService.cancel().subscribe();
  }

  returnToStart() {
    this.machineService.sendCommands("G21 X100 Y100 Z100").subscribe();
  }
}
