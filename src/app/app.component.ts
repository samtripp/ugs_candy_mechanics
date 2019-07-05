import { Component, OnInit } from '@angular/core';
import { StatusService } from './services/status.service';
import { FilesService } from './services/files.service';
import { Status } from './model/status';
import { StateEnum } from './model/state-enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private status: Status = new Status();

  constructor(private statusService: StatusService, private filesService: FilesService) { }

  ngOnInit() {
    // Start polling for status reports
    this.statusService.start();
    this.filesService.start();

    // Subscribe to status changes and store it locally
    this.statusService.getStatus().subscribe(status => this.status = status);
  }

  isConnectedToPendantAPI(): boolean {
    return this.status.state !== StateEnum.UNAVAILABLE;
  }

  isConnectedToController(): boolean {
    return this.status.state !== StateEnum.UNAVAILABLE && this.status.state !== StateEnum.DISCONNECTED;
  }
}
