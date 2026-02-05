import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BannerService } from '../../../../services/banner';

@Component({
  selector: 'app-main-banner',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './main-banner.html',
  styleUrls: ['./main-banner.css'],
})
export class MainBannerComponent {
  banners: any[] = [];
  constructor(private bannerService: BannerService) { }

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
    this.bannerService.getBanners().subscribe({
      next: (data) => {
        this.banners = data;
      },
      error: (err) => {
        console.error('Error loading banners', err);
      }
    });
  }
}
