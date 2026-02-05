import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './core/ui/preloader/preloader';
import { HeaderComponent } from './core/layout/header/header';
import { MainBannerComponent } from './features/home/components/main-banner/main-banner';
import { ServicesSectionComponent } from './features/home/components/services-section/services-section';
import { AboutUsSectionComponent } from './features/home/components/about-us-section/about-us-section';
import { CoursesSectionComponent } from './features/home/components/courses-section/courses-section';
import { FunFactsSectionComponent } from './features/home/components/fun-facts-section/fun-facts-section';
import { TeamSectionComponent } from './features/home/components/team-section/team-section';
import { EventsSectionComponent } from './features/home/components/events-section/events-section';
import { ContactUsSectionComponent } from './features/home/components/contact-us-section/contact-us-section';
import { FooterComponent } from './core/layout/footer/footer';
import { TestimonialsSectionComponent } from './features/home/components/testimonials-section/testimonials-section';
import { ScrollButtonComponent } from './core/ui/scroll-button/scroll-button';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreloaderComponent, HeaderComponent, MainBannerComponent, ServicesSectionComponent, AboutUsSectionComponent, CoursesSectionComponent, FunFactsSectionComponent, TeamSectionComponent, TestimonialsSectionComponent, EventsSectionComponent,ContactUsSectionComponent,FooterComponent,ScrollButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('scholar-app');
}
