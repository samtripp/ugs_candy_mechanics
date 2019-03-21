import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http:HttpClient) { }

  send(): Observable<any> {
    return this.http.post('/api/v1/files/send', null);
  }

  pause(): Observable<any> {
    return this.http.get('/api/v1/files/pause');
  }

  cancel(): Observable<any> {
    return this.http.get('/api/v1/files/cancel');
  }

  uploadAndOpen(file:File): Observable<any> {
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post("/api/v1/files/uploadAndOpen", formData)
      .map((response: Response) => {
          return response;
      });
  }

  getWorkspaceFiles(): Observable<string[]> {
    return this.http.get<any>("/api/v1/files/getWorkspaceFileList")
      .map((response: any) => {
          return response.fileList;
      });
  }

  openWorkspaceFile(file:string): Observable<any> {
    return this.http.post<any>("/api/v1/files/openWorkspaceFile?file=" + file, null);
  }
}
