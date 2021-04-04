import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadCSVFile(file:File){
    var formData = new FormData();
    formData.append('csv', file);
    formData.append('skid', sessionStorage.getItem('skid'));
    return this.http.post(`${environment.baseURL}/files/csv`, formData);
  }
}
