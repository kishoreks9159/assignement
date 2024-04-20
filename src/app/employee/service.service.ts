import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  createUnicorn(unicornData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, unicornData);
  }

  getAllUnicorns(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl);
  }

  getUnicornById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<any>(url);
  }

  updateUnicorn(id: string, unicornData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<any>(url, unicornData);
  }

  deleteUnicorn(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<any>(url);
  }

}