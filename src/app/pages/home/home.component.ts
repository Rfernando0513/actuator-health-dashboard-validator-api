import { Component} from '@angular/core';
import { HealthCardComponent } from '../../components/health-card/health-card.component';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";

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
