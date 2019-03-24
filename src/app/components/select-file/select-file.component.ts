import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FilesService } from '../../services/files.service';
import { WorkflowManager } from '../../workflow-manager';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss']
})
export class SelectFileComponent implements OnInit, OnDestroy {

  private fileList:string[];

  constructor(private router: Router, private filesService:FilesService, private workflowManager:WorkflowManager) { }

  ngOnInit() {
    this.filesService.getWorkspaceFiles().subscribe(fileList => {
      this.fileList = fileList;
    });
  }

  ngOnDestroy() {
  }

  selectFile(file:string) {
    this.workflowManager.setFile(file);
    this.router.navigate(['/load-chocolate']);
  }

  formatFilename(file:string) : string {
     return FileUtils.convertFilename(file);
  }
}
