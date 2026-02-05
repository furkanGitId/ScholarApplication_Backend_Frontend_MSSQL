import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    /* =========================
       Auth Routes
       ========================= */
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./auth/login/login').then(m => m.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./auth/register/register').then(m => m.RegisterComponent),
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
        ],
    },

    /* =========================
       Dashboard Routes
       ========================= */
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./dashboard/home/home')
                        .then(m => m.HomeComponent),
            },
            {
                path: 'banner',
                loadComponent: () =>
                    import('./dashboard/banner/banner')
                        .then(m => m.BannerComponent),
            },
            {
                path: 'service',
                loadComponent: () =>
                    import('./dashboard/service/service')
                        .then(m => m.ServiceComponent),
            },
            {
                path: 'about-us',
                loadComponent: () =>
                    import('./dashboard/about-us/about-us')
                        .then(m => m.AboutUsComponent),
            },
            {
                path: 'courses',
                loadComponent: () =>
                    import('./dashboard/courses/courses')
                        .then(m => m.CoursesComponent),
            },
            {
                path: 'teams',
                loadComponent: () =>
                    import('./dashboard/teams/teams')
                        .then(m => m.TeamMembersComponent),
            },
            {
                path: 'testimonials',
                loadComponent: () =>
                    import('./dashboard/testimonials/testimonials')
                        .then(m => m.TestimonialsComponent),
            },
            {
                path: 'events',
                loadComponent: () =>
                    import('./dashboard/events/events')
                        .then(m => m.EventsComponent),
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./dashboard/users/users')
                        .then(m => m.UsersComponent),
            },
        ],
    },

    /* =========================
       Fallback
       ========================= */
    {
        path: '**',
        redirectTo: 'login',
    },
];
