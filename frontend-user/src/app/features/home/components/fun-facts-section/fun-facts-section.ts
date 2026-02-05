import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FunFactsService } from '../../../../services/fun-facts';

interface FunFact {
  label: string;
  value: number;
  speed: number;
  current: number;
}

@Component({
  selector: 'app-fun-facts-section',
  imports: [CommonModule],
  templateUrl: './fun-facts-section.html',
  styleUrl: './fun-facts-section.css',
})
export class FunFactsSectionComponent implements AfterViewInit {

  @ViewChild('funFactsSection') section!: ElementRef;

  hasStarted = false;

  funfacts: FunFact[] = [];

  constructor(private funFactsService: FunFactsService) {}

  ngAfterViewInit(): void {
    this.funFactsService.getFunFacts().subscribe(data => {
      this.funfacts = data.map(f => ({
        ...f,
        current: 0 
      }));

      this.observeSection();
    });
  }

  observeSection() {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !this.hasStarted) {
          this.hasStarted = true;
          this.startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(this.section.nativeElement);
  }

  startCounting() {
    this.funfacts.forEach(fact => {
      const increment = Math.ceil(fact.value / (fact.speed / 30));

      const interval = setInterval(() => {
        if (fact.current < fact.value) {
          fact.current += increment;
        } else {
          fact.current = fact.value;
          clearInterval(interval);
        }
      }, 30);
    });
  }
}

