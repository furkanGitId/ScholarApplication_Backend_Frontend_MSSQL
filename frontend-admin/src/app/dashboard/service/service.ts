import { Component, OnInit } from '@angular/core';
import { ServiceItem, ServiceService } from '../../services/service';
import * as XLSX from 'xlsx';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  imports: [FormsModule,CommonModule],
  templateUrl: './service.html',
  styleUrl: './service.css',
})
export class ServiceComponent implements OnInit {
  services: ServiceItem[] = [];
  showModal = false;
  isEditMode = false;
  selectedService: ServiceItem = this.getEmptyService();

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => (this.services = data),
      error: (err) => console.error('Error loading services', err),
    });
  }

  getEmptyService(): ServiceItem {
    return {
      id: 0,
      title: '',
      description: '',
      icon: '',
      link: '',
    };
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedService = this.getEmptyService();
    this.showModal = true;
  }

  openEditModal(service: ServiceItem) {
    this.isEditMode = true;
    this.selectedService = { ...service };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveService() {
    if (this.isEditMode) {
      // Update service
      this.serviceService
        .updateService(this.selectedService.id, this.selectedService)
        .subscribe({
          next: () => {
            const index = this.services.findIndex(
              (s) => s.id === this.selectedService.id
            );

            if (index > -1) {
              this.services[index] = { ...this.selectedService };
              this.services = [...this.services];
            }
            this.closeModal();
          },
          error: (err) => console.error('Error updating service', err),
        });
    } else {
      // Add service
      this.serviceService.addService(this.selectedService).subscribe({
        next: (newService) => {
          this.services = [...this.services, newService];
          this.loadServices();
          this.closeModal();
        },
        error: (err) => console.error('Error adding service', err),
      });
    }
  }

  deleteService(id: number) {
    if (!confirm('Are you sure you want to delete this service?')) {
      return;
    }

    this.serviceService.deleteService(id).subscribe({
      next: () => {
        this.services = this.services.filter(s => s.id !== id);
      },
      error: (err) => console.error('Error deleting service', err),
    });
  }

  onIconSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Only allow PNG
    if (file.type !== 'image/png') {
      alert('Only PNG images are allowed');
      return;
    }

    // Preview only
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedService.icon = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.services);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Services');
    XLSX.writeFile(wb, 'services.xlsx');
  }
}
