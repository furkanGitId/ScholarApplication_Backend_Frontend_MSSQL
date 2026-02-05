import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course';

interface Course {
  image: string;
  category: string;
  categoryClass: string;
  title: string;
  author: string;
  price: number;
}

@Component({
  selector: 'app-courses-section',
  imports: [CommonModule],
  templateUrl: './courses-section.html',
  styleUrl: './courses-section.css',
})
export class CoursesSectionComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseService) { }

  activeFilter = '*';

  filters = [
    { label: 'Show All', value: '*' },
    { label: 'Webdesign', value: 'design' },
    { label: 'Development', value: 'development' },
    { label: 'Wordpress', value: 'wordpress' },
  ];

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data.map(item => ({
        image: item.image,
        category: item.category,
        categoryClass: item.categoryClass,
        title: item.title,
        author: item.author,
        price: item.price
      }));
    });
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  isVisible(course: Course): boolean {
    return this.activeFilter === '*' || course.categoryClass.includes(this.activeFilter);
  }
}
