import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertHelper } from '../../helpers/alert-helper';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements AfterViewInit,OnInit {
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

  fullName: string = '';

  constructor(private renderer: Renderer2, private router: Router,private alert: AlertHelper) { }

  ngAfterViewInit() {
    this.initMobileMenu();
  }
  ngOnInit(): void { this.fullName = localStorage.getItem('fullName') || ''; }

  initMobileMenu() {
    const sidebarEl = this.sidebar.nativeElement;

    // Close sidebar when clicking outside
    this.renderer.listen('document', 'click', (event: Event) => {
      if (
        sidebarEl.classList.contains('open') &&
        !sidebarEl.contains(event.target)
      ) {
        sidebarEl.classList.remove('open');
      }
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    sessionStorage.clear();
    this.alert.show('Logged out successfully', 'success');

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  }
}
