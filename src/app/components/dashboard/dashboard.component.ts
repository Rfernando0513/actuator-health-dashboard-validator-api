import { Component, Input } from '@angular/core';
import { HealthCardComponent } from "../health-card/health-card.component";
import { HealthStatus } from '../../../Interface/HealthStatus';
import { HealthService } from '../../services/health.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HealthCardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @Input() apiUrl!: string;
  services: HealthStatus[] = [];

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.checkHealt();
    setInterval(() => this.checkHealt(), 60000)
  }

  checkHealt(){
    this.healthService.getServiceHealth(this.apiUrl).subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (error) => {
        this.services = error.empty
        console.log(error)
      }
    })
  }
}
