import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMicroService } from '../../../Interface/IMicroService';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  private apiUrl = `${environment.apiUrl}/microservices`;

  constructor(private http: HttpClient) { }

  getMicroService(): Observable<IMicroService[]>{
    return this.http.get<IMicroService[]>(this.apiUrl).pipe(
      map(services => services.map(service => this.checkHealthStatus(service)))
    );
  }

  addMicroService(microService: IMicroService): Observable<IMicroService>{
    return this.http.post<IMicroService>(this.apiUrl, microService)
  }

  private checkHealthStatus(microService: IMicroService): IMicroService {
    microService.status = microService.url.includes('UP') ? 'UP' : 'DOWN';
    return microService;
  }
}
