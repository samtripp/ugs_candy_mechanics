import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";

import { ActivatedRoute } from '@angular/router';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-start-printing',
  templateUrl: './start-printing.component.html',
  styleUrls: ['./start-printing.component.scss']
})
export class StartPrintingComponent implements OnInit, OnDestroy {
  private routeSubscription:ISubscription;

  private file:string;
  private name:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.file = params['file'];
      this.name = FileUtils.convertFilename(this.file);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
