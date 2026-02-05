import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  activeSection: string = 'home';
  searchText: string = '';
  menuOpen: boolean = false;

  constructor(private viewportScroller: ViewportScroller) { }

  onSearch(event: Event): void {
    event.preventDefault();
    if (!this.searchText.trim()) {
      return;
    }
    console.log('Search keyword:', this.searchText);
    this.searchText = '';
  }

  onSearchClick(): void {
    if (!this.searchText.trim()) {
      return;
    }
    this.onSearch(new Event('submit'));
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(sectionId: string): void {
    this.activeSection = sectionId;
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
