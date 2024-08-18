import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { HealthStatus } from '../../../Interface/IHealthStatus';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-health-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './health-card.component.html',
  styleUrl: './health-card.component.scss'
})
export class HealthCardComponent {
  @Input() service!: HealthStatus;
  


  getStatusClass(): string {
    return this.service.status === 'UP' ? 'status-up' : 'status-down';
  };
}
