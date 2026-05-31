import { Routes } from '@angular/router';

export const propertiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/properties-list-page/properties-list-page/properties-list-page').then(
        (m) => m.PropertiesListPage
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/property-detail/property-detail').then((m) => m.PropertyDetailPage),
  },
];
