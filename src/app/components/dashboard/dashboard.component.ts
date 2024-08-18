import { Component, Input, ViewChild } from '@angular/core';
import { HealthCardComponent } from "../health-card/health-card.component";
import { HealthStatus } from '../../../Interface/IHealthStatus';
import { HealthService } from '../../services//healthService/health.service';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MicroService } from '../../services/microService/micro-service.service';
import { IMicroService } from '../../../Interface/IMicroService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HealthCardComponent,
    CommonModule,
    MatPaginatorModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  //Return ApiService
  @Input() apiUrl!: string;
  microservices: IMicroService[] = [];
  services: HealthStatus[] = [];
  pagedServices: HealthStatus[] = [];

  //Add New microService
  newMicroService: IMicroService = {name: '', origem: '', url: '', time: ''}

  //Declarations Paginator
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [12, 24, 50, 100];

  @ViewChild(MatPaginatorModule) paginator!: MatPaginatorModule;

  constructor(private microService: MicroService, private healthService: HealthService) {}

  ngOnInit(): void {
    this.loadMicroServices();
    setInterval(() => this.checkHealthStatus(), 60000)
  }

  loadMicroServices(){
    this.microService.getMicroService().subscribe({
      next: (data) => {
        this.microservices = data;
        this.length = data.length;
        this.checkHealthStatus();
      },
      error: (error) => {
        console.error(error);
        this.microservices = [];
        this.pagedServices = [];
      }
    })
  }

  checkHealthStatus(): void {
    this.healthService.getServiceHealth().subscribe({
      next: (data) => {
        this.services = data;
        this.length = data.length;
        this.updatePagedServices();
      },
      error: (error) => {
        console.error(error);
        this.services = [];
        this.pagedServices = [];
      }
    });
  }

  updatePagedServices(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServices = this.services.slice(startIndex, endIndex); 
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServices()
  }

 
  onSubmit(): void {
    this.microService.addMicroService(this.newMicroService).subscribe({
      next: (microservice) => {
        this.microService.push(microservice);
        this.checkHealthStatus();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
