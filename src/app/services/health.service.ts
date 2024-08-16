import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class HealthService {

  private apiUrl = `${environment.apiUrl}/health`;

  constructor(private client: HttpClient){  }

  getActuatorResponseStatus(apiUrl: string): Observable<any>{
    return this.client.get(this.apiUrl);
  }
}
