import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { timer, interval } from 'rxjs';
import { switchMap, tap, retryWhen, delayWhen } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private workspaceFilesSubject: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient) { }

  /**
   * Starts a timer and refreshes the files on intervals
   */
  start() {
    interval(environment.filesPollInterval)
    .pipe(
      switchMap(_ => this.refreshWorkspaceFiles()),
      retryWhen(errors =>
        // Retry on errors
        errors.pipe(
          // On error send an invalid status
          tap(error => {
            this.workspaceFilesSubject.next([]);
          }),
          // Restart in 5 seconds
          delayWhen(error => timer(10000))
        )
      )
    )
    .subscribe();
  }

  send(): Observable<any> {
    return this.http.post('/api/v1/files/send', null);
  }

  pause(): Observable<any> {
    return this.http.get('/api/v1/files/pause');
  }

  cancel(): Observable<any> {
    return this.http.get('/api/v1/files/cancel');
  }

  uploadAndOpen(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post("/api/v1/files/uploadAndOpen", formData)
      .map((response: Response) => {
          return response;
      });
  }

  getWorkspaceFiles(): Observable<string[]> {
    return this.workspaceFilesSubject;
  }

  refreshWorkspaceFiles() {
    return this.http.get<any>("/api/v1/files/getWorkspaceFileList")
      .map((response: any) => {
          return response.fileList;
      })
      .pipe(
        tap(fileList => this.workspaceFilesSubject.next(fileList))
      );
  }

  openWorkspaceFile(file: string): Observable<any> {
    return this.http.post<any>("/api/v1/files/openWorkspaceFile?file=" + file, null);;
  }
}
