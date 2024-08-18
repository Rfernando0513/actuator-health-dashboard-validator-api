import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMicroService } from '../../../Interface/IMicroService';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  private apiUrl = `${environment.apiUrl}/microservices`;

  constructor(private http: HttpClient) { }

  getMicroService(): Observable<IMicroService[]>{
    return this.http.get<IMicroService[]>(this.apiUrl)
  }

  addMicroService(microService: IMicroService): Observable<IMicroService>{
    return this.http.post<IMicroService>(this.apiUrl, microService)
  }
}
