import { Component, Input} from '@angular/core';
import { HealthStatus } from '../../../Interface/HealthStatus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-health-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-card.component.html',
  styleUrl: './health-card.component.scss'
})
export class HealthCardComponent {
  @Input() service!: HealthStatus;

  getStatusClass(): string {
    return this.service.status === 'UP' ? 'status-up' : 'status-down';
  };
}
