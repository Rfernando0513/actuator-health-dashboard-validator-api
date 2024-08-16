import { Component} from '@angular/core';
import { HealthCardComponent } from '../../app/components/health-card/health-card.component';
import { DashboardComponent } from "../../app/components/dashboard/dashboard.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HealthCardComponent,
    DashboardComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
