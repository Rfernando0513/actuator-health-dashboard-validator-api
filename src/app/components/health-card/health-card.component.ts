import { Component, Input, OnInit } from '@angular/core';
import { HealthService } from '../../services/health.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-card.component.html',
  styleUrl: './health-card.component.scss'
})
export class HealthCardComponent implements OnInit {

  @Input() apiUrl!: string;
  status: string = 'unknown'

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.checkHealt();
    setInterval(() => this.checkHealt(), 30000)
  }

  checkHealt(){
    this.healthService.getActuatorResponseStatus(this.apiUrl).subscribe({
      next: (data) => {
        this.status = data.status;
      },
      error: (error) => {
        this.status = 'Down'
      }
    })
  }
}


