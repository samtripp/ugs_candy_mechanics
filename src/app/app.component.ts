import { Component, OnInit } from '@angular/core';
import { StatusService } from './services/status.service';
import { Status } from './model/status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private status: Status = new Status();

  constructor(private statusService:StatusService) { }

  ngOnInit() {
    // Start polling for status reports
    this.statusService.start();

    // Subscribe to status changes and store it locally
    this.statusService.getStatus().subscribe(status => this.status = status);
  }
}
