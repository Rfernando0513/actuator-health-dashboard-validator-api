import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development'
import { HealthStatus } from '../../../Interface/IHealthStatus';
import { MicroService } from '../microService/micro-service.service';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private newMicroservice!: MicroService;

  constructor(private client: HttpClient, microService: MicroService){  }

  checkHealthStatus(url: string): HealthStatus {
    return {
      url,
      status: url.includes('UP') ? 'UP' : 'DOWN'
    }
  }

  getHealthStatus(): Observable<HealthStatus[]> {
    return this.getHealthStatus().pipe(
      map(microservices => microservices.map(service => this.checkHealthStatus(service.url)))
    );
  }

}
