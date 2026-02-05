import { Component, OnInit } from '@angular/core';
import { Testimonial, TestimonialsService } from '../../services/testimonials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule,FormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];

  showModal = false;
  isEditMode = false;
  selectedTestimonial: Testimonial = this.getEmptyModel();

  constructor(private testimonialService: TestimonialsService) { }

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.testimonialService.getTestimonials().subscribe({
      next: data => (this.testimonials = data),
      error: err => console.error('Failed to load testimonials', err),
    });
  }

  getEmptyModel(): Testimonial {
    return {
      id: 0,
      message: '',
      name: '',
      role: '',
      image: '',
    };
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedTestimonial = this.getEmptyModel();
    this.showModal = true;
  }

  openEditModal(item: Testimonial) {
    this.isEditMode = true;
    this.selectedTestimonial = { ...item };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveTestimonial() {
    if (this.isEditMode) {
      this.testimonialService
        .updateTestimonial(
          this.selectedTestimonial.id,
          this.selectedTestimonial
        )
        .subscribe({
          next: () => {
            const index = this.testimonials.findIndex(
              t => t.id === this.selectedTestimonial.id
            );
            if (index > -1) {
              this.testimonials[index] = { ...this.selectedTestimonial };
              this.testimonials = [...this.testimonials];
            }
            this.closeModal();
          },
        });
    } else {
      this.testimonialService
        .addTestimonial(this.selectedTestimonial)
        .subscribe({
          next: () => {
            this.loadTestimonials();
            this.closeModal();
          },
        });
    }
  }

  deleteTestimonial(id: number) {
    if (!confirm('Delete this testimonial?')) return;

    this.testimonialService.deleteTestimonial(id).subscribe({
      next: () => {
        this.testimonials = this.testimonials.filter(t => t.id !== id);
      },
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG or PNG allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedTestimonial.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
