import { Component, OnInit } from '@angular/core';
import { AboutUsAccordion, AboutUsService } from '../../services/about-us';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule,FormsModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUsComponent implements OnInit {
  accordions: AboutUsAccordion[] = [];
  activeIndex: number | null = null;

  showModal = false;
  isEditMode = false;
  selectedAccordion: AboutUsAccordion = this.getEmptyAccordion();

  constructor(private accordionService: AboutUsService) { }

  ngOnInit(): void {
    this.loadAccordions();
  }

  loadAccordions() {
    this.accordionService.getAccordions().subscribe({
      next: (data) => (this.accordions = data),
      error: (err) => console.error('Error loading accordions', err),
    });
  }

  getEmptyAccordion(): AboutUsAccordion {
    return {
      id: 0,
      accordionKey: '',
      title: '',
      content: '',
    };
  }

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedAccordion = this.getEmptyAccordion();
    this.showModal = true;
  }

  openEditModal(item: AboutUsAccordion) {
    this.isEditMode = true;
    this.selectedAccordion = { ...item };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveAccordion() {
    if (this.isEditMode) {
      // Update accordion
      this.accordionService
        .updateAccordion(
          this.selectedAccordion.id,
          this.selectedAccordion
        )
        .subscribe({
          next: () => {
            const index = this.accordions.findIndex(
              (a) => a.id === this.selectedAccordion.id
            );

            if (index > -1) {
              this.accordions[index] = { ...this.selectedAccordion };
              this.accordions = [...this.accordions];
            }
            this.closeModal();
          },
          error: (err) => console.error('Error updating accordion', err),
        });
    } else {
      // Add accordion
      this.accordionService.addAccordion(this.selectedAccordion).subscribe({
        next: (newItem) => {
          this.accordions = [...this.accordions, newItem];
          this.loadAccordions();
          this.closeModal();
        },
        error: (err) => console.error('Error adding accordion', err),
      });
    }
  }

  deleteAccordion(id: number) {
    if (!confirm('Are you sure you want to delete this About Us item?')) {
      return;
    }

    this.accordionService.deleteAccordion(id).subscribe({
      next: () => {
        this.accordions = this.accordions.filter(a => a.id !== id);
      },
      error: (err) => console.error('Error deleting accordion', err),
    });
  }

  exportExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.accordions);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'AboutUs');
      XLSX.writeFile(wb, 'about-us.xlsx');
    }
}
