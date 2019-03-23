import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-chocolate-finished',
  templateUrl: './chocolate-finished.component.html',
  styleUrls: ['./chocolate-finished.component.scss']
})
export class ChocolateFinishedComponent implements OnInit {
  private file:string;
  private name:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.file = params['file'];
      this.name = FileUtils.convertFilename(this.file);
    });
  }

}
