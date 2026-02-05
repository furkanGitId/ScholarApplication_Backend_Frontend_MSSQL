import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  imports: [CommonModule],
  templateUrl: './scroll-button.html',
  styleUrl: './scroll-button.css',
})
export class ScrollButtonComponent {
  showButton = false;

  @HostListener('window:scroll')
  onScroll() {
    this.showButton = window.scrollY > 300;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}
