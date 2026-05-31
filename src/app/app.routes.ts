import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'properties',
    loadChildren: () =>
      import('./features/properties/properties.routes').then((m) => m.propertiesRoutes),
  },
  {
    path: '',
    redirectTo: 'properties',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'properties',
  },
];
