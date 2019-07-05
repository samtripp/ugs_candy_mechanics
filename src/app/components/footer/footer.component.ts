import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { StatusService } from '../../services/status.service';
import { Status } from '../../model/status';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  private status:Status;
  private statusSubscription:ISubscription;

  constructor(private statusService:StatusService) { }

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

  isDebugEnabled() {
    return environment.debug;
  }
}
