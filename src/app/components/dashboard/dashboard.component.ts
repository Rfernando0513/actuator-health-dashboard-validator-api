import { Component } from '@angular/core';
import { HealthCardComponent } from "../health-card/health-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HealthCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  apiUrls: string[] = [
    'http://localhost:8080',
    'http://localhost:8081',
  ]
}
