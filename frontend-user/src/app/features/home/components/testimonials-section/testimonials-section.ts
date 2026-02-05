import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TestimonialService } from '../../../../services/testimonial';

interface Testimonial {
  message: string;
  name: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-testimonials-section',
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [];
  constructor(private testimonialService: TestimonialService) {}

  carouselOptions: OwlOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    dots: true,
    nav: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true
  };

  ngOnInit(): void {
    this.testimonialService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }
}
