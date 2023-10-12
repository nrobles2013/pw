import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AppBlankComponent } from './views/others/app-blank/app-blank.component';
import { ForgotPasswordComponent } from './views/sessions/forgot-password/forgot-password.component';
import { PasswordComponent } from './views/sessions/password/password.component';
import { CertGuardsTsService } from './shared/guards/cert.guards';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signin',
    pathMatch: 'full'
    // redirectTo: 'others/blank',
    // pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: ForgotPasswordComponent,
    children: [
      {
        path: 'forgot',
        loadChildren: () => import('./views/sessions/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: PasswordComponent,
    children: [
      {
        path: 'forgot',
        loadChildren: () => import('./views/sessions/password/password.module').then(m => m.PasswordModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'PROFILE' }
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS' }
      },
      {
        path: 'reporte',
        loadChildren: () => import('./views/reporte/reporte.module').then(m => m.ReporteModule),
        data: { title: 'Reporte', breadcrumb: 'Reporte' }
      },
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
