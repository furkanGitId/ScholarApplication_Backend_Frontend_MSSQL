import { Component, OnInit } from '@angular/core';
import { Course, CoursesService } from '../../services/courses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule,FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  showModal = false;
  isEditMode = false;
  selectedCourse: Course = this.getEmptyCourse();

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data;
      },
      error: (err) => console.error('Error loading courses', err),
    });
  }

  getEmptyCourse(): Course {
    return {
      id: 0,
      image: '',
      category: '',
      categoryClass: '',
      title: '',
      author: '',
      price: 0,
    };
  }

  filterCategory(category: string) {
    this.filteredCourses = category
      ? this.courses.filter(c => c.category === category)
      : this.courses;
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedCourse = this.getEmptyCourse();
    this.showModal = true;
  }

  openEditModal(course: Course) {
    this.isEditMode = true;
    this.selectedCourse = { ...course };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCourse() {
    if (this.isEditMode) {
      this.coursesService
        .updateCourse(this.selectedCourse.id, this.selectedCourse)
        .subscribe({
          next: () => {
            const index = this.courses.findIndex(
              c => c.id === this.selectedCourse.id
            );
            if (index > -1) {
              this.courses[index] = { ...this.selectedCourse };
              this.courses = [...this.courses];
              this.filterCategory('');
            }
            this.closeModal();
          },
          error: (err) => console.error('Error updating course', err),
        });
    } else {
      this.coursesService.addCourse(this.selectedCourse).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
        },
        error: (err) => console.error('Error adding course', err),
      });
    }
  }

  deleteCourse(id: number) {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
        this.filteredCourses = this.filteredCourses.filter(c => c.id !== id);
      },
      error: (err) => console.error('Error deleting course', err),
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
      this.selectedCourse.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
