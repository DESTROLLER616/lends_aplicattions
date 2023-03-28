import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuardGuard } from 'src/services/guards/dashboard-guard.guard';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [DashboardGuardGuard],
    children: [{
      path: 'category',
      loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
    },
    {
      path: 'welcome',
      loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    },
    {
      path: 'sections',
      loadChildren: () => import('./pages/sections/sections.module').then( m => m.SectionsPageModule)
    },
    {
      path: 'photos',
      loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosPageModule)
    },
    {
      path: '',
      redirectTo: 'welcome',
      pathMatch: 'prefix',
    },]
  },
  // {
  //   path: 'category',
  //   loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  // },
  // {
  //   path: 'welcome',
  //   loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
  // },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  // {
  //   path: 'test',
  //   loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
