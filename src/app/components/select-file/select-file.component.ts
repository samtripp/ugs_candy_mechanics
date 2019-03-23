import { Component, OnInit, OnDestroy } from '@angular/core';

import { FilesService } from '../../services/files.service';
import { FileUtils } from '../../file-utils';

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss']
})
export class SelectFileComponent implements OnInit, OnDestroy {

  private fileList:string[];

  constructor(private filesService:FilesService) { }

  ngOnInit() {
    this.filesService.getWorkspaceFiles().subscribe(fileList => {
      this.fileList = fileList;
    });
  }

  ngOnDestroy() {
  }

  formatFilename(file:string) : string {
     return FileUtils.convertFilename(file);
  }
}
