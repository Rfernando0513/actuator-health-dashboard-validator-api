import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {IMicroService} from '../../../Interface/IMicroService';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-health-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    FontAwesomeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './health-card.component.html',
  styleUrl: './health-card.component.scss'
})
export class HealthCardComponent {
  @Input() service!: IMicroService;
  @Output() onDeleteMicroService = new EventEmitter<IMicroService>;

  faTimes = faTimes;
  
  getStatusClass(): string {
    return this.service.status === 'UP' ? 'status-up' : 'status-down';
  };

  onDelete(services: IMicroService) {
    this.onDeleteMicroService.emit(services);
    
  } 
}
