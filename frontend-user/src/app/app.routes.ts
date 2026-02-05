import { Routes } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header';
import { ServicesSectionComponent } from './features/home/components/services-section/services-section';
import { CoursesSectionComponent } from './features/home/components/courses-section/courses-section';
import { TeamSectionComponent } from './features/home/components/team-section/team-section';
import { EventsSectionComponent } from './features/home/components/events-section/events-section';
import { ContactUsSectionComponent } from './features/home/components/contact-us-section/contact-us-section';

export const routes: Routes = [
    { path: '', component: HeaderComponent },
    { path: 'top', component: HeaderComponent },
    { path: 'services', component: ServicesSectionComponent },
    { path: 'courses', component: CoursesSectionComponent },
    { path: 'team', component: TeamSectionComponent },
    { path: 'events', component: EventsSectionComponent },
    { path: 'contact', component: ContactUsSectionComponent },

];
