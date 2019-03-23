import { Component, OnInit } from '@angular/core';

import { StatusService } from '../../services/status.service';
import { Status } from '../../model/status';
import { StateEnum } from '../../model/state-enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private status: Status = new Status();

  constructor(private statusService:StatusService) { }

  ngOnInit() {
      // Subscribe to status changes and store it locally
      this.statusService.getStatus().subscribe(status => this.status = status);
  }

  isConnectedToPendantAPI():boolean {
    return this.status.state != StateEnum.UNAVAILABLE;
  }

  isConnectedToController():boolean {
    return this.status.state != StateEnum.UNAVAILABLE && this.status.state != StateEnum.DISCONNECTED;
  }
}
