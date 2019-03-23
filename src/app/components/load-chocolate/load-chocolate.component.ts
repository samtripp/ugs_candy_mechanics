import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-load-chocolate',
  templateUrl: './load-chocolate.component.html',
  styleUrls: ['./load-chocolate.component.scss']
})
export class LoadChocolateComponent implements OnInit, OnDestroy {
  private routeSubscription:ISubscription;

  private file:string;
  private name:string;
  private sub:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.sub = this.route.params.subscribe(params => {
      this.file = params['file'];
      this.name = FileUtils.convertFilename(this.file);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
