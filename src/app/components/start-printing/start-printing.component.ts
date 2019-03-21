import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-printing',
  templateUrl: './start-printing.component.html',
  styleUrls: ['./start-printing.component.scss']
})
export class StartPrintingComponent implements OnInit {

  private file:string;
  private sub:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.file = params['file'];
      });
  }
}
