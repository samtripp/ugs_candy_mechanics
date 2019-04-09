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

  constructor(private statusService:StatusService) { }

  ngOnInit() {
  }

}
