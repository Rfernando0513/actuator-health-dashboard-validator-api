import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development'
import { HealthStatus } from '../../../Interface/IHealthStatus';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = `${environment.apiUrl}/healthStatus`;

  constructor(private client: HttpClient){  }

  getServiceHealth(): Observable<HealthStatus[]>{
    return this.client.get<HealthStatus[]>(this.apiUrl);
  }
}
