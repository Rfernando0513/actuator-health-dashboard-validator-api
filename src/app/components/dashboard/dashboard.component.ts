import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { HealthCardComponent } from "../health-card/health-card.component";
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() apiUrl!: string;
  microservices: IMicroService[] = [];
  pagedServices: IMicroService[] = []; 

  // Declarações do Paginator
  length = 0;
  pageSize = 9;
  pageIndex = 0;
  pageSizeOptions = [12, 24, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private microService: MicroService) {}

  ngOnInit(): void {
    this.loadMicroServices();
    setInterval(() => this.loadMicroServices(), 60000);
  }

  loadMicroServices(): void {
    this.microService.getMicroService().subscribe({
      next: (data) => {
        this.microservices = data;
        this.length = data.length;
        this.updatePagedServices(); 
      },
      error: (error) => console.error('Erro ao carregar microservices: ', error)
    });
  }

  addMicroService(newService: IMicroService): void {
    this.microService.addMicroService(newService).subscribe({
      next: (service) => {
        this.microservices.push(service);
        this.length = this.microservices.length;
        this.updatePagedServices();
      },
      error: (error) => console.error('Erro ao adicionar service: ', error)
    });
  }

  updatePagedServices(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedServices = this.microservices.slice(startIndex, endIndex); 
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedServices();
  }
}
