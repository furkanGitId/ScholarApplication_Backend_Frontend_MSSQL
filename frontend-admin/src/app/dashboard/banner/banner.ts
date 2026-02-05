import { Component, OnInit } from '@angular/core';
import { Banner, BannerService } from '../../services/banner';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banner',
  imports: [CommonModule,FormsModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class BannerComponent implements OnInit {
  banners: any[] = [];
  showModal = false;           
  isEditMode = false;          
  selectedBanner: Banner = this.getEmptyBanner();

  constructor(private bannerService: BannerService) { }
  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners() {
    this.bannerService.getBanners().subscribe({
      next: (data) => this.banners = data,
      error: (err) => console.error('Error loading banners', err)
    });
  }

  getEmptyBanner(): Banner {
    return { id: 0, class: '', category: '', title: '', description: '', playText: '', isActive: true };
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedBanner = this.getEmptyBanner();
    this.showModal = true;
  }

  openEditModal(banner: Banner) {
    this.isEditMode = true;
    this.selectedBanner = { ...banner }; 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveBanner() {
    if (this.isEditMode) {
      // Update banner
      this.bannerService.updateBanner(this.selectedBanner.id, this.selectedBanner)
        .subscribe({
          next: (response) => {
            const index = this.banners.findIndex(b => b.id === this.selectedBanner.id);

            if (index > -1) {
              this.banners[index] = { ...this.selectedBanner };
              this.banners = [...this.banners];
            }
            this.closeModal();
          },
          error: (err) => console.error('Error updating banner', err)
        });
    } else {
      // Add new banner
      this.bannerService.addBanner(this.selectedBanner)
        .subscribe({
          next: (newBanner) => {
            this.banners = [...this.banners, newBanner];
            this.loadBanners();
            this.closeModal();
          },
          error: (err) => console.error('Error adding banner', err)
        });
    }
  }

  get bannerCount(): number {
    return this.banners.length;
  }

  get activeCount(): number {
    return this.banners.filter(b => b.isActive === true).length;
  }

  get inactiveCount(): number {
    return this.banners.filter(b => b.isActive === false).length;
  }

  editBanner(id: number) {
    console.log('Edit banner', id);
  }

  exportExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.banners);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Banners');
    XLSX.writeFile(wb, 'banners.xlsx');
  }
}

