import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { HomeService, Statistics, User } from '../../services/home';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  @ViewChildren('tiltCard') tiltCards!: QueryList<ElementRef>;
  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  stats: Statistics | null = null;
  users: User[] = [];
  error = '';

  chartData: {
    label: string;
    value: number;
    class: string;
  }[] = [];

  constructor(
    private renderer: Renderer2,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.fetchStatistics();
    this.fetchusers();
  }

  fetchusers(): void {
    this.homeService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map(({ password, ...user }) => user);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  fetchStatistics(): void {
    this.homeService.getStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.chartData = [
          { label: 'Banners', value: data.totalBanner, class: 'bar-emerald' },
          { label: 'Services', value: data.totalService, class: 'bar-gold' },
          { label: 'Courses', value: data.totalCourse, class: 'bar-coral' },
          { label: 'Team', value: data.totalTeamMember, class: 'bar-teal' },
          { label: 'Events', value: data.totalEvent, class: 'bar-amber' },
          { label: 'Users', value: data.totalUser, class: 'bar-emerald' }
        ];
        setTimeout(() => this.initCounters());
      },
      error: (err) => {
        this.error = 'Failed to load statistics.';
        console.error(err);
      }
    });
  }

  getBarHeight(value: number): string {
    const values = this.chartData.map(d => d.value);
    const max = Math.max(...values, 10);
    const maxHeight = 200;
    return (value / max) * maxHeight + 'px';
  }

  getYAxisLabels(): string[] {
    const values = this.chartData.map(d => d.value);
    const max = Math.max(...values, 10);

    return [
      Math.round(max).toLocaleString(),
      Math.round(max * 0.75).toLocaleString(),
      Math.round(max * 0.5).toLocaleString(),
      Math.round(max * 0.25).toLocaleString(),
      '0'
    ];
  }

  ngAfterViewInit() {
    this.initTiltEffect();
  }

  // ===============================
  // 3D Tilt Effect 
  // ===============================
  initTiltEffect() {
    this.tiltCards.forEach(cardRef => {
      const card = cardRef.nativeElement;

      this.renderer.listen(card, 'mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - x) / 20;

        card.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateZ(10px)`;
      });

      this.renderer.listen(card, 'mouseleave', () => {
        card.style.transform =
          'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // ===============================
  // Animated Counters 
  // ===============================
  initCounters() {
    this.counters.forEach(counterRef => {
      const el = counterRef.nativeElement;
      const value = parseInt(el.innerText.replace(/[^0-9]/g, ''), 10);
      const prefix = el.innerText.includes('$') ? '$' : '';
      const suffix = el.innerText.includes('%') ? '%' : '';

      this.animateCounter(el, value, prefix, suffix);
    });
  }

  animateCounter(
    element: HTMLElement,
    target: number,
    prefix = '',
    suffix = '',
    duration = 2000
  ) {
    const startTime = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * ease);

      element.innerText = `${prefix}${value.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  exportExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      XLSX.writeFile(wb, 'users.xlsx');
    }
}
