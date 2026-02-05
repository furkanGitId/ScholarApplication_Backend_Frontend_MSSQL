import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  imports: [CommonModule],
  templateUrl: './preloader.html',
  styleUrl: './preloader.css',
})
export class PreloaderComponent implements OnInit {
  loading = true;

  ngOnInit(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }
}
