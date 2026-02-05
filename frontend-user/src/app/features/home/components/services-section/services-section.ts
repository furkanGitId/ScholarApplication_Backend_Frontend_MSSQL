import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../../services/service';

interface Service {
  title: string;
  description: string;
  icon: string;
  link: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-services-section',
  imports: [CommonModule],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSectionComponent implements OnInit {
  servicesList: Service[] = [];
  constructor(private servicesService: ServiceService) { }

  ngOnInit(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.servicesList = data;
      },
      error: (err) => {
        console.error('Error loading services', err);
      }
    });
  }

  toggleReadMore(service: Service): void {
    service.expanded = !service.expanded;
  }

}
